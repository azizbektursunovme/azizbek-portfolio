import { expect, test } from "@playwright/test";
import { byDiscipline, redesignLinks } from "../data/projects";

const web = byDiscipline("web");

test.describe("websites section", () => {
  test("websites lists web projects", async ({ page }) => {
    await page.goto("/en");
    const cards = page.locator("#websites [data-testid=site-card]");
    await expect(cards).toHaveCount(web.length);

    for (const [i, project] of web.entries()) {
      const card = cards.nth(i);
      await expect(card.getByRole("heading", { name: project.title })).toBeVisible();
      const img = card.locator("img");
      await expect(img).toHaveCount(1);
      expect(((await img.getAttribute("alt")) ?? "").trim().length).toBeGreaterThan(0);

      const visit = card.getByRole("link", { name: /^Visit site/ });
      if (project.links.liveStatus === "live") {
        await expect(visit).toHaveCount(1);
        await expect(visit).toHaveAttribute("href", project.links.live!);
        await expect(visit).toHaveAttribute("target", "_blank");
        await expect(visit).toHaveAttribute("rel", /noopener/);
      } else {
        await expect(visit).toHaveCount(0);
        await expect(card.locator(`a[href="${project.links.live ?? "__none__"}"]`)).toHaveCount(0);
      }
    }
  });

  test("8iz shows Launching soon with no link to 8iz.uz", async ({ page }) => {
    await page.goto("/en");
    const card = page.locator("#websites [data-testid=site-card]", { hasText: "8iz" }).first();
    await expect(card.getByText("Launching soon")).toBeVisible();
    await expect(card.getByRole("link", { name: /Visit site/ })).toHaveCount(0);
    await expect(page.locator('a[href*="8iz.uz"]')).toHaveCount(0);
  });

  test("redesign links", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("#websites").getByRole("heading", { name: "Redesign concepts for GFS Group companies" })).toBeVisible();
    const links = page.locator("#websites [data-testid=redesign-link]");
    await expect(links).toHaveCount(6);
    for (const [i, r] of redesignLinks.entries()) {
      await expect(links.nth(i)).toHaveAttribute("href", r.url);
      await expect(links.nth(i)).toHaveAttribute("target", "_blank");
    }
  });

  test("no iframes on the home page", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("iframe")).toHaveCount(0);
  });
});
