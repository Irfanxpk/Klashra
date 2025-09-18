"use client";

import { ScrollSmoother } from "@/utils/gsapConfig";
import { useGSAP } from "@gsap/react";


export default function SmoothWrapper({ children }) {
    useGSAP(() => {
        if (ScrollSmoother && !ScrollSmoother.get())
        {
            ScrollSmoother.create({
                wrapper: "#smooth-wrapper",
                content: "#smooth-content",
                smooth: 0.7, // scroll duration
                effects: true,
            });
        }
    }, []);

    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">{children}</div>
        </div>
    );
}
