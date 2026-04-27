import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import SplitType from "split-type";

const AnimatedButton = ({padding, text }) => {
  const [hasMounted, setHasMounted] = useState(false);

  const firstRef = useRef(null);
  const secondRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    text1Ref.current = new SplitType(firstRef.current, { types: "chars" });
    text2Ref.current = new SplitType(secondRef.current, { types: "chars" });

    gsap.set(text2Ref.current.chars, { yPercent: 100 });
  }, [hasMounted]);

  const handleMouseEnter = () => {
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    tl.to(
      text1Ref.current.chars,
      {
        yPercent: -100,
        stagger: 0.02,
        duration: 0.3,
      },
      "start"
    );

    tl.to(
      text2Ref.current.chars,
      {
        yPercent: 0,
        stagger: 0.02,
        duration: 0.3,
      },
      "start"
    );
  };

  const handleMouseLeave = () => {
    const tl = gsap.timeline({ defaults: { ease: "power2.inOut" } });

    tl.to(
      text2Ref.current.chars,
      {
        yPercent: 100,
        stagger: 0.02,
        duration: 0.3,
      },
      "start"
    );

    tl.to(
      text1Ref.current.chars,
      {
        yPercent: 0,
        stagger: 0.02,
        duration: 0.3,
      },
      "start"
    );
  };

  if (!hasMounted) return null;

return (
  <div
     onMouseEnter={handleMouseEnter}
     onMouseLeave={handleMouseLeave}
   className={`${padding?"px-0 pr-3":"px-4"} h-full w-full center py-3`}>

  <div
    className="relative overflow-hidden center leading-none h-full w-full cursor-pointer"
    >
    <span ref={firstRef} className="first inline-block cursor-pointer w-full  ">
      {text}
    </span>
    <span ref={secondRef} className="second inline-block absolute top-0 left-0 cursor-pointer w-full  ">
      {text}
    </span>
  </div>
    </div>
);

};

export default AnimatedButton;
