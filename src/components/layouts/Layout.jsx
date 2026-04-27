import React, { useRef, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import Revealer from "../UI/Revealer";
import Loader from "@/components/common/Loader";
import MediaVideo from "../MediaVideo";

export default function Layout({ menu, children }) {
  const router = useRouter();
  const skipFooter =
    router.pathname === "/*" ||
    router.pathname === "/work" ||
    router.pathname === "/portfolio" ||
    router.pathname === "/3dwork";

  const revealerRef = useRef();

  const [showLoader, setShowLoader] = useState(false);
  const [initialLoadDone, setInitialLoadDone] = useState(false);

  useEffect(() => {
    const navEntry = performance.getEntriesByType("navigation")[0];
    const isFirstVisit =
      navEntry?.type === "navigate" || navEntry?.type === "reload" || window.performance.navigation.type === 1;

    if (router.pathname === "/" && isFirstVisit) {
      setShowLoader(true);
      const timer = setTimeout(() => {
        setShowLoader(false);
        setInitialLoadDone(true);
      }, 4300);

      return () => clearTimeout(timer);
    } else {
      setInitialLoadDone(true);
    }
  }, []);

  return (
    <>
      {/* {showLoader && <Loader />} */}
      {/* {showLoader && <MediaVideo/>} */}
      {showLoader && <MediaVideo/>}
      <Revealer ref={revealerRef} />
      {initialLoadDone && !showLoader && <Header />}
      {initialLoadDone && !showLoader && children}
      {initialLoadDone && !skipFooter && !showLoader && <Footer />}
    </>
  );
}
