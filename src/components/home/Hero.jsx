import React, { use, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import SplitType from "split-type";
import Section3 from "../sections/HomePage/Section3";
import CurveScroller from "../sections/HomePage/CurveScroller";
import HeroNormalScroll from "../cards/HeroNormalScroll";
import HeroVideo from "../sections/HomePage/HeroVideo";
gsap.registerPlugin(ScrollTrigger);

const Hero = () => {


  useEffect(() => {

    const splittext = new SplitType("#split1", {
      types: "words",
      whitespace: true,
    });
    const words = splittext.words;


    gsap.fromTo("#headtext", {
      opacity: 0,
    }, {
      opacity: 1,
      delay: 0.5,
      duration: .8,
    })
    gsap.fromTo("#leftpara", {
      opacity: 0,
    }, {
      opacity: 1,
      delay: 1.45,
      duration: .8,
    })


    gsap.set(".hero_vid", {
      paddingTop: "30vh",
      opacity: 0,
    })
    gsap.fromTo(".hero_vid", {
      paddingTop: "30vh",
      opacity: 0,
    }, {
      paddingTop: "0vh",
      opacity: 1,
      duration: .75,
      delay: 1.5,
    })


    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#split1",
        start: "top 90%",
        end: "top 30%",
        scrub: true,
        // markers: true
      },
    });

    words.forEach((char, index) => {
      tl.fromTo(
        char,
        { opacity: 0.2 },
        { opacity: 1, duration: 0.1 },
        index * 0.05 // delay between each char
      );
    });

    gsap.fromTo(
      "#smlpara",
      {
        y: 70,
      },
      {
        scrollTrigger: {
          // markers: true,
          trigger: "#split1",
          start: "top 80%",
        },
        y: 0,
      }
    );
    gsap.fromTo(
      ".mobile_smlpara",
      { y: 70 },
      {
        y: 0,
        stagger: 0.09, // Add stagger between elements
        ease: "power2.out",
        scrollTrigger: {
          // markers: true,
          trigger: "#split1",
          start: "top 80%",
        },
      }
    );


    gsap.registerPlugin(ScrollTrigger);

    ScrollTrigger.matchMedia({
      // Desktop
      "(min-width: 768px)": function () {
        gsap.fromTo(
          "#headtext",
          {
            fontSize: "24vw",
            top: "0",
          },
          {
            fontSize: "3vw",
            transform: "translateY(0)",
            top: "16vh",
            left: "2.8vh",
            scrollTrigger: {
              trigger: "#headtext_parent",
              start: "0.5% top",
              // end: "9% 0%",
              scrub: true,
              // markers: true,
              onLeave: () => {
                gsap.set("#headtext", { display: "none" });
                window.dispatchEvent(new Event("headtextHidden"));
              },
              onEnterBack: () => {
                gsap.set("#headtext", { display: "block" });
                window.dispatchEvent(new Event("headtextVisible"));
              },
            },
          }
        );
      },

      // Mobile
      "(max-width: 767px)": function () {
        gsap.fromTo(
          "#headtext",
          {
            fontSize: "28vw",
            top: "0",
          },
          {
            fontSize: "10vw",
            transform: "translateY(0)",
            top: "0vh",
            left: "1.5vh",
            scrollTrigger: {
              trigger: "#headtext_parent",
              start: "0.5% top",
              end: "50% 0%",
              scrub: true,
              // markers: true,
              onLeave: () => {
                gsap.set("#headtext", { display: "none" });
                window.dispatchEvent(new Event("headtextHidden"));
              },
              onEnterBack: () => {
                gsap.set("#headtext", { display: "block" });
                window.dispatchEvent(new Event("headtextVisible"));
              },
            },
          }
        );
      },
    });


  }, []);

  return (
    <>
      <div className="w-full h-[100vh] md:h-[150vh] relative    ">
        <div
          id="headtext_parent"
          className="  h-[50vh] relative overflow-hidden w-full justify-center flex items-end  lg:h-[70vh]"
        >
          <h1
            id="headtext"
            className="  translate-y-[32vh] opacity-0 md:translate-y-[15vh] z-[49] fixed text-[#000000] uppercase "
          >
            the vyu
          </h1>
        </div>
        <p
          id="leftpara"
          style={{ opacity: 0 }}
          className=" absolute opacity-0  text-center md:text-start left-5 top-[82%] md:top-[56%]  text-sm leading-tight text-[#000000] w-[90%] md:w-[25%] font3 "
        >
          We combine design precision, expressive animation, and smart development to create digital spaces people actually want to be in. Our frontends aren’t just good-looking — they’re built to perform, engage, and impress.
        </p>
        <div className="hero_vid w-full h-[30vh]  md:h-[60vh] lg:h-[80vh] overflow-hidden pt-[30vh] ">
        <HeroVideo/>
        </div>

      </div>
      <div className="w-full  md:pt-20  md:h-[70vh] flex-col gap-4 md:gap-10 text-center center  bg-white">
        <div className="h-20 hidden md:block  mt-14 md:h-7 px-5 overflow-hidden ">
          <p id="smlpara" className=" text-sm lg:text-base font3 text-gray-500 ">
            {" "}
            With over 2 years in the game and projects like RPSG Media in our
            corner, we don’t just deliver products — we deliver “holy sh*t,
            that’s cool.”
          </p>
        </div>
        <div className="md:hidden h-20 mt-14 md:h-7 px-5 text-sm lg:text-base font3 text-gray-500 overflow-hidden">
          <div className="overflow-hidden block">
            <p className="mobile_smlpara translate-y-5">
              With over 2 years in the game and projects like
            </p>
          </div>
          <div className="overflow-hidden block">
            <p className="mobile_smlpara translate-y-5">
              RPSG Media in our corner, we don’t just
            </p>
          </div>
          <div className="overflow-hidden block">
            <p className="mobile_smlpara translate-y-5">
              deliver products we deliver “holy sh*t, that’s cool.”
            </p>
          </div>
        </div>

        <p
          id="split1"
          className=" text-base lg:text-2xl w-[90%] md:w-[80%] lg:w-[50%] break-words font2"
        >
          We’re The VYU — where clicks spark conversations.
          Our animated frontends grab attention on instinct, while our backend systems do what legacy software can’t: they’re fast, intuitive, and built to scale without breaking.
          From Bombay to businesses across India, we build digital experiences that leave a mark — not just a memory.
        </p>
      </div>
      <div className="hidden md:block">
        <CurveScroller />
      </div>
      <div className="block md:hidden">
        <HeroNormalScroll />
      </div>
      {/* <Section2 /> */}
      <Section3 />
    </>
  );
};

export default Hero;
