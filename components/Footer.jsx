"use client";
import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BackToTopComp from "./BackToTopComp";

export default function Footer() {
  const foot = useRef();
  const wordRef = useRef(null);

  useGSAP(() => {
    gsap.from(foot.current, {
      y: 200,
      duration: 1.5,
      ease: "power3.out",
    });
  });

  useEffect(() => {
    if (!wordRef.current) return;
    const el = wordRef.current;
    const letters = el.querySelectorAll(".letter");

    const onEnter = () => {
      gsap.to(letters, {
        rotateY: "+=360",
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.05,
      });
    };

    el.addEventListener("mouseenter", onEnter);

    return () => {
      if (el) {
        el.removeEventListener("mouseenter", onEnter);
      }
    };
  }, []);

  return (
    <footer ref={foot} className="mt-auto">
      <div className="flex justify-between items-center px-6 py-4 border-t border-white/10 text-gray-400 text-sm">
        <div className="flex gap-3 items-center">
          <span>&copy; 2025</span>
          <span
            ref={wordRef}
            className="font-semibold cursor-pointer text-white select-none flex gap-[2px]"
          >
            {"Whxismou".split("").map((char, i) => (
              <span
                key={i}
                className="letter inline-block will-change-transform"
              >
                {char}
              </span>
            ))}
          </span>
        </div>

        <BackToTopComp />
      </div>
    </footer>
  );
}
