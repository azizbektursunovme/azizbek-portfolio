import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { fontVariables } from "@/app/fonts";
import Container from "@/components/ui/Container";
import NotFoundView from "@/components/NotFoundView";
import { profile } from "@/data/profile";
import { DEFAULT_THEME, THEME_COLOR, THEME_SCRIPT } from "@/lib/theme";

/*
 * 404 for paths outside the three locales (/anything, /favicon.ico ...).
 * The root layout only passes children through, so this page brings its
 * own <html> and <body>. English, since there is no locale to go on.
 */
export const metadata: Metadata = { title: `Page not found — ${profile.name}` };
export const viewport: Viewport = { themeColor: THEME_COLOR[DEFAULT_THEME] };

export default function RootNotFound() {
  return (
    // Same theme treatment as app/[lang]/layout: dark by default, a stored light choice applied before paint.
    <html lang="en" className={fontVariables} data-theme={DEFAULT_THEME} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }} />
      </head>
      <body className="bg-paper font-sans text-ink">
        <header className="border-b border-rule">
          <Container className="flex h-16 items-center">
            <Link href="/en" className="font-serif text-[1.375rem] leading-none text-ink">
              {profile.name}
            </Link>
          </Container>
        </header>
        <main id="main">
          <NotFoundView locale="en" />
        </main>
      </body>
    </html>
  );
}
