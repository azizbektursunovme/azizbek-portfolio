import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

const PAPER = "#F4F1EA";
const INK = "#151515";
const MUTED = "#6B6660";
const RULE = "#DCD6C8";
const ACCENT = "#C8442B";

/** Instrument Serif TTF is committed under app/fonts (OFL); satori cannot read woff2. */
async function serifFont() {
  return readFile(path.join(process.cwd(), "app/fonts/InstrumentSerif-Regular.ttf"));
}

/**
 * Instrument Serif has no Cyrillic (and no Uzbek ʻ). For those glyphs satori
 * falls back to the next font in the list, so fetch Oranienbaum (the site's Cyrillic display face) from Google
 * Fonts, subset to just the characters it has to draw. If the fetch fails the
 * card still renders (satori's own fallback takes over).
 */
async function fallbackFont(text: string): Promise<ArrayBuffer | null> {
  const chars = [...new Set([...text].filter((c) => c.codePointAt(0)! > 0xff))].join("");
  if (!chars) return null;
  try {
    const url = `https://fonts.googleapis.com/css2?family=Oranienbaum&text=${encodeURIComponent(chars)}`;
    const css = await (await fetch(url)).text();
    const src = css.match(/src: url\((.+?)\) format\('(opentype|truetype)'\)/)?.[1];
    if (!src) return null;
    const res = await fetch(src);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export async function renderOg(opts: { eyebrow: string; title: string; titleSize: number; body: string; footer: string }) {
  const [data, extra] = await Promise.all([
    serifFont(),
    fallbackFont(`${opts.eyebrow}${opts.title}${opts.body}${opts.footer}`),
  ]);
  const fonts: { name: string; data: ArrayBuffer | Buffer; style: "normal"; weight: 400 }[] = [
    { name: "Instrument Serif", data, style: "normal", weight: 400 },
  ];
  if (extra) fonts.push({ name: "Oranienbaum", data: extra, style: "normal", weight: 400 });
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          color: INK,
          padding: "72px 80px",
          fontFamily: "Instrument Serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 96, height: 8, background: ACCENT, marginBottom: 32 }} />
          <div style={{ fontSize: 30, color: MUTED, letterSpacing: 1, display: "flex" }}>{opts.eyebrow}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: opts.titleSize, lineHeight: 1.02, letterSpacing: -2, display: "flex" }}>{opts.title}</div>
          <div style={{ fontSize: 38, color: INK, marginTop: 28, maxWidth: 940, lineHeight: 1.2, display: "flex" }}>{opts.body}</div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `2px solid ${RULE}`,
            paddingTop: 24,
            fontSize: 28,
            color: MUTED,
          }}
        >
          <span>{opts.footer}</span>
          <span>azizbektursunov.uz</span>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  );
}
