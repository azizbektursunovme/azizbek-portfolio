import { expect, test } from "@playwright/test";
import { projects } from "../data/projects";

const pages = ["/en", ...projects.filter((p) => p.caseStudy).map((p) => `/en/work/${p.slug}`)];
/** Projects whose live URL must never be linked (not live yet, or not deployed). */
const hidden = projects.filter((p) => p.links.liveStatus !== "live" && p.links.live).map((p) => p.links.live!);

for (const path of pages) {
  test(`links on ${path}`, async ({ page }) => {
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);

    await expect(page.locator('a[href*="8iz.uz"]')).toHaveCount(0);
    for (const url of hidden) await expect(page.locator(`a[href^="${url}"]`)).toHaveCount(0);

    const blank = page.locator("a[target=_blank]");
    const n = await blank.count();
    for (let i = 0; i < n; i++) {
      await expect(blank.nth(i)).toHaveAttribute("rel", /\bnoopener\b/);
    }
  });
}

test("the 8iz case page says it is launching soon and links nowhere outside", async ({ page }) => {
  await page.goto("/en/work/8iz");
  await expect(page.getByTestId("case-meta")).toContainText(/launching soon/i);
});

test("a live project's case page links to its site in a new tab", async ({ page }) => {
  await page.goto("/en/work/hirara");
  const live = page.getByTestId("case-meta").locator('a[href="https://hirara.uz"]');
  await expect(live).toHaveCount(1);
  await expect(live).toHaveAttribute("target", "_blank");
});

test("brand guide PDFs are download links", async ({ page }) => {
  await page.goto("/en/work/jjr-transportation");
  const guide = page.locator('a[href="/work/jjr-transportation/guide.pdf"]').first();
  await expect(guide).toHaveAttribute("download", /.*/);
});
