import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import CurvedDistortion from "@/components/UI/CurvedDistortion";
import WorkTiles from "@/components/cards/WorkTiles";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import ListWork from "@/components/cards/ListWork";
import gsap from "gsap";
import MobileWork from "@/components/cards/MobileWork";
import { Const } from "@/utils/Constants";
import SeoHeader from "@/components/seo/SeoHeader";

const Work = ({ meta }) => {
  const targetIntensity = useRef(0);
  const currentIntensity = useRef(0);

  const [ViewType, setViewType] = useState("3d");
  const containerRef = useRef(null);
  const dividerRef = useRef(null);

  const changeView = (type) => {
    setViewType(type);

    if (!containerRef.current) return;

    gsap.to(containerRef.current, {
      width: type === "list" ? "40%" : "10%",
      duration: 0.5,
      ease: "power2.out",
    });

    if (type === "3d") {
      gsap.fromTo(
        dividerRef.current,
        { height: 0, opacity: 0 },
        { height: 20, opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    } else {
      gsap.to(dividerRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  };

  useEffect(() => {
    gsap.set(containerRef.current, {
      width: ViewType === "list" ? "50%" : "10%",
    });
  }, []);

  return (
    <>
      <SeoHeader meta={meta} />
      <div className="md:hidden w-full h-screen bg-white">
        <MobileWork />
      </div>
      <div className=" hidden md:block w-full h-screen relative bg-white">
        <div
          ref={containerRef}
          className="left-[50%] hidden absolute z-[999] top-0 translate-x-[-50%] md:flex items-center justify-evenly"
        >
          <button onClick={() => changeView("3d")} className="px-4 py-2 center">
            3D
          </button>

          <div
            ref={dividerRef}
            className="h-5 w-[1px] bg-black opacity-1"
            style={{ transition: "none" }}
          ></div>

          <button
            onClick={() => changeView("list")}
            className="px-4 py-2 center"
          >
            List
          </button>
        </div>
        {ViewType === "list" ? (
          <ListWork />
        ) : (
          <div className="h-screen w-screen fixed top-0 left-0 bg-white">
            <Canvas
              camera={{ position: [0, 0, 5], fov: 75 }}
              gl={{ outputColorSpace: THREE.SRGBColorSpace }}
            >
              <WorkTiles targetIntensity={targetIntensity} />
              <EffectComposer>
                <CurvedDistortion
                  targetIntensity={targetIntensity}
                  currentIntensity={currentIntensity}
                />
              </EffectComposer>
            </Canvas>
          </div>
        )}
      </div>
    </>
  );
};
export default Work;
export async function getStaticProps() {
  const meta = {
    title: "Web Design & Interactive Portfolio | The Vyu, Mumbai",
    description:
      "Discover our portfolio of creative web design, animation, and development work. The Vyu crafts cutting-edge digital experiences for brands across industries.",
    og: {
      title: "Web Design & Interactive Portfolio | The Vyu, Mumbai",
      description:
        "Discover our portfolio of creative web design, animation, and development work. The Vyu crafts cutting-edge digital experiences for brands across industries.",
    },
    twitter: {
      title: "Web Design & Interactive Portfolio | The Vyu, Mumbai",
      description:
        "Discover our portfolio of creative web design, animation, and development work. The Vyu crafts cutting-edge digital experiences for brands across industries.",
    },
    keywords: [],
    author: Const.Brand,
    robots: "index,follow",
  };
  return { props: { meta: meta } };
}
