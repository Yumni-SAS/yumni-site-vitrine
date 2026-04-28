import type { ReactElement } from "react";
import Link from "next/link";
import { getAllArticles, type ArticleMeta } from "@/lib/articles";
import { getAllFichiers, CATEGORY_LABELS, type Fichier, type FichierCategorie } from "@/lib/fichiers-r2";

/* ─── helpers ─────────────────────────────────────────────────── */

function formatDate(iso: string, lang: string) {
  return new Date(iso).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const CATEGORY_COLORS: Record<string, string> = {
  "Réglementation": "bg-forest/10 text-forest",
  "Méthode":        "bg-green/10 text-green",
  "Pilotage":       "bg-orange/10 text-orange",
  "Regulation":     "bg-forest/10 text-forest",
  "Method":         "bg-green/10 text-green",
  "Management":     "bg-orange/10 text-orange",
};

function getCategoryStyle(cat: string) {
  return CATEGORY_COLORS[cat] ?? "bg-sand text-ink-light";
}

/* ─── Format icon ─────────────────────────────────────────────── */

function FormatIcon({ format }: { format: string }) {
  const icons: Record<string, ReactElement> = {
    PDF: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    XLSX: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0 1 12 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h7.5c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375Z" />
      </svg>
    ),
    PPTX: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
      </svg>
    ),
    MP4: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
      </svg>
    ),
    ZIP: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
      </svg>
    ),
  };
  return icons[format] ?? icons.PDF;
}

/* ─── Article card — Featured ─────────────────────────────────── */

function ArticleCardFeatured({ article, lang }: { article: ArticleMeta; lang: string }) {
  return (
    <Link
      href={`/${lang}/ressources/${article.slug}`}
      className="group relative col-span-2 flex flex-col overflow-hidden rounded-3xl bg-forest text-white p-8 lg:p-10 min-h-[300px] hover:shadow-2xl transition-shadow duration-500"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-green/20" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-white/15 text-white/90">
            {article.category}
          </span>
          <span className="text-white/40 text-xs">— À la une</span>
        </div>

        <h2 className="font-display text-3xl lg:text-4xl font-bold leading-tight mb-4 group-hover:text-green transition-colors duration-300">
          {article.title}
        </h2>

        <p className="text-white/70 text-base leading-relaxed mb-auto line-clamp-2">
          {article.description}
        </p>

        <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/15">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green/30 flex items-center justify-center text-white text-xs font-bold">
              {article.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
            </div>
            <div>
              <div className="text-sm font-medium text-white">{article.author}</div>
              <div className="text-xs text-white/50">{formatDate(article.date, lang)}</div>
            </div>
          </div>
          <div className="flex items-center gap-2 text-green text-sm font-medium">
            <span>{article.readingTime} min</span>
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}

/* ─── Article card — Standard ────────────────────────────────── */

function ArticleCard({ article, lang }: { article: ArticleMeta; lang: string }) {
  return (
    <Link
      href={`/${lang}/ressources/${article.slug}`}
      className="group flex flex-col rounded-2xl border border-line bg-white hover:border-green/40 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="h-0.5 w-full bg-gradient-to-r from-forest to-green opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="flex flex-col h-full p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className={`text-xs font-semibold tracking-wide uppercase px-2.5 py-1 rounded-full ${getCategoryStyle(article.category)}`}>
            {article.category}
          </span>
        </div>
        <h3 className="font-display text-lg font-bold text-ink leading-snug mb-3 group-hover:text-forest transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-sm text-muted leading-relaxed line-clamp-3 mb-auto">
          {article.description}
        </p>
        <div className="flex items-center justify-between mt-5 pt-4 border-t border-line">
          <span className="text-xs text-subtle">{formatDate(article.date, lang)}</span>
          <span className="text-xs text-muted flex items-center gap-1">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            {article.readingTime} min
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Fichier card ────────────────────────────────────────────── */

function FichierCard({ fichier, lang }: { fichier: Fichier; lang: string }) {
  const label = CATEGORY_LABELS[fichier.categorie]?.[lang as "fr" | "en"] ?? fichier.categorie;

  const formatColors: Record<string, string> = {
    PDF:  "bg-red-50 text-red-600 border-red-100",
    XLSX: "bg-emerald-50 text-emerald-700 border-emerald-100",
    PPTX: "bg-orange-50 text-orange-600 border-orange-100",
    MP4:  "bg-violet-50 text-violet-600 border-violet-100",
    ZIP:  "bg-sky-50 text-sky-600 border-sky-100",
  };
  const fmtColor = formatColors[fichier.format] ?? "bg-sand text-ink-light border-line";

  return (
    <div className="group flex gap-4 rounded-2xl border border-line bg-white p-5 hover:border-green/40 hover:shadow-md transition-all duration-300">
      <div className={`shrink-0 w-12 h-12 rounded-xl border flex items-center justify-center ${fmtColor}`}>
        <FormatIcon format={fichier.format} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h4 className="font-semibold text-sm text-ink group-hover:text-forest transition-colors line-clamp-1">
            {fichier.titre}
          </h4>
          <span className="shrink-0 text-[10px] font-bold tracking-widest uppercase text-muted border border-line rounded-md px-1.5 py-0.5">
            {fichier.format}
          </span>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-sand text-ink-light">
            {label}
          </span>
          <a
            href={fichier.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-green hover:text-forest transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            {lang === "fr" ? "Télécharger" : "Download"}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */

export default async function RessourcesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang === "en" ? "en" : "fr") as "fr" | "en";

  const [articles, fichiers] = await Promise.all([
    getAllArticles(locale),
    getAllFichiers(),
  ]);

  const featuredArticle  = articles.find((a) => a.featured);
  const otherArticles    = articles.filter((a) => !a.featured);

  const copy = locale === "fr"
    ? {
        eyebrow: "Centre de ressources",
        title: "Ressources RSE : comprendre,",
        titleAccent: "piloter, reporter.",
        subtitle: "Articles pratiques sur la CSRD, les ESRS, le pilotage RSE et les meilleures pratiques pour les PME, ETI et cabinets de conseil.",
        articlesTitle: "Articles & Publications",
        articlesSubtitle: "Analyses et retours d'expérience de nos experts RSE",
        fichiersTitle: "Ressources à télécharger",
        fichiersSubtitle: "Guides, templates et outils opérationnels, librement accessibles",
        noArticles: "Bientôt disponible",
        noFichiers: "Bientôt disponible",
        ctaTitle: "Vous voulez aller plus loin ?",
        ctaSubtitle: "Nos experts RSE vous accompagnent dans votre démarche CSRD.",
        ctaBtn: "Demander une démo",
      }
    : {
        eyebrow: "Resource center",
        title: "ESG resources: understand,",
        titleAccent: "manage, report.",
        subtitle: "Practical articles on CSRD, ESRS, ESG management and best practices for SMEs, mid-caps and consulting firms.",
        articlesTitle: "Articles & Publications",
        articlesSubtitle: "Analysis and insights from our ESG experts",
        fichiersTitle: "Downloadable Resources",
        fichiersSubtitle: "Guides, templates and operational tools, freely accessible",
        noArticles: "Coming soon",
        noFichiers: "Coming soon",
        ctaTitle: "Want to go further?",
        ctaSubtitle: "Our ESG experts will guide you through your CSRD journey.",
        ctaBtn: "Request a demo",
      };

  return (
    <div className="bg-white min-h-screen">

      {/* ── Hero — même pattern que solutions ──────────────────── */}
      <section className="relative -mt-16 pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Cercles concentriques SVG — discrets */}
          <svg className="absolute -right-[10%] -top-[10%] w-[65%] h-[120%] opacity-[0.04]" viewBox="0 0 800 800" fill="none">
            <circle cx="400" cy="400" r="380" stroke="#1B3A2D" strokeWidth="1.2" />
            <circle cx="400" cy="400" r="300" stroke="#1B3A2D" strokeWidth="0.8" />
            <circle cx="400" cy="400" r="220" stroke="#1B3A2D" strokeWidth="0.5" />
            <circle cx="400" cy="400" r="140" stroke="#1B3A2D" strokeWidth="0.3" />
          </svg>
          <div className="absolute -top-[200px] -right-[200px] w-[700px] h-[700px] rounded-full bg-green/[0.05]" />
          <div className="absolute bottom-0 -left-[100px] w-[400px] h-[400px] rounded-full bg-orange/[0.05]" />
          <div className="absolute bottom-[5%] left-[25%] w-[500px] h-[500px] rounded-full bg-orange/[0.04] blur-[100px]" />
          <div className="absolute bottom-[8%] right-[15%] w-[400px] h-[400px] rounded-full bg-green/[0.04] blur-[80px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <p className="text-sm font-semibold tracking-widest uppercase text-green mb-5">
            {copy.eyebrow}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-forest mb-7">
            {copy.title}
            <br />
            <span className="italic text-green">{copy.titleAccent}</span>
          </h1>
          <p className="text-lg md:text-xl text-muted max-w-2xl mb-10 leading-relaxed">
            {copy.subtitle}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 pb-20 space-y-20">

        {/* ── Articles ───────────────────────────────────────────── */}
        <section>
          <div className="mb-10">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-2">
              {copy.articlesTitle}
            </h2>
            <p className="text-muted text-base">{copy.articlesSubtitle}</p>
          </div>

          {articles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line bg-sand/50 py-20 text-center">
              <div className="w-10 h-10 mx-auto mb-3 text-line-dark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                </svg>
              </div>
              <p className="text-muted text-sm">{copy.noArticles}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {featuredArticle && (
                <ArticleCardFeatured article={featuredArticle} lang={locale} />
              )}
              <div className="flex flex-col gap-5">
                {otherArticles.slice(0, 2).map((a) => (
                  <ArticleCard key={a.slug} article={a} lang={locale} />
                ))}
              </div>
              {otherArticles.slice(2).map((a) => (
                <ArticleCard key={a.slug} article={a} lang={locale} />
              ))}
            </div>
          )}
        </section>

        {/* ── Séparateur ─────────────────────────────────────────── */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-line" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-white px-6 text-muted text-sm font-medium">↓</span>
          </div>
        </div>

        {/* ── Fichiers ───────────────────────────────────────────── */}
        <section>
          <div className="mb-10">
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-ink mb-2">
              {copy.fichiersTitle}
            </h2>
            <p className="text-muted text-base">{copy.fichiersSubtitle}</p>
          </div>

          {fichiers.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-line bg-sand/50 py-20 text-center">
              <div className="w-10 h-10 mx-auto mb-3 text-line-dark">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
              </div>
              <p className="text-muted text-sm">{copy.noFichiers}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fichiers.map((f) => (
                <FichierCard key={f.id} fichier={f} lang={locale} />
              ))}
            </div>
          )}
        </section>

        {/* ── CTA ────────────────────────────────────────────────── */}
        <section className="rounded-3xl bg-forest text-white px-8 py-12 lg:px-16 lg:py-14 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-green/20" />
            <div className="absolute bottom-0 right-0 left-0 h-1/2 bg-gradient-to-t from-black/10 to-transparent" />
          </div>
          <div className="relative max-w-xl">
            <h2 className="font-display text-3xl lg:text-4xl font-bold mb-4 leading-tight">
              {copy.ctaTitle}
            </h2>
            <p className="text-white/70 text-base mb-8 leading-relaxed">
              {copy.ctaSubtitle}
            </p>
            <Link
              href={`/${locale}/demo`}
              className="inline-flex items-center gap-2 bg-green text-white font-semibold px-7 py-3.5 rounded-xl hover:bg-white hover:text-forest transition-all duration-300 group"
            >
              {copy.ctaBtn}
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
