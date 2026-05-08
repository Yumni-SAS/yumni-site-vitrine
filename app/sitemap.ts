import type { MetadataRoute } from "next";

const SITE_URL = "https://yumni.fr";

const routes = [
  { path: "", priority: 1.0, changeFrequency: "weekly" as const },
  { path: "/produit", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/solutions", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/tarifs", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/a-propos", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/partenaires", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/securite", priority: 0.5, changeFrequency: "monthly" as const },
  { path: "/mentions-legales", priority: 0.3, changeFrequency: "yearly" as const },
];

const locales = ["fr", "en"];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const lang of locales) {
      entries.push({
        url: `${SITE_URL}/${lang}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: lang === "fr" ? route.priority : route.priority * 0.9,
        alternates: {
          languages: {
            fr: `${SITE_URL}/fr${route.path}`,
            en: `${SITE_URL}/en${route.path}`,
            "x-default": `${SITE_URL}/fr${route.path}`,
          },
        },
      });
    }
  }

  return entries;
}
