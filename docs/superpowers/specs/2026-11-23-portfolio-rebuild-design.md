# Portfolio + CV Rebuild — Design

Date: 2026-11-23 · Owner: Azizbek Tursunov (GitHub `azizbektursunovme`) · Status: approved by user 2026-11-23

## 1. Intent

The current portfolio was filled for a job application with invented roles and dates. It now misrepresents him. Rebuild it so it says **everything about who he is today**, truthfully, for **both employers and freelance clients**:
- frontend / web developer (client sites built from zero),
- brand designer (logos + full brand kits),
- growth & content (Meta ads, Instagram content, AI video tools),
- in the IT department of GFS Group LLC (US logistics).

Update the CV PDF to match.

### Goals
- A non-technical visitor finds his work within one screen and one click.
- Every claim is traceable to the CV, GitHub, or files on disk (see §9 sources).
- Each major project has a clear case page: task → what I did → result → live link + images.
- Creative look, but clarity wins every conflict.

### Non-goals
- No blog, no CMS, no backend, no contact form backend (links only).
- Not changing the hosting stack (Next.js on Vercel).

### Anti-goals (fail even if it "works")
- Any invented title, date, metric, client or testimonial.
- Claiming repos he didn't build (e.g. `ItSoft-dev/davr-group-frontend`, ItSoft GFS frontends).
- Presenting the Good Idea Cargo Meta campaign as a success with CPL numbers (2 leads, ~$56 CPL, still learning).
- Live iframes, `cursor: none`, preloaders that hide content for >1s.
- Writing placeholder company facts (USDOT/MC numbers etc.) into the portfolio itself. The DAVR site link is fine (user's decision).

## 2. Positioning

- **Title:** Frontend Developer & Brand Designer
- **Tagline:** "Websites, brand identities, and the ads that sell them."
- **Status line:** "IT department @ GFS Group LLC · Tashkent" + "Open to freelance".
- Replace every "Graphic Designer / UI/UX Designer / Creative Studio" string (layout metadata, i18n JSON, Hero, Preloader, Header, Footer).

## 3. Approaches considered

| | Approach | Trade-off |
|---|---|---|
| A | Minimal design-engineer (paco.me, emilkowal.ski) | Fast, clean; undersells brand/visual side |
| B | Bold creative-dev, GSAP + Lenis (dennissnellenberg.com) | Most "creative"; slow to build, perf/mobile risk, hard for non-technical visitors |
| **C** | **Editorial bento + case studies** (hamishw.com, laxspace.co, abhishekjha.me) | Shows all three disciplines equally; medium effort |
| D | Keep current dark design system, only add/replace sections | Cheapest; but current hero + abstract cards are the core problem, so it keeps the weakness |

**Chosen: C** (user liked C, asked for "creative but understandable", delegated the call). D rejected because the abstract card system and name-only hero can't show real work.

## 4. Design system ("Ledger")

Builder refines with the `frontend-design` skill; these are the fixed anchors:
- **Colors:** paper `#F4F1EA`, ink `#151515`, muted `#6B6660`, rule `#DCD6C8`, accent terracotta `#C8442B`, secondary deep green `#2D4B3F`. Dark sections (e.g. Fragrise, ads reel) may invert locally. Must pass WCAG AA.
- **Type:** Instrument Serif (display headlines) + Satoshi (body/UI, already used) + JetBrains Mono (labels/meta). Self-host via `next/font` (no render-blocking `@import`).
- **Motion:** `motion/react` (rename from `framer-motion`): fade/blur reveals, bento hover, shared-element tile→case transition where cheap. Respect `prefers-reduced-motion`. Optional Lenis — builder's call, off by default.
- **Remove:** CustomCursor + `cursor:none`, Preloader (or reduce to <600ms non-blocking intro — builder's call), iframe previews.
- Tailwind: upgrade from `4.0.0-alpha.30` to stable 4.x.

## 5. Information architecture

Nav (localized EN/RU/UZ): **Websites · Branding · Ads & Content · About · Contact** + language switch + "Download CV" button.

Home (`/[lang]`), in order:
1. **Hero** — name, title, tagline, status line, CTAs ("See work", "Download CV"), strip of client marks (JJR, DAVR, Good Idea Cargo, Fragrise, 8iz, GFS Group as employer).
2. **Selected work bento** — 6 tiles with real images: JJR, DAVR, Hirara, Fragrise, 8iz, Good Idea Cargo ads. Each tile: image, name, discipline tags, opens case page.
3. **Websites** (`#websites`) — grid of cards (screenshot, name, one-liner, my role, stack, "Visit site" / "Case study").
4. **Branding** (`#branding`) — logo wall (monochrome) → brand case pages.
5. **Ads & Content** (`#ads`) — 9:16 / 4:5 creatives in phone frames, campaign description, AI workflow (tools per creative). Plus "Earlier work" archive of existing social/banner images.
6. **About** — short bio, experience timeline (from CV, §7), tools grid (incl. Meta Ads Manager, Higgsfield, Google Flow, Seedance, Remotion, Figma, Adobe, Next.js/React/TS), education, languages.
7. **Contact** — email, Telegram, Instagram, LinkedIn, CV download.

Case pages: `/[lang]/work/[slug]`. One template with optional blocks:
- Meta bar: client, year, my role, team, stack/tools, links (Live site / Brand guide PDF / GitHub if public).
- Brief → What I did → Key decisions → Result (only true outcomes; "in progress" is allowed).
- Website block: desktop + mobile screenshots, optional scroll MP4.
- Brand block: logo variants, palette tokens, type pairing, applications/mockups, guide PDF download.
- Ads block: creatives (video), targeting/objective summary, tools used.

All project data lives in one typed source (`data/projects.ts`) with per-locale strings in i18n JSON — remove the current duplication.

## 6. Content inventory

### Websites
| Slug | Project | Role / note | Link | Assets |
|---|---|---|---|---|
| jjr-transportation | JJR Transportation (US dry-van carrier) | Client work done through GFS Group: website + brand kit built from zero (Next.js 16, Tailwind 4, Web3Forms, 3 forms) | jjr-transportation-website.vercel.app | `C:\Users\group\Documents\jjr-transportation` |
| davr-group | DAVR GROUP LLC (US trucking) | Client work done through GFS Group: website + brand kit built from zero (Next.js static, three.js scene, tests) | Vercel URL after deploy (§8). Link shown even though placeholders remain; the company fills them later | `C:\Users\group\Documents\davr-group` |
| hirara | Hirara (Uzbek SaaS: Telegram shop, bio page, landings) | Two-person startup, built in collaboration (9/26 commits): Ilgich store template, order notifications, limits, fixes | hirara.uz (being connected; show the link) | screenshots from local run (§8) |
| 8iz | 8iz (Uzbek apparel brand/store) redesign | Two-person startup, built in collaboration: "steel gear-unit" design, outfit builder, print studio, 15-model catalog | 8iz.uz, hidden until the user confirms deploy ("Launching soon") | `C:\Users\group\OneDrive\Desktop\8iz` |
| fragrise | FRAGRISE (CS2 tournament platform, UZ) | Brand identity + website design (not development) | fragrise.uz | `assets-staging\fragrise` |
| gfs-redesigns | GFS Group redesign concepts: GFS Group v1/v2, GFS Express, Good Idea Cargo, Lion King, T-Logistics | Not deployed yet. **Links only**: one compact row/list on the Websites page, no case page, no bento tile. Night Haul is not shown | GitHub Pages links | none needed |
| convertboost-ai | ConvertBoost AI (AI landing-page audit SaaS) | Own product | convertboost-ai.vercel.app | screenshot |
| workers | Workers (wrkrs.uz, Tashkent rap collective) | Next.js site | wrkrs.uz | screenshot |
| motionforge | MotionForge (studio concept) | Own experiment | motionforge-dun.vercel.app | screenshot |
| silk-road | Silk Road Uzbekistan (travel guide, EN/RU/UZ) | Own project | deploy to Vercel if it builds; else screenshots only | repo |

### Branding
JJR Transportation, DAVR GROUP, Fragrise, Good Idea Cargo, CleanPro (existing assets in `public/cleanpro-logobranding`), 8iz (if brand assets exist in the 8iz folder; else website-only).
- JJR / DAVR: full brand kit already exists (guide PDF, logo variants, fleet mockups).
- **Fragrise:** recovered from live site — mark SVGs (cream/black), palette black `#080808` / cream `#F5F4F0` / red `#EE343E`, fonts Chakra Petch + Barlow, screenshots, OG image. Build a full brand-kit page: lockup (mark + FRAGRISE wordmark), palette, type, applications (site, OG, social/jersey/stream overlay mockups generated as needed). Cyan/lime/navy CSS vars are secondary — builder confirms from screenshots.

### Ads & Content
- Good Idea Cargo "Owner-Operator Recruiting" (Nov 2026): FB/IG lead-form campaign, US, Employment category; creatives A1 "Keep up to 88% of your gross" (9:16, 4:5), A2 (Seedance clip + end card), O1 carousel; lead call-log pipeline. Show setup + creatives, hook rate 39.9% is OK to show; no CPL/lead-count claims.
- GFS: owner-operator ad video (`Downloads\GFS_OwnerOperator_Ad_v3_9x16.mp4`), "Future of Electric Freight" motion deck made with Higgsfield.
- AI workflow strip: Higgsfield (Nano Banana, Seedance, Cinema Studio), Google Flow, Remotion, Figma.
- Earlier work archive: existing `public/images-portfolio/*` (Ijarachi banners, Iqtidor, social posts, flyers) — shown as images only, with no invented "problem/solution" copy.

Video: compress to web MP4/WebM (≤4 MB each), poster images, `preload="none"`, autoplay muted only in view.

## 7. Truthful experience (CV is source of truth)

- 2026 – Present · GFS Group LLC — IT Department · Frontend Developer & Brand Designer: websites + brand kits built from zero for JJR Transportation and DAVR GROUP, site redesign concepts for group companies, ad creatives and Meta lead campaigns (Good Idea Cargo), AI video content.
- 2026 – Present · Freelance & startups — Fragrise (brand + site design), CleanPro (brand), ConvertBoost AI (own product); co-building two startups in collaboration: Hirara and 8iz.
- Languages: Uzbek C2 (native), English B2, Russian A2.
- 2025 · Ijarachi — Graphic Designer & Content Creator
- 2024 – 2025 · UIC Games — Visual Designer & Videographer
- 2024 · Nuqta & XM Pro — Visual Designer, Videographer & SMM
- 2024 · Grand Invest — Graphic Designer (YouTube thumbnails)
- Additional: PDP School 2023–2024; Kinder merchandiser 2025–2026 (CV "Additional" only, not on site).
- Education: Renessans Ta'lim Universiteti 2024–present; PDP University Foundation (Pearson BTEC L3–4) 2022–2024. PDPU Proctor & Volunteer 2023–2025.
- Remove from site: "Lead Brand & Product Designer", "Grant Invest 2021–2023", "Junior UI Designer".

## 8. Side tasks (approved by user)

1. **DAVR deploy:** create private GitHub repo `azizbektursunovme/davr-group-website`, push `Documents\davr-group`, deploy `web` to Vercel. See open question on placeholders.
2. **Hirara screenshots:** try running `Alikuloff/hirara` locally (Node 22+, local D1 via dev server, migrations). Capture landing, dashboard, storefront, bio page, Ilgich template. If it can't run without secrets, fall back to domain link + text description.
3. **Screenshots** for all websites via Playwright (desktop 1440 + mobile 390), WebP.
4. **Portfolio deploy:** existing Vercel project `azizbek-portfolio` (canonical `azizbektursunov.uz`). Push only with user's go-ahead.

## 9. CV update

- Rebuild the CV as an HTML page in the new design system → export to A4 PDF (Playwright), saved as `public/Azizbek_Tursunov_CV.pdf`, and linked from the site. Keep 1–2 pages, English.
- Content: new title/tagline; experience per §7; Selected work: JJR, DAVR, Hirara, 8iz (built with a friend), Fragrise, GFS redesigns, ConvertBoost AI; skills grouped Dev / Design / Growth & AI; tools; education; languages; contact + portfolio QR.

## 10. Technical cleanup

Fix mojibake + BOMs, move hardcoded strings to i18n, add `metadataBase`, OG image per locale, favicon, sitemap, robots, hreflang alternates; remove duplicate `globals.css` import; alt text everywhere; Lighthouse ≥ 90 perf/a11y/SEO on home.

## 11. Left to the builder

Exact spacing/scale, motion details, component breakdown, image optimization approach, bento tile sizes, mockup generation method, case-page copy wording (must stay truthful to §6–7).

## Sources
CV `Azizbek_TursunovCV.pdf`; GitHub inventory; fact sheet from past Claude sessions (`C:\Users\group\.claude\projects\*\memory`); `Desktop\META\reports`; asset folders listed above.

## Resolved after builder check
- **Department:** "IT Department" (user's own words, 2026-11-23) overrides the CV's "Frontend & Marketing Department". The CV gets updated.
- **Fragrise role:** user designed the brand kit and the site design. Credit = "Brand identity + website design", not development. The CV line changes accordingly.
- **8iz link** (my call): `live: false` until the user confirms the redesign is deployed on 8iz.uz. Until then show screenshots and "Launching soon", with no link to the old store design. Branding entry only if 8iz brand assets are found; otherwise website-only.
- **Translations** (user decision): build everything in English first. RU/UZ translation is the **last phase**, after all other work. Until then, the RU/UZ routes may fall back to the English copy. The user reviews the translations.

## User answers (2026-11-23)
1. JJR and DAVR were done through GFS Group. Case meta: "Client: JJR Transportation · Delivered at GFS Group".
2. DAVR: deploy and show the link. The user fills the placeholders later with company data.
3. The 5 GFS redesigns are not deployed, so show them as links only (no case pages). Night Haul is dropped. The Good Idea Cargo ads stay in Ads & Content (made at GFS).
4. Uzbek C2, English B2, Russian A2.
5. Link hirara.uz (the user is connecting the domain now).
6. 8iz and Hirara: "two-person startup, built in collaboration" (not "with a friend").
