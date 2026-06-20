export type ProjectCategoryKey =
  | "branding"
  | "product-design"
  | "social-media"
  | "advertising"
  | "personal";

export interface ProjectAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface ProjectPalette {
  background: string;
  accent: string;
  muted: string;
}

export interface ProjectMetadata {
  id: string;
  title: string;
  category: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  process: string;
  result: string;
  year: string;
  categoryKey: ProjectCategoryKey;
  cardLabel: string;
  palette: ProjectPalette;
  gallery: ProjectAsset[];
}

export const portfolioProjects: ProjectMetadata[] = [
  {
    id: "cleanpro-branding",
    title: "CleanPro",
    category: "Branding",
    description: "Logo, color system, and business card design for a cleaning service brand.",
    overview: "CleanPro is presented through a simple logo system, clear color applications, and business card layouts.",
    problem: "The identity needed to feel clean and professional while staying easy to apply across small print and digital formats.",
    solution: "A compact wordmark, fresh accent color, neutral backgrounds, and simple business card layouts create a practical brand base.",
    process: "Logo refinement -> color testing -> business card layout -> final export preparation.",
    result: "A concise identity package that gives CleanPro a polished and consistent visual presence.",
    year: "2026",
    categoryKey: "branding",
    cardLabel: "Logo Branding",
    palette: {
      background: "linear-gradient(135deg, #09090b 0%, #111827 52%, #13201d 100%)",
      accent: "#2dd4bf",
      muted: "#64748b",
    },
    gallery: [
      {
        src: "/cleanpro-logobranding/CleanPro-logo.svg",
        width: 1000,
        height: 1000,
        alt: "CleanPro logo mark and wordmark",
      },
      {
        src: "/cleanpro-logobranding/logo-colors.svg",
        width: 400,
        height: 200,
        alt: "CleanPro logo color palette",
      },
      {
        src: "/cleanpro-logobranding/business-card/front.png",
        width: 480,
        height: 280,
        alt: "CleanPro business card front design",
      },
      {
        src: "/cleanpro-logobranding/business-card/back.png",
        width: 480,
        height: 280,
        alt: "CleanPro business card back design",
      },
    ],
  },
  {
    id: "kofemator-post",
    title: "Kofemator",
    category: "Product design",
    description: "Warm product ad layout for a Russell Hobbs espresso machine.",
    overview: "The Kofemator piece presents a coffee machine with pricing, rating, product details, and purchase actions in one focused layout.",
    problem: "The design needed to show product information clearly while still feeling premium and appetizing.",
    solution: "Warm coffee tones, a centered product render, structured information blocks, and high-contrast buttons make the ad easy to scan.",
    process: "Product hierarchy -> color direction -> layout composition -> detail styling -> final export.",
    result: "A polished product ad that balances e-commerce clarity with a rich coffee-inspired visual mood.",
    year: "2026",
    categoryKey: "product-design",
    cardLabel: "Coffee Ad Design",
    palette: {
      background: "linear-gradient(135deg, #100b08 0%, #21140d 54%, #3a1f12 100%)",
      accent: "#b86b2d",
      muted: "#8a6a4f",
    },
    gallery: [
      {
        src: "/images-portfolio/product-design.png",
        width: 600,
        height: 780,
        alt: "Kofemator Russell Hobbs coffee machine product ad",
      },
    ],
  },
  {
    id: "organic-product-flyer",
    title: "Organic Product Flyer",
    category: "Product design",
    description: "Tall product flyer layout for an organic personal care product line.",
    overview: "The organic flyer presents lavender-themed product items in a vertical layout with clear product names and volume labels.",
    problem: "The layout needed to show multiple products while keeping the poster calm, readable, and premium.",
    solution: "Soft sky imagery, product staging, lavender accents, and spaced labels create a clean product-focused composition.",
    process: "Product grouping -> vertical composition -> label hierarchy -> background treatment -> final poster export.",
    result: "A full-height product flyer concept with a clear catalog feel and gentle organic mood.",
    year: "2025",
    categoryKey: "product-design",
    cardLabel: "Product Design",
    palette: {
      background: "linear-gradient(135deg, #090b14 0%, #15162b 52%, #25204a 100%)",
      accent: "#8b5cf6",
      muted: "#64748b",
    },
    gallery: [
      {
        src: "/images-portfolio/flyer.png",
        width: 1573,
        height: 3477,
        alt: "Organic product tall poster layout",
      },
    ],
  },
  {
    id: "iqtidor-academy",
    title: "Iqtidor Academy",
    category: "Social Media Design",
    description: "Education-focused social posts for grant and consulting messages.",
    overview: "The Iqtidor Academy visuals use bold type, academic cues, and bright brand colors for educational announcements.",
    problem: "The posts needed to communicate dense education-related information without becoming visually heavy.",
    solution: "Large headline typography, clear supporting blocks, and simple icon/visual hierarchy keep the messages readable.",
    process: "Message structure -> visual hierarchy -> brand color use -> asset composition -> social export.",
    result: "A set of direct, readable education posts with a consistent promotional style.",
    year: "2025",
    categoryKey: "social-media",
    cardLabel: "Education Social",
    palette: {
      background: "linear-gradient(135deg, #07111f 0%, #10233d 54%, #2a2b1a 100%)",
      accent: "#3b82f6",
      muted: "#a78b25",
    },
    gallery: [
      {
        src: "/images-portfolio/academy.png",
        width: 1080,
        height: 1080,
        alt: "Iqtidor Academy grant announcement social post",
      },
      {
        src: "/images-portfolio/consulting-post.png",
        width: 1083,
        height: 1350,
        alt: "Education consulting social media post",
      },
    ],
  },
  {
    id: "school-banner",
    title: "Iqtidor School Banner",
    category: "Advertising Creatives",
    description: "Green admission banners for Russian language course promotion.",
    overview: "The school banners promote Russian language classes with student imagery, contact information, and a clear academic tone.",
    problem: "The banner had to fit course details, contact numbers, and branding into a compact promotional format.",
    solution: "A green education palette, strong headline type, and separated contact pills keep the offer clear at a glance.",
    process: "Brief review -> layout grid -> image placement -> contact hierarchy -> final banner export.",
    result: "A practical admission banner set that keeps the school message clear and parent-friendly.",
    year: "2025",
    categoryKey: "advertising",
    cardLabel: "Education Banner",
    palette: {
      background: "linear-gradient(135deg, #06150f 0%, #0d281d 54%, #173d2c 100%)",
      accent: "#22c55e",
      muted: "#647b68",
    },
    gallery: [
      {
        src: "/images-portfolio/banner-school.png",
        width: 550,
        height: 500,
        alt: "Iqtidor School Russian course admission banner",
      },
      {
        src: "/images-portfolio/banner-school2.png",
        width: 600,
        height: 300,
        alt: "Iqtidor School green advertising banner variation",
      },
    ],
  },
  {
    id: "social-media-design",
    title: "Social Media Design",
    category: "Social Media Design",
    description: "A collection of vertical posts for services, personalities, events, and food brands.",
    overview: "This set explores different social formats, from bold service promotion to personal branding, masterclass, and food content.",
    problem: "Each post needed a distinct mood while keeping the message immediately readable in a vertical feed.",
    solution: "Strong typography, clear focal imagery, and controlled accent colors help each design stand on its own.",
    process: "Content review -> style direction -> composition -> typography pass -> export for social use.",
    result: "A varied social media set showing flexible layout, typography, and promotional design direction.",
    year: "2025",
    categoryKey: "social-media",
    cardLabel: "Social Media Design",
    palette: {
      background: "linear-gradient(135deg, #140e12 0%, #251719 54%, #3d2118 100%)",
      accent: "#e8794a",
      muted: "#8b6b72",
    },
    gallery: [
      {
        src: "/images-portfolio/creative-post.png",
        width: 1080,
        height: 1350,
        alt: "Creative design service social post",
      },
      {
        src: "/images-portfolio/dr-azamat-post.png",
        width: 1080,
        height: 1350,
        alt: "Dr Azamat social media post",
      },
      {
        src: "/images-portfolio/insta-post.png",
        width: 680,
        height: 960,
        alt: "Vertical Instagram post design",
      },
      {
        src: "/images-portfolio/masterclass-post.png",
        width: 1080,
        height: 1350,
        alt: "Masterclass announcement social media post",
      },
      {
        src: "/images-portfolio/sushi-post.png",
        width: 864,
        height: 1080,
        alt: "Sushi social media post design",
      },
    ],
  },
  {
    id: "advertising-banners",
    title: "Ijarachi Banners",
    category: "Advertising Creatives",
    description: "Wide advertising banners for a real estate and rental service concept.",
    overview: "The Ijarachi banners use architectural imagery, large Uzbek headlines, and service contact details in a wide format.",
    problem: "The format needed to stay readable across a very wide canvas while still feeling atmospheric.",
    solution: "Oversized headline blocks, a focused house visual, and grounded contact information create a clear promotional layout.",
    process: "Canvas planning -> headline hierarchy -> image composition -> contact layout -> final banner export.",
    result: "A pair of wide ad creatives with clear messaging and a premium real estate mood.",
    year: "2025",
    categoryKey: "advertising",
    cardLabel: "Ad Creative",
    palette: {
      background: "linear-gradient(135deg, #061611 0%, #10271f 54%, #2d261b 100%)",
      accent: "#34d399",
      muted: "#9a6b45",
    },
    gallery: [
      {
        src: "/images-portfolio/ijarachi-banner1.png",
        width: 3240,
        height: 1080,
        alt: "Ijarachi real estate service horizontal banner",
      },
      {
        src: "/images-portfolio/ijarachi-banner2.png",
        width: 3240,
        height: 1080,
        alt: "Ijarachi horizontal advertising banner variation",
      },
    ],
  },
  {
    id: "personal-projects",
    title: "Personal Projects",
    category: "Personal Projects",
    description: "Experimental vertical layouts for personal content and product flyer concepts.",
    overview: "This project groups personal visual experiments, including a Spotify-themed vertical post and organic product flyer layouts.",
    problem: "The pieces needed room for expressive styling while still preserving readable text and product information.",
    solution: "Tall compositions, bold contrast, and controlled image placement create clear but more experimental visuals.",
    process: "Concept sketch -> vertical layout -> typography exploration -> image treatment -> final export.",
    result: "A focused set of personal design studies showing layout range across social and print-style formats.",
    year: "2024",
    categoryKey: "personal",
    cardLabel: "Creative Project",
    palette: {
      background: "linear-gradient(135deg, #10100a 0%, #13251b 54%, #1b3142 100%)",
      accent: "#22c55e",
      muted: "#7dd3fc",
    },
    gallery: [
      {
        src: "/images-portfolio/personal-blog.png",
        width: 1080,
        height: 1920,
        alt: "Vertical personal blog creative post",
      },
      {
        src: "/images-portfolio/flyer-front.png",
        width: 1573,
        height: 3477,
        alt: "Organic product flyer front",
      },
      {
        src: "/images-portfolio/flyer-back.png",
        width: 1573,
        height: 3477,
        alt: "Organic product flyer back",
      },
    ],
  },
];
