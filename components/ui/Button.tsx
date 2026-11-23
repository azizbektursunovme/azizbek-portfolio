import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface ButtonProps {
  href: string;
  variant: "primary" | "ghost";
  children: ReactNode;
  /** Opens in a new tab with `rel="noopener noreferrer"` and an outward arrow. */
  external?: boolean;
  size?: "md" | "sm";
  /** Optional leading icon (decorative). */
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
  /** Adds the `download` attribute (e.g. for the CV PDF). Pass a string to set the file name. */
  download?: boolean | string;
}

const base =
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,color,border-color] duration-200 ease-out-quint";

const sizes = {
  md: "h-12 px-6 text-[0.9375rem]",
  sm: "h-10 px-4 text-sm",
};

const variants = {
  primary: "bg-ink text-paper hover:bg-accent-ink",
  ghost: "border border-ink/20 text-ink hover:border-ink hover:bg-ink hover:text-paper",
};

/** Link styled as a button. Internal routes use next/link; anchors, files and external URLs use <a>. */
export default function Button({
  href,
  variant,
  children,
  external = false,
  size = "md",
  icon,
  className,
  onClick,
  download,
}: ButtonProps) {
  const classes = cn(base, sizes[size], variants[variant], className);
  const content = (
    <>
      {icon ? <span aria-hidden="true" className="-ml-0.5 flex">{icon}</span> : null}
      <span>{children}</span>
      {external ? (
        <>
          <ArrowUpRight
            aria-hidden="true"
            className="-mr-1 h-4 w-4 transition-transform duration-200 ease-out-quint group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
            strokeWidth={1.8}
          />
          <span className="sr-only">(opens in a new tab)</span>
        </>
      ) : null}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} onClick={onClick}>
        {content}
      </a>
    );
  }

  const isRoute = !download && href.startsWith("/") && !/\.[a-z0-9]+$/i.test(href);
  if (isRoute) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} onClick={onClick} download={download === true ? "" : download || undefined}>
      {content}
    </a>
  );
}
