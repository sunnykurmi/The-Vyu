import { Canvas } from '@react-three/fiber';
import { EffectComposer } from '@react-three/postprocessing';
import * as THREE from 'three';
import { useEffect, useRef, useState } from 'react';
import ScrollCards from '@/components/cards/ScrollCards';
import ScrollDistortion from '@/components/UI/ScrollDistortion';

import gsap from 'gsap';
import MouseFollower from "mouse-follower";
import { RiArrowLeftLine, RiArrowRightLine, RiArrowRightUpLongLine } from '@remixicon/react';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';
import AnimatedTitle from '@/components/buttons/AnimatedTitle';
import { data } from '@/utils/Data/HeroData';

MouseFollower.registerGSAP(gsap);
const CurveScroller = () => {
    const targetIntensity = useRef(0);
    const currentIntensity = useRef(0);
    const scrollCardsRef = useRef(null);
    const hasScrolledRef = useRef(false);
    const containerRef = useRef(null);

    const [textSize, setTextSize] = useState(0.2)
    useEffect(() => {
        if (window.innerWidth < 768) {
            setTextSize(0.3);
        } else {
            setTextSize(0.2);
        }
    }, [])

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
                    scrollCardsRef.current?.scrollBy(1);
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
        <div>
            <div
                ref={containerRef}
                id='scroll_div' className="w-full md:mb-10 relative overflow-hidden">
                <div className="w-full px-5 md:px-10 translate-y-[4vh] flex items-center justify-between">
                    <div className="text-4xl md:text-3xl lg:text-5xl bg-white text-black uppercase">
                        <h1>projects</h1>
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
                    data-cursor-text="view"
                    className="h-[28vh]  mt-5  md:h-[55vh] cursor-none w-full center"
                >
                    <Canvas camera={{ position: [0, 0, 3.5], fov: 75 }} gl={{ outputColorSpace: THREE.SRGBColorSpace }}>
                        <ScrollCards
                            ref={scrollCardsRef}
                            targetIntensity={targetIntensity}
                            data={data}
                            CARD_WIDTH={3.5}
                            CARD_HEIGHT={4}
                            Text_size={textSize}
                        />
                        <EffectComposer>
                            <ScrollDistortion targetIntensity={targetIntensity} currentIntensity={currentIntensity} />
                        </EffectComposer>
                    </Canvas>
                </div>
            </div>

            <div className=" w-full p-5 md:p-0 flex z-[99] bg-white ">
                <div className="w-[50%] hidden md:flex flex-col  justify-end p-16">
                    {/* <p className="text-xs  font-semibold mb-4 flex items-center ">
            Play Reel
            <RiPlayFill size={16} className=" text-black" />
          </p>
          <div className=" overflow-hidden w-[40vh] h-[25vh] ">
            <video loop autoPlay muted playsInline className='w-full h-full ' src="/video/nuts-reel.mp4"></video>
          </div> */}
                </div>
                <div className=" mt-12 md:mt-0 w-full md:w-[50%] flex flex-col justify-center gap-2 md:gap-4 md:pr-20">
                    <p className=" hidden md:block text-sm md:text-xl font3 font-normal mb-1">
                        THE VYU
                    </p>
                    <h1 className="font-oswald uppercase font-extrabold text-5xl lg:text-8xl leading-none ">
                        Our code. <br /> Your story.
                    </h1>
                    <p className=" text-sm md:text-base font3 ">
                        Not just websites — your brand’s storyteller, crafted with modern tech and captivating design.
                    </p>
                    <div className="flex w-fit gap-1 justify-between items-center text-sm font-normal">
                        <a className="border-b text-xs md:text-sm flex items-center gap-1 border-black pb-1 hover:text-gray-700 hover:border-gray-700" href="/work">
                            <AnimatedTitle text={"Explore All Work"} />
                        </a>
                        <RiArrowRightUpLongLine size={16} />
                        {/* <span>
                            (Scroll)
                        </span> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurveScroller