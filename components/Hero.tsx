"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface HeroProps {
  dict: {
    hero: {
      subtitle: string;
      statement: string;
      scroll: string;
    };
  };
}

export default function Hero({ dict }: HeroProps) {
  // Staggered child animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { y: 60, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.85,
        ease: [0.215, 0.61, 0.355, 1], // Cubic bezier easing
      },
    },
  };

  const nameArray = "AZIZBEK TURSUNOV".split(" ");

  return (
    <section className="relative flex h-screen w-full flex-col justify-between bg-zinc-950 px-6 py-24 md:px-10 md:py-32">
      {/* Structural visual grid lines - Classic Swiss Grid Aesthetic */}
      <div className="absolute inset-0 grid grid-cols-4 gap-4 px-6 md:px-10 pointer-events-none opacity-5">
        <div className="border-r border-zinc-100 h-full"></div>
        <div className="border-r border-zinc-100 h-full"></div>
        <div className="border-r border-zinc-100 h-full"></div>
        <div></div>
      </div>

      <div /> {/* Spacer */}

      {/* Hero Content Block */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-7xl"
      >
        <div className="flex flex-col gap-7">
          {/* Subtitle / Role Tag */}
          <motion.div variants={item} className="flex items-center gap-3">
            <span className="h-[1px] w-8 bg-zinc-400"></span>
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              {dict.hero.subtitle}
            </span>
          </motion.div>

          {/* Refined typographic name mark */}
          <div className="relative">
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.95 }}
              className="absolute -left-6 top-1/2 hidden h-px w-20 origin-left bg-zinc-700 md:block"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.215, 0.61, 0.355, 1], delay: 1.05 }}
              className="absolute -right-1 top-3 hidden h-2 w-2 rounded-full bg-zinc-500 shadow-[0_0_18px_rgba(244,244,245,0.16)] md:block"
            />
            <h1
              className="flex select-none flex-col text-[clamp(3.8rem,14vw,10rem)] font-extrabold uppercase leading-[0.9] tracking-[0.015em] text-zinc-100 md:text-[clamp(5.5rem,8.2vw,9.5rem)]"
              style={{ fontFamily: "'Cabinet Grotesk', 'Inter', 'Arial', system-ui, sans-serif" }}
            >
              <span className="overflow-hidden pb-1">
                <motion.span
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.55 }}
                  className="inline-block"
                >
                  {nameArray[0]}
                </motion.span>
              </span>
              <span className="overflow-hidden pb-1">
                <motion.span
                  initial={{ y: "105%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.72 }}
                  className="inline-block text-zinc-950 [text-shadow:_0_0_1px_rgba(244,244,245,0.7),_0_0_20px_rgba(244,244,245,0.04)] [-webkit-text-stroke:1px_rgba(244,244,245,0.24)]"
                >
                  {nameArray[1]}
                </motion.span>
              </span>
            </h1>
          </div>

          {/* Statement Paragraph */}
          <div className="mt-8 flex justify-end">
            <motion.p
              variants={item}
              className="max-w-md font-sans text-lg md:text-xl font-light leading-relaxed text-zinc-400 text-right md:text-left"
            >
              {dict.hero.statement}
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator footer */}
      <div className="mx-auto w-full max-w-7xl flex justify-between items-center z-10">
        <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-600">
          AZIZBEK TURSUNOV DESIGN (C)2026
        </span>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-400 cursor-pointer"
          onClick={() => {
            const aboutSection = document.getElementById("about");
            aboutSection?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span>{dict.hero.scroll}</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            className="flex items-center justify-center p-2 rounded-full border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 hover:border-zinc-700 transition-colors"
          >
            <ArrowDown className="h-3.5 w-3.5 text-zinc-400" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

