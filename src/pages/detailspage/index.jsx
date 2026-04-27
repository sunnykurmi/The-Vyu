import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitText from "gsap/dist/SplitText";
import Image from "next/image";
import Link from "next/link";
import React from "react";
gsap.registerPlugin(ScrollTrigger, SplitText);
const index = () => {
  useGSAP(() => {
    const mainProject = document.querySelector("main.single-project");
    if (!mainProject) return;

    // Zoom background on scroll
    gsap.to(".bg-cover", {
      scale: 1.4,
      ease: "none",
      scrollTrigger: {
        trigger: ".section1",
        start: "center center",
        end: "bottom top",
        scrub: true,
      },
    });

  ScrollTrigger.batch(".fade-in", {
  interval: 0.05,
  batchMax: 12,
  once: true,
  markers: false,
  onEnter: (elements) => {
    gsap.to(elements, {
      opacity: 1,
      stagger: 0.2,
      duration: 1.5,
      ease: "power4.inOut",
    });
  },
  // scrollTrigger: {
  //   trigger: ".fade-in-container", // Parent or section that contains your .fade-in elements
  //   start: "top 80%",
  // }
});

    // Reveal plane section with clip-path
    gsap.to(".plane", {
      clipPath: "inset(0 0 0% 0)",
      ease: "power4.inOut",
      duration: 2,
      delay:1,
      scrollTrigger: {
        trigger: ".plane",
        start: "top 80%",
      },
    });
   

    // Handle text split animations after fonts load
    setTimeout(() => {
      ScrollTrigger.refresh();
      ScrollTrigger.sort();
      const lineElements = document.querySelectorAll(".lines.opacity-0");
      lineElements.forEach((el) => {
        gsap.set(el, { opacity: 1 });
      });

      const lines = gsap.utils.toArray(".lines");

      // document.fonts.ready.then(() => {
        lines.forEach((lineEl) => {
          const split = new SplitText(lineEl, {
            type: "lines",
            linesClass: "line",
            mask: "lines",
          });

          // Fade in lines
          gsap.fromTo(
            split.lines,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.3,
              ease: "power1.out",
              scrollTrigger: {
                trigger: lineEl,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none none",
                markers: false,
              },
            }
          );

          // Slide up lines
          gsap.fromTo(split.lines,{
            yPercent: 115,           
          }, {
            yPercent: 0,
            stagger: 0.2,
            duration: 2,
            ease: "power4.inOut",
            scrollTrigger: {
              trigger: lineEl,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none none",
            },
          });
        });
      // });
    }, 1000);
  });

  return (
    <main className="single-project">
      <section className="section1 w-[100vw] h-[100vh] overflow-hidden">
        <div
          className="w-full h-full bg-cover"
          id="custom-bg"
          style={{
            backgroundImage:
              'url("https://aladesign.cz/wp-content/uploads/2025/06/RE_01.webp")',
          }}
        />
      </section>
      <section className="section2 py-[--lg] px-[--gap] main-grid">
        <h1 className="h3 text-[--black] col-span-6 col-start-7 max-[1024px]:mb-[--md] max-[550px]:mb-[--lg] max-[550px]:mt-[--md] lines opacity-0">
          Regrese{" "}
        </h1>
        <h3 className="h4 text-[--black] col-span-6 col-start-1 lg:my-[--lg] max-[1024px]:mb-[--md] lines">
          Project Description{" "}
        </h3>
        <div className="text text-[--black] col-span-6 col-start-7 lg:my-[--lg] max-[1024px]:mb-[--md] fade-in">
          <p className="font2">
            Regrese introduces an innovative and professional approach to
            regression therapy, focusing on profound subconscious work and the
            removal of emotional and mental blocks. This modern concept offers
            clients a pathway to self-discovery, the release of past traumas,
            and the achievement of inner harmony. The brand’s visual identity
            was designed to convey a unique contrast between calmness and
            dramatic depth, reflecting the essence of regression therapy. Soft
            colors are paired with bold contrasting elements to create a visual
            balance between introspective tranquility and emotional intensity.
            The design feels minimalist yet evokes a sense of transformation and
            strength that accompanies the process of self-discovery and
            cleansing.
          </p>
        </div>
        <h3 className="h4 text-[--black] col-span-6 col-start-1 max-[1024px]:mb-[--md] lines opacity-0">
          Services{" "}
        </h3>
        <ul className="text gap-[5px] inline-flex flex-wrap text-[--black] col-span-6 col-start-7 fade-in opacity-0 font2">
          <li>Brand Design,</li>
          <li>Digital Design,</li>
          <li>Marketing Collateral</li>
        </ul>

        {/* <!-- <ul className="text text-[--black] col-span-6 col-start-7">

		</ul> --> */}
      </section>
      <section className="section3">
        <div className="w-full main-grid px-[--gap] gap-[--gap]">
          <div className="col1 fade-in mb-[--gap] col-span-6 col-start-1 max-[1024px]:col-span-12">
            <Image
              width={1000}
              height={1000}
              className="w-full object-contain"
              src="https://aladesign.cz/wp-content/uploads/2025/06/RE_02.webp"
              alt="RE_02"
            />
          </div>
          <div className="col2 fade-in mb-[--gap] col-span-6 col-start-7 max-[1024px]:col-span-12 max-[1024px]:col-start-1">
            <Image
              width={1000}
              height={1000}
              className="w-full object-contain"
              src="https://aladesign.cz/wp-content/uploads/2025/06/RE_03.webp"
              alt="RE_03"
            />
          </div>
        </div>

        <div className="w-full main-grid px-[--gap]">
          
          <div className="col1 fade-in mb-[--gap] col-span-6 col-start-7 max-[1024px]:col-span-12">
            <Image
              width={1000}
              height={1000}
              className="w-full object-contain"
              src="https://aladesign.cz/wp-content/uploads/2025/06/RE_04.webp"
              alt="RE_04"
            />
          </div>
        </div>

        <div className="w-full main-grid px-[--gap]">
           
          <div className="col1 fade-in mb-[--gap] col-span-6 col-start-7 max-[1024px]:col-span-12">
            <Image
              width={1000}
              height={1000}
              className="w-full object-contain"
              src="https://aladesign.cz/wp-content/uploads/2025/06/RE_05.webp"
              alt="RE_05"
            />
          </div>
        </div>

        <div className="w-full main-grid px-[--gap]">
          <div className="col1 fade-in mb-[--gap] col-span-12 col-start-1">
            <video
              className="h-full m-0 object-cover"
              muted
              loop
              autoPlay
              playsInline
            >
              <source
                src="https://aladesign.cz/wp-content/uploads/2025/06/RE_06.mov"
                type="video/mp4"
              />
            </video>
          </div>
        </div>

        <div className="w-full main-grid px-[--gap] gap-[--gap]">
          <div className="col1 fade-in mb-[--gap] col-span-6 col-start-1 max-[1024px]:col-span-12">
            <Image
              width={1000}
              height={1000}
              className="w-full object-contain"
              src="https://aladesign.cz/wp-content/uploads/2025/06/RE_07.webp"
              alt="RE_07"
            />
          </div>
          <div className="col2 fade-in mb-[--gap] col-span-6 col-start-7 max-[1024px]:col-span-12 max-[1024px]:col-start-1">
            <Image
              width={1000}
              height={1000}
              className="w-full object-contain"
              src="https://aladesign.cz/wp-content/uploads/2025/06/RE_08.webp"
              alt="RE_08"
            />
          </div>
        </div>
      </section>

      <section className="section4 py-[--lg] px-[--gap] main-grid max-[550px]:pt-[--md]">
        <h3 className="h4 text-[--black] col-span-6 col-start-1 max-[1024px]:mb-[--md] fade-in">
          Credits{" "}
        </h3>
        <span className="text block text-[--black] col-span-6 col-start-7 lg:mb-[--lg] max-[1024px]:mb-[--md] fade-in font2">
          Alena Figurová - Art Direction & Design
        </span>
        <h3 className="h4 text-[--black] col-span-6 col-start-1 max-[1024px]:mb-[--md] fade-in">
          Year{" "}
        </h3>
        <span className="text text-[--black] col-span-6 col-start-7 max-[1024px]:mb-[--md] fade-in font2">
          2024
        </span>
      </section>
      <section className="next-project-section w-full relative lg:pb-[--lg]">
        <h4 className="details text-[--black] text-center block py-[--md] title">
          WANT TO SEE MORE?
        </h4>
        <div className="w-full relative">
          <Link
            href="#"
            className="plane-wrapper z-[2] w-[30%] h-[50%] mx-auto flex justify-center max-[1024px]:w-[80%] max-[1024px]:h-[100%]"
          >
            <div className="plane w-full h-full">
              <img
                className="w-full h-full object-cover"
                src="../../../images/team members/5.png"
                crossorigin=""
                data-sampler="planeTexture"
              />
            </div>
          </Link>
          <Link
            href=""
            className="h1 chars block lines text-[--black] text-center uppercase max-[1024px]:pb-[--lg] max-[550px]:pt-[--md] max-[550px]:mt-0 opacity-0"
          >
            NEXT STUDY{" "}
          </Link>
        </div>
      </section>
    </main>
  );
};

export default index;
