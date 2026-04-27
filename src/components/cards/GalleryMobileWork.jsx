import { data } from '@/utils/Data/HeroData';
import { RiArrowRightUpLine } from '@remixicon/react';
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'


const GalleryMobileWork = ({ filterArray, categoryType, subCategoryType }) => {


    const filteredProjects = data.filter(project =>
        filterArray.includes(project.title)
    );
    const slidesRef = useRef([]);
    const innerSlidesRef = useRef([]);
    const countsRef = useRef([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const isAnimating = useRef(false);

    useEffect(() => {
        let touchStartY = 0;
        let touchEndY = 0;

        const handleScroll = (direction) => {
            if (filteredProjects.length <= 1 || isAnimating.current) return;
            isAnimating.current = true;

            const nextSlide = (currentSlide + direction + filteredProjects.length) % filteredProjects.length;


            const slides = slidesRef.current;
            const innerSlides = innerSlidesRef.current;
            const counts = countsRef.current;
            if (!slides || !innerSlides || !counts) {
                isAnimating.current = false;
                return;
            }


            const tl = gsap.timeline({
                onComplete: () => {
                    setCurrentSlide(nextSlide);
                    isAnimating.current = false;
                },
            });

            const setupSlide = (index, isNext) => {
                const slide = slides[index];
                const innerSlide = innerSlides[index];
                const count = counts[index];
                if (!slide || !innerSlide || !count) {
                    isAnimating.current = false;
                    return;
                }
                const img = slide.querySelector("img");
                const text = slide.querySelector(".slide-text");
                const innerImg = innerSlide.querySelector("img");

                gsap.set(slide, {
                    clipPath: isNext
                        ? direction > 0
                            ? "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"
                            : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
                        : undefined,
                });
                gsap.set(img, {
                    objectPosition: "50% " + (isNext ? (direction > 0 ? "-20%" : "20%") : undefined),
                    scale: isNext ? 1.5 : undefined,
                });
         
                gsap.set(innerSlide, {
                    clipPath: direction > 0
                        ? "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
                        : "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
                });
                gsap.set(innerImg, {
                    objectPosition: "50% " + (direction > 0 ? "1000%" : "-1000%"),
                });
            };

            const animateOut = (index) => {
                const slide = slides[index];
                const innerSlide = innerSlides[index];
                const count = counts[index];

                if (!slide || !innerSlide || !count) {
                    isAnimating.current = false;
                    return;
                }

                const img = slide.querySelector("img");
                const text = slide.querySelector(".slide-text h1");
                const innerImg = innerSlide.querySelector("img");

                tl.to(slide, {
                    clipPath: direction > 0
                        ? "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
                        : "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
                    duration: 1.5,
                    ease: "expo.out",
                }, "a")
                    .to(img, {
                        objectPosition: "50% " + (direction > 0 ? "20%" : "-20%"),
                        scale: 1.5,
                        duration: 1.5,
                        ease: "expo.out",
                    }, "a")
                    .to(text, {
                        transform: direction > 0
                            ? "translateY(-100%)"
                            : "translateY(100%)",
                        opacity: 0,
                        duration: 0.8,
                    }, "a")
                    .to(count, {
                        transform: direction > 0
                            ? "translateY(-100%)"
                            : "translateY(100%)",
                        opacity: 0,
                        duration: 0.8,
                    }, "a")
        
                    .to(innerSlide, {
                        clipPath: direction > 0
                            ? "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
                            : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                        duration: 1.5,
                        ease: "expo.out",
                    }, "a")
                    .to(innerImg, {
                        objectPosition: direction > 0 ? "50% -1000%" : "50% 1000%",
                        duration: 1.5,
                        ease: "expo.out",
                    }, "a");
            };

            const animateIn = (index) => {
                const slide = slides[index];
                const innerSlide = innerSlides[index];
                const count = counts[index];
                if (!slide || !innerSlide || !count) {
                    isAnimating.current = false;
                    return;
                }
                const img = slide.querySelector("img");
                const text = slide.querySelector(".slide-text h1");
                const innerImg = innerSlide.querySelector("img");

                tl.to(slide, {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    duration: 1.5,
                    ease: "expo.out",
                }, "a")
                    .to(img, {
                        objectPosition: "50% 0%",
                        scale: 1,
                        duration: 1.5,
                        ease: "expo.out",
                    }, "a")
                    .fromTo(text, {
                        transform: `translateY(${direction > 0 ? "100%" : "-100%"})`,
                        opacity: 0,
                    }, {
                        transform: "translateY(0%)",
                        opacity: 1,
                        duration: 0.8,
                    }, "a")
                    .fromTo(count, {
                        transform: `translateY(${direction > 0 ? "100%" : "-100%"})`,
                        opacity: 0,
                    }, {
                        transform: "translateY(0%)",
                        opacity: 1,
                        duration: 0.8,
                    }, "a")
    
                    .to(innerSlide, {
                        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                        duration: 1.5,
                        ease: "expo.out",
                    }, "a")
                    .to(innerImg, {
                        objectPosition: "50% 0%",
                        duration: 1.5,
                        ease: "expo.out",
                    }, "a");
            };

            setupSlide(nextSlide, true);
            animateOut(currentSlide);
            animateIn(nextSlide);
        };

        const onWheel = (e) => {
            e.preventDefault();
            handleScroll(e.deltaY > 0 ? 1 : -1);
        };

        const onTouchStart = (e) => {
            touchStartY = e.touches[0].clientY;
        };

        const onTouchMove = (e) => {
            touchEndY = e.touches[0].clientY;
        };

        const onTouchEnd = () => {
            const diff = touchStartY - touchEndY;
            if (Math.abs(diff) > 50) {
                handleScroll(diff > 0 ? 1 : -1);
            }
        };

        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("touchstart", onTouchStart, { passive: false });
        window.addEventListener("touchmove", onTouchMove, { passive: false });
        window.addEventListener("touchend", onTouchEnd, { passive: false });

        return () => {
            window.removeEventListener("wheel", onWheel);
            window.removeEventListener("touchstart", onTouchStart);
            window.removeEventListener("touchmove", onTouchMove);
            window.removeEventListener("touchend", onTouchEnd);
        };
    }, [currentSlide, filteredProjects]);


    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);
    return (
        <div data-lenis-prevent className='h-[100dvh]  bg-black w-full overflow-hidden relative'>
            <div className="h-full w-full overflow-hidden relative">
                {filteredProjects.map((project, index) => (
                    filteredProjects.length === 1 ? (
                        <div

                            className=" absolute w-full h-full overflow-hidden"
                        >
                            <img
                                className="w-full h-full object-cover blur-sm brightness-[.3]"
                                src={project.image}
                            />
                            <div

                                className=" absolute top-[50%] left-[50%]  translate-x-[-50%] translate-y-[-50%] z-[999] w-[85%] h-[50%]"
                            >
                                <a href={project.projectUrl}>
                                    <img
                                        className="w-full h-full object-cover"
                                        src={project.image}
                                    />
                                </a>
                            </div>
                            <div className="absolute bottom-[17%]   w-full center text-white ">
                                <div className="w-[85%]  flex items-center justify-between overflow-hidden">
                                    <h1 className="text-4xl">{project.title}</h1>
                                    <a href={project.websiteUrl}>
                                        <RiArrowRightUpLine />
                                    </a>
                                </div>
                            </div>
                            <div
                                className="absolute text-sm capitalize top-[20%] w-full center  z-[10] text-white ">
                                <div className="w-[85%]">
                                    <p>
                                        {index + 1} / {filteredProjects.length} -{" "}
                                        {categoryType === "all"
                                            ? "All Projects"
                                            : categoryType === "featured"
                                                ? "Featured Projects"
                                                : subCategoryType || categoryType}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            key={index}
                            ref={el => (slidesRef.current[index] = el)}
                            style={{
                                clipPath:
                                    index === 0
                                        ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
                                        : "polygon(0 0, 100% 0, 100% 0%, 0% 0%)",
                            }}
                            className="slide absolute w-full h-full overflow-hidden"
                        >
                            <img
                                className="w-full h-full object-cover blur-sm brightness-[.3]"
                                src={project.image}
                            />
                            <div
                                ref={el => (innerSlidesRef.current[index] = el)}
                                style={{
                                    clipPath:
                                        index === 0
                                            ? "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
                                            : "polygon(0 0, 100% 0, 100% 0%, 0% 0%)",
                                }}
                                className="inner-slide absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[999] w-[85%] h-[50%]"
                            >
                                <a href={project.projectUrl}>
                                    <img
                                        className="w-full h-full object-cover"
                                        src={project.image}
                                    />
                                </a>
                            </div>
                            <div className="absolute bottom-[17%]   w-full center text-white slide-text">
                                <div className="w-[85%]  flex items-center justify-between overflow-hidden">
                                    <h1 className="text-4xl">{project.title}</h1>
                                    <a href={project.websiteUrl}>
                                        <RiArrowRightUpLine />
                                    </a>
                                </div>
                            </div>
                            <div
                                ref={el => (countsRef.current[index] = el)}
                                className="absolute text-sm capitalize top-[20%] w-full center  z-[10] text-white ">
                                <div className="w-[85%]">
                                    <p>
                                        {index + 1} / {filteredProjects.length} -{" "}
                                        {categoryType === "all"
                                            ? "All Projects"
                                            : categoryType === "featured"
                                                ? "Featured Projects"
                                                : subCategoryType || categoryType}
                                    </p>
                                </div>
                            </div>
                        </div>
                    )

                ))}
            </div>
        </div>
    )
}

export default GalleryMobileWork