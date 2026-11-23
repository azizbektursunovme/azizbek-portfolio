import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Tag from "@/components/ui/Tag";
import { aboutCopy as copy } from "@/data/about";
import { experience } from "@/data/experience";
import { profile } from "@/data/profile";
import type { Locale } from "@/data/types";
import { tr } from "@/lib/localize";

/*
 * About at #about: bio, experience timeline (showOnSite entries only), tools
 * grouped Dev / Design / Growth & AI, education and languages. Everything is
 * read from profile.ts and experience.ts.
 */

function Label({ children }: { children: string }) {
  return <h3 className="font-mono text-label text-muted">{children}</h3>;
}

export default function About({ locale }: { locale: Locale }) {
  const timeline = experience.filter((e) => e.showOnSite);

  return (
    <Section id="about" eyebrow={tr(copy.eyebrow, locale)} title={tr(copy.title, locale)}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
        <Reveal className="space-y-5 lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          {tr(profile.bio, locale).map((p) => (
            <p key={p} className="max-w-prose text-lead">
              {p}
            </p>
          ))}
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 text-[0.9375rem] text-muted">
            <span>{tr(profile.status, locale)}</span>
            <span className="inline-flex items-center gap-2 text-ink">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-green" />
              {tr(profile.openTo, locale)}
            </span>
          </p>
        </Reveal>

        <Reveal className="lg:col-span-7">
          <Label>{tr(copy.experience, locale)}</Label>
          <ol role="list" className="mt-4 border-t border-ink">
            {timeline.map((e) => {
              const points = tr(e.points, locale);
              return (
                <li
                  key={`${e.company}-${e.years}`}
                  data-testid="xp-item"
                  className="grid gap-x-8 gap-y-1 border-b border-rule py-5 sm:grid-cols-[9.5rem_1fr]"
                >
                  <p className="font-mono text-label text-muted sm:pt-2">{e.years}</p>
                  <div className="min-w-0">
                    <h4 className="font-serif text-[1.625rem]/[1.15]">{e.company}</h4>
                    <p className="mt-1 text-[0.9375rem] text-muted">{tr(e.role, locale)}</p>
                    {points.length > 0 ? (
                      <ul role="list" className="mt-3 space-y-1.5 text-[0.9375rem]">
                        {points.map((pt) => (
                          <li key={pt} className="flex gap-2.5">
                            <span aria-hidden="true" className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-accent" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>

      <Reveal className="mt-16 grid gap-12 border-t border-rule pt-12 md:mt-20 lg:grid-cols-12 lg:gap-x-10">
        <div className="lg:col-span-5">
          <Label>{tr(copy.tools, locale)}</Label>
          <dl className="mt-4 space-y-5">
            {profile.tools.map((g) => (
              <div key={g.group}>
                <dt className="mb-2 text-[0.9375rem] font-medium">{tr(copy.toolGroups[g.group], locale)}</dt>
                <dd>
                  <ul role="list" className="flex flex-wrap gap-2">
                    {g.items.map((item) => (
                      <li key={item}>
                        <Tag className="text-ink">{item}</Tag>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="lg:col-span-4">
          <Label>{tr(copy.education, locale)}</Label>
          <ul role="list" className="mt-4 divide-y divide-rule border-y border-rule">
            {profile.education.map((e) => (
              <li key={e.school} className="py-4">
                <p className="font-medium">{e.school}</p>
                {e.detail ? <p className="mt-0.5 text-[0.9375rem] text-muted">{e.detail}</p> : null}
                <p className="mt-1 font-mono text-label text-muted">{e.years}</p>
                {e.roles?.map((r) => (
                  <p key={r.title} className="mt-3 text-[0.9375rem] text-muted">
                    {r.title} <span className="font-mono text-label">· {r.years}</span>
                  </p>
                ))}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <Label>{tr(copy.languages, locale)}</Label>
          <ul role="list" className="mt-4 divide-y divide-rule border-y border-rule">
            {profile.languages.map((l) => (
              <li key={l.name} className="flex items-baseline justify-between gap-4 py-4">
                <span className="font-medium">{l.name}</span>
                <span className="font-mono text-label text-muted">{l.level}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
