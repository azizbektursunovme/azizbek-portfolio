import { notFound } from "next/navigation";

/** Any other path under a locale renders the styled 404 (app/[lang]/not-found.tsx) inside the site shell. */
export default function CatchAll() {
  notFound();
}
