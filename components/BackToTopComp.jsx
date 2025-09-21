"use client";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function BackToTopComp() {
  const iconRef = useRef(null);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { y: 0 },
        {
          y: -5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
          duration: 0.8,
        }
      );
    }
  }, []);

  return (
  <button
    onClick={scrollToTop}
    className="flex items-center gap-2 text-white cursor-pointer transition-colors"
    aria-label="Volver arriba"
  >
    <span className="text-sm font-medium">Back To Top</span>
    <svg
      ref={iconRef}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className="w-6 h-6"
    >
      <polygon points="16,14 6,24 7.4,25.4 16,16.8 24.6,25.4 26,24 " />
    </svg>
  </button>
);

}
