import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import Container from "./Container";

interface SectionProps {
  /** Anchor id; the header nav links to it (`#websites`, `#branding`, ...). */
  id: string;
  /** Short mono label in the ledger margin, e.g. "Websites". */
  eyebrow: ReactNode;
  /** Serif section headline. */
  title: ReactNode;
  /** Optional lead paragraph under the title. */
  intro?: ReactNode;
  children?: ReactNode;
  className?: string;
}

/**
 * A ledger row: the eyebrow sits in a narrow margin column, the title and
 * content take the rest. On phones the columns stack.
 */
export default function Section({ id, eyebrow, title, intro, children, className }: SectionProps) {
  const titleId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={titleId} className={cn("border-t border-rule py-20 md:py-28", className)}>
      <Container>
        <div className="grid gap-y-5 lg:grid-cols-12 lg:gap-x-10">
          <p className="flex items-center gap-2 font-mono text-label text-muted before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent lg:col-span-3 lg:pt-4">{eyebrow}</p>
          <div className="lg:col-span-9">
            <h2 id={titleId} className="max-w-[18ch] font-serif text-display-sm text-balance md:text-display">{title}</h2>
            {intro ? <div className="mt-6 max-w-prose text-lead text-muted">{intro}</div> : null}
          </div>
        </div>
        {children ? <div className="mt-12 md:mt-16">{children}</div> : null}
      </Container>
    </section>
  );
}
