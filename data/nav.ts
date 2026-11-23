import type { Localized } from "./types";

/**
 * Header navigation, in order. Labels are Localized (EN, RU, UZ); the Header
 * reads them with `tr()`.
 */
export const navItems: { id: string; href: `#${string}`; label: Localized }[] = [
  { id: "websites", href: "#websites", label: { en: "Websites", ru: "Сайты", uz: "Saytlar" } },
  { id: "branding", href: "#branding", label: { en: "Branding", ru: "Брендинг", uz: "Brending" } },
  { id: "ads", href: "#ads", label: { en: "Ads & Content", ru: "Реклама и контент", uz: "Reklama va kontent" } },
  { id: "about", href: "#about", label: { en: "About", ru: "Обо мне", uz: "Men haqimda" } },
  { id: "contact", href: "#contact", label: { en: "Contact", ru: "Контакты", uz: "Aloqa" } },
];

/** Small UI strings used by the layout shell. */
export const shellCopy = {
  downloadCv: { en: "Download CV", ru: "Скачать резюме", uz: "Rezyumeni yuklab olish" } as Localized,
  /** Header bar button, where space is tight: the arrow icon already says "download". */
  downloadCvShort: { en: "Download CV", ru: "Резюме", uz: "Rezyume" } as Localized,
  openMenu: { en: "Open menu", ru: "Открыть меню", uz: "Menyuni ochish" } as Localized,
  closeMenu: { en: "Close menu", ru: "Закрыть меню", uz: "Menyuni yopish" } as Localized,
  /** Visible text on the mobile menu button. */
  menu: { en: "Menu", ru: "Меню", uz: "Menyu" } as Localized,
  close: { en: "Close", ru: "Закрыть", uz: "Yopish" } as Localized,
  skipToContent: { en: "Skip to content", ru: "Перейти к содержанию", uz: "Asosiy qismga oʻtish" } as Localized,
  backToTop: { en: "Back to top", ru: "Наверх", uz: "Yuqoriga" } as Localized,
  elsewhere: { en: "Elsewhere", ru: "Соцсети", uz: "Ijtimoiy tarmoqlar" } as Localized,
  sections: { en: "On this page", ru: "На этой странице", uz: "Ushbu sahifada" } as Localized,
  email: { en: "Email", ru: "Эл. почта", uz: "Elektron pochta" } as Localized,
  /** Screen-reader suffix on links with target="_blank". */
  newTab: { en: "(opens in a new tab)", ru: "(откроется в новой вкладке)", uz: "(yangi oynada ochiladi)" } as Localized,
  mainNav: { en: "Main", ru: "Основное меню", uz: "Asosiy menyu" } as Localized,
  languageNav: { en: "Language", ru: "Язык", uz: "Til" } as Localized,
  /** Theme toggle labels: they name the action, not the current state. */
  themeToLight: { en: "Switch to light theme", ru: "Включить светлую тему", uz: "Yorugʻ rejimga oʻtish" } as Localized,
  themeToDark: { en: "Switch to dark theme", ru: "Включить тёмную тему", uz: "Tungi rejimga oʻtish" } as Localized,
};
