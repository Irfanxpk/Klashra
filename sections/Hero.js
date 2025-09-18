"use client";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/utils/gsapConfig"; // using your global config

const growthImages = [
    "/images/dubai-customs-seeklogo.png",
    "/images/dubai-police-seeklogo.png",
    "/images/image.png",
];

export default function Hero() {
    const headingRef = useRef(null);
    const subRef = useRef(null);
    const imgRefs = useRef([]);

    const [videoReady, setVideoReady] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    useGSAP(() => {
        gsap.fromTo(
            headingRef.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
        );

        gsap.fromTo(
            subRef.current,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: "power3.out" }
        );

        const tl = gsap.timeline({ repeat: -1 });
        imgRefs.current.forEach((img, i) => {
            tl.to(img, {
                opacity: 1,
                duration: 0.8,
                ease: "power3.inOut",
            }).to(
                img,
                {
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.inOut",
                },
                "+=1.7"
            );
        });
    }, []);

    const handleImageLoad = () => setImageLoaded(true);
    const handleVideoLoad = () => setVideoReady(true);

    return (
        <section className="relative w-full h-screen flex items-center justify-center p-2">
            <div className="relative w-full h-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
                {/* Fallback image */}
                <img
                    src="https://picsum.photos/1920/1080"
                    alt="Hero Placeholder"
                    className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${videoReady ? "opacity-0" : "opacity-100"
                        }`}
                    onLoad={handleImageLoad}
                />

                {/* Background video */}
                {imageLoaded && (
                    <video
                        className={`w-full h-full object-cover transition-opacity duration-1000 ${videoReady ? "opacity-100" : "opacity-0"
                            }`}
                        autoPlay
                        muted
                        playsInline
                        onLoadedData={handleVideoLoad}
                        preload="auto"
                        style={{
                            filter: "blur(1px) brightness(0.9)",
                            position: "absolute",
                            top: 0,
                            left: 0,
                        }}
                    >
                        <source src="/Video/tower dubai stock.mp4" type="video/mp4" />
                    </video>
                )}

                {/* Overlay */}
                <div className="absolute inset-0">
                    <img src="/images/noise.svg" alt="" className="w-full h-full object-cover" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-10 text-white">
                    {/* Top tag */}
                    <p
                        className="
    mt-4 text-sm sm:text-sm md:text-base 
    font-bold uppercase tracking-tight leading-tight text-center
    bg-clip-text text-transparent animate-gradient
  "
                        style={{
                            backgroundImage:
                                "linear-gradient(90deg, #ff0000, #008000, #ffffff, #000000, #ff0000)",
                        }}
                    >
                        #1 Most Recommended <br />
                        Business Consulting in Dubai
                    </p>




                    <h1
                        ref={headingRef}
                        className="text-center  font-medium
             text-7xl sm:text-6xl md:text-7xl lg:text-9xl 
             drop-shadow-lg flex flex-col items-center gap-3 sm:gap-4 mt-5 sm:mt-7 tracking-tight leading-9 md:leading-24"
                    >
                        {/* Line 1 - Always */}
                        <span className="tracking-tighter">We Launch</span>

                        {/* Line 2 - Market + Image (always together) */}
                        <span className="flex items-center gap-2 sm:gap-3 md:gap-4">
                            <span className="">Market</span>
                            <span className="relative w-20 h-20 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 bg-white rounded-lg overflow-hidden mb-4 md:mb-0 md:mx-4 ml-5">
                                {growthImages.map((src, i) => (
                                    <img
                                        key={i}
                                        ref={(el) => {
                                            if (el) imgRefs.current[i] = el;
                                        }}
                                        src={src}
                                        alt={`Growth Icon ${i + 1}`}
                                        className="absolute inset-0 w-full h-full object-contain opacity-0 p-2"
                                    />
                                ))}
                            </span>

                            {/* Leaders: break only below md */}
                            <span className="hidden md:block">Leaders</span>
                        </span>
                        <span className="block md:hidden">Leaders</span>

                    </h1>



                    {/* Sub-heading */}
                    <h2 className="text-center font-medium text-lg sm:text-xl md:text-2xl lg:text-4xl mt-4 sm:mt-6 tracking-tight">
                        in the heart of Dubai
                    </h2>
                </div>

                {/* Sub description (bottom-left) */}
                <div className="absolute bottom-6 sm:bottom-8 left-3 sm:left-5">
                    <p
                        ref={subRef}
                        className="hidden md:block text-sm md:text-[16px] text-gray-200 drop-shadow-md max-w-xs sm:max-w-md leading-tight tracking-tight"
                    >
                        From company formation to trade licenses,{" "}
                        <span className="font-bold">visas & approvals</span> — we handle it
                        all, so you can focus on{" "}
                        <span className="font-bold">growth</span>.
                    </p>
                </div>

                {/* Scroll indicator (bottom-center) */}
                <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2">
                    <img
                        src="/images/scroll.webp"
                        alt="Scroll Down"
                        className="w-6 h-6 sm:w-8 sm:h-8 animate-bounce opacity-80"
                    />
                </div>
            </div>
        </section>
    );
}
