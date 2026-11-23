/*
 * Colour theme. Dark is the default for every visitor (the server renders
 * <html data-theme="dark">); light is opt-in through the header toggle and
 * remembered in localStorage.theme. THEME_SCRIPT runs in <head> before first
 * paint, so a visitor who chose light never sees a dark flash.
 */
export type Theme = "dark" | "light";

export const DEFAULT_THEME: Theme = "dark";
export const THEME_STORAGE_KEY = "theme";

/** Browser UI colour (mobile address bar) per theme: the paper colour. */
export const THEME_COLOR: Record<Theme, string> = { dark: "#121110", light: "#f4f1ea" };

export const THEME_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`;

/** The theme currently on <html>. Client only. */
export function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

/** Put a theme on <html> (color-scheme follows it in globals.css), sync the browser UI colour, and remember it. */
export function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLOR[theme]);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Storage blocked (private mode, policy): the choice lasts for this page view.
  }
}
