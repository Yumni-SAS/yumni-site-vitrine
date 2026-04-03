"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { useDictionary } from "./dictionary-provider";

/* ================================================================
   UTILITY — Fade in on scroll
   ================================================================ */

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================
   UTILITY — Animated counter
   ================================================================ */

function CountUp({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, {
    once: true,
    margin: "-100px",
  });

  useEffect(() => {
    if (!inView) return;
    const duration = 2000;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setCount(Math.round(eased * target));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ================================================================
   MOCK DASHBOARD — placeholder UI animation
   ================================================================ */

function DashboardMock() {
  const { t, locale } = useDictionary();
  const barData = [35, 55, 40, 70, 50, 65, 85, 55, 70, 80, 45, 90, 60, 75];
  const barData2 = [60, 40, 75, 45, 80, 50, 35, 70, 55, 65, 85, 50, 70, 45];

  const kpis = [
    { label: t.home.dashMock.scoreRSE, val: "72%", color: "bg-green" },
    { label: t.home.dashMock.kpisActifs, val: "24", color: "bg-forest" },
    { label: t.home.dashMock.risques, val: "8", color: "bg-amber-500" },
    { label: t.home.dashMock.actions, val: "156", color: "bg-ink" },
  ];

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="rounded-2xl border border-line/70 bg-white shadow-[0_12px_80px_rgba(27,58,45,0.14),0_2px_8px_rgba(0,0,0,0.04)] ring-1 ring-green/[0.04] overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-sand/50">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-line-dark" />
            <span className="w-2.5 h-2.5 rounded-full bg-line-dark" />
            <span className="w-2.5 h-2.5 rounded-full bg-line-dark" />
          </div>
          <span className="ml-3 text-[11px] text-muted tracking-wide">{t.home.dashMock.cockpit}</span>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-4 gap-3 mb-6">
            {kpis.map((kpi, i) => (
              <motion.div key={i} className="p-3 rounded-lg bg-cream/80" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}>
                <div className="text-[10px] text-muted mb-1">{kpi.label}</div>
                <div className="text-base font-semibold text-ink">{kpi.val}</div>
                <div className="mt-2 h-1 rounded-full bg-line overflow-hidden">
                  <motion.div className={`h-full rounded-full ${kpi.color}`} animate={{ width: [`${40 + i * 15}%`, `${55 + i * 10}%`, `${40 + i * 15}%`] }} transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }} />
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex items-end gap-[3px] h-28 mb-5 px-1">
            {barData.map((h, i) => (
              <motion.div key={i} className="flex-1 rounded-t bg-green/20" animate={{ height: [`${h}%`, `${barData2[i]}%`, `${h}%`] }} transition={{ duration: 2.5 + (i % 3) * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.08 }} style={{ transformOrigin: "bottom" }} />
            ))}
          </div>
          <div className="space-y-2">
            {[75, 92, 58].map((w, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-1.5 w-16 rounded-full bg-line shrink-0" />
                <div className="flex-1 h-1.5 rounded-full bg-cream overflow-hidden">
                  <motion.div className="h-full rounded-full bg-green/30" animate={{ width: [`${w}%`, `${w - 15 + i * 5}%`, `${w}%`] }} transition={{ duration: 3.5 + i * 0.3, repeat: Infinity, ease: "easeInOut" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================
   MINI UI VISUALS — for scroll-driven features
   ================================================================ */

function CockpitVisual() {
  const { t, locale } = useDictionary();
  const pillars = locale === "fr" 
    ? ["Environnement", "Social", "Gouvernance", "Économique"]
    : ["Environment", "Social", "Governance", "Economic"];
  return (
    <div className="w-full rounded-xl border border-line bg-white p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-8 h-8 rounded-full bg-green/10 flex items-center justify-center"><div className="w-3 h-3 rounded-full bg-green" /></div>
        <div>
          <div className="text-sm font-semibold text-ink">{t.home.dashMock.scoreRSE}</div>
          <div className="text-xs text-muted">{locale === "fr" ? "Mis à jour en temps réel" : "Updated in real time"}</div>
        </div>
      </div>
      <div className="text-5xl font-display text-forest mb-4">72<span className="text-2xl text-muted">%</span></div>
      <div className="space-y-3">
        {pillars.map((label, i) => (
          <div key={label}>
            <div className="flex justify-between text-xs text-muted mb-1"><span>{label}</span><span>{[78, 65, 82, 63][i]}%</span></div>
            <div className="h-1.5 rounded-full bg-cream overflow-hidden"><div className="h-full rounded-full bg-green/40" style={{ width: `${[78, 65, 82, 63][i]}%` }} /></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function KPIVisual() {
  const { t, locale } = useDictionary();
  const kpiItems = locale === "fr"
    ? [
        { name: "Émissions CO₂", status: "ok", val: "-12%", trend: "↓" },
        { name: "Taux recyclage", status: "warning", val: "67%", trend: "→" },
        { name: "Parité H/F", status: "ok", val: "48%", trend: "↑" },
        { name: "Formation RSE", status: "alert", val: "23%", trend: "↓" },
        { name: "Fournisseurs certifiés", status: "ok", val: "89%", trend: "↑" },
      ]
    : [
        { name: "CO₂ Emissions", status: "ok", val: "-12%", trend: "↓" },
        { name: "Recycling rate", status: "warning", val: "67%", trend: "→" },
        { name: "Gender parity", status: "ok", val: "48%", trend: "↑" },
        { name: "CSR Training", status: "alert", val: "23%", trend: "↓" },
        { name: "Certified suppliers", status: "ok", val: "89%", trend: "↑" },
      ];
  return (
    <div className="w-full rounded-xl border border-line bg-white p-6 shadow-sm">
      <div className="text-sm font-semibold text-ink mb-4">{locale === "fr" ? "KPIs & Alertes" : "KPIs & Alerts"}</div>
      <div className="space-y-3">
        {kpiItems.map((kpi) => (
          <div key={kpi.name} className="flex items-center justify-between py-2.5 border-b border-line/50 last:border-0">
            <div className="flex items-center gap-2.5">
              <div className={`w-2 h-2 rounded-full ${kpi.status === "ok" ? "bg-green" : kpi.status === "warning" ? "bg-amber-400" : "bg-red-400"}`} />
              <span className="text-sm text-ink-light">{kpi.name}</span>
            </div>
            <div className="flex items-center gap-2"><span className="text-sm font-medium text-ink">{kpi.val}</span><span className="text-xs text-muted">{kpi.trend}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}

function WSJFVisual() {
  const { t, locale } = useDictionary();
  const items = locale === "fr"
    ? [
        { name: "Migration énergie verte", score: 94, rank: 1 },
        { name: "Programme recyclage", score: 78, rank: 2 },
        { name: "Audit fournisseurs", score: 71, rank: 3 },
        { name: "Formation interne RSE", score: 56, rank: 4 },
        { name: "Reporting carbone", score: 45, rank: 5 },
      ]
    : [
        { name: "Green energy migration", score: 94, rank: 1 },
        { name: "Recycling program", score: 78, rank: 2 },
        { name: "Supplier audit", score: 71, rank: 3 },
        { name: "Internal CSR training", score: 56, rank: 4 },
        { name: "Carbon reporting", score: 45, rank: 5 },
      ];
  return (
    <div className="w-full rounded-xl border border-line bg-white p-6 shadow-sm">
      <div className="text-sm font-semibold text-ink mb-1">{locale === "fr" ? "Priorisation WSJF" : "WSJF Prioritization"}</div>
      <div className="text-xs text-muted mb-5">{locale === "fr" ? "(Valeur + Urgence + Réduction risque) ÷ Effort" : "(Value + Urgency + Risk reduction) ÷ Effort"}</div>
      <div className="space-y-2.5">
        {items.map((item) => (
          <div key={item.name} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${item.rank === 1 ? "bg-green-light" : "bg-cream/60"}`}>
            <span className="text-xs font-medium text-muted w-5">{String(item.rank).padStart(2, "0")}</span>
            <span className="flex-1 text-sm text-ink">{item.name}</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-1.5 rounded-full bg-line overflow-hidden"><div className="h-full rounded-full bg-green" style={{ width: `${item.score}%` }} /></div>
              <span className="text-xs font-medium text-forest w-6 text-right">{item.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function RisquesVisual() {
  const { t, locale } = useDictionary();
  const cells = [[0,0,1,2,3],[0,1,1,2,3],[0,0,1,2,2],[0,0,0,1,1],[0,0,0,0,1]];
  const colors = ["bg-green/10","bg-green/30","bg-amber-400/30","bg-red-400/30"];
  return (
    <div className="w-full rounded-xl border border-line bg-white p-6 shadow-sm">
      <div className="text-sm font-semibold text-ink mb-1">{locale === "fr" ? "Matrice des risques" : "Risk matrix"}</div>
      <div className="text-xs text-muted mb-5">{locale === "fr" ? "Impact × Probabilité" : "Impact × Probability"}</div>
      <div className="flex gap-1">
        <div className="flex flex-col justify-between py-1 pr-2">
          {["5","4","3","2","1"].map((n) => (<span key={n} className="text-[10px] text-muted h-10 flex items-center">{n}</span>))}
        </div>
        <div className="flex-1 grid grid-rows-5 gap-1">
          {cells.map((row, ri) => (
            <div key={ri} className="grid grid-cols-5 gap-1">
              {row.map((c, ci) => (
                <div key={ci} className={`h-10 rounded ${colors[c]} flex items-center justify-center`}>
                  {((ri === 0 && ci === 4) || (ri === 1 && ci === 3)) && <div className="w-2.5 h-2.5 rounded-full bg-red-400" />}
                  {ri === 2 && ci === 2 && <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />}
                  {ri === 4 && ci === 0 && <div className="w-2.5 h-2.5 rounded-full bg-green" />}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between mt-2 px-8">
        {["1","2","3","4","5"].map((n) => (<span key={n} className="text-[10px] text-muted">{n}</span>))}
      </div>
    </div>
  );
}

function ReportingVisual() {
  const { t, locale } = useDictionary();
  return (
    <div className="w-full rounded-xl border border-line bg-white p-6 shadow-sm">
      <div className="text-sm font-semibold text-ink mb-4">{locale === "fr" ? "Rapport COMEX" : "Board Report"}</div>
      <div className="flex items-center gap-6 mb-6">
        <div className="text-center">
          <div className="text-3xl font-display text-muted line-through decoration-red-300">{locale === "fr" ? "3 jours" : "3 days"}</div>
          <div className="text-xs text-muted mt-1">{locale === "fr" ? "Avant" : "Before"}</div>
        </div>
        <div className="text-2xl text-muted">→</div>
        <div className="text-center">
          <div className="text-3xl font-display text-forest">12 sec</div>
          <div className="text-xs text-green font-medium mt-1">{locale === "fr" ? "Avec Yumni" : "With Yumni"}</div>
        </div>
      </div>
      <div className="rounded-lg bg-cream border border-line p-4 aspect-[16/10]">
        <div className="h-2 w-24 rounded-full bg-forest/20 mb-3" />
        <div className="h-1.5 w-36 rounded-full bg-line mb-6" />
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[1,2,3].map((i) => (<div key={i} className="aspect-square rounded bg-green/10 flex items-center justify-center"><div className="w-6 h-6 rounded-full bg-green/20" /></div>))}
        </div>
        <div className="h-1 w-full rounded-full bg-line" />
      </div>
    </div>
  );
}

function ESRSVisual() {
  const { t, locale } = useDictionary();
  const esrsLabels = locale === "fr"
    ? { climate: "Climat", pollution: "Pollution", water: "Eau", biodiversity: "Biodiversité", resources: "Ressources", workforce: "Effectifs", valueChain: "Chaîne valeur", communities: "Communautés", consumers: "Consommateurs", governance: "Gouvernance", conduct: "Conduite", general: "Général", coverage: "Couverture ESRS", stats: "12 standards • 8 couverts • 4 à compléter" }
    : { climate: "Climate", pollution: "Pollution", water: "Water", biodiversity: "Biodiversity", resources: "Resources", workforce: "Workforce", valueChain: "Value chain", communities: "Communities", consumers: "Consumers", governance: "Governance", conduct: "Conduct", general: "General", coverage: "ESRS Coverage", stats: "12 standards • 8 covered • 4 to complete" };
  const standards = [
    { id: "E1", label: esrsLabels.climate, covered: true },
    { id: "E2", label: esrsLabels.pollution, covered: true },
    { id: "E3", label: esrsLabels.water, covered: false },
    { id: "E4", label: esrsLabels.biodiversity, covered: false },
    { id: "E5", label: esrsLabels.resources, covered: true },
    { id: "S1", label: esrsLabels.workforce, covered: true },
    { id: "S2", label: esrsLabels.valueChain, covered: true },
    { id: "S3", label: esrsLabels.communities, covered: false },
    { id: "S4", label: esrsLabels.consumers, covered: true },
    { id: "G1", label: esrsLabels.governance, covered: true },
    { id: "G2", label: esrsLabels.conduct, covered: true },
    { id: "IRO", label: esrsLabels.general, covered: false },
  ];
  return (
    <div className="w-full rounded-xl border border-line bg-white p-6 shadow-sm">
      <div className="text-sm font-semibold text-ink mb-1">{esrsLabels.coverage}</div>
      <div className="text-xs text-muted mb-5">{esrsLabels.stats}</div>
      <div className="grid grid-cols-4 gap-2">
        {standards.map((s) => (
          <div key={s.id} className={`p-2 rounded-lg text-center ${s.covered ? "bg-green-light" : "bg-cream border border-line-dark/30"}`}>
            <div className={`text-xs font-semibold ${s.covered ? "text-forest" : "text-muted"}`}>{s.id}</div>
            <div className="text-[10px] text-muted mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   SCROLL-DRIVEN FEATURES SECTION
   ================================================================ */

function ScrollFeatures() {
  const { t, locale } = useDictionary();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const featureItems = t.home.features.items;
  const visuals = [<CockpitVisual key="c" />, <KPIVisual key="k" />, <WSJFVisual key="w" />, <ReportingVisual key="r" />];

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(visuals.length - 1, Math.floor(latest * visuals.length));
    setActiveIndex(idx);
  });

  return (
    <section ref={containerRef} className="relative bg-gradient-to-b from-green-light/30 via-cream to-green-light/15" style={{ height: `${visuals.length * 100}vh` }}>
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <p className="text-green text-sm font-medium tracking-widest uppercase mb-6">{t.home.features.eyebrow}</p>
              <div className="flex items-center gap-3 mb-8">
                <span className="text-3xl font-display text-green">{activeIndex + 1}</span>
                <span className="text-lg text-muted font-light">/</span>
                <span className="text-lg text-muted font-light">{visuals.length}</span>
              </div>
              <div className="flex items-center gap-2 mb-10">
                {visuals.map((_, i) => (
                  <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? "w-8 bg-green" : i < activeIndex ? "w-3 bg-green/30" : "w-3 bg-line"}`} />
                ))}
              </div>
              <motion.div key={activeIndex} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
                <h3 className="font-display text-3xl md:text-4xl text-green mb-4 leading-tight">{featureItems[activeIndex]?.title}</h3>
                <p className="text-muted leading-relaxed max-w-md text-base">{featureItems[activeIndex]?.description}</p>
              </motion.div>
              <div className="mt-8">
                <Link href={`/${locale}/produit`} className="text-green text-sm font-medium hover:text-forest transition-colors">{t.common.seeAllFeatures}</Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <motion.div key={activeIndex} className="origin-center scale-110" initial={{ opacity: 0, x: 30, scale: 1.08 }} animate={{ opacity: 1, x: 0, scale: 1.1 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
                {visuals[activeIndex]}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   PAGE SECTIONS
   ================================================================ */

function HeroSection() {
  const { t, locale } = useDictionary();
  return (
    <section className="relative pt-24 pb-20 md:pt-36 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.035]" style={{ backgroundImage: 'linear-gradient(#1B3A2D 1px, transparent 1px), linear-gradient(90deg, #1B3A2D 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: 'radial-gradient(circle, #1B3A2D 0.8px, transparent 0.8px)', backgroundSize: '20px 20px' }} />
        <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-green-light/50 blur-[140px]" />
        <div className="absolute top-1/2 -left-48 w-[500px] h-[500px] rounded-full bg-orange-light/30 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <motion.div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/80 border border-green/10 backdrop-blur-sm shadow-[0_2px_8px_rgba(0,129,74,0.06)] mb-8" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="w-2 h-2 rounded-full bg-green animate-pulse" />
              <span className="text-green text-sm font-medium tracking-wide">{t.home.hero.eyebrow}</span>
            </motion.div>

            <motion.h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-forest mb-7" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              {t.home.hero.title1}{" "}<br className="hidden md:block" />
              {t.home.hero.titleHighlight}.{" "}
              <span className="italic text-green">{t.home.hero.title2}.</span>
            </motion.h1>

            <motion.p className="text-lg md:text-xl text-muted max-w-lg mb-10 leading-relaxed" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
              {t.home.hero.subtitle}
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}>
              <Link href={`/${locale}/essai-gratuit`} className="group bg-green text-white font-medium px-8 py-3.5 rounded-full hover:bg-forest transition-all duration-300 text-sm text-center shadow-[0_4px_20px_rgba(0,129,74,0.25)] hover:shadow-[0_8px_30px_rgba(0,129,74,0.35)]">
                {t.common.freeTrial}<span className="ml-2 inline-block group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
              <Link href={`/${locale}/demo`} className="border-2 border-green/20 text-ink hover:border-green hover:text-green px-8 py-3.5 rounded-full transition-all duration-300 text-sm text-center hover:shadow-[0_4px_16px_rgba(0,129,74,0.08)]">
                {t.common.requestDemo}
              </Link>
            </motion.div>
          </div>

          <div className="hidden lg:flex justify-center relative">
            <div className="absolute -inset-10 bg-gradient-to-br from-green/8 via-transparent to-orange/5 rounded-3xl blur-2xl" />
            <div className="relative origin-top-right scale-110"><DashboardMock /></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Trust Strip ────────────────────────────────── */

function TrustStrip() {
  const { t, locale } = useDictionary();
  const trustItems = [
    {
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>,
      label: "CSRD Ready",
      sub: locale === "fr" ? "Conforme directive 2024" : "2024 directive compliant",
    },
    {
      icon: <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
      label: locale === "fr" ? "RGPD Ready" : "GDPR Ready",
      sub: locale === "fr" ? "Protection des données" : "Data protection",
    },
    {
      icon: <svg width="26" height="26" viewBox="0 0 120 120" fill="currentColor"><path d="M60 0C26.86 0 0 26.86 0 60s26.86 60 60 60 60-26.86 60-60S93.14 0 60 0zm0 10c27.61 0 50 22.39 50 50S87.61 110 60 110 10 87.61 10 60 32.39 10 60 10zm-8 25v50l40-25-40-25z"/></svg>,
      label: locale === "fr" ? "Hébergé Scaleway" : "Hosted on Scaleway",
      sub: locale === "fr" ? "Souveraineté des données 🇫🇷" : "Data sovereignty 🇫🇷",
    },
  ];
  return (
    <section className="relative py-7 md:py-8 bg-forest overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {trustItems.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-green-muted group-hover:bg-white/15 transition-colors">{item.icon}</div>
                <div>
                  <div className="text-base font-bold text-white leading-tight">{item.label}</div>
                  <div className="text-sm text-white/50 leading-tight mt-0.5">{item.sub}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Social Proof Strip ──────────────────────────── */

function SocialProofStrip() {
  const { t, locale } = useDictionary();
  return (
    <section className="relative py-10 md:py-14 bg-sand/50 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #1B3A2D 0.5px, transparent 0.5px)', backgroundSize: '16px 16px' }} />
        <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-green/5 blur-3xl" />
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-orange/5 blur-3xl" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {t.home.socialProof.items.map((item: { num: string; label: string }, i: number) => (
            <FadeIn key={i} delay={i * 0.08}>
              <div className="text-center md:border-r last:border-0 border-line">
                <div className="font-display text-3xl md:text-4xl text-forest mb-1">{item.num}</div>
                <div className="text-xs text-muted uppercase tracking-wide font-medium">{item.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Problem Section ─────────────────────────────── */

function ProblemSection() {
  const { t, locale } = useDictionary();
  const problemIcons = [
    <svg key="0" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    <svg key="1" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
    <svg key="2" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>,
  ];
  return (
    <section className="py-24 md:py-36 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="max-w-2xl mb-16">
          <p className="text-orange text-sm font-semibold tracking-widest uppercase mb-4">{t.home.problem.eyebrow}</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-forest leading-tight">{t.home.problem.title}</h2>
        </FadeIn>
        <div className="grid md:grid-cols-3 relative">
          <div className="hidden md:block absolute top-0 bottom-0 left-1/3 w-px bg-line" />
          <div className="hidden md:block absolute top-0 bottom-0 left-2/3 w-px bg-line" />
          {t.home.problem.items.map((p: { num: string; stat: string; detail: string }, i: number) => (
            <FadeIn key={i} delay={i * 0.15}>
              <div className={`relative py-4 md:py-0 group ${i === 0 ? "md:pr-10" : i === 1 ? "md:px-10" : "md:pl-10"} ${i < 2 ? "border-b md:border-b-0 border-line" : ""}`}>
                <div className="font-display text-[5.5rem] md:text-[7rem] leading-none text-forest/[0.06] group-hover:text-green/[0.12] transition-colors duration-500 select-none mb-2">{p.num}</div>
                <div className="text-orange mb-5">{problemIcons[i]}</div>
                <h3 className="text-xl font-bold text-ink mb-3 leading-snug">{p.stat}</h3>
                <p className="text-muted leading-relaxed text-[15px]">{p.detail}</p>
                <div className="mt-8 h-0.5 w-10 bg-line group-hover:w-16 group-hover:bg-orange transition-all duration-500" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
    </section>
  );
}

/* ── Solution Section ────────────────────────────── */

function SolutionSection() {
  const { t, locale } = useDictionary();
  return (
    <section className="py-24 md:py-36 bg-sand/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
          <FadeIn className="lg:col-span-3">
            <div className="relative rounded-2xl border border-line/70 overflow-hidden bg-white aspect-[16/10] flex items-center justify-center group cursor-pointer shadow-[0_8px_40px_rgba(27,58,45,0.1)] hover:shadow-[0_16px_60px_rgba(27,58,45,0.15)] transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-green-light/20 via-transparent to-transparent pointer-events-none" />
              <div className="relative z-10 w-20 h-20 rounded-full bg-green flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-[0_4px_30px_rgba(0,129,74,0.3)]">
                <svg width="22" height="24" viewBox="0 0 18 20" fill="none" className="ml-1"><path d="M0 0L18 10L0 20V0Z" fill="white" /></svg>
              </div>
              <span className="absolute bottom-4 right-4 text-xs text-muted">{t.home.solution.videoLength}</span>
            </div>
          </FadeIn>
          <FadeIn delay={0.15} className="lg:col-span-2">
            <p className="text-orange text-sm font-semibold tracking-widest uppercase mb-4">{t.home.solution.eyebrow}</p>
            <h2 className="font-display text-3xl md:text-4xl text-forest mb-5 leading-tight">
              {t.home.solution.title1}<br />{t.home.solution.title2}
            </h2>
            <p className="text-muted leading-relaxed mb-8 max-w-md">{t.home.solution.description}</p>
            <Link href={`/${locale}/produit`} className="text-green font-medium hover:text-forest transition-colors text-sm">{t.common.seeAllFeatures}</Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ── Stats Section ─────────────────────────────── */

function StatsSection() {
  const { t, locale } = useDictionary();
  return (
    <section className="py-20 md:py-28 bg-forest relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-green/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-green/5 blur-2xl" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-12">
          {t.home.stats.items.map((s: { value: number; suffix: string; unit: string; label: string }, i: number) => (
            <FadeIn key={i} delay={i * 0.08} className="text-center lg:border-r last:border-0 border-white/10">
              <div className="font-display text-4xl md:text-5xl text-white"><CountUp target={s.value} suffix={s.suffix} /></div>
              <div className="text-sm text-white/80 font-medium mt-1">{s.unit}</div>
              <div className="text-xs text-white/50 mt-0.5">{s.label}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Audience Section ────────────────────────────── */

function AudienceSection() {
  const { t, locale } = useDictionary();
  const [active, setActive] = useState(0);
  const audiences = t.home.audience.items;
  const a = audiences[active];
  const gradients = ["from-green/80 to-forest/90", "from-forest/80 to-green/90", "from-green/70 to-forest-light/90"];

  return (
    <section className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-6">
        <FadeIn className="max-w-2xl mb-16">
          <p className="text-orange text-sm font-semibold tracking-widest uppercase mb-4">{t.home.audience.eyebrow}</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-forest leading-tight">
            {t.home.audience.title1}<br />{t.home.audience.title2}
          </h2>
        </FadeIn>
        <div className="grid lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start">
          <FadeIn>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-forest">
              <motion.div key={active} className={`absolute inset-0 bg-gradient-to-br ${gradients[active]}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} />
              <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
              <div className="relative z-10 flex flex-col justify-between h-full p-8 md:p-10">
                <div>
                  <motion.span key={`tag-${active}`} className="inline-block text-xs font-semibold tracking-widest uppercase text-white/70 mb-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>{a.tag}</motion.span>
                  <motion.h3 key={`title-${active}`} className="font-display text-3xl md:text-4xl text-white leading-tight mb-2" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.05 }}>{a.title}</motion.h3>
                  <motion.p key={`sub-${active}`} className="font-display text-xl text-white/60 italic" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }}>{a.subtitle}</motion.p>
                </div>
                <motion.div key={`points-${active}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.15 }}>
                  <ul className="space-y-2 mb-6">
                    {a.points.map((pt: string, j: number) => (
                      <li key={j} className="flex items-start gap-2.5 text-white/85 text-sm leading-relaxed"><span className="text-orange mt-0.5 shrink-0">✓</span>{pt}</li>
                    ))}
                  </ul>
                  <Link href={`/${locale}${a.href}`} className="inline-flex items-center gap-1.5 text-white text-sm font-semibold bg-white/15 hover:bg-white/25 backdrop-blur-sm px-5 py-2.5 rounded-full transition-colors">{a.cta}</Link>
                </motion.div>
              </div>
            </div>
          </FadeIn>
          <div className="flex flex-col gap-3">
            {audiences.map((item: { tag: string; title: string }, i: number) => (
              <button key={i} onClick={() => setActive(i)} className={`text-left px-6 py-5 rounded-xl transition-all duration-300 border cursor-pointer ${i === active ? "bg-green-light/40 border-green/20 shadow-[0_2px_12px_rgba(0,129,74,0.08)]" : "bg-white border-line hover:border-green/15 hover:bg-sand/40"}`}>
                <div className="flex items-center gap-3 mb-1.5">
                  <span className={`w-2.5 h-2.5 rounded-full transition-colors ${i === active ? "bg-green" : "bg-line-dark"}`} />
                  <span className={`text-sm font-bold transition-colors ${i === active ? "text-forest" : "text-muted"}`}>{item.tag}</span>
                </div>
                <p className={`text-sm leading-relaxed ml-[22px] transition-colors ${i === active ? "text-ink" : "text-subtle"}`}>{item.title}</p>
                {i === active && <motion.div className="mt-3 ml-[22px] h-0.5 bg-green rounded-full" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 0.4, ease: "easeOut" }} />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Floating CTA Card ─────────────────────────── */

function CTAFloatingCard({ className, delay = 0, children }: { className?: string; delay?: number; children: React.ReactNode }) {
  return (
    <motion.div className={`absolute hidden lg:block ${className}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}>
      <div className="rounded-xl border border-white/15 bg-white/10 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.15)] p-3">{children}</div>
    </motion.div>
  );
}

/* Large CTA dashboard */
function CTADashboardLarge() {
  const { t, locale } = useDictionary();
  const bars = [35, 55, 40, 70, 50, 65, 85, 55, 70, 80, 45, 90, 60, 75, 50, 68];
  const bars2 = [60, 40, 75, 45, 80, 50, 35, 70, 55, 65, 85, 50, 70, 45, 65, 52];
  const kpis = [
    { label: t.home.cta.scoreRSE, val: "72%", color: "bg-green/50" },
    { label: t.home.cta.kpisActifs, val: "24", color: "bg-green-muted/50" },
    { label: t.home.cta.risques, val: "8", color: "bg-orange/50" },
    { label: t.home.cta.actions, val: "156", color: "bg-white/30" },
  ];
  return (
    <motion.div className="relative w-full max-w-4xl mx-auto" initial={{ opacity: 0, y: 40, scale: 0.96 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}>
      <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md shadow-[0_12px_60px_rgba(0,0,0,0.25)] overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10">
          <div className="flex gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green/60" /><span className="w-2.5 h-2.5 rounded-full bg-orange/50" /><span className="w-2.5 h-2.5 rounded-full bg-white/20" /></div>
          <span className="ml-3 text-[11px] text-white/30">{t.home.dashMock.cockpit}</span>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-4 gap-3 mb-6">
            {kpis.map((kpi, i) => (
              <div key={i} className="p-3 rounded-lg bg-white/[0.06]">
                <div className="text-[10px] text-white/40 mb-1">{kpi.label}</div>
                <div className="text-lg font-semibold text-white">{kpi.val}</div>
                <div className="mt-2 h-1 rounded-full bg-white/10 overflow-hidden">
                  <motion.div className={`h-full rounded-full ${kpi.color}`} animate={{ width: [`${40 + i * 15}%`, `${55 + i * 10}%`, `${40 + i * 15}%`] }} transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }} />
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-end gap-[3px] h-32 px-1">
            {bars.map((h, i) => (
              <motion.div key={i} className="flex-1 rounded-t bg-green/30" animate={{ height: [`${h}%`, `${bars2[i]}%`, `${h}%`] }} transition={{ duration: 2.5 + (i % 3) * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.06 }} style={{ transformOrigin: "bottom" }} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Final CTA ─────────────────────────────────── */

function FinalCTA() {
  const { t, locale } = useDictionary();
  return (
    <section className="relative my-12 md:my-20 mx-4 md:mx-8 lg:mx-12 rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bg-forest" />
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[160%] bg-gradient-to-br from-green/25 via-green/10 to-transparent rotate-[12deg] origin-top-right" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[120%] bg-gradient-to-tr from-orange/8 via-transparent to-transparent -rotate-[8deg] origin-bottom-left" />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] right-[15%] w-[500px] h-[500px] rounded-full bg-green/12 blur-[120px]" />
        <div className="absolute bottom-[5%] left-[10%] w-[400px] h-[400px] rounded-full bg-orange/8 blur-[100px]" />
        <div className="absolute top-[50%] left-[40%] w-[300px] h-[300px] rounded-full bg-green-muted/10 blur-[80px] -translate-y-1/2" />
      </div>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />
      <div className="absolute top-[38%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none">
        <div className="absolute top-8 right-8 w-72 h-72 rounded-full border border-white/[0.04]" />
        <div className="absolute top-16 right-16 w-48 h-48 rounded-full border border-white/[0.03]" />
      </div>
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] pointer-events-none">
        <div className="absolute bottom-6 left-6 w-56 h-56 rounded-full border border-white/[0.03]" />
      </div>

      {/* Floating cards */}
      <CTAFloatingCard className="top-12 left-6 xl:left-14 animate-float-slow" delay={0.3}>
        <div className="flex items-center gap-2 mb-1.5"><div className="w-2 h-2 rounded-full bg-green" /><span className="text-[10px] text-white/50">{t.home.cta.scoreRSE}</span></div>
        <div className="text-2xl font-bold text-white">72<span className="text-sm text-white/40">%</span></div>
        <div className="flex gap-[2px] mt-2">
          {[70,85,60,90,75].map((h, i) => (<motion.div key={i} className="w-3 rounded-t bg-green/40" animate={{ height: [`${h * 0.3}px`,`${h * 0.45}px`,`${h * 0.3}px`] }} transition={{ duration: 2 + i * 0.3, repeat: Infinity, ease: "easeInOut" }} />))}
        </div>
      </CTAFloatingCard>

      <CTAFloatingCard className="top-16 right-6 xl:right-14 animate-float-medium" delay={0.5}>
        <div className="text-[10px] text-white/50 mb-1">{t.home.cta.kpisActifs}</div>
        <div className="text-xl font-bold text-white">24</div>
        <div className="mt-2 space-y-1">
          {["E","S","G"].map((l, i) => (
            <div key={l} className="flex items-center gap-1.5"><span className="text-[9px] text-white/40 w-3">{l}</span><div className="w-20 h-1 rounded-full bg-white/10 overflow-hidden"><motion.div className="h-full rounded-full bg-green-muted/60" animate={{ width: [`${55 + i * 12}%`,`${70 + i * 8}%`,`${55 + i * 12}%`] }} transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: "easeInOut" }} /></div></div>
          ))}
        </div>
      </CTAFloatingCard>

      <CTAFloatingCard className="top-[40%] left-4 xl:left-10 animate-float-fast" delay={0.6}>
        <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-orange animate-pulse" /><span className="text-[10px] text-white/60">{t.home.cta.rapportPret}</span></div>
      </CTAFloatingCard>

      <CTAFloatingCard className="top-[38%] right-4 xl:right-10 animate-float-slow" delay={0.7}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-green/20 flex items-center justify-center"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00814A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg></div>
          <div><div className="text-[10px] text-white/50">ESRS</div><div className="text-xs font-semibold text-white">{t.home.cta.esrsStandards}</div></div>
        </div>
      </CTAFloatingCard>

      <CTAFloatingCard className="bottom-[42%] left-8 xl:left-16 animate-float-medium" delay={0.8}>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-orange/20 flex items-center justify-center"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E8752A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
          <div><div className="text-[10px] text-white/50">{t.home.cta.actionEnCours}</div><div className="text-xs font-semibold text-white">{t.home.cta.bilanCarbone}</div></div>
        </div>
      </CTAFloatingCard>

      <CTAFloatingCard className="bottom-[44%] right-8 xl:right-16 animate-float-fast" delay={0.9}>
        <div className="text-[10px] text-white/50 mb-0.5">{t.home.cta.uptime}</div>
        <div className="text-lg font-bold text-green-muted">99.9%</div>
      </CTAFloatingCard>

      <div className="relative z-10 flex flex-col items-center px-6 pt-24 md:pt-36 pb-16 md:pb-24">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <motion.div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm mb-8" initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
              <span className="text-xs text-white/60 font-medium">{t.home.cta.badge}</span>
            </motion.div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1]">
              {t.home.cta.title1}<br /><span className="italic text-green-muted">{t.home.cta.titleHighlight}</span>
            </h2>
            <p className="text-lg text-white/50 max-w-xl mx-auto mb-12 leading-relaxed">{t.home.cta.description}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href={`/${locale}/demo`} className="group bg-white text-forest font-semibold px-10 py-4 rounded-full hover:bg-green-light transition-all text-sm shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
                {t.common.requestDemo}<span className="ml-2 inline-block group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
              <Link href={`/${locale}/essai-gratuit`} className="border border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-10 py-4 rounded-full transition-all text-sm">
                {t.common.freeTrial}
              </Link>
            </div>
          </div>
        </FadeIn>
        <CTADashboardLarge />
      </div>
    </section>
  );
}

/* ================================================================
   MAIN PAGE
   ================================================================ */

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <ProblemSection />
      <SolutionSection />
      <ScrollFeatures />
      <StatsSection />
      <AudienceSection />
      <FinalCTA />
    </>
  );
}
