import { expect, test } from "@playwright/test";
import { experience } from "../data/experience";
import { profile } from "../data/profile";

const exact = (s: string) => new RegExp(`^${s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`);

test.describe("about", () => {
  test("timeline shows every showOnSite entry, newest first", async ({ page }) => {
    await page.goto("/en");
    const items = page.locator("#about [data-testid=xp-item]");
    await expect(items).toHaveCount(experience.filter((e) => e.showOnSite).length);
    await expect(items.first()).toContainText("GFS Group LLC");
    await expect(items.first()).toContainText("2026");
    await expect(page.locator("#about")).not.toContainText("PDP School");
    await expect(page.locator("#about")).not.toContainText("Kinder");
  });

  test("languages, education and grouped tools are shown", async ({ page }) => {
    await page.goto("/en");
    const about = page.locator("#about");
    for (const s of ["Uzbek", "C2", "English", "B2", "Russian", "A2"]) await expect(about).toContainText(s);
    for (const e of profile.education) await expect(about).toContainText(e.school);
    for (const g of profile.tools) {
      await expect(about.getByRole("term").filter({ hasText: exact(g.group) })).toHaveCount(1);
      for (const item of g.items) {
        await expect(about.getByRole("listitem").filter({ hasText: exact(item) })).toHaveCount(1);
      }
    }
    // The proctor/volunteer role is its own line with its own years.
    await expect(about).toContainText("PDPU Proctor & Volunteer");
    await expect(about).toContainText("2023 – 2025");
    await expect(about).toContainText("GFS Group LLC, a US logistics company");
  });
});

test.describe("copy email layout", () => {
  for (const vp of [
    { width: 1440, height: 900 },
    { width: 390, height: 844 },
  ]) {
    test(`copied state does not collide at ${vp.width}px`, async ({ page, context }) => {
      await context.grantPermissions(["clipboard-read", "clipboard-write"]);
      await page.setViewportSize(vp);
      await page.goto("/en");
      const btn = page.locator("#contact").getByTestId("copy-email");
      const cv = page.locator("#contact").locator(`a[href="${profile.cvPath}"]`);
      await btn.scrollIntoViewIfNeeded();
      const before = (await btn.boundingBox())!;
      await btn.click();
      await expect(btn).toContainText("Copied");
      const a = (await btn.boundingBox())!;
      const b = (await cv.boundingBox())!;
      expect(a.width).toBeCloseTo(before.width, 0);
      const overlap = a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
      expect(overlap).toBe(false);
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(vp.width);
    });
  }
});

test.describe("contact", () => {
  test("links come from profile", async ({ page }) => {
    await page.goto("/en");
    const c = page.locator("#contact");
    await expect(c.locator(`a[href="mailto:${profile.email}"]`).first()).toBeVisible();
    await expect(c.locator(`a[href="${profile.telegram}"]`)).toHaveCount(1);
    await expect(c.locator(`a[href="${profile.instagram}"]`)).toHaveCount(1);
    await expect(c.locator(`a[href="${profile.cvPath}"][download]`)).toHaveCount(1);
    // LinkedIn is empty in profile, so no LinkedIn link is rendered.
    if (profile.linkedin) await expect(c.locator(`a[href="${profile.linkedin}"]`)).toHaveCount(1);
    else await expect(c.getByRole("link", { name: /linkedin/i })).toHaveCount(0);
  });

  test("copy email shows a Copied state announced politely", async ({ page, context }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto("/en");
    const btn = page.locator("#contact").getByRole("button", { name: /copy email/i });
    await btn.scrollIntoViewIfNeeded();
    await btn.click();
    const status = page.locator("#contact [aria-live=polite]");
    await expect(status).toContainText("Copied");
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(profile.email);
  });

  test("page ends with one big email CTA, not two", async ({ page }) => {
    await page.goto("/en");
    const big = await page.locator("a[href^='mailto:']").evaluateAll(
      (els) => els.filter((el) => parseFloat(getComputedStyle(el).fontSize) >= 40).length,
    );
    expect(big).toBe(1);
  });
});
