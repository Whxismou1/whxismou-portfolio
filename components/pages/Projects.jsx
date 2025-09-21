"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { PROJECT_DATA } from "../data/projects";
import { GithubIcon, WebIcon } from "../icons/SvgIcons";
import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);

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
          ease: "power3.out",
          stagger: 0.05,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 50%",
            scrub: true,
          },
        }
      );

      gsap.utils.toArray(".project-card").forEach((card) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0, filter: "blur(6px)" },
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              end: "top 60%",
              scrub: true,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-screen px-6 md:px-20 py-20"
    >
      <h2
        ref={titleRef}
        className="text-center text-5xl md:text-6xl font-extrabold mb-16 text-white"
      >
        Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {PROJECT_DATA.map((proj, index) => (
          <Card
            key={index}
            className="project-card group relative overflow-hidden rounded-2xl 
                       bg-white/5 backdrop-blur-lg border border-white/10 
                       shadow-xl hover:shadow-2xl transition-all duration-500"
          >
            <CardHeader className="p-0 relative overflow-hidden">
              <Image
                src={proj.imageUrl}
                alt={proj.title + ' image'}
                width={600}
                height={300}
                className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                priority={index < 3}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />
            </CardHeader>

            <CardContent className="p-6 relative z-10">
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:translate-x-1 transition">
                {proj.title}
              </h3>
              <p className="line-clamp-3 text-sm text-gray-300 break-words">
                {proj.description}
              </p>
            </CardContent>

            <CardFooter className="flex justify-between items-center p-6">
              <div className="flex gap-3 text-lg">
                {proj.projectUrl && (
                  <a
                    href={proj.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-400 transition transform hover:scale-110"
                    aria-label={`${proj.title} website`}
                  >
                    <WebIcon />
                  </a>
                )}
                {proj.githubUrl && (
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-blue-400 transition transform hover:scale-110"
                    aria-label={`${proj.title} github`}
                  >
                    <GithubIcon />
                  </a>
                )}
              </div>

              <div className="flex gap-3 items-center">
                {proj.techStack.map((tech, i) => (
                  <div
                    key={i}
                    className="relative inline-flex items-center group/icon"
                  >
                    <span
                      className="inline-flex items-center justify-center text-xl opacity-80 group-hover/icon:opacity-100 transition"
                      aria-label={tech.name}
                    >
                      {tech.icon}
                    </span>
                    <span
                      className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 
                                 bg-black/80 text-white text-xs px-2 py-1 rounded 
                                 opacity-0 group-hover/icon:opacity-100 transition pointer-events-none whitespace-nowrap"
                    >
                      {tech.name}
                    </span>
                  </div>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="text-center mt-16">
        <a
          href="https://github.com/Whxismou1?tab=repositories"
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block text-white font-medium after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 after:transition-all after:duration-500 hover:after:w-full"
        >
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-[length:200%_100%] bg-clip-text text-transparent animate-gradient-x">
            → More projects
          </span>
        </a>
      </div>
    </section>
  );
}
