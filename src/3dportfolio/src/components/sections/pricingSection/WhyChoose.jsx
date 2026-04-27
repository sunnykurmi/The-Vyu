import React from 'react'

const WhyChoose = () => {
    const data = [
        {
            title: "STOREFRONT ",
            img: "/icons/STOREFRONT_icon.png",
            para: "Bored of Shopify templates? Our custom-coded storefronts are built to reflect your brand — interactive, exclusive, and anything but generic."
        },
        {
            title: "DASHBOARD  ",
            para: "Less clutter, more conversions. The Zcommerce dashboard helps you boost sales, manage inventory, optimize products, and track performance — all from one clean, intuitive space.",
            img: "/icons/DASHBOARD_icon.png",
        },
        {
            title: "IN-DEPTH ANALYTICS  ",
            img: "/icons/IN-DEPTH_ANALYTICS_icon.png",
            para: "Know what’s working, what’s selling, and where to improve. With real-time insights and detailed reports, Zcommerce helps you turn data into growth."
        },
        {
            title: "INCREASED SALES ",
            img: "/icons/INCREASED_SALES_icon.png",
            para: "Zcommerce drives higher engagement with a world-class checkout experience — built to increase conversions and boost sales by up to 35% compared to standard platforms."
        },
    ]
    return (
        <div id='zcom-features'>
            <div className="w-full  bg-gradient-to-b from-[#ffffff] md:from-[#D7DEE1] to-[#ffffff]  mb-20">
                <div className="w-full  px-5 pt-5 md:px-20">
                    <h1 className='text-3xl md:text-5xl'>WHY CHOOSE US</h1>
                </div>
                <div className="w-full center flex-col mt-8 md:mt-10">
                    {
                        data.map((item, index) => (
                            <div key={index} className="w-full pb-7 md:pb-0 pt-4 md:pt-0 md:w-[85%] relative overflow-hidden group flex flex-col md:flex-row md:h-[15vh] border-b">
                                <div className="w-full md:w-1/2 pl-5 md:pl-10 flex items-center mb-3 md:mb-0  md:h-full">
                                    <p className='text-sm md:text-xl z-[9]'>{item.title} </p>
                                </div>
                                <div className=" px-2 w-full md:w-1/2 md:pr-10 md:h-full flex gap-0 md:gap-10 items-center ">
                                    <div className="w-[20%] md:w-[10%] h-full center ">
                                        <img className='w-[60%] md:w-[80%] z-[9] hover:scale-110 transition-all duration-300' src={item.img} alt="" />
                                    </div>
                                    <div className="w-[80%] z-[9] ml-2">
                                        <p className='text-xs md:text-sm text-black leading-none opacity-80 z-[99]'>{item.para}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default WhyChoose