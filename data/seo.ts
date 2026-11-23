import type { Localized } from "./types";

/* Per-locale SEO copy: meta description, keywords and the OG image footer line. */
export const seo: { description: Localized; keywords: Localized<string[]>; location: Localized } = {
  description: {
    en: "Frontend Developer & Brand Designer in Tashkent. Websites, brand identities, and the ads that sell them. Open to freelance.",
    ru: "Frontend-разработчик и бренд-дизайнер в Ташкенте. Сайты, фирменный стиль и реклама, которая их продаёт. Открыт для фриланса.",
    uz: "Toshkentdagi frontend dasturchi va brend dizayner. Saytlar, brend uslubi va ularni sotadigan reklama. Frilansga ochiqman.",
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
    ru: [
      "Азизбек Турсунов",
      "frontend-разработчик",
      "бренд-дизайнер",
      "веб-разработчик Ташкент",
      "фирменный стиль",
      "Next.js разработчик",
      "рекламные креативы Meta",
      "дизайнер на фрилансе Узбекистан",
      "портфолио",
    ],
    uz: [
      "Azizbek Tursunov",
      "frontend dasturchi",
      "brend dizayner",
      "veb-dasturchi Toshkent",
      "brend uslubi",
      "Next.js dasturchi",
      "Meta reklama kreativlari",
      "frilans dizayner Oʻzbekiston",
      "portfolio",
    ],
  },
  location: { en: "Tashkent, Uzbekistan", ru: "Ташкент, Узбекистан", uz: "Toshkent, Oʻzbekiston" },
};
