"use client";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { gsap } from "gsap";

export default function MenuOverlay({ menuOpen, onClose }) {
    const [servicesOpen, setServicesOpen] = useState(false);
    const [aboutOpen, setAboutOpen] = useState(false);
    const overlayRef = useRef(null);
    const timelineRef = useRef(null);

    // Setup GSAP animation once
    useEffect(() => {
        if (!overlayRef.current) return;

        const tl = gsap.timeline({ paused: true });
        timelineRef.current = tl;

        tl.to(overlayRef.current, {
            x: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power3.inOut",
        }).fromTo(
            ".menu-item",
            { x: -50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.4,
                ease: "power3.out",
            },
            "<"
        );
    }, []);

    // Play / reverse animation
    useEffect(() => {
        if (!timelineRef.current) return;
        if (menuOpen)
        {
            timelineRef.current.play();
        } else
        {
            timelineRef.current.reverse();
        }
    }, [menuOpen]);

    return (
        <div
            ref={overlayRef}
            className={clsx(
                "menu-overlay fixed inset-0 bg-black/90 backdrop-blur-xl z-40 flex flex-col justify-start transform -translate-x-full opacity-0"
            )}
        >
            <div className="text-white text-4xl font-bold mt-20 px-12 space-y-4">
                {/* Services */}
                <div className="menu-item">
                    <div
                        onClick={() => setServicesOpen(!servicesOpen)}
                        className="flex items-center justify-between p-4 cursor-pointer"
                    >
                        <span>Services</span>
                        <span>{servicesOpen ? "–" : "+"}</span>
                    </div>
                    {servicesOpen && (
                        <div className="text-2xl font-normal ml-8 space-y-2">
                            <a href="#" className="block p-2">Sub-service 1</a>
                            <a href="#" className="block p-2">Sub-service 2</a>
                        </div>
                    )}
                </div>

                {/* About */}
                <div className="menu-item">
                    <div
                        onClick={() => setAboutOpen(!aboutOpen)}
                        className="flex items-center justify-between p-4 cursor-pointer"
                    >
                        <span>About</span>
                        <span>{aboutOpen ? "–" : "+"}</span>
                    </div>
                    {aboutOpen && (
                        <div className="text-2xl font-normal ml-8 space-y-2">
                            <a href="#" className="block p-2">Sub-about 1</a>
                            <a href="#" className="block p-2">Sub-about 2</a>
                        </div>
                    )}
                </div>

                {/* Other Links */}
                <a href="#" className="menu-item block p-4">Work</a>
                <a href="#" className="menu-item block p-4">Careers</a>
                <a href="#" className="menu-item block p-4">Blog</a>
                <a href="#" className="menu-item block p-4">Webinar</a>
            </div>

            {/* Button */}
            <button
                onClick={onClose}
                className="rounded-full px-5 py-2 text-sm font-semibold bg-white text-black hover:bg-gray-200 transition-colors mt-8 mx-auto"
            >
                Get In Touch ↗
            </button>
        </div>
    );
}
