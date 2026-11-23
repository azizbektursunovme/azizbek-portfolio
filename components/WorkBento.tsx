import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";
import Reveal from "@/components/ui/Reveal";
import { featuredProjects } from "@/data/projects";
import { disciplineLabel, workCopy } from "@/data/sections";
import type { Locale, Project } from "@/data/types";
import { projectTitle, tr } from "@/lib/localize";
import { cn } from "@/lib/cn";

/*
 * Selected work: six featured projects as an asymmetric bento, right under
 * the hero at #work. Server component; the only client code is Reveal.
 *
 *   lg (12 cols)                         md (2 cols)       phone
 *   [ 1 JJR ....... ][ 2 DAVR .... ]     [ 1 ........ ]    [ 1 ]
 *   [ 3 ...][ 4 ...][ 6 GIC (tall) ]     [ 2 ........ ]    [ 2 ]
 *   [ 5 8iz (image | caption) ][ 6 ]     [ 3 ][ 4 ]        [ … ]
 *                                        [ 5 ][ 6 ]
 *
 * Each tile is one link to its case page, named by the project title. Tile 6
 * is the 9:16 ad creative, so it gets the tall slot; the row heights keep
 * tiles 1 and 2 the largest by area from 1024px up (checked in e2e/bento). Covers are stills only:
 * a video cover shows its poster, never autoplays here.
 */

/* Copy lives in data/sections.ts (workCopy, disciplineLabel); re-exported for older imports. */
export { workCopy, disciplineLabel };

interface Slot {
  /** Grid placement per breakpoint. */
  place: string;
  /** Cover frame shape below lg; at lg the frame fills its grid cell. */
  frame: string;
  /** Large tiles get a bigger title. */
  size: "lg" | "md";
  /** At lg the caption sits beside the image instead of under it. */
  side?: boolean;
  /** What part of the cover to keep when it is cropped. */
  focus: string;
  /** next/image `sizes`. */
  sizes: string;
}

const SLOTS: Slot[] = [
  {
    place: "md:col-span-2 lg:col-span-7 lg:col-start-1 lg:row-start-1",
    frame: "aspect-[16/11] md:aspect-[16/9]",
    size: "lg",
    focus: "object-top",
    sizes: "(min-width: 1024px) 60vw, 100vw",
  },
  {
    place: "md:col-span-2 lg:col-span-5 lg:col-start-8 lg:row-start-1",
    frame: "aspect-[16/11] md:aspect-[16/9]",
    size: "lg",
    focus: "object-left-top",
    sizes: "(min-width: 1024px) 42vw, 100vw",
  },
  {
    place: "lg:col-span-4 lg:col-start-1 lg:row-start-2",
    frame: "aspect-[16/10]",
    size: "md",
    focus: "object-top",
    sizes: "(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    place: "lg:col-span-4 lg:col-start-5 lg:row-start-2",
    frame: "aspect-[16/10]",
    size: "md",
    focus: "object-left-top",
    sizes: "(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    place: "lg:col-span-8 lg:col-start-1 lg:row-start-3",
    frame: "aspect-[16/10]",
    size: "md",
    side: true,
    focus: "object-left-top",
    sizes: "(min-width: 1024px) 42vw, (min-width: 768px) 50vw, 100vw",
  },
  {
    place: "lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-2",
    frame: "aspect-[4/5] md:aspect-[16/10]",
    size: "md",
    focus: "object-top",
    sizes: "(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 100vw",
  },
];

/** The still to show for a cover: the image itself, or a video's poster. */
function coverStill(project: Project): string | undefined {
  return project.cover.kind === "video" ? project.cover.poster : project.cover.src;
}

