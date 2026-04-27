import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

import CustomEase from "gsap/dist/CustomEase";
import { RiCloseLine } from "@remixicon/react";
import AnimatedTitle from "@/components/buttons/AnimatedTitle";
import { servicesData } from "@/utils/Data/ServicesSectionData";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const Section3 = () => {
  const mainRef = useRef(null);
  const floatingImgRef = useRef(null);
  const floatingWrapperRef = useRef(null);
  const floatingServiceSection = useRef(null);
  const revealerRef = useRef(null);
  const serviceTL = useRef(null);
  const closeBtnRef = useRef(null);
  const [showContent, setShowContent] = useState(false);

  const [hoverPara, sethoverPara] = useState("")
  const hoverContainerRef = useRef(null);
  const hoverContentRef = useRef(null);
  const hoverTimeout = useRef(null);



  useEffect(() => {
    const floating = floatingWrapperRef.current;
    const floatingImg = floatingImgRef.current;

    let rotate = 0;
    let diffrot = 0;

    const isMobile = window.innerWidth <= 768;
    const elems = document.querySelectorAll(".elem");

    const handleMouseMove = (e, elem) => {
      if (isMobile) return;

      const imgSrc = elem.getAttribute("data-img");
      if (floatingImg.getAttribute("src") !== imgSrc) {
        floatingImg.setAttribute("src", imgSrc);
      }

      const x = e.clientX;
      const y = e.clientY;

      diffrot = e.clientX - rotate;
      rotate = e.clientX;

      gsap.to(floating, {
        opacity: 1,
        ease: "power3.out",
        top: y,
        left: x,
        rotate: gsap.utils.clamp(-20, 20, diffrot * 0.3),
        duration: 2,
        overwrite: "auto",
      });
    };

    const handleMouseLeave = () => {
      if (isMobile) return;

      gsap.to(floating, {
        opacity: 0,
        rotate: 0,
        duration: 0.6,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const handleScroll = () => {
      if (isMobile) {
        gsap.to(floating, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    const handleMobileClick = (e, elem) => {
      if (!isMobile) return;
      if (e.target.tagName.toLowerCase() === "h5") return;

      e.stopPropagation();

      const imgSrc = elem.getAttribute("data-img");
      if (floatingImg.getAttribute("src") !== imgSrc) {
        floatingImg.setAttribute("src", imgSrc);
      }

      const x = e.touches?.[0]?.clientX || e.clientX;
      const y = e.touches?.[0]?.clientY || e.clientY;

      gsap.to(floating, {
        opacity: 1,
        top: y,
        left: x,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const mouseMoveListeners = [];

    elems.forEach((elem) => {
      const mouseMoveHandler = (e) => handleMouseMove(e, elem);
      const mobileClickHandler = (e) => handleMobileClick(e, elem);

      mouseMoveListeners.push({ elem, mouseMoveHandler, mobileClickHandler });

      elem.addEventListener("mousemove", mouseMoveHandler);
      elem.addEventListener("mouseover", mouseMoveHandler);
      elem.addEventListener("mouseleave", handleMouseLeave);
      elem.addEventListener("click", mobileClickHandler);
    });

    if (isMobile) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      mouseMoveListeners.forEach(({ elem, mouseMoveHandler, mobileClickHandler }) => {
        elem.removeEventListener("mousemove", mouseMoveHandler);
        elem.removeEventListener("mouseleave", handleMouseLeave);
        elem.removeEventListener("click", mobileClickHandler);
      });

      if (isMobile) {
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);




  const projects = [
    {
      title: "Branding & Identity",
      link: "web",
      img: "/servicesHover/branding.jpg",
    },
    {
      title: "Web Design & Development",
      link: "app",
      img: "/servicesHover/website.jpg",
    },
    {
      title: "eCommerce Solutions",
      link: "saas",
      img: "/servicesHover/ecommerce.jpg",
    },
    {
      title: "Digital Products & Services",
      link: "erp",
      img: "/servicesHover/digital_product_and_services.jpg",
    },
  ];

  const openServiceSection = () => {
    setShowContent(false); // hide content first

    const tl = gsap.timeline({
      onComplete: () => setShowContent(true) // show after animation
    });

    serviceTL.current = tl;

    tl.to(revealerRef.current, {
      opacity: 1,
      duration: .5,
      pointerEvents: "all",
      ease: "hop",
    }, "h");

    ScrollTrigger.matchMedia({
      // Mobile devices (width ≤ 768px)
      "(max-width: 768px)": function () {
        tl.fromTo(
          floatingServiceSection.current,
          {
            opacity: 0,
            top: "0vh",
            scale: 0,
            height: "5vh",
            width: "10vw",
            rotate: 10,
          },
          {
            opacity: 1,
            top: "0%",
            transform: "translateY(0%)",
            left: "0%",
            translate: "translateX(0%)",
            rotate: 0,
            scale: 1,
            pointerEvents: "all",
            height: "100vh",
            width: "100vw",
            duration: 1.5,
            ease: "expo.inOut",
          }
        );
      },

      // Desktop & tablets (width > 768px)
      "(min-width: 769px)": function () {
        tl.fromTo(
          floatingServiceSection.current,
          {
            opacity: 0,
            top: "2vh",
            scale: 0,
            height: "5vh",
            width: "10vw",
            rotate: 10,
          },
          {
            opacity: 1,
            top: "50%",
            rotate: 0,
            scale: 1,
            pointerEvents: "all",
            height: "90vh",
            width: "90vw",
            duration: 1.5,
            ease: "expo.inOut",
          }
        );
      },
    });
  };


  useEffect(() => {
    const handleClick = (e) => {
      if (
        floatingServiceSection.current &&
        !floatingServiceSection.current.contains(e.target)
      ) {
        serviceTL.current?.reverse();
      }
    };

    const revealerEl = revealerRef.current;
    revealerEl?.addEventListener("click", handleClick);

    return () => revealerEl?.removeEventListener("click", handleClick);
  }, []);


  const showHoverText = (text) => {
    clearTimeout(hoverTimeout.current);
    sethoverPara(text);

    gsap.fromTo(hoverContainerRef.current, {
      width: 0,
    }, {
      width: "100%",
      duration: 3,
      ease: "power2.out",
    });
  };

  const hideHoverText = () => {
    hoverTimeout.current = setTimeout(() => {
      gsap.to(hoverContainerRef.current, {
        width: 0,
        duration: 1,
        // ease: "power2.in",
        onComplete: () => sethoverPara(""),
      });
    }, 500);
  };






  return (
    <div
      ref={mainRef}
      id="main"
      className="w-full pb-20 text-white relative"
    >
      <div
        ref={revealerRef}
        className="revealer pointer-events-none cursor-pointer fixed top-0 left-0 w-screen h-screen bg-[#000000b1] z-[9999] opacity-0 flex items-center justify-center"
      ></div>
      <div
        ref={floatingServiceSection}
        className="fixed translate-x-[-50%] bg-white translate-y-[-50%] w-[10vw] h-[5vh]  top-[2vh] center flex-col opacity-0 pointer-events-none left-[50%] z-[99999]"
      >
        <div ref={closeBtnRef} className="absolute top-3 right-2 cursor-pointer z-[9999]">
          <p
          onClick={() => {
              setShowContent(false);
              serviceTL.current?.reverse();
            }}
            className={` border-black cursor-pointer text-black py-1 px-3 border  text-xs rounded-full`}>
            Close
          </p>
        </div>


        {showContent && (
          <>
            <div
              data-lenis-prevent
              className="center w-full">
              <h1 className="uppercase mt-0 md:mt-0 mb-4 md:mb-0 text-4xl md:text-5xl  text-black">Our services</h1>
            </div>
            <div
              data-lenis-prevent
              className=" overflow-y-scroll w-full h-[73%]  md:h-[60%]  md:pl-14 px-5 py-5 md:py-10">
              <div
                data-lenis-prevent className=" overflow-y-scroll md:flex justify-between gap-5">

                {servicesData.map((service, index) => (
                  <div
                    key={index}
                    className="w-full text-black mb-10 h-full flex flex-col"
                  >
                    <p className=" text-base md:text-sm font-semibold uppercase mb-4">{service.title}</p>
                    <ul className="list-disc list-inside text-sm">
                      {service.services.map((subService, subIndex) => (
                        <div
                          key={subIndex}
                          onMouseEnter={() => showHoverText(subService.description)}
                          onMouseLeave={hideHoverText}
                          className=" opacity-80 md:opacity-60 flex gap-1 items-center mb-2 hover:opacity-100 cursor-pointer transition duration-300"
                        >
                          <p>{subIndex + 1}</p>
                          <div>
                            <AnimatedTitle text={subService.title} />
                          </div>
                        </div>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full  text-black center h-20 md:h-20">
              <div
                ref={hoverContainerRef}
                className="overflow-hidden pt-2 h-full w-full"
                style={{ display: "inline-block" }}
              >
                <p
                  ref={hoverContentRef}
                  className="md:whitespace-nowrap text-xs px-2 leading-none md:text-sm text-center w-full"
                >
                  {hoverPara}
                </p>
              </div>
            </div>

          </>

        )}
      </div>


      <div
        ref={floatingWrapperRef}
        className="fixed top-0 left-0 z-50 pointer-events-none opacity-0 -translate-x-1/2 -translate-y-1/2"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        <img
          ref={floatingImgRef}
          src=""
          alt="Preview"
          className=" h-[100px] w-[200px] md:w-[350px] md:h-[250px] shrink-0 object-cover"
        />
      </div>

      <div className=" px-5 lg:px-16 text-4xl md:text-3xl lg:text-5xl bg-white pt-20 pb-3 md:pb-10 text-black uppercase">
        <h1>Our services</h1>
      </div>

      <div className="bg-white text-black cursor-pointer ">
        {projects.map((item, index) => (
          <div
            onClick={(e) => {
              e.stopPropagation();
              if (window.innerWidth > 768) {
                openServiceSection();
              }
            }}
            key={index} className="no-underline cursor-pointer">
            <div
              key={index}
              data-img={item.img}
              className={`elem relative  cursor-pointer flex flex-col gap-3 md:gap-0 md:flex-row overflow-hidden group items-start md:items-center justify-between w-full px-5 md:px-16 py-[3vw] md:py-[1.5vw] `}
              style={{ userSelect: "none" }}
            >
              <div className="w-full h-full bg-gray-0 translate-y-[0%] md:translate-y-[100%] group-hover:translate-y-0 transition-all duration-700 absolute top-0 left-0"></div>
              <div className=" w-full md:w-[50%] flex items-center">
                <p className=" hidden md:block text-sm md:text-[1.2vw] font3 font-medium opacity-90 md:opacity-50 cursor-pointer">
                  (0{index + 1})
                </p>
              </div>
              <div className="  w-full md:w-[40%]">
                <p className=" flex items-center gap-2  uppercase font2 text-xl md:text-[2vw] opacity-50 text-start cursor-pointer">
                  <span className="block md:hidden text-sm font-semibold">
                    (0{index + 1})
                  </span>
                  {item.title}
                </p>
              </div>
              <h5
                onClick={(e) => {
                  e.stopPropagation(); // Prevent propagation to parent
                  if (window.innerWidth < 768) {
                    openServiceSection();
                  }
                }}
                className="w-fit pl-8 md:pl-0 text-sm z-[99] font-normal opacity-50 whitespace-nowrap font3 cursor-pointer">
                ( View More )
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section3;
