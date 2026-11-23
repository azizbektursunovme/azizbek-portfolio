import type { NextConfig } from "next";

/**
 * Old /{lang}/projects/<id> URLs from the previous site. CleanPro has a case
 * page now; everything else was graphic design that lives in the
 * "Earlier work" archive inside Ads & Content.
 */
const LEGACY_CASES: Record<string, string> = {
  "cleanpro-branding": "/work/cleanpro",
};
const LEGACY_ARCHIVE = [
  "kofemator-post",
  "organic-product-flyer",
  "iqtidor-academy",
  "school-banner",
  "social-media-design",
  "advertising-banners",
  "personal-projects",
];
const LANG = ":lang(en|ru|uz)";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Ideal for simple exports and static serving
  },
  async redirects() {
    return [
      // A language code we don't have (/de, /de/anything, /fr-CA) goes to the English site.
      // /cv is the CV page (app/cv), not a language.
      {
        source: "/:lang((?!(?:en|ru|uz|cv)(?:/|$))[a-zA-Z]{2}(?:-[a-zA-Z]{2,4})?)/:rest*",
        destination: "/en",
        permanent: false,
      },
      ...Object.entries(LEGACY_CASES).map(([id, path]) => ({
        source: `/${LANG}/projects/${id}`,
        destination: `/:lang${path}`,
        permanent: true,
      })),
      ...LEGACY_ARCHIVE.map((id) => ({
        source: `/${LANG}/projects/${id}`,
        destination: "/:lang#ads",
        permanent: true,
      })),
    ];
  },
};

export default nextConfig;
