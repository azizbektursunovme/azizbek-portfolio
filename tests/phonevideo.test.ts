import { createElement as h } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";
import PhoneVideo from "@/components/PhoneVideo";
import { adsCopy as copy } from "@/data/sections";
import type { Media } from "@/data/types";

const media: Media = {
  src: "/work/x/a.mp4",
  width: 720,
  height: 1280,
  alt: { en: "Creative A1" },
  kind: "video",
  poster: "/work/x/a.jpg",
};

describe("PhoneVideo", () => {
  const html = renderToStaticMarkup(h(PhoneVideo, { media, locale: "en" }));
  test("is muted, looping, inline, lazy, with a poster", () => {
    expect(html).toContain("<video");
    expect(html).toContain('preload="none"');
    expect(html).toContain('poster="/work/x/a.jpg"');
    expect(html).toMatch(/\smuted(=|\s|>)/);
    expect(html).toMatch(/\sloop(=|\s|>)/);
    expect(html).toMatch(/playsinline/i);
  });
  test("never autoplays in markup and is labelled", () => {
    expect(html).not.toMatch(/autoplay/i);
    expect(html).toContain('aria-label="Creative A1"');
    expect(html).not.toContain("<iframe");
  });
  test("always renders a localized play/pause toggle (WCAG 2.2.2)", () => {
    expect(html).toMatch(/<button[^>]*aria-pressed="false"[^>]*aria-label="Play video: Creative A1"/);
    const ru = renderToStaticMarkup(h(PhoneVideo, { media: { ...media, alt: { en: "A", ru: "Б", uz: "B" } }, locale: "ru" }));
    expect(ru).toContain('aria-label="Воспроизвести видео: Б"');
  });
  test("every locale has a pause label", () => {
    expect(copy.pause).toEqual({ en: "Pause video", ru: "Пауза", uz: "Pauza" });
  });
});
