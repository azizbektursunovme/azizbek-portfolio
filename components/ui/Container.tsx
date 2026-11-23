import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  /** Element to render. Defaults to `div`. */
  as?: ElementType;
}

/** Page-width wrapper: 16px side gutter on phones, 78rem max width on desktop. */
export default function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return <Tag className={cn("mx-auto w-full max-w-page px-4 sm:px-6 lg:px-10", className)}>{children}</Tag>;
}
