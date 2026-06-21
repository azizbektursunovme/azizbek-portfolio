const dictionaries = {
  en: () => import("./translations/en.json").then((module) => module.default),
  ru: () => import("./translations/ru.json").then((module) => module.default),
  uz: () => import("./translations/uz.json").then((module) => module.default),
};

export const locales = ["en", "ru", "uz"] as const;
export type Locale = (typeof locales)[number];

export const resolveLocale = (locale: string): Locale => {
  return locales.includes(locale as Locale) ? (locale as Locale) : "en";
};

export const getDictionary = async (locale: string) => {
  return dictionaries[resolveLocale(locale)]();
};
