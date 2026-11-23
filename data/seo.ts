import type { Localized } from "./types";

/*
 * Per-locale SEO copy. RU/UZ fall back to English until the translation task
 * (Task 16) fills them in; the structure is already Localized so that task
 * only adds values here.
 */
export const seo: { description: Localized; keywords: Localized<string[]> } = {
  description: {
    en: "Frontend Developer & Brand Designer in Tashkent. Websites, brand identities, and the ads that sell them. Open to freelance.",
  },
  keywords: {
    en: [
      "Azizbek Tursunov",
      "frontend developer",
      "brand designer",
      "web developer Tashkent",
      "brand identity",
      "Next.js developer",
      "Meta ads creatives",
      "freelance designer Uzbekistan",
      "portfolio",
    ],
  },
};
