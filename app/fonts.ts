import { Instrument_Serif, JetBrains_Mono } from "next/font/google";
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
