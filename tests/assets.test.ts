import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const PUBLIC = path.join(process.cwd(), "public");
const MANIFEST = path.join(PUBLIC, "work", "manifest.json");
const MAX_VIDEO = 4 * 1024 * 1024;

type Entry = { file: string; width: number; height: number; kind: "image" | "video" | "pdf"; poster?: string };

function load(): Record<string, Entry[]> {
  expect(fs.existsSync(MANIFEST), "public/work/manifest.json must exist").toBe(true);
  return JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
}

describe("work asset manifest", () => {
  it("lists existing files, videos <= 4MB with posters", () => {
    const m = load();
    expect(Object.keys(m).length).toBeGreaterThan(0);
    for (const [slug, entries] of Object.entries(m)) {
      for (const e of entries) {
        const abs = path.join(PUBLIC, e.file);
        expect(fs.existsSync(abs), `${slug}: ${e.file} missing`).toBe(true);
        if (e.file.endsWith(".mp4")) {
          expect(fs.statSync(abs).size, `${e.file} too big`).toBeLessThanOrEqual(MAX_VIDEO);
          expect(e.poster, `${e.file} needs poster`).toBeTruthy();
          expect(fs.existsSync(path.join(PUBLIC, e.poster!)), `${e.poster} missing`).toBe(true);
        }
      }
    }
  });
});
