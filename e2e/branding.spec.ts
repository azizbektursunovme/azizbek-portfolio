import { expect, test } from "@playwright/test";
import { byDiscipline } from "../data/projects";

const brands = byDiscipline("brand");

test.describe("branding wall", () => {
  test("branding wall", async ({ page }) => {
    await page.goto("/en");
    const logos = page.locator("#branding [data-testid=brand-logo]");
    await expect(logos).toHaveCount(brands.length);

    const tiles = page.locator("#branding [data-testid=brand-tile]");
    for (const [i, project] of brands.entries()) {
      const tile = tiles.nth(i);
      const link = tile.getByRole("link");
      await expect(link).toHaveCount(1);
      await expect(link).toHaveAttribute("href", `/en/work/${project.slug}`);
      await expect(link).toHaveAccessibleName(project.title);
      await expect(tile.locator(`#brand-${project.slug}-meta`)).not.toBeEmpty();
      // Exactly one logo carries alt text; the colour twin is decorative.
      const named = tile.locator("img[alt]:not([alt=''])");
      await expect(named).toHaveCount(1);
    }
  });

  test("logos are monochrome until hover or focus", async ({ page }) => {
    await page.goto("/en");
    const tile = page.locator("#branding [data-testid=brand-tile]").first();
    const colourImg = tile.locator("img").last();
    await tile.scrollIntoViewIfNeeded();
    await expect(colourImg).toHaveCSS("opacity", "0");
    await tile.getByRole("link").focus();
    await expect(colourImg).toHaveCSS("opacity", "1");
    await page.mouse.move(0, 0);
    await tile.getByRole("link").blur();
    await expect(colourImg).toHaveCSS("opacity", "0");
    await tile.hover();
    await expect(colourImg).toHaveCSS("opacity", "1");
  });

  test("a brand without a mono mark falls back to a grayscale filter", async ({ page }) => {
    await page.goto("/en");
    const tile = page.locator("#branding [data-testid=brand-tile]", { has: page.locator("#brand-cleanpro-title") });
    const img = tile.locator("img");
    await expect(img).toHaveCount(1);
    await tile.scrollIntoViewIfNeeded();
    await expect(img).toHaveCSS("filter", /grayscale\(1\)/);
    await tile.getByRole("link").focus();
    await expect(img).not.toHaveCSS("filter", /grayscale\(1\)/);
  });

  test("the brand wall includes Good Idea Cargo", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("#branding [data-testid=brand-tile] a[href='/en/work/good-idea-cargo-ads']")).toHaveCount(1);
  });
});
