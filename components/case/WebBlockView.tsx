import Image from "next/image";
import { CaseBlock, SubHeading } from "@/components/case/CaseBlock";
import DevicePair from "@/components/case/DevicePair";
import { caseCopy as copy } from "@/data/sections";
import type { Locale, Media, WebBlock } from "@/data/types";
import { tr } from "@/lib/localize";
import { cn } from "@/lib/cn";

/*
 * Website block. `skip` holds sources already shown higher up the page (the
 * hero), so nothing appears twice:
 *   - a lone unshown phone screen with the first desktop screen, as a DevicePair,
 *   - the remaining desktop screens in pairs (an odd one out goes full width first),
 *   - the remaining phone screens in phone frames on a deeper paper band.
 * Renders nothing when the hero already showed every screen.
 */

function Shot({ media, locale, sizes }: { media: Media; locale: Locale; sizes: string }) {
  return (
    <figure className="relative overflow-hidden rounded-tile bg-paper-deep after:pointer-events-none after:absolute after:inset-0 after:rounded-tile after:ring-1 after:ring-inset after:ring-ink/10">
      <Image src={media.src} alt={tr(media.alt, locale)} width={media.width} height={media.height} sizes={sizes} className="h-auto w-full" />
    </figure>
  );
}

export default function WebBlockView({ web, locale, skip }: { web: WebBlock; locale: Locale; skip: Set<string> }) {
  let desktop = web.desktop.filter((m) => !skip.has(m.src));
  let mobile = web.mobile.filter((m) => !skip.has(m.src));
  if (desktop.length === 0 && mobile.length === 0) return null;

  let pair: { desktop: Media; mobile: Media } | null = null;
  // A lone phone screen pairs with a desktop; two or more get their own band.
  if (desktop.length > 0 && mobile.length === 1) {
    pair = { desktop: desktop[0], mobile: mobile[0] };
    desktop = desktop.slice(1);
    mobile = mobile.slice(1);
  }
  const wide = desktop.length % 2 === 1 ? desktop[0] : null;
  const pairs = wide ? desktop.slice(1) : desktop;

  return (
    <CaseBlock id="website" label={tr(copy.webBlock, locale)} title={tr(copy.webTitle, locale)}>
      <div className="space-y-8 md:space-y-12">
        {pair ? <DevicePair desktop={pair.desktop} mobile={pair.mobile} locale={locale} /> : null}

        {wide ? <Shot media={wide} locale={locale} sizes="(min-width: 1248px) 1168px, 100vw" /> : null}

        {pairs.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {pairs.map((m) => (
              <Shot key={m.src} media={m} locale={locale} sizes="(min-width: 768px) 50vw, 100vw" />
            ))}
          </div>
        ) : null}

        {mobile.length > 0 ? (
          <div className="rounded-tile bg-paper-deep px-5 pb-8 pt-7 sm:px-8 md:px-12 md:pb-12 md:pt-10">
            <SubHeading>{tr(copy.mobile, locale)}</SubHeading>
            <ul
              role="list"
              className={cn(
                "mt-6 grid gap-5 md:mt-8 md:flex md:flex-wrap md:justify-center md:gap-10",
                mobile.length === 1 ? "grid-cols-1" : "grid-cols-2",
              )}
            >
              {mobile.map((m, i) => (
                <li
                  key={m.src}
                  className={cn(
                    "w-full min-w-0 max-w-[17rem] justify-self-center md:w-[17rem]",
                    // An odd last phone on two columns sits centred under the pair.
                    mobile.length >= 3 &&
                      i === mobile.length - 1 &&
                      mobile.length % 2 === 1 &&
                      "col-span-2 max-w-[calc(50%-0.625rem)] md:max-w-[17rem]",
                  )}
                >
                  <figure className="overflow-hidden rounded-[1.75rem] border-[5px] border-ink bg-ink shadow-[0_18px_40px_-24px_rgba(21,21,21,0.55)]">
                    <Image
                      src={m.src}
                      alt={tr(m.alt, locale)}
                      width={m.width}
                      height={m.height}
                      sizes="(min-width: 768px) 17rem, 45vw"
                      className="h-auto w-full"
                    />
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </CaseBlock>
  );
}
