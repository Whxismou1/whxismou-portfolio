"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { TIMELINE_DATA } from "../data/work";

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const splitText = (el) => {
        const text = el.innerText;
        el.innerHTML = text
          .split("")
          .map((char) =>
            char === " "
              ? `<span class="inline-block">&nbsp;</span>`
              : `<span class="inline-block">${char}</span>`
          )
          .join("");
        return el.querySelectorAll("span");
      };

      const titleChars = splitText(titleRef.current);

      gsap.fromTo(
        titleChars,
        { y: 80, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: subtitleRef.current,
            start: "top 85%",
            end: "top 60%",
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        lineRef.current,
        { scaleY: 0, transformOrigin: "top" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        }
      );

      itemsRef.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            {
              x: index % 2 === 0 ? -80 : 80,
              opacity: 0,
              filter: "blur(6px)",
            },
            {
              x: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                end: "top 60%",
                scrub: true,
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="journey" className="py-20 px-4 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2
            ref={titleRef}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4"
          >
            My Journey
          </h2>
          <p ref={subtitleRef} className="text-lg md:text-xl text-gray-400">
            A timeline of my professional growth
          </p>
        </div>

        <div ref={containerRef} className="relative">
          <div
            ref={lineRef}
            className="absolute top-0 bottom-0 left-6 md:left-1/2 md:-translate-x-1/2 w-1 
                       bg-gradient-to-b from-pink-500 via-purple-500 to-blue-500"
          />

          <div className="space-y-12">
            {TIMELINE_DATA.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isOpen = openIndex === index;
              return (
                <div
                  key={item.id}
                  ref={(el) => (itemsRef.current[index] = el)}
                  className={`relative flex items-start ${
                    isLeft ? "md:justify-start" : "md:justify-end"
                  }`}
                >
                  <div
                    className="absolute top-6 w-4 h-4 bg-white border-4 border-pink-500 rounded-full z-10
                               left-4 md:left-1/2 md:-translate-x-1/2"
                  />

                  <div
                    className={`w-full md:w-5/12 ${
                      isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:text-left"
                    } px-8 md:px-0`}
                  >
                    <div
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="bg-white/5 dark:bg-black/30 p-6 rounded-lg shadow-lg 
                                 border border-gray-700 transition-all duration-300 
                                 hover:shadow-xl hover:scale-105 cursor-pointer break-words"
                    >
                      <span className="text-sm font-bold text-pink-500">
                        {item.year}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold text-white mt-1">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 font-medium">
                        {item.company}
                      </p>
                      <div
                        className={`transition-all duration-500 overflow-hidden ${
                          isOpen
                            ? "max-h-[500px] opacity-100 mt-2"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-sm text-gray-400 mt-2">
                          {item.details}
                        </p>
                        <p className="text-sm text-gray-300 mt-3">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
