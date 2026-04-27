"use client";

import { Text, useProgress } from "@react-three/drei";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

import CloudContainer from "../models/Cloud";
import WindowModel from "../models/WindowModel";
import TextWindow from "./TextWindow";
import StayCloudContainer from "../models/StayCloud";

const Hero = () => {
  const titleRef = useRef<THREE.Mesh>(null);
  const { progress } = useProgress();
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("desktop");

  // Device detection logic
  useEffect(() => {
    const updateDevice = () => {
      const width = window.innerWidth;
      if (width <= 768) setDevice("mobile");
      else if (width <= 1024) setDevice("tablet");
      else setDevice("desktop");
    };

    updateDevice();
    window.addEventListener("resize", updateDevice);
    return () => window.removeEventListener("resize", updateDevice);
  }, []);

  // Entrance animation for title
  useEffect(() => {
    if (progress === 100 && titleRef.current) {
      gsap.fromTo(
        titleRef.current.position,
        { y: -10 },
        { y: 0, duration: 2 }
      );
    }
  }, [progress]);

  // Font size based on device
  const getFontSize = () => {
    switch (device) {
      case "mobile":
        return 0.55;
      case "tablet":
        return 0.55;
      default:
        return 1.2;
    }
  };

  // Max width of text in 3D space
  const getMaxWidth = () => {
    switch (device) {
      case "mobile":
        return 11;
      case "tablet":
        return 20;
      default:
        return 28;
    }
  };

  const fontPath = "./soria-font.ttf"; // Make sure this font is available in your `public/fonts` directory

  return (
    <>
      {/* <Text
        ref={titleRef}
        position={[0, 2, -10]}
        fontSize={getFontSize()}
        font={fontPath}
        maxWidth={getMaxWidth()}
        textAlign="center"
        anchorX="center"
        anchorY="middle"
        letterSpacing={-0.02}
      >
        Zcommerce - An intuitive dashboard for managing products, orders, and sales — paired
        with a custom-coded storefront that’s built to impress and easy to run.
      </Text> */}

      <CloudContainer />

      <group position={[0, -25, 5.69]}>
        <pointLight
          castShadow
          position={[1, 1, -2.5]}
          intensity={60}
          distance={10}
        />

        <Text
          position={[0, -12, -10]}
          rotation={[Math.PI * 1.5, 0, 0]}
          fontSize={getFontSize()}
          font={fontPath}
          maxWidth={getMaxWidth()}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          letterSpacing={-0.015}
        >
          Enter into the world of Zcommerce. Your Store, Upgraded.
        </Text>

        <WindowModel receiveShadow />
        <TextWindow />
        <StayCloudContainer />
      </group>
    </>
  );
};

export default Hero;
