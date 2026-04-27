import React, { useEffect } from "react";
import SeoHeader from "@/components/seo/SeoHeader";
import Hero from "@/components/home/Hero";
import { Const } from "@/utils/Constants";

const Home = ({ meta }) => {

  return (
    <>
      <SeoHeader meta={meta} />
      <Hero />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const meta = {
    title: "Interactive Web Design & Development Studio in Mumbai | The Vyu",
    description:
      "The Vyu is a Mumbai-based creative studio specializing in interactive websites, motion design, and web development. We help brands build unforgettable online experiences.",
    og: {
      title: "Interactive Web Design & Development Studio in Mumbai | The Vyu",
      description:
        "The Vyu is a Mumbai-based creative studio specializing in interactive websites, motion design, and web development. We help brands build unforgettable online experiences.",
    },
    twitter: {
      title: "Interactive Web Design & Development Studio in Mumbai | The Vyu",
      description:
        "The Vyu is a Mumbai-based creative studio specializing in interactive websites, motion design, and web development. We help brands build unforgettable online experiences.",
    },
    keywords: [],
    author: Const.Brand,
    robots: "index,follow",
  };
  return { props: { meta: meta } };
}
