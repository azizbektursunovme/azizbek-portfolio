import { expect, test } from "@playwright/test";
import { profile } from "../data/profile";
import { projects } from "../data/projects";

const SITE = "https://azizbektursunov.uz";
const CV_PROJECTS = ["JJR Transportation", "DAVR GROUP", "Hirara", "8iz", "FRAGRISE", "ConvertBoost AI"];

test.describe("cv page", () => {
  test("/cv renders the CV content", async ({ page }) => {
    const res = await page.goto("/cv");
    expect(res?.status()).toBe(200);
    expect(new URL(page.url()).pathname).toBe("/cv");

    const cv = page.locator("main");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(profile.name);
    await expect(cv).toContainText("Frontend Developer & Brand Designer");
    await expect(cv).toContainText("GFS Group LLC — IT Department");
    for (const p of CV_PROJECTS) await expect(cv).toContainText(p);
    await expect(cv).toContainText("built in collaboration");
    await expect(cv).toContainText("Renessans Ta'lim Universiteti");
    await expect(cv).toContainText("PDP University");
    await expect(cv).toContainText("PDPU Proctor & Volunteer");
    for (const s of ["Uzbek", "C2 (native)", "English", "B2", "Russian", "A2"]) await expect(cv).toContainText(s);
    // CV-only entries.
    await expect(cv).toContainText("PDP School");
    await expect(cv).toContainText("Kinder");
    await expect(cv.locator("[data-testid=cv-qr] svg")).toHaveCount(1);
  });

  test("links only to live projects, never to 8iz.uz", async ({ page }) => {
    await page.goto("/cv");
    const hrefs = await page.locator("main a").evaluateAll((as) => as.map((a) => a.getAttribute("href") ?? ""));
    expect(hrefs.some((h) => h.includes("8iz.uz"))).toBe(false);
    for (const p of projects.filter((x) => CV_PROJECTS.includes(x.title))) {
      if (p.links.liveStatus === "live" && p.links.live) expect(hrefs).toContain(p.links.live);
    }
  });

  test("has its own canonical and no forbidden strings", async ({ page }) => {
    await page.goto("/cv");
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `${SITE}/cv`);
    const html = await page.content();
    for (const f of ["CPL", "with a friend", "Grant Invest", "Junior UI Designer", "UI/UX Designer"]) {
      expect(html).not.toContain(f);
    }
  });
});
