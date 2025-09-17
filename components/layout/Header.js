"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { gsap } from "gsap";
import MenuOverlay from "../ui/MenuOverlay";

export default function Header() {
    const [hidden, setHidden] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [lastScroll, setLastScroll] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    // Animate burger
    useEffect(() => {
        const menuButton = document.querySelector(".menu-button");
        if (!menuButton) return;

        const topLine = menuButton.querySelector(".top-line");
        const middleLine = menuButton.querySelector(".middle-line");
        const bottomLine = menuButton.querySelector(".bottom-line");

        if (menuOpen)
        {
            gsap.to(topLine, { rotate: 45, y: 8, duration: 0.3 });
            gsap.to(middleLine, { opacity: 0, duration: 0.3 });
            gsap.to(bottomLine, { rotate: -45, y: -8, duration: 0.3 });
        } else
        {
            gsap.to(topLine, { rotate: 0, y: 0, duration: 0.3 });
            gsap.to(middleLine, { opacity: 1, duration: 0.3 });
            gsap.to(bottomLine, { rotate: 0, y: 0, duration: 0.3 });
        }
    }, [menuOpen]);

    // Handle scroll
    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setScrolled(currentScroll > 50);

            if (currentScroll > lastScroll && currentScroll > 100)
            {
                setHidden(true);
            } else
            {
                setHidden(false);
            }
            setLastScroll(currentScroll);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScroll]);

    // Auto-close overlay on resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && menuOpen)
            {
                setMenuOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [menuOpen]);

    return (
        <>
            <header
                className={clsx(
                    "fixed top-0 left-0 w-[calc(100%-1rem)] mx-2 z-50 transition-all duration-500 rounded-full mt-2 ",
                    hidden ? "-translate-y-full mt-0" : "translate-y-0",
                    scrolled
                        ? "backdrop-blur-xl bg-white/30"
                        : "bg-transparent text-white"
                )}
            >
                <div className="max-w-full mx-auto flex justify-between px-6 py-2 rounded-b-3xl mt-3">
                    <div className="text-xl font-bold">KLASHRA</div>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex space-x-6 font-medium">
                        <a href="#">Services +</a>
                        <a href="#">About +</a>
                        <a href="#">Work</a>
                        <a href="#">Careers</a>
                        <a href="#">Blog</a>
                        <a href="#">Webinar</a>
                    </nav>

                    {/* Desktop Button */}
                    <button
                        className={clsx(
                            "hidden md:block rounded-full px-5 py-2 text-sm font-semibold transition-colors",
                            scrolled
                                ? "bg-black text-white hover:bg-gray-800"
                                : "bg-white text-black hover:bg-gray-200"
                        )}
                    >
                        Get In Touch ↗
                    </button>

                    {/* Burger */}
                    <button
                        className="md:hidden text-2xl z-50 transition-transform duration-300 menu-button relative w-8 h-8 flex flex-col items-center justify-center space-y-2"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <span className="top-line block w-6 h-0.5 bg-current"></span>
                        <span className="middle-line block w-6 h-0.5 bg-current"></span>
                        <span className="bottom-line block w-6 h-0.5 bg-current"></span>
                    </button>
                </div>
            </header>

            {/* Overlay */}
            <MenuOverlay menuOpen={menuOpen} onClose={() => setMenuOpen(false)} />
        </>
    );
}
