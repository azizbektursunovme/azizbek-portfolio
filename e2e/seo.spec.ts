import { expect, test } from "@playwright/test";

const SITE = "https://azizbektursunov.uz";

test.describe("metadata", () => {
  test("/en has canonical, hreflang, og:image, icon", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}/en`);
    for (const l of ["en", "ru", "uz"]) {
      await expect(page.locator(`link[rel="alternate"][hreflang="${l}"]`)).toHaveAttribute("href", `${SITE}/${l}`);
    }
    await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute("href", `${SITE}/en`);
    const og = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(og).toContain(SITE);
    await expect(page.locator('link[rel~="icon"]').first()).toHaveAttribute("href", /icon/);
    const kw = (await page.locator('meta[name="keywords"]').getAttribute("content")) ?? "";
    expect(kw).not.toMatch(/swiss|switzerland/i);
  });

  test("home has Person JSON-LD", async ({ page }) => {
    await page.goto("/en");
    const raw = await page.locator('script[type="application/ld+json"]').first().textContent();
    const ld = JSON.parse(raw ?? "{}");
    expect(ld["@type"]).toBe("Person");
    expect(ld.name).toBe("Azizbek Tursunov");
    expect(ld.jobTitle).toBe("Frontend Developer & Brand Designer");
    expect(ld.worksFor.name).toBe("GFS Group LLC");
    expect(ld.sameAs.every((u: string) => u.startsWith("https://"))).toBe(true);
  });

  test("case page has own title, canonical and og image", async ({ page }) => {
    await page.goto("/en/work/hirara");
    await expect(page).toHaveTitle(/^Hirara — Azizbek Tursunov$/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}/en/work/hirara`);
    await expect(page.locator('link[rel="alternate"][hreflang="uz"]')).toHaveAttribute("href", `${SITE}/uz/work/hirara`);
    const og = await page.locator('meta[property="og:image"]').getAttribute("content");
    expect(og).toContain("/en/work/hirara/opengraph-image");
  });

  test("og image routes return png", async ({ request }) => {
    for (const p of ["/en/opengraph-image", "/en/work/hirara/opengraph-image"]) {
      const res = await request.get(p);
      expect(res.status(), p).toBe(200);
      expect(res.headers()["content-type"]).toContain("image/png");
    }
  });
});

test("sitemap lists every locale x (home + case pages)", async ({ request }) => {
  const res = await request.get("/sitemap.xml");
  expect(res.status()).toBe(200);
  const xml = await res.text();
  for (const l of ["en", "ru", "uz"]) {
    expect(xml).toContain(`<loc>${SITE}/${l}</loc>`);
    expect(xml).toContain(`<loc>${SITE}/${l}/work/hirara</loc>`);
    expect(xml).toContain(`<loc>${SITE}/${l}/work/jjr-transportation</loc>`);
  }
});

test("robots.txt returns 200 with sitemap", async ({ request }) => {
  const res = await request.get("/robots.txt");
  expect(res.status()).toBe(200);
  expect(await res.text()).toContain(`Sitemap: ${SITE}/sitemap.xml`);
});

test("icon.svg served", async ({ request }) => {
  const res = await request.get("/icon.svg");
  expect(res.status()).toBe(200);
});
