import { test, expect, type Browser, type BrowserContextOptions, type Page } from "@playwright/test";

// Dark paper (#121110) and light paper (#f4f1ea) as computed styles.
const DARK_PAPER = "rgb(18, 17, 16)";
const LIGHT_PAPER = "rgb(244, 241, 234)";

/** browser.newContext() with the project's baseURL, so relative paths work. */
const ctx = (browser: Browser, options: BrowserContextOptions = {}) =>
  browser.newContext({ baseURL: test.info().project.use.baseURL, ...options });

const bodyBackground = (page: Page) => page.evaluate(() => getComputedStyle(document.body).backgroundColor);

test.describe("theme", () => {
  test("first visit is dark, whatever the OS prefers", async ({ browser }) => {
    for (const colorScheme of ["light", "dark"] as const) {
      const context = await ctx(browser, { colorScheme });
      const page = await context.newPage();
      await page.goto("/en");
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      expect(await bodyBackground(page)).toBe(DARK_PAPER);
      expect(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe("dark");
      await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#121110");
      await context.close();
    }
  });

  test("without JavaScript the page is still dark", async ({ browser }) => {
    const context = await ctx(browser, { javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto("/en");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect(await bodyBackground(page)).toBe(DARK_PAPER);
    await context.close();
  });

  test("toggle switches to light, persists across reloads, and switches back", async ({ page }) => {
    await page.goto("/en");
    const toggle = page.getByRole("button", { name: "Switch to light theme" });
    await expect(toggle).toBeVisible();
    await toggle.click();

    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    expect(await bodyBackground(page)).toBe(LIGHT_PAPER);
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("light");
    expect(await page.evaluate(() => getComputedStyle(document.documentElement).colorScheme)).toBe("light");
    await expect(page.getByRole("button", { name: "Switch to dark theme" })).toBeVisible();

    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    expect(await bodyBackground(page)).toBe(LIGHT_PAPER);
    await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#f4f1ea");

    // The choice follows the visitor to other pages.
    await page.goto("/en/work/fragrise");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

    await page.getByRole("button", { name: "Switch to dark theme" }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    expect(await bodyBackground(page)).toBe(DARK_PAPER);
    expect(await page.evaluate(() => localStorage.getItem("theme"))).toBe("dark");
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("a stored light choice is applied before first paint (no hydration warning)", async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });
    await page.addInitScript(() => localStorage.setItem("theme", "light"));
    await page.goto("/en");
    // Read the attribute as soon as the document is parsed: the head script has run already.
    expect(await page.evaluate(() => document.documentElement.getAttribute("data-theme"))).toBe("light");
    await expect(page.getByRole("button", { name: "Switch to dark theme" })).toBeVisible();
    expect(errors.filter((e) => /hydrat/i.test(e))).toEqual([]);
  });

  test("toggle label is localized on /ru and /uz", async ({ page }) => {
    await page.goto("/ru");
    await expect(page.getByRole("button", { name: "Включить светлую тему" })).toBeVisible();
    await page.getByRole("button", { name: "Включить светлую тему" }).click();
    await expect(page.getByRole("button", { name: "Включить тёмную тему" })).toBeVisible();

    await page.goto("/uz");
    await expect(page.getByRole("button", { name: "Tungi rejimga oʻtish" })).toBeVisible();
    await page.getByRole("button", { name: "Tungi rejimga oʻtish" }).click();
    await expect(page.getByRole("button", { name: "Yorugʻ rejimga oʻtish" })).toBeVisible();
  });

  test("toggle is in the bar at a 375px mobile viewport, keyboard operable, 44px target", async ({ browser }) => {
    const context = await ctx(browser, { viewport: { width: 375, height: 812 } });
    const page = await context.newPage();
    await page.goto("/en");
    const toggle = page.getByRole("button", { name: "Switch to light theme" });
    await expect(toggle).toBeVisible();
    await expect(toggle).toBeInViewport();
    const box = await toggle.boundingBox();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);

    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375);
    await context.close();
  });

  test("the printable CV stays light", async ({ page }) => {
    await page.goto("/cv");
    expect(await page.evaluate(() => document.documentElement.getAttribute("data-theme"))).toBeNull();
  });
});
