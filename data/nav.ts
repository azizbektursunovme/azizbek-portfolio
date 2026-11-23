import type { Localized } from "./types";

/**
 * Header navigation, in order. Labels are Localized so RU/UZ can be added
 * in the translation task without touching the Header.
 */
export const navItems: { id: string; href: `#${string}`; label: Localized }[] = [
  { id: "websites", href: "#websites", label: { en: "Websites" } },
  { id: "branding", href: "#branding", label: { en: "Branding" } },
  { id: "ads", href: "#ads", label: { en: "Ads & Content" } },
  { id: "about", href: "#about", label: { en: "About" } },
  { id: "contact", href: "#contact", label: { en: "Contact" } },
];

/** Small UI strings used by the layout shell. */
export const shellCopy = {
  downloadCv: { en: "Download CV" } as Localized,
  openMenu: { en: "Open menu" } as Localized,
  closeMenu: { en: "Close menu" } as Localized,
  skipToContent: { en: "Skip to content" } as Localized,
  backToTop: { en: "Back to top" } as Localized,
  footerPrompt: { en: "Have a website, a brand or a campaign in mind? Write to me." } as Localized,
  elsewhere: { en: "Elsewhere" } as Localized,
  sections: { en: "On this page" } as Localized,
};
