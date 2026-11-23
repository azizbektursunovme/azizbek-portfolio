import Link from "next/link";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { byDiscipline } from "@/data/projects";
import { brandingCopy as copy } from "@/data/sections";
import type { Locale, Media, Project } from "@/data/types";
import { tr } from "@/lib/localize";
import { cn } from "@/lib/cn";

/*
 * The brand wall at #branding: one logo per brand project, drawn in ink by
 * default and in the brand's own colours on hover or keyboard focus. Each
 * tile is one link to the case page, named by the project title.
 *
 * Mono state: public/work/<slug>/mark-mono.* when it exists, otherwise the
 * colour logo under a CSS grayscale filter. The colour state of a logo that
 * was drawn for a dark ground (JJR, FRAGRISE) gets the brand's darkest
 * palette colour as its stage on hover so it stays legible.
 */

/** Which logo carries the brand colours, and whether it needs a dark stage. */
const COLOUR: Record<string, { logo: number; dark?: boolean; big?: boolean }> = {
  // Square artwork with built-in padding: let it fill more of the stage.
  cleanpro: { logo: 0, big: true },
  "jjr-transportation": { logo: 0, dark: true },
  fragrise: { logo: 1, dark: true },
};

function monoFor(project: Project): string | null {
  for (const ext of ["svg", "png", "webp"]) {
    const rel = `/work/${project.slug}/mark-mono.${ext}`;
    if (existsSync(join(process.cwd(), "public", rel))) return rel;
  }
  return null;
}

function BrandTile({ project, locale, index }: { project: Project; locale: Locale; index: number }) {
  const logos = project.caseStudy?.brand?.logos ?? [];
  const cfg = COLOUR[project.slug] ?? { logo: 0 };
  const colour: Media | undefined = logos[cfg.logo] ?? logos[0];
  const mono = monoFor(project);
  const size = cfg.big ? "max-h-[72%] max-w-[72%]" : "max-h-[38%] max-w-[68%]";
  const stage = cfg.dark ? project.caseStudy?.brand?.palette[0]?.hex : undefined;
  const titleId = `brand-${project.slug}-title`;
  const metaId = `brand-${project.slug}-meta`;
  // Context when there is one; otherwise the client, unless it just repeats the title, then the role.
  const meta = project.context
    ? tr(project.context, locale)
    : project.client !== project.title
      ? project.client
      : tr(project.role, locale);
  const hover = "group-hover/tile:opacity-100 group-focus-visible/tile:opacity-100";

  return (
    <li data-testid="brand-tile" className="min-w-0">
      <Reveal delay={(index % 4) * 0.08} className="h-full">
        <Link
          href={`/${locale}/work/${project.slug}`}
          aria-labelledby={titleId}
          aria-describedby={metaId}
          className="group/tile flex h-full flex-col rounded-[calc(var(--radius-tile)+0.375rem)] focus-visible:outline-offset-[6px]"
        >
          <div
            data-testid="brand-logo"
            className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-tile border border-rule bg-paper-deep/50 transition-colors duration-500 ease-out-quint group-hover/tile:border-transparent group-focus-visible/tile:border-transparent"
          >
            {stage ? (
              <span
                aria-hidden="true"
                className={cn("absolute inset-0 opacity-0 transition-opacity duration-500 ease-out-quint", hover)}
                style={{ backgroundColor: stage }}
              />
            ) : null}
            {colour ? (
              <>
                {mono ? (
                  // Plain <img>: SVG logos with intrinsic sizes; the two states cross-fade.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={mono}
                    alt={tr(colour.alt, locale)}
                    width={colour.width}
                    height={colour.height}
                    loading="lazy"
                    decoding="async"
                    className={cn("relative object-contain transition-opacity duration-500 ease-out-quint group-hover/tile:opacity-0 group-focus-visible/tile:opacity-0", size)}
                  />
                ) : null}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={colour.src}
                  alt={mono ? "" : tr(colour.alt, locale)}
                  width={colour.width}
                  height={colour.height}
                  loading="lazy"
                  decoding="async"
                  className={cn(
                    size,
                    "object-contain transition-[opacity,filter] duration-500 ease-out-quint",
                    mono
                      ? cn("absolute opacity-0", hover)
                      : "relative mix-blend-multiply grayscale group-hover/tile:grayscale-0 group-focus-visible/tile:grayscale-0",
                  )}
                />
              </>
            ) : null}
          </div>

          <div className="flex items-start justify-between gap-3 pt-4">
            <div className="min-w-0">
              <h3
                id={titleId}
                className="text-balance font-serif text-[1.5rem]/[1.1] tracking-[-0.01em] text-ink decoration-1 underline-offset-[0.14em] group-hover/tile:underline"
              >
                {project.title}
              </h3>
              <p id={metaId} className="mt-1 text-[0.9375rem] leading-snug text-muted">
                {meta}
              </p>
            </div>
            <ArrowUpRight
              aria-hidden="true"
              className="mt-1 h-[1.125rem] w-[1.125rem] shrink-0 text-ink transition-transform duration-300 ease-out-quint group-hover/tile:-translate-y-px group-hover/tile:translate-x-px"
              strokeWidth={1.6}
            />
          </div>
        </Link>
      </Reveal>
    </li>
  );
}

export default function BrandingSection({ locale }: { locale: Locale }) {
  const brands = byDiscipline("brand");

  return (
    <Section
      id="branding"
      eyebrow={tr(copy.eyebrow, locale)}
      title={tr(copy.title, locale)}
      intro={<p>{tr(copy.intro, locale)}</p>}
    >
      <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
        {brands.map((project, i) => (
          <BrandTile key={project.slug} project={project} locale={locale} index={i} />
        ))}
      </ul>
    </Section>
  );
}
