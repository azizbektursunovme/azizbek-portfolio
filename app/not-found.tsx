import type { Metadata } from "next";
import Link from "next/link";
import { fontVariables } from "@/app/fonts";
import Container from "@/components/ui/Container";
import NotFoundView from "@/components/NotFoundView";
import { profile } from "@/data/profile";

/*
 * 404 for paths outside the three locales (/anything, /favicon.ico ...).
 * The root layout only passes children through, so this page brings its
 * own <html> and <body>. English, since there is no locale to go on.
 */
export const metadata: Metadata = { title: `Page not found — ${profile.name}` };

export default function RootNotFound() {
  return (
    <html lang="en" className={fontVariables}>
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
