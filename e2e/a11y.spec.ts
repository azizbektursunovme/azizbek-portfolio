import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES = [
  "/en",
  "/en/work/jjr-transportation",
  "/en/work/fragrise",
  "/cv",
];

// Dark is the default; the light pass stores the visitor's choice before load. /cv is always light.
const THEMES = ["dark", "light"] as const;

for (const theme of THEMES) {
  for (const path of PAGES) {
    test(`axe (${theme}): no serious or critical violations on ${path}`, async ({ page }) => {
      if (theme === "light") {
        await page.addInitScript(() => localStorage.setItem("theme", "light"));
      }
      await page.goto(path);
      if (path !== "/cv") await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      await page.waitForLoadState("networkidle");
      // Let entrance animations finish: axe reads mid-fade opacity as low contrast.
      await page.waitForTimeout(2000);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
        .analyze();
      const bad = results.violations.filter(
        (v) => v.impact === "serious" || v.impact === "critical",
      );
      expect(
        bad.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.slice(0, 5).map((n) => n.target.join(" ")),
        })),
      ).toEqual([]);
    });
  }
}
