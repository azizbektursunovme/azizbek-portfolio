import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { MarginLabel } from "@/components/case/CaseBlock";
import { projects } from "@/data/projects";
import { caseCopy as copy } from "@/data/sections";
import type { Locale } from "@/data/types";
import { tr } from "@/lib/localize";

/**
 * The 404 body: what happened, the way home, and the case studies (most
 * misses are old shared links to a project). No hooks, so both the
 * localized not-found and the root one can render it.
 */
export default function NotFoundView({ locale }: { locale: Locale }) {
  const cases = projects.filter((p) => p.caseStudy);

  return (
    <Container className="pb-24 pt-14 md:pb-32 md:pt-24">
      <div className="grid gap-y-6 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-3 lg:pt-5">
          <MarginLabel>404</MarginLabel>
        </div>
        <div className="lg:col-span-9">
          <h1 className="max-w-[16ch] text-balance font-serif text-display text-ink">{tr(copy.notFoundTitle, locale)}</h1>
          <p className="mt-6 max-w-prose text-pretty text-lead text-muted">{tr(copy.notFoundBody, locale)}</p>
          <div className="mt-8">
            <Button href={`/${locale}`} variant="primary">
              {tr(copy.notFoundHome, locale)}
            </Button>
          </div>

          <h2 className="mt-16 font-mono text-label text-muted md:mt-20">{tr(copy.notFoundCases, locale)}</h2>
          <ul role="list" className="mt-3 border-b border-rule">
            {cases.map((p) => (
              <li key={p.slug} className="border-t border-rule">
                <Link
                  href={`/${locale}/work/${p.slug}`}
                  className="flex min-h-14 items-baseline justify-between gap-6 py-3 font-serif text-[1.5rem]/[1.15] text-ink decoration-1 underline-offset-[0.14em] hover:underline"
                >
                  {p.title}
                  <span className="shrink-0 font-sans text-[0.9375rem] text-muted">{p.year}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
