import type { Locale, Localized } from "@/data/types";

/** Pick the locale's value, falling back to English when missing or empty. */
export function tr<T>(value: Localized<T>, locale: Locale): T {
  const v = value[locale];
  if (v === undefined || v === null || (v as unknown) === "") return value.en;
  return v;
}
