import { expect, test } from "@playwright/test";
import { projects } from "../data/projects";
import { tr } from "../lib/localize";

const cases = projects.filter((p) => p.caseStudy);

/** Old /projects/<id> ids from the previous site, and where each one lives now. */
const LEGACY: Record<string, string> = {
  "cleanpro-branding": "/work/cleanpro",
  "kofemator-post": "#ads",
  "organic-product-flyer": "#ads",
  "iqtidor-academy": "#ads",
  "school-banner": "#ads",
  "social-media-design": "#ads",
  "advertising-banners": "#ads",
  "personal-projects": "#ads",
};

test.describe("case pages render", () => {
  for (const p of cases) {
    test(`/en/work/${p.slug}`, async ({ page }) => {
      const res = await page.goto(`/en/work/${p.slug}`);
      expect(res?.status()).toBe(200);
      await expect(page.getByRole("heading", { level: 1 })).toHaveText(p.title);
      const meta = page.getByTestId("case-meta");
      await expect(meta).toContainText(p.client);
      await expect(meta).toContainText(tr(p.role, "en"));
      await expect(page.getByTestId("case-brief")).toContainText(tr(p.caseStudy!.brief, "en"));
    });
  }

  test("ru and uz case pages are built too", async ({ request }) => {
    for (const lang of ["ru", "uz"]) {
      const res = await request.get(`/${lang}/work/${cases[0].slug}`);
      expect(res.status()).toBe(200);
    }
  });

  test("next and previous links walk every case page", async ({ page }) => {
    await page.goto(`/en/work/${cases[0].slug}`);
    const nav = page.getByRole("navigation", { name: /more projects/i });
    await expect(nav.getByRole("link")).toHaveCount(2);
    await expect(nav.getByRole("link", { name: new RegExp(cases[1].title) })).toHaveAttribute(
      "href",
      `/en/work/${cases[1].slug}`,
    );
    await expect(nav.getByRole("link", { name: new RegExp(cases[cases.length - 1].title) })).toHaveAttribute(
      "href",
      `/en/work/${cases[cases.length - 1].slug}`,
    );
  });
});

test("unknown slug 404", async ({ page }) => {
  const res = await page.goto("/en/work/nope");
  expect(res?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: /home/i }).first()).toHaveAttribute("href", "/en");
});

test("a project without a case page 404s", async ({ request }) => {
  const res = await request.get("/en/work/gfs-ads");
  expect(res.status()).toBe(404);
});

test("unknown path under a locale 404s", async ({ request }) => {
  const res = await request.get("/en/nothing-here");
  expect(res.status()).toBe(404);
});

test("unknown lang", async ({ request }) => {
  const res = await request.get("/de", { maxRedirects: 0 });
  const status = res.status();
  if (status === 404) return;
  expect([301, 302, 307, 308]).toContain(status);
  expect(new URL(res.headers()["location"], "http://x").pathname).toBe("/en");
});

test.describe("old urls redirect", () => {
  for (const lang of ["en", "ru", "uz"]) {
    for (const [id, target] of Object.entries(LEGACY)) {
      test(`/${lang}/projects/${id}`, async ({ request }) => {
        const res = await request.get(`/${lang}/projects/${id}`, { maxRedirects: 0 });
        expect(res.status()).toBe(308);
        const loc = new URL(res.headers()["location"], "http://x");
        expect(loc.pathname + loc.hash).toBe(`/${lang}${target}`);
      });
    }
  }
});
