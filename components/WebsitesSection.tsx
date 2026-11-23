import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";
import Reveal from "@/components/ui/Reveal";
import { byDiscipline, redesignLinks } from "@/data/projects";
import { websitesCopy as copy } from "@/data/sections";
import type { Locale, Project } from "@/data/types";
import { tr } from "@/lib/localize";

/*
 * Every web project, as a grid of site cards at #websites, plus the
 * GFS Group redesign concepts as a compact links-only row. Server component.
 *
 * Link rules per card: liveStatus "live" gets an external Visit site link;
 * "soon" gets plain "Launching soon" text and no live URL anywhere; "none"
 * gets neither. The case page link only appears when a case study exists.
 */

const linkClass =
  "inline-flex min-h-10 items-center gap-1.5 rounded-full text-[0.9375rem] font-medium text-ink underline decoration-ink/25 decoration-1 underline-offset-[0.28em] transition-colors hover:decoration-ink";

function SiteCard({ project, locale, index }: { project: Project; locale: Locale; index: number }) {
  // Prefer the real desktop screenshot over the cover, which may be a brand preview.
  const shot = project.caseStudy?.web?.desktop[0] ?? project.cover;
  const { liveStatus, live, github } = project.links;
  const titleId = `site-${project.slug}-title`;
  const context = project.context ? tr(project.context, locale) : null;

  return (
    <li data-testid="site-card" className="min-w-0">
      <Reveal delay={(index % 3) * 0.08} className="h-full">
        <article aria-labelledby={titleId} className="flex h-full flex-col">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-tile bg-paper-deep after:pointer-events-none after:absolute after:inset-0 after:rounded-tile after:ring-1 after:ring-inset after:ring-ink/10">
            <Image
              src={shot.src}
              alt={tr(shot.alt, locale)}
              fill
              sizes="(min-width: 1024px) 32vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover object-top"
            />
          </div>

          <div className="flex flex-1 flex-col pt-4 md:pt-5">
            <h3 id={titleId} className="font-serif text-[1.75rem]/[1.04] tracking-[-0.01em] text-ink">
              {project.title}
            </h3>
            <p className="mt-2 text-pretty text-[0.9375rem] leading-relaxed text-ink-soft">{tr(project.summary, locale)}</p>
            <p className="mt-3 text-[0.9375rem] leading-snug text-muted">
              <span className="font-medium text-ink">{tr(project.role, locale)}</span>
              {context ? <span> · {context}</span> : null}
            </p>

            {project.stack.length > 0 ? (
              <ul role="list" aria-label={tr(copy.stackLabel, locale)} className="mt-3.5 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                  <li key={s}>
                    <Tag>{s}</Tag>
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-rule pt-2.5">
              {liveStatus === "live" && live ? (
                <a href={live} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {tr(copy.visitSite, locale)}
                  <span className="sr-only"> {project.title} (opens in a new tab)</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                </a>
              ) : null}
              {liveStatus === "soon" ? (
                <span className="inline-flex min-h-10 items-center gap-2 font-mono text-label text-muted before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent">
                  {tr(copy.launchingSoon, locale)}
                </span>
              ) : null}
              {github ? (
                <a href={github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {tr(copy.github, locale)}
                  <span className="sr-only"> {project.title} (opens in a new tab)</span>
                  <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                </a>
              ) : null}
              {project.caseStudy ? (
                <Link href={`/${locale}/work/${project.slug}`} className={linkClass}>
                  {tr(copy.caseStudy, locale)}
                  <span className="sr-only"> {project.title}</span>
                </Link>
              ) : null}
            </div>
          </div>
        </article>
      </Reveal>
    </li>
  );
}

export default function WebsitesSection({ locale }: { locale: Locale }) {
  const sites = byDiscipline("web");
  const redesignId = "redesign-title";

  return (
    <Section
      id="websites"
      eyebrow={tr(copy.eyebrow, locale)}
      title={tr(copy.title, locale)}
      intro={<p>{tr(copy.intro, locale)}</p>}
    >
      <ul role="list" className="grid grid-cols-1 gap-x-6 gap-y-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8">
        {sites.map((project, i) => (
          <SiteCard key={project.slug} project={project} locale={locale} index={i} />
        ))}
      </ul>

      <div className="mt-16 border-t border-ink pt-6 md:mt-20 lg:grid lg:grid-cols-12 lg:gap-x-8">
        <div className="lg:col-span-4">
          <h3 id={redesignId} className="font-serif text-[1.5rem]/[1.1] tracking-[-0.01em] text-ink">
            {tr(copy.redesignTitle, locale)}
          </h3>
          <p className="mt-1.5 text-[0.9375rem] text-muted">{tr(copy.redesignNote, locale)}</p>
        </div>
        <ul role="list" aria-labelledby={redesignId} className="mt-5 flex flex-wrap gap-2 lg:col-span-8 lg:mt-0">
          {redesignLinks.map((r) => (
            <li key={r.url}>
              <a
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="redesign-link"
                className="inline-flex h-10 items-center gap-1.5 rounded-full border border-ink/20 px-4 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                {r.name}
                <ArrowUpRight aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
