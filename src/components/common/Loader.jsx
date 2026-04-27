import React, { useEffect } from 'react'
import gsap from 'gsap'

const Loader = () => {

    useEffect(() => {
        const tl = gsap.timeline({ delay: 0.5 });
        const steps = 4;
        const rightPositions = ["55%", "30%", "0%", "-30%"];

        for (let i = 0; i < steps - 1; i++) {
            const current = `.step-${i}`;
            const next = `.step-${i + 1}`;

            tl.to(`.slide-a${current}`, {
                left: "-100%",
                duration: 1,
                ease: "power3.out",
            }, `step-${i}`);

            tl.to(`.slide-b${current}`, {
                left: "-100%",
                duration: 1,
                ease: "power3.out",
            }, `step-${i}`);

            tl.to(`.slide-a${next}`, {
                left: "0%",
                duration: 1,
                ease: "power3.out",
            }, `step-${i}`);

            tl.to(`.slide-b${next}`, {
                left: "0%",
                duration: 1,
                ease: "power3.out",
            }, `step-${i}`);

            if (rightPositions[i]) {
                tl.to(".number_slider", {
                    right: rightPositions[i],
                    duration: 1,
                    ease: "power3.out",
                }, `step-${i}`);
            }
        }
        gsap.to(".loader_parent", {
            opacity: 0,
            duration: 1.5,
            ease: "expo.inOut",
            delay: 3.3,
            opacity: 0,
            top: "0vh",
            scale: 0,
            height: "5vh",
            width: "10vw",
            rotate: 10,
        });

    }, []);




    return (
        <div>
            <div className=" loader_parent translate-x-[-50%]   fixed top-0 text-white left-[50%] flex flex-col justify-between w-full h-[100dvh] bg-black">
                <div className="w-full flex items-center  p-4 md:p-10">
                    <div className="w-1/2 flex h-full md:items-center">
                        <h1 className=' text-3xl md:text-6xl translate-y-1 opacity-50'>THE VYU</h1>
                    </div>
                    {/* <img className=' w-8 md:w-12' src="/logo/vyu_logo_white.png" alt="" /> */}
                    <div className=" w-1/2 flex-col text-end md:text-start gap-10 md:gap-0 md:flex-row flex text-xs md:text-xl text-white opacity-50 capitalize  ">
                        <div className="">
                            <p className=' '>Digital & Branding Design</p>
                            <p className='  '>Web Design & Development</p>
                        </div>
                        <div className="md:ml-32 ">
                            <p className=' '>+91 8542069067</p>
                            <p className='  lowercase'>hello@thevyu.com</p>
                        </div>
                    </div>
                </div>
                <div className="relative w-full h-[40vw] md:h-[20vw] text-white text-[25vw] md:text-[18vw] ">
                    <div className="number_slider absolute h-full flex">
                        <div className="relative w-[16vw] md:w-[11vw]  pl-3 overflow-hidden flex items-center h-full">
                            {["0", "3", "7", "9"].map((num, index) => (
                                <div
                                    key={index}
                                    className={`slide slide-a step-${index} absolute shrink-0`}
                                    style={{ left: index === 0 ? "0%" : "100%" }}
                                >
                                    <p>
                                        {num}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="relative w-[16vw] md:w-[11vw]  pl-3 overflow-hidden flex items-center h-full">
                            {["2", "4", "8", "9"].map((num, index) => (
                                <div
                                    key={index}
                                    className={`slide slide-b step-${index} absolute shrink-0`}
                                    style={{ left: index === 0 ? "0%" : "100%" }}
                                >
                                    <p>
                                        {num}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Loader