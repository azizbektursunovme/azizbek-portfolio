import { describe, expect, test } from "vitest";
import * as about from "../data/about";
import * as experience from "../data/experience";
import * as hero from "../data/hero";
import * as nav from "../data/nav";
import * as profile from "../data/profile";
import * as projects from "../data/projects";
import * as sections from "../data/sections";
import * as seo from "../data/seo";

/*
 * translations complete: every Localized value exported from data/ (the
 * component-level copy lives there too, in data/sections.ts) has ru and uz,
 * in the same shape as en. Empty is only allowed where en is empty.
 */

const modules = { about, experience, hero, nav, profile, projects, sections, seo };
const LOCALE_KEYS = new Set(["en", "ru", "uz"]);

type Found = { path: string; value: Record<string, unknown> };

function isLocalized(v: unknown): v is Record<string, unknown> {
  return (
    typeof v === "object" &&
    v !== null &&
    !Array.isArray(v) &&
    "en" in v &&
    Object.keys(v).every((k) => LOCALE_KEYS.has(k))
  );
}

function walk(v: unknown, path: string, out: Found[], seen: Set<unknown>) {
  if (typeof v !== "object" || v === null || seen.has(v)) return;
  seen.add(v);
  if (isLocalized(v)) {
    out.push({ path, value: v });
    return;
  }
  if (Array.isArray(v)) v.forEach((x, i) => walk(x, `${path}[${i}]`, out, seen));
  else for (const [k, x] of Object.entries(v)) walk(x, `${path}.${k}`, out, seen);
}

const found: Found[] = [];
for (const [name, mod] of Object.entries(modules)) {
  for (const [key, value] of Object.entries(mod)) {
    // Shared constants (e.g. one context object used by two projects) are checked once.
    walk(value, `${name}.${key}`, found, new Set());
  }
}

function problems({ path, value }: Found): string[] {
  const en = value.en;
  const out: string[] = [];
  for (const l of ["ru", "uz"] as const) {
    const v = value[l];
    if (typeof en === "string") {
      if (typeof v !== "string") out.push(`${path}.${l} missing`);
      else if (en.trim() !== "" && v.trim() === "") out.push(`${path}.${l} empty`);
    } else if (Array.isArray(en)) {
      if (!Array.isArray(v)) out.push(`${path}.${l} missing`);
      else if (v.length !== en.length) out.push(`${path}.${l} has ${v.length} items, en has ${en.length}`);
      else
        v.forEach((x, i) => {
          if (typeof x !== "string" || (String(en[i]).trim() !== "" && x.trim() === "")) out.push(`${path}.${l}[${i}] empty`);
        });
    } else {
      out.push(`${path}: unexpected en type`);
    }
  }
  return out;
}

describe("translations complete", () => {
  test("the walker finds the copy", () => {
    // Sanity check so a broken walker cannot pass vacuously.
    expect(found.length).toBeGreaterThan(250);
    expect(found.some((f) => f.path.startsWith("projects.projects") && f.path.endsWith(".alt"))).toBe(true);
    expect(found.some((f) => f.path.startsWith("sections.workCopy"))).toBe(true);
  });

  test("every Localized value in data/ has ru and uz, shaped like en", () => {
    expect(found.flatMap(problems)).toEqual([]);
  });

  test("ru is Cyrillic and uz is Latin wherever the text is translated", () => {
    const bad: string[] = [];
    for (const { path, value } of found) {
      const ru = [value.ru].flat().join(" ");
      const uz = [value.uz].flat().join(" ");
      if (/[А-Яа-яЁё]/.test(uz)) bad.push(`${path}.uz has Cyrillic`);
      // Wherever ru differs from en it must actually be Russian, not a stray copy in another language.
      if (ru !== [value.en].flat().join(" ") && /[a-z]{3,}/i.test(ru) && !/[А-Яа-яЁё]/.test(ru)) bad.push(`${path}.ru has no Cyrillic`);
    }
    expect(bad).toEqual([]);
  });

  test("Uzbek uses one apostrophe convention: ʻ (U+02BB) for oʻ/gʻ, ’ (U+2019) for the tutuq belgisi", () => {
    const bad = found
      .map(({ path, value }) => ({ path, uz: [value.uz].flat().join(" ") }))
      .filter(({ uz }) => /[oOgG]['‘’`]/.test(uz) || /ʻ(?![a-zA-Z])/.test(uz) || /(^|[^oOgG])ʻ/.test(uz))
      .map(({ path, uz }) => `${path}: ${uz}`);
    expect(bad).toEqual([]);
  });

});
