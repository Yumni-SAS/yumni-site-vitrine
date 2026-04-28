import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getArticle, getAllSlugs, type ArticleLang } from "@/lib/articles";

/* ─── Static generation ───────────────────────────────────────── */

export async function generateStaticParams() {
  const langs: ArticleLang[] = ["fr", "en"];
  const params: { lang: string; slug: string }[] = [];
  for (const lang of langs) {
    const slugs = await getAllSlugs(lang);
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const article = await getArticle(slug, lang as ArticleLang);
  if (!article) return {};
  return {
    title: `${article.title} | Yumni`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

/* ─── Progress indicator bar (server-side shell, CSS driven) ─── */

function ReadingProgressBar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-line">
      <div
        id="reading-progress"
        className="h-full bg-gradient-to-r from-green to-forest origin-left"
        style={{ width: "0%" }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(){
              var bar=document.getElementById('reading-progress');
              if(!bar)return;
              function update(){
                var el=document.documentElement;
                var pct=(el.scrollTop/(el.scrollHeight-el.clientHeight))*100;
                bar.style.width=Math.min(pct,100)+'%';
              }
              window.addEventListener('scroll',update,{passive:true});
            })();
          `,
        }}
      />
    </div>
  );
}

/* ─── Formatted date ──────────────────────────────────────────── */

function formatDate(iso: string, lang: string) {
  return new Date(iso).toLocaleDateString(lang === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/* ─── Page ────────────────────────────────────────────────────── */

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = (lang === "en" ? "en" : "fr") as ArticleLang;
  const article = await getArticle(slug, locale);

  if (!article) notFound();

  const copy = locale === "fr"
    ? { back: "← Toutes les ressources", minRead: "min de lecture", share: "Partager", tags: "Thèmes", ctaTitle: "Vous souhaitez en savoir plus ?", ctaSubtitle: "Découvrez comment Yumni vous aide à structurer votre pilotage RSE.", ctaBtn: "Voir la démo" }
    : { back: "← All resources", minRead: "min read", share: "Share", tags: "Topics", ctaTitle: "Want to learn more?", ctaSubtitle: "Discover how Yumni helps you structure your ESG management.", ctaBtn: "See the demo" };

  return (
    <>
      <ReadingProgressBar />

      <div className="bg-white min-h-screen">

        {/* ── Article header ──────────────────────────────────────── */}
        <header className="relative overflow-hidden border-b border-line bg-sand/40">
          {/* Subtle decorative element */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-green/5 -translate-y-1/2 translate-x-1/4 pointer-events-none" />

          <div className="relative max-w-4xl mx-auto px-6 pt-14 pb-12">
            {/* Back link */}
            <Link
              href={`/${locale}/ressources`}
              className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-forest transition-colors mb-8 group"
            >
              <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              {copy.back}
            </Link>

            {/* Category + reading time */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-xs font-bold tracking-widest uppercase px-3 py-1.5 rounded-full bg-forest text-white">
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                {article.readingTime} {copy.minRead}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-ink leading-[1.08] mb-6">
              {article.title}
            </h1>

            {/* Description */}
            <p className="text-lg text-muted leading-relaxed mb-8 max-w-2xl">
              {article.description}
            </p>

            {/* Author + date */}
            <div className="flex items-center gap-4 pt-6 border-t border-line">
              <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center text-white text-sm font-bold shrink-0">
                {article.author.split(" ").map((n) => n[0]).join("").slice(0, 2)}
              </div>
              <div>
                <div className="font-semibold text-sm text-ink">{article.author}</div>
                {article.authorRole && (
                  <div className="text-xs text-muted">{article.authorRole} · {formatDate(article.date, locale)}</div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* ── Article body ────────────────────────────────────────── */}
        <main className="max-w-4xl mx-auto px-6 py-14 lg:py-16">
          <div className="lg:grid lg:grid-cols-[1fr_200px] lg:gap-16 items-start">

            {/* Content */}
            <article
              className="prose-article"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />

            {/* Sidebar — sticky */}
            <aside className="hidden lg:block">
              <div className="sticky top-24 space-y-6">
                {/* Tags */}
                {article.tags.length > 0 && (
                  <div className="rounded-2xl border border-line bg-sand/50 p-5">
                    <div className="text-xs font-bold tracking-widest uppercase text-muted mb-3">{copy.tags}</div>
                    <div className="flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2.5 py-1 rounded-full bg-white border border-line text-ink-light"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Demo CTA */}
                <div className="rounded-2xl bg-forest text-white p-5">
                  <div className="font-display text-lg font-bold mb-2 leading-snug">{copy.ctaTitle}</div>
                  <p className="text-white/70 text-xs leading-relaxed mb-4">{copy.ctaSubtitle}</p>
                  <Link
                    href={`/${locale}/demo`}
                    className="block text-center text-sm font-semibold bg-green text-white py-2.5 rounded-xl hover:bg-white hover:text-forest transition-colors"
                  >
                    {copy.ctaBtn}
                  </Link>
                </div>
              </div>
            </aside>
          </div>

          {/* Mobile CTA */}
          <div className="lg:hidden mt-12 rounded-2xl bg-forest text-white p-6">
            <div className="font-display text-xl font-bold mb-2">{copy.ctaTitle}</div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">{copy.ctaSubtitle}</p>
            <Link
              href={`/${locale}/demo`}
              className="inline-flex items-center gap-2 text-sm font-semibold bg-green text-white px-5 py-2.5 rounded-xl hover:bg-white hover:text-forest transition-colors"
            >
              {copy.ctaBtn}
            </Link>
          </div>

          {/* Back link bottom */}
          <div className="mt-16 pt-8 border-t border-line">
            <Link
              href={`/${locale}/ressources`}
              className="inline-flex items-center gap-2 text-sm text-muted hover:text-forest transition-colors group"
            >
              <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              {copy.back}
            </Link>
          </div>
        </main>

      </div>

      {/* ── Article prose styles ─────────────────────────────────── */}
      <style>{`
        .prose-article {
          color: #1A1A1A;
          font-family: var(--font-nunito), sans-serif;
          font-size: 1.0625rem;
          line-height: 1.75;
          max-width: 68ch;
        }
        .prose-article h2 {
          font-family: var(--font-fraunces), serif;
          font-size: 1.75rem;
          font-weight: 700;
          color: #1B3A2D;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          line-height: 1.2;
        }
        .prose-article h3 {
          font-family: var(--font-fraunces), serif;
          font-size: 1.25rem;
          font-weight: 700;
          color: #1A1A1A;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }
        .prose-article h4 {
          font-size: 1rem;
          font-weight: 700;
          color: #1A1A1A;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
        }
        .prose-article p {
          margin-bottom: 1.25rem;
          color: #3D3D3D;
        }
        .prose-article strong {
          color: #1A1A1A;
          font-weight: 700;
        }
        .prose-article ul, .prose-article ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }
        .prose-article li {
          margin-bottom: 0.4rem;
          color: #3D3D3D;
        }
        .prose-article ul li { list-style-type: disc; }
        .prose-article ol li { list-style-type: decimal; }
        .prose-article blockquote {
          border-left: 3px solid #00814A;
          padding: 1rem 1.25rem;
          margin: 1.75rem 0;
          background: #E8F5EE;
          border-radius: 0 12px 12px 0;
          color: #1B3A2D;
          font-style: normal;
        }
        .prose-article blockquote p {
          margin: 0;
          color: #1B3A2D;
          font-weight: 500;
        }
        .prose-article a {
          color: #00814A;
          text-decoration: underline;
          text-decoration-color: #B8DFC9;
          text-underline-offset: 3px;
          transition: color 0.2s, text-decoration-color 0.2s;
        }
        .prose-article a:hover {
          color: #1B3A2D;
          text-decoration-color: #1B3A2D;
        }
        .prose-article hr {
          border: none;
          border-top: 1px solid #E5E3DF;
          margin: 2.5rem 0;
        }
        .prose-article code {
          background: #F3F2EE;
          border: 1px solid #E5E3DF;
          border-radius: 6px;
          padding: 0.15em 0.45em;
          font-size: 0.875em;
          color: #1B3A2D;
        }
      `}</style>
    </>
  );
}
