import { getDictionary, Locale } from "@/i18n/dictionaries";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import FeaturedWorks from "@/components/FeaturedWorks";
import Services from "@/components/Services";
import Contact from "@/components/Contact";

interface PageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function HomePage(props: PageProps) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);

  return (
    <>
      <Hero dict={dict} />
      <About dict={dict} />
      <Skills dict={dict} />
      <FeaturedWorks lang={lang} dict={dict} />
      <Services dict={dict} />
      <Contact dict={dict} />
    </>
  );
}
