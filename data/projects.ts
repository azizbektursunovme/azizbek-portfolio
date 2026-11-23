import type { ArchiveItem, Discipline, Media, Project } from "./types";

const img = (src: string, width: number, height: number, alt: string): Media => ({
  src,
  width,
  height,
  alt: { en: alt },
  kind: "image",
});

const video = (src: string, poster: string, width: number, height: number, alt: string): Media => ({
  src,
  poster,
  width,
  height,
  alt: { en: alt },
  kind: "video",
});

const GFS_CONTEXT = { en: "Delivered at GFS Group" };
const STARTUP_CONTEXT = { en: "Two-person startup, built in collaboration" };

export const projects: Project[] = [
  {
    slug: "jjr-transportation",
    title: "JJR Transportation",
    client: "JJR Transportation",
    context: GFS_CONTEXT,
    year: "2026",
    disciplines: ["web", "brand"],
    summary: { en: "Website and brand kit for a US dry-van carrier, built from zero." },
    role: { en: "Website + brand identity" },
    stack: ["Next.js 16", "Tailwind CSS 4", "Web3Forms"],
    links: { live: "https://jjr-transportation-website.vercel.app", liveStatus: "live" },
    cover: img("/work/jjr-transportation/brand-preview.png", 1375, 943, "JJR Transportation brand kit preview"),
    featured: 1,
    caseStudy: {
      brief: {
        en: "JJR Transportation is a US dry-van carrier. The work was done through GFS Group and started from nothing: no site and no brand kit.",
      },
      whatIDid: {
        en: [
          "Designed and built the website in Next.js 16 with Tailwind CSS 4.",
          "Built three forms, sent through Web3Forms.",
          "Created the brand kit: logo variants, palette, typography, brand guide and fleet mockups.",
        ],
      },
      result: { en: "A live website and a complete brand kit delivered to the company." },
      web: {
        desktop: [img("/work/jjr-transportation/desktop-1.webp", 1440, 900, "JJR Transportation website, desktop")],
        mobile: [img("/work/jjr-transportation/mobile-1.webp", 390, 844, "JJR Transportation website, mobile")],
      },
      brand: {
        logos: [
          img("/work/jjr-transportation/logo-primary.svg", 1382, 110, "JJR Transportation primary logo"),
          img("/work/jjr-transportation/logo-symbol.svg", 1590, 536, "JJR Transportation symbol"),
        ],
        palette: [
          { name: "Graphite", hex: "#25282c" },
          { name: "Orange", hex: "#f46328" },
          { name: "Warm white", hex: "#faf9f5" },
          { name: "Steel", hex: "#a7aaad" },
          { name: "Muted", hex: "#5e636a" },
        ],
        type: [
          { name: "Barlow Condensed", role: "Display" },
          { name: "Barlow", role: "Body" },
        ],
        applications: [
          img("/work/jjr-transportation/trailer-mockup.png", 1520, 395, "JJR Transportation trailer livery mockup"),
          img("/work/jjr-transportation/brand-preview.png", 1375, 943, "JJR Transportation brand kit preview"),
        ],
        guidePdf: "/work/jjr-transportation/guide.pdf",
      },
    },
  },
  {
    slug: "davr-group",
    title: "DAVR GROUP",
    client: "DAVR GROUP LLC",
    context: GFS_CONTEXT,
    year: "2026",
    disciplines: ["web", "brand"],
    summary: { en: "Website and brand kit for a US trucking company, built from zero." },
    role: { en: "Website + brand identity" },
    stack: ["Next.js", "three.js"],
    links: { live: "https://web-mu-nine-85.vercel.app", liveStatus: "live" },
    cover: img("/work/davr-group/brand-preview.png", 1375, 970, "DAVR GROUP brand kit preview"),
    featured: 2,
    caseStudy: {
      brief: {
        en: "DAVR GROUP LLC is a US trucking company. The work was done through GFS Group: a website and a brand kit, both from zero.",
      },
      whatIDid: {
        en: [
          "Built the website as a static Next.js site with a three.js scene and tests.",
          "Created the brand kit: logo variants, palette, typography, brand guide PDF and a trailer mockup.",
        ],
      },
      result: { en: "A website and a complete brand kit delivered to the company." },
      web: {
        desktop: [img("/work/davr-group/desktop-1.webp", 1440, 900, "DAVR GROUP website, desktop")],
        mobile: [img("/work/davr-group/mobile-1.webp", 390, 844, "DAVR GROUP website, mobile")],
      },
      brand: {
        logos: [
          img("/work/davr-group/logo-primary.svg", 555, 192, "DAVR GROUP primary logo"),
          img("/work/davr-group/logo-symbol.svg", 249, 192, "DAVR GROUP symbol"),
        ],
        palette: [
          { name: "Plum", hex: "#54287c" },
          { name: "Deep plum", hex: "#2f1548" },
          { name: "Coral", hex: "#f36b46" },
          { name: "Ink", hex: "#20192d" },
          { name: "Lavender", hex: "#f4eff9" },
        ],
        type: [
          { name: "Red Hat Display", role: "Display" },
          { name: "Red Hat Text", role: "Body" },
          { name: "Red Hat Mono", role: "Labels" },
        ],
        applications: [
          img("/work/davr-group/trailer-mockup.png", 2172, 588, "DAVR GROUP trailer livery mockup"),
          img("/work/davr-group/brand-preview.png", 1375, 970, "DAVR GROUP brand kit preview"),
        ],
        guidePdf: "/work/davr-group/guide.pdf",
      },
    },
  },
  {
    slug: "hirara",
    title: "Hirara",
    client: "Hirara",
    context: STARTUP_CONTEXT,
    year: "2026",
    disciplines: ["web"],
    summary: { en: "Uzbek SaaS for Telegram shops, bio pages and landing pages." },
    role: { en: "Co-developer" },
    stack: [],
    links: { live: "https://hirara.uz", liveStatus: "live" },
    cover: img("/work/hirara/desktop-1.webp", 1440, 900, "Hirara, desktop"),
    featured: 3,
    caseStudy: {
      brief: {
        en: "Hirara is an Uzbek SaaS for building a Telegram shop, a bio page and landing pages. It is a two-person startup, built in collaboration.",
      },
      whatIDid: {
        en: [
          "Built the Ilgich store template.",
          "Added order notifications and limits.",
          "Bug fixes.",
        ],
      },
      result: { en: "In progress. The product is being connected to hirara.uz." },
      web: {
        desktop: [1, 2, 3, 4, 5].map((n) =>
          img(`/work/hirara/desktop-${n}.webp`, 1440, 900, `Hirara, desktop view ${n}`),
        ),
        mobile: [1, 2, 3].map((n) => img(`/work/hirara/mobile-${n}.webp`, 390, 844, `Hirara, mobile view ${n}`)),
      },
    },
  },
  {
    slug: "fragrise",
    title: "FRAGRISE",
    client: "Fragrise",
    year: "2026",
    disciplines: ["web", "brand"],
    summary: { en: "Brand identity and website design for a CS2 tournament platform in Uzbekistan." },
    role: { en: "Brand identity + website design" },
    stack: [],
    links: { live: "https://fragrise.uz", liveStatus: "live" },
    cover: img("/work/fragrise/desktop-1.webp", 1440, 900, "FRAGRISE website, desktop"),
    featured: 4,
    caseStudy: {
      brief: {
        en: "FRAGRISE is a CS2 tournament platform in Uzbekistan. My part was the brand identity and the website design, not the development.",
      },
      whatIDid: {
        en: [
          "Designed the brand identity: mark, wordmark lockup, palette and type pairing.",
          "Designed the website.",
          "Mocked up the brand on social, share-image and stream overlay formats.",
        ],
      },
      result: { en: "A complete brand kit and a live website at fragrise.uz." },
      web: {
        desktop: [img("/work/fragrise/desktop-1.webp", 1440, 900, "FRAGRISE website, desktop")],
        mobile: [img("/work/fragrise/mobile-1.webp", 390, 844, "FRAGRISE website, mobile")],
      },
      brand: {
        logos: [
          img("/work/fragrise/lockup-light.svg", 1906, 727, "FRAGRISE lockup, light version"),
          img("/work/fragrise/lockup-dark.svg", 1906, 727, "FRAGRISE lockup, dark version"),
          img("/work/fragrise/mark.svg", 442, 474, "FRAGRISE mark, cream"),
          img("/work/fragrise/mark-black.svg", 442, 474, "FRAGRISE mark, black"),
        ],
        palette: [
          { name: "Black", hex: "#080808" },
          { name: "Cream", hex: "#F5F4F0" },
          { name: "Signal Red", hex: "#EE343E" },
          { name: "Surface", hex: "#151517" },
          { name: "Muted", hex: "#A4A4AB" },
        ],
        type: [
          { name: "Arial Bold", role: "Wordmark / display (as on the live site)" },
          { name: "Barlow", role: "Body" },
          { name: "Chakra Petch", role: "Numerals / scores" },
        ],
        applications: [
          img("/work/fragrise/app-social.webp", 1080, 1350, "FRAGRISE social post mockup"),
          img("/work/fragrise/app-og.webp", 1200, 630, "FRAGRISE share image"),
          img("/work/fragrise/app-stream.webp", 1920, 1080, "FRAGRISE stream overlay mockup"),
        ],
      },
    },
  },
  {
    slug: "8iz",
    title: "8iz",
    client: "8iz",
    context: STARTUP_CONTEXT,
    year: "2026",
    disciplines: ["web"],
    summary: { en: "Redesign of an Uzbek apparel brand's store." },
    role: { en: "Co-founder · design and front-end" },
    stack: [],
    // No link to 8iz.uz until the redesign is confirmed as deployed.
    links: { liveStatus: "soon" },
    cover: img("/work/8iz/desktop-1.webp", 1440, 900, "8iz redesign, desktop"),
    featured: 5,
    caseStudy: {
      brief: {
        en: "8iz is an Uzbek apparel brand and store. The redesign is a two-person startup effort, built in collaboration.",
      },
      whatIDid: {
        en: [
          "Designed the new 8iz.uz look (steel gear-unit style).",
          "Built the redesign together with my co-founder.",
          "Features: outfit builder, print studio, 15-model catalog.",
        ],
      },
      result: { en: "Launching soon." },
      web: {
        desktop: [
          img("/work/8iz/desktop-1.webp", 1440, 900, "8iz redesign, home"),
          img("/work/8iz/desktop-2.webp", 1440, 900, "8iz redesign, desktop view 2"),
          img("/work/8iz/desktop-3.webp", 1440, 900, "8iz redesign, desktop view 3"),
        ],
        mobile: [
          img("/work/8iz/mobile-1.webp", 390, 844, "8iz redesign, mobile"),
          img("/work/8iz/mobile-2.webp", 390, 844, "8iz redesign, mobile view 2"),
        ],
      },
    },
  },
  {
    slug: "good-idea-cargo-ads",
    title: "Good Idea Cargo: Owner-Operator Recruiting",
    client: "Good Idea Cargo",
    context: { en: "Made at GFS Group" },
    year: "2026",
    disciplines: ["ads"],
    summary: { en: "Facebook and Instagram lead-form campaign recruiting owner-operators in the US." },
    role: { en: "Ad creatives + campaign setup" },
    stack: ["Meta Ads Manager", "Higgsfield", "Seedance"],
    links: { liveStatus: "none" },
    cover: img("/work/good-idea-cargo-ads/ad-a1-9x16.jpg", 720, 1280, "Good Idea Cargo ad A1, 9:16"),
    featured: 6,
    caseStudy: {
      brief: {
        en: "Recruit owner-operator drivers for Good Idea Cargo with a Facebook and Instagram lead-form campaign in the US, run in the Employment ad category (November 2026).",
      },
      whatIDid: {
        en: [
          "Set up the lead-form campaign in Meta Ads Manager.",
          "Designed creative A1, \"Keep up to 88% of your gross\", in 9:16 and 4:5.",
          "Made creative A2: a Seedance clip with an end card.",
          "Made creative O1: a carousel.",
          "Set up a call-log pipeline for the leads.",
        ],
      },
      result: { en: "Campaign launched with three video creatives; the opening hook held 39.9% of viewers." },
      ads: {
        objective: { en: "Owner-operator recruiting through Facebook and Instagram lead forms, US." },
        creatives: [
          video(
            "/work/good-idea-cargo-ads/ad-a1-9x16.mp4",
            "/work/good-idea-cargo-ads/ad-a1-9x16.jpg",
            720,
            1280,
            "Creative A1, 9:16: Keep up to 88% of your gross",
          ),
          video(
            "/work/good-idea-cargo-ads/ad-a1-4x5.mp4",
            "/work/good-idea-cargo-ads/ad-a1-4x5.jpg",
            720,
            900,
            "Creative A1, 4:5: Keep up to 88% of your gross",
          ),
          video(
            "/work/good-idea-cargo-ads/ad-a2-9x16.mp4",
            "/work/good-idea-cargo-ads/ad-a2-9x16.jpg",
            720,
            1280,
            "Creative A2, 9:16: Seedance clip with end card",
          ),
          ...[1, 2, 3, 4, 5].map((n) =>
            img(`/work/good-idea-cargo-ads/o1-slide${n}.webp`, 1080, 1350, `Creative O1, carousel slide ${n}`),
          ),
        ],
        tools: ["Meta Ads Manager", "Higgsfield", "Seedance"],
        facts: {
          en: [
            "Facebook and Instagram lead-form campaign",
            "Audience: US, Employment ad category",
            "Hook rate: 39.9%",
          ],
        },
      },
    },
  },
  {
    slug: "convertboost-ai",
    title: "ConvertBoost AI",
    client: "Own product",
    year: "2026",
    disciplines: ["web"],
    summary: { en: "AI landing-page audit SaaS." },
    role: { en: "Own product: design and development" },
    stack: [],
    links: { live: "https://convertboost-ai.vercel.app", liveStatus: "live" },
    cover: img("/work/convertboost-ai/desktop-1.webp", 1440, 900, "ConvertBoost AI website, desktop"),
  },
  {
    slug: "workers",
    title: "Workers",
    client: "Workers",
    year: "2026",
    disciplines: ["web"],
    summary: { en: "Website for wrkrs.uz, a rap collective from Tashkent." },
    role: { en: "Website" },
    stack: ["Next.js"],
    links: { live: "https://wrkrs.uz", liveStatus: "live" },
    cover: img("/work/workers/desktop-1.webp", 1440, 900, "Workers website, desktop"),
  },
  {
    slug: "motionforge",
    title: "MotionForge",
    client: "Own experiment",
    year: "2026",
    disciplines: ["web"],
    summary: { en: "Studio website concept." },
    role: { en: "Own experiment: design and development" },
    stack: ["React", "TypeScript", "Vite"],
    links: {
      live: "https://motionforge-dun.vercel.app",
      liveStatus: "live",
      github: "https://github.com/azizbektursunovme/MotionForge",
    },
    cover: img("/work/motionforge/desktop-1.webp", 1440, 900, "MotionForge website, desktop"),
  },
  {
    slug: "silk-road",
    title: "Silk Road Uzbekistan",
    client: "Own project",
    year: "2026",
    disciplines: ["web"],
    summary: { en: "Travel guide to Uzbekistan's Silk Road cities, in English, Russian and Uzbek." },
    role: { en: "Own project: design and development" },
    stack: ["React 18", "Vite", "Tailwind CSS", "Framer Motion", "React Router"],
    // Not deployed (scope decision); the user can deploy it later.
    links: { liveStatus: "none", github: "https://github.com/azizbektursunovme/silk-road-uzbekistan" },
    cover: img("/work/silk-road/desktop-1.webp", 1440, 900, "Silk Road Uzbekistan website, desktop"),
  },
  {
    slug: "cleanpro",
    title: "CleanPro",
    client: "CleanPro",
    year: "2026",
    disciplines: ["brand"],
    summary: { en: "Logo, color system and business cards for a cleaning service." },
    role: { en: "Brand identity" },
    stack: [],
    links: { liveStatus: "none" },
    cover: img("/work/cleanpro/business-card/front.png", 480, 280, "CleanPro business card, front"),
    caseStudy: {
      brief: {
        en: "Logo, colour system and business cards.",
      },
      whatIDid: {
        en: [
          "Logo, colour system and business cards.",
        ],
      },
      result: { en: "A concise identity package: logo, colors and business cards." },
      brand: {
        logos: [
          img("/work/cleanpro/CleanPro-logo.svg", 1000, 1000, "CleanPro logo"),
          img("/work/cleanpro/logo-colors.svg", 400, 200, "CleanPro logo colors"),
        ],
        palette: [
          { name: "Teal", hex: "#1DC9A5" },
          { name: "Graphite", hex: "#313131" },
          { name: "Grey", hex: "#828282" },
          { name: "White", hex: "#FFFFFF" },
        ],
        type: [],
        applications: [
          img("/work/cleanpro/business-card/front.png", 480, 280, "CleanPro business card, front"),
          img("/work/cleanpro/business-card/back.png", 480, 280, "CleanPro business card, back"),
        ],
      },
    },
  },
  {
    slug: "gfs-ads",
    title: "GFS Group: ad video and motion",
    client: "GFS Group LLC",
    context: { en: "Made at GFS Group" },
    year: "2026",
    disciplines: ["ads"],
    summary: {
      en: "Owner-operator recruiting ad (9:16).",
    },
    role: { en: "Ad video" },
    stack: [],
    links: { liveStatus: "none" },
    cover: img("/work/gfs-ads/ad-gfs-9x16.jpg", 720, 1280, "GFS owner-operator ad video, poster frame"),
  },
];

