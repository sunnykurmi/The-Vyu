import { useEffect } from "react";
import Layout from "@/components/layouts/Layout";
import "@/styles/globals.css";
import "@/styles/globals2.css";

import LenisScroll from "@/components/LenisScroll";
import MouseFollower from "mouse-follower";
import gsap from "gsap";
MouseFollower.registerGSAP(gsap);


export default function App({ Component, pageProps }) {
  useEffect(() => {
    if (window.innerWidth < 768) return;
    const cursor = new MouseFollower({ visible: true });
    return () => {
      cursor.destroy();
    };
  }, []);
  useEffect(() => {
    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
      }
    };
    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <LenisScroll>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </LenisScroll>
  );
}
