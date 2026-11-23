import type { MetadataRoute } from "next";
import { locales } from "@/i18n/dictionaries";
import { projects } from "@/data/projects";
import { SITE_URL, languageAlternates } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["", ...projects.filter((p) => p.caseStudy).map((p) => `/work/${p.slug}`)];
  return paths.flatMap((path) =>
    locales.map((l) => ({
      url: `${SITE_URL}/${l}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: { languages: languageAlternates(path) },
    })),
  );
}
