import { expect, test } from "@playwright/test";

const NAV = ["Websites", "Branding", "Ads & Content", "About", "Contact"];

test.use({ viewport: { width: 390, height: 844 } });

test("no horizontal overflow at 390px", async ({ page }) => {
  await page.goto("/en");
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(scrollWidth).toBeLessThanOrEqual(390);
});

test("menu button opens and closes a menu with all 5 nav items", async ({ page }) => {
  await page.goto("/en");
  const button = page.getByRole("button", { name: /menu/i });
  await expect(button).toBeVisible();
  await expect(button).toHaveAttribute("aria-expanded", "false");

  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  const menu = page.locator("#mobile-menu");
  await expect(menu).toBeVisible();
  const links = menu.getByRole("navigation", { name: "Main" }).getByRole("link");
  await expect(links).toHaveText(NAV);
  await expect(menu.getByRole("link", { name: /Download CV/ })).toHaveAttribute(
    "href",
    "/Azizbek_Tursunov_CV.pdf",
  );

  await page.keyboard.press("Escape");
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeHidden();

  // Choosing an item closes the menu.
  await button.click();
  await menu.getByRole("link", { name: "About" }).click();
  await expect(menu).toBeHidden();
});

test("desktop nav lists items in order with CV and language switch", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en");
  const nav = page.getByRole("navigation", { name: "Main" });
  await expect(nav.getByRole("link")).toHaveText(NAV);
  await expect(nav.getByRole("link", { name: "Websites" })).toHaveAttribute("href", "#websites");
  await expect(page.getByRole("link", { name: "Ads & Content" }).first()).toHaveAttribute("href", "#ads");
  const lang = page.getByRole("navigation", { name: "Language" });
  await expect(lang.getByRole("link", { name: /^ru$/i })).toHaveAttribute("href", "/ru");
  await expect(lang.getByRole("link", { name: /^en$/i })).toHaveAttribute("aria-current", "true");
});
