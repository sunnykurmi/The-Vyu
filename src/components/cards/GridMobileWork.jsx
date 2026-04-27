import { data } from '@/utils/Data/HeroData';
import { RiArrowRightUpLine } from '@remixicon/react'
import React, { useEffect, useRef, useState } from 'react'
import Footer from '../common/Footer';

const GridMobileWork = ({ filterArray, categoryType, subCategoryType, viewType, setviewType }) => {
    const [isFooterVisible, setIsFooterVisible] = useState(false);
    const footerRef = useRef(null);

    useEffect(() => {
        const observer = new window.IntersectionObserver(
            ([entry]) => {
                setIsFooterVisible(entry.isIntersecting);
            },
            {
                root: null,
                threshold: 0,
            }
        );
        if (footerRef.current) {
            observer.observe(footerRef.current);
        }
        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current);
            }
        };
    }, []);

    const filteredProjects = data.filter(project =>
        filterArray.includes(project.title)
    );
    return (
        <div data-lenis-prevent>
            <div className={`w-full relative h-screen flex gap-20 pt-[19vh] bg-white overflow-y-scroll flex-col items-center`}>
                {
                    filteredProjects.map((project, index) => (
                        <div key={index} id='index' className="w-[85%] shrink-0 h-[59vh] ">
                            <div className="text-sm capitalize h-[8%] ">
                                <p>
                                    {index + 1} / {filteredProjects.length} -{" "}
                                    {categoryType === "all"
                                        ? "All Projects"
                                        : categoryType === "featured"
                                            ? "Featured Projects"
                                            : subCategoryType || categoryType}
                                </p>
                            </div>
                            <div className="w-full h-[76.5%] ">
                                <a href={project.projectUrl}>
                                    <img src={project.image} className='w-full h-full object-cover' alt="" />
                                </a>
                            </div>
                            <div className="uppercase w-full h-[15%] flex items-center justify-between overflow-hidden text-black ">
                                <h1 className="text-4xl">{project.title}</h1>
                                <a href={project.websiteUrl}>
                                    <RiArrowRightUpLine />
                                </a>
                            </div>
                        </div>
                    ))
                }
                <div
                    className={`switch_btn w-full center fixed mix-blend-difference z-[99] text-white bottom-10 right-0 transition-opacity duration-300${isFooterVisible ? ' opacity-0' : ' opacity-100'}`}
                >
                    {
                        viewType === "gallery" ? (
                            <>
                                <button onClick={() => setviewType("grid")} className="px-3 py-1 text-xs border border-white rounded-full">Grid View</button>
                            </>
                        ) : (
                            <button onClick={() => setviewType("gallery")} className="px-3 py-1 text-xs border border-white rounded-full">Gallery View</button>
                        )
                    }
                </div>
                <div ref={footerRef} className='w-full'>
                    <Footer />
                </div>
            </div>
        </div>
    )
}

export default GridMobileWork