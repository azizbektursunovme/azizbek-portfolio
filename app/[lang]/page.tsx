import { getDictionary, resolveLocale } from "@/i18n/dictionaries";
import Hero from "@/components/Hero";
import WorkBento from "@/components/WorkBento";
import About from "@/components/About";
import Skills from "@/components/Skills";
import WebsitesSection from "@/components/WebsitesSection";
import BrandingSection from "@/components/BrandingSection";
import AdsSection from "@/components/AdsSection";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage(props: PageProps) {
  const { lang } = await props.params;
  const locale = resolveLocale(lang);
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero locale={locale} />
      <WorkBento locale={locale} />
      <WebsitesSection locale={locale} />
      <BrandingSection locale={locale} />
      <AdsSection locale={locale} />
      <About dict={dict} />
      <Skills dict={dict} />
      <Services dict={dict} />
      <Contact dict={dict} />
    </>
  );
}
