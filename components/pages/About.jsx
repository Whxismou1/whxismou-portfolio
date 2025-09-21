"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  JavaIcon,
  JsIcon,
  MongoIcon,
  NodeIcon,
  PythonIcon,
  ReactIcon,
  SpringIcon,
  MySqlIcon
} from "../../components/icons/TechIcons";

gsap.registerPlugin(ScrollTrigger);

const techComponents = [
  { Comp: JavaIcon, alt: "Java" },
  { Comp: JsIcon, alt: "JavaScript" },
  { Comp: MongoIcon, alt: "MongoDB" },
  { Comp: NodeIcon, alt: "Node.js" },
  { Comp: PythonIcon, alt: "Python" },
  { Comp: ReactIcon, alt: "React" },
  { Comp: SpringIcon, alt: "Spring" },
  {Comp: MySqlIcon, alt: "MySql"}
];

export default function About() {
  const titleRef = useRef(null);
  const paragraphsRef = useRef([]);
  const imageWrapperRef = useRef(null);
  const techTrackRef = useRef(null);
  const marqueeTweenRef = useRef(null);

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
            trigger: "#about",
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );

      paragraphsRef.current.forEach((el) => {
        if (el) {
          gsap.fromTo(
            el,
            { y: 40, opacity: 0, filter: "blur(6px)" },
            {
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                end: "top 40%",
                scrub: true,
              },
            }
          );
        }
      });

      gsap.fromTo(
        imageWrapperRef.current,
        { x: 80, opacity: 0, scale: 0.9 },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageWrapperRef.current,
            start: "top 90%",
            end: "top 50%",
            scrub: true,
          },
        }
      );

      const buildMarquee = () => {
        const track = techTrackRef.current;
        if (!track) return;

        marqueeTweenRef.current?.kill();
        gsap.set(track, { x: 0 });

        const children = Array.from(track.children);
        const halfCount = children.length / 2;
        if (!halfCount) return;

        const first = children[0].getBoundingClientRect();
        const lastHalf = children[halfCount - 1].getBoundingClientRect();
        const halfWidth = lastHalf.right - first.left;

        const speed = 60;
        const duration = halfWidth / speed;

        const wrapX = gsap.utils.wrap(-halfWidth, 0);
        marqueeTweenRef.current = gsap.to(track, {
          x: -halfWidth,
          duration,
          ease: "none",
          repeat: -1,
          modifiers: {
            x: (x) => `${wrapX(parseFloat(x))}px`,
          },
        });
      };

      buildMarquee();
      const onResize = () => buildMarquee();
      window.addEventListener("resize", onResize);
      ScrollTrigger.addEventListener("refreshInit", buildMarquee);

      return () => {
        window.removeEventListener("resize", onResize);
        ScrollTrigger.removeEventListener("refreshInit", buildMarquee);
        marqueeTweenRef.current?.kill();
      };
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="min-h-screen py-20 flex items-center">
      <div className="max-w-6xl mx-auto px-6 w-full">
        <h2
          ref={titleRef}
          className="text-center text-4xl md:text-5xl font-extrabold mb-14 text-white"
        >
          About Me
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 items-start md:items-center gap-10 md:gap-16">
          <div className="space-y-6 text-gray-300 text-base md:text-lg leading-relaxed">
            <p ref={(el) => (paragraphsRef.current[0] = el)}>
              Hi, I’m Mou, a backend developer from Spain aiming to become
              fullstack. I love creating solid, maintainable systems while
              exploring new ways to bring interactivity to the web.
            </p>

            <p ref={(el) => (paragraphsRef.current[1] = el)}>
              My favorite language is Java, but I also work with Python,
              JavaScript, Node.js, and React. I enjoy combining backend
              reliability with frontend creativity to deliver complete
              solutions.
            </p>

            <p ref={(el) => (paragraphsRef.current[2] = el)}>
              Recently, I’ve been exploring animations and interactive features
              using GSAP and Framer Motion. I aim to make every project feel
              smooth, intuitive, and engaging for users.
            </p>

            <div className="mt-10 overflow-hidden whitespace-nowrap">
              <div
                ref={techTrackRef}
                className="flex items-center [will-change:transform]"
                style={{ width: "max-content" }}
              >
                {[...techComponents, ...techComponents].map(
                  ({ Comp, alt }, i) => (
                    <div
                      key={i}
                      className="group relative w-16 h-16 md:w-20 md:h-20 mx-6 flex items-center justify-center rounded-2xl bg-white/5 backdrop-blur-sm shadow-lg"
                    >
                      <Comp className="w-10 h-10 md:w-12 md:h-12 text-white opacity-70 group-hover:opacity-100 transition" />
                      <span className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 -translate-x-1/2 rounded-md px-2 py-0.5 text-xs text-white bg-black/80 opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition">
                        {alt}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>

          <div
            ref={imageWrapperRef}
            className="flex justify-center md:justify-end"
          >
            <Image
              width={420}
              height={420}
              src="/images/logo.jpg"
              alt="Whxismou photo"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
