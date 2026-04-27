import { category } from '@/utils/Data/Category'
import { data } from '@/utils/Data/HeroData'
import { RiArrowRightUpLine } from '@remixicon/react'
import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { AnimatePresence, motion } from "framer-motion";
import GridMobileWork from './GridMobileWork'
import GalleryMobileWork from './GalleryMobileWork'


const MobileWork = () => {
    const [categoryType, setcategoryType] = useState("all")
    const [subCategoryType, setsubCategoryType] = useState('')
    const [filterArray, setfilterArray] = useState([
        ...category[0].subcategories[0].projectNames,
    ])
    const [filterOpen, setFilterOpen] = useState(false)
    const [viewType, setviewType] = useState("gallery")

    const allSubcategories = () => {
        const selected = category.find(cat => cat.categoryHead === categoryType);
        return selected?.subcategories || [];
    };










    const containerVariants = {
        initial: { height: 0 },
        animate: {
            height: "100vh",
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeInOut",
                when: "beforeChildren",
                staggerChildren: 0.05,
            },
        },
        exit: {
            height: 0,
            transition: { duration: 0.4, ease: "easeInOut" },
        },
    };

    const itemVariants = {
        initial: { y: 30 },
        animate: { y: 0, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { y: 30, transition: { duration: 0.3 } },
    };


    return (
        <>
            <AnimatePresence>
                {filterOpen && (
                    <motion.div
                        variants={containerVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        className="fixed h-screen p-5 capitalize bg-white w-full flex z-[9999]"
                    >
                        <div
                            className="absolute text-sm top-3 right-2 cursor-pointer z-[9999] text-black"
                            onClick={() => setFilterOpen(false)}
                        >
                            <p className='px-3 py-1 border text-xs border-black rounded-full capitalize'>Close</p>
                        </div>

                        <div className="w-[30%] h-full flex flex-col items-start justify-center">
                            {category.map((cat, index) => (
                                <div
                                    key={index}
                                    className="block overflow-hidden">
                                    <motion.h2
                                        variants={itemVariants}
                                        onClick={() => {
                                            setcategoryType(cat.categoryHead);
                                            setsubCategoryType('');
                                            setfilterArray(cat.subcategories[0]?.projectNames || []);
                                            if (cat.categoryHead === "all" || cat.categoryHead === "featured") {
                                                setFilterOpen(false);
                                            }
                                        }}
                                        className={`text-lg leading-none font3 cursor-pointer transition-all duration-300 ${categoryType === cat.categoryHead ? 'opacity-100' : 'opacity-50'
                                            }`}
                                    >
                                        {cat.categoryHead}
                                    </motion.h2>
                                </div>
                            ))}
                        </div>

                        {/* Right side (subcategories) */}
                        <div className="w-[70%] h-full flex flex-col justify-center items-end">
                            {allSubcategories().map((subcat, index) => (
                                <div className=" block overflow-hidden" key={index}>

                                    <motion.div
                                        key={index}
                                        variants={itemVariants}
                                        onClick={() => {
                                            setsubCategoryType(subcat.title);
                                            setfilterArray(subcat.projectNames);
                                            setFilterOpen(false);
                                        }}
                                        className="font3 flex gap-2 items-center cursor-pointer"
                                    >
                                        <span
                                            className={`text-xs leading-none w-3 transition-all duration-300 ${categoryType !== "all" &&
                                                categoryType !== "featured" &&
                                                subCategoryType === subcat.title
                                                ? "opacity-100"
                                                : "opacity-50"
                                                }`}
                                        >
                                            ({subcat?.projectNames?.length})
                                        </span>
                                        <p
                                            className={`text-base cursor-pointer leading-none transition-all duration-300 ${subCategoryType === subcat.title ? "opacity-100" : "opacity-50"
                                                }`}
                                        >
                                            {subcat.title}
                                        </p>
                                    </motion.div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className={`absolute text-sm top-3 right-16 mr-1 z-[99]  ${categoryType === "featured" || categoryType === "sectors" || categoryType === "services" ? " text-black" : "text-white"}  mix-blend-difference cursor-pointer`} onClick={() => setFilterOpen(true)}>
                <p className={`px-3 py-1 text-xs border
                    ${categoryType === "featured" || categoryType === "sectors" || categoryType === "services" ? "bg-[#e2e2e2]" : "bg-transparent"}  border-white rounded-full`}>Filter</p>
            </div>
            {categoryType === "featured" || categoryType === "sectors" || categoryType === "services" ?(
            <div
                onClick={() => {
                    setcategoryType("all");
                    setsubCategoryType('');
                    setfilterArray(category[0].subcategories[0]?.projectNames || []);
                }}
                className="absolute text-sm top-10 right-16 mr-2 z-[99] text-white mix-blend-difference cursor-pointer"
            >
                <p className='underline text-xs'>Remove</p>
            </div>
            ):null}
            <div className=" w-full center mix-blend-difference absolute z-[99] text-white bottom-10 right-0 ">
                {
                    viewType === "gallery" ? (
                        <>
                            <button onClick={() => setviewType("grid")} className="px-3 py-1 text-xs border border-white rounded-full">Grid View</button>
                        </>
                    ) : (
                        ""
                    )
                }
            </div>

            {
                viewType === "grid" ? (
                    <GridMobileWork filterArray={filterArray} categoryType={categoryType} subCategoryType={subCategoryType} viewType={viewType} setviewType={setviewType} />
                ) : (
                    <GalleryMobileWork filterArray={filterArray} categoryType={categoryType} subCategoryType={subCategoryType} />
                )
            }

        </>

    )
}

export default MobileWork
