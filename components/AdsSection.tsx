import Section from "@/components/ui/Section";
import Tag from "@/components/ui/Tag";
import Reveal from "@/components/ui/Reveal";
import PhoneVideo from "@/components/PhoneVideo";
import ArchiveGrid from "@/components/ArchiveGrid";
import { getProject } from "@/data/projects";
import { profile } from "@/data/profile";
import { adsCopy as copy } from "@/data/sections";
import type { Locale, Media } from "@/data/types";
import { tr } from "@/lib/localize";

/*
 * Ads & Content at #ads: the Good Idea Cargo recruiting campaign (three video
 * creatives and the O1 carousel), the GFS Group ad, the AI workflow strip and
 * the Earlier work archive. Only facts from the project data are shown: no
 * cost-per-lead, lead counts or spend.
 */

const h3 = "font-serif text-[1.875rem]/[1.1] tracking-[-0.01em]";

function Label({ children }: { children: string }) {
  return <p className="font-mono text-label text-muted">{children}</p>;
}

function Creative({ media, locale, className }: { media: Media; locale: Locale; className?: string }) {
  return (
    <figure className={className}>
      <PhoneVideo media={media} locale={locale} />
      <figcaption className="mt-2 text-[0.8125rem]/snug text-muted">{tr(media.alt, locale)}</figcaption>
    </figure>
  );
}

export default function AdsSection({ locale }: { locale: Locale }) {
  const gic = getProject("good-idea-cargo-ads");
  const gfs = getProject("gfs-ads");
  const ads = gic?.caseStudy?.ads;
  const videos = ads?.creatives.filter((m) => m.kind === "video") ?? [];
  const slides = ads?.creatives.filter((m) => m.kind === "image") ?? [];
  const aiTools = profile.tools.find((g) => g.group === "Growth & AI")?.items ?? [];
  const gfsVideo: Media | null = gfs
    ? { src: "/work/gfs-ads/ad-gfs-9x16.mp4", poster: gfs.cover.src, width: gfs.cover.width, height: gfs.cover.height, alt: gfs.cover.alt, kind: "video" }
    : null;

  return (
    <Section
      id="ads"
      eyebrow={tr(copy.eyebrow, locale)}
      title={tr(copy.title, locale)}
      intro={<p>{tr(copy.intro, locale)}</p>}
    >
      <div className="space-y-16 md:space-y-24">
        {gic && ads && videos.length >= 3 ? (
          <Reveal>
            <article aria-labelledby="ads-gic-title" className="grid gap-8 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <Tag className="text-ink">{tr(copy.madeAt, locale)}</Tag>
                <h3 id="ads-gic-title" className={`mt-4 text-balance ${h3}`}>
                  {gic.title}
                </h3>
                <p className="mt-4 text-muted">{tr(ads.objective, locale)}</p>
                <ul role="list" className="mt-6 divide-y divide-rule border-y border-rule">
                  {tr(ads.facts, locale).map((f) => (
                    <li key={f} className="py-3 text-[0.9375rem]">
                      {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-[0.9375rem] text-muted">{tr(gic.role, locale)}</p>
              </div>
              <div className="min-w-0 lg:col-span-8">
                <Label>{tr(copy.creatives, locale)}</Label>
                <div className="mt-4 grid grid-cols-2 items-end gap-4 sm:gap-6 lg:grid-cols-3">
                  <Creative media={videos[0]} locale={locale} className="min-w-0" />
                  <Creative media={videos[2]} locale={locale} className="min-w-0" />
                  <Creative media={videos[1]} locale={locale} className="col-span-2 mx-auto w-full min-w-0 sm:max-w-[60%] lg:col-span-1 lg:max-w-none" />
                </div>

                <div className="mt-10">
                  <Label>{tr(copy.carousel, locale)}</Label>
                  <ul
                    role="list"
                    tabIndex={0}
                    aria-label={tr(copy.carousel, locale)}
                    className="mt-4 flex snap-x gap-3 overflow-x-auto pb-3 [scrollbar-width:thin]"
                  >
                    {slides.map((s) => (
                      <li key={s.src} className="w-[44%] shrink-0 snap-start sm:w-[24%]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={s.src}
                          alt={tr(s.alt, locale)}
                          width={s.width}
                          height={s.height}
                          loading="lazy"
                          decoding="async"
                          className="aspect-[4/5] w-full rounded-tile border border-rule object-cover"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          </Reveal>
        ) : null}

        {gfsVideo ? (
          <Reveal>
            <article aria-labelledby="ads-gfs-title" className="grid items-center gap-8 border-t border-rule pt-12 lg:grid-cols-12 lg:gap-10">
              <div className="lg:col-span-4">
                <Tag className="text-ink">{tr(copy.madeAt, locale)}</Tag>
                <h3 id="ads-gfs-title" className={`mt-4 text-balance ${h3}`}>
                  {tr(copy.gfsTitle, locale)}
                </h3>
                <p className="mt-4 text-muted">{tr(copy.gfsNote, locale)}</p>
              </div>
              <div className="w-full max-w-[15rem] lg:col-span-8">
                <PhoneVideo media={gfsVideo} locale={locale} />
              </div>
            </article>
          </Reveal>
        ) : null}

        <Reveal>
          <div className="border-t border-rule pt-12">
            <h3 className={h3}>{tr(copy.workflowTitle, locale)}</h3>
            <p className="mt-3 max-w-prose text-muted">{tr(copy.workflowNote, locale)}</p>
            <ul role="list" data-testid="ai-tools" className="mt-6 flex flex-wrap gap-2">
              {aiTools.map((t) => (
                <li key={t}>
                  <Tag className="px-3.5 py-1.5 text-[0.8125rem] text-ink">{t}</Tag>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <div className="border-t border-rule pt-12">
          <h3 className={h3}>{tr(copy.archiveTitle, locale)}</h3>
          <p className="mt-3 max-w-prose text-muted">{tr(copy.archiveNote, locale)}</p>
          <div className="mt-8">
            <ArchiveGrid locale={locale} />
          </div>
        </div>
      </div>
    </Section>
  );
}
