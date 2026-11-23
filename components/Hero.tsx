import { Fragment, type CSSProperties } from "react";
import { ArrowDown } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { profile } from "@/data/profile";
import { heroCopy } from "@/data/hero";
import { shellCopy } from "@/data/nav";
import type { Locale } from "@/data/types";
import { tr } from "@/lib/localize";
import { cn } from "@/lib/cn";

/*
 * Home hero: the first page of the ledger.
 *
 * Server component, no client JS. The single load moment is CSS-only
 * (`motion-safe:animate-hero-*`, keyframes in app/globals.css): the name
 * rises out of its baseline, the ledger rule draws, the rest settles in.
 * Without JS the CSS still runs and ends fully visible; under reduced
 * motion nothing animates at all.
 */

/** Optical sizes: each mark gets a height that makes it read at the same weight as its neighbours. */
const markHeight: Record<string, string> = {
  "JJR Transportation": "h-[0.8rem] sm:h-[1.05rem]",
  "DAVR GROUP": "h-8 sm:h-9",
  "Good Idea Cargo": "h-10 sm:h-11",
  Fragrise: "h-[1.375rem] sm:h-6",
  "GFS Group": "h-8 sm:h-[2.125rem]",
};

const delay = (ms: number): CSSProperties => ({ animationDelay: `${ms}ms` });

export default function Hero({ locale }: { locale: Locale }) {
  const nameWords = profile.name.split(" ");
  const [role, craft] = profile.title.split(" & ");
  const labelId = "hero-marks-label";

  return (
    <section
      id="intro"
      data-testid="hero"
      aria-labelledby="hero-title"
      className="relative flex min-h-[calc(100svh-4rem)] flex-col md:min-h-[min(calc(100svh-4.5rem),62rem)]"
    >
      <Container className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col justify-center pb-10 pt-8 md:pb-14 md:pt-12">
          {/* The name, set to the measure: one line on desktop, two staggered lines on phones. */}
          <h1
            id="hero-title"
            className="flex flex-wrap justify-between font-serif text-[clamp(4.5rem,24.5vw,7.5rem)] leading-[0.86] tracking-[-0.028em] text-ink sm:block sm:text-[min(calc((100vw-3rem)/5.7),13rem)] lg:text-[min(calc((100vw-5rem)/5.7),13rem)]"
          >
            {nameWords.map((word, i) => (
              <Fragment key={word}>
                {i > 0 ? " " : null}
                <span className="inline-block overflow-hidden pb-[0.06em] pt-[0.04em] align-bottom last:ml-auto sm:last:ml-0">
                  <span className="inline-block motion-safe:animate-hero-rise" style={delay(80 + i * 90)}>
                    {word}
                  </span>
                </span>
              </Fragment>
            ))}
          </h1>

          <div
            aria-hidden="true"
            className="mt-6 h-px origin-left bg-ink motion-safe:animate-hero-rule md:mt-8"
            style={delay(260)}
          />

          <div className="mt-7 grid gap-y-8 md:mt-9 lg:grid-cols-12 lg:items-end lg:gap-x-10">
            <div className="motion-safe:animate-hero-fade lg:col-span-7" style={delay(420)}>
              <p className="font-serif text-[clamp(2.125rem,1.6rem+2.1vw,3.5rem)] leading-[1.02] tracking-[-0.012em] text-ink">
                {craft ? (
                  <>
                    <span className="block">{role}</span>{" "}
                    <span className="block">
                      <span className="italic text-accent">&amp;</span> {craft}
                    </span>
                  </>
                ) : (
                  profile.title
                )}
              </p>
              <p className="mt-4 max-w-[40ch] text-pretty text-lead text-muted md:mt-5">{tr(profile.tagline, locale)}</p>
            </div>

            <div
              className="motion-safe:animate-hero-fade lg:col-span-5 lg:justify-self-end"
              style={delay(520)}
            >
              <p className="flex items-center gap-2.5 text-[0.9375rem] font-medium leading-snug text-green">
                <span aria-hidden="true" className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inset-0 rounded-full bg-green/40 motion-safe:animate-ping" />
                  <span className="relative h-2 w-2 rounded-full bg-green" />
                </span>
                {tr(profile.openTo, locale)}
              </p>
              <p className="mt-1.5 pl-[1.125rem] text-[0.9375rem] leading-snug text-muted">{tr(profile.status, locale)}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href="#work" variant="primary">
                  {tr(heroCopy.seeWork, locale)}
                </Button>
                <Button
                  href={profile.cvPath}
                  variant="ghost"
                  download
                  icon={<ArrowDown className="h-4 w-4" strokeWidth={1.8} />}
                >
                  {tr(shellCopy.downloadCv, locale)}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Client marks: the ledger's bottom line. */}
        <div
          className="grid gap-y-5 border-t border-rule py-6 motion-safe:animate-hero-fade md:py-7 lg:grid-cols-12 lg:items-center lg:gap-x-10"
          style={delay(680)}
        >
          <p
            id={labelId}
            className="flex items-center gap-2 font-mono text-label text-muted before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent lg:col-span-3"
          >
            {tr(heroCopy.marksLabel, locale)}
          </p>
          <ul
            role="list"
            aria-labelledby={labelId}
            className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 sm:gap-x-8 lg:col-span-9"
          >
            {profile.clientMarks.map((mark) => (
              <li
                key={mark.name}
                data-testid="client-mark"
                className="flex h-11 items-center"
              >
                {mark.src ? (
                  // Plain <img>: tiny monochrome marks, intrinsic size set so nothing shifts.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={mark.src}
                    alt={mark.name}
                    width={mark.width}
                    height={mark.height}
                    loading="eager"
                    decoding="async"
                    className={cn("w-auto max-w-full", markHeight[mark.name] ?? "h-8")}
                  />
                ) : (
                  <span className="font-sans text-[1.75rem] font-black leading-none tracking-[-0.06em] text-ink">
                    {mark.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
