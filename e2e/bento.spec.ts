import { expect, test } from "@playwright/test";
import { featuredProjects } from "../data/projects";

const featured = featuredProjects();
const DISCIPLINE_LABEL = { web: "Websites", brand: "Branding", ads: "Ads" } as const;

test.describe("selected work bento", () => {
  test("bento shows 6 featured", async ({ page }) => {
    await page.goto("/en");
    const tiles = page.locator("#work [data-testid=bento-tile]");
    await expect(tiles).toHaveCount(6);
    expect(featured).toHaveLength(6);

    for (const [i, project] of featured.entries()) {
      const tile = tiles.nth(i);
      // Exactly one link per tile, named by the project title, to the case page.
      const links = tile.getByRole("link");
      await expect(links).toHaveCount(1);
      await expect(links).toHaveAttribute("href", `/en/work/${project.slug}`);
      await expect(links).toHaveAccessibleName(new RegExp(`^${project.title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`));

      // A real cover: an image (or a video poster) with a non-empty alt.
      const media = tile.locator("img, video");
      await expect(media).toHaveCount(1);
      const alt = await media.getAttribute("alt");
      const label = await media.getAttribute("aria-label");
      expect((alt ?? label ?? "").trim().length, `${project.slug} cover alt`).toBeGreaterThan(0);

      await expect(tile.getByRole("heading", { name: project.title })).toBeVisible();
      for (const d of project.disciplines) {
        await expect(tile.getByText(DISCIPLINE_LABEL[d], { exact: true })).toBeVisible();
      }
      if (project.context) {
        await expect(tile.getByText(project.context.en, { exact: true })).toBeVisible();
      }
    }
  });

  test("the hero's See work link lands on the bento", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("[data-testid=hero] a[href='#work']")).toHaveCount(1);
    await expect(page.locator("section#work")).toHaveCount(1);
    await expect(page.locator("section#work h2")).toBeVisible();
  });

  test("8iz tile links only to its case page, never to 8iz.uz", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("#work a[href*='8iz.uz']")).toHaveCount(0);
  });

  for (const width of [1024, 1440]) {
    test(`desktop ${width}px: tiles 1 and 2 are the large ones`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto("/en");
      const tiles = page.locator("#work [data-testid=bento-tile]");
      const boxes: { x: number; y: number; width: number; height: number }[] = [];
      for (let i = 0; i < 6; i++) {
        const box = await tiles.nth(i).boundingBox();
        expect(box).not.toBeNull();
        boxes.push(box!);
      }
      const area = (i: number) => boxes[i].width * boxes[i].height;
      // 1 and 2 share the first row, above the rest, and each outsizes every later tile.
      expect(Math.abs(boxes[0].y - boxes[1].y)).toBeLessThan(2);
      expect(boxes[1].x).toBeGreaterThan(boxes[0].x);
      for (const i of [2, 3, 4, 5]) {
        expect(boxes[i].y).toBeGreaterThan(boxes[0].y + boxes[0].height);
        expect(area(0), `tile 1 vs tile ${i + 1}`).toBeGreaterThan(area(i));
        expect(area(1), `tile 2 vs tile ${i + 1}`).toBeGreaterThan(area(i));
      }
    });
  }

  test("mobile 390px: tiles stack in one column without overflow", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en");
    const tiles = page.locator("#work [data-testid=bento-tile]");
    let lastBottom = -Infinity;
    for (let i = 0; i < 6; i++) {
      const box = (await tiles.nth(i).boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(15);
      expect(box.x + box.width).toBeLessThanOrEqual(375);
      expect(box.width).toBeGreaterThan(340);
      expect(box.y).toBeGreaterThanOrEqual(lastBottom);
      lastBottom = box.y + box.height;
    }
    const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
    expect(scrollWidth).toBeLessThanOrEqual(390);
  });

  test("covers never autoplay video in the bento", async ({ page }) => {
    await page.goto("/en");
    await expect(page.locator("#work video[autoplay]")).toHaveCount(0);
  });
});
