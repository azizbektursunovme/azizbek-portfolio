import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

/**
 * Writes WebP derivatives next to each original PNG in public/images-portfolio:
 * <name>-thumb.webp (max 640px wide, q78) and <name>-full.webp (max 1600px wide, q82).
 * Prints the real dimensions as JSON so data/projects.ts can be kept in sync.
 */
const DIR = path.join(process.cwd(), "public", "images-portfolio");
const report: Record<string, { thumb: [number, number]; full: [number, number] }> = {};

async function main() {
  for (const file of fs.readdirSync(DIR).filter((f) => f.endsWith(".png"))) {
    const name = file.replace(/\.png$/, "");
    const input = path.join(DIR, file);
    const t = await sharp(input).resize({ width: 640, withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join(DIR, `${name}-thumb.webp`));
    const f = await sharp(input).resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 82 }).toFile(path.join(DIR, `${name}-full.webp`));
    report[name] = { thumb: [t.width, t.height], full: [f.width, f.height] };
  }
  console.log(JSON.stringify(report));
}

main();
