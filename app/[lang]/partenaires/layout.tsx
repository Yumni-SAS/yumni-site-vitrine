import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import type { Metadata } from "next";

const SITE_URL = "https://yumni.fr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);

  return {
    title: dict.meta.partners.title,
    description: dict.meta.partners.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/partenaires`,
      languages: {
        fr: `${SITE_URL}/fr/partenaires`,
        en: `${SITE_URL}/en/partenaires`,
      },
    },
    openGraph: {
      title: dict.meta.partners.ogTitle,
      description: dict.meta.partners.ogDescription,
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
      siteName: "Yumni",
      url: `${SITE_URL}/${lang}/partenaires`,
      images: [{ url: `${SITE_URL}/Screen/01-hero-cockpit-ensemble.png`, width: 1200, height: 630, alt: "Yumni Partenaires RSE" }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.partners.ogTitle,
      description: dict.meta.partners.ogDescription,
      images: [`${SITE_URL}/Screen/01-hero-cockpit-ensemble.png`],
    },
  };
}

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
