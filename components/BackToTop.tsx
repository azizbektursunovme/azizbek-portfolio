"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          aria-label="Back to top"
          data-hover="true"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: [0, -4, 0], scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.96 }}
          transition={{
            opacity: { duration: 0.22 },
            scale: { duration: 0.22 },
            y: {
              duration: 2.8,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="fixed bottom-5 right-5 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700/80 bg-zinc-950/75 text-zinc-100 shadow-[0_0_0_1px_rgba(244,244,245,0.05),0_0_28px_rgba(244,244,245,0.12)] backdrop-blur-md transition-colors duration-200 hover:border-zinc-300 hover:bg-zinc-900/90 hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-100/40 md:bottom-8 md:right-8 md:h-12 md:w-12"
        >
          <span className="absolute inset-1 rounded-full border border-zinc-100/10" />
          <span className="absolute h-2 w-2 rounded-full bg-zinc-100/40 blur-[3px]" />
          <ArrowUp className="relative h-4 w-4" strokeWidth={1.8} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
