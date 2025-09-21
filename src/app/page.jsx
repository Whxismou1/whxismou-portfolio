"use client";

import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "../../components/Navbar";
import Home from "../../components/pages/Home";
import About from "../../components/pages/About";
import Journey from "../../components/pages/Journey";
import Projects from "../../components/pages/Projects";
import Contact from "../../components/pages/Contact";
import PreLoader from "../../components/preloader/PreLoader";
import Footer from "../../components/Footer";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        if (arguments.length) {
          lenis.scrollTo(value);
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    lenis.on("scroll", ScrollTrigger.update);

    const handleAnchorClick = (e) => {
      const target = e.target.closest("a[href^='#']");
      if (!target) return;

      const id = target.getAttribute("href");
      if (id && id.startsWith("#")) {
        e.preventDefault();
        const section = document.querySelector(id);
        if (section) {
          lenis.scrollTo(section, {
            offset: -50,
            duration: 1.5,
            easing: (x) => 1 - Math.pow(1 - x, 4),
          });
        }
      }
    };

    const finishLoading = () => {
      setIsLoading(false);
      document.body.style.cursor = "default";
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    };

    const timeout = setTimeout(finishLoading, 2000);
    document.addEventListener("click", handleAnchorClick);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener("click", handleAnchorClick);
      lenis.destroy();
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <PreLoader key="preloader" />
      ) : (
        <div key="app">
          <Navbar />
          <Home />
          <About />
          <Journey />
          <Projects />
          <Contact />
          <Footer />
        </div>
      )}
    </AnimatePresence>
  );
}
