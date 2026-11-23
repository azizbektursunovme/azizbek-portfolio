import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { PDFDocument } from "pdf-lib";
import { describe, expect, it } from "vitest";
import { profile } from "../data/profile";

const pdfPath = join(process.cwd(), "public", profile.cvPath.slice(1));

describe("cv pdf", () => {
  it("exists at the path every Download CV link uses", () => {
    expect(existsSync(pdfPath)).toBe(true);
  });

  it("is A4 and at most 2 pages", async () => {
    const doc = await PDFDocument.load(readFileSync(pdfPath));
    expect(doc.getPageCount()).toBeGreaterThanOrEqual(1);
    expect(doc.getPageCount()).toBeLessThanOrEqual(2);
    // A4 = 595.28 x 841.89 pt.
    for (const page of doc.getPages()) {
      const { width, height } = page.getSize();
      expect(Math.round(width)).toBe(595);
      expect(Math.round(height)).toBe(842);
    }
  });
});
