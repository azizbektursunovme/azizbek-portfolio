"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let start = 0;
    const duration = 1600; // ms
    const intervalTime = 15;
    const step = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      start += step;
      if (start >= 100) {
        setCount(100);
        clearInterval(timer);
        setTimeout(() => {
          setIsComplete(true);
        }, 300);
      } else {
        setCount(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  const slideUp = {
    initial: {
      top: 0,
    },
    exit: {
      top: "-100vh",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
    },
  };

  const textAnim = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.4, ease: [0.215, 0.61, 0.355, 1] },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {!isComplete && (
        <motion.div
          variants={slideUp}
          initial="initial"
          exit="exit"
          className="fixed left-0 top-0 z-50 flex h-screen w-screen flex-col justify-between bg-zinc-950 p-10 text-zinc-100"
        >
          <div className="flex justify-between items-start font-mono text-xs tracking-widest uppercase text-zinc-500">
            <span>AZIZBEK TURSUNOV</span>
            <span>PORTFOLIO Â© 2026</span>
          </div>

          <div className="flex flex-col justify-center items-start">
            <motion.div
              variants={textAnim}
              initial="initial"
              animate="animate"
              exit="exit"
              className="font-sans text-[12vw] font-black leading-none tracking-tighter uppercase"
              style={{ fontFamily: "'Cabinet Grotesk', 'Inter', 'Arial', system-ui, sans-serif" }}
            >
              CREATIVE
            </motion.div>
            <motion.div
              variants={textAnim}
              initial="initial"
              animate="animate"
              exit="exit"
              className="font-sans text-[12vw] font-black leading-none tracking-tighter uppercase text-zinc-800"
              style={{ fontFamily: "'Cabinet Grotesk', 'Inter', 'Arial', system-ui, sans-serif" }}
            >
              STUDIO
            </motion.div>
          </div>

          <div className="flex justify-between items-end font-mono">
            <div className="text-xs text-zinc-500 max-w-xs leading-relaxed uppercase">
              Graphic & Product design System
            </div>
            <div className="text-8xl md:text-9xl font-light tracking-tighter leading-none select-none">
              {count}%
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

