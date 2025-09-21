"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  gsap.registerPlugin(useGSAP);

  const container = useRef(null);
  const logo = useRef(null);
  const hoverTL = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useGSAP(
    () => {
      gsap.from(container.current, {
        y: -40,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      const chars = gsap.utils.toArray(".logo-char");
      hoverTL.current = gsap
        .timeline({ paused: true, defaults: { ease: "power3.out" } })
        .to(logo.current, { scale: 1.04, rotate: -1, duration: 0.25 }, 0)
        .to(
          chars,
          {
            y: -8,
            stagger: 0.03,
            duration: 0.22,
            yoyo: true,
            repeat: 1,
          },
          0
        );
    },
    { scope: container }
  );

  const navItems = [
    { href: "#about", label: "About" },
    { href: "#journey", label: "Journey" },
    { href: "#projects", label: "Projects" },
    { href: "#contact", label: "Contact", primary: true },
  ];

  return (
    <nav
      ref={container}
      className="fixed top-3 left-1/2 -translate-x-1/2 z-50 w-full px-3 sm:px-6"
    >
      <div className="mx-auto max-w-[1100px] flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 supports-[backdrop-filter]:bg-black/20 backdrop-blur-md px-4 py-3 shadow-lg">
        <a
          ref={logo}
          href="#home"
          className="relative group select-none"
          aria-label="whxismou — go home"
          onMouseEnter={() => hoverTL.current?.play(0)}
          onMouseLeave={() =>
            gsap.to(logo.current, {
              scale: 1,
              rotate: 0,
              duration: 0.25,
              ease: "power3.out",
            })
          }
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-100 blur-2xl transition will-change-[opacity,filter] bg-gradient-to-r from-cyan-400/30 via-fuchsia-400/30 to-emerald-300/30"
          />
          <span className="relative font-black tracking-wide text-2xl md:text-3xl leading-none flex">
            {["w", "h", "x"].map((c, i) => (
              <span key={i} className="logo-char inline-block text-neutral-100">
                {c}
              </span>
            ))}
            {["i", "s", "m", "o", "u"].map((c, i) => (
              <span
                key={i}
                className="logo-char inline-block bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-emerald-300 bg-[length:200%_100%] bg-clip-text text-transparent group-hover:animate-sheen"
              >
                {c}
              </span>
            ))}
          </span>
        </a>

        <div className="hidden md:flex items-center gap-1 sm:gap-3">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`group relative px-2 py-1 text-sm sm:text-base transition ${
                item.primary
                  ? "rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5"
                  : "hover:opacity-100 opacity-90"
              }`}
            >
              <span className="relative z-10">{item.label}</span>
              <span className="pointer-events-none absolute left-0 bottom-0 h-[2px] w-0 group-hover:w-full transition-[width] duration-300 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-emerald-300" />
            </a>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg border border-white/10 hover:border-white/20"
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-white transition ${
              isOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition ${
              isOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-lg border-t border-white/10 shadow-lg rounded-b-2xl"
          >
            <div className="flex flex-col items-center py-6 gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-2 text-lg transition ${
                    item.primary
                      ? "rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5"
                      : "hover:opacity-100 opacity-90"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