/** GFS Group redesign concepts. Not deployed on real domains: links only, no case page, no tile. */
export const redesignLinks: { name: string; url: string }[] = [
  { name: "GFS Group v1", url: "https://azizbektursunovme.github.io/gfs-group-redesign/" },
  { name: "GFS Group v2", url: "https://azizbektursunovme.github.io/gfs-group-redesign-v2/" },
  { name: "GFS Express", url: "https://azizbektursunovme.github.io/gfs-xpress-redesign/" },
  { name: "Good Idea Cargo", url: "https://azizbektursunovme.github.io/goodideacargo-redesign/" },
  { name: "Lion King", url: "https://azizbektursunovme.github.io/lionking-redesign/" },
  { name: "T-Logistics", url: "https://azizbektursunovme.github.io/t-logistics-redesign/" },
];

const a = (
  file: string,
  width: number,
  height: number,
  alt: string,
  label: string,
  year: string,
): ArchiveItem => ({ src: `/images-portfolio/${file}`, width, height, alt: { en: alt }, label, year });

/** Earlier work: images only, labelled with the old project titles. */
export const archive: ArchiveItem[] = [
  a("academy.png", 1080, 1080, "Iqtidor Academy grant announcement social post", "Iqtidor Academy", "2025"),
  a("consulting-post.png", 1083, 1350, "Education consulting social media post", "Iqtidor Academy", "2025"),
  a("banner-school.png", 550, 500, "Iqtidor School Russian course admission banner", "Iqtidor School Banner", "2025"),
  a("banner-school2.png", 600, 300, "Iqtidor School green advertising banner variation", "Iqtidor School Banner", "2025"),
  a("ijarachi-banner1.png", 3240, 1080, "Ijarachi real estate service horizontal banner", "Ijarachi Banners", "2025"),
  a("ijarachi-banner2.png", 3240, 1080, "Ijarachi horizontal advertising banner variation", "Ijarachi Banners", "2025"),
  a("creative-post.png", 1080, 1350, "Creative design service social post", "Social Media Design", "2025"),
  a("dr-azamat-post.png", 1080, 1350, "Dr Azamat social media post", "Social Media Design", "2025"),
  a("insta-post.png", 680, 960, "Vertical Instagram post design", "Social Media Design", "2025"),
  a("masterclass-post.png", 1080, 1350, "Masterclass announcement social media post", "Social Media Design", "2025"),
  a("sushi-post.png", 864, 1080, "Sushi social media post design", "Social Media Design", "2025"),
  a("product-design.png", 600, 780, "Kofemator Russell Hobbs coffee machine product ad", "Kofemator", "2026"),
  a("flyer.png", 1573, 3477, "Organic product tall poster layout", "Organic Product Flyer", "2025"),
  a("personal-blog.png", 1080, 1920, "Vertical personal blog creative post", "Personal Projects", "2024"),
  a("flyer-front.png", 1573, 3477, "Organic product flyer front", "Personal Projects", "2024"),
  a("flyer-back.png", 1573, 3477, "Organic product flyer back", "Personal Projects", "2024"),
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function byDiscipline(d: Discipline): Project[] {
  return projects.filter((p) => p.disciplines.includes(d));
}

export function featuredProjects(): Project[] {
  return projects
    .filter((p) => p.featured !== undefined)
    .sort((x, y) => (x.featured as number) - (y.featured as number));
}
