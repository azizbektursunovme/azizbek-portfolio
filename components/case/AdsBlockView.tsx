import Image from "next/image";
import PhoneVideo from "@/components/PhoneVideo";
import Tag from "@/components/ui/Tag";
import { CaseBlock, SubHeading } from "@/components/case/CaseBlock";
import { caseCopy as copy } from "@/data/sections";
import type { AdsBlock, Locale } from "@/data/types";
import { tr } from "@/lib/localize";

/*
 * Ads block: what the campaign was for, the facts that may be shown (no
 * cost-per-lead or lead counts) and the tools, beside the creatives. Video
 * creatives play in PhoneVideo frames (muted, only in view, never under
 * reduced motion); still creatives such as carousel slides follow in a row.
 */
export default function AdsBlockView({ ads, locale }: { ads: AdsBlock; locale: Locale }) {
  // Tall (9:16) clips first, so on two columns they pair up and the odd shape sits alone below.
  const videos = ads.creatives
    .filter((m) => m.kind === "video")
    .sort((a, b) => b.height / b.width - a.height / a.width);
  const stills = ads.creatives.filter((m) => m.kind === "image");
  const facts = tr(ads.facts, locale);

  return (
    <CaseBlock id="ads" label={tr(copy.adsBlock, locale)} title={tr(copy.adsTitle, locale)}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SubHeading>{tr(copy.objective, locale)}</SubHeading>
          <p className="mt-3 text-pretty text-ink-soft">{tr(ads.objective, locale)}</p>

          {facts.length > 0 ? (
            <ul role="list" className="mt-8 divide-y divide-rule border-y border-rule">
              {facts.map((f) => (
                <li key={f} className="py-3 text-[0.9375rem]">
                  {f}
                </li>
              ))}
            </ul>
          ) : null}

          {ads.tools.length > 0 ? (
            <div className="mt-8">
              <h3 className="font-mono text-label text-muted">{tr(copy.tools, locale)}</h3>
              <ul role="list" className="mt-3 flex flex-wrap gap-1.5">
                {ads.tools.map((t) => (
                  <li key={t}>
                    <Tag className="text-ink">{t}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>

        <div className="min-w-0 lg:col-span-8">
          <SubHeading>{tr(copy.creatives, locale)}</SubHeading>
          {videos.length > 0 ? (
            <ul role="list" className="mt-6 grid grid-cols-2 items-end gap-4 sm:gap-6 md:grid-cols-3">
              {videos.map((m, i) => (
                <li
                  key={m.src}
                  className={
                    videos.length % 2 === 1 && i === videos.length - 1
                      ? "col-span-2 mx-auto w-[62%] min-w-0 md:col-span-1 md:w-full"
                      : "min-w-0"
                  }
                >
                  <figure>
                    <PhoneVideo media={m} locale={locale} />
                    <figcaption className="mt-2 text-[0.8125rem]/snug text-muted">{tr(m.alt, locale)}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ) : null}

          {stills.length > 0 ? (
            <ul role="list" className="mt-10 grid grid-cols-3 gap-3 md:gap-4">
              {stills.map((m) => (
                <li key={m.src} className="min-w-0">
                  <figure>
                    <div className="overflow-hidden rounded-tile border border-rule">
                      <Image
                        src={m.src}
                        alt={tr(m.alt, locale)}
                        width={m.width}
                        height={m.height}
                        sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
                        className="h-auto w-full"
                      />
                    </div>
                    <figcaption className="mt-2 text-[0.8125rem]/snug text-muted">{tr(m.alt, locale)}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </CaseBlock>
  );
}
