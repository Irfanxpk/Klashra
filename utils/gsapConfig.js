"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

// ✅ Register plugins only once, and only in the browser
if (typeof window !== "undefined" && !gsap.core.globals()["ScrollTrigger"])
{
    gsap.registerPlugin(ScrollTrigger, ScrollSmoother);
}

export { gsap, ScrollTrigger, ScrollSmoother };
