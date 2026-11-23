import type { Metadata, Viewport } from "next";
import "@/app/globals.css";
import { fontVariables } from "@/app/fonts";
import { resolveLocale } from "@/i18n/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MotionProvider from "@/components/ui/MotionProvider";
import { profile } from "@/data/profile";
import { shellCopy } from "@/data/nav";
import { tr } from "@/lib/localize";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ru" }, { lang: "uz" }];
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

const TITLE = `${profile.name} — ${profile.title}`;

export const viewport: Viewport = {
  themeColor: "#f4f1ea",
};

export async function generateMetadata(props: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await props.params;
  const locale = resolveLocale(lang);
  // RU/UZ fall back to English until the translation task.
  const description = `${profile.title} in Tashkent. ${tr(profile.tagline, locale)}`;

  return {
    title: TITLE,
    description,
    authors: [{ name: profile.name }],
    creator: profile.name,
    openGraph: {
      type: "website",
      locale: locale === "uz" ? "uz_UZ" : locale === "ru" ? "ru_RU" : "en_US",
      url: `https://azizbektursunov.uz/${locale}`,
      title: TITLE,
      description,
      siteName: profile.name,
    },
  };
}

/*
 * `js` on <html> lets CSS pre-hide [data-reveal] (see Reveal). It is only set
 * when IntersectionObserver exists (whileInView needs it), and it is taken
 * back after 3s if the app never hydrated (MotionProvider sets
 * data-hydrated), so pre-hidden content can never stay hidden.
 */
const JS_FLAG = `(function(){var d=document.documentElement;if(!("IntersectionObserver" in window))return;d.classList.add("js");setTimeout(function(){if(!d.hasAttribute("data-hydrated"))d.classList.remove("js")},3000)})()`;

/*
 * No-JS safety net for the legacy dark sections (all rooted in .bg-zinc-950),
 * whose motion components server-render an inline `opacity:0` that only JS
 * would animate away. Matches `opacity:0` exactly (followed by `;` or at the
 * end of the attribute), never `opacity:0.16` and the like.
 * TODO(task11): remove once legacy sections are replaced.
 */
const NO_JS_SAFETY =
  '<style>.bg-zinc-950 [style*="opacity:0;"],.bg-zinc-950 [style$="opacity:0"]{opacity:1!important;transform:none!important}</style>';

export default async function RootLayout(props: LayoutProps) {
  const { lang } = await props.params;
  const locale = resolveLocale(lang);

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
        <noscript dangerouslySetInnerHTML={{ __html: NO_JS_SAFETY }} />
      </head>
      <body className="bg-paper font-sans text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          {tr(shellCopy.skipToContent, locale)}
        </a>
        <MotionProvider>
          <Header lang={locale} />
          <main id="main" className="relative w-full">
            {props.children}
          </main>
          <Footer lang={locale} />
        </MotionProvider>
      </body>
    </html>
  );
}
