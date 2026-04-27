import { data as originalData } from '@/utils/Data/HeroData'
import React, { useEffect, useRef, useState } from 'react'
import CustomEase from "gsap/dist/CustomEase";

gsap.registerPlugin(CustomEase);
import gsap from 'gsap'
import { category } from '@/utils/Data/Category';

const ListWork = () => {
    const imageColRef = useRef(null);
    const imageRefs = useRef([]);
    const itemRefs = useRef([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [categoryType, setcategoryType] = useState("all")
    const [eventListenersEnabled, setEventListenersEnabled] = useState(false);
    const [subCategoryType, setsubCategoryType] = useState('')
    const [value, setValue] = useState(0)
    const [filterArray, setfilterArray] = useState([
        ...category[0].subcategories[0].projectNames,
    ])

    const data = [
        ...originalData.slice(-1),
        ...originalData,
        ...originalData.slice(0, 1),
    ];

    useEffect(() => {
        let cont = imageColRef.current;
        let card = cont.getElementsByClassName("group")[currentIndex];
        setValue(cont.offsetTop - card.offsetTop)
    }, [currentIndex])

    useEffect(() => {

        gsap.fromTo(".a_wrap", {
            transform: "translateY(-100%)",
        }, {
            transform: "translateY(0%)",
            duration: 1,
            stagger: 0.05,
        })

        gsap.set(".list_anim", {
            opacity: 0,
        });
        gsap.to(".list_anim", {
            y: 0,
            opacity: 1,
            duration: 1,
        })

        gsap.to(imageColRef.current, {
            opacity: 1,
            delay: 1
        }
        )
        gsap.fromTo("#line", {
            width: "0%"
        }, {
            width: "35%"
            ,
            delay: 1
        });
        gsap.fromTo("#card_2", {
            top: "50%"
        }, {
            top: "17.4%",
            delay: 1
        });
        gsap.fromTo("#card_3", {
            top: "50%"
        }, {
            top: "83%",
            delay: 1
        });
        gsap.to("#card_1 ,#card_2 , #card_3", { display: "none", duration: .4, delay: 1.8 })

    }, [])

    const handleMouseMove = (index) => {
        const refs = itemRefs.current[index];
        if (!refs) return;

        gsap.to([refs.overlays.leftNumber,
        refs.overlays.leftTitle],
            { transform: "translateX(0)", duration: 0.2, ease: "power2.out" })
        gsap.to([refs.overlays.rightTitle,
        refs.overlays.rightNumber], { transform: "translateX(0)", duration: 0.2, ease: "power2.out" })

        gsap.to([refs.texts.leftNumber,
        refs.texts.leftTitle,
        refs.texts.rightTitle,
        refs.texts.rightNumber], { color: '#fff', duration: 0.2, ease: "power2.out" })

    }

    const handleMouseLeave = (index) => {
        if (currentIndex !== index) return; // prevent wrong triggers
        const refs = itemRefs.current[index];
        if (!refs) return;

        gsap.to([refs.overlays.leftNumber, refs.overlays.leftTitle], {
            transform: "translateX(-101%)",
            duration: 1,
            ease: "power3.out",
        });
        gsap.to([refs.overlays.rightTitle, refs.overlays.rightNumber], {
            transform: "translateX(101%)",
            duration: 1,
            ease: "power3.out",
        });

        gsap.to([
            refs.texts.leftNumber,
            refs.texts.leftTitle,
            refs.texts.rightTitle,
            refs.texts.rightNumber,
        ], {
            color: '#000',
            duration: 0.2,
            ease: "power3.out",
        });
    }

    const allSubcategories = () => {
        const selected = category.find(cat => cat.categoryHead === categoryType);
        return selected?.subcategories || [];
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setEventListenersEnabled(true);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);


    return (
        <div className="w-full h-screen list_wrapper relative">
            <div id='card_1' className="absolute w-[24vh] h-[30vh]  z-[999] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                <img className='w-full h-full object-cover' src="/workImages/iWhiteKorea_cover.webp" alt="" />
            </div>
            <div id='card_2' className="absolute w-[24vh] h-[30vh]  z-[99] top-[19%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                <img className='w-full h-full object-cover' src="/workImages/tap_heart.png" alt="" />
            </div>
            <div id='card_3' className="absolute w-[24vh] h-[30vh]  z-[99] top-[81%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                <img className='w-full h-full object-cover' src="/workImages/just_nosh_cover.webp" alt="" />
            </div>

            <div className="fixed top-5 uppercase text-sm w-full flex items-center justify-between  ">
                <div className="w-1/2 pointer-events-none"></div>
                <div className="w-1/2  flex items-top justify-end gap-10 transition-all duration-300">
                    <div className='w-[10%] transition-all duration-300 '>
                        {category.map((cat, index) => (
                            (cat.categoryHead === "all") || (cat.categoryHead === "featured") ? (
                                <h2
                                    key={index}
                                    onClick={() => {
                                        setcategoryType(cat.categoryHead);
                                        setsubCategoryType('');
                                        setfilterArray(cat.subcategories[0].projectNames);
                                    }}
                                    className={`text-xs font3 cursor-pointer transition-all duration-300 ${categoryType === cat.categoryHead ? 'opacity-100' : 'opacity-50'
                                        }`}
                                >
                                    {cat.categoryHead}
                                </h2>
                            ) : (
                                <h2
                                    key={index}
                                    onClick={() => setcategoryType(cat.categoryHead)}
                                    className={`text-xs font3 cursor-pointer transition-all duration-300 ${categoryType === cat.categoryHead ? 'opacity-100' : 'opacity-50'
                                        }`}
                                > {cat.categoryHead}
                                </h2>
                            )
                        ))}
                    </div>
                    <div className='w-[30%]'>
                        {allSubcategories().map((subcat, index) => (
                            <div
                                onClick={() => {
                                    setsubCategoryType(subcat.title);
                                    setfilterArray(subcat.projectNames);
                                }}
                                key={index}
                                className='text-xs font3 flex gap-2 cursor-pointer'
                            >
                                {
                                    categoryType !== "all" && categoryType !== "featured" && subCategoryType === subcat.title ? (
                                        <span className='text-xs w-3 opacity-100 transition-all duration-300'>
                                            ({subcat?.projectNames?.length})
                                        </span>
                                    ) : (
                                        <span className='text-xs w-3 opacity-0 transition-all duration-300'>
                                            ({subcat?.projectNames?.length})
                                        </span>
                                    )
                                }
                                <p
                                    className={`cursor-pointer transition-all duration-300 ${subCategoryType === subcat.title ? 'opacity-100' : 'opacity-50'
                                        }`}>
                                    {subcat.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div id='line' className="absolute w-[0%] h-[1px] bg-black top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"></div>
            <div
                ref={imageColRef}
                style={{
                    transform: `translate(-50%, ${value + 18}px)`,
                }}
                className="w-[24vh] z-[9]  opacity-0 absolute left-[50%] transition duration-700  scrollbar-hide"
            >
                {data.map((item, index) => (
                    <div
                        key={index}
                        className='group '
                    >
                        <a
                            href={item.projectUrl}>
                            <div
                                ref={(el) => (imageRefs.current[index] = el)}
                                className="w-[24vh]  relative cursor-pointer overflow-hidden  h-[30vh] "
                            >
                                <img src={item.image} className="w-full h-full object-cover" alt="" />
                            </div>
                        </a>
                        <a
                            href={item.websiteUrl}
                            className="w-full h-5  gap-1  flex items-center justify-end">
                            <h2 className=' font3 text-xs cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-500 '>visit site</h2>
                            <img className='w-3 opacity-0 group-hover:opacity-100 group-hover:-rotate-45 transition-all duration-500 ' src="/images/arrow_bg_trans.png" alt="" />
                        </a>
                    </div>
                ))}
            </div>
            <div className="w-full h-screen center">
                <div className="w-full h-[60vh] center flex-col">
                    {originalData.map((item, index) => {
                        const isVisible = filterArray.includes(item.title);
                        const staggerIndex = filterArray.indexOf(item.title);
                        const delay = isVisible ? `${staggerIndex * 0.05}s` : '0s';
                        if (!itemRefs.current[index]) {
                            itemRefs.current[index] = {
                                overlays: {
                                    leftNumber: null,
                                    leftTitle: null,
                                    rightTitle: null,
                                    rightNumber: null,
                                },
                                texts: {
                                    leftNumber: null,
                                    leftTitle: null,
                                    rightTitle: null,
                                    rightNumber: null,
                                },
                            }
                        }
                        return (
                            <a
                                key={index}
                                id={`list_item_${index}`}
                                className='relative  group w-full overflow-hidden px-5 uppercase flex items-center justify-between cursor-pointer'
                                href={item.url}
                            >
                                <div
                                    className=" a_wrap relative group w-full px-5 uppercase flex items-center justify-between"
                                >
                                    <div className="w-[40%]  relative flex  items-center  h-full overflow-hidden">
                                        {/* LEFT SIDE */}
                                        <div
                                            className="w-[32%] "
                                            onPointerEnter={() => {
                                                if (eventListenersEnabled && isVisible) {
                                                    handleMouseMove(index);
                                                    setCurrentIndex(index);
                                                }
                                            }}
                                            onMouseMove={() => {
                                                if (eventListenersEnabled && isVisible) {
                                                    handleMouseMove(index);
                                                    setCurrentIndex(index);
                                                }
                                            }}
                                            onMouseLeave={() => {
                                                if (eventListenersEnabled && isVisible) {
                                                    handleMouseLeave(index);
                                                }
                                            }}
                                        >
                                            <div className="w-5 relative overflow-hidden">
                                                <div
                                                    ref={(el) => (itemRefs.current[index].overlays.leftNumber = el)}
                                                    className="absolute w-full h-full bg-black z-[9]"
                                                    style={{ transform: 'translateX(-101%)' }}
                                                ></div>
                                                <p
                                                    ref={(el) => (itemRefs.current[index].texts.leftNumber = el)}
                                                    className="relative z-[10] list_anim text-black cursor-pointer"
                                                    style={{
                                                        transform: isVisible ? 'translateY(0%)' : 'translateY(-100%)',
                                                        transition: 'transform 0.5s ease',
                                                        transitionDelay: delay
                                                    }}
                                                >
                                                    {(index + 1).toString().padStart(2, '0')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="relative  overflow-hidden"
                                            onPointerEnter={() => {
                                                if (eventListenersEnabled && isVisible) {
                                                    handleMouseMove(index);
                                                    setCurrentIndex(index);
                                                }
                                            }}
                                            onMouseMove={() => {
                                                if (eventListenersEnabled && isVisible) {
                                                    handleMouseMove(index);
                                                    setCurrentIndex(index);
                                                }
                                            }}
                                            onMouseLeave={() => {
                                                if (eventListenersEnabled && isVisible) {
                                                    handleMouseLeave(index);
                                                }
                                            }}
                                        >
                                            <div
                                                ref={(el) => (itemRefs.current[index].overlays.leftTitle = el)}
                                                className="absolute w-full h-full bg-black z-[9]"
                                                style={{ transform: 'translateX(-101%)' }}
                                            ></div>
                                            <p
                                                ref={(el) => (itemRefs.current[index].texts.leftTitle = el)}
                                                className="relative z-[10] list_anim text-black cursor-pointer"
                                                style={{
                                                    transform: isVisible ? 'translateY(0%)' : 'translateY(-100%)',
                                                    transition: 'transform 0.5s ease',
                                                    transitionDelay: delay
                                                }}
                                            >
                                                {item.title}
                                            </p>
                                        </div>

                                    </div>
                             <div className="w-[40%] relative flex items-center justify-end h-full overflow-hidden">
    {/* RIGHT TITLE with event listeners */}
    <div
        className="relative overflow-hidden"
        onPointerEnter={() => {
            if (eventListenersEnabled && isVisible) {
                handleMouseMove(index);
                setCurrentIndex(index);
            }
        }}
        onMouseMove={() => {
            if (eventListenersEnabled && isVisible) {
                handleMouseMove(index);
                setCurrentIndex(index);
            }
        }}
        onMouseLeave={() => {
            if (eventListenersEnabled && isVisible) {
                handleMouseLeave(index);
            }
        }}
    >
        <div
            ref={(el) => (itemRefs.current[index].overlays.rightTitle = el)}
            className="absolute w-full h-full bg-black z-[9]"
            style={{ transform: 'translateX(101%)' }}
        ></div>
        <p
            ref={(el) => (itemRefs.current[index].texts.rightTitle = el)}
            className="relative z-[10] list_anim text-black cursor-pointer"
            style={{
                transform: isVisible ? 'translateY(0%)' : 'translateY(-100%)',
                transition: 'transform 0.5s ease',
                transitionDelay: delay
            }}
        >
            {item.title}
        </p>
    </div>

    {/* RIGHT NUMBER with event listeners */}
    <div
        className="w-[32%] flex justify-end"
        onPointerEnter={() => {
            if (eventListenersEnabled && isVisible) {
                handleMouseMove(index);
                setCurrentIndex(index);
            }
        }}
        onMouseMove={() => {
            if (eventListenersEnabled && isVisible) {
                handleMouseMove(index);
                setCurrentIndex(index);
            }
        }}
        onMouseLeave={() => {
            if (eventListenersEnabled && isVisible) {
                handleMouseLeave(index);
            }
        }}
    >
        <div className="w-5 relative overflow-hidden">
            <div
                ref={(el) => (itemRefs.current[index].overlays.rightNumber = el)}
                className="absolute w-full h-full bg-black z-[9]"
                style={{ transform: 'translateX(101%)' }}
            ></div>
            <p
                ref={(el) => (itemRefs.current[index].texts.rightNumber = el)}
                className="relative z-[10] list_anim text-black cursor-pointer"
                style={{
                    transform: isVisible ? 'translateY(0%)' : 'translateY(-100%)',
                    transition: 'transform 0.5s ease',
                    transitionDelay: delay
                }}
            >
                {(index + 1).toString().padStart(2, '0')}
            </p>
        </div>
    </div>
</div>

                                </div>
                            </a>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

export default ListWork
