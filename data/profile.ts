import type { Localized } from "./types";

export const profile: {
  name: string;
  title: string;
  tagline: Localized;
  status: Localized;
  openTo: Localized;
  bio: Localized<string[]>;
  email: string;
  telegram: string;
  instagram: string;
  linkedin: string;
  cvPath: "/Azizbek_Tursunov_CV.pdf";
  languages: { name: string; level: string }[];
  education: { school: string; detail: string; years: string }[];
  tools: { group: "Dev" | "Design" | "Growth & AI"; items: string[] }[];
  clientMarks: { name: string; src: string }[];
} = {
  name: "Azizbek Tursunov",
  title: "Frontend Developer & Brand Designer",
  tagline: { en: "Websites, brand identities, and the ads that sell them." },
  status: { en: "IT department @ GFS Group LLC · Tashkent" },
  openTo: { en: "Open to freelance" },
  bio: {
    en: [
      "I build client websites from zero and design the brand identities that go with them. At GFS Group LLC, a US logistics company, I work in the IT department: websites and brand kits for JJR Transportation and DAVR GROUP, redesign concepts for group companies, and ad creatives for Meta lead campaigns.",
      "Outside GFS I take freelance and startup work: brand and site design for Fragrise, a brand for CleanPro, my own product ConvertBoost AI, and two startups, Hirara and 8iz, built in collaboration.",
    ],
  },
  email: "azizbektursunov.me@gmail.com",
  telegram: "https://t.me/azizbektursunovv",
  instagram: "https://instagram.com/azizbek___tursunov",
  // TODO(linkedin): no LinkedIn URL exists anywhere in the repo, spec or notes. Owner must supply it.
  linkedin: "",
  cvPath: "/Azizbek_Tursunov_CV.pdf",
  languages: [
    { name: "Uzbek", level: "C2 (native)" },
    { name: "English", level: "B2" },
    { name: "Russian", level: "A2" },
  ],
  education: [
    { school: "Renessans Ta'lim Universiteti", detail: "", years: "2024 – present" },
    {
      school: "PDP University Foundation",
      detail: "Pearson BTEC L3–4 · PDPU Proctor & Volunteer 2023–2025",
      years: "2022 – 2024",
    },
  ],
  tools: [
    { group: "Dev", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "three.js"] },
    { group: "Design", items: ["Figma", "Adobe"] },
    {
      group: "Growth & AI",
      items: ["Meta Ads Manager", "Higgsfield", "Google Flow", "Seedance", "Remotion"],
    },
  ],
  clientMarks: [
    { name: "JJR Transportation", src: "/work/jjr-transportation/logo-symbol.svg" },
    { name: "DAVR GROUP", src: "/work/davr-group/logo-symbol.svg" },
    { name: "Good Idea Cargo", src: "/work/good-idea-cargo-ads/logo.svg" },
    { name: "Fragrise", src: "/work/fragrise/mark.svg" },
    // TODO(asset): 8iz mark (none exists yet).
    { name: "8iz", src: "/images-portfolio/creative-post.png" },
    // TODO(asset): GFS Group logo (employer; none exists in public/ yet).
    { name: "GFS Group", src: "/images-portfolio/creative-post.png" },
  ],
};
