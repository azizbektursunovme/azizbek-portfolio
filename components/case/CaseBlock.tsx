import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** The ledger margin label: mono, with the accent dot used by every Section eyebrow. */
export function MarginLabel({ children, as: Tag = "p", id }: { children: ReactNode; as?: "p" | "h2" | "h3"; id?: string }) {
  return (
    <Tag
      id={id}
      className="flex items-center gap-2 font-mono text-label text-muted before:h-1.5 before:w-1.5 before:shrink-0 before:rounded-full before:bg-accent"
    >
      {children}
    </Tag>
  );
}

/**
 * One line of the case ledger: the label sits in the margin column and the
 * entry takes the rest. Used for Brief, What I did, Key decisions and Result.
 */
export function CaseRow({
  label,
  children,
  testId,
  className,
}: {
  label: string;
  children: ReactNode;
  testId?: string;
  className?: string;
}) {
  return (
    <section
      aria-label={label}
      data-testid={testId}
      className={cn("grid gap-y-4 border-t border-rule py-9 md:py-12 lg:grid-cols-12 lg:gap-x-10", className)}
    >
      <div className="lg:col-span-3 lg:pt-2">
        <MarginLabel as="h2">{label}</MarginLabel>
      </div>
      <div className="min-w-0 lg:col-span-9">{children}</div>
    </section>
  );
}

/**
 * A media block (Website, Brand kit, Ads): margin label plus a serif title,
 * then the content at full width. Starts with an ink rule so each block reads
 * as a new page of the ledger.
 */
export function CaseBlock({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: ReactNode;
}) {
  const titleId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={titleId} className="border-t border-ink pt-8 md:pt-10">
      <div className="grid gap-y-3 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-3 lg:pt-3">
          <MarginLabel>{label}</MarginLabel>
        </div>
        <h2 id={titleId} className="font-serif text-display-sm text-balance lg:col-span-9">
          {title}
        </h2>
      </div>
      <div className="mt-10 md:mt-14">{children}</div>
    </section>
  );
}

/** A small heading inside a block (Palette, Type, Mobile ...). */
export function SubHeading({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h3 id={id} className="font-serif text-[1.625rem]/[1.1] tracking-[-0.01em] text-ink">
      {children}
    </h3>
  );
}
