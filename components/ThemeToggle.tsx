"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { shellCopy } from "@/data/nav";
import type { Locale } from "@/data/types";
import { tr } from "@/lib/localize";
import { cn } from "@/lib/cn";
import { DEFAULT_THEME, THEME_COLOR, applyTheme, readTheme, type Theme } from "@/lib/theme";

// The theme lives on <html data-theme>; watch the attribute so every reader stays in sync.
const subscribe = (cb: () => void) => {
  const observer = new MutationObserver(cb);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
};
// The server always renders the default; the real value is read after hydration, so markup never mismatches.
const getServerTheme = (): Theme => DEFAULT_THEME;

/**
 * Sun/moon button that flips between the dark (default) and light themes.
 * Its label names the action ("Switch to light theme"). The icon is chosen by
 * CSS from <html data-theme>, so it is right from the first paint even before
 * React reads the stored choice.
 */
export default function ThemeToggle({ lang, className }: { lang: Locale; className?: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme, getServerTheme);
  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = tr(next === "light" ? shellCopy.themeToLight : shellCopy.themeToDark, lang);

  // A stored light choice was applied by the head script; bring the browser UI colour along.
  useEffect(() => {
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[readTheme()]);
  }, []);

  const icon =
    "absolute h-[1.125rem] w-[1.125rem] motion-safe:transition-[opacity,transform] motion-safe:duration-300 motion-safe:ease-out-quint";

  return (
    <button
      type="button"
      data-testid="theme-toggle"
      aria-label={label}
      title={label}
      onClick={() => applyTheme(next)}
      className={cn(
        "relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-ink",
        className,
      )}
    >
      {/* Dark page: the sun offers light. Light page: the moon offers dark. */}
      <Sun aria-hidden="true" strokeWidth={1.6} className={cn(icon, "rotate-90 scale-75 opacity-0 dark:rotate-0 dark:scale-100 dark:opacity-100")} />
      <Moon aria-hidden="true" strokeWidth={1.6} className={cn(icon, "rotate-0 scale-100 opacity-100 dark:-rotate-90 dark:scale-75 dark:opacity-0")} />
    </button>
  );
}
