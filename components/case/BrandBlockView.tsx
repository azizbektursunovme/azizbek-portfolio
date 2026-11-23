import Image from "next/image";
import { ArrowDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { CaseBlock, SubHeading } from "@/components/case/CaseBlock";
import { caseCopy as copy } from "@/data/sections";
import type { BrandBlock, Locale, Media } from "@/data/types";
import { tr } from "@/lib/localize";
import { cn } from "@/lib/cn";

/*
 * Brand kit block: logos on grounds where they are visible, the palette as
 * swatches with hex values, the type pairing, the kit in use, and the guide
 * PDF when there is one. `skip` holds image sources already shown higher up
 * the page (the cover, ad creatives), so nothing appears twice.
 */

/**
 * Logos drawn in light inks for a dark ground. Everything else sits on the
 * brand's lightest colour. Keyed by file so a new logo defaults to light.
 */
const DARK_GROUND = new Set([
  "/work/jjr-transportation/logo-primary.svg",
  "/work/jjr-transportation/logo-symbol.svg",
  "/work/fragrise/lockup-dark.svg",
  "/work/fragrise/mark.svg",
]);

// WCAG 2 relative luminance and contrast.
function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(full.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
function contrast(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}
const INK = "#151515";
const WHITE = "#FFFFFF";
/** Ink or white, whichever reads better on the swatch. Both clear 4.5:1 on every palette colour in the data. */
export function labelColour(hex: string): string {
  return contrast(hex, INK) >= contrast(hex, WHITE) ? INK : WHITE;
}

function Logo({ media, ground, locale }: { media: Media; ground: string; locale: Locale }) {
  const wide = media.width / media.height > 2.2;
  const lightGround = luminance(ground) > 0.8;
  return (
    <figure className="min-w-0">
      <div
        data-testid="brand-logo-stage"
        className={cn(
          "flex aspect-[16/10] items-center justify-center overflow-hidden rounded-tile",
          lightGround && "ring-1 ring-inset ring-ink/10",
        )}
        style={{ backgroundColor: ground }}
      >
        {/* Plain <img>: SVG logos keep their own intrinsic size. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={media.src}
          alt={tr(media.alt, locale)}
          width={media.width}
          height={media.height}
          loading="lazy"
          decoding="async"
          className={cn("h-auto w-auto object-contain", wide ? "max-h-[40%] max-w-[72%]" : "max-h-[58%] max-w-[58%]")}
        />
      </div>
      <figcaption className="mt-2.5 text-[0.8125rem]/snug text-muted">{tr(media.alt, locale)}</figcaption>
    </figure>
  );
}

/** Group images into rows whose summed aspect ratio stays under `max`, so each row is one even height. */
function justify(items: Media[], max = 3.5): Media[][] {
  const rows: Media[][] = [];
  let row: Media[] = [];
  let sum = 0;
  for (const m of items) {
    const ar = m.width / m.height;
    if (row.length > 0 && sum + ar > max) {
      rows.push(row);
      row = [];
      sum = 0;
    }
    row.push(m);
    sum += ar;
  }
  if (row.length > 0) rows.push(row);
  return rows;
}

export default function BrandBlockView({ brand, locale, skip }: { brand: BrandBlock; locale: Locale; skip: Set<string> }) {
  const byLight = [...brand.palette].sort((a, b) => luminance(a.hex) - luminance(b.hex));
  const darkGround = byLight[0]?.hex ?? INK;
  const lightGround = byLight[byLight.length - 1]?.hex ?? WHITE;
  const applications = brand.applications.filter((m) => !skip.has(m.src));
  const rows = justify(applications);

  return (
    <CaseBlock id="brand" label={tr(copy.brandBlock, locale)} title={tr(brand.type.length > 0 ? copy.brandTitle : copy.brandTitleNoType, locale)}>
      <div className="space-y-14 md:space-y-20">
        {brand.logos.length > 0 ? (
          <div>
            <SubHeading>{tr(copy.logos, locale)}</SubHeading>
            <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 sm:gap-y-8 md:gap-x-8">
              {brand.logos.map((m) => (
                <Logo key={m.src} media={m} ground={DARK_GROUND.has(m.src) ? darkGround : lightGround} locale={locale} />
              ))}
            </div>
          </div>
        ) : null}

        {brand.palette.length > 0 ? (
          <div>
            <SubHeading>{tr(copy.palette, locale)}</SubHeading>
            <ul
              role="list"
              data-testid="palette"
              className="mt-6 flex flex-col overflow-hidden rounded-tile ring-1 ring-inset ring-ink/10 md:h-64 md:flex-row"
            >
              {brand.palette.map((c) => (
                <li
                  key={c.hex}
                  className="flex min-h-20 flex-1 items-end justify-between gap-4 px-4 py-3.5 md:flex-col md:items-start md:justify-end md:px-5 md:py-5"
                  style={{ backgroundColor: c.hex, color: labelColour(c.hex) }}
                >
                  <span className="text-[0.9375rem] font-medium leading-tight">{c.name}</span>
                  <span className="font-mono text-label uppercase">{c.hex}</span>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {brand.type.length > 0 ? (
          <div className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-10">
            <div className="lg:col-span-3">
              <SubHeading>{tr(copy.type, locale)}</SubHeading>
            </div>
            <dl className="border-b border-rule lg:col-span-9">
              {brand.type.map((t) => (
                <div key={t.name} className="flex flex-col gap-1 border-t border-rule py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <dt className="text-[clamp(1.375rem,1.2rem+0.8vw,1.875rem)] font-medium leading-tight tracking-[-0.01em] text-ink">
                    {t.name}
                  </dt>
                  <dd className="text-[0.9375rem] text-muted sm:text-right">{tr(t.role, locale)}</dd>
                </div>
              ))}
            </dl>
          </div>
        ) : null}

        {rows.length > 0 ? (
          <div>
            <SubHeading>{tr(copy.applications, locale)}</SubHeading>
            <div className="mt-6 space-y-6 md:space-y-8">
              {rows.map((row) => (
                <div key={row.map((m) => m.src).join("|")} className="flex flex-col gap-6 md:flex-row md:gap-8">
                  {row.map((m) => (
                    <figure
                      key={m.src}
                      className="relative min-w-0 overflow-hidden rounded-tile bg-paper-deep after:pointer-events-none after:absolute after:inset-0 after:rounded-tile after:ring-1 after:ring-inset after:ring-ink/10 md:basis-0"
                      style={{ flexGrow: m.width / m.height }}
                    >
                      <Image
                        src={m.src}
                        alt={tr(m.alt, locale)}
                        width={m.width}
                        height={m.height}
                        sizes={row.length > 1 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1248px) 1168px, 100vw"}
                        className="h-auto w-full"
                      />
                    </figure>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {brand.guidePdf ? (
          <div className="flex flex-col gap-4 border-t border-rule pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-prose text-muted">{tr(copy.guideNote, locale)}</p>
            <Button href={brand.guidePdf} variant="primary" download icon={<ArrowDown className="h-4 w-4" strokeWidth={1.8} />}>
              {tr(copy.downloadGuide, locale)}
            </Button>
          </div>
        ) : null}
      </div>
    </CaseBlock>
  );
}
