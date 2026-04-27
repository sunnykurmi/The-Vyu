'use client';

import { useScrollHintStore } from "@/3dportfolio/src/stores/scrollHintStore";
import { usePortalStore } from "@/3dportfolio/src/stores/portalStore";
import { useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { isMobile } from "react-device-detect";
import * as THREE from "three";
import { useEffect } from "react";

const ScrollWrapper = (props: { children: React.ReactNode | React.ReactNode[] }) => {
  const { camera } = useThree();
  const scroll = useScroll();
  const isActive = usePortalStore((state) => !!state.activePortalId);
  const { showScrollHint, setScrollHint } = useScrollHintStore();

  // 👇 Scroll to second section (page 1 of 4) on initial load
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (scroll && scroll.el) {
        scroll.el.scrollTop = scroll.el.scrollHeight / 2.5; // for pages={4}
      }
    }, 0); // small delay to ensure ScrollControls is mounted

    return () => clearTimeout(timeout);
  }, [scroll]);

  useFrame((state, delta) => {
    if (scroll) {
      const a = scroll.range(0, 0.3);
      const b = scroll.range(0.3, 0.5);
      const d = scroll.range(0.7, 0.4);

      if (!isActive) {
        camera.rotation.x = THREE.MathUtils.damp(camera.rotation.x, -0.5 * Math.PI * a, 5, delta);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, -37 * b, 7, delta);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, 5 + 10 * d, 7, delta);
      }

      if (!isMobile && !isActive) {
        camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -(state.pointer.x * Math.PI) / 90, 0.05);
      }

      if (!isActive) {
        if (a === 0 && !showScrollHint) {
          setScrollHint(true, 'SCROLL');
        } else if (a > 0 && showScrollHint) {
          setScrollHint(false);
        }
      }
    }
  });

  const children = Array.isArray(props.children) ? props.children : [props.children];

  return (
    <>
      {children.map((child, index) => (
        <group key={index}>{child}</group>
      ))}
    </>
  );
};

export default ScrollWrapper;
