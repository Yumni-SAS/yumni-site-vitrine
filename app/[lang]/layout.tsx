import { notFound } from "next/navigation";
import { Fraunces, Nunito } from "next/font/google";
import { getDictionary, hasLocale } from "./dictionaries";
import type { Locale } from "./dictionaries";
import { DictionaryProvider } from "./dictionary-provider";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export async function generateStaticParams() {
  return [{ lang: "fr" }, { lang: "en" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);

  return {
    title: dict.meta.home.title,
    description: dict.meta.home.description,
    openGraph: {
      title: dict.meta.home.ogTitle,
      description: dict.meta.home.ogDescription,
      type: "website",
      locale: lang === "fr" ? "fr_FR" : "en_US",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <html
      lang={lang}
      className={`${fraunces.variable} ${nunito.variable}`}
    >
      <body className="font-body antialiased min-h-screen flex flex-col bg-white text-ink">
        <DictionaryProvider dictionary={dict} locale={lang as Locale}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </DictionaryProvider>
      </body>
    </html>
  );
}
