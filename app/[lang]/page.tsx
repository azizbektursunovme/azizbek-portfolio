import { resolveLocale } from "@/i18n/dictionaries";
import Hero from "@/components/Hero";
import WorkBento from "@/components/WorkBento";
import WebsitesSection from "@/components/WebsitesSection";
import BrandingSection from "@/components/BrandingSection";
import AdsSection from "@/components/AdsSection";
import About from "@/components/About";
import Contact from "@/components/Contact";
import { profile } from "@/data/profile";
import { SITE_URL } from "@/lib/site";
import { tr } from "@/lib/localize";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export default async function HomePage(props: PageProps) {
  const { lang } = await props.params;
  const locale = resolveLocale(lang);

  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: tr(profile.jobTitle, locale),
    worksFor: { "@type": "Organization", name: "GFS Group LLC" },
    url: `${SITE_URL}/${locale}`,
    sameAs: [profile.instagram, profile.telegram, profile.linkedin].filter(Boolean),
    knowsLanguage: profile.languages.map((l) => l.name),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person).replaceAll("<", String.fromCharCode(92) + "u003c") }}
      />
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
