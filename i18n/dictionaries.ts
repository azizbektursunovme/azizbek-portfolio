const dictionaries = {
  en: () => import("./translations/en.json").then((module) => module.default),
  ru: () => import("./translations/ru.json").then((module) => module.default),
  uz: () => import("./translations/uz.json").then((module) => module.default),
};

export type Locale = "en" | "ru" | "uz";

export const getDictionary = async (locale: Locale) => {
  return dictionaries[locale] ? dictionaries[locale]() : dictionaries.en();
};
