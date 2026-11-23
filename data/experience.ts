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
    role: {
      en: "IT Department · Frontend Developer & Brand Designer",
      ru: "IT-отдел · Frontend-разработчик и бренд-дизайнер",
      uz: "IT boʻlimi · Frontend dasturchi va brend dizayner",
    },
    years: "2026 – Present",
    points: {
      en: [
        "Websites and brand kits built from zero for JJR Transportation and DAVR GROUP.",
        "Website redesign concepts for group companies.",
        "Ad creatives and Meta lead campaigns for Good Idea Cargo.",
        "AI video content.",
      ],
      ru: [
        "Сайты и фирменный стиль с нуля для JJR Transportation и DAVR GROUP.",
        "Концепции редизайна сайтов для компаний группы.",
        "Рекламные креативы и лид-кампании в Meta для Good Idea Cargo.",
        "Видеоконтент с помощью ИИ.",
      ],
      uz: [
        "JJR Transportation va DAVR GROUP uchun noldan yaratilgan saytlar va brend uslubi.",
        "Guruh kompaniyalari saytlari uchun redizayn konsepsiyalari.",
        "Good Idea Cargo uchun reklama kreativlari va Meta lid kampaniyalari.",
        "AI yordamida video kontent.",
      ],
    },
    showOnSite: true,
  },
  {
    company: "Freelance & startups",
    role: { en: "Brand designer & developer", ru: "Бренд-дизайнер и разработчик", uz: "Brend dizayner va dasturchi" },
    years: "Apr – Oct 2026",
    points: {
      en: [
        "Fragrise: brand identity and website design.",
        "CleanPro: brand.",
        "ConvertBoost AI: own product.",
        "Two startups built in collaboration: Hirara and 8iz.",
      ],
      ru: [
        "Fragrise: фирменный стиль и дизайн сайта.",
        "CleanPro: бренд.",
        "ConvertBoost AI: собственный продукт.",
        "Два стартапа, созданные совместно: Hirara и 8iz.",
      ],
      uz: [
        "Fragrise: brend uslubi va sayt dizayni.",
        "CleanPro: brend.",
        "ConvertBoost AI: shaxsiy mahsulot.",
        "Hamkorlikda yaratilgan ikki startap: Hirara va 8iz.",
      ],
    },
    showOnSite: true,
  },
  {
    company: "Ijarachi",
    role: { en: "Graphic Designer & Content Creator", ru: "Графический дизайнер и контент-мейкер", uz: "Grafik dizayner va kontent yaratuvchi" },
    years: "2025",
    points: { en: [], ru: [], uz: [] },
    showOnSite: true,
  },
  {
    company: "UIC Games",
    role: { en: "Visual Designer & Videographer", ru: "Визуальный дизайнер и видеограф", uz: "Vizual dizayner va videograf" },
    years: "2024 – 2025",
    points: { en: [], ru: [], uz: [] },
    showOnSite: true,
  },
  {
    company: "Nuqta & XM Pro",
    role: {
      en: "Visual Designer, Videographer & SMM",
      ru: "Визуальный дизайнер, видеограф и SMM-специалист",
      uz: "Vizual dizayner, videograf va SMM mutaxassisi",
    },
    years: "2024",
    points: { en: [], ru: [], uz: [] },
    showOnSite: true,
  },
  {
    company: "Grand Invest",
    role: { en: "Graphic Designer", ru: "Графический дизайнер", uz: "Grafik dizayner" },
    years: "2024",
    points: { en: ["YouTube thumbnails."], ru: ["Обложки для YouTube."], uz: ["YouTube videolari uchun muqovalar."] },
    showOnSite: true,
  },
  {
    company: "PDP School",
    role: {
      en: "Contracts Department & Assistant to the Director",
      ru: "Отдел договоров и помощник директора",
      uz: "Shartnomalar boʻlimi va direktor yordamchisi",
    },
    years: "2023 – 2024",
    points: { en: [], ru: [], uz: [] },
    showOnSite: false,
  },
  {
    company: "Kinder",
    role: { en: "Merchandiser", ru: "Мерчендайзер", uz: "Merchendayzer" },
    years: "2025 – 2026",
    points: { en: [], ru: [], uz: [] },
    showOnSite: false,
  },
];
