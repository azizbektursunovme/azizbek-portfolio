import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { locales, resolveLocale } from "@/i18n/dictionaries";
import { profile } from "@/data/profile";
import { tr } from "@/lib/localize";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = `${profile.name} — ${profile.title}`;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default async function Image(props: { params: Promise<{ lang: string }> }) {
  const { lang } = await props.params;
  const locale = resolveLocale(lang);
  return renderOg({
    eyebrow: profile.title,
    title: profile.name,
    titleSize: 132,
    body: tr(profile.tagline, locale),
    footer: "Tashkent, Uzbekistan",
  });
}
