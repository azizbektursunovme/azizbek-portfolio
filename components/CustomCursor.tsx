"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

const DOT_SIZE = 8;
const RING_SIZE = 34;
const RING_LERP = 0.32;

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const targetRef = useRef({ x: -100, y: -100 });
  const ringRef = useRef({ x: -100, y: -100 });
  const hasPointerRef = useRef(false);
  const hoverRef = useRef(false);
  const frameRef = useRef<number | null>(null);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  useEffect(() => {
    // Check if the device has a mouse/pointer (coarse means touch device)
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    if (mediaQuery.matches) return;

    setIsVisible(true);

    const isInteractiveElement = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;

      return Boolean(
        target.closest(
          "a, button, input, textarea, select, img, [role='button'], [data-hover='true'], .cursor-pointer"
        )
      );
    };

    const updateHoverState = (hovered: boolean) => {
      if (hoverRef.current === hovered) return;
      hoverRef.current = hovered;
      setIsHovered(hovered);
    };

    const moveCursor = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      dotX.set(e.clientX - DOT_SIZE / 2);
      dotY.set(e.clientY - DOT_SIZE / 2);

      if (!hasPointerRef.current) {
        hasPointerRef.current = true;
        ringRef.current = { x: e.clientX, y: e.clientY };
        ringX.set(e.clientX - RING_SIZE / 2);
        ringY.set(e.clientY - RING_SIZE / 2);
      }

      updateHoverState(isInteractiveElement(e.target));
    };

    const handleMouseOver = (e: MouseEvent) => {
      updateHoverState(isInteractiveElement(e.target));
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
      updateHoverState(false);
      hasPointerRef.current = false;
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    const animateRing = () => {
      const ring = ringRef.current;
      const target = targetRef.current;

      ring.x += (target.x - ring.x) * RING_LERP;
      ring.y += (target.y - ring.y) * RING_LERP;
      ringRef.current = ring;

      ringX.set(ring.x - RING_SIZE / 2);
      ringY.set(ring.y - RING_SIZE / 2);
      frameRef.current = window.requestAnimationFrame(animateRing);
    };

    frameRef.current = window.requestAnimationFrame(animateRing);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
    };
  }, [dotX, dotY, ringX, ringY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Circle ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
        }}
        animate={{
          scale: isHovered ? 1.55 : 1,
          opacity: isHovered ? 0.95 : 0.78,
          backgroundColor: isHovered ? "rgba(244, 244, 245, 0.04)" : "rgba(244, 244, 245, 0.015)",
          borderColor: isHovered ? "rgba(244, 244, 245, 0.74)" : "rgba(244, 244, 245, 0.52)",
        }}
        transition={{ type: "spring", stiffness: 420, damping: 28, mass: 0.35 }}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[34px] w-[34px] rounded-full border border-white/60 shadow-[0_0_0_1px_rgba(9,9,11,0.18),0_0_24px_rgba(244,244,245,0.18),inset_0_0_18px_rgba(244,244,245,0.05)]"
      />
      {/* Inner Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
        }}
        animate={{
          opacity: isHovered ? 0.96 : 1,
          scale: isHovered ? 1.18 : 1,
        }}
        transition={{ type: "spring", stiffness: 520, damping: 24, mass: 0.25 }}
        className="pointer-events-none fixed left-0 top-0 z-[10000] h-2 w-2 rounded-full bg-zinc-100 shadow-[0_0_0_1px_rgba(9,9,11,0.28),0_0_14px_rgba(244,244,245,0.35)]"
      />
    </>
  );
}
