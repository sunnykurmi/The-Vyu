import React, { useEffect, useRef, useState } from 'react'
import AnimatedTitle from '../buttons/AnimatedTitle'
import Revealer from '../UI/Revealer'
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const LiveClock = dynamic(() => import('./../UI/LiveClock'), { ssr: false });

const Footer = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [pendingPath, setPendingPath] = useState(null);
  const previousPath = useRef(pathname);
  const revealerRef = useRef();

  const links = [
    { title: "work", link: "/work" },
    { title: "about", link: "/about-us" },
    { title: "Contact", link: "/contact" },
    { title: "Zcommerce", link: "/zcommerce" },
    { title: "Privacy policy", link: "/privacy-policy" },
  ];

  const handleNav = async (e, path) => {
    e.preventDefault();
    if (pathname === path) return;
    if (revealerRef.current) await revealerRef.current.fadeIn();
    setPendingPath(path);
    router.push(path);
  };
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
    if (pendingPath && pathname === pendingPath && pathname !== previousPath.current) {
      revealerRef.current?.fadeOut();
      previousPath.current = pathname;
      setPendingPath(null);
    }
  }, [pathname, pendingPath]);


  return (
    <>
      <Revealer ref={revealerRef} />
      <div
        id="footer"
        data-cursor="-inverse"
      >
        <div className="w-full h-[65vh] uppercase  pb-4 lg:px-10 pt-16 text-white bg-black">
          <div className="w-full h-[90%]  grid grid-cols-2 md:flex justify-between lg:pr-32">
            <h1 className=' text-4xl lg:text-5xl md:translate-y-[-4px]'>THE VYU</h1>
            
            <div className="">
                <p className='opacity-50 uppercase mb-2 text-xs'>Contact</p>
                <p className='text-xs mt-0.5'>+91 8542069067</p>
                <p className='text-xs mt-0.5 lowercase'>hello@thevyu.com</p>
              </div>
            <div className=" h-full">
              <div className="">
                <p className='opacity-50 uppercase mb-2 text-xs'>Links</p>
                {links.map((link, index) => (
                  link.title === "services" ? (
                    <div
                      key={index}
                      onClick={openServiceSection}
                      className="group w-fit  cursor-pointer uppercase"
                    >
                      <div className="text-xs  ">
                        <p className='cursor-pointer mt-0.5'>
                          {link.title}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <a
                      href={link.link}
                      key={index}
                      onClick={(e) => handleNav(e, link.link)}
                      className="group w-fit  cursor-pointer uppercase"
                    >
                      <div className="text-xs ">
                        <p className='cursor-pointer  mt-0.5'>
                          {link.title}
                        </p>
                      </div>
                    </a>

                  )

                ))}
              </div>
            </div>
              
            <div className="">
              <p className='opacity-50 uppercase mb-2 text-xs'>Social media</p>
              <p className='text-xs mt-0.5 cursor-pointer'>Instagran</p>
              <p className='text-xs mt-0.5 cursor-pointer'>LinkedIn</p>
            </div>
          </div>
          <div className="w-full gap-1 text-xs capitalize pt-2 md:py-0 md:h-14 border-t border-dashed border-[#ffffff51]  flex flex-col md:flex-row md:items-center justify-between">
            <p>© 2025. The Vyu. &nbsp;All Rights Reserved.</p>
            <div className="flex  items-center md:gap-2">
              <p
              id='city_name'
               className='  capitalize text-xs '>
                Mumbai,&nbsp;India.</p>
              <LiveClock />
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default Footer
