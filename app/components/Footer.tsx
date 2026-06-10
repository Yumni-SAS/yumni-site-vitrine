"use client";

import Link from "next/link";
import Image from "next/image";
import { useDictionary } from "../[lang]/dictionary-provider";

export default function Footer() {
  const { t, locale } = useDictionary();

  const footerLinks = {
    [t.footer.product]: [
      { label: t.footer.productLinks.cockpit, href: `/${locale}/produit` },
      { label: t.footer.productLinks.kpis, href: `/${locale}/produit` },
      { label: t.footer.productLinks.wsjf, href: `/${locale}/produit` },
      { label: t.footer.productLinks.risks, href: `/${locale}/produit` },
      { label: t.footer.productLinks.reporting, href: `/${locale}/produit` },
      { label: t.footer.productLinks.esrs, href: `/${locale}/produit` },
    ],
    [t.footer.solutions]: [
      { label: t.footer.solutionLinks.consulting, href: `/${locale}/solutions#cabinets` },
      { label: t.footer.solutionLinks.sme, href: `/${locale}/solutions#pme` },
      { label: t.footer.solutionLinks.groups, href: `/${locale}/solutions#eti` },
      { label: t.footer.solutionLinks.pricing, href: `/${locale}/tarifs` },
    ],
    [t.footer.resources]: [
      { label: locale === "fr" ? "Articles & publications" : "Articles & publications", href: `/${locale}/ressources` },
      { label: locale === "fr" ? "Ressources à télécharger" : "Downloadable resources", href: `/${locale}/ressources` },
    ],
    [t.footer.company]: [
      { label: t.footer.companyLinks.about, href: `/${locale}/a-propos` },
      { label: t.footer.companyLinks.contact, href: `/${locale}/contact` },
      { label: t.footer.companyLinks.security, href: `/${locale}/securite` },
      { label: t.footer.companyLinks.legal, href: `/${locale}/mentions-legales` },
    ],
  };

  const trustBadges = [
    t.common.hostedInFrance,
    t.common.gdprCompliant,
    t.common.tls,
    t.common.scaleway,
  ];

  return (
    <footer className="bg-forest text-white/90">
      <div className="max-w-7xl mx-auto px-6 py-20">
        {/* ── Top grid ───────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2.5 mb-4"
            >
              <Image
                src="/yumni.png"
                alt="Yumni"
                width={28}
                height={28}
                className="w-7 h-7 brightness-0 invert"
              />
              <span className="font-display text-2xl text-white">
                Yumni
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed">
              {t.footer.tagline}
            </p>
            <a
              href="https://www.linkedin.com/company/yumnisas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center w-8 h-8 mt-4 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="LinkedIn Yumni"
            >
              <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Trust badges ────────────────────────────────── */}
        <div className="flex flex-wrap items-center gap-3 py-8 border-t border-white/10 mb-8">
          <span className="text-xs text-white/40 mr-1">{t.common.security}</span>
          {trustBadges.map((badge) => (
            <span
              key={badge}
              className="text-xs text-white/50 px-3 py-1.5 rounded-lg border border-white/10"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* ── Bottom bar ──────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>{t.footer.copyright.replace("{year}", new Date().getFullYear().toString())}</p>
          <Link
            href={`/${locale}/mentions-legales`}
            className="hover:text-white transition-colors"
          >
            Mentions légales · CGU/CGV · Confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
}
