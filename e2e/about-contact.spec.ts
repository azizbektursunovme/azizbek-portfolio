import { expect, test } from "@playwright/test";
import { experience } from "../data/experience";
import { profile } from "../data/profile";

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
      await expect(about).toContainText(g.group);
      for (const item of g.items) await expect(about).toContainText(item);
    }
    await expect(about).toContainText("GFS Group LLC, a US logistics company");
  });
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
