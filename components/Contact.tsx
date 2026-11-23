import { ArrowUpRight } from "lucide-react";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import CopyEmail from "@/components/CopyEmail";
import { contactCopy as copy } from "@/data/about";
import { profile } from "@/data/profile";
import type { Locale } from "@/data/types";
import { tr } from "@/lib/localize";

/*
 * Contact at #contact. This section owns the page's one big email CTA (the
 * footer below it is slim, with no second copy). Socials with an empty URL
 * (LinkedIn today) are not rendered.
 */
export default function Contact({ locale }: { locale: Locale }) {
  const socials = [
    { label: "Telegram", href: profile.telegram },
    { label: "Instagram", href: profile.instagram },
    { label: "LinkedIn", href: profile.linkedin },
  ].filter((s) => s.href.trim() !== "");

  return (
    <Section id="contact" eyebrow={tr(copy.eyebrow, locale)} title={tr(copy.title, locale)} intro={<p>{tr(copy.intro, locale)}</p>}>
      <Reveal>
        <a
          href={`mailto:${profile.email}`}
          className="group inline-block font-serif text-[clamp(1.5rem,0.7rem+4.4vw,4.75rem)] leading-[1.05] tracking-[-0.015em] [overflow-wrap:anywhere]"
        >
          <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:100%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size,color] duration-500 ease-out-quint group-hover:bg-[length:0%_1px] group-hover:text-accent-ink">
            {profile.email}
          </span>
        </a>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
          <CopyEmail email={profile.email} label={tr(copy.copyEmail, locale)} copiedLabel={tr(copy.copied, locale)} />
          <Button href={profile.cvPath} variant="ghost" download>
            {tr(copy.downloadCv, locale)}
          </Button>
        </div>
      </Reveal>

      <Reveal className="mt-16 grid gap-12 border-t border-rule pt-12 md:mt-20 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-7">
          <h3 className="font-mono text-label text-muted">{tr(copy.helpTitle, locale)}</h3>
          <ul role="list" className="mt-4 divide-y divide-rule border-y border-rule">
            {tr(copy.help, locale).map((h) => (
              <li key={h} className="py-4 text-lead">
                {h}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-5">
          <h3 className="font-mono text-label text-muted">{tr(copy.elsewhere, locale)}</h3>
          <ul role="list" className="mt-4 divide-y divide-rule border-y border-rule">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/social flex items-center justify-between gap-4 py-4 text-lead transition-colors hover:text-accent-ink"
                >
                  {s.label}
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-5 w-5 transition-transform duration-200 ease-out-quint group-hover/social:-translate-y-0.5 group-hover/social:translate-x-0.5"
                    strokeWidth={1.6}
                  />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
