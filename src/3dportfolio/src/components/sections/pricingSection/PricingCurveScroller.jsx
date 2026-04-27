import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import MouseFollower from "mouse-follower";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from 'react-icons/io';

MouseFollower.registerGSAP(gsap);
const PricingCurveScroller = () => {

    const scrollRef = useRef(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);


    const data = [{
        img: "/zcomm/zcom_iWhiteKorea_3.png",
        url: "https://iwhite-korea.vercel.app"
    }, {
        img: "/zcomm/zcom_deveshe_2.png",
        url: "https://deveshe.vercel.app"
    }, {
        img: "/zcomm/zcom_celesta.png",
        url: "https://celestacakes.com"
    }, {
        img: "/zcomm/zcom_sensie_store.png",
        url: "https://www.thesenseisstore.com"
    }]

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        let isDown = false;
        let startX;
        let scrollLeft;

        const updateScroll = () => {
            const maxScroll = el.scrollWidth - el.clientWidth;
            const progress = (el.scrollLeft / maxScroll) * 100;
            setScrollProgress(progress);
            setContainerWidth(el.clientWidth);
        };

        const onMouseDown = (e) => {
            isDown = true;
            el.classList.add('dragging');
            startX = e.pageX - el.offsetLeft;
            scrollLeft = el.scrollLeft;
        };

        const onMouseLeave = () => {
            isDown = false;
        };

        const onMouseUp = () => {
            isDown = false;
        };

        const onMouseMove = (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - el.offsetLeft;
            const walk = (x - startX) * 1.5; // scroll speed
            el.scrollLeft = scrollLeft - walk;
        };

        el.addEventListener("scroll", updateScroll);
        el.addEventListener("mousedown", onMouseDown);
        el.addEventListener("mouseleave", onMouseLeave);
        el.addEventListener("mouseup", onMouseUp);
        el.addEventListener("mousemove", onMouseMove);

        updateScroll();

        return () => {
            el.removeEventListener("scroll", updateScroll);
            el.removeEventListener("mousedown", onMouseDown);
            el.removeEventListener("mouseleave", onMouseLeave);
            el.removeEventListener("mouseup", onMouseUp);
            el.removeEventListener("mousemove", onMouseMove);
        };
    }, []);





    return (
        <div id='zcom-projects'>
            <div
                id='scroll_div' className="w-full md:pt-10 mt-10 md:mt-0  relative bg-white  overflow-hidden  ">
                <div className="flex px-4 md:px-20   items-center justify-between">

                    <h1 className='text-3xl md:text-5xl   uppercase'>Projects</h1>
                    <div className="flex gap-2 items-center">
                        <img
                            className="w-4 md:w-6 cursor-pointer"
                            src="/images/arrowLeft.jpeg"
                            alt="scroll left"
                            onClick={() => {
                                scrollRef.current?.scrollBy({
                                    left: -containerWidth * 0.8,
                                    behavior: 'smooth',
                                });
                            }}
                        />
                        <p className="text-xs md:text-base">Scroll</p>
                        <img
                            className="w-4 md:w-6 cursor-pointer"
                            src="/images/arrowRight.jpeg"
                            alt="scroll right"
                            onClick={() => {
                                scrollRef.current?.scrollBy({
                                    left: containerWidth * 0.8,
                                    behavior: 'smooth',
                                });
                            }}
                        />
                    </div>

                </div>
                <div
                    ref={scrollRef}
                    className=" h-[35vh] md:h-[75vh] px-4 md:px-10 flex cursor-pointer items-center md:mt-10 overflow-x-scroll scroll-snap-x scroll-smooth"
                    style={{ scrollSnapType: 'x mandatory' }}
                >
                    {data.map((item, index) => (
                        <a
                            href={item.url}
                            key={index}
                            className="shrink-0 overflow-hidden w-[70vw] md:w-[45vw] h-full flex justify-center items-center"
                            style={{ scrollSnapAlign: 'center' }}
                        >
                            <img
                                className="w-full h-full object-cover hover:scale-110 transition-all duration-300"
                                src={item.img}
                                alt=""
                            />
                        </a>
                    ))}
                </div>

                <div className="w-full px-4 md:px-10 center">
                    <div className="w-full mt-5 md:mt-10 overflow-hidden h-[2px] bg-gray-300">
                        <div
                            className="h-full bg-black "
                            style={{ width: `${Math.max(105, (scrollProgress / 100) * containerWidth)}px` }}
                        ></div>

                    </div>
                </div>

            </div>
        </div>

    )
}

export default PricingCurveScroller