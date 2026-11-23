import type { Localized } from "./types";

/** UI strings for the About and Contact sections. Content itself lives in profile.ts and experience.ts. */
export const aboutCopy = {
  eyebrow: { en: "About" } as Localized,
  title: { en: "Frontend developer and brand designer, based in Tashkent." } as Localized,
  experience: { en: "Experience" } as Localized,
  tools: { en: "Tools" } as Localized,
  education: { en: "Education" } as Localized,
  languages: { en: "Languages" } as Localized,
  toolGroups: {
    Dev: { en: "Dev" },
    Design: { en: "Design" },
    "Growth & AI": { en: "Growth & AI" },
  } as Record<"Dev" | "Design" | "Growth & AI", Localized>,
};

export const contactCopy = {
  eyebrow: { en: "Contact" } as Localized,
  title: { en: "Let's talk about your next project." } as Localized,
  intro: {
    en: "A website, a brand or a campaign. Write to me and I will reply.",
  } as Localized,
  copyEmail: { en: "Copy email" } as Localized,
  copied: { en: "Copied" } as Localized,
  helpTitle: { en: "What I can help with" } as Localized,
  help: {
    en: [
      "Websites built from zero, in Next.js and React.",
      "Brand identities: logo, colour, type and the kit around them.",
      "Ad creatives and Meta lead campaigns, with AI video.",
    ],
  } as Localized<string[]>,
  elsewhere: { en: "Find me on" } as Localized,
  downloadCv: { en: "Download CV" } as Localized,
};
