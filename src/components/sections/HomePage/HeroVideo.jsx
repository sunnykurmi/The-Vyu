import React, { useRef, useState, useEffect } from 'react'

const HeroVideo = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isAnimatingBack, setIsAnimatingBack] = useState(false);
  const [origin, setOrigin] = useState({ top: 0, left: 0, width: 0, height: 0 });
  const boxRef = useRef(null);

  const handleToggleExpand = () => {
    if (!isExpanded && boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      setOrigin({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height
      });
      setIsExpanded(true);
    } else {
      // Start reverse animation
      setIsAnimatingBack(true);
      setTimeout(() => {
        setIsAnimatingBack(false);
        setIsExpanded(false);
      }, 700); // Must match reverse animation duration
    }
  };

  // 🔒 Lock body scroll when expanded
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else if (!isAnimatingBack) {
      document.body.style.overflow = '';
    }
  }, [isExpanded, isAnimatingBack]);

  return (
    <div
    // data-lenis-prevent
    >
      <div className="w-full  h-[30vh]  md:h-[60vh] lg:h-[80vh]  center relative">
        {(isExpanded || isAnimatingBack) && (
          <div
            data-cursor-text="."
            className="fixed center bg-white z-[999]"
            style={{
              top: isAnimatingBack ? 0 : origin.top,
              left: isAnimatingBack ? 0 : origin.left,
              width: isAnimatingBack ? '100vw' : origin.width,
              height: isAnimatingBack ? '100vh' : origin.height,
              animation: `${isAnimatingBack ? 'shrinkBox' : 'expandBox'} 0.7s forwards`,
            }}
            onClick={handleToggleExpand}
          >
<video
  onClick={(e) => e.stopPropagation()}
  loop
  autoPlay
  muted
  playsInline
  className={`object-cover ${isAnimatingBack ? 'video-shrink' : 'video-expand'}`}
  style={{
    width: isAnimatingBack ? '100%' : '90%',
    height: isAnimatingBack ? '100%' : '90%',
    animation: `${isAnimatingBack ? 'videoShrink' : 'videoExpand'} 0.7s forwards`
  }}
  src="/video/nuts-reel_compressed.mp4"
/>
          </div>
        )}
        {!isExpanded && !isAnimatingBack && (
          <div
            data-cursor-text="play"
            ref={boxRef}
            onClick={handleToggleExpand}
            className="h-full w-[90vw]  md:w-[30vw] bg-white cursor-pointer"
          >
            <video
              loop
              autoPlay
              muted
              playsInline
              className='w-full h-full object-cover' src="/video/nuts-reel_compressed.mp4"></video>
          </div>
        )}
      </div>
      <style>{`
       @keyframes expandBox {
  to {
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
  }
}
@keyframes shrinkBox {
  to {
    top: ${origin.top}px;
    left: ${origin.left}px;
    width: ${origin.width}px;
    height: ${origin.height}px;
  }
}
@keyframes videoExpand {
  from {
    width: 90%;
    height: 90%;
  }
  to {
    width: 90%;
    height: 90%;
  }
}
@keyframes videoShrink {
  from {
    width: 90%;
    height: 90%;
  }
  to {
    width: 100%;
    height: 100%;
  }
}

      `}</style>
    </div>
  )
}

export default HeroVideo
