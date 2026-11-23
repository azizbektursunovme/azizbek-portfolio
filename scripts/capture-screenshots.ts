import { chromium } from "@playwright/test";
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

type Target = { slug: string; url: string };

const DEFAULTS: Target[] = [
  { slug: "jjr-transportation", url: "https://jjr-transportation-website.vercel.app" },
  { slug: "convertboost-ai", url: "https://convertboost-ai.vercel.app" },
  { slug: "workers", url: "https://wrkrs.uz" },
  { slug: "motionforge", url: "https://motionforge-dun.vercel.app" },
  { slug: "fragrise", url: "https://fragrise.uz" },
];

const MAX_FULL_HEIGHT = 6000;

function parseTargets(args: string[]): Target[] {
  if (!args.length) return DEFAULTS;
  return args.map((a) => {
    const i = a.indexOf("=");
    if (i < 1) throw new Error(`Bad target "${a}", expected slug=url`);
    return { slug: a.slice(0, i), url: a.slice(i + 1) };
  });
}

async function toWebp(buf: Buffer, out: string) {
  await sharp(buf).webp({ quality: 82 }).toFile(out);
}

async function settle(page: import("@playwright/test").Page, url: string) {
  await page.goto(url, { waitUntil: "load", timeout: 45000 });
  await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(1500);
}

async function main() {
  const targets = parseTargets(process.argv.slice(2));
  const browser = await chromium.launch();
  const failed: string[] = [];
  for (const { slug, url } of targets) {
    const dir = path.join(process.cwd(), "public", "work", slug);
    fs.mkdirSync(dir, { recursive: true });
    try {
      const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
      const dp = await desktop.newPage();
      await settle(dp, url);
      await toWebp(await dp.screenshot(), path.join(dir, "desktop-1.webp"));
      // scroll through to trigger lazy content, then back to top
      await dp.evaluate(async () => {
        const h = document.documentElement.scrollHeight;
        for (let y = 0; y < Math.min(h, 6000); y += 600) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
      await dp.waitForTimeout(800);
      const full = await dp.screenshot({ fullPage: true });
      const meta = await sharp(full).metadata();
      const img = sharp(full);
      const buf =
        (meta.height ?? 0) > MAX_FULL_HEIGHT
          ? await img.extract({ left: 0, top: 0, width: meta.width!, height: MAX_FULL_HEIGHT }).toBuffer()
          : full;
      // WebP max dimension is 16383; 6000 is safe
      await toWebp(buf, path.join(dir, "desktop-full.webp"));
      await desktop.close();

      const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
      const mp = await mobile.newPage();
      await settle(mp, url);
      await toWebp(await mp.screenshot(), path.join(dir, "mobile-1.webp"));
      await mobile.close();
      console.log(`OK   ${slug} <- ${url}`);
    } catch (e) {
      failed.push(slug);
      console.error(`FAIL ${slug} <- ${url}: ${(e as Error).message.split("\n")[0]}`);
    }
  }
  await browser.close();
  if (failed.length) console.error(`Failed: ${failed.join(", ")}`);
}

main();
