import Link from "next/link";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { ArrowDown, ArrowLeft, ArrowUpRight } from "lucide-react";
import Tag from "@/components/ui/Tag";
import DevicePair from "@/components/case/DevicePair";
import { disciplineLabel } from "@/components/WorkBento";
import { caseCopy as copy } from "@/data/sections";
import type { Locale, Media, Project } from "@/data/types";
import { tr } from "@/lib/localize";
import { cn } from "@/lib/cn";

/*
 * Top of a case page: back link, title, one-line summary, the meta ledger
 * (client, context, year, role, stack, links) and the cover.
 *
 * The page's one load moment reuses the hero keyframes (CSS only, behind
 * motion-safe): the title rises out of its baseline and the rule draws.
 *
 * Link rules: the live URL is only rendered when liveStatus is "live";
 * "soon" shows plain text and never the address.
 */

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

export const textLink =
  "inline-flex min-h-10 items-center gap-1.5 text-[0.9375rem] font-medium text-ink underline decoration-ink/25 decoration-1 underline-offset-[0.28em] transition-colors hover:decoration-ink";

function MetaItem({ label, children, wide }: { label: string; children: ReactNode; wide?: boolean }) {
  return (
    <div className={cn("min-w-0 border-t border-rule py-4 lg:border-l lg:border-t-0 lg:py-5 lg:pl-5 lg:first:border-l-0 lg:first:pl-0", wide && "col-span-2 md:col-span-1")}>
      <dt className="font-mono text-label text-muted">{label}</dt>
      <dd className="mt-1.5 text-pretty text-[0.9375rem] leading-snug text-ink">{children}</dd>
    </div>
  );
}

export type Hero = { kind: "image"; media: Media } | { kind: "pair"; desktop: Media; mobile: Media };

/**
 * What the page opens with. A website cover that is also the first desktop
 * screenshot is shown with its phone screen beside it; any other cover is
 * shown on its own when it is a landscape image with enough pixels.
 * Portrait or small covers (ad posters, business cards) are left to their block.
 */
export function heroFor(project: Project): Hero | null {
  const c = project.cover;
  if (c.kind !== "image") return null;
  const web = project.caseStudy?.web;
  if (web && web.desktop[0]?.src === c.src && web.mobile[0]) {
    return { kind: "pair", desktop: web.desktop[0], mobile: web.mobile[0] };
  }
  if (c.width < 1200 || c.width / c.height < 1.2) return null;
  return { kind: "image", media: c };
}

/** Image sources the hero shows, so blocks further down skip them. */
export function heroSources(hero: Hero | null): string[] {
  if (!hero) return [];
  return hero.kind === "image" ? [hero.media.src] : [hero.desktop.src, hero.mobile.src];
}

export default function CaseHeader({ project, locale }: { project: Project; locale: Locale }) {
  const { liveStatus, live, github } = project.links;
  const guide = project.caseStudy?.brand?.guidePdf;
  const hero = heroFor(project);
  const long = project.title.length > 22;

  const links: ReactNode[] = [];
  if (liveStatus === "live" && live) {
    links.push(
      <a key="live" href={live} target="_blank" rel="noopener noreferrer" className={textLink}>
        {tr(copy.visitSite, locale)}
        <span className="sr-only"> {project.title} (opens in a new tab)</span>
        <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
      </a>,
    );
  }
  if (liveStatus === "soon") {
    links.push(
      <span key="soon" className="inline-flex min-h-10 items-center gap-2 font-mono text-label text-muted before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent">
        {tr(copy.launchingSoon, locale)}
      </span>,
    );
  }
  if (github) {
    links.push(
      <a key="gh" href={github} target="_blank" rel="noopener noreferrer" className={textLink}>
        {tr(copy.github, locale)}
        <span className="sr-only"> (opens in a new tab)</span>
        <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
      </a>,
    );
  }
  if (guide) {
    links.push(
      <a key="guide" href={guide} download className={textLink}>
        {tr(copy.guide, locale)}
        <ArrowDown aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
      </a>,
    );
  }

  return (
    <header className="pt-6 md:pt-10">
      <Link
        href={`/${locale}#work`}
        className="group/back inline-flex min-h-10 items-center gap-2 text-[0.9375rem] font-medium text-muted transition-colors hover:text-ink"
      >
        <ArrowLeft
          aria-hidden="true"
          className="h-4 w-4 transition-transform duration-200 ease-out-quint group-hover/back:-translate-x-0.5"
          strokeWidth={1.8}
        />
        {tr(copy.allWork, locale)}
      </Link>

      <ul role="list" className="mt-8 flex flex-wrap gap-1.5 md:mt-12">
        {project.disciplines.map((d) => (
          <li key={d}>
            <Tag>{tr(disciplineLabel[d], locale)}</Tag>
          </li>
        ))}
      </ul>

      <h1 id="case-title" className="-mb-[0.12em] mt-5 overflow-hidden pb-[0.2em]">
        <span
          className={cn(
            "block max-w-[16ch] text-balance font-serif text-ink motion-safe:animate-hero-rise",
            long ? "text-display" : "text-display-xl",
          )}
          style={delay(60)}
        >
          {project.title}
        </span>
      </h1>

      <p
        className="mt-5 max-w-[46ch] text-pretty text-lead text-muted motion-safe:animate-hero-fade md:mt-7"
        style={delay(260)}
      >
        {tr(project.summary, locale)}
      </p>

      <div aria-hidden="true" className="mt-10 h-px origin-left bg-ink motion-safe:animate-hero-rule md:mt-14" style={delay(200)} />

      <dl
        data-testid="case-meta"
        className="grid grid-cols-2 gap-x-6 motion-safe:animate-hero-fade md:grid-cols-3 lg:grid-flow-col lg:auto-cols-fr lg:grid-cols-none lg:gap-x-5"
        style={delay(380)}
      >
        <MetaItem label={tr(copy.client, locale)}>{project.client}</MetaItem>
        {project.context ? <MetaItem label={tr(copy.context, locale)}>{tr(project.context, locale)}</MetaItem> : null}
        <MetaItem label={tr(copy.year, locale)}>{project.year}</MetaItem>
        <MetaItem label={tr(copy.role, locale)}>{tr(project.role, locale)}</MetaItem>
        {project.stack.length > 0 ? <MetaItem label={tr(copy.stack, locale)}>{project.stack.join(", ")}</MetaItem> : null}
        {links.length > 0 ? (
          <MetaItem label={tr(copy.links, locale)} wide>
            <span className="-my-2 flex flex-wrap gap-x-4">{links}</span>
          </MetaItem>
        ) : null}
      </dl>

      {hero?.kind === "pair" ? (
        <DevicePair
          desktop={hero.desktop}
          mobile={hero.mobile}
          locale={locale}
          priority
          className="mt-8 motion-safe:animate-hero-fade md:mt-12"
          style={delay(480)}
        />
      ) : null}
      {hero?.kind === "image" ? (
        <div
          className="relative mt-8 overflow-hidden rounded-tile bg-paper-deep motion-safe:animate-hero-fade after:pointer-events-none after:absolute after:inset-0 after:rounded-tile after:ring-1 after:ring-inset after:ring-ink/10 md:mt-12"
          style={delay(480)}
        >
          <Image
            src={hero.media.src}
            alt={tr(hero.media.alt, locale)}
            width={hero.media.width}
            height={hero.media.height}
            priority
            sizes="(min-width: 1248px) 1168px, 100vw"
            className="h-auto w-full"
          />
        </div>
      ) : null}
    </header>
  );
}
