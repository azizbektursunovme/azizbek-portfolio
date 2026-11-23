import { locales } from "@/i18n/dictionaries";
import type { Locale } from "@/data/types";

export const SITE_URL = "https://azizbektursunov.uz";

/** hreflang map for a path that exists under every locale ("" = home), plus x-default -> English. */
export function languageAlternates(path = ""): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of locales) map[l] = `${SITE_URL}/${l}${path}`;
  map["x-default"] = `${SITE_URL}/en${path}`;
  return map;
}

export const ogLocale: Record<Locale, string> = { en: "en_US", ru: "ru_RU", uz: "uz_UZ" };
