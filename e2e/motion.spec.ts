import { expect, test, type Locator } from "@playwright/test";

/**
 * Content must never stay hidden when animations don't run.
 * Playwright's toBeVisible() treats opacity:0 as visible, so we also
 * check the effective opacity (the product of the element's and all its
 * ancestors' computed opacity).
 */
async function effectiveOpacity(locator: Locator): Promise<number> {
  return locator.evaluate((el) => {
    let o = 1;
    for (let n: Element | null = el; n; n = n.parentElement) {
      o *= parseFloat(getComputedStyle(n).opacity);
    }
    return o;
  });
}

async function expectShown(locator: Locator) {
  await expect(locator).toBeVisible();
  await expect.poll(() => effectiveOpacity(locator), { timeout: 5000 }).toBeGreaterThan(0.99);
}

const modes = [
  { name: "reduced motion", options: { reducedMotion: "reduce" as const } },
  { name: "JavaScript disabled", options: { javaScriptEnabled: false } },
];

for (const mode of modes) {
  test.describe(mode.name, () => {
    test.use(mode.options);

    test("hero title is visible", async ({ page }) => {
      await page.goto("/en");
      await expectShown(page.locator("h1").first());
    });

    test("header, nav and footer are visible", async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto("/en");
      const nav = page.getByRole("navigation", { name: "Main" });
      await expectShown(nav.getByRole("link", { name: "Websites" }));
      await expectShown(page.getByRole("link", { name: /Download CV/ }).first());
      const footer = page.locator("footer");
      await footer.scrollIntoViewIfNeeded();
      await expectShown(footer.getByText("© 2026 Azizbek Tursunov"));
    });

    test("no [data-reveal] element stays hidden", async ({ page }) => {
      await page.goto("/en");
      const reveals = page.locator("[data-reveal]");
      const count = await reveals.count();
      expect(count).toBeGreaterThan(0);
      for (let i = 0; i < count; i++) {
        const el = reveals.nth(i);
        await el.scrollIntoViewIfNeeded();
        await expect.poll(() => effectiveOpacity(el), { timeout: 5000 }).toBeGreaterThan(0.99);
      }
    });

    // Task 8 adds the bento and removes this fixme.
    test.fixme("first bento tile is visible", async ({ page }) => {
      await page.goto("/en");
      await expectShown(page.locator("[data-testid=bento-tile]:first-child"));
    });
  });
}
