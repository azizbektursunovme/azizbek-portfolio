# Portfolio + CV Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Azizbek Tursunov's portfolio as a truthful "Frontend Developer & Brand Designer" site (design direction "Ledger": editorial bento + case studies), regenerate his CV PDF from it, and deploy the DAVR GROUP site that it links to.

**Architecture:** Keep the Next.js App Router app with the `[lang]` segment. All project, profile and experience content moves to typed data files (`data/*.ts`) using a `Localized<T>` type (EN required; RU/UZ optional and filled in the last task). The home page is a set of section components fed from that data. A single case-page route `/[lang]/work/[slug]` renders optional web/brand/ads blocks. Assets are collected into `public/work/<slug>/` by scripts.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4 (stable), `motion` (`motion/react`), `next/font`, Vitest (content and unit tests), Playwright (`@playwright/test` for e2e and screenshots, `@axe-core/playwright` for a11y), `ffmpeg-static` (video compression; there's no system ffmpeg).

**Spec:** `docs/superpowers/specs/2026-11-23-portfolio-rebuild-design.md` (research notes: `docs/superpowers/specs/2026-11-23-research-notes.md`)

**Paths:** The project root (P) is `C:\Users\group\OneDrive\Desktop\azizbek-portfolio-main\azizbek-portfolio-main`. All file paths below are relative to P unless they're absolute.

## Global Constraints

- Title: `Frontend Developer & Brand Designer`. Tagline: `Websites, brand identities, and the ads that sell them.` Status: `IT department @ GFS Group LLC · Tashkent` + `Open to freelance`.
- Truthfulness: every claim must trace to the spec's §6–§7 and the user answers. The forbidden strings anywhere in `app/`, `components/`, `data/` and `i18n/`, and in the rendered HTML, are `Lead Brand & Product Designer`, `Grant Invest`, `Junior UI Designer`, `CREATIVE STUDIO`, `UI/UX Designer`, `Switzerland minimalism`, `Â©`, `[USDOT`, `[MC number`, `with a friend`.
- JJR and DAVR context: `Delivered at GFS Group`. Hirara and 8iz context: `Two-person startup, built in collaboration`. Fragrise role: `Brand identity + website design`.
- 8iz: `liveStatus: "soon"`, and no link is rendered to 8iz.uz. Hirara: link `https://hirara.uz`.
- GFS redesigns are a links-only list (6 links). There's no case page and no tile, and Night Haul isn't shown.
- Good Idea Cargo ads: no CPL or lead counts. The hook rate of 39.9% may be shown.
- Languages: Uzbek C2 (native), English B2, Russian A2.
- Colors: paper `#F4F1EA`, ink `#151515`, muted `#6B6660`, rule `#DCD6C8`, accent `#C8442B`, green `#2D4B3F`. Body text must reach WCAG AA contrast.
- Fonts: Instrument Serif (display), Satoshi (body, self-hosted woff2), JetBrains Mono (labels). Load them all via `next/font`, with no CSS `@import` of remote fonts.
- No `<iframe>`, no `cursor: none`, no CustomCursor, and no blocking preloader.
- Videos: ≤4 MB each, with a poster image and `preload="none"`. Autoplay is muted and only in view, and never under `prefers-reduced-motion`.
- English first. RU/UZ fall back to EN until Task 16. Translation happens **last**.
- Push to GitHub and deploy only where the task says so. The portfolio deploy (Task 17) needs the user's explicit go-ahead in chat.
- Git: work on branch `rebuild-2026` and commit after each task.

## Review Focus

1. **Mobile 390px.** No horizontal overflow, the nav opens and closes, and bento tiles stack. Test: `e2e/mobile.spec.ts` (Task 6, extended in Task 11).
2. **Unknown routes.** `/en/work/nope` → 404 page, and `/de` → 404 or redirect to `/en`, never a 500. Test: `e2e/routes.spec.ts` (Task 12).
3. **Old shared URLs.** `/en/projects/cleanpro-branding` (and the other old ids) → 308 redirect to the matching `/en/work/<slug>`, or to `/en#branding` when nothing matches. Test: `e2e/routes.spec.ts` (Task 12).
4. **Reduced motion or no JS.** Content must not stay at `opacity: 0` when animations don't run. Test: `e2e/motion.spec.ts`, with `reducedMotion: 'reduce'` and with JS disabled, asserts that the hero title and the first bento tile are visible (Task 6).
5. **"Not live" projects.** With `liveStatus !== "live"`, no anchor to the live URL is rendered anywhere (card, tile or case page). Test: `tests/content.test.ts` plus `e2e/links.spec.ts` (Tasks 4 and 12).

---

## Phase 0: Baseline

### Task 1: Git baseline and tooling

**Files:**
- Modify: `package.json`, `app/layout.tsx`, `app/[lang]/layout.tsx`, `components/Hero.tsx`, `components/Preloader.tsx`
- Create: `vitest.config.ts`, `playwright.config.ts`, `tests/smoke.test.ts`, `e2e/smoke.spec.ts`, `.gitignore` (verify it exists)

**Interfaces:**
- Produces: the scripts `npm run test` (vitest run), `npm run test:e2e` (playwright test, with `webServer` set to `npm run build && npm run start`, port 3100) and `npm run build`. The branch `rebuild-2026`.

- [ ] **Step 1:** Clone `https://github.com/azizbektursunovme/azizbek-portfolio` into the scratchpad and diff it against P, excluding `node_modules`, `.next` and `docs`. If they differ, report the differing files to the orchestrator before continuing.
- [ ] **Step 2:** In P, run `git init`, add `origin` as that repo, `git fetch`, then `git checkout -b rebuild-2026` based on `origin/main`. Keep the P working-tree files and commit the diff as `chore: sync local copy` if Step 1 found any. Add `docs/` in a `docs: rebuild spec and plan` commit.
- [ ] **Step 3:** Upgrade `tailwindcss` and `@tailwindcss/postcss` to the latest stable 4.x. Replace `framer-motion` with `motion`, then update imports to `motion/react`. Add the devDependencies `vitest`, `@playwright/test`, `@axe-core/playwright`, `ffmpeg-static` and `tsx`, and run `npx playwright install chromium`.
- [ ] **Step 4:** Write `tests/smoke.test.ts`, which asserts `1 + 1 === 2`, to prove vitest runs. Write `e2e/smoke.spec.ts`, which asserts that `GET /en` returns 200 and contains `Azizbek`.
- [ ] **Step 5:** Fix the existing defects:
  - Strip the UTF-8 BOMs from `Hero.tsx` and `Preloader.tsx`.
  - Replace `PORTFOLIO Â© 2026` with `©`.
  - Remove the duplicate `globals.css` import, so it's imported only in `app/[lang]/layout.tsx`.
- [ ] **Step 6:** Run `npm run build && npm run test && npm run test:e2e`. Expected: all pass.
- [ ] **Step 7:** Commit `chore: tooling baseline (tailwind stable, motion, vitest, playwright)`.

---

## Phase 1: Assets and side deliverables

Tasks 2–5 are independent of each other and of Tasks 6–7, so run them in parallel. Each writes only into its own `public/work/<slug>/` folders and `scripts/` file.

### Task 2: Asset collection and screenshot capture

**Files:**
- Create: `scripts/capture-screenshots.ts`, `scripts/compress-videos.ts`, `public/work/{jjr-transportation,convertboost-ai,workers,motionforge,fragrise,good-idea-cargo-ads,gfs-ads,cleanpro,silk-road}/…`, `public/work/manifest.json`
- Test: `tests/assets.test.ts`

**Interfaces:**
- Produces: `public/work/manifest.json` shaped as `Record<slug, { file: string; width: number; height: number; kind: "image" | "video" | "pdf"; poster?: string }[]>`. Task 4 reads it to fill the `Media` dimensions. File naming is `desktop-1.webp`, `mobile-1.webp`, `logo-*.svg|png`, `guide.pdf` and `ad-*.mp4` with `ad-*.jpg` posters.

- [ ] **Step 1:** Write `tests/assets.test.ts`. For every entry in `manifest.json`, it asserts that the file exists under `public/` and that every `.mp4` is ≤ 4 * 1024 * 1024 bytes and has an existing `poster`.
- [ ] **Step 2:** Run `npm run test -- assets`. Expected: FAIL, because there's no manifest yet.
- [ ] **Step 3:** Implement `scripts/capture-screenshots.ts`. It takes a list of `{ slug, url }`. For each, it opens the URL with Playwright at 1440×900 (viewport capture plus a full-page capture) and at 390×844 (viewport), then writes WebP (quality 82, using `sharp` from Next's dependency) to `public/work/<slug>/`. The URLs are:
  - `https://jjr-transportation-website.vercel.app`
  - `https://convertboost-ai.vercel.app`
  - `https://wrkrs.uz`
  - `https://motionforge-dun.vercel.app`
  - `https://fragrise.uz`

  If a site fails to load, log it and continue.
- [ ] **Step 4:** Copy the brand assets. Copy only what's listed here and keep ≤ 8 files per brand:
  - **JJR:** from `C:\Users\group\Documents\jjr-transportation\brand-kit\` take the logo SVGs (primary and symbol), `05-Brand-Guide.pdf` as `guide.pdf`, `04-Fleet\trailer-mockup.png` and `Brand-Preview.png`.
  - **Good Idea Cargo:** `C:\Users\group\OneDrive\Desktop\good-idea-cargo-logo.svg` and `good-idea-cargo-logo-square-1080.png`.
  - **CleanPro:** move `public/cleanpro-logobranding/*` to `public/work/cleanpro/`.
  - **Fragrise:** take `C:\Users\group\OneDrive\Desktop\azizbek-portfolio-main\assets-staging\fragrise\brand\*.svg` and `og-image.jpg`.
- [ ] **Step 5:** Implement `scripts/compress-videos.ts` using `ffmpeg-static`, with H.264 CRF 28, a max width of 720 and no audio. The 9:16 creatives get a 1080p-to-720 scale. Each video gets a JPG poster from its first frame. The inputs are:
  - `C:\Users\group\OneDrive\Desktop\GoodIdeaCargo_OwnerOperator_Ad_9x16.mp4` → `good-idea-cargo-ads/ad-a1-9x16.mp4`
  - `GoodIdeaCargo_OwnerOperator_Ad_4x5.mp4` → `ad-a1-4x5.mp4`
  - `GoodIdeaCargo_A2_88math_v2_9x16.mp4` → `ad-a2-9x16.mp4`
  - `GoodIdeaCargo_O1_WhoWeAre\*.jpg` → `o1-*.webp` (images, no compression script)
  - `C:\Users\group\Downloads\GFS_OwnerOperator_Ad_v3_9x16.mp4` → `gfs-ads/ad-gfs-9x16.mp4`
- [ ] **Step 6:** Write `manifest.json`, with dimensions read via `sharp` or ffprobe output. Run `npm run test -- assets`. Expected: PASS.
- [ ] **Step 7:** Commit `feat(assets): collect brand assets, screenshots, compressed ad videos`.

### Task 3: DAVR GROUP deploy

**Files:** these live outside P, in `C:\Users\group\Documents\davr-group`.

**Interfaces:**
- Produces: the live URL `https://<project>.vercel.app`, plus screenshots and brand assets in `P/public/work/davr-group/` added to `manifest.json`, using the same naming as Task 2.

- [ ] **Step 1:** Check `git -C C:\Users\group\Documents\davr-group status` is clean. Run `gh repo create azizbektursunovme/davr-group-website --private --source C:\Users\group\Documents\davr-group --push` (the user approved this).
- [ ] **Step 2:** Run `npx vercel whoami`. If you're not logged in, **stop and ask the orchestrator**: the user must run `npx vercel login`, and you must never handle credentials. Then, from `web/`, run `npx vercel --prod --yes` with project name `davr-group-website`. Use the output directory `out` if the build is a static export.
- [ ] **Step 3:** Verify the deployed URL returns 200 and the home page renders. Placeholders are expected and accepted by the user.
- [ ] **Step 4:** Capture screenshots with `scripts/capture-screenshots.ts` (from Task 2, or a local copy of the same approach if Task 2 isn't merged yet). Copy the brand assets:
  - `brand-kit\01-Logo\` primary SVG and symbol SVG
  - `05-Brand-Guide.pdf` → `guide.pdf`
  - `04-Fleet\trailer-mockup.png`
  - `Brand-Preview.png`
- [ ] **Step 5:** Report the URL to the orchestrator. Commit the assets in P as `feat(assets): DAVR GROUP screenshots and brand kit`.

### Task 5: Hirara and 8iz screenshots

**Interfaces:**
- Produces: `public/work/hirara/{desktop,mobile}-*.webp` and `public/work/8iz/{desktop,mobile,look}-*.webp`, added to `manifest.json`.

- [ ] **Step 1 (Hirara):** Find an existing local clone; search `C:\Users\group\Projects`, `C:\Users\group\Documents` and the Desktop for a folder containing `.openai/hosting.json` or a `package.json` named hirara. If there isn't one, run `gh repo clone Alikuloff/hirara` into `C:\Users\group\Projects\hirara`. It needs Node ≥ 22, but the system has 20.18, so use `npx -y node@22` or report it as blocked. Run `npm install`, apply the local D1 migrations as its README/package scripts describe, then `npm run dev`.
- [ ] **Step 2 (Hirara):** Capture the landing page, the merchant dashboard, the storefront, a bio page and the Ilgich store template at 1440 and 390. Don't push anything to the Hirara repo. If it needs secrets or login you can't satisfy within 30 minutes of effort, stop and report "fallback: domain only".
- [ ] **Step 3 (8iz):** Extract `C:\Users\group\OneDrive\Desktop\8iz\8iz-redesign\8iz-dizayn.zip` to the scratchpad, serve it with `npx serve`, and capture the home page plus 2 product views at 1440 and 390. Also copy 3 `look-on/*.webp` mockups as `look-*.webp`.
- [ ] **Step 4:** Commit `feat(assets): Hirara and 8iz screenshots`.

### Task 5b: Fragrise brand kit

**Files:**
- Create: `public/work/fragrise/{lockup-light.svg,lockup-dark.svg,palette.svg,app-social.webp,app-og.webp,app-stream.webp}`, `scripts/fragrise-kit.html` (a source page rendered to images)

**Interfaces:**
- Produces: the files above, plus these palette tokens for Task 4: `#080808` Black, `#F5F4F0` Cream, `#EE343E` Signal Red, `#151517` Surface, `#A4A4AB` Muted. The secondary set is cyan `#24D3F6` and lime `#C6FF3D`, included only if you see them on the live site screenshots `assets-staging/fragrise/full-1440.png`. Type: Chakra Petch (display), Barlow (body).

- [ ] **Step 1:** Look at `assets-staging/fragrise/hero-1440.png` and `full-1440.png` to confirm the wordmark style. The hero shows "FRAGRISE" in a bold grotesk next to the eagle mark.
- [ ] **Step 2:** Build the lockup SVGs (mark plus wordmark, on cream and on black) and a palette sheet. Then make 3 application mockups as an HTML page rendered by Playwright to WebP: an Instagram tournament post 1080×1350, an OG card 1200×630 and a stream overlay 1920×1080. Use only the recovered mark, fonts and palette.
- [ ] **Step 3:** Add them to `manifest.json` and commit `feat(assets): Fragrise brand kit`.

---

## Phase 2: Foundation code

### Task 4: Content model and data

**Files:**
- Create: `data/types.ts`, `data/profile.ts`, `data/experience.ts`, `lib/localize.ts`, `tests/content.test.ts`
- Replace: `data/projects.ts`

**Interfaces:**
- Produces:
```ts
// data/types.ts
export type Locale = "en" | "ru" | "uz";
export type Localized<T = string> = { en: T; ru?: T; uz?: T };
export type Discipline = "web" | "brand" | "ads";
export type LiveStatus = "live" | "soon" | "none";
export interface Media { src: string; width: number; height: number; alt: Localized; kind: "image" | "video"; poster?: string }
export interface BrandBlock { logos: Media[]; palette: { name: string; hex: string }[]; type: { name: string; role: string }[]; applications: Media[]; guidePdf?: string }
export interface WebBlock { desktop: Media[]; mobile: Media[]; video?: Media }
export interface AdsBlock { objective: Localized; creatives: Media[]; tools: string[]; facts: Localized<string[]> }
export interface CaseStudy { brief: Localized; whatIDid: Localized<string[]>; decisions?: Localized<string[]>; result: Localized; web?: WebBlock; brand?: BrandBlock; ads?: AdsBlock }
export interface Project {
  slug: string; title: string; client: string; context?: Localized; year: string;
  disciplines: Discipline[]; summary: Localized; role: Localized; stack: string[];
  links: { live?: string; liveStatus: LiveStatus; github?: string };
  cover: Media; featured?: 1 | 2 | 3 | 4 | 5 | 6; caseStudy?: CaseStudy;
}
export interface ArchiveItem { src: string; width: number; height: number; alt: Localized; label: string; year: string }
// lib/localize.ts
export function tr<T>(value: Localized<T>, locale: Locale): T; // falls back to en
// data/projects.ts
export const projects: Project[];
export const redesignLinks: { name: string; url: string }[];
export const archive: ArchiveItem[];
export function getProject(slug: string): Project | undefined;
export function byDiscipline(d: Discipline): Project[];
export function featuredProjects(): Project[]; // sorted by featured 1..6
// data/profile.ts
export const profile: { name: string; title: string; tagline: Localized; status: Localized; openTo: Localized; bio: Localized<string[]>; email: string; telegram: string; instagram: string; linkedin: string; cvPath: "/Azizbek_Tursunov_CV.pdf"; languages: { name: string; level: string }[]; education: { school: string; detail: string; years: string }[]; tools: { group: "Dev" | "Design" | "Growth & AI"; items: string[] }[]; clientMarks: { name: string; src: string }[] };
// data/experience.ts
export const experience: { company: string; role: Localized; years: string; points: Localized<string[]>; showOnSite: boolean }[];
```
- Consumes: `public/work/manifest.json` (Tasks 2, 3, 5, 5b). Where an asset isn't there yet, use a `cover` pointing to an existing file and mark it `// TODO(asset)`. The content test fails on any `TODO(asset)` left at the end of Phase 3.

- [ ] **Step 1:** Write `tests/content.test.ts` with these tests:
  - `slugs are unique`
  - `featured ranks 1..6 used exactly once`, with the ranks being jjr-transportation 1, davr-group 2, hirara 3, fragrise 4, 8iz 5, good-idea-cargo-ads 6
  - `every Media.src exists in public/`
  - `non-live projects have no live url`: `liveStatus !== "live"` ⇒ `links.live === undefined`
  - `8iz is soon`
  - `hirara live url is https://hirara.uz`
  - `jjr and davr context is "Delivered at GFS Group"`
  - `hirara and 8iz context is "Two-person startup, built in collaboration"`
  - `fragrise role en is "Brand identity + website design"`
  - `redesignLinks has 6 entries` (GFS Group v1, GFS Group v2, GFS Express, Good Idea Cargo, Lion King, T-Logistics, with the GitHub Pages URLs from the research notes)
  - `no forbidden strings` (Global Constraints list), scanning `data/`, `components/`, `app/` and `i18n/`
  - `experience matches CV`: companies in order GFS Group LLC, Freelance & startups, Ijarachi, UIC Games, Nuqta & XM Pro, Grand Invest, PDP School, Kinder; Kinder and PDP School have `showOnSite: false`
  - `languages`: Uzbek C2, English B2, Russian A2
  - `tr falls back to en`
- [ ] **Step 2:** Run `npm run test -- content`. Expected: FAIL.
- [ ] **Step 3:** Write the data. The projects are those in spec §6, in this order:
  - jjr-transportation [web, brand]
  - davr-group [web, brand]
  - hirara [web]
  - fragrise [web, brand]
  - 8iz [web]
  - good-idea-cargo-ads [ads]
  - convertboost-ai [web]
  - workers [web]
  - motionforge [web]
  - silk-road [web], `liveStatus: "none"`. The spec allows a Vercel deploy, but it's skipped to keep scope tight; the user can deploy it later.
  - cleanpro [brand]
  - gfs-ads [ads]

  Copy comes from the spec §6–§7 and the research notes, in English only, written plainly and with no invented outcomes. Where there's no measurable result, `result` says what was delivered. Move the old `public/images-portfolio/*` items into `archive`, with labels taken from the old projects' titles.
- [ ] **Step 4:** Run `npm run test -- content`. Expected: PASS, except for any asset tests waiting on Phase 1. List those to the orchestrator.
- [ ] **Step 5:** Commit `feat(data): truthful typed content model`.

### Task 6: Design system and layout shell

Suggested model: opus. It sets the visual quality bar, so use the `frontend-design` skill.

**Files:**
- Modify: `app/globals.css` (Tailwind `@theme` tokens), `app/[lang]/layout.tsx`, `components/Header.tsx`, `components/Footer.tsx`
- Create: `app/fonts.ts`, `app/fonts/Satoshi-Variable.woff2` (downloaded from Fontshare, free license), `components/ui/{Container,Section,Tag,Button,Reveal}.tsx`, `e2e/motion.spec.ts`, `e2e/mobile.spec.ts`
- Delete: `components/CustomCursor.tsx`, `components/Preloader.tsx`, `components/Magnetic.tsx`, `components/BackToTop.tsx` (keep BackToTop only if it's restyled; your call)

**Interfaces:**
- Produces:
  - `Section({ id, eyebrow, title, children })`, which renders `<section id>` with the eyebrow in mono and the title in Instrument Serif.
  - `Reveal({ children, delay? })`, which uses `motion/react` `whileInView`. It renders children visible when `useReducedMotion()` is true, and its SSR markup must be visible without JS: use the CSS-class approach `data-reveal`, which only hides under `html.js`.
  - `Tag({ children })`.
  - `Button({ href, variant: "primary" | "ghost", external? })`. External links get `target="_blank" rel="noopener noreferrer"`.
  - `Container`.
  - Header nav items, in order: `Websites #websites`, `Branding #branding`, `Ads & Content #ads`, `About #about`, `Contact #contact`, plus the language switch and a `Download CV` button pointing to `profile.cvPath`.

- [ ] **Step 1:** Write `e2e/motion.spec.ts`. With `reducedMotion: "reduce"` and with `javaScriptEnabled: false`, the `h1` and `[data-testid=bento-tile]:first-child` are visible. The bento assertion is skipped until Task 8 using `test.fixme`, and Task 8 removes the fixme.
- [ ] **Step 2:** Write `e2e/mobile.spec.ts`. At 390×844, `document.documentElement.scrollWidth <= 390`, and the nav menu button opens a menu listing all 5 nav items.
- [ ] **Step 3:** Implement the tokens, fonts, ui primitives, Header and Footer. The footer shows `© 2026 Azizbek Tursunov` plus the email and socials from `profile`. Update the metadata `title` to `Azizbek Tursunov — Frontend Developer & Brand Designer`.
- [ ] **Step 4:** Run `npm run build && npm run test:e2e -- motion mobile`. Expected: PASS.
- [ ] **Step 5:** Commit `feat(ui): Ledger design system, header, footer`.

---

## Phase 3: Sections

Tasks 7–11 each own one component file. The orchestrator wires them into `app/[lang]/page.tsx` after each one merges, so implementers must not edit `page.tsx`. Each component takes `{ locale: Locale }`.

### Task 7: Hero

**Files:** Replace `components/Hero.tsx`. Test: `e2e/home.spec.ts` (create it).

- [ ] **Step 1:** Test `hero shows identity`. The `h1` contains `Azizbek Tursunov`; the page contains `Frontend Developer & Brand Designer`, the tagline and `GFS Group LLC`; the `See work` link points to `#work`; the `Download CV` link points to `/Azizbek_Tursunov_CV.pdf`; and 5 or more client marks have non-empty `alt`.
- [ ] **Step 2:** Run it. Expected: FAIL.
- [ ] **Step 3:** Implement `Hero({ locale })`. Within the first viewport at 1440×900 it shows the name, title, tagline, status, CTAs and the client-mark strip (JJR, DAVR, Good Idea Cargo, Fragrise, 8iz, GFS Group, labelled `Brands I've built for`). Make it creative through typography and layout, not by hiding content.
- [ ] **Step 4:** Run it. Expected: PASS. Commit `feat(home): hero`.

### Task 8: Selected work bento

**Files:** Create `components/WorkBento.tsx`. Test: extend `e2e/home.spec.ts` and remove the fixme in `e2e/motion.spec.ts`.

- [ ] **Step 1:** Test `bento shows 6 featured`. `#work [data-testid=bento-tile]` has count 6, in `featuredProjects()` order. Each tile has an `img`/`video` with `alt` and a link to `/{locale}/work/{slug}`.
- [ ] **Step 2:** Implement `WorkBento({ locale })` as an asymmetric bento: tiles 1 and 2 are large, and on mobile it's a single column. Each tile shows the cover, title, discipline tags and the `context` line.
- [ ] **Step 3:** Run the tests and commit `feat(home): selected work bento`.

### Task 9: Websites and Branding sections

**Files:** Create `components/WebsitesSection.tsx` and `components/BrandingSection.tsx`. Delete `components/SelectedWebsites.tsx` and `components/FeaturedWorks.tsx`.

- [ ] **Step 1:** Write the tests:
  - `websites lists web projects`: `#websites [data-testid=site-card]` count equals `byDiscipline("web").length`. Cards with `liveStatus === "live"` have a `Visit site` external link, and the 8iz card shows `Launching soon` with no link.
  - `redesign links`: `#websites [data-testid=redesign-link]` count is 6.
  - `branding wall`: `#branding [data-testid=brand-logo]` count equals `byDiscipline("brand").length`, and each links to its case page.
- [ ] **Step 2:** Implement both sections. Site cards show a screenshot, title, one-line summary, role, stack tags and links. The redesign list is a compact row titled `Redesign concepts for GFS Group companies`. The brand wall is monochrome, showing colour on hover/focus, with a caption under each logo.
- [ ] **Step 3:** Run the tests and commit `feat(home): websites and branding sections`.

### Task 10: Ads & Content section

**Files:** Create `components/AdsSection.tsx` and `components/PhoneVideo.tsx`.

**Interfaces:** `PhoneVideo({ media: Media })`. It plays muted, looping and `playsInline` only while it's in view (IntersectionObserver), uses `preload="none"` with the poster, and never autoplays under reduced motion.

- [ ] **Step 1:** Write the tests:
  - `ads section`: `#ads video` has ≥ 3 entries, each with a `poster` and `preload="none"`.
  - `no cpl`: the page text doesn't match `/CPL|cost per lead|\$\d+(\.\d+)? per lead/i`.
  - `ai tools strip`: it contains `Higgsfield`, `Google Flow`, `Seedance` and `Remotion`.
  - `archive`: `#ads [data-testid=archive-item]` count equals `archive.length`.
- [ ] **Step 2:** Implement it. It shows the Good Idea Cargo campaign card (objective, creatives, "Made at GFS Group"), the GFS ad, the AI workflow strip, and an `Earlier work` archive grid that opens a lightbox or links to the image.
- [ ] **Step 3:** Run the tests and commit `feat(home): ads & content`.

### Task 11: About and Contact

**Files:** Replace `components/About.tsx` and `components/Contact.tsx`. Delete `components/Skills.tsx` and `components/Services.tsx`, and fold their useful parts into About.

- [ ] **Step 1:** Write the tests:
  - `about timeline`: `#about [data-testid=xp-item]` count equals `experience.filter(e => e.showOnSite).length`, and its first item contains `GFS Group LLC` and `2026`.
  - `languages shown`: the page contains `Uzbek`, `C2`, `English`, `B2`, `Russian` and `A2`.
  - `contact links`: `mailto:azizbektursunov.me@gmail.com` and the Telegram, Instagram and LinkedIn hrefs come from `profile`.
  - Extend `e2e/mobile.spec.ts`: there's no overflow with all sections present.
- [ ] **Step 2:** Implement it. About contains the bio, timeline, tools grouped as Dev / Design / Growth & AI, education and languages. Contact contains a large CTA, copy-email, socials and the CV download.
- [ ] **Step 3:** Wire up the home page: Hero, WorkBento, WebsitesSection, BrandingSection, AdsSection, About, Contact. This is the orchestrator's step.
- [ ] **Step 4:** Run `npm run build && npm run test && npm run test:e2e`, then commit `feat(home): about, contact, page assembly`.

### Task 12: Case study pages and redirects

**Files:**
- Create: `app/[lang]/work/[slug]/page.tsx`, `components/case/{CaseHeader,WebBlockView,BrandBlockView,AdsBlockView}.tsx`, `app/[lang]/not-found.tsx`, `e2e/routes.spec.ts`, `e2e/links.spec.ts`
- Delete: `app/[lang]/projects/`
- Modify: `next.config.ts` (redirects)

**Interfaces:** `generateStaticParams()` covers locales × the `projects` that have `caseStudy`. `dynamicParams = false`.

- [ ] **Step 1:** Write the tests:
  - `case pages render`: for each project with a caseStudy, `/en/work/{slug}` returns 200 and shows the title, client, role and brief.
  - `unknown slug 404`: `/en/work/nope` returns 404.
  - `unknown lang`: `/de` returns 404 or redirects to `/en`.
  - `old urls redirect`: `/en/projects/cleanpro-branding` returns 308 to `/en/work/cleanpro`, and the other 7 old ids return 308 to `/en#ads`.
  - `links.spec`: on the home page and every case page, no `a[href*="8iz.uz"]` exists, and every `a[target=_blank]` has `rel` containing `noopener`.
- [ ] **Step 2:** Implement the case page. It has a meta bar (client, context, year, role, stack, links) and the sections Brief, What I did, Key decisions and Result, followed by whichever optional blocks the project has:
  - Web: desktop and mobile screenshots.
  - Brand: logos, palette swatches with hex values, type pairing, applications and the guide PDF download.
  - Ads: creatives via `PhoneVideo`, objective, tools and facts.

  It ends with Next/Previous project navigation.
- [ ] **Step 3:** Run the tests and commit `feat(work): case study pages, 404, legacy redirects`.

### Task 13: SEO and metadata

**Files:** `app/[lang]/layout.tsx`, `app/[lang]/opengraph-image.tsx`, `app/icon.svg`, `app/sitemap.ts`, `app/robots.ts`, and `app/[lang]/work/[slug]/opengraph-image.tsx`.

- [ ] **Step 1:** Write the tests:
  - `metadata`: `/en` has `<link rel=canonical href="https://azizbektursunov.uz/en">`, hreflang alternates for en, ru, uz and x-default, `og:image`, and `<link rel=icon>`.
  - `sitemap`: `/sitemap.xml` lists every locale × (home + case pages).
  - `robots`: `/robots.txt` returns 200.
- [ ] **Step 2:** Implement it with `metadataBase: new URL("https://azizbektursunov.uz")`, a per-locale description using the new title, and keywords without "Swiss" or "Switzerland".
- [ ] **Step 3:** Run the tests and commit `feat(seo): metadata, og images, sitemap, robots`.

---

## Phase 4: CV, QA, translations, deploy

### Task 14: CV page and PDF

**Files:** Create `app/cv/page.tsx` (English only, print CSS, A4) and `scripts/export-cv.ts`. Output: `public/Azizbek_Tursunov_CV.pdf`.

- [ ] **Step 1:** Write the tests:
  - `cv page`: `/cv` contains the title, `GFS Group LLC — IT Department`, the projects JJR Transportation, DAVR GROUP, Hirara, 8iz (with `built in collaboration`), Fragrise and ConvertBoost AI, the education entries Renessans Ta'lim Universiteti and PDP University, and the languages.
  - Vitest `cv pdf`: the file exists, and its page count is ≤ 2 via `pdf-lib` (add it as a dev dependency).
- [ ] **Step 2:** Implement the CV page from `profile` and `experience`, including the `showOnSite: false` entries under "Additional", plus a QR code to `https://azizbektursunov.uz` using the `qrcode` package as an SVG. Write `scripts/export-cv.ts`, which builds and starts the app, then uses Playwright `page.pdf({ format: "A4", printBackground: true })`.
- [ ] **Step 3:** Run the export and the tests, then send the PDF to the user via the orchestrator for review. Commit `feat(cv): regenerated CV page and PDF`.

### Task 15: Quality pass

- [ ] **Step 1:** Add `e2e/a11y.spec.ts`. `@axe-core/playwright` must show no `serious` or `critical` violations on `/en`, `/en/work/jjr-transportation`, `/en/work/fragrise` and `/cv`.
- [ ] **Step 2:** Run Lighthouse (`npx lighthouse http://localhost:3100/en --preset=desktop` and mobile) and fix issues until Performance, Accessibility and SEO are each ≥ 90.
- [ ] **Step 3:** Take full-page screenshots of `/en` at 1440 and 390, plus 3 case pages, for orchestrator and user visual review. Confirm there are no `TODO(asset)` markers left.
- [ ] **Step 4:** Commit `chore: a11y and performance pass`. Then run the whole-branch review with the requesting-code-review skill and fix any findings.

### Task 16: RU/UZ translations (last; user's decision)

- [ ] **Step 1:** Add the test `translations complete`. Every `Localized` value in `data/` has `ru` and `uz`, and the `i18n/translations/{ru,uz}.json` keys equal the `en.json` keys.
- [ ] **Step 2:** Translate all copy. Keep proper nouns, the stack and company names in English. Uzbek uses Latin script.
- [ ] **Step 3:** Run the tests, then send the user the RU/UZ text for review (the user is a native Uzbek speaker). Apply their corrections and commit `feat(i18n): ru and uz translations`.

### Task 17: Deploy the portfolio (needs the user's go-ahead)

- [ ] **Step 1:** Ask the user in chat for the go-ahead to push `rebuild-2026` and deploy. Without an explicit yes, stop here.
- [ ] **Step 2:** Push the branch, open a PR to `main` on `azizbektursunovme/azizbek-portfolio`, and let Vercel build the preview. Verify the preview URL with `npm run test:e2e` against it (`BASE_URL` env).
- [ ] **Step 3:** Merge only on the user's yes.

---

## Execution notes for the orchestrator

- **Parallel waves:**
  - Wave 1 is Task 1.
  - Wave 2 is Tasks 2, 3, 5, 5b, 4 and 6 in parallel. Task 4 runs with `TODO(asset)` placeholders until the assets land; Task 6 doesn't touch data.
  - Wave 3 is Tasks 7–11 in parallel, each in its own component file; the orchestrator owns `page.tsx`.
  - Then Task 12, then Task 13, then Task 14, then Task 15, then Task 16, then Task 17.
- **Shared files across parallel tasks:** `public/work/manifest.json`. Each asset task writes `manifest.<task>.json`, and the orchestrator merges them into `manifest.json`.
- **Models:**
  - Asset and screenshot tasks (2, 3, 5): sonnet.
  - Design-sensitive tasks (5b, 6, 7, 8, 12): opus.
  - Remaining code tasks: sonnet.
  - Per-task reviewer: sonnet. Final whole-branch reviewer: opus.
- **Blockers to surface to the user:**
  - Vercel login (Task 3).
  - Hirara needing secrets (Task 5).
  - The CV PDF review (Task 14).
  - The translation review (Task 16).
  - The deploy go-ahead (Task 17).
