"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollIndicator() {
  const lineRef = useRef(null);
  const wrapperRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    if (!wrapperRef.current || !lineRef.current) return;

    const createLineAnimation = () => {
      const tl = gsap.timeline({ repeat: -1 });
      tl.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "center top" },
        { scaleY: 1, duration: 1, ease: "power2.inOut" }
      ).to(lineRef.current, {
        scaleY: 0,
        transformOrigin: "center bottom",
        duration: 1,
        ease: "power2.inOut",
      });
      return tl;
    };

    gsap.fromTo(
      wrapperRef.current,
      { x: 40, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        onComplete: () => {
          if (!tlRef.current) {
            tlRef.current = createLineAnimation();
          }
        },
      }
    );

    ScrollTrigger.create({
      start: "top+=1 top",
      onEnter: () => {
        gsap.to(wrapperRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            tlRef.current?.kill();
            tlRef.current = null;
          },
        });
      },
      onLeaveBack: () => {
        gsap.to(wrapperRef.current, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            if (!tlRef.current) {
              tlRef.current = createLineAnimation();
            }
          },
        });
      },
    });
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="fixed bottom-6 right-6 flex flex-col items-center gap-2 opacity-0"
    >
      <span className="[writing-mode:vertical-rl] tracking-[0.2em] text-sm">
        Scroll
      </span>
      <div
        ref={lineRef}
        className="w-[2px] h-12 rounded-full"
        style={{
          background: "white",
        }}
      />
    </div>
  );
}
