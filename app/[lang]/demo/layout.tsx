import { getDictionary, hasLocale } from "../dictionaries";
import type { Locale } from "../dictionaries";
import type { Metadata } from "next";
import { generateBreadcrumbJsonLd } from "../../components/JsonLd";

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
    title: dict.meta.demo.title,
    description: dict.meta.demo.description,
    alternates: {
      canonical: `${SITE_URL}/${lang}/demo`,
      languages: {
        fr: `${SITE_URL}/fr/demo`,
        en: `${SITE_URL}/en/demo`,
      },
    },
    openGraph: {
      title: dict.meta.demo.ogTitle,
      description: dict.meta.demo.ogDescription,
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      alternateLocale: lang === "fr" ? "en_US" : "fr_FR",
      siteName: "Yumni",
      url: `${SITE_URL}/${lang}/demo`,
    },
    twitter: {
      card: "summary_large_image",
      title: dict.meta.demo.ogTitle,
      description: dict.meta.demo.ogDescription,
    },
  };
}

export default async function DemoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return children;
  const locale = lang as Locale;

  const breadcrumbJsonLd = generateBreadcrumbJsonLd(
    [
      { name: locale === "fr" ? "Accueil" : "Home", path: "" },
      { name: "Demo", path: "/demo" },
    ],
    locale
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {children}
    </>
  );
}
