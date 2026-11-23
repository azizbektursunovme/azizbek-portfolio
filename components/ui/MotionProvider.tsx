"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "motion/react";

/**
 * Site-wide motion settings: honour the OS "reduce motion" setting for every
 * motion component. Also marks <html data-hydrated> once React is running;
 * the inline script in the layout drops `html.js` if this never happens.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.setAttribute("data-hydrated", "");
  }, []);
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
