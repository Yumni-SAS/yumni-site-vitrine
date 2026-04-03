"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useDictionary } from "../dictionary-provider";

/* ================================================================
   CONSTANTS
   ================================================================ */

const ease = [0.22, 1, 0.36, 1] as const;

/* ================================================================
   NAV ICONS
   ================================================================ */

const icons = {
  legal: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
    </svg>
  ),
  terms: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  ),
  sales: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
    </svg>
  ),
  privacy: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  ),
  cookies: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
};

/* ================================================================
   HERO VISUAL — Floating legal documents
   ================================================================ */

function HeroVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative w-full max-w-sm mx-auto"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <div className="relative aspect-square">
        {/* Central shield */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-2xl bg-gradient-to-br from-green to-forest flex items-center justify-center shadow-[0_20px_60px_rgba(0,129,74,0.3)]"
          initial={{ scale: 0, rotate: -10 }}
          animate={inView ? { scale: 1, rotate: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, type: "spring", bounce: 0.3 }}
        >
          <svg className="w-14 h-14 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
          </svg>
        </motion.div>

        {/* Floating documents */}
        {[
          { x: -90, y: -60, delay: 0.7, rotate: -8 },
          { x: 90, y: -40, delay: 0.8, rotate: 6 },
          { x: -70, y: 70, delay: 0.9, rotate: -4 },
          { x: 80, y: 80, delay: 1.0, rotate: 10 },
        ].map((doc, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 w-16 h-20 rounded-lg bg-white border border-line shadow-[0_8px_32px_rgba(0,0,0,0.08)]"
            style={{ transform: `translate(-50%, -50%) translate(${doc.x}px, ${doc.y}px)` }}
            initial={{ opacity: 0, scale: 0.5, rotate: doc.rotate * 2 }}
            animate={inView ? { opacity: 1, scale: 1, rotate: doc.rotate } : {}}
            transition={{ duration: 0.6, delay: doc.delay, type: "spring", bounce: 0.4 }}
          >
            <div className="p-2">
              <div className="w-full h-1.5 bg-green/20 rounded-full mb-1.5" />
              <div className="w-3/4 h-1 bg-line rounded-full mb-1" />
              <div className="w-full h-1 bg-line rounded-full mb-1" />
              <div className="w-2/3 h-1 bg-line rounded-full" />
            </div>
          </motion.div>
        ))}

        {/* Decorative rings */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-green/10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full border border-dashed border-green/10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.4 }}
        />

        {/* Checkmarks */}
        {[
          { x: -100, y: 10, delay: 1.2 },
          { x: 110, y: 0, delay: 1.3 },
          { x: 0, y: -100, delay: 1.4 },
        ].map((check, i) => (
          <motion.div
            key={`check-${i}`}
            className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full bg-green-light border border-green/20 flex items-center justify-center"
            style={{ transform: `translate(-50%, -50%) translate(${check.x}px, ${check.y}px)` }}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: check.delay, type: "spring", bounce: 0.5 }}
          >
            <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ================================================================
   SECTION WRAPPER
   ================================================================ */

function SectionContent({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      {/* Section number decoration */}
      <div className="mb-8">
        <h2 className="font-display text-3xl md:text-4xl text-forest">{title}</h2>
        <div className="mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-green to-green/20" />
      </div>
      {children}
    </div>
  );
}

/* ================================================================
   MAIN PAGE
   ================================================================ */

type SectionKey = "legalNotice" | "terms" | "sales" | "privacy" | "cookies";

export default function LegalPage() {
  const { t, locale } = useDictionary();
  const l = t.legal;
  const [activeSection, setActiveSection] = useState<SectionKey>("legalNotice");

  const sections: { key: SectionKey; label: string; icon: keyof typeof icons }[] = [
    { key: "legalNotice", label: l.nav.legalNotice, icon: "legal" },
    { key: "terms", label: l.nav.terms, icon: "terms" },
    { key: "sales", label: l.nav.sales, icon: "sales" },
    { key: "privacy", label: l.nav.privacy, icon: "privacy" },
    { key: "cookies", label: l.nav.cookies, icon: "cookies" },
  ];

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(#1B3A2D 1px, transparent 1px), linear-gradient(90deg, #1B3A2D 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: "radial-gradient(circle, #1B3A2D 0.8px, transparent 0.8px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-green-light/50 blur-[140px]" />
          <div className="absolute top-1/2 -left-48 w-[500px] h-[500px] rounded-full bg-orange-light/30 blur-[120px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-green bg-green-light/50 border border-green/10 px-5 py-2 rounded-full shadow-[0_2px_8px_rgba(0,129,74,0.06)]">
              <span className="w-1.5 h-1.5 bg-green rounded-full animate-pulse" />
              {l.hero.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-forest max-w-4xl mx-auto"
          >
            {l.hero.title1}
            <br className="hidden sm:block" />
            <span className="italic text-green">{l.hero.titleHighlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto mt-7 leading-relaxed"
          >
            {l.hero.subtitle}
          </motion.p>

          {/* Last update */}
          <motion.div
            className="flex justify-center items-center gap-2 text-sm text-muted mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {l.lastUpdate}: 30 mars 2026
          </motion.div>
        </div>
      </section>

      {/* ─── NAVIGATION TABS ──────────────────────────────────── */}
      <section className="sticky top-[72px] z-30 bg-white/90 backdrop-blur-md border-b border-line">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex overflow-x-auto scrollbar-hide py-4 gap-2">
            {sections.map((section) => {
              const isActive = activeSection === section.key;
              return (
                <button
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-green text-white shadow-[0_4px_16px_rgba(0,129,74,0.25)]"
                      : "bg-sand/80 text-ink border border-transparent"
                  }`}
                >
                  <span className={isActive ? "text-white" : "text-green"}>
                    {icons[section.icon]}
                  </span>
                  {section.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CONTENT ──────────────────────────────────────────── */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6">
          {/* Legal Notice Section */}
          {activeSection === "legalNotice" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SectionContent title={l.legalNotice.title}>
                {/* Editor */}
                <div className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-green-light/30 to-white border border-green/10">
                  <h3 className="font-display text-xl text-forest mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                      </svg>
                    </span>
                    {l.legalNotice.editor.title}
                  </h3>
                  <div className="grid gap-3 text-sm text-muted">
                    <p className="font-semibold text-forest text-base">{l.legalNotice.editor.company}</p>
                    <p>{l.legalNotice.editor.capital}</p>
                    <p>{l.legalNotice.editor.rcs}</p>
                    <p>{l.legalNotice.editor.siret}</p>
                    <p>{l.legalNotice.editor.vat}</p>
                    <p>{l.legalNotice.editor.address}</p>
                    <p>{l.legalNotice.editor.phone}</p>
                    <p>{l.legalNotice.editor.email}</p>
                    <p>{l.legalNotice.editor.director}</p>
                  </div>
                </div>

                {/* Hosting */}
                <div className="mb-12 p-8 rounded-2xl bg-sand/50 border border-line">
                  <h3 className="font-display text-xl text-forest mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-orange/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 17.25v-.228a4.5 4.5 0 00-.12-1.03l-2.268-9.64a3.375 3.375 0 00-3.285-2.602H7.923a3.375 3.375 0 00-3.285 2.602l-2.268 9.64a4.5 4.5 0 00-.12 1.03v.228m19.5 0a3 3 0 01-3 3H5.25a3 3 0 01-3-3m19.5 0a3 3 0 00-3-3H5.25a3 3 0 00-3 3m16.5 0h.008v.008h-.008v-.008zm-3 0h.008v.008h-.008v-.008z" />
                      </svg>
                    </span>
                    {l.legalNotice.hosting.title}
                  </h3>
                  <div className="grid gap-3 text-sm text-muted">
                    <p className="font-semibold text-forest text-base">{l.legalNotice.hosting.company}</p>
                    <p>{l.legalNotice.hosting.address}</p>
                    <p className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-light text-green text-xs font-semibold">
                        🇫🇷 {l.legalNotice.hosting.location}
                      </span>
                    </p>
                    <p className="mt-4 p-4 rounded-xl bg-green-light/40 text-forest text-sm leading-relaxed">
                      {l.legalNotice.hosting.note}
                    </p>
                  </div>
                </div>

                {/* Intellectual Property */}
                <div className="p-8 rounded-2xl bg-white border border-line shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
                  <h3 className="font-display text-xl text-forest mb-6 flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center">
                      <svg className="w-5 h-5 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                      </svg>
                    </span>
                    {l.legalNotice.intellectual.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {l.legalNotice.intellectual.content}
                  </p>
                </div>
              </SectionContent>
            </motion.div>
          )}

          {/* Terms Section */}
          {activeSection === "terms" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SectionContent title={l.terms.title}>
                <div className="space-y-8">
                  {l.terms.sections.map((section: { title: string; content: string }, i: number) => (
                    <div
                      key={i}
                      className="relative pl-6 border-l-2 border-green/20"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-light border-2 border-green/30" />
                      <h3 className="font-display text-lg text-forest mb-3">{section.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{section.content}</p>
                    </div>
                  ))}
                </div>
              </SectionContent>
            </motion.div>
          )}

          {/* Sales Section */}
          {activeSection === "sales" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SectionContent title={l.sales.title}>
                <div className="space-y-8">
                  {l.sales.sections.map((section: { title: string; content: string }, i: number) => (
                    <div
                      key={i}
                      className="relative pl-6 border-l-2 border-orange/20"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-light border-2 border-orange/30" />
                      <h3 className="font-display text-lg text-forest mb-3">{section.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{section.content}</p>
                    </div>
                  ))}
                </div>
              </SectionContent>
            </motion.div>
          )}

          {/* Privacy Section */}
          {activeSection === "privacy" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SectionContent title={l.privacy.title}>
                {/* Intro box */}
                <div className="mb-10 p-6 rounded-2xl bg-gradient-to-br from-green-light/40 to-green-light/10 border border-green/10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-green flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-forest mb-1">RGPD Compliant</p>
                      <p className="text-sm text-muted leading-relaxed">{l.privacy.intro}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  {l.privacy.sections.map((section: { title: string; content: string }, i: number) => (
                    <div
                      key={i}
                      className="relative pl-6 border-l-2 border-green/20"
                    >
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-light border-2 border-green/30" />
                      <h3 className="font-display text-lg text-forest mb-3">{section.title}</h3>
                      <p className="text-sm text-muted leading-relaxed">{section.content}</p>
                    </div>
                  ))}
                </div>

                {/* DPO Contact */}
                <div className="mt-10 p-6 rounded-2xl bg-forest text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold">{l.privacy.dpoContact}</p>
                      <p className="text-sm text-white/60">{locale === "fr" ? "Réponse sous 24h ouvrées" : "Response within 24 business hours"}</p>
                    </div>
                  </div>
                </div>
              </SectionContent>
            </motion.div>
          )}

          {/* Cookies Section */}
          {activeSection === "cookies" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <SectionContent title={l.cookies.title}>
                {/* Intro */}
                <p className="text-muted leading-relaxed mb-10">{l.cookies.intro}</p>

                {/* Cookie types */}
                <div className="grid gap-6 mb-10">
                  {l.cookies.sections.map((section: { title: string; content: string }, i: number) => (
                    <div
                      key={i}
                      className="p-6 rounded-2xl bg-sand/50 border border-line"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          i === 0 ? "bg-muted/10 text-muted" :
                          i === 1 ? "bg-green-light text-green" :
                          i === 2 ? "bg-green/10 text-green" :
                          "bg-orange-light text-orange"
                        }`}>
                          {i === 0 && (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                            </svg>
                          )}
                          {i === 1 && (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>
                          )}
                          {i === 2 && (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                            </svg>
                          )}
                          {i === 3 && (
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <h3 className="font-display text-lg text-forest mb-2">{section.title}</h3>
                          <p className="text-sm text-muted leading-relaxed">{section.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* No cookie banner notice */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-green-light/40 to-green-light/10 border border-green/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-green flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-forest mb-1">{locale === "fr" ? "Pas de bannière cookies" : "No cookie banner"}</p>
                      <p className="text-sm text-muted leading-relaxed">{l.cookies.noCookieBanner}</p>
                    </div>
                  </div>
                </div>
              </SectionContent>
            </motion.div>
          )}
        </div>
      </section>

      {/* ─── FOOTER CTA ───────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-sand/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display text-3xl md:text-4xl text-forest mb-6">
              {locale === "fr" ? "Une question ?" : "Any questions?"}
            </h2>
            <p className="text-muted leading-relaxed mb-8">
              {locale === "fr" 
                ? "Notre équipe et notre DPO sont à votre disposition pour répondre à toutes vos questions concernant nos conditions d'utilisation et notre politique de confidentialité."
                : "Our team and DPO are available to answer all your questions about our terms of use and privacy policy."
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:rgpd@yumni.fr"
                className="inline-flex items-center justify-center gap-2 bg-green text-white font-medium px-8 py-3.5 rounded-full text-sm shadow-[0_4px_20px_rgba(0,129,74,0.25)]"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                {locale === "fr" ? "Contacter le DPO" : "Contact DPO"}
              </a>
              <a
                href="mailto:contact@yumni.fr"
                className="inline-flex items-center justify-center gap-2 border-2 border-green/20 text-ink px-8 py-3.5 rounded-full text-sm"
              >
                {locale === "fr" ? "Contact général" : "General contact"}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
