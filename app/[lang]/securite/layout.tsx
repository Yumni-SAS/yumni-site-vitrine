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
    title: dict.meta.security.title,
    description: dict.meta.security.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/securite`,
      languages: {
        fr: `${SITE_URL}/fr/securite`,
        en: `${SITE_URL}/en/securite`,
      },
    },
    openGraph: {
      title: dict.meta.security.ogTitle,
      description: dict.meta.security.ogDescription,
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
      siteName: "Yumni",
      url: `${SITE_URL}/${lang}/securite`,
      images: [{ url: `${SITE_URL}/Screen/01-hero-cockpit-ensemble.png`, width: 1200, height: 630, alt: "Yumni Sécurité & RGPD" }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.security.ogTitle,
      description: dict.meta.security.ogDescription,
      images: [`${SITE_URL}/Screen/01-hero-cockpit-ensemble.png`],
    },
  };
}

export default function SecurityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
