import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const PUBLIC = path.join(process.cwd(), "public");
const WORK = path.join(PUBLIC, "work");
const O1 = "C:/Users/group/OneDrive/Desktop/GoodIdeaCargo_O1_WhoWeAre";

type Entry = { file: string; width: number; height: number; kind: "image" | "video" | "pdf"; poster?: string };

async function main() {
  // O1 jpgs -> webp
  const gic = path.join(WORK, "good-idea-cargo-ads");
  for (const f of fs.readdirSync(O1).filter((n) => /\.jpe?g$/i.test(n))) {
    const name = "o1-" + f.replace(/^O1_/i, "").replace(/\.jpe?g$/i, "").toLowerCase() + ".webp";
    await sharp(path.join(O1, f)).webp({ quality: 82 }).toFile(path.join(gic, name));
  }

  const slugs = [
    "jjr-transportation", "convertboost-ai", "workers", "motionforge", "fragrise",
    "good-idea-cargo-ads", "gfs-ads", "cleanpro",
  ];
  const manifest: Record<string, Entry[]> = {};
  for (const slug of slugs) {
    const dir = path.join(WORK, slug);
    const files: string[] = [];
    const walk = (d: string) => {
      for (const n of fs.readdirSync(d)) {
        const p = path.join(d, n);
        if (fs.statSync(p).isDirectory()) walk(p);
        else files.push(path.relative(PUBLIC, p).split(path.sep).join("/"));
      }
    };
    walk(dir);
    const entries: Entry[] = [];
    for (const file of files.sort()) {
      const base = path.basename(file);
      // fragrise: only screenshots belong to this task
      if (slug === "fragrise" && !/^(desktop|mobile)-/.test(base)) continue;
      const abs = path.join(PUBLIC, file);
      if (file.endsWith(".jpg") && base.startsWith("ad-")) continue; // posters
      if (file.endsWith(".pdf")) entries.push({ file, width: 0, height: 0, kind: "pdf" });
      else if (file.endsWith(".mp4")) {
        const poster = file.replace(/\.mp4$/, ".jpg");
        const m = await sharp(path.join(PUBLIC, poster)).metadata();
        entries.push({ file, width: m.width!, height: m.height!, kind: "video", poster });
      } else {
        const m = await sharp(abs, { density: 96 }).metadata();
        entries.push({ file, width: m.width!, height: m.height!, kind: "image" });
      }
    }
    manifest[slug] = entries;
  }
  fs.writeFileSync(path.join(WORK, "manifest.task2.json"), JSON.stringify(manifest, null, 2) + "\n");
  console.log(Object.entries(manifest).map(([k, v]) => `${k}: ${v.length}`).join("\n"));
}
main();
