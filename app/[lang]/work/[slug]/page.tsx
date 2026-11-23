import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Container from "@/components/ui/Container";
import CaseHeader, { heroFor, heroSources } from "@/components/case/CaseHeader";
import { CaseRow } from "@/components/case/CaseBlock";
import WebBlockView from "@/components/case/WebBlockView";
import BrandBlockView from "@/components/case/BrandBlockView";
import AdsBlockView from "@/components/case/AdsBlockView";
import { locales, resolveLocale } from "@/i18n/dictionaries";
import { getProject, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { caseCopy as copy } from "@/data/sections";
import type { Discipline, Locale, Project } from "@/data/types";
import { tr } from "@/lib/localize";

/*
 * Case study page: /{lang}/work/{slug}. One template, optional blocks.
 * Only projects with a caseStudy get a page; any other slug is a 404
 * (app/[lang]/not-found.tsx), because dynamicParams is off.
 */

export const dynamicParams = false;

const caseProjects = (): Project[] => projects.filter((p) => p.caseStudy);

export function generateStaticParams() {
  return locales.flatMap((lang) => caseProjects().map((p) => ({ lang, slug: p.slug })));
}

interface PageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { lang, slug } = await props.params;
  const locale = resolveLocale(lang);
  const project = getProject(slug);
  if (!project?.caseStudy) return {};
  const title = `${project.title} — ${profile.name}`;
  const description = tr(project.summary, locale);
  return {
    metadataBase: new URL("https://azizbektursunov.uz"),
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://azizbektursunov.uz/${locale}/work/${project.slug}`,
      images: project.cover.kind === "image" ? [{ url: project.cover.src }] : undefined,
    },
  };
}

function Neighbour({ project, dir, locale }: { project: Project; dir: "prev" | "next"; locale: Locale }) {
  const next = dir === "next";
  const Arrow = next ? ArrowRight : ArrowLeft;
  return (
    <Link
      href={`/${locale}/work/${project.slug}`}
      rel={dir}
      className={`group/nb flex min-h-36 flex-col justify-between gap-6 py-7 md:py-9 ${next ? "md:items-end md:pl-10 md:text-right" : "md:pr-10"}`}
    >
      <span className={`flex items-center gap-2 font-mono text-label text-muted ${next ? "md:flex-row-reverse" : ""}`}>
        <Arrow
          aria-hidden="true"
          className={`h-4 w-4 transition-transform duration-300 ease-out-quint ${next ? "group-hover/nb:translate-x-1" : "group-hover/nb:-translate-x-1"}`}
          strokeWidth={1.8}
        />
        {tr(next ? copy.next : copy.previous, locale)}
      </span>
      <span className="max-w-[18ch] text-balance font-serif text-[clamp(1.875rem,1.4rem+1.6vw,2.75rem)]/[1.04] tracking-[-0.01em] text-ink decoration-1 underline-offset-[0.12em] group-hover/nb:underline">
        {project.title}
      </span>
    </Link>
  );
}

export default async function CasePage(props: PageProps) {
  const { lang, slug } = await props.params;
  const locale = resolveLocale(lang);
  const project = getProject(slug);
  const cs = project?.caseStudy;
  if (!project || !cs) notFound();

  const list = caseProjects();
  const i = list.findIndex((p) => p.slug === project.slug);
  const prev = list[(i - 1 + list.length) % list.length];
  const next = list[(i + 1) % list.length];

  // Images shown higher up the page are not repeated further down.
  const skip = new Set<string>(heroSources(heroFor(project)));
  for (const m of cs.ads?.creatives ?? []) {
    skip.add(m.src);
    if (m.poster) skip.add(m.poster);
  }

  const blocks: Record<Discipline, React.ReactNode> = {
    web: cs.web ? <WebBlockView key="web" web={cs.web} locale={locale} skip={skip} /> : null,
    brand: cs.brand ? <BrandBlockView key="brand" brand={cs.brand} locale={locale} skip={skip} /> : null,
    ads: cs.ads ? <AdsBlockView key="ads" ads={cs.ads} locale={locale} /> : null,
  };
  // Blocks follow the project's own discipline order (an ads project leads with its ads).
  const order: Discipline[] = [...project.disciplines, ...(["web", "brand", "ads"] as Discipline[])].filter(
    (d, idx, all) => all.indexOf(d) === idx,
  );
  const decisions = cs.decisions ? tr(cs.decisions, locale) : [];

  return (
    <article aria-labelledby="case-title">
      <Container>
        <CaseHeader project={project} locale={locale} />

        <div className="mt-16 md:mt-24">
          <CaseRow label={tr(copy.brief, locale)} testId="case-brief">
            <p className="max-w-[34ch] text-pretty font-serif text-[clamp(1.625rem,1.3rem+1.2vw,2.25rem)]/[1.18] tracking-[-0.005em] text-ink">
              {tr(cs.brief, locale)}
            </p>
          </CaseRow>

          <CaseRow label={tr(copy.whatIDid, locale)}>
            <ul role="list" className="max-w-prose divide-y divide-rule">
              {tr(cs.whatIDid, locale).map((item) => (
                <li key={item} className="py-3 text-pretty text-lg leading-relaxed text-ink-soft first:pt-0 last:pb-0">
                  {item}
                </li>
              ))}
            </ul>
          </CaseRow>

          {decisions.length > 0 ? (
            <CaseRow label={tr(copy.decisions, locale)}>
              <ul role="list" className="max-w-prose divide-y divide-rule">
                {decisions.map((item) => (
                  <li key={item} className="py-3 text-pretty text-lg leading-relaxed text-ink-soft first:pt-0 last:pb-0">
                    {item}
                  </li>
                ))}
              </ul>
            </CaseRow>
          ) : null}

          <CaseRow label={tr(copy.result, locale)} testId="case-result">
            <p className="max-w-[34ch] text-pretty font-serif text-[clamp(1.625rem,1.3rem+1.2vw,2.25rem)]/[1.18] tracking-[-0.005em] text-green">
              {tr(cs.result, locale)}
            </p>
          </CaseRow>
        </div>

        <div className="mt-12 space-y-24 md:mt-16 md:space-y-32">{order.map((d) => blocks[d])}</div>

        <nav
          aria-label={tr(copy.moreProjects, locale)}
          className="mb-20 mt-24 grid border-y border-ink md:mb-28 md:mt-32 md:grid-cols-2 md:divide-x md:divide-rule"
        >
          <Neighbour project={prev} dir="prev" locale={locale} />
          <div className="border-t border-rule md:border-t-0">
            <Neighbour project={next} dir="next" locale={locale} />
          </div>
        </nav>
      </Container>
    </article>
  );
}
