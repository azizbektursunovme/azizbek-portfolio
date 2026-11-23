import { resolveLocale } from "@/i18n/dictionaries";
import Hero from "@/components/Hero";
import WorkBento from "@/components/WorkBento";
import WebsitesSection from "@/components/WebsitesSection";
import BrandingSection from "@/components/BrandingSection";
import AdsSection from "@/components/AdsSection";
import About from "@/components/About";
import Contact from "@/components/Contact";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage(props: PageProps) {
  const { lang } = await props.params;
  const locale = resolveLocale(lang);

  return (
    <>
      <Hero locale={locale} />
      <WorkBento locale={locale} />
      <WebsitesSection locale={locale} />
      <BrandingSection locale={locale} />
      <AdsSection locale={locale} />
      <About locale={locale} />
      <Contact locale={locale} />
    </>
  );
}
