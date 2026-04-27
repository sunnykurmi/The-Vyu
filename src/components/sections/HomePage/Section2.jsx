import { RiPlayFill } from '@remixicon/react'
import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import SplitType from 'split-type'
gsap.registerPlugin(ScrollTrigger)
import MouseFollower from "mouse-follower";

MouseFollower.registerGSAP(gsap);
const data = [
  {
    id: 1,
    title: "Lisb-On Sound Garden",
    img: "https://cdn.prod.website-files.com/67ebf279c44c5fad2f90f315/6808cd6c0588a9e2f7aee4d6_MSTF_LISBON_RODHAD_1070pxl.jpg",
  },
  {
    id: 2,
    title: "Migrane",
    img: "https://cdn.prod.website-files.com/67ebf279c44c5fad2f90f315/67ebf279c44c5fad2f90f3e7_ytdv4dzjkhcfgd3bpcj4.webp",
  },
  {
    id: 3,
    title: "Airways",
    img: "https://cdn.prod.website-files.com/67ebf279c44c5fad2f90f315/6810b3eb9f6f5af7f25c1182_PRINT_02_IMPACTBBDO_The_black_friday_escape_COVER-p-2000.jpg",
  },
  {
    id: 4,
    title: "Hendrinks",
    img: "https://cdn.prod.website-files.com/67ebf279c44c5fad2f90f315/67ebf279c44c5fad2f90f3f5_zszejrvod7tyaofp9yj8.webp",
  },
  {
    id: 5,
    title: "Space",
    img: "https://cdn.prod.website-files.com/67ebf279c44c5fad2f90f315/67ebf279c44c5fad2f90f3ee_ctzeuvcjvyq518kr6iga.webp",
  },


]


const Section2 = () => {
  const containerRef = useRef();

  useEffect(() => {
    const titles = containerRef.current.querySelectorAll(".title-line");

    titles.forEach((el) => {
      new SplitType(el, { types: "chars" });
    });
  }, []);

  const handleMouseEnter = (e) => {
    const p1 = e.currentTarget.querySelector(".title-line.first");
    const p2 = e.currentTarget.querySelector(".title-line.second");

    const chars1 = p1.querySelectorAll(".char");
    const chars2 = p2.querySelectorAll(".char");

    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    tl.to(chars1, {
      yPercent: -100,
      stagger: 0.03,
      duration: 0.35,
    }, "h");

    tl.fromTo(
      chars2,
      { yPercent: 100 },
      {
        yPercent: 0,
        stagger: 0.03,
        duration: 0.35,
      },
      "h"
    );
  };

  const handleMouseLeave = (e) => {
    const p1 = e.currentTarget.querySelector(".title-line.first");
    const p2 = e.currentTarget.querySelector(".title-line.second");

    const chars1 = p1.querySelectorAll(".char");
    const chars2 = p2.querySelectorAll(".char");

    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    tl.to(chars2, {
      yPercent: 100,
      stagger: 0.03,
      duration: 0.4,
    }, "h");

    tl.to(
      chars1,
      {
        yPercent: 0,
        stagger: 0.03,
        duration: 0.4,
      },
      "h"
    );
  };

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const cursor = new MouseFollower();
    const el = document.querySelector('#scroll_div');

    el.addEventListener('mouseenter', () => {
      cursor.setText('scroll');
    });

    el.addEventListener('mouseleave', () => {
      cursor.removeText();
    });
  }, [])

  //   useEffect(() => {
  //     gsap.fromTo("#scroll_div", {
  //         translateX: "0%",
  //     },
  //         {
  //             scrollTrigger: {
  //                 trigger: containerRef.current,
  //                 start: "top 60%",
  //                 scrub: true,
  //                 // markers: true
  //             },
  //             translateX: "-40%",
  //         }
  //     );

  // }, [])

  return (
    <div className="bg-white overflow-x-scroll" ref={containerRef}>
      <div id='scroll_div' className="flex gap-12 h-[40vh] ">
        {data.map((item, i) => (
          <div
            key={i}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-[25vw] shrink-0 group overflow-hidden cursor-pointer"
          >
            <div className="w-full h-[80%] overflow-hidden group-hover:scale-[.98] transition-all duration-500">
              <img
                className="w-full h-full object-cover group-hover:scale-[1.2] transition-all duration-500"
                src={item.img}
                alt=""
              />
            </div>

            <div className="text-sm relative leading-none font-semibold uppercase mt-2 h-3 overflow-hidden">
              <p className="title-line first absolute top-0 left-0 w-full">
                {item.title}
              </p>
              <p className="title-line second absolute top-0 left-0 w-full ">
                {item.altTitle || item.title}
              </p>
            </div>
          </div>
        ))}
      </div>



      <div className=" w-full  flex  h-[60vh] ">
        <div className="w-[50%] flex flex-col  justify-end p-16">
          {/* <p className="text-xs  font-semibold mb-4 flex items-center ">
            Play Reel
            <RiPlayFill size={16} className=" text-black" />
          </p>
          <div className=" overflow-hidden w-[40vh] h-[25vh] ">
            <video loop autoPlay muted playsInline className='w-full h-full ' src="/video/nuts-reel.mp4"></video>
          </div> */}
        </div>
        <div className="w-[50%] flex flex-col justify-center gap-4 pr-20">
          <p className="text-xl font-normal mb-1">
            THE VYU®
          </p>
          <h1 className="font-oswald uppercase font-extrabold text-8xl leading-none ">
            Our code. <br /> Your story.
          </h1>
          <p className="text-xl font-medium ">
            Not just websites — your brand’s storyteller, crafted with modern tech and captivating design.

          </p>
          <div className="flex justify-between items-center text-sm font-normal">
            <a className="border-b border-black pb-1 hover:text-gray-700 hover:border-gray-700" href="#">
              Explore All Work
            </a>
            <span>
              (Scroll)
            </span>
          </div>
        </div>
      </div>



    </div>
  );
};


export default Section2