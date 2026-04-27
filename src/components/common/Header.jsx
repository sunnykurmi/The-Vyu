import { useRouter, usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import CustomEase from "gsap/dist/CustomEase";
import Revealer from "../UI/Revealer";
import AnimatedTitle from "../buttons/AnimatedTitle";
import { RiCloseLine, RiMenu2Line } from "@remixicon/react";
import { servicesData } from "@/utils/Data/ServicesSectionData";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(CustomEase);
CustomEase.create("hop", "0.9, 0, 0.1, 1");

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [pendingPath, setPendingPath] = useState(null);
  const previousPath = useRef(pathname);
  const revealerRef = useRef();
  const revealerRef2 = useRef();
  const containerRef = useRef();
  const [logoVisible, setLogoVisible] = useState(false);

  const floatingServiceSection = useRef(null);
  const serviceTL = useRef(null);
  const closeBtnRef = useRef(null);
  const [showContent, setShowContent] = useState(false);

  const [hoverPara, sethoverPara] = useState("")
  const hoverContainerRef = useRef(null);
  const hoverContentRef = useRef(null);
  const hoverTimeout = useRef(null);

  const [openMenu, setOpenMenu] = useState(false)

  const [isWorkPage, setIsWorkPage] = useState(false)

  const links = [
    { title: "home", link: "/" },
    { title: "work", link: "/work" },
    { title: "about", link: "/about-us" },
    { title: "Contact", link: "/contact" },
    { title: "services", link: "" },
    { title: "Zcommerce", link: "/zcommerce" },
  ];

  const handleNav = async (e, path) => {
    e.preventDefault();
    if (pathname === path) return;
    if (revealerRef.current) await revealerRef.current.fadeIn();
    setPendingPath(path);
    router.push(path);
    setOpenMenu(false);
  };

  useEffect(() => {
    if (pendingPath && pathname === pendingPath && pathname !== previousPath.current) {
      revealerRef.current?.fadeOut();
      previousPath.current = pathname;
      setPendingPath(null);
    }
  }, [pathname, pendingPath]);

  useEffect(() => {
    if (pathname === "/") {
      gsap.set("#logoText", { display: "none" });
      gsap.set("#logoImg", { display: "none" });
    } else {
      gsap.set("#logoText", { display: "block" });
      gsap.set("#logoImg", { display: "none" });
    }
  }, [pathname]);

  useEffect(() => {
    const showLogo = () => {
      gsap.to("#logoText", { display: "block", duration: 0 });
      setLogoVisible(true); // update state
    };

    const hideLogo = () => {
      gsap.set("#logoText", { display: "none" });
      setLogoVisible(false); // update state
    };

    window.addEventListener("headtextHidden", showLogo);
    window.addEventListener("headtextVisible", hideLogo);

    return () => {
      window.removeEventListener("headtextHidden", showLogo);
      window.removeEventListener("headtextVisible", hideLogo);
    };
  }, []);


  useEffect(() => {
    const SCROLL_THRESHOLD = 100;
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY) < SCROLL_THRESHOLD) {
        ticking = false;
        return;
      }

      const isScrollingDown = currentScrollY > lastScrollY;

      if (isScrollingDown) {
        // Scrolling Down
        if (window.innerWidth > 768) {
          gsap.to("#nav", {
            y: "-16vh",
            duration: 0.6,
          });
        }
        gsap.set("#logoText", { display: "none" });
        gsap.set("#logoImg", { display: "block" });
      } else {
        // Scrolling Up
        gsap.to("#nav", {
          y: "0vh",
          duration: 0.6,
        });
        gsap.set("#logoImg", { display: "none" });
        gsap.set("#logoText", { display: "block" });

        if (pathname === "/") {
          if (currentScrollY > window.innerHeight * 0.6) {
            gsap.set("#logoText", { display: "block" });
          } else {
            gsap.set("#logoText", { display: "none" });
          }
        } else {
          gsap.set("#logoImg", { display: "none" });
          gsap.set("#logoText", { display: "block" });
        }
      }

      lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    const shouldRun = logoVisible || [
      "/about-us", "/work", "/contact", "/zcommerce", "/privacy-policy"
    ].some(path => pathname.startsWith(path));

    if (shouldRun) {
      window.addEventListener("scroll", onScroll);
    }

    return () => {
      if (shouldRun) {
        window.removeEventListener("scroll", onScroll);
      }
    };
  }, [logoVisible, pathname]);


  const openServiceSection = () => {
    setShowContent(false); // hide content first

    const tl = gsap.timeline({
      onComplete: () => setShowContent(true) // show after animation
    });

    serviceTL.current = tl;

    tl.to(revealerRef2.current, {
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

    const revealerEl = revealerRef2.current;
    revealerEl?.addEventListener("click", handleClick);

    return () => revealerEl?.removeEventListener("click", handleClick);
  }, []);

  const hoverNavAnimation = (e) => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > window.innerHeight * 0.6) {

      gsap.to("#nav", {
        y: "0vh",
        duration: 1,
      });
      gsap.set("#logoImg", { display: "none" });
      gsap.set("#logoText", { display: "block" });
      gsap.to("#logoImg", {
        display: "none",
        duration: 0,
      });
      gsap.to("#logoText", {
        display: "block",
        duration: 0,
      });


    }
  }

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

  useEffect(() => {
    setIsWorkPage(pathname === "/work");
  }, [pathname]);


  const containerVariants = {
    initial: { height: 0 },
    animate: {
      height: "100vh",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1, // stagger text reveal
      },
    },
    exit: {
      height: 0,
      transition: { duration: 0.4, ease: "easeInOut" },
    },
  };

  const itemVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { y: 50, opacity: 0, transition: { duration: 0.4 } },
  };

  return (
    <>
      <div
        ref={revealerRef2}
        className="revealer pointer-events-none cursor-pointer fixed top-0 left-0 w-screen h-screen bg-[#000000b1] z-[9999] opacity-0 flex items-center justify-center"
      >

      </div>
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
      <Revealer ref={revealerRef} />
      <div
        onPointerEnter={hoverNavAnimation}
        onPointerMove={hoverNavAnimation}
        onPointerOver={hoverNavAnimation}
        onMouseEnter={hoverNavAnimation}
        onMouseMove={hoverNavAnimation}
        onMouseOver={hoverNavAnimation}
        id="nav" className={`fixed  z-[49] w-[25vh] h-[30vh]  ${isWorkPage ? "text-white mix-blend-difference" : "text-black mix-blend-normal"} p-3 md:p-5`}>
        <div
          className={` hidden md:flex flex-col gap-1 `}
          ref={containerRef}
        >
          {links.map((link, index) => (
            link.title === "services" ? (
              <div
                key={index}
                onClick={openServiceSection}
                className="group w-fit cursor-pointer uppercase"
              >
                <div className="text-xs ">
                  <AnimatedTitle text={link.title} />
                </div>
              </div>
            ) : (
              <a
                href={link.link}
                key={index}
                onClick={(e) => handleNav(e, link.link)}
                className="group w-fit cursor-pointer uppercase"
              >
                <div className="text-xs ">
                  <AnimatedTitle text={link.title} />
                </div>
              </a>

            )

          ))}
        </div>
        <div
          onClick={(e) => handleNav(e, "/")}
          className="fixed top-[0vh]  md:top-[16vh] left-[1.5vh] md:left-[2.8vh] cursor-pointer z-[49]"
        >
          <h1 id="logoText" className={`${isWorkPage ? "text-white mix-blend-difference" : "text-black mix-blend-normal"}  hidden uppercase text-[10vw] md:text-[3vw]`}>
            the vyu
          </h1>
          <img
            id="logoImg"
            className={`hidden  translate-y-[2vh] md:translate-y-[3vh] w-8 md:w-12`}
            src="/logo/vyu_logo_black.png"
            alt="Logo"
          />
        </div>
      </div>
      <AnimatePresence>
        {openMenu && (
          <motion.div
            variants={containerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed top-0 left-0 w-full bg-white z-[999] flex flex-col items-center justify-center gap-3 overflow-hidden"
          >
            {links.map((link, index) => {
              const item = (
                <div
                  key={index}
                  className="block overflow-hidden" >
                  <motion.div
                    variants={itemVariants}
                    className="overflow-hidden w-fit text-5xl"
                  >
                    <motion.h1>
                      <AnimatedTitle text={link.title} />
                    </motion.h1>
                  </motion.div>
                </div>
              );

              return link.title === "services" ? (
                <div
                  key={index}
                  onClick={openServiceSection}
                  className="group w-fit cursor-pointer uppercase"
                >
                  {item}
                </div>
              ) : (
                <a
                  href={link.link}
                  onClick={(e) => {
                    handleNav(e, link.link);
                    setOpenMenu(false);
                  }}
                  key={index}
                  className={`group w-fit cursor-pointer uppercase ${pathname === link.link ? "opacity-30" : "opacity-100"}  `}
                >
                  {item}
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {
        isWorkPage ? (
          <div
            className={` block md:hidden capitalize mix-blend-difference  fixed z-[9999] top-3 right-2 `}>
            {
              openMenu ? (
                <p
                  onClick={() => setOpenMenu(false)}
                  className={` ${isWorkPage ? "text-white border-white " : "border-black text-black "} py-1 px-3 border  text-xs rounded-full`}>
                  Close
                </p>
              ) : (
                <p
                  onClick={() => setOpenMenu(true)}
                  className={` ${isWorkPage ? "text-white border-white " : "border-black text-black "} py-1 px-3  border  text-xs rounded-full`}>
                  Menu
                </p>
              )
            }
          </div>

        ) : (
          <div
            className={` block md:hidden capitalize  fixed z-[9999] top-3 right-2 `}>
            {
              openMenu ? (
                <p
                  onClick={() => setOpenMenu(false)}
                  className={` ${isWorkPage ? "text-white border-white " : "border-black text-black "} py-1 px-3 border  text-xs rounded-full`}>
                  Close
                </p>
              ) : (
                <p
                  onClick={() => setOpenMenu(true)}
                  className={` ${isWorkPage ? "text-white border-white " : "border-black text-black "} py-1 px-3  border  text-xs rounded-full`}>
                  Menu
                </p>
              )
            }
          </div>
        )
      }


    </>
  );
};

export default Header;
