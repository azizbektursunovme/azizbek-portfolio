export const locales = ["en", "ru", "uz"] as const;
export type Locale = (typeof locales)[number];

export const resolveLocale = (locale: string): Locale => {
  return locales.includes(locale as Locale) ? (locale as Locale) : "en";
};
