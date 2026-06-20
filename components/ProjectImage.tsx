"use client";

import { useState } from "react";
import Image from "next/image";

interface ProjectImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  title: string;
  category: string;
}

export default function ProjectImage({
  src,
  alt,
  fill = false,
  className = "",
  sizes = "",
  priority = false,
  title,
  category,
}: ProjectImageProps) {
  const [hasError, setHasError] = useState(false);

  // Generate unique premium gradient colors based on the title
  const getGradient = (name: string) => {
    const charSum = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue1 = charSum % 360;
    const hue2 = (hue1 + 40) % 360;
    return `linear-gradient(135deg, hsl(${hue1}, 45%, 12%) 0%, hsl(${hue2}, 40%, 6%) 100%)`;
  };

  // Get project initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();
  };

  if (hasError) {
    return (
      <div
        style={{ background: getGradient(title) }}
        className={`relative flex h-full w-full flex-col justify-between p-8 border border-zinc-900 overflow-hidden select-none ${className}`}
      >
        {/* Asymmetric Swiss lines in background */}
        <div className="absolute inset-0 grid grid-cols-3 gap-2 opacity-10 pointer-events-none">
          <div className="border-r border-zinc-100 h-full"></div>
          <div className="border-r border-zinc-100 h-full"></div>
          <div className="h-full"></div>
        </div>

        {/* Large visual Typographic background initial */}
        <div
          className="absolute -bottom-8 -right-8 text-[18vw] font-black text-zinc-950/20 leading-none select-none uppercase pointer-events-none font-display"
          style={{ fontFamily: "'Cabinet Grotesk', 'Inter', 'Arial', system-ui, sans-serif" }}
        >
          {getInitials(title)}
        </div>

        <div className="flex justify-between items-start font-mono text-[9px] uppercase tracking-widest text-zinc-500 z-10">
          <span>PORTFOLIO ASSET</span>
          <span>{category}</span>
        </div>

        <div className="flex flex-col gap-2 z-10 mt-auto">
          <h4
            className="text-2xl md:text-3xl font-black text-zinc-100 uppercase tracking-tight font-display"
            style={{ fontFamily: "'Cabinet Grotesk', 'Inter', 'Arial', system-ui, sans-serif" }}
          >
            {title}
          </h4>
          <span className="font-mono text-[10px] text-zinc-400 tracking-wider">
            PREMIUM WORKPIECE Fallback
          </span>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      className={className}
      sizes={sizes}
      priority={priority}
      onError={() => setHasError(true)}
    />
  );
}

