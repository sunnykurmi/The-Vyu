import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { images } from "../../utils/Data/HeroData";

const TILE_SIZE = 3.5;
const GRID_SIZE = 500;
const INERTIA = 0.9;
const DRAG_SENSITIVITY = 0.001;
const STAGGER_OFFSET = 3 * 0.2;

export default function InfiniteTiles({ targetIntensity }) {

  const groupRef = useRef();
  const meshPool = useRef([]);
  const positionToMesh = useRef(new Map());
  const { camera, size, gl } = useThree();


  // Dragging and velocity state
  const isDragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });

  const materials = useMemo(() =>
    images.map((img) => {
      const texture = new THREE.TextureLoader().load(img);
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      return new THREE.MeshBasicMaterial({ map: texture });
    }), []);

  useEffect(() => {
    if (!groupRef.current) return;

    meshPool.current = new Array(GRID_SIZE).fill().map(() => {
      const geom = new THREE.PlaneGeometry(TILE_SIZE, TILE_SIZE);
      const mat = materials[Math.floor(Math.random() * materials.length)];
      const mesh = new THREE.Mesh(geom, mat);
      mesh.visible = false;
      groupRef.current.add(mesh);
      return mesh;
    });
  }, [materials]);

  const applyIntensityBoost = (magnitude = 1) => {
    const clamped = Math.min(magnitude, 100); // Cap scroll/drag amount
    const scaled = (clamped / 100) * 0.4;     // Map to [0, 0.4]
    targetIntensity.current = Math.max(targetIntensity.current, scaled);
  };


  useEffect(() => {
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
      const dy = e.clientY - lastMouse.current.y;

      velocity.current.x += -dx * DRAG_SENSITIVITY;
      velocity.current.y += dy * DRAG_SENSITIVITY;

      lastMouse.current = { x: e.clientX, y: e.clientY };

      const magnitude = Math.sqrt(dx * dx + dy * dy);
      applyIntensityBoost(magnitude);
    };

    const onWheel = (e) => {
      velocity.current.x += e.deltaX * DRAG_SENSITIVITY;
      velocity.current.y -= e.deltaY * DRAG_SENSITIVITY;

      const magnitude = Math.sqrt(e.deltaX * e.deltaX + e.deltaY * e.deltaY);
      applyIntensityBoost(magnitude);
    };

    // ✅ TOUCH SUPPORT
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
      const dy = touch.clientY - lastMouse.current.y;

      velocity.current.x += -dx * DRAG_SENSITIVITY;
      velocity.current.y += dy * DRAG_SENSITIVITY;

      lastMouse.current = { x: touch.clientX, y: touch.clientY };

      const magnitude = Math.sqrt(dx * dx + dy * dy);
      applyIntensityBoost(magnitude);

      e.preventDefault(); // prevent scrolling the page
    };

    const onTouchEnd = () => {
      isDragging.current = false;
    };

    // ✅ Add event listeners
    gl.domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('wheel', onWheel, { passive: true });

    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);

    // ✅ Cleanup
    return () => {
      gl.domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('wheel', onWheel);

      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [gl, targetIntensity]);


  useFrame(() => {
    camera.position.x += velocity.current.x;
    camera.position.y += velocity.current.y;

    velocity.current.x *= INERTIA;
    velocity.current.y *= INERTIA;

    const speed = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);

    const maxSpeed = 5;
    const normalizedSpeed = Math.min(speed / maxSpeed, 1);
    targetIntensity.current = normalizedSpeed * 2;

    const viewWidth = (size.width / size.height) * camera.zoom * 2;
    const viewHeight = camera.zoom * 2;
    const preloadMarginX = viewWidth * 2;
    const preloadMarginY = viewHeight * 2;

    const minX = camera.position.x - viewWidth / 2 - preloadMarginX;
    const maxX = camera.position.x + viewWidth / 2 + preloadMarginX;
    const minY = camera.position.y - viewHeight / 2 - preloadMarginY;
    const maxY = camera.position.y + viewHeight / 2 + preloadMarginY;

    const startX = Math.floor(minX / TILE_SIZE);
    const endX = Math.floor(maxX / TILE_SIZE);
    const startY = Math.floor(minY / TILE_SIZE);
    const endY = Math.floor(maxY / TILE_SIZE);

    const visibleKeys = new Set();
    let poolIndex = 0;

    // Use current velocity speed to scale tiles:
    // If speed is low, scale goes to 1, else smaller scale
    const scaleFactor = THREE.MathUtils.lerp(
      1,                // normal scale when stopped
      0.5,              // minimum scale during fast scroll, tune this
      Math.min(speed / 10, 1)  // normalized speed [0,1]
    );

    for (let y = startY; y <= endY; y++) {
      for (let x = startX; x <= endX; x++) {
        const key = `${x}_${y}`;
        visibleKeys.add(key);

        const staggeredY = y * TILE_SIZE + (x % 2 === 0 ? STAGGER_OFFSET : 0);
        const tileX = x * TILE_SIZE;

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

          mesh.userData.key = key;
          positionToMesh.current.set(key, mesh);
          poolIndex++;
        } else {
          mesh = positionToMesh.current.get(key);
        }

        if (!mesh) continue;

        mesh.visible = true;
        mesh.position.set(tileX, staggeredY, 0);

        // Smoothly lerp mesh scale to scaleFactor for smooth animation
        mesh.scale.x += (scaleFactor - mesh.scale.x) * 0.1;
        mesh.scale.y += (scaleFactor - mesh.scale.y) * 0.1;
        mesh.scale.z = 1;
      }
    }
    for (const [key, mesh] of positionToMesh.current.entries()) {
      if (!visibleKeys.has(key)) {
        mesh.visible = false;
        positionToMesh.current.delete(key);
      }
    }
  });



  return <group ref={groupRef} />;
}
