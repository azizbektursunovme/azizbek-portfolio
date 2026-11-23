import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface TagProps {
  children: ReactNode;
  /** `inverse` is for dark (ink) surfaces. */
  tone?: "default" | "inverse";
  className?: string;
}

/** Small mono label for disciplines, stack and tools. */
export default function Tag({ children, tone = "default", className }: TagProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 font-mono text-label whitespace-nowrap",
        tone === "default" ? "border-rule bg-paper text-muted" : "border-rule-inverse text-muted-inverse",
        className,
      )}
    >
      {children}
    </span>
  );
}
