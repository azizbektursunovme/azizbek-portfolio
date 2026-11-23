"use client";

import { usePathname } from "next/navigation";
import NotFoundView from "@/components/NotFoundView";
import type { Locale } from "@/data/types";

/*
 * 404 inside the site shell (header and footer come from app/[lang]/layout).
 * not-found receives no params, so the locale is read from the URL.
 */
export default function NotFound() {
  const first = (usePathname() ?? "/en").split("/")[1];
  // Inline check: importing i18n/dictionaries here would pull the JSON loaders into the client bundle.
  const locale: Locale = first === "ru" || first === "uz" ? first : "en";
  return <NotFoundView locale={locale} />;
}
