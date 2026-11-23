"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

interface RevealProps {
  children: ReactNode;
  /** Seconds to wait after the element enters the viewport. */
  delay?: number;
  className?: string;
}

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Fades and un-blurs its children the first time they scroll into view.
 *
 * The server markup is never hidden. `app/globals.css` pre-hides
 * `[data-reveal="pending"]` only under `html.js` and only when the visitor
 * has not asked for reduced motion, so no-JS and reduced-motion visitors
 * always see the content. Keyframe arrays give motion explicit start values,
 * so nothing is read from the DOM and no inline `opacity: 0` is rendered.
 */
export default function Reveal({ children, delay = 0, className }: RevealProps) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      data-reveal="pending"
      className={className}
      whileInView={reduce ? undefined : { opacity: [0, 1], y: [14, 0], filter: ["blur(6px)", "blur(0px)"] }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
