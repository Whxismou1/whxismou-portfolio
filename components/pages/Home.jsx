"use client";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollIndicator from "../ScrollIndicator";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef(null);
  const elementsRef = useRef([]);
  const gradientRef = useRef(null);

  useLayoutEffect(() => {
    gsap.set(elementsRef.current, { y: 60, opacity: 0, filter: "blur(6px)" });
    gsap.to(elementsRef.current, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.25,
    });

    const st = ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top+=100 top",
      end: "bottom 30%",
      scrub: true,
      onUpdate: (self) => {
        gsap.to(elementsRef.current, {
          y: self.direction === 1 ? -80 : 0,
          opacity: self.direction === 1 ? 0 : 1,
          filter: self.direction === 1 ? "blur(6px)" : "blur(0px)",
          duration: 0.8,
          ease: "power3.out",
        });
      },
    });
    gsap.set(gradientRef.current, { "--gx": "50%", "--gy": "50%" });

    const setX = gsap.quickTo(gradientRef.current, "--gx", { duration: 0.2, ease: "power2.out" });
    const setY = gsap.quickTo(gradientRef.current, "--gy", { duration: 0.2, ease: "power2.out" });

    const onMove = (e) => {
      const el = gradientRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setX(`${Math.min(100, Math.max(0, x))}%`);
      setY(`${Math.min(100, Math.max(0, y))}%`);
    };

    const onLeave = () => {
      setX("50%");
      setY("50%");
    };

    const headingEl = gradientRef.current?.parentElement; // el <h1>
    headingEl?.addEventListener("pointermove", onMove, { passive: true });
    headingEl?.addEventListener("pointerleave", onLeave, { passive: true });

    return () => {
      st.kill();
      headingEl?.removeEventListener("pointermove", onMove);
      headingEl?.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="pt-20 min-h-screen flex flex-col items-center justify-center text-center select-none"
    >
      <div className="px-6">
        <h1
          ref={(el) => (elementsRef.current[0] = el)}
          className="text-5xl md:text-8xl font-extrabold tracking-tight mb-6 leading-[1.1]"
        >
          <span
            ref={gradientRef}
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-300
                       bg-[length:200%_200%] will-change-[background-position]"
            style={{
              backgroundPosition: "var(--gx) var(--gy)",
            }}
          >
            Turning ideas
          </span>{" "}
          <span className="text-white">Into Code</span>
        </h1>

        <p
          ref={(el) => (elementsRef.current[1] = el)}
          className="text-lg md:text-2xl text-gray-400 font-light max-w-2xl mx-auto"
        >
          Passionate about coding, learning new technologies, and creating real-world projects.
        </p>
      </div>

      <ScrollIndicator />
    </section>
  );
}
