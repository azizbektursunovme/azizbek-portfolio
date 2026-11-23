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
  // aria-controls only points at an id that exists.
  await expect(button).not.toHaveAttribute("aria-controls", /.*/);

  await button.click();
  await expect(button).toHaveAttribute("aria-expanded", "true");
  await expect(button).toHaveAttribute("aria-controls", "mobile-menu");
  const menu = page.locator("#mobile-menu");
  await expect(menu).toBeVisible();

  // Focus moves into the sheet; the page behind is inert.
  await expect(menu.getByRole("link", { name: "Websites" })).toBeFocused();
  await expect(page.locator("#main")).toHaveAttribute("inert", "");
  await expect(page.locator("#site-footer")).toHaveAttribute("inert", "");
  const links = menu.getByRole("navigation", { name: "Main" }).getByRole("link");
  await expect(links).toHaveText(NAV);
  await expect(menu.getByRole("link", { name: /Download CV/ })).toHaveAttribute(
    "href",
    "/Azizbek_Tursunov_CV.pdf",
  );
  await expect(menu.getByRole("link", { name: /Download CV/ })).toHaveAttribute("download", "");

  await page.keyboard.press("Escape");
  await expect(button).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeHidden();
  await expect(button).toBeFocused();
  await expect(page.locator("#main")).not.toHaveAttribute("inert", /.*/);

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
  const ru = lang.getByRole("link", { name: "Русский (RU)" });
  await expect(ru).toHaveAttribute("href", "/ru");
  await expect(ru).toHaveAttribute("hreflang", "ru");
  await expect(ru).toHaveAttribute("lang", "ru");
  await expect(lang.getByRole("link", { name: "English (EN)" })).toHaveAttribute("aria-current", "true");
  await expect(page.getByRole("banner").getByRole("link", { name: /Download CV/ })).toHaveAttribute("download", "");
});
