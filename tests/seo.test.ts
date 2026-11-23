import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";
import robots from "@/app/robots";
import { projects } from "@/data/projects";

describe("sitemap", () => {
  const entries = sitemap();
  const urls = entries.map((e) => e.url);
  const cases = projects.filter((p) => p.caseStudy);
  it("lists locale x (home + case pages)", () => {
    expect(entries).toHaveLength(3 * (1 + cases.length));
    for (const l of ["en", "ru", "uz"]) {
      expect(urls).toContain(`https://azizbektursunov.uz/${l}`);
      for (const c of cases) expect(urls).toContain(`https://azizbektursunov.uz/${l}/work/${c.slug}`);
    }
  });
  it("has hreflang alternates", () => {
    expect(entries[0].alternates?.languages).toMatchObject({ en: expect.any(String), ru: expect.any(String), uz: expect.any(String) });
  });
});

describe("robots", () => {
  it("allows all and points to sitemap", () => {
    const r = robots();
    expect(r.sitemap).toBe("https://azizbektursunov.uz/sitemap.xml");
  });
});
