"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "motion/react";

/** Site-wide motion settings: honour the OS "reduce motion" setting for every motion component. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
