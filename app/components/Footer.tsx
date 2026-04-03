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
      { label: t.footer.solutionLinks.consulting, href: `/${locale}/solutions/cabinets-conseil` },
      { label: t.footer.solutionLinks.sme, href: `/${locale}/solutions/pme` },
      { label: t.footer.solutionLinks.groups, href: `/${locale}/solutions/eti` },
      { label: t.footer.solutionLinks.pricing, href: `/${locale}/tarifs` },
    ],
    [t.footer.resources]: [
      { label: t.footer.resourceLinks.blog, href: `/${locale}/ressources/blog` },
      { label: t.footer.resourceLinks.guides, href: `/${locale}/ressources/guides` },
      { label: t.footer.resourceLinks.glossary, href: `/${locale}/ressources/glossaire` },
      { label: t.footer.resourceLinks.webinars, href: `/${locale}/ressources/webinars` },
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
              className="text-xs text-white/50 px-3 py-1.5 rounded-full border border-white/10"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* ── Bottom bar ──────────────────────────────────── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
          <p>{t.footer.copyright.replace("{year}", new Date().getFullYear().toString())}</p>
          <div className="flex items-center gap-6">
            <Link
              href={`/${locale}/mentions-legales`}
              className="hover:text-white transition-colors"
            >
              {t.footer.legalNotice}
            </Link>
            <Link
              href={`/${locale}/politique-confidentialite`}
              className="hover:text-white transition-colors"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href={`/${locale}/cgu`}
              className="hover:text-white transition-colors"
            >
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
