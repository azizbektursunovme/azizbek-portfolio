import { expect, test } from "@playwright/test";
import { archive } from "../data/projects";

test.describe("ads section", () => {
  test("ads section", async ({ page }) => {
    await page.goto("/en");
    const videos = page.locator("#ads video");
    expect(await videos.count()).toBeGreaterThanOrEqual(3);
    for (const v of await videos.all()) {
      await expect(v).toHaveAttribute("poster", /.+/);
      await expect(v).toHaveAttribute("preload", "none");
      await expect(v).toHaveAttribute("aria-label", /.+/);
    }
    await expect(page.locator("#ads iframe")).toHaveCount(0);
    await expect(page.locator("#ads").getByText("Made at GFS Group")).toHaveCount(2);
    await expect(page.locator("#ads").getByText("39.9%").first()).toBeVisible();
  });

  test("no cpl", async ({ page }) => {
    await page.goto("/en");
    const text = await page.locator("body").innerText();
    expect(text).not.toMatch(/CPL|cost per lead|\$\d+(\.\d+)? per lead/i);
  });

  test("ai tools strip", async ({ page }) => {
    await page.goto("/en");
    const strip = page.locator("#ads [data-testid=ai-tools]");
    for (const t of ["Higgsfield", "Google Flow", "Seedance", "Remotion"]) {
      await expect(strip).toContainText(t);
    }
  });

  test("archive", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("#ads [data-testid=archive-item]")).toHaveCount(archive.length);
    await expect(page.locator("#ads [data-testid=archive-item] img").first()).toHaveAttribute("loading", "lazy");
  });

  test("archive lightbox opens, Escape closes, focus returns", async ({ page }) => {
    await page.goto("/en");
    const first = page.locator("#ads [data-testid=archive-item] button").first();
    await first.scrollIntoViewIfNeeded();
    await first.click();
    const dialog = page.getByRole("dialog");
    await expect(dialog).toBeVisible();
    expect(await page.evaluate(() => document.body.style.overflow)).toBe("hidden");
    await page.keyboard.press("Escape");
    expect(await page.evaluate(() => document.body.style.overflow)).not.toBe("hidden");
    await expect(dialog).toHaveCount(0);
    await expect(first).toBeFocused();
  });

  test("video plays in view and pauses out of view", async ({ page }) => {
    await page.goto("/en");
    const v = page.locator("#ads video").first();
    await v.scrollIntoViewIfNeeded();
    await expect.poll(() => v.evaluate((e: HTMLVideoElement) => !e.paused), { timeout: 8000 }).toBe(true);
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect.poll(() => v.evaluate((e: HTMLVideoElement) => e.paused), { timeout: 8000 }).toBe(true);
  });
});

test.describe("ads section, pause control", () => {
  test("pause stops autoplay-in-view until play is pressed again", async ({ page }) => {
    await page.goto("/en");
    const v = page.locator("#ads video").first();
    await v.scrollIntoViewIfNeeded();
    await expect.poll(() => v.evaluate((e: HTMLVideoElement) => !e.paused), { timeout: 8000 }).toBe(true);
    const frame = page.locator("#ads").locator("div:has(> video)").first();
    await frame.hover();
    await frame.getByRole("button", { name: /^Pause/ }).click();
    await expect.poll(() => v.evaluate((e: HTMLVideoElement) => e.paused), { timeout: 8000 }).toBe(true);
    // Leave and come back: it must stay paused.
    await page.evaluate(() => window.scrollTo(0, 0));
    await v.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    expect(await v.evaluate((e: HTMLVideoElement) => e.paused)).toBe(true);
    await frame.getByRole("button", { name: /^Play/ }).click();
    await expect.poll(() => v.evaluate((e: HTMLVideoElement) => !e.paused), { timeout: 8000 }).toBe(true);
  });
});

test.describe("ads section, reduced motion", () => {
  test.use({ reducedMotion: "reduce" });
  test("does not autoplay; play, then pause stays paused", async ({ page }) => {
    await page.goto("/en");
    const v = page.locator("#ads video").first();
    await v.scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    expect(await v.evaluate((e: HTMLVideoElement) => e.paused)).toBe(true);
    const play = page.locator("#ads").getByRole("button", { name: /^Play/ }).first();
    await expect(play).toBeVisible();
    await play.click();
    await expect.poll(() => v.evaluate((e: HTMLVideoElement) => !e.paused), { timeout: 8000 }).toBe(true);
    const pause = page.locator("#ads").getByRole("button", { name: /^Pause/ }).first();
    await expect(pause).toHaveAttribute("aria-pressed", "true");
    await pause.click();
    await expect.poll(() => v.evaluate((e: HTMLVideoElement) => e.paused), { timeout: 8000 }).toBe(true);
    await expect(play).toHaveAttribute("aria-pressed", "false");
  });
});
