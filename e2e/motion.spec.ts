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

    test("first bento tile is visible", async ({ page }) => {
      await page.goto("/en");
      await expectShown(page.locator("[data-testid=bento-tile]:first-child"));
    });
  });
}

test.describe("reveal failsafe", () => {
  test("if the app never hydrates, html.js is dropped and reveals show", async ({ page }) => {
    // The inline script still runs, but no client chunk loads, so React never hydrates.
    await page.route("**/_next/static/chunks/**", (route) => route.abort());
    await page.goto("/en");
    const html = page.locator("html");
    await expect(html).toHaveClass(/(^|\s)js(\s|$)/);
    await expect(html).not.toHaveClass(/(^|\s)js(\s|$)/, { timeout: 6000 });
    const reveal = page.locator("[data-reveal]").first();
    await reveal.scrollIntoViewIfNeeded();
    expect(await effectiveOpacity(reveal)).toBeGreaterThan(0.99);
  });

  test("without IntersectionObserver, html.js is never set", async ({ page }) => {
    await page.addInitScript(() => {
      // @ts-expect-error simulate an old browser
      delete window.IntersectionObserver;
    });
    // Check only the inline flag script: keep the app bundle out of it.
    await page.route("**/_next/static/chunks/**", (route) => route.abort());
    await page.goto("/en");
    await expect(page.locator("html")).not.toHaveClass(/(^|\s)js(\s|$)/);
    const reveal = page.locator("[data-reveal]").first();
    await reveal.scrollIntoViewIfNeeded();
    expect(await effectiveOpacity(reveal)).toBeGreaterThan(0.99);
  });

  test("hydrated pages keep html.js and animate reveals in", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("data-hydrated", "");
    await page.waitForTimeout(3500);
    await expect(page.locator("html")).toHaveClass(/(^|\s)js(\s|$)/);
    const reveal = page.locator("[data-reveal]").first();
    await reveal.scrollIntoViewIfNeeded();
    await expect.poll(() => effectiveOpacity(reveal), { timeout: 5000 }).toBeGreaterThan(0.99);
  });
});

test.describe("no-JS legacy safety net", () => {
  test.use({ javaScriptEnabled: false });

  test("only exact inline opacity:0 is overridden, not opacity:0.16", async ({ page }) => {
    await page.goto("/en");
    const partial = page.locator('[style*="opacity:0.16"]').first();
    if ((await partial.count()) > 0) {
      expect(await partial.evaluate((el) => getComputedStyle(el).opacity)).toBe("0.16");
    }
    const hidden = page.locator('.bg-zinc-950 [style*="opacity:0;"]').first();
    if ((await hidden.count()) > 0) {
      expect(await hidden.evaluate((el) => getComputedStyle(el).opacity)).toBe("1");
    }
  });
});
