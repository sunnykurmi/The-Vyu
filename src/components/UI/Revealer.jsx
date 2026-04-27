"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import CustomEase from "gsap/dist/CustomEase";

gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const Revealer = React.forwardRef((_, ref) => {
  const revealerRef = useRef(null);
  const boxRef = useRef(null);

  React.useImperativeHandle(ref, () => ({
    fadeIn: () =>
      new Promise((resolve) => {
        const tl = gsap.timeline({
          onComplete: resolve,
        });

        tl.to(revealerRef.current, {
          opacity: 1,
          duration: 1,
          ease: "hop",
        }, "h");

        tl.fromTo(
          boxRef.current,
          { opacity: 0, top: "5vh", scale:.5, height: "5vh", width: "10vw", rotate: 10 },
          {
            opacity: 1,
            top:0,
            rotate: 0,
            scale:1,
            height: "100vh",
            width: "100vw",
            duration: 1.5,
            ease: "expo.inOut",

          },
          "h"
        );

      }),

    fadeOut: () => {
      gsap.to([boxRef.current, revealerRef.current], {
        opacity: 0,
        duration: 1,
        // delay: 0.5,
        ease: "hop",
      });
    },
  }));

  return (
    <div
      ref={revealerRef}
      className="revealer pointer-events-none fixed top-0 left-0 w-screen h-screen bg-[#000000b1] z-[9999] opacity-0 flex items-center justify-center"
    >
      <div
        ref={boxRef}
        className="opacity-0 bg-white w-[100vw] h-[30vh] absolute  left-[50%] translate-x-[-50%] rounded-lg shadow-xl"
      />
    </div>
  );
});

Revealer.displayName = "Revealer";
export default Revealer;