function Tile({ project, slot, locale, index }: { project: Project; slot: Slot; locale: Locale; index: number }) {
  const titleId = `work-${project.slug}-title`;
  const metaId = `work-${project.slug}-meta`;
  const still = coverStill(project);
  // The context line ("Delivered at GFS Group", ...) when there is one, otherwise the role.
  const meta = project.context ? tr(project.context, locale) : tr(project.role, locale);

  return (
    <li data-testid="bento-tile" className={cn("min-w-0", slot.place)}>
      <Reveal delay={(index % 3) * 0.08} className="h-full">
        <Link
          href={`/${locale}/work/${project.slug}`}
          aria-labelledby={titleId}
          aria-describedby={metaId}
          className={cn(
            "group/tile flex h-full flex-col rounded-[calc(var(--radius-tile)+0.375rem)] focus-visible:outline-offset-[6px]",
            slot.side && "lg:flex-row lg:gap-8",
          )}
        >
          <div
            className={cn(
              "relative w-full overflow-hidden rounded-tile bg-paper-deep",
              // A hairline keeps white screenshots from dissolving into the paper.
              "after:pointer-events-none after:absolute after:inset-0 after:rounded-tile after:ring-1 after:ring-inset after:ring-ink/10",
              slot.frame,
              "lg:aspect-auto lg:min-h-0 lg:flex-1",
              slot.side && "lg:h-full lg:w-[64%] lg:flex-none",
            )}
          >
            {still ? (
              <Image
                src={still}
                alt={tr(project.cover.alt, locale)}
                fill
                sizes={slot.sizes}
                className={cn(
                  "object-cover transition-transform duration-[900ms] ease-out-quint group-hover/tile:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover/tile:scale-100",
                  slot.focus,
                )}
              />
            ) : null}
          </div>

          <div className={cn("flex flex-col pt-4 md:pt-5", slot.side && "lg:min-w-0 lg:flex-1 lg:justify-between lg:pb-1 lg:pt-1")}>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3
                  id={titleId}
                  className={cn(
                    "text-balance font-serif tracking-[-0.01em] text-ink decoration-1 underline-offset-[0.14em] group-hover/tile:underline",
                    // Size and leading together: tailwind-merge drops a leading-* that comes before a text-* size.
                    slot.size === "lg" ? "text-[clamp(1.875rem,1.5rem+1.2vw,2.5rem)]/[1.02]" : "text-[1.75rem]/[1.04]",
                  )}
                >
                  {projectTitle(project, locale)}
                </h3>
                <p id={metaId} className="mt-1.5 text-[0.9375rem] leading-snug text-muted">
                  {meta}
                </p>
                {slot.side ? (
                  // The side tile has room to say what the project is.
                  <p className="mt-4 hidden max-w-[28ch] text-pretty text-[0.9375rem] leading-relaxed text-ink-soft lg:block">
                    {tr(project.summary, locale)}
                  </p>
                ) : null}
              </div>
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink transition-colors duration-300 ease-out-quint group-hover/tile:border-ink group-hover/tile:bg-ink group-hover/tile:text-paper"
              >
                <ArrowUpRight
                  className="h-[1.125rem] w-[1.125rem] transition-transform duration-300 ease-out-quint group-hover/tile:-translate-y-px group-hover/tile:translate-x-px"
                  strokeWidth={1.6}
                />
              </span>
            </div>
            <ul role="list" className="mt-3.5 flex flex-wrap gap-1.5">
              {project.disciplines.map((d) => (
                <li key={d}>
                  <Tag>{tr(disciplineLabel[d], locale)}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </Link>
      </Reveal>
    </li>
  );
}

export default function WorkBento({ locale }: { locale: Locale }) {
  const projects = featuredProjects();

  return (
    <Section
      id="work"
      eyebrow={tr(workCopy.eyebrow, locale)}
      title={tr(workCopy.title, locale)}
      intro={<p>{tr(workCopy.intro, locale)}</p>}
    >
      <ul
        role="list"
        className="grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2 md:gap-y-14 lg:grid-cols-12 lg:grid-rows-[clamp(32rem,25rem+12vw,38rem)_repeat(2,clamp(18.5rem,12rem+9vw,20rem))] lg:gap-x-8 lg:gap-y-12"
      >
        {projects.map((project, i) => (
          <Tile key={project.slug} project={project} slot={SLOTS[i] ?? SLOTS[2]} locale={locale} index={i} />
        ))}
      </ul>
    </Section>
  );
}
