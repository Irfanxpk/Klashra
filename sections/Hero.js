"use client";
import { useEffect, useRef, useState } from "react";

export default function Hero() {
    const headingRef = useRef(null);
    const [videoReady, setVideoReady] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        // Animate heading on component mount
        // GSAP is loaded globally via the script tag in the return statement.
        if (window.gsap)
        {
            window.gsap.fromTo(
                headingRef.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
            );
        }
    }, []);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleVideoLoad = () => {
        // Set videoReady to true when video is ready to play
        setVideoReady(true);
    };

    return (
        <>
            <section className="relative w-full h-screen flex items-center justify-center  p-2">
                {/* Media wrapper with spacing and rounded corners */}
                <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                    <img
                        src="https://picsum.photos/1920/1080"
                        alt="Hero Placeholder"
                        className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${videoReady ? 'opacity-0' : 'opacity-100'}`}
                        onLoad={handleImageLoad}
                    />
                    {imageLoaded && (
                        <video
                            className={`w-full h-full object-cover transition-opacity duration-1000 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
                            autoPlay
                            muted
                            loop
                            playsInline
                            onLoadedData={handleVideoLoad}
                            preload="auto"
                            style={{ filter: 'blur(5px) brightness(0.7)', position: 'absolute', top: 0, left: 0 }}
                        >
                            <source
                                src="https://www.w3schools.com/html/mov_bbb.mp4"
                                type="video/mp4"
                            />
                        </video>
                    )}

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                    {/* Content inside media */}
                    <div className="absolute inset-0 flex flex-col justify-center items-center px-6 text-white text-center">
                        <h1
                            ref={headingRef}
                            className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
                        >
                            Empowering Businesses with Strategy & Innovation
                        </h1>
                        <p className="mt-6 text-lg text-gray-200 drop-shadow-md max-w-2xl">
                            Klashara helps you transform your business with expert consultancy,
                            tailored solutions, and proven results.
                        </p>
                        <button className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition">
                            Get Started
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
