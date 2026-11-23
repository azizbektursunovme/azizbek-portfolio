import { ArrowUp, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import { navItems, shellCopy } from "@/data/nav";
import { profile } from "@/data/profile";
import type { Locale } from "@/data/types";
import { tr } from "@/lib/localize";

const YEAR = 2026;

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="mb-4 font-mono text-label text-muted-inverse">{children}</h2>;
}

export default function Footer({ lang }: { lang: Locale }) {
  // Only render socials that exist (LinkedIn is empty until the owner supplies it).
  const socials = [
    { label: "Telegram", href: profile.telegram },
    { label: "Instagram", href: profile.instagram },
    { label: "LinkedIn", href: profile.linkedin },
  ].filter((s) => s.href.trim() !== "");

  const linkClass =
    "inline-flex items-center gap-1.5 text-on-inverse/90 underline-offset-4 transition-colors hover:text-on-inverse hover:underline";

  return (
    // Inverse panel: an ink slab on the light page, an elevated dark surface under a hairline on the dark page.
    <footer id="site-footer" data-surface="ink" className="bg-surface-inverse text-on-inverse dark:border-t dark:border-rule">
      <Container className="pb-8 pt-14 md:pt-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-3">
            <ColumnTitle>{tr(shellCopy.elsewhere, lang)}</ColumnTitle>
            <ul className="space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {s.label}
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-muted-inverse" strokeWidth={1.8} />
                    <span className="sr-only">{tr(shellCopy.newTab, lang)}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${profile.email}`} className={linkClass}>
                  {tr(shellCopy.email, lang)}
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <ColumnTitle>{tr(shellCopy.sections, lang)}</ColumnTitle>
            <ul className="space-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a href={`/${lang}${item.href}`} className={linkClass}>
                    {tr(item.label, lang)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-6 lg:justify-self-end lg:text-right">
            <ColumnTitle>{tr(profile.jobTitle, lang)}</ColumnTitle>
            <p className="text-on-inverse/90">{tr(profile.status, lang)}</p>
            <p className="mt-2.5 inline-flex items-center gap-2 text-on-inverse/90 lg:justify-end">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-green-inverse" />
              {tr(profile.openTo, lang)}
            </p>
            <p className="mt-6">
              <a
                href={profile.cvPath}
                download
                className="inline-flex h-11 items-center gap-2 rounded-full border border-on-inverse/25 px-5 text-[0.9375rem] font-medium text-on-inverse transition-colors hover:border-on-inverse hover:bg-on-inverse hover:text-surface-inverse"
              >
                {tr(shellCopy.downloadCv, lang)}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between gap-4 border-t border-rule-inverse pt-6 font-mono text-label text-muted-inverse">
          <p>© {YEAR} {profile.name}</p>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-on-inverse">
            {tr(shellCopy.backToTop, lang)}
            <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.8} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
