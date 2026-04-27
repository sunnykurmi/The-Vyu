"use client";

import { Canvas } from "@react-three/fiber";
import CanvasLoader from "../components/common/CanvasLoader";
import ScrollWrapper from "../components/common/ScrollWrapper";
import Experience from "../components/experience";
import Footer from "../components/footer";
import Hero from "../components/hero";
import StayCloudContainer from "../components/models/StayCloud";
import ContactSection from "../components/sections/pricingSection/ContactSection";
import PricingCurveScroller from "../components/sections/pricingSection/PricingCurveScroller";
import Section1 from "../components/sections/pricingSection/Section1";
import Section2 from "../components/sections/pricingSection/Section2";
import Section3 from "../components/sections/pricingSection/Section3";
import Section4 from "../components/sections/pricingSection/Section4";
import WhyChoose from "../components/sections/pricingSection/WhyChoose";
import MobileCloud from "../components/models/MobileCloud";
import AnimatedTitle from "@/components/buttons/AnimatedTitle";

const Home = () => {
  return (
    <>
        <div className="  hidden fixed md:flex flex-col  gap-1 items-end  text-xs right-2 z-[99] p-5 h-10 ">
        <a
        href="#zcom-features"
          className="group cursor-pointer uppercase"
        >
          <AnimatedTitle text={
            "features"
          }
          />
        </a>
        <a
        href="#zcom-pricing"

          className="group cursor-pointer uppercase"
        >
          <AnimatedTitle text={"plans & pricing"}/>
        </a>
        <a
        href="#zcom-projects"

          className="group cursor-pointer uppercase"
        >
                   <AnimatedTitle text={"Zcom projects"}/>

        </a>
      </div>
      <div className="w-full h-[50vh]  center md:hidden">
        <p className="text-black text-[5.5vw] leading-none font2  text-center px-5">
          Zcommerce - An intuitive dashboard for managing products, orders, and
          sales — paired with a custom-coded storefront that’s built to impress
          and easy to run.
        </p>
      </div>
  
      <div className="hidden md:block">
        <CanvasLoader>
          <ScrollWrapper>
            <Hero />
          </ScrollWrapper>
        </CanvasLoader>
      </div>
      <WhyChoose />
      <Section2 />
      <PricingCurveScroller />
      <ContactSection />
    </>
  );
};
export default Home;
