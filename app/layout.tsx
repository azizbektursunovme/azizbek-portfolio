/*
 * Pass-through root: app/[lang]/layout.tsx renders <html> per locale. The
 * stylesheet and fonts are imported here as well so pages outside a locale
 * (app/not-found.tsx) get them; Next only collects CSS from layouts there.
 */
import "@/app/globals.css";
import "@/app/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
