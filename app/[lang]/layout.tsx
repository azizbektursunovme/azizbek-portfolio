import type { Metadata } from "next";
import "@/app/globals.css";
import { getDictionary, resolveLocale } from "@/i18n/dictionaries";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import BackToTop from "@/components/BackToTop";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ru" }, { lang: "uz" }];
}

interface LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata(
  props: { params: Promise<{ lang: string }> }
): Promise<Metadata> {
  const { lang } = await props.params;
  const locale = resolveLocale(lang);

  const titles = {
    en: "Azizbek Tursunov | Graphic & Product Designer",
    ru: "\u0410\u0437\u0438\u0437\u0431\u0435\u043a \u0422\u0443\u0440\u0441\u0443\u043d\u043e\u0432 | \u0413\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0438 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u043e\u0432\u044b\u0439 \u0434\u0438\u0437\u0430\u0439\u043d\u0435\u0440",
    uz: "Azizbek Tursunov | Grafik va product dizayner",
  };

  const descriptions = {
    en: "Minimalist portfolio of Azizbek Tursunov, a graphic and product designer creating clear digital experiences with clean strategy.",
    ru: "\u041f\u043e\u0440\u0442\u0444\u043e\u043b\u0438\u043e \u0410\u0437\u0438\u0437\u0431\u0435\u043a\u0430 \u0422\u0443\u0440\u0441\u0443\u043d\u043e\u0432\u0430: \u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043a\u0438\u0439 \u0438 \u043f\u0440\u043e\u0434\u0443\u043a\u0442\u043e\u0432\u044b\u0439 \u0434\u0438\u0437\u0430\u0439\u043d.",
    uz: "Azizbek Tursunovning minimalistik portfoliosi: grafik va product dizayner, toza strategiya bilan aniq raqamli tajribalar yaratadi.",
  };

  return {
    title: titles[locale],
    description: descriptions[locale],
    keywords: [
      "Graphic Design",
      "Product Design",
      "Branding",
      "Portfolio",
      "Switzerland minimalism",
      "Swiss layout",
      "Next.js portfolio",
      "Azizbek Tursunov",
    ],
    authors: [{ name: "Azizbek Tursunov" }],
    creator: "Azizbek Tursunov",
    openGraph: {
      type: "website",
      locale: locale === "uz" ? "uz_UZ" : locale === "ru" ? "ru_RU" : "en_US",
      url: `https://azizbektursunov.design/${locale}`,
      title: titles[locale],
      description: descriptions[locale],
      siteName: "Azizbek Tursunov Portfolio",
    },
  };
}

export default async function RootLayout(props: LayoutProps) {
  const { lang } = await props.params;
  const locale = resolveLocale(lang);
  const children = props.children;
  const dict = await getDictionary(locale);

  return (
    <html lang={locale}>
      <body className="bg-zinc-950 text-zinc-100 font-sans antialiased overflow-x-hidden selection:bg-zinc-100 selection:text-zinc-950">
        <Preloader />
        <CustomCursor />
        <BackToTop />
        <Header dict={dict} />
        <main className="min-h-screen w-full relative z-10">
          {children}
        </main>
        <Footer dict={dict} />
      </body>
    </html>
  );
}
