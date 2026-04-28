/**
 * Articles — données depuis Cloudflare R2
 *
 * Structure R2 :
 *   articles/fr/<slug>.md
 *   articles/en/<slug>.md
 *
 * Le fichier MD contient un frontmatter YAML avec toutes les métadonnées.
 * Aucune config manuelle — déposer le .md dans R2, il apparaît automatiquement.
 */

import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { listObjects, getObjectText } from "./r2";

export type ArticleLang = "fr" | "en";

export interface ArticleMeta {
  slug: string;
  lang: ArticleLang;
  title: string;
  description: string;
  date: string;
  category: string;
  readingTime: number;
  author: string;
  authorRole: string;
  tags: string[];
  featured: boolean;
}

export interface Article extends ArticleMeta {
  contentHtml: string;
}

/** Récupère et parse le frontmatter d'un .md R2 sans parser le contenu */
async function parseMeta(key: string, lang: ArticleLang): Promise<ArticleMeta | null> {
  const text = await getObjectText(key);
  if (!text) return null;

  const slug = key.split("/").pop()?.replace(/\.md$/, "") ?? "";
  const { data } = matter(text);

  return {
    slug,
    lang,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    category: data.category ?? "",
    readingTime: data.readingTime ?? 5,
    author: data.author ?? "Équipe Yumni",
    authorRole: data.authorRole ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    featured: data.featured ?? false,
  };
}

/** Liste tous les articles d'une langue, triés par date décroissante */
export async function getAllArticles(lang: ArticleLang): Promise<ArticleMeta[]> {
  const prefix = `articles/${lang}/`;
  const keys = (await listObjects(prefix)).filter((k) => k.endsWith(".md"));

  const metas = await Promise.all(keys.map((k) => parseMeta(k, lang)));
  return (metas.filter(Boolean) as ArticleMeta[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Récupère un article complet (méta + HTML rendu) */
export async function getArticle(slug: string, lang: ArticleLang): Promise<Article | null> {
  const key = `articles/${lang}/${slug}.md`;
  const text = await getObjectText(key);
  if (!text) return null;

  const { data, content } = matter(text);
  const processed = await remark().use(html, { sanitize: false }).process(content);

  return {
    slug,
    lang,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    category: data.category ?? "",
    readingTime: data.readingTime ?? 5,
    author: data.author ?? "Équipe Yumni",
    authorRole: data.authorRole ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],
    featured: data.featured ?? false,
    contentHtml: processed.toString(),
  };
}

/** Slugs de tous les articles d'une langue (pour generateStaticParams) */
export async function getAllSlugs(lang: ArticleLang): Promise<string[]> {
  const prefix = `articles/${lang}/`;
  const keys = (await listObjects(prefix)).filter((k) => k.endsWith(".md"));
  return keys.map((k) => k.split("/").pop()!.replace(/\.md$/, ""));
}
