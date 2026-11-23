import type { CSSProperties } from "react";
import { Instrument_Serif, JetBrains_Mono, Manrope, Oranienbaum } from "next/font/google";
import localFont from "next/font/local";

/** Display headlines. Instrument Serif ships a single weight, so contrast comes from size, not boldness. */
export const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-instrument-serif",
});

/** Body and UI. Satoshi variable (300–900), self-hosted. Free under the ITF Free Font License (fontshare.com). */
export const sans = localFont({
  src: [{ path: "./fonts/Satoshi-Variable.woff2", weight: "300 900", style: "normal" }],
  display: "swap",
  variable: "--font-satoshi",
  fallback: ["ui-sans-serif", "system-ui", "Segoe UI", "Arial", "sans-serif"],
});

/** Labels, meta and small data. */
export const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const fontVariables = `${serif.variable} ${sans.variable} ${mono.variable}`;

/*
 * Cyrillic fallbacks for /ru. Instrument Serif and Satoshi have no Cyrillic
 * glyphs, and their next/font fallbacks (metric-adjusted Times/Arial) would
 * catch Cyrillic first. On /ru the layout puts these families right after the
 * primary face, so Latin stays in Instrument Serif / Satoshi and Cyrillic
 * gets a designed face (Oranienbaum for display, Manrope for body). Not preloaded: /en and /uz never download them, and
 * on /ru the unicode-range subsets load only for the glyphs in use.
 */
/** Oranienbaum: a condensed, high-contrast display serif, the closest Cyrillic match to Instrument Serif. Regular only; italics are synthesized. */
const serifCyrillic = Oranienbaum({
  subsets: ["latin", "cyrillic"],
  weight: "400",
  display: "swap",
  preload: false,
});

const sansCyrillic = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  preload: false,
});

/** First family in a next/font stack: the real face, without its generated fallback. */
const primary = (family: string) => family.split(",")[0].trim();

export const cyrillicFontVars = {
  "--font-instrument-serif": `${primary(serif.style.fontFamily)}, ${serifCyrillic.style.fontFamily}`,
  "--font-satoshi": `${primary(sans.style.fontFamily)}, ${sansCyrillic.style.fontFamily}`,
} as CSSProperties;
