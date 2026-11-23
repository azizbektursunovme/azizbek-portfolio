import { expect, test } from "@playwright/test";

const MARKS = ["JJR", "DAVR", "Good Idea Cargo", "Fragrise", "8iz", "GFS Group"];

test.describe("hero", () => {
  test("hero shows identity", async ({ page }) => {
    await page.goto("/en");
    const hero = page.locator("[data-testid=hero]");

    await expect(hero.locator("h1")).toContainText("Azizbek Tursunov");
    await expect(hero).toContainText("Frontend Developer & Brand Designer");
    await expect(hero).toContainText("Websites, brand identities, and the ads that sell them.");
    await expect(hero).toContainText("GFS Group LLC");
    await expect(hero).toContainText("Open to freelance");

    await expect(hero.getByRole("link", { name: "See work" })).toHaveAttribute("href", "#work");
    await expect(hero.getByRole("link", { name: /Download CV/ })).toHaveAttribute(
      "href",
      "/Azizbek_Tursunov_CV.pdf",
    );
  });

  test("client marks strip is labelled and names every brand", async ({ page }) => {
    await page.goto("/en");
    const strip = page.getByRole("list", { name: "Brands I've built for" });
    await expect(strip).toBeVisible();

    // A mark counts when it is an <img> with a non-empty alt, or a text wordmark.
    const marks = strip.locator("[data-testid=client-mark]");
    const names: string[] = [];
    for (let i = 0; i < (await marks.count()); i++) {
      const mark = marks.nth(i);
      const img = mark.locator("img");
      const name = (await img.count()) > 0 ? await img.getAttribute("alt") : await mark.innerText();
      if (name && name.trim()) names.push(name.trim());
    }
    expect(names.length).toBeGreaterThanOrEqual(5);
    for (const brand of MARKS) {
      expect(names.some((n) => n.toLowerCase().includes(brand.toLowerCase())), `${brand} mark`).toBe(true);
    }
  });

  test("first viewport at 1440x900 holds name, title, status, CTAs and marks", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/en");
    const hero = page.locator("[data-testid=hero]");
    const inView = [
      hero.locator("h1"),
      hero.getByText("Frontend Developer & Brand Designer"),
      hero.getByText("Websites, brand identities, and the ads that sell them."),
      hero.getByText("Open to freelance"),
      hero.getByRole("link", { name: "See work" }),
      hero.getByRole("link", { name: /Download CV/ }),
      page.getByRole("list", { name: "Brands I've built for" }),
    ];
    for (const el of inView) {
      const box = await el.boundingBox();
      expect(box, "element is rendered").not.toBeNull();
      expect(box!.y + box!.height).toBeLessThanOrEqual(900);
    }
  });

  test("server markup never hides hero content (works without JS)", async ({ request }) => {
    const html = await (await request.get("/en")).text();
    const start = html.indexOf('data-testid="hero"');
    expect(start).toBeGreaterThan(-1);
    const hero = html.slice(start, html.indexOf("</section>", start));
    expect(hero).toContain("Azizbek");
    expect(hero).not.toMatch(/opacity:\s*0/);
    expect(hero).not.toContain("data-reveal");
  });

  test("no horizontal overflow at 390px", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en");
    const hero = page.locator("[data-testid=hero]");
    await expect(hero.locator("h1")).toBeVisible();
    const overflow = await hero.evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
  });
});
