import { describe, expect, test } from "vitest";
import { projects } from "../data/projects";
import { labelColour } from "../components/case/BrandBlockView";

function lum(hex: string): number {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}
const ratio = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
};

describe("case page palette swatches", () => {
  const swatches = projects.flatMap((p) => p.caseStudy?.brand?.palette ?? []);

  test("there are swatches to check", () => {
    expect(swatches.length).toBeGreaterThan(10);
  });

  test.each(swatches.map((s) => [s.name, s.hex]))("%s %s: hex label reaches 4.5:1", (_name, hex) => {
    expect(ratio(hex, labelColour(hex))).toBeGreaterThanOrEqual(4.5);
  });
});
