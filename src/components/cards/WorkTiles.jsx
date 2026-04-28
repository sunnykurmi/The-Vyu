import { useThree, useFrame } from '@react-three/fiber';
import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { Text as TroikaText } from 'troika-three-text';
import { data } from '@/utils/Data/HeroData';
import gsap from 'gsap';
import { useRouter } from 'next/router';

const GRID_SIZE = 3;
const TILE_WIDTH = 4.5;
const TILE_HEIGHT = 5.5;
const PADDING = 0;

export default function InfiniteTiles({ targetIntensity }) {
  const groupRef = useRef();
  const { gl, camera } = useThree();
  const isDragging = useRef(false);
  const previousMouse = useRef(new THREE.Vector2());
  const velocity = useRef(new THREE.Vector2());
  const clickedMesh = useRef(null);

  const raycaster = useRef(new THREE.Raycaster());
  const mouse = useRef(new THREE.Vector2());
  const hovered = useRef(null);

  const router = useRouter();

  const originalBounds = useMemo(() => {
    const xs = data.map((d) => d.x);
    const ys = data.map((d) => d.y);
    return {
      width: Math.max(...xs) - Math.min(...xs) + TILE_WIDTH + PADDING,
      height: Math.max(...ys) - Math.min(...ys) + TILE_HEIGHT + PADDING,
    };
  }, []);

  const meshes = useMemo(() => {
    const all = [];
    const offset = Math.floor(GRID_SIZE / 2);
    for (let gx = -offset; gx <= offset; gx++) {
      for (let gy = -offset; gy <= offset; gy++) {
        data.forEach((tile) => {
          const texture = new THREE.TextureLoader().load(tile.image);
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.minFilter = THREE.LinearFilter;

          const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            depthWrite: false,
          });

          const geometry = new THREE.PlaneGeometry(TILE_WIDTH, TILE_HEIGHT);
          const mesh = new THREE.Mesh(geometry, material);

          const hitboxGeometry = new THREE.PlaneGeometry(TILE_WIDTH, TILE_HEIGHT + 0.7);
          const hitboxMaterial = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
          const hitbox = new THREE.Mesh(hitboxGeometry, hitboxMaterial);
          hitbox.position.set(0, -0.35, -0.01); // extend down a bit
          hitbox.name = 'hitbox';
          mesh.add(hitbox);

          const rowShift = (gy % 2 === 0) ? 0 : 2 * TILE_WIDTH;  // shift odd rows by 70%, or even rows if you prefer
          const posX = tile.x + gx * originalBounds.width + rowShift;
       const VERTICAL_SPACING = originalBounds.height * 0.85;
const posY = tile.y + gy * VERTICAL_SPACING;

          mesh.position.set(posX, posY, 0);

          mesh.scale.set(0, 0, 0);
          mesh.userData.originalScale = tile.scale;
          mesh.userData.targetScale = tile.scale;
          mesh.userData.scaleProgress = 0;
          mesh.userData.projectUrl = tile.projectUrl;
          mesh.userData.websiteUrl = tile.websiteUrl;

          const textMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0 });
          const text = new TroikaText();
          text.text = tile.title;
          text.fontSize = 0.12;
          text.anchorX = 'left';
          text.anchorY = 'top';
          text.position.set(-2.25, -3, 0.01);
          text.scale.setScalar(1 / tile.scale); 
          text.material = textMaterial;
          text.visible = false;
          text.sync();
          mesh.add(text);

          const arrowTexture = new THREE.TextureLoader().load('/images/arrow_bg_trans.png');
          arrowTexture.colorSpace = THREE.SRGBColorSpace;
          arrowTexture.minFilter = THREE.LinearFilter;

          const arrowMaterial = new THREE.MeshBasicMaterial({
            map: arrowTexture,
            transparent: true,
            opacity: 0 
          });
          const arrow = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.2), arrowMaterial);
          arrow.position.set(TILE_WIDTH / 2 - 0.2, -TILE_HEIGHT / 2 - 0.23, 0.01);
          arrow.scale.setScalar(1 / tile.scale); 
          arrow.name = 'arrow';
          mesh.add(arrow);

          all.push(mesh);
        });
      }
    }
    return all;
  }, [originalBounds]);

  useEffect(() => {
    if (!groupRef.current) return;
    for (const mesh of meshes) {
      groupRef.current.add(mesh);
    }
  }, [meshes]);

  useEffect(() => {
    const domElement = gl.domElement;
    let lastTime = performance.now();

    const wrapGroupPosition = () => {
      if (!groupRef.current) return;
      const gx = originalBounds.width;
      const gy = originalBounds.height *0.85;
      const pos = groupRef.current.position;
      if (pos.x < -gx) pos.x += 2 * gx;
      if (pos.x > gx) pos.x -= 2 * gx;
      if (pos.y < -gy) pos.y += 2 * gy;
      if (pos.y > gy) pos.y -= 2 * gy;
    };

    const onPointerDown = (e) => {
      isDragging.current = true;
      previousMouse.current.set(e.clientX, e.clientY);

      const rect = domElement.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects(groupRef.current.children, true);
      if (intersects.length > 0) {
        clickedMesh.current = intersects[0].object;
      }
    };

    const onPointerUp = (e) => {
      isDragging.current = false;

      const rect = domElement.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects(groupRef.current.children, true);
      if (intersects.length > 0 && clickedMesh.current) {
        let clicked = intersects[0].object;

        while (clicked && !clicked.userData.projectUrl) {
          if (clicked.name === 'arrow') {
            const parent = clicked.parent;
            if (parent?.userData.websiteUrl) {
              router.push(parent.userData.websiteUrl);
              return;
            }
          }
          clicked = clicked.parent;
        }

        if (clicked?.userData?.projectUrl) {
          router.push(clicked.userData.projectUrl);
        }
      }

      clickedMesh.current = null;
    };

    const getRootTile = (object) => {
      while (object && !object.userData.projectUrl) {
        object = object.parent;
      }
      return object;
    };

    const onPointerMove = (e) => {
      const rect = domElement.getBoundingClientRect();
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.current.setFromCamera(mouse.current, camera);
      const intersects = raycaster.current.intersectObjects(groupRef.current.children, true);

      let newHoveredTile = null;
      let isArrowHovered = false;

      if (intersects.length > 0) {
        let hoveredObj = intersects[0].object;

        if (hoveredObj.name === 'arrow') {
          isArrowHovered = true;
        }

        newHoveredTile = getRootTile(hoveredObj);
      }

      if (hovered.current !== newHoveredTile) {
        // Restore previous hovered tile
        if (hovered.current) {
          hovered.current.userData.targetScale = hovered.current.userData.originalScale;
          hovered.current.children.forEach((child) => {
            if (child instanceof TroikaText) {
              gsap.to(child.position, { y: child.position.y - 0.2, duration: 0.5, ease: 'power2.out' });
              gsap.to(child.material, { opacity: 0, duration: 0.3, onComplete: () => (child.visible = false) });
            }
            if (child.name === 'arrow') {
              gsap.to(child.rotation, { z: 0, duration: 0.3 });
              gsap.to(child.material, { opacity: 0, duration: 0.3 });
            }
          });
        }

        hovered.current = newHoveredTile;

        if (hovered.current) {
          gl.domElement.style.cursor = 'pointer';
          hovered.current.userData.targetScale = hovered.current.userData.originalScale + 0.05;

          hovered.current.children.forEach((child) => {
            if (child instanceof TroikaText) {
              child.visible = true;
              gsap.fromTo(child.position, { y: child.position.y - 0.2 }, { y: -2.8, duration: 0.5 });
              gsap.to(child.material, { opacity: 1, duration: 0.5 });
            }
            if (child.name === 'arrow') {
              gsap.to(child.material, { opacity: 1, duration: 0.3 });
              if (isArrowHovered) {
                gsap.to(child.rotation, { z: Math.PI / 4, duration: 0.3 });
              } else {
                gsap.to(child.rotation, { z: 0, duration: 0.3 });
              }
            }
          });
        } else {
          gl.domElement.style.cursor = 'default';
        }
      } else if (hovered.current && hovered.current.children) {
        // Arrow rotation update
        hovered.current.children.forEach((child) => {
          if (child.name === 'arrow') {
            if (isArrowHovered) {
              gsap.to(child.rotation, { z: Math.PI / 4, duration: 0.3 });
            } else {
              gsap.to(child.rotation, { z: 0, duration: 0.3 });
            }
          }
        });
      }

      // drag movement
      if (!isDragging.current || !groupRef.current) return;

      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const dx = (e.clientX - previousMouse.current.x) / 100;
      const dy = (e.clientY - previousMouse.current.y) / 100;

      velocity.current.set(dx / dt, dy / dt);

      groupRef.current.position.x += dx;
      groupRef.current.position.y -= dy;
      previousMouse.current.set(e.clientX, e.clientY);
      wrapGroupPosition();
    };

    const onWheel = (e) => {
      if (!groupRef.current) return;
      const now = performance.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      const dx = -e.deltaX / 100;
      const dy = e.deltaY / 100;

      velocity.current.set(dx / dt, dy / dt);

      groupRef.current.position.x += dx;
      groupRef.current.position.y += dy;
      wrapGroupPosition();
    };

    domElement.addEventListener('pointerdown', onPointerDown);
    domElement.addEventListener('pointermove', onPointerMove);
    domElement.addEventListener('pointerup', onPointerUp);
    domElement.addEventListener('wheel', onWheel, { passive: true });

    return () => {
      domElement.removeEventListener('pointerdown', onPointerDown);
      domElement.removeEventListener('pointermove', onPointerMove);
      domElement.removeEventListener('pointerup', onPointerUp);
      domElement.removeEventListener('wheel', onWheel);
    };
  }, [gl.domElement, camera, originalBounds]);

  useEffect(() => {
    const update = () => {
      const speed = velocity.current.length();
      const mapped = Math.min(0.4, speed * 0.01);
      if (targetIntensity?.current !== undefined) {
        targetIntensity.current = mapped;
      }
      velocity.current.multiplyScalar(0.9);
      requestAnimationFrame(update);
    };
    update();
  }, [targetIntensity]);

  useFrame(() => {
    if (!groupRef.current) return;

    groupRef.current.children.forEach((mesh) => {
      if (mesh.userData.scaleProgress < 1) {
        mesh.userData.scaleProgress = Math.min(mesh.userData.scaleProgress + 0.05, 1);
        const scaleValue = THREE.MathUtils.lerp(0, mesh.userData.originalScale, mesh.userData.scaleProgress);
        mesh.scale.setScalar(scaleValue);
      } else {
        const original = mesh.userData.originalScale;
        const target = mesh.userData.targetScale ?? original;
        const current = mesh.scale.x;
        const lerped = THREE.MathUtils.lerp(current, target, 0.1);
        mesh.scale.setScalar(lerped);
      }
    });
  });

  return <group ref={groupRef} />;
}
