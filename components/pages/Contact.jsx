"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "../icons/SvgIcons";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const formRef = useRef(null);
  const detailsRef = useRef(null);
  const socialsRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send the message. Try again later.");
      }
    } catch (err) {
      toast("Unexpected error. Please try again.", {
        icon: "⚠️",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const splitText = (el) => {
        const text = el.innerText;
        el.innerHTML = text
          .split("")
          .map((char) =>
            char === " "
              ? `<span class="inline-block">&nbsp;</span>`
              : `<span class="inline-block opacity-0">${char}</span>`
          )
          .join("");
        return el.querySelectorAll("span");
      };

      if (titleRef.current) {
        const chars = splitText(titleRef.current);
        gsap.fromTo(
          chars,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            ease: "power3.out",
            stagger: 0.05,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: true,
            },
          }
        );
      }

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 85%",
              end: "top 65%",
              scrub: true,
            },
          }
        );
      }

      [formRef.current, detailsRef.current, socialsRef.current].forEach(
        (el, i) => {
          if (el) {
            gsap.fromTo(
              el,
              { y: 60, opacity: 0, scale: 0.95, filter: "blur(6px)" },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                ease: "power3.out",
                scrollTrigger: {
                  trigger: el,
                  start: "top 90%",
                  end: "top 70%",
                  scrub: true,
                },
              }
            );
          }
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen flex flex-col pt-20 px-6 md:px-20 pb-32"
    >
      <div className="flex-1 flex flex-col items-center">
        <h2
          ref={titleRef}
          className="text-center text-5xl md:text-6xl font-extrabold mb-4 text-white select-none"
        >
          Contact
        </h2>
        <p
          ref={subtitleRef}
          className="text-center text-lg md:text-xl text-gray-400 mb-12 max-w-2xl"
        >
          Have an awesome idea? Let’s bring it to life together.
        </p>

        <div className="flex flex-col md:flex-row gap-10 md:gap-16 w-full max-w-6xl">
          <form
            onSubmit={handleSubmit}
            ref={formRef}
            className="flex-1 flex flex-col gap-4 bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg"
          >
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="p-3 rounded-md bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Your email"
              className="p-3 rounded-md bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <textarea
              name="message"
              rows="5"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message..."
              className="p-3 rounded-md bg-black/40 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="mt-4 cursor-pointer py-3 px-6 rounded-md font-medium text-white bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:opacity-90 transition flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>

          <div className="flex-1 flex flex-col gap-8">
            <div
              ref={detailsRef}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                Contact Details
              </h3>
              <p className="text-gray-300">mouhcinevalderas@gmail.com</p>
            </div>

            <div
              ref={socialsRef}
              className="bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg"
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                My Socials
              </h3>
              <div className="flex gap-6 text-3xl justify-center md:justify-start">
                <a
                  href="https://www.instagram.com/_whxismou_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-400 transition"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://www.linkedin.com/in/Whxismou"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-400 transition"
                >
                  <LinkedinIcon />
                </a>
                <a
                  href="https://github.com/Whxismou1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-300 transition"
                >
                  <GithubIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
