import type { Localized } from "./types";

/** UI strings for the About and Contact sections. Content itself lives in profile.ts and experience.ts. */
export const aboutCopy = {
  eyebrow: { en: "About", ru: "Обо мне", uz: "Men haqimda" } as Localized,
  title: {
    en: "Frontend developer and brand designer, based in Tashkent.",
    ru: "Frontend-разработчик и бренд-дизайнер из Ташкента.",
    uz: "Toshkentlik frontend dasturchi va brend dizayner.",
  } as Localized,
  experience: { en: "Experience", ru: "Опыт", uz: "Tajriba" } as Localized,
  tools: { en: "Tools", ru: "Инструменты", uz: "Vositalar" } as Localized,
  education: { en: "Education", ru: "Образование", uz: "Ta’lim" } as Localized,
  languages: { en: "Languages", ru: "Языки", uz: "Tillar" } as Localized,
  toolGroups: {
    Dev: { en: "Dev", ru: "Разработка", uz: "Dasturlash" },
    Design: { en: "Design", ru: "Дизайн", uz: "Dizayn" },
    "Growth & AI": { en: "Growth & AI", ru: "Реклама и ИИ", uz: "Reklama va AI" },
  } as Record<"Dev" | "Design" | "Growth & AI", Localized>,
  /** Replaces "Present"/"present" in year ranges ("2026 – Present"). */
  present: { en: "Present", ru: "наст. время", uz: "hozirgacha" } as Localized,
  /**
   * Plain strings in profile.ts and experience.ts that the CV keeps in English
   * but the site shows per locale. Anything not listed renders as-is (names).
   */
  terms: {
    "Freelance & startups": { en: "Freelance & startups", ru: "Фриланс и стартапы", uz: "Frilans va startaplar" },
    "PDPU Proctor & Volunteer": {
      en: "PDPU Proctor & Volunteer",
      ru: "Проктор и волонтёр PDPU",
      uz: "PDPU proktori va koʻngillisi",
    },
    Uzbek: { en: "Uzbek", ru: "Узбекский", uz: "Oʻzbek tili" },
    English: { en: "English", ru: "Английский", uz: "Ingliz tili" },
    Russian: { en: "Russian", ru: "Русский", uz: "Rus tili" },
    "C2 (native)": { en: "C2 (native)", ru: "C2 (родной)", uz: "C2 (ona tili)" },
  } as Record<string, Localized>,
};

export const contactCopy = {
  eyebrow: { en: "Contact", ru: "Контакты", uz: "Aloqa" } as Localized,
  title: {
    en: "Let's talk about your next project.",
    ru: "Давайте обсудим ваш следующий проект.",
    uz: "Keyingi loyihangizni muhokama qilaylik.",
  } as Localized,
  intro: {
    en: "A website, a brand or a campaign. Write to me and I will reply.",
    ru: "Сайт, бренд или рекламная кампания — напишите мне, и я отвечу.",
    uz: "Sayt, brend yoki reklama kampaniyasi — menga yozing, javob beraman.",
  } as Localized,
  copyEmail: { en: "Copy email", ru: "Скопировать почту", uz: "Pochtani nusxalash" } as Localized,
  copied: { en: "Copied", ru: "Скопировано", uz: "Nusxalandi" } as Localized,
  helpTitle: { en: "What I can help with", ru: "Чем я могу помочь", uz: "Nimada yordam bera olaman" } as Localized,
  help: {
    en: [
      "Websites built from zero, in Next.js and React.",
      "Brand identities: logo, colour, type and the kit around them.",
      "Ad creatives and Meta lead campaigns, with AI video.",
    ],
    ru: [
      "Сайты с нуля на Next.js и React.",
      "Фирменный стиль: логотип, цвета, шрифты и всё, что к ним прилагается.",
      "Рекламные креативы, лид-кампании в Meta и ИИ-видео.",
    ],
    uz: [
      "Next.js va React asosida noldan yaratilgan saytlar.",
      "Brend uslubi: logotip, ranglar, shriftlar va ular atrofidagi toʻliq toʻplam.",
      "Reklama kreativlari, Meta lid kampaniyalari va AI videolar.",
    ],
  } as Localized<string[]>,
  elsewhere: { en: "Find me on", ru: "Я в соцсетях", uz: "Ijtimoiy tarmoqlarda" } as Localized,
  downloadCv: { en: "Download CV", ru: "Скачать резюме", uz: "Rezyumeni yuklab olish" } as Localized,
};
