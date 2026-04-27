import React, { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import TeamMember from "@/components/sections/AboutusPage/TeamMember";
import Marquee from "react-fast-marquee";
import { data } from "./../../utils/Data/AboutScroll";
import { Canvas } from "@react-three/fiber";
import { EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";
import { useRef } from "react";
import ScrollCards from "@/components/cards/ScrollCards";
import ScrollDistortion from "@/components/UI/ScrollDistortion";
import MouseFollower from "mouse-follower";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import SplitType from "split-type";
import { Const } from "@/utils/Constants";

MouseFollower.registerGSAP(gsap);

gsap.registerPlugin(ScrollTrigger);

const AboutUs = () => {
  const targetIntensity = useRef(0);
  const currentIntensity = useRef(0);
  const scrollCardsRef = useRef(null);
  const hasScrolledRef = useRef(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const cursor = new MouseFollower({
      container: document.body,
      visible: false, // start hidden
    });

    const el = document.querySelector("#scroll_div");

    const showCursor = () => {
      cursor.show();
      cursor.setText("scroll");
    };

    const hideCursor = () => {
      cursor.hide();
      cursor.removeText();
    };

    el.addEventListener("mouseenter", showCursor);
    el.addEventListener("mouseleave", hideCursor);

    return () => {
      el.removeEventListener("mouseenter", showCursor);
      el.removeEventListener("mouseleave", hideCursor);
    };
  }, []);

  useEffect(() => {
    const splittext = new SplitType("#split1", {
      types: "words",
      whitespace: true,
    });
    const words = splittext.words;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#split1",
        start: "top 80%",
        end: "top 20%",
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

    const splittext2 = new SplitType("#split2", {
      types: "words",
      whitespace: true,
    });
    const words2 = splittext2.words;

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#split2",
        start: "top 80%",
        end: "top 20%",
        scrub: true,
        // markers: true
      },
    });

    words2.forEach((char, index) => {
      tl2.fromTo(
        char,
        { opacity: 0.2 },
        { opacity: 1, duration: 0.1 },
        index * 0.05 // delay between each char
      );
    });
  }, []);

  const handleScroll = (direction) => {
    const SCROLL_AMOUNT = 1; // CARD_WIDTH + gap (match actual spacing)
    const DURATION = 0.6; // seconds

    if (scrollCardsRef.current?.scrollBy) {
      scrollCardsRef.current.scrollBy(
        direction === 'left' ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
        DURATION
      );
    }
  };


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          entry.intersectionRatio >= 0.4 &&
          !hasScrolledRef.current
        ) {
          hasScrolledRef.current = true;
          scrollCardsRef.current?.scrollBy(1.2);
        }
      },
      {
        threshold: [0.4],
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);


  return (
    <>
      <div className="bg-white px-5 md:px-0">
        <div className="w-full h-[60vh] md:h-screen center  flex-col text-center leading-none bg-white text-[9.5vw] md:text-[5vw] uppercase">
          <h1>Our Point of Vyu?&nbsp; Design that moves, </h1>
          <h1>code that performs, and experiences that convert.</h1>
        </div>
        <div className="w-full md:pb-[25vh] center flex-col ">
          <div className=" w-full md:w-[60%] h-full">
            <p className="text-lg  font-medium text-black font3">Our Motto</p>
            <div className="mt-5">
              <p
                id="split1"
                className="   leading-tight text-sm md:text-2xl font2 "
              >
                At The Vyu, we don’t just build websites or apps — we create
                digital stories that captivate, connect, and convert. Our motto
                is simple: blend bold design with clean, scalable code to create
                experiences people actually enjoy using. Whether it’s an
                animated frontend that makes users linger, or a powerful backend
                built to scale for lakhs, we aim for one thing — impact with
                elegance
              </p>
            </div>
          </div>
        </div>
        <div
          id="scroll_div"
          className="w-full md:mb-10 relative   overflow-hidden  "
        >
          <div className="w-full md:px-10 h-10 translate-y-[4vh] flex items-center justify-between">
            <div className="    text-2xl md:text-3xl lg:text-5xl bg-white  text-black uppercase">
              <h1></h1>
            </div>
            <div className='flex gap-2 items-center'>
              <img
                onClick={() => handleScroll('left')}
                className='w-5 md:w-6 cursor-pointer'
                src="/images/arrowLeft.jpeg"
                alt=""
              />
              <p className='text-sm md:text-base'>Scroll</p>
              <img
                onClick={() => handleScroll('right')}
                className='w-5 md:w-6 cursor-pointer'
                src="/images/arrowRight.jpeg"
                alt=""
              />
            </div>
          </div>
          <div
            ref={containerRef}
            data-cursor-text="view"
            className="h-[25vh] mt-5 md:h-[55vh] cursor-none w-full center"
          >
            <Canvas
              camera={{ position: [0, 0, 4.2], fov: 75 }}
              gl={{ outputColorSpace: THREE.SRGBColorSpace }}
            >
              <ScrollCards
                ref={scrollCardsRef}
                targetIntensity={targetIntensity}
                data={data}
                CARD_WIDTH={7}
                CARD_HEIGHT={5}
                Text_size={0.3}
              />
              <EffectComposer>
                <ScrollDistortion
                  targetIntensity={targetIntensity}
                  currentIntensity={currentIntensity}
                />
              </EffectComposer>
            </Canvas>
          </div>
        </div>
        <div className="w-full py-[5vh] md:py-[25vh] center flex-col ">
          <div className=" w-full md:w-[60%] h-full">
            <p className="text-lg  font-medium text-black font3">
              Meet The Team
            </p>
            <div className="mt-5">
              <p
                id="split2"
                className="   leading-tight text-sm md:text-2xl font2 "
              >
                We’re a small, sharp team based in Bombay with big ideas and
                even bigger energy. From UI/UX dreamers to backend engineers,
                each of us brings a passion for building digital products that
                work beautifully — inside and out. With over 2 years of hands-on
                experience and collaborations with brands like RPSG Media, we’re
                not just a team — we’re your creative tech partners.
              </p>
            </div>
          </div>
        </div>
        <TeamMember />
      </div>
    </>
  );
};

export default AboutUs;

export async function getStaticProps() {
  const meta = {
    title: "About Us | The Vyu – Creative Web Studio in Mumbai",
    description:
      "The Vyu is a creative team of designers, developers, and storytellers building memorable web experiences. Learn more about who we are and what we believe in.",
    og: {
      title: "About Us | The Vyu – Creative Web Studio in Mumbai",
      description:
        "The Vyu is a creative team of designers, developers, and storytellers building memorable web experiences. Learn more about who we are and what we believe in.",
    },
    twitter: {
      title: "About Us | The Vyu – Creative Web Studio in Mumbai",
      description:
        "The Vyu is a creative team of designers, developers, and storytellers building memorable web experiences. Learn more about who we are and what we believe in.",
    },
    keywords: [],
    author: Const.Brand,
    robots: "index,follow",
  };
  return { props: { meta: meta } };
}
