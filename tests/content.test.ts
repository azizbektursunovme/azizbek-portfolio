import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, test } from "vitest";
import { archive, byDiscipline, featuredProjects, getProject, projects, redesignLinks } from "../data/projects";
import { profile } from "../data/profile";
import { experience } from "../data/experience";
import { tr } from "../lib/localize";
import type { Media, Project } from "../data/types";

const root = join(__dirname, "..");

function collectMedia(p: Project): Media[] {
  const out: Media[] = [p.cover];
  const cs = p.caseStudy;
  if (cs?.web) out.push(...cs.web.desktop, ...cs.web.mobile, ...(cs.web.video ? [cs.web.video] : []));
  if (cs?.brand) out.push(...cs.brand.logos, ...cs.brand.applications);
  if (cs?.ads) out.push(...cs.ads.creatives);
  return out;
}

describe("content model", () => {
  test("slugs are unique", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  test("featured ranks 1..6 used exactly once", () => {
    const ranks = Object.fromEntries(
      projects.filter((p) => p.featured).map((p) => [p.slug, p.featured]),
    );
    expect(ranks).toEqual({
      "jjr-transportation": 1,
      "davr-group": 2,
      hirara: 3,
      fragrise: 4,
      "8iz": 5,
      "good-idea-cargo-ads": 6,
    });
    expect(featuredProjects().map((p) => p.featured)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("every Media.src exists in public/", () => {
    const missing: string[] = [];
    const check = (src: string | undefined) => {
      if (!src) return;
      expect(src.startsWith("/")).toBe(true);
      if (!existsSync(join(root, "public", src))) missing.push(src);
    };
    for (const p of projects) {
      for (const m of collectMedia(p)) {
        check(m.src);
        check(m.poster);
      }
      check(p.caseStudy?.brand?.guidePdf);
    }
    for (const a of archive) {
      check(a.src);
      check(a.full?.src);
    }
    for (const c of profile.clientMarks) check(c.src);
    expect(missing).toEqual([]);
  });

  test("non-live projects have no live url", () => {
    for (const p of projects) {
      if (p.links.liveStatus !== "live") expect(p.links.live).toBeUndefined();
    }
  });

  test("8iz is soon", () => {
    expect(getProject("8iz")?.links.liveStatus).toBe("soon");
  });

  test("hirara live url is https://hirara.uz", () => {
    expect(getProject("hirara")?.links.live).toBe("https://hirara.uz");
  });

  test("jjr and davr context is Delivered at GFS Group", () => {
    expect(getProject("jjr-transportation")?.context?.en).toBe("Delivered at GFS Group");
    expect(getProject("davr-group")?.context?.en).toBe("Delivered at GFS Group");
  });

  test("hirara and 8iz context is the two-person startup line", () => {
    const line = "Two-person startup, built in collaboration";
    expect(getProject("hirara")?.context?.en).toBe(line);
    expect(getProject("8iz")?.context?.en).toBe(line);
  });

  test("fragrise role en is Brand identity + website design", () => {
    expect(getProject("fragrise")?.role.en).toBe("Brand identity + website design");
  });

  test("redesignLinks has 6 entries", () => {
    expect(redesignLinks.map((l) => l.name)).toEqual([
      "GFS Group v1",
      "GFS Group v2",
      "GFS Express",
      "Good Idea Cargo",
      "Lion King",
      "T-Logistics",
    ]);
    for (const l of redesignLinks) expect(l.url).toMatch(/^https:\/\/azizbektursunovme\.github\.io\//);
  });

  test("projects needing case pages have caseStudy", () => {
    for (const s of ["jjr-transportation", "davr-group", "hirara", "fragrise", "8iz", "good-idea-cargo-ads", "cleanpro"]) {
      expect(getProject(s)?.caseStudy, s).toBeDefined();
    }
  });

  test("silk-road has no live link; helpers work", () => {
    expect(getProject("silk-road")?.links.liveStatus).toBe("none");
    expect(byDiscipline("ads").map((p) => p.slug)).toEqual(["good-idea-cargo-ads", "gfs-ads"]);
    expect(getProject("nope")).toBeUndefined();
  });

  test("no forbidden strings", () => {
    const forbidden = [
      "Lead Brand & Product Designer",
      "Grant Invest",
      "Junior UI Designer",
      "CREATIVE STUDIO",
      "UI/UX Designer",
      "Switzerland minimalism",
      "Â©",
      "[USDOT",
      "[MC number",
      "with a friend",
      "Swiss",
      "Junior UI",
      "Младший UI",
      "Ведущий бренд",
      "Junior UI dizayner",
    ];
    const hits: string[] = [];
    const walk = (dir: string) => {
      if (!existsSync(dir)) return;
      for (const name of readdirSync(dir)) {
        const full = join(dir, name);
        if (statSync(full).isDirectory()) walk(full);
        else if (/\.(tsx?|json|css|mdx?)$/.test(name)) {
          // Block comments are not rendered, so they are ignored.
          const text = readFileSync(full, "utf8").replace(/\/\*[\s\S]*?\*\//g, "");
          for (const f of forbidden) if (text.includes(f)) hits.push(`${full}: ${f}`);
        }
      }
    };
    for (const d of ["app", "components", "data", "i18n"]) walk(join(root, d));
    expect(hits).toEqual([]);
  });

  test("experience matches CV", () => {
    expect(experience.map((e) => e.company)).toEqual([
      "GFS Group LLC",
      "Freelance & startups",
      "Ijarachi",
      "UIC Games",
      "Nuqta & XM Pro",
      "Grand Invest",
      "PDP School",
      "Kinder",
    ]);
    for (const e of experience) {
      expect(e.showOnSite).toBe(!["Kinder", "PDP School"].includes(e.company));
    }
  });

  test("owner-confirmed CV facts", () => {
    const by = (c: string) => experience.find((e) => e.company === c)!;
    expect(by("Freelance & startups").years).toBe("Apr – Oct 2026");
    expect(by("PDP School").role.en).toBe("Contracts Department & Assistant to the Director");
    expect(profile.linkedin).toBe("https://www.linkedin.com/in/azizbek-tursunov");
  });

  test("languages", () => {
    expect(profile.languages).toEqual([
      { name: "Uzbek", level: "C2 (native)" },
      { name: "English", level: "B2" },
      { name: "Russian", level: "A2" },
    ]);
  });

  // Enforced only when STRICT_ASSETS=1 (end of Phase 3); otherwise informational.
  test.skipIf(process.env.STRICT_ASSETS !== "1")("no TODO(asset) left", () => {
    const files = ["data/projects.ts", "data/profile.ts"];
    const todos = files.filter((f) => readFileSync(join(root, f), "utf8").includes("TODO(asset)"));
    expect(todos).toEqual([]);
  });

  test("tr falls back to en", () => {
    expect(tr({ en: "a", ru: "b" }, "ru")).toBe("b");
    expect(tr({ en: "a" }, "uz")).toBe("a");
    expect(tr({ en: "a", uz: "" }, "uz")).toBe("a");
  });
});

describe("ads & archive publishing rules", () => {
  test("no draft O1 slides (2, 3) are referenced anywhere in data", () => {
    const srcs: string[] = [];
    for (const p of projects) for (const m of collectMedia(p)) srcs.push(m.src, m.poster ?? "");
    for (const a of archive) srcs.push(a.src, a.full?.src ?? "");
    expect(srcs.filter((s) => /o1-slide[23]\b/.test(s))).toEqual([]);
    const text = readFileSync(join(root, "data", "projects.ts"), "utf8");
    expect(text).not.toMatch(/o1-slide[23]/);
  });

  test("archive uses optimised WebP only, thumbs under 300 KB", () => {
    for (const a of archive) {
      expect(a.src).toMatch(/-thumb\.webp$/);
      expect(a.full?.src).toMatch(/-full\.webp$/);
      expect(statSync(join(root, "public", a.src)).size).toBeLessThan(300 * 1024);
      expect(statSync(join(root, "public", a.full!.src)).size).toBeLessThan(600 * 1024);
    }
  });
});
