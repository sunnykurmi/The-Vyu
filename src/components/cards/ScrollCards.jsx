import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Text as TroikaText } from 'troika-three-text';
import * as THREE from 'three';
import { useRouter } from 'next/router';

const GRID_SIZE = 500;
const INERTIA = 0.9;
const DRAG_SENSITIVITY = 0.001;

const ScrollCards = forwardRef(function ScrollCards(
    { targetIntensity, data, CARD_WIDTH, CARD_HEIGHT, Text_size },
    ref
) {
    const groupRef = useRef();
    const meshPool = useRef([]);
    const positionToMesh = useRef(new Map());
    const { camera, size, gl } = useThree();

    const isDragging = useRef(false);
    const lastMouse = useRef({ x: 0, y: 0 });
    const velocity = useRef({ x: 0, y: 0 });

    const raycaster = useRef(new THREE.Raycaster());
    const mouse = useRef(new THREE.Vector2());
    const router = useRouter();

    const materials = useMemo(() =>
        data.map((d) => {
            const texture = new THREE.TextureLoader().load(d.image);
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.minFilter = THREE.LinearFilter;
            return new THREE.MeshBasicMaterial({ map: texture });
        }), [data]);

    useEffect(() => {
        if (!groupRef.current) return;

        meshPool.current = new Array(GRID_SIZE).fill().map(() => {
            const geom = new THREE.PlaneGeometry(CARD_WIDTH, CARD_HEIGHT);
            const mat = materials[Math.floor(Math.random() * materials.length)];
            const mesh = new THREE.Mesh(geom, mat);
            mesh.visible = false;

            const text = new TroikaText();
            text.text = '';
            text.fontSize = Text_size;
            text.position.set(-CARD_WIDTH / 2, -CARD_HEIGHT / 2.2 - 0.3, 0.01);
            text.anchorX = 'left';
            text.anchorY = 'top';
            text.color = 0x000000;
            text.sync();
            mesh.add(text);
            mesh.userData.titleText = text;

            groupRef.current.add(mesh);
            return mesh;
        });
    }, [materials]);

    const applyIntensityBoost = (magnitude = 1) => {
        const clamped = Math.min(magnitude, 100);
        const scaled = (clamped / 100) * 0.4;
        targetIntensity.current = Math.max(targetIntensity.current, scaled);
    };

    useImperativeHandle(ref, () => ({
        scrollBy(amount, duration = 0.6) {
            const frames = Math.round(duration * 60); // Approx 60fps
            let frame = 0;
            const initial = 0;

            const animate = () => {
                frame++;
                const t = frame / frames;
                const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic

                const delta = amount * ease - initial;
                velocity.current.x += delta * 0.08; // 0.08 for smoothness
                if (frame < frames) {
                    requestAnimationFrame(animate);
                }
            };

            animate();
            applyIntensityBoost(Math.abs(amount));
        }
    }));


    useEffect(() => {
        const canvas = gl.domElement;

        const onMouseDown = (e) => {
            isDragging.current = true;
            lastMouse.current = { x: e.clientX, y: e.clientY };
        };

        const onMouseUp = () => {
            isDragging.current = false;
        };

        const onMouseMove = (e) => {
            if (!isDragging.current) return;
            const dx = e.clientX - lastMouse.current.x;
            velocity.current.x += -dx * DRAG_SENSITIVITY;
            lastMouse.current = { x: e.clientX, y: e.clientY };
            applyIntensityBoost(Math.abs(dx));
        };

        const onWheel = (e) => {
            e.preventDefault();
            const scrollAmount = e.deltaX;
            velocity.current.x += scrollAmount * DRAG_SENSITIVITY;
            applyIntensityBoost(Math.abs(scrollAmount));
        };

        const onTouchStart = (e) => {
            if (e.touches.length === 1) {
                const touch = e.touches[0];
                isDragging.current = true;
                lastMouse.current = { x: touch.clientX, y: touch.clientY };
            }
        };

        const onTouchMove = (e) => {
            if (!isDragging.current || e.touches.length !== 1) return;
            const touch = e.touches[0];
            const dx = touch.clientX - lastMouse.current.x;
            velocity.current.x += -dx * DRAG_SENSITIVITY * 4;
            lastMouse.current = { x: touch.clientX, y: touch.clientY };
            applyIntensityBoost(Math.abs(dx));
            e.preventDefault();
        };

        const onTouchEnd = () => {
            isDragging.current = false;
        };

        const onClick = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.current.setFromCamera(mouse.current, camera);
            const intersects = raycaster.current.intersectObjects(
                meshPool.current.filter((m) => m.visible)
            );

            if (intersects.length > 0) {
                const clickedMesh = intersects[0].object;
                const key = clickedMesh.userData.key;
                if (key) {
                    const x = parseInt(key.split('_')[0]);
                    const index = ((x % data.length) + data.length) % data.length;
                    const item = data[index];

                    if (item.projectUrl) {
                        router.push(item.projectUrl);
                    }
                }
            }
        };

        canvas.addEventListener('mousedown', onMouseDown);
        canvas.addEventListener('mouseup', onMouseUp);
        canvas.addEventListener('mousemove', onMouseMove);
        canvas.addEventListener('wheel', onWheel, { passive: false });

        canvas.addEventListener('touchstart', onTouchStart, { passive: false });
        canvas.addEventListener('touchmove', onTouchMove, { passive: false });
        canvas.addEventListener('touchend', onTouchEnd);

        canvas.addEventListener('click', onClick);

        return () => {
            canvas.removeEventListener('mousedown', onMouseDown);
            canvas.removeEventListener('mouseup', onMouseUp);
            canvas.removeEventListener('mousemove', onMouseMove);
            canvas.removeEventListener('wheel', onWheel);

            canvas.removeEventListener('touchstart', onTouchStart);
            canvas.removeEventListener('touchmove', onTouchMove);
            canvas.removeEventListener('touchend', onTouchEnd);

            canvas.removeEventListener('click', onClick);
        };
    }, [gl, camera, data, router]);

    useFrame(() => {
        camera.position.x += velocity.current.x;
        velocity.current.x *= INERTIA;
        camera.position.y = 0;

        const speed = Math.abs(velocity.current.x);
        targetIntensity.current = Math.min(speed / 5, 1) * 2;

        const viewWidth = (size.width / size.height) * camera.zoom * 2;
        const preloadMarginX = viewWidth * 2;

        const gapInVH = window.innerWidth < 768 ? 0.5 : 1;
        const tileSpacing = CARD_WIDTH + gapInVH;

        const minX = camera.position.x - viewWidth / 2 - preloadMarginX;
        const maxX = camera.position.x + viewWidth / 2 + preloadMarginX;

        const startX = Math.floor(minX / tileSpacing);
        const endX = Math.floor(maxX / tileSpacing);

        const y = 0;
        const visibleKeys = new Set();
        let poolIndex = 0;

        for (let x = startX; x <= endX; x++) {
            const key = `${x}_${y}`;
            visibleKeys.add(key);
            const tileX = x * tileSpacing;

            let mesh;
            if (!positionToMesh.current.has(key)) {
                while (
                    poolIndex < meshPool.current.length &&
                    meshPool.current[poolIndex].visible
                ) {
                    poolIndex++;
                }

                mesh = meshPool.current[poolIndex];
                if (!mesh) continue;

                const index = ((x % data.length) + data.length) % data.length;
                const item = data[index];

                mesh.material = materials[index % materials.length];

                const text = mesh.userData.titleText;
                if (text) {
                    text.text = item.title;
                    text.sync();
                }

                mesh.userData.key = key;
                positionToMesh.current.set(key, mesh);
                poolIndex++;
            } else {
                mesh = positionToMesh.current.get(key);
            }

            if (!mesh) continue;

            mesh.visible = true;
            mesh.position.set(tileX, 0, 0);
            mesh.scale.set(1, 1, 1);
        }

        for (const [key, mesh] of positionToMesh.current.entries()) {
            if (!visibleKeys.has(key)) {
                mesh.visible = false;
                positionToMesh.current.delete(key);
            }
        }
    });

    return <group ref={groupRef} />;
});

export default ScrollCards;
