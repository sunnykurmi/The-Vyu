import gsap from "gsap";
import Image from "next/image";
import React, { useEffect } from "react";

const MediaVideo = () => {
  useEffect(() => {
    const tl = gsap.timeline({ repeatDelay: 1 });

    const clipIn = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
    const clipOut = "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)";

    gsap.set(".loaderImages", {
      clipPath: clipOut,
    });

    tl.to(".loaderImages:nth-child(1)", {
      clipPath: clipIn,
      duration: 0.4,
      ease: "power2.inOut",
    })
      .to(".loaderImages:nth-child(2)", {
        clipPath: clipIn,
        duration: 0.4,
        ease: "power2.inOut",
      })
      .to(".loaderImages:nth-child(3)", {
        clipPath: clipIn,
        duration: 0.4,
        ease: "power2.inOut",
      })

      // Animate out 
      .to(".loaderImages:nth-child(1)", {
        clipPath: clipOut,
        duration: 0.4,
        ease: "power2.inOut",
      })
      .to(".loaderImages:nth-child(2)", {
        clipPath: clipOut,
        duration: 0.4,
        ease: "power2.inOut",
      })
      .to(".loaderImages:nth-child(3)", {
        clipPath: clipOut,
        duration: 0.4,
        ease: "power2.inOut",
      })
      .to(".loaderParent", {
        // opacity: 0,
        duration: 1.5,
        ease: "expo.inOut",
        // delay: 1,
        top:0,
        scale: 0,
        // height: "0",
        // width: "0",
        // rotate: 10,
        display: "none",
      });
  }, []);
  return (
    <section
      className="loaderParent h-[100vh] w-full bg-[#000] z-50 flex relative py-[1rem]"
      //   style={{
      //     clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
      //   }}
    >
      <div
        className="h-full w-full bg-[#000] z-50 flex relative"
        // style={{
        //   clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
        // }}
      >
        <div
          className="loaderImages w-full md:w-[60%] h-full bg-green-600 absolute z-40"
          style={{
            clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
          }}
        >
          <Image width={1000} height={1000} src="/images/image.jpg" />
        </div>
        <div
          className="loaderImages w-full  md:w-[50%] h-[95%] bg-blue-600 absolute z-50 left-0 top-0 md:left-1/2 md:top-1/2 
             -translate-x-0 -translate-y-0 md:-translate-x-1/2 md:-translate-y-1/2"
          style={{
            clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
          }}
        >
          <Image
            width={1000}
            height={1000}
            src="/workImages/indian_cover.webp"
          />
        </div>
        <div
          className="loaderImages bg-yellow-600 absolute z-50  w-full md:w-[40%] 
             h-full md:h-[70%]  
             inset-0 md:inset-auto md:right-0 md:top-0
             md:-translate-x-0 md:-translate-y-0 
             translate-x-0 translate-y-0"
          style={{
            clipPath: "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
          }}
        >
          <Image
            width={1000}
            height={1000}
            src="/workImages/iWhiteKorea_cover.webp"
          />
        </div>
      </div>
    </section>
  );
};

export default MediaVideo;
