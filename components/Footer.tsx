import { ArrowUp, ArrowUpRight } from "lucide-react";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
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
    "inline-flex items-center gap-1.5 text-paper/90 underline-offset-4 transition-colors hover:text-paper hover:underline";

  return (
    <footer className="bg-ink text-paper">
      <Container className="pb-8 pt-20 md:pt-28">
        <Reveal>
          <p className="max-w-[44ch] text-lead text-muted-inverse">{tr(shellCopy.footerPrompt, lang)}</p>
          <a
            href={`mailto:${profile.email}`}
            className="group mt-4 inline-block font-serif text-[clamp(1.6rem,0.75rem+4.6vw,5.5rem)] leading-[1.05] tracking-[-0.015em] text-paper [overflow-wrap:anywhere]"
          >
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size,color] duration-500 ease-out-quint group-hover:bg-[length:100%_1px] group-hover:text-accent-inverse">
              {profile.email}
            </span>
          </a>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-rule-inverse pt-10 md:mt-24 lg:grid-cols-12 lg:gap-x-10">
          <div className="lg:col-span-3">
            <ColumnTitle>{tr(shellCopy.elsewhere, lang)}</ColumnTitle>
            <ul className="space-y-2.5">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {s.label}
                    <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5 text-muted-inverse" strokeWidth={1.8} />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${profile.email}`} className={linkClass}>
                  Email
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
            <ColumnTitle>{profile.title}</ColumnTitle>
            <p className="text-paper/90">{tr(profile.status, lang)}</p>
            <p className="mt-2.5 inline-flex items-center gap-2 text-paper/90 lg:justify-end">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-green-inverse" />
              {tr(profile.openTo, lang)}
            </p>
            <p className="mt-6">
              <a
                href={profile.cvPath}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-paper/25 px-5 text-[0.9375rem] font-medium text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ink"
              >
                {tr(shellCopy.downloadCv, lang)}
              </a>
            </p>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between gap-4 border-t border-rule-inverse pt-6 font-mono text-label text-muted-inverse">
          <p>© {YEAR} {profile.name}</p>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-paper">
            {tr(shellCopy.backToTop, lang)}
            <ArrowUp aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={1.8} />
          </a>
        </div>
      </Container>
    </footer>
  );
}
