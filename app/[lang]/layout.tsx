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
import { seo } from "@/data/seo";
import { SITE_URL, languageAlternates, ogLocale } from "@/lib/site";

/**
 * Only en, ru and uz exist. Language-like codes (/de, /fr-CA) are sent to /en
 * by next.config.ts; any other first segment is a 404 (app/not-found.tsx).
 */
export const dynamicParams = false;

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
  const description = tr(seo.description, locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: TITLE,
    description,
    keywords: tr(seo.keywords, locale),
    authors: [{ name: profile.name }],
    creator: profile.name,
    alternates: { canonical: `/${locale}`, languages: languageAlternates() },
    openGraph: {
      type: "website",
      locale: ogLocale[locale],
      url: `${SITE_URL}/${locale}`,
      title: TITLE,
      description,
      siteName: profile.name,
    },
    twitter: { card: "summary_large_image", title: TITLE, description },
  };
}

/*
 * `js` on <html> lets CSS pre-hide [data-reveal] (see Reveal). It is only set
 * when IntersectionObserver exists (whileInView needs it), and it is taken
 * back after 3s if the app never hydrated (MotionProvider sets
 * data-hydrated), so pre-hidden content can never stay hidden.
 */
const JS_FLAG = `(function(){var d=document.documentElement;if(!("IntersectionObserver" in window))return;d.classList.add("js");setTimeout(function(){if(!d.hasAttribute("data-hydrated"))d.classList.remove("js")},3000)})()`;

export default async function RootLayout(props: LayoutProps) {
  const { lang } = await props.params;
  const locale = resolveLocale(lang);

  return (
    <html lang={locale} className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: JS_FLAG }} />
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
