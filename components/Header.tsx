"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown } from "lucide-react";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { navItems, shellCopy } from "@/data/nav";
import { profile } from "@/data/profile";
import type { Locale } from "@/data/types";
import { tr } from "@/lib/localize";
import { cn } from "@/lib/cn";

const LOCALES: { code: Locale; name: string }[] = [
  { code: "en", name: "English" },
  { code: "ru", name: "Русский" },
  { code: "uz", name: "O‘zbekcha" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

/** Same path in another locale: /en/work/jjr → /ru/work/jjr. */
function localizedPath(pathname: string | null, target: Locale) {
  const segments = (pathname ?? "/").split("/");
  if (segments.length < 2 || segments[1] === "") return `/${target}`;
  segments[1] = target;
  return segments.join("/");
}

function LanguageSwitch({ lang, className }: { lang: Locale; className?: string }) {
  const pathname = usePathname();
  return (
    <nav aria-label="Language" className={className}>
      <ul className="flex items-center gap-1 font-mono text-label">
        {LOCALES.map(({ code, name }) => {
          const current = code === lang;
          return (
            <li key={code}>
              <Link
                href={localizedPath(pathname, code)}
                hrefLang={code}
                lang={code}
                aria-label={`${name} (${code.toUpperCase()})`}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "inline-flex h-8 min-w-8 items-center justify-center rounded-full px-2 uppercase transition-colors duration-200",
                  current ? "bg-ink text-paper" : "text-muted hover:text-ink",
                )}
              >
                {code}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

const cvIcon = <ArrowDown className="h-4 w-4" strokeWidth={1.8} />;

export default function Header({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === `/${lang}` || pathname === `/${lang}/`;
  const hrefFor = (hash: string) => (isHome ? hash : `/${lang}${hash}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close on route change.
  useEffect(() => setOpen(false), [pathname]);

  // While open: focus moves into the sheet, the page behind is inert and does
  // not scroll, and Escape closes the sheet and returns focus to the button.
  useEffect(() => {
    if (!open) return;
    const behind = [document.getElementById("main"), document.getElementById("site-footer")];
    behind.forEach((el) => el?.setAttribute("inert", ""));
    const frame = requestAnimationFrame(() => {
      sheetRef.current?.querySelector<HTMLElement>("a[href]")?.focus({ preventScroll: true });
    });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(frame);
      behind.forEach((el) => el?.removeAttribute("inert"));
      root.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Back on a wide screen the sheet is meaningless; drop it.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const onChange = () => mq.matches && setOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const menuLabel = tr(open ? shellCopy.closeMenu : shellCopy.openMenu, lang);

  return (
    <>
      {/* Anchor for "Back to top"; the sticky header itself cannot be a scroll target. */}
      <span id="top" aria-hidden="true" className="absolute left-0 top-0" />
      <header
        className={cn(
          "sticky top-0 z-50 border-b transition-[background-color,border-color] duration-300",
          scrolled || open ? "border-rule bg-paper/90 backdrop-blur-md" : "border-transparent bg-paper",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
          <div className="flex items-center gap-4">
            <Link
              href={`/${lang}`}
              className="font-serif text-[1.625rem] leading-none tracking-[-0.01em] text-ink transition-colors hover:text-accent-ink"
            >
              {profile.name}
            </Link>
            <span className="hidden items-center gap-2 border-l border-rule pl-4 font-mono text-label text-green xl:inline-flex">
              <span aria-hidden="true" className="relative flex h-2 w-2">
                <span className="absolute inset-0 rounded-full bg-green/40 motion-safe:animate-ping" />
                <span className="relative h-2 w-2 rounded-full bg-green" />
              </span>
              {tr(profile.openTo, lang)}
            </span>
          </div>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={hrefFor(item.href)}
                    className="group relative inline-flex h-10 items-center px-3 text-[0.9375rem] text-ink/80 transition-colors hover:text-ink"
                  >
                    {tr(item.label, lang)}
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-3 bottom-1.5 h-px origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out-quint group-hover:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden items-center gap-4 lg:flex">
            <LanguageSwitch lang={lang} />
            <Button href={profile.cvPath} variant="primary" size="sm" icon={cvIcon} download>
              {tr(shellCopy.downloadCv, lang)}
            </Button>
          </div>

          <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls={open ? "mobile-menu" : undefined}
            aria-label={menuLabel}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 items-center gap-3 rounded-full border border-ink/20 pl-4 pr-3.5 text-sm font-medium text-ink transition-colors hover:border-ink lg:hidden"
          >
            <span aria-hidden="true">{open ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="relative block h-2.5 w-4">
              <span
                className={cn(
                  "absolute left-0 top-0 h-[1.5px] w-4 bg-current transition-transform duration-300 ease-out-quint",
                  open && "translate-y-[4.25px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-[1.5px] w-4 bg-current transition-transform duration-300 ease-out-quint",
                  open && "-translate-y-[4.25px] -rotate-45",
                )}
              />
            </span>
          </button>
        </Container>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={sheetRef}
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: EASE }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-paper md:top-[4.5rem] lg:hidden"
          >
            <Container className="flex min-h-full flex-col pb-8 pt-2">
              <nav aria-label="Main">
                <ul>
                  {navItems.map((item, i) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.06 + i * 0.04, ease: EASE }}
                      className="border-b border-rule"
                    >
                      <a
                        href={hrefFor(item.href)}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline justify-between py-4 font-serif text-[2.25rem] leading-none text-ink transition-colors active:text-accent-ink"
                      >
                        {tr(item.label, lang)}
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </nav>

              <div className="mt-auto flex flex-col gap-6 pt-10">
                <div className="flex items-center justify-between gap-4">
                  <span className="inline-flex items-center gap-2 font-mono text-label text-green">
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-green" />
                    {tr(profile.openTo, lang)}
                  </span>
                  <LanguageSwitch lang={lang} />
                </div>
                <Button
                  href={profile.cvPath}
                  download
                  variant="primary"
                  icon={cvIcon}
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  {tr(shellCopy.downloadCv, lang)}
                </Button>
                <a href={`mailto:${profile.email}`} className="text-center text-sm text-muted underline-offset-4 hover:text-ink hover:underline">
                  {profile.email}
                </a>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
