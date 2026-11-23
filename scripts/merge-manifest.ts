import fs from "node:fs";
import path from "node:path";

const WORK = path.join(process.cwd(), "public", "work");
type Entry = { file: string; [k: string]: unknown };

const parts = fs
  .readdirSync(WORK)
  .filter((n) => /^manifest\..+\.json$/.test(n) && n !== "manifest.json")
  .sort();

const merged: Record<string, Entry[]> = {};
for (const p of parts) {
  const data = JSON.parse(fs.readFileSync(path.join(WORK, p), "utf8")) as Record<string, Entry[]>;
  for (const [slug, entries] of Object.entries(data)) {
    const list = (merged[slug] ??= []);
    for (const e of entries) if (!list.some((x) => x.file === e.file)) list.push(e);
  }
}
fs.writeFileSync(path.join(WORK, "manifest.json"), JSON.stringify(merged, null, 2) + "\n");
console.log(`merged ${parts.join(", ")} -> manifest.json (${Object.keys(merged).length} slugs)`);
