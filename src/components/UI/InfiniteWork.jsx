import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { data } from './../../utils/Data/HeroData';


export default function InfiniteWork() {

    const containerRef = useRef(null);
    const scrollX = useRef(0);
    const scrollY = useRef(0);
    const velocity = useRef({ x: 0, y: 0 });
    const isMouseDown = useRef(false);
    const [tick, setTick] = useState(0);
    const [shuffledImages, setShuffledImages] = useState([]);
    const [elementDimensions, setElementDimensions] = useState({ width: 0, height: 0 });
    const [isClient, setIsClient] = useState(false);
    const lastMousePos = useRef({ x: 0, y: 0 });

    const preloadImages = (urls) => {
        urls.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    };

    const shuffle = (arr) => {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    useEffect(() => {
        setIsClient(true);
        if (typeof window !== 'undefined') {
            var width
            var height
            if (window.innerWidth < 600) {
                width = 0.7 * window.innerWidth;
                height = 0.5 * window.innerHeight;

            } else {
                width = 0.3 * window.innerWidth;
                height = 0.6 * window.innerHeight;
            }
            setElementDimensions({ width, height });
            preloadImages(data[0].image || []);
            setShuffledImages(shuffle(image));
            scrollX.current = -((0 * width) - window.innerWidth / 2 + width / 1.2);
            scrollY.current = -((0 * height) - window.innerHeight / 2 + height / 1.2);
        }
    }, []);


    useEffect(() => {
        if (!isClient) return;

        const onWheel = (e) => {
            const speed = isMouseDown.current ? 2 : 0.3;
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
                e.preventDefault();
            }
            velocity.current.x += (e.deltaX * speed) * 0.2;
            velocity.current.y += (e.deltaY * speed) * 0.2;
        };


        const onMouseDown = (e) => {
            isMouseDown.current = true;
            lastMousePos.current = { x: e.clientX, y: e.clientY };
        };

        const onMouseUp = () => (isMouseDown.current = false);

        const onMouseMove = (e) => {
            if (!isMouseDown.current) return;

            const dx = e.clientX - lastMousePos.current.x;
            const dy = e.clientY - lastMousePos.current.y;

            velocity.current.x = -dx * 1.1;
            velocity.current.y = -dy * 1.1;

            lastMousePos.current = { x: e.clientX, y: e.clientY };
        };

        const onTouchStart = (e) => {
            isMouseDown.current = true;
            const touch = e.touches[0];
            lastMousePos.current = { x: touch.clientX, y: touch.clientY };
        };

        const onTouchMove = (e) => {
            if (!isMouseDown.current) return;
            const touch = e.touches[0];
            const dx = touch.clientX - lastMousePos.current.x;
            const dy = touch.clientY - lastMousePos.current.y;
            velocity.current.x = -dx;
            velocity.current.y = -dy;
            lastMousePos.current = { x: touch.clientX, y: touch.clientY };
        };

        const onTouchEnd = () => {
            isMouseDown.current = false;
        };


        const animate = () => {
            scrollX.current += velocity.current.x;
            scrollY.current += velocity.current.y;
            velocity.current.x *= 0.9;
            velocity.current.y *= 0.9;
            setTick((prev) => prev + 1);
            requestAnimationFrame(animate);
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);

        window.addEventListener('touchstart', onTouchStart, { passive: false });
        window.addEventListener('touchmove', onTouchMove, { passive: false });
        window.addEventListener('touchend', onTouchEnd);


        animate();

        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);

            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);

        };
    }, [isClient]);

    const GRID_SIZE = 8;
    const TILE_WIDTH = elementDimensions.width;
    const TILE_HEIGHT = elementDimensions.height;

    const visibleTiles = [];

    if (isClient) {
        const centerX = Math.floor(scrollX.current / TILE_WIDTH);
        const centerY = Math.floor(scrollY.current / TILE_HEIGHT);

        const halfGrid = Math.floor(GRID_SIZE / 2);

        for (let dx = -halfGrid; dx <= halfGrid; dx++) {
            for (let dy = -halfGrid; dy <= halfGrid; dy++) {
                const xIndex = centerX + dx;
                const yIndex = centerY + dy;
                const tileX = xIndex * TILE_WIDTH;
                const tileY = yIndex * TILE_HEIGHT + (xIndex % 2 === 0 ? 150 : 0);

                visibleTiles.push({
                    x: tileX,
                    y: tileY,
                    id: `${xIndex}-${yIndex}`,
                    img: shuffledImages[Math.abs(xIndex + yIndex) % shuffledImages.length],
                });
            }
        }
    }


    if (!isClient) {
        return null; 
    }

    return (
        <>
            <div
                ref={containerRef}
                className="absolute"
                style={{ transform: `translate(${-scrollX.current}px, ${-scrollY.current}px)` }}
            >
                {visibleTiles.map(({ x, y, id, img }) => {
                    const vMagnitude = Math.sqrt(velocity.current.x ** 2 + velocity.current.y ** 2);
                    const maxVelocity = 900;
                    const scale = Math.max(0.095, 1 - (vMagnitude / maxVelocity));
                    return (
                        <div
                            key={id}
                            className="absolute group transition-all duration-500"
                            style={{
                                left: x,
                                top: y,
                                width: `${TILE_WIDTH}px`,
                                height: `${TILE_HEIGHT}px`,
                                transform: `scale(${scale})`,
                                transformOrigin: 'center center',
                                transition: 'transform 0.1s ease-out',
                            }}
                        >
                            <motion.div
                                initial={{ scale: 0, filter: 'blur(50px)' }}
                                animate={{ scale: 1, filter: 'blur(0)' }}
                                transition={{
                                    duration: 0.8,
                                    delay: Math.random() * 0.6,
                                    ease: [0.23, 1, 0.32, 1],
                                }}
                                className="relative w-full h-full">
                                <img
                                    src={img}
                                    alt="Tile"
                                    className="w-full h-full object-cover"
                                    draggable="false"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0000005a] flex justify-end flex-col opacity-0 group-hover:opacity-100 text-white p-6 transition-opacity duration-500 z-10">
                                    <p className="text-xl font-semibold opacity-80">2025</p>
                                    <p className="text-3xl font-bold">Project Title</p>
                                    <p className="font-semibold opacity-80 cursor-pointer hover:underline">
                                        View Project
                                    </p>
                                </div>
                            </motion.div>
                        </div>


                    );
                })}
            </div>
        </>

    );
}