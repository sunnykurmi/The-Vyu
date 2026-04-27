import { data } from '@/utils/Data/HeroData'
import React, { useRef } from 'react'

const HeroNormalScroll = () => {
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = scrollRef.current.offsetWidth * .99; 
            if (direction === 'left') {
                scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div>
            <div
                id='scroll_div' className="  mt-10  w-full md:mb-10 relative   overflow-hidden  ">
                <div className="w-full py-5 px-5 md:px-10  flex items-center justify-between">
                    <div className="    text-4xl md:text-3xl lg:text-5xl bg-white  text-black uppercase">
                        <h1>projects</h1>
                    </div>
                    <div className='  flex gap-2 items-center'>
                        <img
                            className=' w-5 md:w-6 cursor-pointer'
                            src="/images/arrowLeft.jpeg"
                            alt=""
                            onClick={() => scroll('left')}
                        />
                        <p className='text-sm md:text-base '>
                            Scroll
                        </p>
                        <img
                            className=' w-5 md:w-6 cursor-pointer'
                            src="/images/arrowRight.jpeg"
                            alt=""
                            onClick={() => scroll('right')}
                        />
                    </div>
                </div>
                <div
                    ref={scrollRef}
                    className=" w-full flex gap-4 px-5 overflow-x-scroll scrollbar-hide">
                    {
                        data.map((item, index) => {
                            return (
                                <div key={index} className="w-[45vw]  shrink-0 h-[30vh] ">
                                    <div className="w-full h-[85%]">
                                        <a href={item.projectUrl}>
                                            <img className='h-full w-full object-cover' src={item.image} alt="" />
                                        </a>
                                    </div>
                                    <div className="w-full h-[15%] ">
                                        <a href={item.websiteUrl} className='text-xs text-black'>
                                            {item.title}
                                        </a>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default HeroNormalScroll