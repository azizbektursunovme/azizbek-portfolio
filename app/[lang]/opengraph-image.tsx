import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { resolveLocale } from "@/i18n/dictionaries";
import { profile } from "@/data/profile";
import { seo } from "@/data/seo";
import { tr } from "@/lib/localize";

/*
 * One card per locale. generateImageMetadata (rather than a static `alt`
 * export) so the og:image:alt text is in the page's language; it serves the
 * card at /{lang}/opengraph-image/card.
 */
export function generateImageMetadata({ params }: { params: { lang: string } }) {
  const locale = resolveLocale(params.lang);
  return [
    {
      id: "card",
      alt: `${profile.name} — ${tr(profile.jobTitle, locale)}`,
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export default async function Image(props: { params: { lang: string } | Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const locale = resolveLocale(lang);
  return renderOg({
    eyebrow: tr(profile.jobTitle, locale),
    title: profile.name,
    titleSize: 132,
    body: tr(profile.tagline, locale),
    footer: tr(seo.location, locale),
  });
}
