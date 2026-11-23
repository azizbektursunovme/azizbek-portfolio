import { renderOg, ogSize, ogContentType } from "@/lib/og";
import { locales, resolveLocale } from "@/i18n/dictionaries";
import { getProject, projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { tr } from "@/lib/localize";

export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Case study";
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) => projects.filter((p) => p.caseStudy).map((p) => ({ lang, slug: p.slug })));
}

const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1).trimEnd()}…` : s);

export default async function Image(props: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await props.params;
  const locale = resolveLocale(lang);
  const project = getProject(slug);
  const title = project?.title ?? profile.name;
  return renderOg({
    eyebrow: `Case study · ${profile.name}`,
    title,
    titleSize: title.length > 18 ? 104 : 132,
    body: project ? clip(tr(project.summary, locale), 130) : tr(profile.tagline, locale),
    footer: profile.title,
  });
}
