import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { resolveLocale } from "@/i18n/dictionaries";
import { getProject } from "@/data/projects";
import { profile } from "@/data/profile";
import { caseCopy } from "@/data/sections";
import { projectTitle, tr } from "@/lib/localize";

type Params = { lang: string; slug: string };

const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

/* Per-locale alt text (see app/[lang]/opengraph-image.tsx); served at /{lang}/work/{slug}/opengraph-image/card. */
export function generateImageMetadata({ params }: { params: Params }) {
  const locale = resolveLocale(params.lang);
  const project = getProject(params.slug);
  const label = tr(caseCopy.caseStudy, locale);
  return [
    {
      id: "card",
      alt: project ? `${label}: ${projectTitle(project, locale)} — ${profile.name}` : label,
      size: ogSize,
      contentType: ogContentType,
    },
  ];
}

export default async function Image(props: { params: Params | Promise<Params> }) {
  const { lang, slug } = await props.params;
  const locale = resolveLocale(lang);
  const project = getProject(slug);
  const title = project ? projectTitle(project, locale) : profile.name;
  return renderOg({
    eyebrow: `${tr(caseCopy.caseStudy, locale)} · ${profile.name}`,
    title,
    // Longer (translated) titles step down so title, summary and footer stay on the card.
    titleSize: title.length <= 18 ? 132 : title.length <= 44 ? 104 : title.length <= 56 ? 84 : 72,
    body: project ? clip(tr(project.summary, locale), 130) : tr(profile.tagline, locale),
    footer: tr(profile.jobTitle, locale),
  });
}
