"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "./Magnetic";
import { Locale } from "@/i18n/dictionaries";

interface HeaderProps {
  dict: {
    nav: {
      about: string;
      works: string;
      services: string;
      contact: string;
    };
  };
}

export default function Header({ dict }: HeaderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const lang = (params.lang as Locale) || "en";

  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);

      // Hide header on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 150) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, []);

  const changeLanguage = (newLang: Locale) => {
    if (newLang === lang) return;
    const pathSegments = pathname.split("/");
    // pathSegments[0] is empty, pathSegments[1] is current lang
    pathSegments[1] = newLang;
    const newPath = pathSegments.join("/");
    router.push(newPath);
  };

  const navItems = [
    { label: dict.nav.about, href: `#about` },
    { label: dict.nav.works, href: `#works` },
    { label: dict.nav.services, href: `#services` },
    { label: dict.nav.contact, href: `#contact` },
  ];

  const getHref = (href: string) => {
    // If not on the homepage, route back to homepage first
    const isHomepage = pathname === `/${lang}` || pathname === `/${lang}/`;
    return isHomepage ? href : `/${lang}${href}`;
  };

  return (
    <motion.header
      animate={{ y: isHidden && !isMobileMenuOpen ? -100 : 0 }}
      transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
      className={`fixed left-0 top-0 z-40 w-full transition-colors duration-300 ${
        isScrolled || isMobileMenuOpen ? "bg-zinc-950/70 backdrop-blur-md border-b border-zinc-900" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        {/* Name Logo */}
        <Link href={`/${lang}`} className="group relative z-50 flex flex-col items-start leading-none font-bold uppercase tracking-widest text-zinc-100">
          <span className="text-sm">Azizbek</span>
          <span className="text-zinc-500 transition-colors group-hover:text-zinc-300">Tursunov</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          <ul className="flex items-center gap-8 font-mono text-xs uppercase tracking-wider text-zinc-400">
            {navItems.map((item, index) => (
              <li key={index}>
                <Magnetic range={40} strength={0.3}>
                  <Link
                    href={getHref(item.href)}
                    className="relative py-2 hover:text-zinc-100 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </Magnetic>
              </li>
            ))}
          </ul>

          {/* Lang Selector */}
          <div className="flex items-center gap-2 border-l border-zinc-800 pl-8 font-mono text-xs font-medium">
            {(["en", "ru", "uz"] as Locale[]).map((l, i) => (
              <button
                key={l}
                onClick={() => changeLanguage(l)}
                className={`transition-colors uppercase duration-200 ${
                  lang === l ? "text-zinc-100 font-bold" : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {l}
                {i < 2 && <span className="ml-2 text-zinc-800 pointer-events-none">|</span>}
              </button>
            ))}
          </div>
        </nav>

        {/* Mobile Navigation Toggles */}
        <div className="flex md:hidden items-center gap-4">
          {/* Lang selector for mobile */}
          <div className="flex items-center gap-2 font-mono text-xs">
            {(["en", "ru", "uz"] as Locale[]).map((l) => (
              <button
                key={l}
                onClick={() => changeLanguage(l)}
                className={`uppercase ${
                  lang === l ? "text-zinc-100 font-bold" : "text-zinc-500"
                }`}
              >
                {l}
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="group relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950/70 text-zinc-100 transition-colors duration-200 hover:border-zinc-600 hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-100/40"
          >
            <span className="sr-only">
              {isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            </span>
            <span className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-5 bg-current transition-transform duration-300 ${
                  isMobileMenuOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-2 h-px w-5 origin-center bg-current transition-transform duration-200 ${
                  isMobileMenuOpen ? "scale-x-0" : "scale-x-100"
                }`}
              />
              <span
                className={`absolute left-0 top-4 h-px w-5 bg-current transition-transform duration-300 ${
                  isMobileMenuOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            id="mobile-navigation"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.215, 0.61, 0.355, 1] }}
            className="md:hidden border-t border-zinc-900 bg-zinc-950/95 px-6 py-6 backdrop-blur-xl"
          >
            <ul className="mx-auto flex max-w-7xl flex-col gap-1 font-mono text-xs uppercase tracking-widest text-zinc-400">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={getHref(item.href)}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-lg border border-transparent px-4 py-4 transition-colors duration-200 hover:border-zinc-800 hover:bg-zinc-900/60 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-100/30"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
