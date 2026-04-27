import React from "react";
import SeoHeader from "@/components/seo/SeoHeader";
import Home from "@/3dportfolio/src/pages";
import { Const } from "@/utils/Constants";

const Zcommerce = ({ meta }) => {
  return (
    <>
      <SeoHeader meta={meta} />
      <div data-lenis-prevent>
        <Home />
      </div>
    </>
  );
};

export default Zcommerce;

export async function getStaticProps() {
  const meta = {
    title: "Zcommerce | The Vyu – Creative Web Studio in Mumbai",
    description:
      "The Vyu is a creative team of designers, developers, and storytellers building memorable web experiences. Learn more about who we are and what we believe in.",
    og: {
      title: "Zcommerce | The Vyu – Creative Web Studio in Mumbai",
      description:
        "The Vyu is a creative team of designers, developers, and storytellers building memorable web experiences. Learn more about who we are and what we believe in.",
    },
    twitter: {
      title: "Zcommerce | The Vyu – Creative Web Studio in Mumbai",
      description:
        "The Vyu is a creative team of designers, developers, and storytellers building memorable web experiences. Learn more about who we are and what we believe in.",
    },
    keywords: [],
    author: Const.Brand,
    robots: "index,follow",
  };
  return { props: { meta: meta } };
}
