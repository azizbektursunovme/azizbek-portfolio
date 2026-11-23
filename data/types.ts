export type Locale = "en" | "ru" | "uz";
export type Localized<T = string> = { en: T; ru?: T; uz?: T };
export type Discipline = "web" | "brand" | "ads";
export type LiveStatus = "live" | "soon" | "none";

export interface Media {
  src: string;
  width: number;
  height: number;
  alt: Localized;
  kind: "image" | "video";
  poster?: string;
}

export interface BrandBlock {
  logos: Media[];
  palette: { name: string; hex: string }[];
  type: { name: string; role: Localized }[];
  applications: Media[];
  guidePdf?: string;
  /** Single-ink version of the logo for monochrome displays. Omit to fall back to a CSS grayscale of logos[0]. */
  monoSrc?: string;
}

export interface WebBlock {
  desktop: Media[];
  mobile: Media[];
  video?: Media;
}

export interface AdsBlock {
  objective: Localized;
  creatives: Media[];
  tools: string[];
  facts: Localized<string[]>;
}

export interface CaseStudy {
  brief: Localized;
  whatIDid: Localized<string[]>;
  decisions?: Localized<string[]>;
  result: Localized;
  web?: WebBlock;
  brand?: BrandBlock;
  ads?: AdsBlock;
}

export interface Project {
  slug: string;
  /** English title: URLs, OG cards and the CV. */
  title: string;
  /** Per-locale title, only where the title is a description rather than a name. Read with `projectTitle()`. */
  localTitle?: Localized;
  client: string;
  context?: Localized;
  year: string;
  disciplines: Discipline[];
  summary: Localized;
  role: Localized;
  stack: string[];
  links: { live?: string; liveStatus: LiveStatus; github?: string };
  cover: Media;
  featured?: 1 | 2 | 3 | 4 | 5 | 6;
  caseStudy?: CaseStudy;
}

export interface ArchiveItem {
  src: string;
  width: number;
  height: number;
  alt: Localized;
  /** Larger version shown in the lightbox; `src` is the grid thumbnail. */
  full?: { src: string; width: number; height: number };
  label: Localized;
  year: string;
}
