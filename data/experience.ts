import type { Localized } from "./types";

export const experience: {
  company: string;
  role: Localized;
  years: string;
  points: Localized<string[]>;
  showOnSite: boolean;
}[] = [
  {
    company: "GFS Group LLC",
    role: { en: "IT Department · Frontend Developer & Brand Designer" },
    years: "2026 – Present",
    points: {
      en: [
        "Websites and brand kits built from zero for JJR Transportation and DAVR GROUP.",
        "Website redesign concepts for group companies.",
        "Ad creatives and Meta lead campaigns for Good Idea Cargo.",
        "AI video content.",
      ],
    },
    showOnSite: true,
  },
  {
    company: "Freelance & startups",
    role: { en: "Brand designer & developer" },
    years: "2026 – Present",
    points: {
      en: [
        "Fragrise: brand identity and website design.",
        "CleanPro: brand.",
        "ConvertBoost AI: own product.",
        "Co-building two startups in collaboration: Hirara and 8iz.",
      ],
    },
    showOnSite: true,
  },
  {
    company: "Ijarachi",
    role: { en: "Graphic Designer & Content Creator" },
    years: "2025",
    points: { en: [] },
    showOnSite: true,
  },
  {
    company: "UIC Games",
    role: { en: "Visual Designer & Videographer" },
    years: "2024 – 2025",
    points: { en: [] },
    showOnSite: true,
  },
  {
    company: "Nuqta & XM Pro",
    role: { en: "Visual Designer, Videographer & SMM" },
    years: "2024",
    points: { en: [] },
    showOnSite: true,
  },
  {
    company: "Grand Invest",
    role: { en: "Graphic Designer" },
    years: "2024",
    points: { en: ["YouTube thumbnails."] },
    showOnSite: true,
  },
  {
    company: "PDP School",
    role: { en: "Additional experience (CV only)" },
    years: "2023 – 2024",
    points: { en: [] },
    showOnSite: false,
  },
  {
    company: "Kinder",
    role: { en: "Merchandiser" },
    years: "2025 – 2026",
    points: { en: [] },
    showOnSite: false,
  },
];
