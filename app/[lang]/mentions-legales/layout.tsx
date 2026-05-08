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
    title: dict.meta.legal.title,
    description: dict.meta.legal.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/mentions-legales`,
      languages: {
        fr: `${SITE_URL}/fr/mentions-legales`,
        en: `${SITE_URL}/en/mentions-legales`,
      },
    },
    openGraph: {
      title: dict.meta.legal.ogTitle,
      description: dict.meta.legal.ogDescription,
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
      siteName: "Yumni",
      url: `${SITE_URL}/${lang}/mentions-legales`,
      images: [{ url: `${SITE_URL}/Screen/01-hero-cockpit-ensemble.png`, width: 1200, height: 630, alt: "Yumni" }],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.legal.ogTitle,
      description: dict.meta.legal.ogDescription,
      images: [`${SITE_URL}/Screen/01-hero-cockpit-ensemble.png`],
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
