"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
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
      <div className="rounded-2xl border border-line bg-white shadow-xl overflow-hidden">
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
  const { locale } = useDictionary();
  const [activeTab, setActiveTab] = useState(0);

  // Auto-switch between tabs
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev === 0 ? 1 : 0));
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  const tabLabels = ["Vue d'ensemble", "Vue Portefeuille RSE"];

  return (
    <div className="w-full aspect-square max-h-[80vh] rounded-2xl border border-line/70 bg-white shadow-[0_12px_60px_rgba(27,58,45,0.12),0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
      {/* ─ Browser Chrome ─ */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-line bg-sand/60">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green/50" />
        </div>
        <div className="ml-3 flex-1 h-6 rounded-md bg-white/80 border border-line/50 flex items-center px-2.5">
          <span className="text-[12px] text-muted/60 tracking-wide">app.yumni.fr / cockpit</span>
        </div>
      </div>

      {/* ─ Dashboard Header ─ */}
      <div className="px-5 pt-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-green/10 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" fill="#00814A" opacity="0.7"/><rect x="9" y="1" width="6" height="6" rx="1.5" fill="#00814A" opacity="0.4"/><rect x="1" y="9" width="6" height="6" rx="1.5" fill="#00814A" opacity="0.4"/><rect x="9" y="9" width="6" height="6" rx="1.5" fill="#00814A" opacity="0.2"/></svg>
            </div>
            <div>
              <div className="text-xs font-semibold text-ink leading-tight">Tableau de bord RSE</div>
              <div className="text-[11px] text-muted leading-tight">Performance globale de votre stratégie RSE</div>
            </div>
          </div>
        </div>

        {/* ─ Tab Switcher ─ */}
        <div className="flex gap-1 p-0.5 bg-sand/80 rounded-lg w-fit">
          {tabLabels.map((label, i) => (
            <button
              key={label}
              onClick={() => setActiveTab(i)}
              className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-300 ${
                activeTab === i
                  ? "bg-white text-ink shadow-sm"
                  : "text-muted hover:text-ink-light"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ─ Dashboard Content ─ */}
      <div className="px-5 pb-5 flex-1 relative overflow-hidden">
        {/* ═══ Vue d'ensemble ═══ */}
        <motion.div
          key="vue-ensemble"
          initial={false}
          animate={{
            opacity: activeTab === 0 ? 1 : 0,
            x: activeTab === 0 ? 0 : -12,
            scale: activeTab === 0 ? 1 : 0.99,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`${activeTab === 0 ? "" : "pointer-events-none absolute inset-x-5 top-0"}`}
        >
          {/* Score RSE Global */}
          <div className="rounded-xl border border-line/50 bg-gradient-to-br from-white to-sand/30 p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[12px] font-semibold text-ink">Score RSE Global</div>
                <div className="text-[10px] text-muted">Performance globale de votre stratégie RSE</div>
              </div>
              <div className="text-[10px] text-muted flex items-center gap-1">
                <span className="inline-block w-1 h-1 rounded-full bg-green animate-pulse" />
                ~ 0%
              </div>
            </div>
            <div className="flex items-center gap-6">
              {/* Circular gauge */}
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                  <circle cx="32" cy="32" r="26" fill="none" stroke="#E8E8E8" strokeWidth="5" />
                  <motion.circle
                    cx="32" cy="32" r="26" fill="none" stroke="#E8752A" strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 26}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 26 }}
                    animate={{ strokeDashoffset: activeTab === 0 ? 2 * Math.PI * 26 * (1 - 0.69) : 2 * Math.PI * 26 }}
                    transition={{ duration: 2.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.span
                    className="text-sm font-bold text-ink"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeTab === 0 ? 1 : 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    69%
                  </motion.span>
                </div>
              </div>
              {/* Stat cards */}
              <div className="flex-1 grid grid-cols-3 gap-2">
                {[
                  { val: "3", label: "Axes", color: "text-green" },
                  { val: "9", label: "Objectifs", color: "text-green" },
                  { val: "6", label: "Projets", color: "text-green" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: activeTab === 0 ? 1 : 0, y: activeTab === 0 ? 0 : 6 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className={`text-lg font-bold ${stat.color}`}>{stat.val}</div>
                    <div className="text-[10px] text-muted">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* KPI Distribution Bar */}
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[11px] font-medium text-ink">Distribution KPIs</span>
                <span className="text-[10px] text-muted">12 KPIs</span>
              </div>
              <div className="h-2 rounded-full bg-line overflow-hidden flex">
                <motion.div
                  className="h-full bg-green rounded-l-full"
                  initial={{ width: 0 }}
                  animate={{ width: activeTab === 0 ? "50%" : 0 }}
                  transition={{ duration: 1.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.div
                  className="h-full bg-amber-400"
                  initial={{ width: 0 }}
                  animate={{ width: activeTab === 0 ? "25%" : 0 }}
                  transition={{ duration: 1.3, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
                />
                <motion.div
                  className="h-full bg-red-400 rounded-r-full"
                  initial={{ width: 0 }}
                  animate={{ width: activeTab === 0 ? "25%" : 0 }}
                  transition={{ duration: 1.1, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[9px] text-muted flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green inline-block" /> Sur cible (6)</span>
                <span className="text-[9px] text-muted flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" /> A risque (3)</span>
                <span className="text-[9px] text-muted flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" /> Hors cible (3)</span>
              </div>
            </div>
          </div>

          {/* Alertes + Budget side by side */}
          <div className="grid grid-cols-5 gap-3">
            {/* Alertes critiques */}
            <div className="col-span-3 rounded-xl border border-line/50 bg-white p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-semibold text-ink flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M8 1L1 14h14L8 1z" stroke="#E8752A" strokeWidth="1.5" fill="#E8752A" fillOpacity="0.1"/><path d="M8 6v3M8 11h.01" stroke="#E8752A" strokeWidth="1.5" strokeLinecap="round"/></svg>
                  Alertes critiques
                </span>
                <motion.span
                  className="text-[10px] bg-red-400 text-white rounded-full px-1.5 py-0.5 font-bold"
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  14
                </motion.span>
              </div>
              <div className="flex gap-1 mb-2.5">
                {[
                  { label: "Actions en retard", count: 4, active: true },
                  { label: "KPIs hors cible", count: 3, active: false },
                  { label: "Jalons", count: 2, active: false },
                ].map((tab, i) => (
                  <span key={tab.label} className={`text-[9px] px-1.5 py-0.5 rounded-full ${tab.active ? "bg-green-light text-green font-medium" : "text-muted"}`}>
                    {tab.label} <span className={`${tab.active ? "text-green" : "text-muted"} font-bold`}>{tab.count}</span>
                  </span>
                ))}
              </div>
              {/* Alert items */}
              <div className="space-y-1.5">
                {[
                  { title: "Rapport mensuel émissions CO2", project: "Plan Mobilité Durable", days: 11 },
                  { title: "Mise à jour indicateurs CSRD", project: "Mise en Conformité CSRD", days: 8 },
                ].map((alert, i) => (
                  <motion.div
                    key={alert.title}
                    className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-sand/50 border border-line/30"
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: activeTab === 0 ? 1 : 0, x: activeTab === 0 ? 0 : -8 }}
                    transition={{ delay: 0.9 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div>
                      <div className="text-[10px] font-medium text-ink leading-tight">{alert.title}</div>
                      <div className="text-[9px] text-muted">{alert.project}</div>
                    </div>
                    <motion.span
                      className="text-[9px] bg-red-400 text-white rounded px-1.5 py-0.5 font-medium flex-shrink-0"
                      animate={{ opacity: [1, 0.6, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                    >
                      {alert.days}j de retard
                    </motion.span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Analyse Budgétaire */}
            <div className="col-span-2 rounded-xl border border-line/50 bg-white p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] font-semibold text-ink">Analyse Budgétaire</span>
              </div>
              <div className="text-right mb-2">
                <span className="text-sm font-bold text-green">1 M €</span>
                <div className="text-[9px] text-muted">Budget total alloué</div>
              </div>
              <div className="text-[10px] text-muted mb-1.5">Répartition par axe</div>
              <div className="space-y-2">
                {[
                  { label: "Environnement", w: "65%", delay: 0.7 },
                  { label: "Social", w: "40%", delay: 0.9 },
                  { label: "Gouvernance", w: "30%", delay: 1.1 },
                ].map((bar) => (
                  <div key={bar.label}>
                    <div className="text-[9px] text-muted mb-0.5 leading-tight">{bar.label}</div>
                    <div className="h-4 rounded bg-sand/80 overflow-hidden">
                      <motion.div
                        className="h-full rounded bg-gradient-to-r from-green/60 to-green/30"
                        initial={{ width: 0 }}
                        animate={{ width: activeTab === 0 ? bar.w : 0 }}
                        transition={{ duration: 1.4, delay: bar.delay + 0.1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══ Vue Portefeuille RSE ═══ */}
        <motion.div
          key="vue-portefeuille"
          initial={false}
          animate={{
            opacity: activeTab === 1 ? 1 : 0,
            x: activeTab === 1 ? 0 : 12,
            scale: activeTab === 1 ? 1 : 0.99,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`${activeTab === 1 ? "" : "pointer-events-none absolute inset-x-5 top-0"}`}
        >
          {/* Summary Header */}
          <div className="rounded-xl border border-line/50 bg-gradient-to-br from-white to-sand/30 p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <div className="text-[12px] font-semibold text-ink">Vue Portefeuille RSE</div>
              <motion.span
                className="text-[9px] bg-green text-white rounded-full px-2 py-0.5 font-medium"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: activeTab === 1 ? 1 : 0, scale: activeTab === 1 ? 1 : 0.9 }}
                transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                3 axes stratégiques
              </motion.span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { icon: "B", label: "Budget Total", val: "1.0M€" },
                { icon: "P", label: "Projets Actifs", val: "8" },
                { icon: "A", label: "Actions en Cours", val: "14" },
                { icon: "K", label: "KPIs Suivis", val: "12" },
              ].map((card, i) => (
                <motion.div
                  key={card.label}
                  className="rounded-lg border border-line/40 bg-white p-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: activeTab === 1 ? 1 : 0, y: activeTab === 1 ? 0 : 8 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="text-[9px] text-muted flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green/40" /> {card.label}
                  </div>
                  <div className="text-xs font-bold text-ink mt-0.5">{card.val}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Axis Cards */}
          <div className="space-y-2">
            {[
              {
                name: "Gouvernance - Éthique & Transparence",
                borderColor: "border-l-green",
                score: 53, scoreColor: "text-green",
                budget: "150k€ / 200k€", completion: "0%",
                stats: [{ l: "Objectifs", v: "3" }, { l: "Projets", v: "2" }, { l: "Actions", v: "1" }, { l: "KPIs", v: "2" }],
              },
              {
                name: "Social - Bien-être & Diversité",
                borderColor: "border-l-amber-400",
                score: 34, scoreColor: "text-amber-500",
                budget: "180k€ / 300k€", completion: "40%",
                stats: [{ l: "Objectifs", v: "3" }, { l: "Projets", v: "3" }, { l: "Actions", v: "5" }, { l: "KPIs", v: "5" }],
              },
              {
                name: "Environnement - Neutralité Carbone",
                borderColor: "border-l-green",
                score: 33, scoreColor: "text-green",
                budget: "300k€ / 500k€", completion: "38%",
                stats: [{ l: "Objectifs", v: "3" }, { l: "Projets", v: "3" }, { l: "Actions", v: "8" }, { l: "KPIs", v: "5" }],
              },
            ].map((axis, i) => (
              <motion.div
                key={axis.name}
                className={`rounded-xl border border-line/50 border-l-[3px] ${axis.borderColor} bg-white p-3`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: activeTab === 1 ? 1 : 0, x: activeTab === 1 ? 0 : 16 }}
                transition={{ delay: 0.45 + i * 0.15, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-semibold text-ink truncate">{axis.name}</span>
                      <span className="text-[8px] bg-green-light text-green rounded-full px-1.5 py-0.5 font-medium flex-shrink-0">active</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-3">
                    <motion.span
                      className={`text-lg font-bold ${axis.scoreColor}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: activeTab === 1 ? 1 : 0 }}
                      transition={{ delay: 0.7 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {axis.score}
                    </motion.span>
                    <div className="text-[9px] text-muted">Santé</div>
                    <div className="text-[9px] text-muted mt-0.5">{axis.budget}</div>
                    <div className="text-[9px] text-muted">{axis.completion} complété</div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {axis.stats.map((stat, si) => (
                    <motion.div
                      key={stat.l}
                      className="rounded-md bg-sand/50 p-1.5"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: activeTab === 1 ? 1 : 0, scale: activeTab === 1 ? 1 : 0.95 }}
                      transition={{ delay: 0.6 + i * 0.12 + si * 0.05, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="text-[9px] text-muted flex items-center gap-0.5">
                        <span className="w-1 h-1 rounded-full bg-green/40" /> {stat.l}
                      </div>
                      <div className="text-[12px] font-bold text-ink">{stat.v}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function KPIVisual() {
  const { locale } = useDictionary();
  const [activeView, setActiveView] = useState(1); // 0 = Tableau, 1 = Cartes

  // Auto-switch views
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveView((prev) => (prev === 0 ? 1 : 0));
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const viewLabels = ["Tableau", "Cartes"];

  return (
    <div className="w-full aspect-square max-h-[80vh] rounded-2xl border border-line/70 bg-white shadow-[0_12px_60px_rgba(27,58,45,0.12),0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
      {/* ─ Browser Chrome ─ */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-line bg-sand/60">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green/50" />
        </div>
        <div className="ml-3 flex-1 h-6 rounded-md bg-white/80 border border-line/50 flex items-center px-2.5">
          <span className="text-[12px] text-muted/60 tracking-wide">app.yumni.fr / kpis</span>
        </div>
      </div>

      {/* ─ Header ─ */}
      <div className="px-5 pt-4 pb-3 flex-shrink-0">
        {/* Summary stat cards */}
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[
            { icon: "T", label: "TOTAL", val: "12", sub: "Nombre total d'indicateurs", color: "text-green" },
            { icon: "S", label: "SUR LA BONNE VOIE", val: "6", sub: "KPIs atteignant leurs cibles (≥80%)", color: "text-green" },
            { icon: "R", label: "À RISQUE", val: "3", sub: "KPIs en dessous de leurs cibles (<50%)", color: "text-orange" },
            { icon: "P", label: "PROGRESSION", val: "72.4%", sub: "Progression moyenne de tous les KPIs", color: "text-ink" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className="rounded-lg border border-line/40 bg-white p-2.5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className={`text-xs ${stat.color}`}>{stat.icon}</span>
                <span className="text-[9px] text-muted uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className={`text-lg font-bold ${stat.color}`}>{stat.val}</div>
              <div className="text-[8px] text-muted leading-tight mt-0.5">{stat.sub}</div>
            </motion.div>
          ))}
        </div>

        {/* View Switcher */}
        <div className="flex gap-1 p-0.5 bg-sand/80 rounded-lg w-fit">
          {viewLabels.map((label, i) => (
            <button
              key={label}
              onClick={() => setActiveView(i)}
              className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-300 flex items-center gap-1.5 ${
                activeView === i
                  ? "bg-white text-ink shadow-sm"
                  : "text-muted hover:text-ink-light"
              }`}
            >
              {i === 0 ? (
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><rect x="1" y="1" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1" /><rect x="7" y="1" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1" /><rect x="1" y="7" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1" /><rect x="7" y="7" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1" /></svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><rect x="1" y="1" width="10" height="3" rx="0.5" stroke="currentColor" strokeWidth="1" /><rect x="1" y="5.5" width="10" height="3" rx="0.5" stroke="currentColor" strokeWidth="1" /></svg>
              )}
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ─ Content ─ */}
      <div className="px-5 pb-5 flex-1 relative overflow-hidden">
        {/* ═══ Vue Cartes ═══ */}
        <motion.div
          key="kpi-cartes"
          initial={false}
          animate={{
            opacity: activeView === 1 ? 1 : 0,
            x: activeView === 1 ? 0 : -12,
            scale: activeView === 1 ? 1 : 0.99,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`${activeView === 1 ? "" : "pointer-events-none absolute inset-x-5 top-0"}`}
        >
          {/* Section title + donut */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-[12px] font-semibold text-ink flex items-center gap-1.5">
                Vue en cartes des KPIs
              </div>
              <div className="text-[9px] text-muted">Visualisez la progression de vos indicateurs</div>
            </div>
            {/* Mini donut */}
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <svg viewBox="0 0 32 32" className="w-full h-full -rotate-90">
                  <circle cx="16" cy="16" r="12" fill="none" stroke="#E8E8E8" strokeWidth="3" />
                  <motion.circle
                    cx="16" cy="16" r="12" fill="none" stroke="#00814A" strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 12}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 12 }}
                    animate={{ strokeDashoffset: activeView === 1 ? 2 * Math.PI * 12 * (1 - 0.67) : 2 * Math.PI * 12 }}
                    transition={{ duration: 1.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>
              </div>
              <div className="text-[9px] text-muted leading-tight">
                <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green inline-block" /> Sur la cible: 6</div>
                <div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-orange inline-block" /> À risque: 3</div>
              </div>
            </div>
          </div>

          {/* Alert banner */}
          <motion.div
            className="rounded-lg border border-orange/20 bg-orange-light/50 px-3 py-2 mb-3"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: activeView === 1 ? 1 : 0, y: activeView === 1 ? 0 : 6 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="text-[11px] font-semibold text-orange flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M8 1L1 14h14L8 1z" stroke="#E8752A" strokeWidth="1.5" fill="#E8752A" fillOpacity="0.1"/></svg>
              KPIs à risque
            </div>
            <div className="text-[9px] text-orange/70 mt-0.5">3 KPIs sont à risque avec une progression insuffisante.</div>
            {/* At-risk KPI lines */}
            <div className="mt-2 space-y-1">
              {[
                { name: "Réduction consommation eau", obj: "Réduire émissions CO2 de 50%", val: "18 / 30 %", pct: "60%", trend: "↗6%" },
                { name: "Part énergie renouvelable", obj: "100% énergie renouvelable", val: "65 / 100 %", pct: "65%", trend: "—" },
                { name: "Parité comité direction", obj: "40% femmes direction", val: "33 / 50 %", pct: "66%", trend: "—" },
              ].map((kpi, i) => (
                <motion.div
                  key={kpi.name}
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: activeView === 1 ? 1 : 0, x: activeView === 1 ? 0 : -8 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-medium text-orange">{kpi.name}</span>
                    <span className="text-[8px] text-muted ml-1">({kpi.obj})</span>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                    <span className="text-[9px] text-muted">{kpi.val}</span>
                    <motion.span
                      className="text-[9px] bg-orange/15 text-orange rounded px-1 py-0.5 font-medium"
                      animate={{ opacity: [1, 0.6, 1] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                    >
                      {kpi.pct}
                    </motion.span>
                    <span className="text-[9px] text-muted">{kpi.trend}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* KPI Cards grid */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { name: "Émissions CO2 totales", obj: "Réduire émissions CO2 de 50%", val: "2100", unit: "/ 1500 tCO2e", pct: 100, sparkDir: "down" },
              { name: "Part femmes CODIR", obj: "40% femmes direction", val: "32", unit: "/ 40 %", pct: 80, sparkDir: "up" },
              { name: "Heures formation/salarié", obj: "40h formation/an par salarié", val: "35", unit: "/ 40 heures", pct: 88, sparkDir: "flat" },
              { name: "Score bien-être employés", obj: "40% femmes direction", val: "76", unit: "/ 80 %", pct: 95, sparkDir: "up" },
            ].map((card, i) => (
              <motion.div
                key={card.name}
                className="rounded-xl border border-line/40 bg-white p-3"
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: activeView === 1 ? 1 : 0, y: activeView === 1 ? 0 : 12, scale: activeView === 1 ? 1 : 0.97 }}
                transition={{ delay: 0.5 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-semibold text-ink truncate">{card.name}</span>
                  <span className="text-[8px] bg-green-light text-green rounded-full px-1.5 py-0.5 font-medium flex-shrink-0">Sur la cible</span>
                </div>
                <div className="text-[8px] text-muted mb-1.5 flex items-center gap-1">
                  <span className="w-1 h-1 rounded-full bg-green/40" /> {card.obj}
                </div>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-xl font-bold text-ink">{card.val}</span>
                  <span className="text-[10px] text-muted">{card.unit}</span>
                </div>
                {/* Progress bar */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[9px] text-muted">Progression</span>
                  <div className="flex-1 h-1.5 rounded-full bg-line overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-green"
                      initial={{ width: 0 }}
                      animate={{ width: activeView === 1 ? `${card.pct}%` : 0 }}
                      transition={{ duration: 1.4, delay: 0.7 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <motion.span
                    className="text-[9px] font-medium text-green"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: activeView === 1 ? 1 : 0 }}
                    transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
                  >
                    {card.pct}%
                  </motion.span>
                </div>
                {/* Mini sparkline */}
                <div className="h-5 flex items-end gap-px">
                  {(card.sparkDir === "up"
                    ? [20, 25, 22, 30, 28, 35, 32, 40, 38, 45, 50, 55]
                    : card.sparkDir === "down"
                    ? [50, 48, 45, 42, 40, 38, 34, 30, 28, 25, 22, 20]
                    : [30, 32, 30, 33, 31, 32, 30, 34, 32, 33, 31, 30]
                  ).map((h, bi) => (
                    <motion.div
                      key={bi}
                      className="flex-1 rounded-t bg-green/20"
                      initial={{ height: 0 }}
                      animate={{ height: activeView === 1 ? `${h}%` : 0 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.9 + i * 0.08 + bi * 0.03,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ═══ Vue Tableau ═══ */}
        <motion.div
          key="kpi-tableau"
          initial={false}
          animate={{
            opacity: activeView === 0 ? 1 : 0,
            x: activeView === 0 ? 0 : 12,
            scale: activeView === 0 ? 1 : 0.99,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`${activeView === 0 ? "" : "pointer-events-none absolute inset-x-5 top-0"}`}
        >
          {/* Table header */}
          <div className="rounded-xl border border-line/50 bg-white overflow-hidden">
            <div className="grid grid-cols-12 gap-1 px-3 py-2 bg-sand/50 border-b border-line/30">
              <div className="col-span-1 text-[9px] text-muted font-medium">Statut</div>
              <div className="col-span-4 text-[9px] text-muted font-medium">KPI</div>
              <div className="col-span-2 text-[9px] text-muted font-medium">Objectif</div>
              <div className="col-span-2 text-[9px] text-muted font-medium">Valeur</div>
              <div className="col-span-2 text-[9px] text-muted font-medium">Progression</div>
              <div className="col-span-1 text-[9px] text-muted font-medium">Trend</div>
            </div>
            {/* Table rows */}
            {[
              { status: "ok", name: "Émissions CO2 totales", obj: "1500 tCO2e", val: "2100", pct: 100, trend: "↓" },
              { status: "ok", name: "Part femmes CODIR", obj: "40%", val: "32%", pct: 80, trend: "↑" },
              { status: "ok", name: "Heures formation/salarié", obj: "40h", val: "35h", pct: 88, trend: "→" },
              { status: "ok", name: "Score bien-être employés", obj: "80%", val: "76%", pct: 95, trend: "↑" },
              { status: "warning", name: "Réduction conso. eau", obj: "30%", val: "18%", pct: 60, trend: "↗" },
              { status: "warning", name: "Part énergie renouvelable", obj: "100%", val: "65%", pct: 65, trend: "→" },
              { status: "warning", name: "Parité comité direction", obj: "50%", val: "33%", pct: 66, trend: "→" },
              { status: "ok", name: "Taux recyclage déchets", obj: "75%", val: "72%", pct: 96, trend: "↑" },
              { status: "ok", name: "Budget RSE utilisé", obj: "100%", val: "89%", pct: 89, trend: "↑" },
            ].map((row, i) => (
              <motion.div
                key={row.name}
                className={`grid grid-cols-12 gap-1 px-3 py-2 border-b border-line/20 ${i % 2 === 0 ? "bg-white" : "bg-sand/20"}`}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: activeView === 0 ? 1 : 0, x: activeView === 0 ? 0 : 8 }}
                transition={{ delay: 0.2 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="col-span-1 flex items-center">
                  <span className={`w-2 h-2 rounded-full ${row.status === "ok" ? "bg-green" : "bg-orange"}`} />
                </div>
                <div className="col-span-4 text-[10px] font-medium text-ink truncate">{row.name}</div>
                <div className="col-span-2 text-[9px] text-muted">{row.obj}</div>
                <div className="col-span-2 text-[10px] font-medium text-ink">{row.val}</div>
                <div className="col-span-2 flex items-center gap-1">
                  <div className="flex-1 h-1 rounded-full bg-line overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${row.status === "ok" ? "bg-green" : "bg-orange"}`}
                      initial={{ width: 0 }}
                      animate={{ width: activeView === 0 ? `${row.pct}%` : 0 }}
                      transition={{ duration: 1, delay: 0.4 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <span className="text-[9px] text-muted">{row.pct}%</span>
                </div>
                <div className="col-span-1 text-[10px] text-muted text-center">{row.trend}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function WSJFVisual() {
  const { locale } = useDictionary();
  const [showDetail, setShowDetail] = useState(false);

  // Auto-toggle between table and detail panel
  useEffect(() => {
    const interval = setInterval(() => {
      setShowDetail((prev) => !prev);
    }, 5800);
    return () => clearInterval(interval);
  }, []);

  const ideas = [
    { name: "Quick wins tri sélectif", desc: "Amélioration signalétique et ajout de poubelles de tri", author: "Thomas Dubois", status: "Boîte de réception", votes: 0, score: 18.0, breakdown: "BV:14 TC:12 RR:10 / JS:2", impact: "+30% taux de tri en 1 mois", date: "25/03/2026", rank: 1 },
    { name: "Automatisation reporting CSRD", desc: "Outil de collecte automatique des indicateurs extra-financiers", author: "Sophie Martin", status: "Boîte de réception", votes: 0, score: 16.0, breakdown: "BV:18 TC:16 RR:14 / JS:3", impact: "Gain 40h/mois + fiabilité donnée", date: "18/03/2026", rank: 2 },
    { name: "Formation flash éco-gestes", desc: "Module e-learning 15min obligatoire pour tous", author: "Sophie Martin", status: "Boîte de réception", votes: 0, score: 8.5, breakdown: "BV:12 TC:14 RR:8 / JS:4", impact: "-15% conso électricité bureau", date: "28/03/2026", rank: 3 },
    { name: "Audit énergétique bâtiments", desc: "Diagnostic complet des 3 sites pour identifier économies", author: "Thomas Dubois", status: "Converti", votes: 0, score: 8.4, breakdown: "BV:16 TC:14 RR:12 / JS:5", impact: "Réduction 25% consommation", date: "02/02/2026", rank: 0 },
    { name: "Détecteurs présence éclairage", desc: "Automatiser extinction zones inoccupées", author: "Marc Petit", status: "Boîte de réception", votes: 0, score: 6.0, breakdown: "BV:10 TC:8 RR:6 / JS:4", impact: "Économie 10% électricité", date: "02/02/2026", rank: 0 },
    { name: "Partenariat écoles commerce", desc: "Interventions dans masters RSE/DD", author: "Claire Dubois", status: "Boîte de réception", votes: 0, score: 5.3, breakdown: "BV:10 TC:6 RR:5 / JS:4", impact: "Notoriété + recrutement juniors", date: "02/03/2026", rank: 0 },
    { name: "Webinaires mensuels RSE", desc: "Sessions gratuites pour prospects et clients", author: "Antoine Mercier", status: "Boîte de réception", votes: 0, score: 5.2, breakdown: "BV:12 TC:8 RR:6 / JS:5", impact: "Acquisition leads +30%", date: "02/02/2026", rank: 0 },
  ];

  return (
    <div className="w-full aspect-square max-h-[80vh] rounded-2xl border border-line/70 bg-white shadow-[0_12px_60px_rgba(27,58,45,0.12),0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
      {/* ─ Browser Chrome ─ */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-line bg-sand/60">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-green/50" />
        </div>
        <div className="ml-3 flex-1 h-6 rounded-md bg-white/80 border border-line/50 flex items-center px-2.5">
          <span className="text-[12px] text-muted/60 tracking-wide">app.yumni.fr / idées</span>
        </div>
      </div>

      {/* ─ Tab bar ─ */}
      <div className="px-5 pt-3 pb-2 flex-shrink-0">
        <div className="flex gap-1 p-0.5 bg-sand/80 rounded-lg w-fit">
          {["Tableau", "Vue d'ensemble", "Idéation"].map((label, i) => (
            <span
              key={label}
              className={`px-3 py-1.5 rounded-md text-[12px] font-medium flex items-center gap-1.5 ${
                i === 0
                  ? "bg-white text-ink shadow-sm"
                  : "text-muted"
              }`}
            >
              {i === 0 && <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><rect x="1" y="1" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1" /><rect x="7" y="1" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1" /><rect x="1" y="7" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1" /><rect x="7" y="7" width="4" height="4" rx="0.5" stroke="currentColor" strokeWidth="1" /></svg>}
              {label}
            </span>
          ))}
        </div>
      </div>

      {/* ─ Content ─ */}
      <div className="flex-1 relative overflow-hidden flex">
        {/* Table area */}
        <motion.div
          className="flex-1 px-5 pb-4 overflow-hidden"
          animate={{ width: showDetail ? "55%" : "100%" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Table header */}
          <div className="grid gap-1 px-2 py-1.5 border-b border-line/40" style={{ gridTemplateColumns: "2.5fr 1fr 1fr 0.7fr 0.8fr" }}>
            {["Idée ⇅", "Auteur ⇅", "Statut ⇅", "Votes ⇅", "Score WSJF ⇅"].map((col) => (
              <span key={col} className="text-[9px] text-muted font-medium">{col}</span>
            ))}
          </div>

          {/* Table rows */}
          <div className="space-y-0">
            {ideas.map((idea, i) => (
              <motion.div
                key={idea.name}
                className={`grid gap-1 px-2 py-2 border-b border-line/20 cursor-pointer transition-colors ${
                  showDetail && i === 0 ? "bg-green-light/30" : "hover:bg-sand/30"
                }`}
                style={{ gridTemplateColumns: "2.5fr 1fr 1fr 0.7fr 0.8fr" }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setShowDetail(!showDetail)}
              >
                {/* Idea */}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-semibold text-ink truncate">{idea.name}</span>
                    {idea.rank > 0 && (
                      <span className="text-[8px] bg-green-light text-green rounded px-1 py-0.5 font-bold flex-shrink-0">
                        Top {idea.rank}
                      </span>
                    )}
                  </div>
                  <div className="text-[8px] text-muted truncate mt-0.5">{idea.desc}</div>
                </div>
                {/* Author */}
                <span className="text-[9px] text-ink-light self-center truncate">{idea.author}</span>
                {/* Status */}
                <span className={`text-[9px] self-center truncate ${idea.status === "Converti" ? "text-green font-medium" : "text-muted"}`}>
                  {idea.status === "Converti" ? (
                    <span className="bg-green-light text-green rounded-full px-1.5 py-0.5 text-[8px] font-medium">{idea.status}</span>
                  ) : (
                    <span className="bg-sand rounded-full px-1.5 py-0.5 text-[8px]">{idea.status}</span>
                  )}
                </span>
                {/* Votes */}
                <span className="text-[9px] text-muted self-center">{idea.votes} votes</span>
                {/* Score */}
                <div className="self-center">
                  <motion.span
                    className="text-sm font-bold text-green"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                  >
                    {idea.score.toFixed(1).replace(".", ",")}
                  </motion.span>
                  <div className="text-[7px] text-muted mt-0.5">{idea.breakdown}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ═══ Detail Panel (slide from right) ═══ */}
        <motion.div
          className="border-l border-line/50 bg-white flex-shrink-0 overflow-hidden flex flex-col"
          initial={false}
          animate={{
            width: showDetail ? "45%" : "0%",
            opacity: showDetail ? 1 : 0,
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="p-4 flex-1 overflow-hidden">
            {/* Panel header */}
            <motion.div
              className="mb-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: showDetail ? 1 : 0, y: showDetail ? 0 : 8 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[9px] bg-sand rounded px-1.5 py-0.5 text-muted">Inbox</span>
                <span className="text-[9px] bg-sand rounded px-1.5 py-0.5 text-muted">WSJF: 18.0</span>
                <span className="ml-auto text-[9px] text-muted">0 votes</span>
              </div>
              <div className="text-[12px] font-bold text-ink">Quick wins tri sélectif</div>
            </motion.div>

            {/* WSJF Section */}
            <motion.div
              className="rounded-xl border border-line/40 bg-sand/20 p-3 mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showDetail ? 1 : 0, y: showDetail ? 0 : 10 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold text-muted uppercase tracking-wider">WSJF - Weighted Shortest Job First</span>
                <span className="text-[9px] text-muted">Comparer</span>
              </div>
              <div className="flex items-baseline justify-between mb-3">
                <div>
                  <div className="text-[9px] text-muted">Score WSJF</div>
                  <motion.div
                    className="text-2xl font-bold text-green"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: showDetail ? 1 : 0, scale: showDetail ? 1 : 0.9 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    18.00
                  </motion.div>
                </div>
                <div className="text-[10px] text-muted">(14 + 12 + 10) / 2</div>
              </div>

              {/* 4 metric cards */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Valeur métier", icon: "V", val: 14, max: 20, color: "bg-blue-400", barColor: "bg-blue-400" },
                  { label: "Criticité temps", icon: "C", val: 12, max: 20, color: "bg-orange", barColor: "bg-orange" },
                  { label: "Réduction risques", icon: "R", val: 10, max: 20, color: "bg-amber-400", barColor: "bg-amber-400" },
                  { label: "Effort", icon: "E", val: 2, max: 20, color: "bg-ink", barColor: "bg-ink" },
                ].map((metric, i) => (
                  <motion.div
                    key={metric.label}
                    className="rounded-lg border border-line/30 bg-white p-2"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: showDetail ? 1 : 0, scale: showDetail ? 1 : 0.95 }}
                    transition={{ delay: 0.45 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="text-[9px] text-muted flex items-center gap-1 mb-0.5">
                      <span>{metric.icon}</span> {metric.label}
                    </div>
                    <div className="text-base font-bold text-ink mb-1">{metric.val}</div>
                    <div className="h-1.5 rounded-full bg-line overflow-hidden">
                      <motion.div
                        className={`h-full rounded-full ${metric.barColor}`}
                        initial={{ width: 0 }}
                        animate={{ width: showDetail ? `${(metric.val / metric.max) * 100}%` : 0 }}
                        transition={{ duration: 1.2, delay: 0.6 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Collaboration section */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: showDetail ? 1 : 0, y: showDetail ? 0 : 8 }}
              transition={{ delay: 0.7, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="text-[9px] text-muted uppercase tracking-wider font-medium mb-2">Collaboration</div>
              <div className="flex gap-1.5 mb-2">
                <span className="flex-1 text-center text-[9px] py-1.5 rounded-lg border border-line/40 text-muted bg-white">Commentaires</span>
                <span className="flex-1 text-center text-[9px] py-1.5 rounded-lg border border-line/40 text-muted bg-white">Pièces jointes</span>
              </div>
              <div className="rounded-lg border border-line/30 bg-sand/30 px-2.5 py-2 mb-3">
                <span className="text-[9px] text-muted/50">Écrivez un commentaire... Utilisez @ pour mentionner</span>
              </div>

              {/* Action buttons */}
              <div className="flex gap-1.5">
                <span className="flex-1 text-center text-[9px] py-1.5 rounded-lg border border-line/40 text-muted font-medium bg-white">Collaborer</span>
                <span className="flex-1 text-center text-[9px] py-1.5 rounded-lg border border-line/40 text-muted font-medium bg-white">Évaluer WSJF</span>
                <motion.span
                  className="flex-1 text-center text-[9px] py-1.5 rounded-lg bg-green text-white font-medium leading-tight"
                  animate={{ boxShadow: ["0 2px 8px rgba(0,129,74,0.2)", "0 4px 16px rgba(0,129,74,0.35)", "0 2px 8px rgba(0,129,74,0.2)"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  Convertir en<br />projet →
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function RisquesVisual() {
  const [showTooltip, setShowTooltip] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => setShowTooltip((v) => !v), 5500);
    return () => clearInterval(iv);
  }, []);

  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

  /* ── 5×5 matrix zones (row 0 = prob 5 top) ── */
  const zones = [
    [2, 3, 3, 4, 4],
    [1, 2, 3, 3, 4],
    [1, 1, 2, 3, 3],
    [0, 1, 1, 2, 2],
    [0, 0, 1, 1, 2],
  ];
  const zBg = [
    "bg-emerald-200/40",
    "bg-emerald-300/45",
    "bg-amber-300/40",
    "bg-orange-300/40",
    "bg-red-300/35",
  ];

  /* ── Risk dots (row from top, col from left, count) ── */
  const dots = [
    { r: 1, c: 2, n: 1 },
    { r: 2, c: 3, n: 2 },
    { r: 0, c: 4, n: 3 },
    { r: 1, c: 4, n: 2 },
    { r: 3, c: 1, n: 1 },
  ];

  return (
    <div className="aspect-square max-h-[80vh] w-full rounded-2xl border border-line bg-white shadow-lg overflow-hidden flex flex-col">
      {/* ── Browser chrome ── */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-neutral-50 border-b border-line shrink-0">
        <div className="w-2 h-2 rounded-full bg-red-400/70" />
        <div className="w-2 h-2 rounded-full bg-amber-400/70" />
        <div className="w-2 h-2 rounded-full bg-green/50" />
        <div className="flex-1 mx-4 h-4 rounded bg-neutral-200/60" />
      </div>

      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-line/50 shrink-0">
        <span className="text-[9px] text-muted">Tableau de bord</span>
        <span className="text-[9px] text-muted">›</span>
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-green/10 text-green font-medium">Risques</span>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 p-3 flex flex-col gap-2.5 overflow-hidden">
        {/* ── Summary strip ── */}
        <motion.div
          className="flex items-center gap-2 shrink-0"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-50 border border-red-200/50">
            <div className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-[10px] font-semibold text-red-600">3</span>
            <span className="text-[9px] text-red-500/80">critiques</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-orange-50 border border-orange-200/50">
            <div className="w-2 h-2 rounded-full bg-orange" />
            <span className="text-[10px] font-semibold text-orange-600">5</span>
            <span className="text-[9px] text-orange-500/80">élevés</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/50">
            <div className="w-2 h-2 rounded-full bg-green" />
            <span className="text-[10px] font-semibold text-emerald-600">4</span>
            <span className="text-[9px] text-emerald-500/80">maîtrisés</span>
          </div>
          <div className="flex-1" />
          <motion.div
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-50/80 border border-red-200/40"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.8, ease }}
          >
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-red-400"
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-[8px] text-red-600/80 font-medium">Panne équipement critique</span>
          </motion.div>
        </motion.div>

        {/* ── Matrix ── */}
        <div className="flex-1 rounded-xl border border-line/60 p-3 bg-white flex flex-col min-h-0">
          <div className="flex items-center gap-2 mb-2 shrink-0">
            <span className="text-[11px] font-semibold text-forest">Matrice des risques</span>
            <span className="text-[9px] text-muted">Impact × Probabilité</span>
          </div>

          <div className="flex-1 flex gap-1.5 min-h-0">
            {/* Y axis */}
            <div className="flex flex-col justify-around shrink-0 pr-0.5">
              {[5, 4, 3, 2, 1].map((n) => (
                <span key={n} className="text-[9px] text-muted leading-none">{n}</span>
              ))}
            </div>
            {/* Grid + dots + tooltip */}
            <div className="flex-1 flex flex-col gap-[2px] relative">
              {zones.map((row, ri) => (
                <div key={ri} className="flex-1 grid grid-cols-5 gap-[2px]">
                  {row.map((z, ci) => (
                    <motion.div
                      key={ci}
                      className={`rounded ${zBg[z]}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.35, delay: 0.2 + (ri * 5 + ci) * 0.025, ease }}
                    />
                  ))}
                </div>
              ))}

              {/* Risk dots */}
              {dots.map((d, i) => {
                const sz = d.n >= 3 ? 18 : d.n >= 2 ? 14 : 10;
                return (
                  <motion.div
                    key={i}
                    className="absolute flex items-center justify-center pointer-events-none"
                    style={{
                      left: `${(d.c / 5) * 100 + 100 / 10}%`,
                      top: `${(d.r / 5) * 100 + 100 / 10}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1.0 + i * 0.1, ease, type: "spring", damping: 14, stiffness: 180 }}
                  >
                    <div
                      className="rounded-full bg-orange flex items-center justify-center shadow-md"
                      style={{ width: sz, height: sz }}
                    >
                      {d.n > 1 && <span className="text-[8px] text-white font-bold leading-none">{d.n}</span>}
                    </div>
                  </motion.div>
                );
              })}

              {/* Tooltip */}
              <AnimatePresence>
                {showTooltip && (
                  <motion.div
                    className="absolute bg-white rounded-xl shadow-xl border border-line/70 p-3 z-10"
                    style={{ right: "4%", top: "6%", width: "52%" }}
                    initial={{ opacity: 0, scale: 0.92, y: 6 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 4 }}
                    transition={{ duration: 0.4, ease }}
                  >
                    <div className="text-[9px] text-muted">Probabilité: 4 · Impact: 5</div>
                    <div className="text-[11px] font-bold text-forest mt-0.5">Risque(s) total : 3</div>
                    <div className="mt-1.5 space-y-1 border-t border-line/40 pt-1.5">
                      <div className="text-[8px] text-forest/80 leading-snug">• Arrêt production — Panne équipement</div>
                      <div className="text-[8px] text-forest/80 leading-snug">• Perte client majeur (&gt;30% CA)</div>
                      <div className="text-[8px] text-forest/80 leading-snug">• Non-conformité CSRD</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* X axis */}
          <div className="flex ml-5 mt-1 shrink-0">
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} className="flex-1 text-center text-[9px] text-muted">{n}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportingVisual() {
  const [showConfig, setShowConfig] = useState(false);
  useEffect(() => {
    const iv = setInterval(() => setShowConfig((v) => !v), 5800);
    return () => clearInterval(iv);
  }, []);

  const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

  const axes = [
    { label: "Environnement - Neutralité Carbone", on: true },
    { label: "Social - Bien-être & Diversité", on: true },
    { label: "Gouvernance - Éthique & Transparence", on: true },
  ];

  const sections = [
    { label: "Résumé exécutif", on: true },
    { label: "Vue d'ensemble (Axes)", on: true },
    { label: "Indicateurs (KPIs)", on: true },
    { label: "Projets", on: true },
    { label: "Actions", on: true },
    { label: "Planning & Jalons", on: true },
    { label: "Risques & Opportunités", on: true },
    { label: "Conformité ESRS", on: true },
  ];

  return (
    <div className="aspect-square max-h-[80vh] w-full rounded-2xl border border-line bg-white shadow-lg overflow-hidden flex flex-col">
      {/* ── Browser chrome ── */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-neutral-50 border-b border-line shrink-0">
        <div className="w-2 h-2 rounded-full bg-red-400/70" />
        <div className="w-2 h-2 rounded-full bg-amber-400/70" />
        <div className="w-2 h-2 rounded-full bg-green/50" />
        <div className="flex-1 mx-4 h-4 rounded bg-neutral-200/60" />
      </div>

      {/* ── Breadcrumb ── */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-line/50 shrink-0">
        <span className="text-[9px] text-muted">Tableau de bord</span>
        <span className="text-[9px] text-muted">›</span>
        <span className="text-[9px] px-2 py-0.5 rounded-full bg-green/10 text-green font-medium">Rapports</span>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 p-3 flex flex-col overflow-hidden relative">
        {/* ── Header ── */}
        <motion.div
          className="flex items-start gap-2 mb-3 shrink-0"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <div className="w-7 h-7 rounded-lg bg-green/10 flex items-center justify-center shrink-0">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="3" y="1" width="10" height="14" rx="1.5" stroke="#00814A" strokeWidth="1.2"/><path d="M6 5h4M6 8h4M6 11h2" stroke="#00814A" strokeWidth="1" strokeLinecap="round"/></svg>
          </div>
          <div>
            <div className="text-[12px] font-semibold text-forest leading-tight">Rapports COMEX</div>
            <div className="text-[9px] text-muted leading-snug">Générez vos rapports PowerPoint personnalisés en un clic</div>
          </div>
        </motion.div>

        {/* ── Toolbar ── */}
        <motion.div
          className="flex items-center gap-1.5 mb-2.5 shrink-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
        >
          <div className="flex-1 flex items-center gap-1 px-2 py-1 rounded-md border border-line/60 bg-neutral-50/50">
            <svg width="8" height="8" viewBox="0 0 16 16" fill="none" className="opacity-40"><circle cx="7" cy="7" r="5" stroke="#666" strokeWidth="1.5"/><path d="M11 11l3.5 3.5" stroke="#666" strokeWidth="1.5" strokeLinecap="round"/></svg>
            <span className="text-[8px] text-muted/40">Rechercher un rapport...</span>
          </div>
          <div className="px-2 py-1 rounded-md border border-line/60 text-[8px] text-muted">Filtrer</div>
          <div className="px-2 py-1 rounded-md border border-line/60 text-[8px] text-muted">Scheduler</div>
          <motion.div
            className="px-2.5 py-1 rounded-md bg-green text-white text-[8px] font-medium cursor-pointer"
            animate={{ boxShadow: ["0 1px 4px rgba(0,129,74,0.15)", "0 3px 10px rgba(0,129,74,0.3)", "0 1px 4px rgba(0,129,74,0.15)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            + Générer un rapport
          </motion.div>
        </motion.div>

        {/* ── Table ── */}
        <div className="flex-1 rounded-lg border border-line/50 overflow-hidden flex flex-col min-h-0">
          {/* Table header */}
          <div className="grid grid-cols-12 gap-1 px-2.5 py-1.5 bg-neutral-50/80 border-b border-line/40 shrink-0">
            <span className="col-span-4 text-[7px] text-muted/70 font-medium uppercase tracking-wider">Titre du rapport</span>
            <span className="col-span-2 text-[7px] text-muted/70 font-medium uppercase tracking-wider">Auteur</span>
            <span className="col-span-2 text-[7px] text-muted/70 font-medium uppercase tracking-wider">Date</span>
            <span className="col-span-1 text-[7px] text-muted/70 font-medium uppercase tracking-wider">Format</span>
            <span className="col-span-2 text-[7px] text-muted/70 font-medium uppercase tracking-wider">Période</span>
            <span className="col-span-1 text-[7px] text-muted/70 font-medium uppercase tracking-wider">Statut</span>
          </div>

          {/* Table rows */}
          {[
            { title: "Rapport Q2", author: "Thomas D.", date: "2 avr. 2026", format: "PPTX", period: "Trimestre", status: "En attente", statusColor: "text-amber-500 bg-amber-50 border-amber-200/50" },
            { title: "Rapport Q1 — Final", author: "Marie L.", date: "15 jan. 2026", format: "PPTX", period: "Trimestre", status: "Terminé", statusColor: "text-green bg-green/5 border-green/20" },
            { title: "Bilan annuel 2025", author: "Thomas D.", date: "8 jan. 2026", format: "PPTX", period: "Annuel", status: "Terminé", statusColor: "text-green bg-green/5 border-green/20" },
          ].map((row, i) => (
            <motion.div
              key={i}
              className="grid grid-cols-12 gap-1 px-2.5 py-2 border-b border-line/25 items-center"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.1, ease }}
            >
              <div className="col-span-4 flex items-center gap-1.5">
                <div className="w-4 h-4 rounded bg-green/8 flex items-center justify-center shrink-0">
                  <svg width="8" height="8" viewBox="0 0 16 16" fill="none"><rect x="2" y="8" width="3" height="6" rx="0.5" fill="#00814A" fillOpacity="0.4"/><rect x="6.5" y="5" width="3" height="9" rx="0.5" fill="#00814A" fillOpacity="0.6"/><rect x="11" y="2" width="3" height="12" rx="0.5" fill="#00814A" fillOpacity="0.8"/></svg>
                </div>
                <span className="text-[9px] font-medium text-forest truncate">{row.title}</span>
              </div>
              <span className="col-span-2 text-[8px] text-muted">{row.author}</span>
              <span className="col-span-2 text-[8px] text-muted">{row.date}</span>
              <span className="col-span-1 text-[7px] text-muted/70 px-1 py-0.5 rounded bg-neutral-100 text-center font-mono">{row.format}</span>
              <span className="col-span-2 text-[8px] text-muted">{row.period}</span>
              <span className={`col-span-1 text-[7px] font-medium px-1.5 py-0.5 rounded-full border text-center ${row.statusColor}`}>{row.status}</span>
            </motion.div>
          ))}
        </div>

        {/* ── Config panel overlay ── */}
        <AnimatePresence>
          {showConfig && (
            <motion.div
              className="absolute inset-0 flex justify-end z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Backdrop */}
              <div className="absolute inset-0 bg-black/10 rounded-xl" />
              {/* Panel */}
              <motion.div
                className="relative w-[58%] bg-white shadow-2xl border-l border-line/60 rounded-r-xl flex flex-col overflow-hidden"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.45, ease }}
              >
                <div className="p-3 border-b border-line/40 shrink-0">
                  <div className="text-[11px] font-semibold text-forest">Générer un rapport</div>
                  <div className="text-[8px] text-muted mt-0.5">Configurez votre rapport PowerPoint</div>
                </div>
                <div className="flex-1 p-3 overflow-hidden space-y-2.5">
                  {/* Axes */}
                  <div>
                    <div className="text-[9px] font-semibold text-forest mb-1">Axes à inclure</div>
                    <div className="space-y-1">
                      {axes.map((a, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-1.5"
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.3 + i * 0.06, ease }}
                        >
                          <div className="w-3 h-3 rounded bg-green flex items-center justify-center">
                            <span className="text-white text-[7px] font-bold">✓</span>
                          </div>
                          <span className="text-[8px] text-forest/80">{a.label}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="text-[7px] text-muted/60 mt-1">3 axe(s) sélectionné(s)</div>
                  </div>

                  {/* Sections */}
                  <div>
                    <div className="text-[9px] font-semibold text-forest mb-1">Sections à inclure</div>
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                      {sections.map((s, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-1.5"
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: 0.5 + i * 0.04, ease }}
                        >
                          <div className="w-3 h-3 rounded bg-green flex items-center justify-center">
                            <span className="text-white text-[7px] font-bold">✓</span>
                          </div>
                          <span className="text-[7px] text-forest/80">{s.label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Display options */}
                  <div>
                    <div className="text-[9px] font-semibold text-forest mb-1">Options d&apos;affichage</div>
                    <motion.div
                      className="flex items-center gap-1.5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.9, duration: 0.3 }}
                    >
                      <div className="w-3 h-3 rounded bg-green flex items-center justify-center">
                        <span className="text-white text-[7px] font-bold">✓</span>
                      </div>
                      <span className="text-[8px] text-forest/80">Inclure les graphiques</span>
                    </motion.div>
                  </div>
                </div>

                {/* Footer buttons */}
                <div className="p-2.5 border-t border-line/40 flex justify-end gap-2 shrink-0">
                  <span className="px-3 py-1 rounded-md border border-line/60 text-[8px] text-muted">Annuler</span>
                  <motion.span
                    className="px-3 py-1 rounded-md bg-green text-white text-[8px] font-medium"
                    animate={{ boxShadow: ["0 1px 6px rgba(0,129,74,0.2)", "0 3px 14px rgba(0,129,74,0.4)", "0 1px 6px rgba(0,129,74,0.2)"] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    Générer un rapport
                  </motion.span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
            <div className="text-[12px] text-muted mt-0.5">{s.label}</div>
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
  const visuals = [<CockpitVisual key="c" />, <KPIVisual key="k" />, <WSJFVisual key="w" />, <RisquesVisual key="ri" />, <ReportingVisual key="r" />];

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const idx = Math.min(visuals.length - 1, Math.floor(latest * visuals.length));
    setActiveIndex(idx);
  });

  return (
    <section ref={containerRef} className="relative bg-sand/50" style={{ height: `${visuals.length * 100}vh` }}>
      {/* Left edge accent — visible vertical rail with green tint */}
      <div className="absolute top-0 left-[6%] w-[2px] h-full bg-gradient-to-b from-green/8 via-green/12 to-green/4 pointer-events-none hidden lg:block" />
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
              <motion.div key={activeIndex} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
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

function HeroDashboardVisual() {
  /* ── Lightweight animated dashboard for the hero — clean looping anims ── */
  const barHeights = [38, 58, 44, 72, 52, 68, 82, 48, 74, 64, 42, 88, 56, 78, 46, 62];
  const barHeights2 = [62, 42, 78, 48, 82, 54, 38, 72, 58, 68, 86, 44, 74, 50, 66, 40];

  return (
    <div className="w-full rounded-2xl border border-line/70 bg-white shadow-[0_20px_80px_rgba(27,58,45,0.12),0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden">
      {/* ─ Browser Chrome ─ */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 border-b border-line bg-sand/60">
        <div className="flex gap-1.5">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-red-400/70" />
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-amber-400/70" />
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-green/50" />
        </div>
        <div className="ml-2 sm:ml-3 flex-1 h-5 sm:h-6 rounded-md bg-white/80 border border-line/50 flex items-center px-2 sm:px-2.5">
          <span className="text-[10px] sm:text-[12px] text-muted/60 tracking-wide">app.yumni.fr / cockpit</span>
        </div>
      </div>

      {/* ─ Dashboard body ─ */}
      <div className="flex">
        {/* Sidebar — hidden on mobile */}
        <div className="hidden md:flex flex-col w-44 lg:w-48 border-r border-line/50 bg-sand/20 py-4 px-3 shrink-0">
          <div className="flex items-center gap-2 mb-6 px-1">
            <div className="w-6 h-6 rounded-lg bg-green/15 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" fill="#00814A" opacity="0.7"/><rect x="9" y="1" width="6" height="6" rx="1.5" fill="#00814A" opacity="0.4"/><rect x="1" y="9" width="6" height="6" rx="1.5" fill="#00814A" opacity="0.4"/><rect x="9" y="9" width="6" height="6" rx="1.5" fill="#00814A" opacity="0.2"/></svg>
            </div>
            <span className="text-[11px] font-bold text-ink tracking-tight">Yumni</span>
          </div>
          <div className="text-[9px] font-semibold text-muted uppercase tracking-wider mb-2 px-1">Pilotage RSE</div>
          {[
            { label: "Dashboard", active: true },
            { label: "Axes", active: false },
            { label: "Objectifs", active: false },
            { label: "Projets", active: false },
            { label: "Actions", active: false },
            { label: "KPIs", active: false },
          ].map((item) => (
            <div key={item.label} className={`text-[11px] px-2 py-1.5 rounded-lg mb-0.5 ${item.active ? "bg-green/10 text-green font-semibold" : "text-muted"}`}>
              {item.label}
            </div>
          ))}
          <div className="text-[9px] font-semibold text-muted uppercase tracking-wider mt-4 mb-2 px-1">Conformité</div>
          {["ESRS", "Risques", "Planning"].map((label) => (
            <div key={label} className="text-[11px] px-2 py-1.5 text-muted">{label}</div>
          ))}
        </div>

        {/* Main content */}
        <div className="flex-1 p-3 sm:p-6 lg:p-8 min-w-0">
          {/* Header row */}
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <div>
              <div className="text-xs sm:text-sm font-semibold text-ink leading-tight">Tableau de bord RSE</div>
              <div className="text-[10px] sm:text-[11px] text-muted leading-tight">Performance globale</div>
            </div>
            <div className="flex gap-1 p-0.5 bg-sand/80 rounded-lg">
              <span className="px-2 sm:px-3 py-1 rounded-md text-[10px] sm:text-[11px] font-medium bg-white text-ink shadow-sm">Vue d&apos;ensemble</span>
              <span className="px-2 sm:px-3 py-1 rounded-md text-[10px] sm:text-[11px] text-muted hidden sm:block">Portefeuille</span>
            </div>
          </div>

          {/* KPI cards row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-4 sm:mb-5">
            {[
              { label: "Score RSE", val: "72%", color: "bg-green" },
              { label: "KPIs actifs", val: "24", color: "bg-forest" },
              { label: "Risques", val: "8", color: "bg-amber-500" },
              { label: "Actions", val: "156", color: "bg-ink" },
            ].map((kpi, i) => (
              <motion.div
                key={kpi.label}
                className="p-2.5 sm:p-3 rounded-xl border border-line/40 bg-gradient-to-br from-white to-sand/20"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="text-[9px] sm:text-[10px] text-muted mb-1">{kpi.label}</div>
                <div className="text-sm sm:text-base font-bold text-ink">{kpi.val}</div>
                <div className="mt-1.5 h-1 rounded-full bg-line overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${kpi.color}`}
                    animate={{ width: [`${42 + i * 14}%`, `${58 + i * 9}%`, `${42 + i * 14}%`] }}
                    transition={{ duration: 3.5 + i * 0.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Chart + side panel */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-4">
            {/* Bar chart area */}
            <div className="sm:col-span-3 rounded-xl border border-line/40 bg-white p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] sm:text-[11px] font-semibold text-ink">Progression KPIs</span>
                <span className="text-[9px] text-muted">12 mois</span>
              </div>
              <div className="flex items-end gap-[2px] sm:gap-[3px] h-32 sm:h-48 lg:h-60 px-0.5">
                {barHeights.map((h, i) => (
                  <motion.div
                    key={i}
                    className="flex-1 rounded-t bg-green/25"
                    animate={{ height: [`${h}%`, `${barHeights2[i]}%`, `${h}%`] }}
                    transition={{
                      duration: 3 + (i % 4) * 0.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.06,
                    }}
                    style={{ transformOrigin: "bottom" }}
                  />
                ))}
              </div>
              {/* Mini distribution bar */}
              <div className="mt-3 h-1.5 rounded-full bg-line overflow-hidden flex">
                <motion.div
                  className="h-full bg-green rounded-l-full"
                  animate={{ width: ["48%", "55%", "48%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="h-full bg-amber-400"
                  animate={{ width: ["27%", "22%", "27%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="h-full bg-red-400 rounded-r-full"
                  animate={{ width: ["25%", "23%", "25%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[8px] sm:text-[9px] text-muted flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green inline-block" /> Sur cible</span>
                <span className="text-[8px] sm:text-[9px] text-muted flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" /> À risque</span>
                <span className="text-[8px] sm:text-[9px] text-muted flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" /> Hors cible</span>
              </div>
            </div>

            {/* Side panel — Alertes + Score gauge */}
            <div className="sm:col-span-2 space-y-3 sm:space-y-4">
              {/* Score gauge */}
              <div className="rounded-xl border border-line/40 bg-white p-3 flex items-center gap-3">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0">
                  <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                    <circle cx="32" cy="32" r="26" fill="none" stroke="#E8E8E8" strokeWidth="5" />
                    <motion.circle
                      cx="32" cy="32" r="26" fill="none" stroke="#E8752A" strokeWidth="5"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 26}`}
                      animate={{
                        strokeDashoffset: [
                          2 * Math.PI * 26 * (1 - 0.69),
                          2 * Math.PI * 26 * (1 - 0.74),
                          2 * Math.PI * 26 * (1 - 0.69),
                        ],
                      }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs sm:text-sm font-bold text-ink">69%</span>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] sm:text-[11px] font-semibold text-ink">Score RSE</div>
                  <div className="text-[9px] text-muted">Global</div>
                </div>
              </div>

              {/* Alertes */}
              <div className="rounded-xl border border-line/40 bg-white p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-ink flex items-center gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M8 1L1 14h14L8 1z" stroke="#E8752A" strokeWidth="1.5" fill="#E8752A" fillOpacity="0.1"/><path d="M8 6v3M8 11h.01" stroke="#E8752A" strokeWidth="1.5" strokeLinecap="round"/></svg>
                    Alertes
                  </span>
                  <motion.span
                    className="text-[9px] bg-red-400 text-white rounded-full px-1.5 py-0.5 font-bold"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    14
                  </motion.span>
                </div>
                <div className="space-y-1.5">
                  {[
                    { title: "Rapport CO2", tag: "11j", delay: 0 },
                    { title: "Indicateurs CSRD", tag: "8j", delay: 0.3 },
                  ].map((a, i) => (
                    <div key={a.title} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-sand/50 border border-line/30">
                      <span className="text-[9px] sm:text-[10px] font-medium text-ink">{a.title}</span>
                      <motion.span
                        className="text-[8px] sm:text-[9px] bg-red-400 text-white rounded px-1.5 py-0.5 font-medium"
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: a.delay }}
                      >
                        {a.tag}
                      </motion.span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   HERO SECTION
   ================================================================ */

function HeroSection() {
  const { t, locale } = useDictionary();
  return (
    <section className="relative -mt-16 pt-40 md:pt-48 overflow-hidden">
      {/* ─ Background decorative shapes ─ */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Large sweeping arcs — creates depth and visual pull */}
        <svg className="absolute -right-[15%] -top-[10%] w-[80%] h-[120%] opacity-[0.05]" viewBox="0 0 800 800" fill="none">
          <circle cx="400" cy="400" r="380" stroke="#1B3A2D" strokeWidth="1.2" />
          <circle cx="400" cy="400" r="300" stroke="#1B3A2D" strokeWidth="0.8" />
          <circle cx="400" cy="400" r="220" stroke="#1B3A2D" strokeWidth="0.5" />
        </svg>
        {/* Soft green ambient — top right */}
        <div className="absolute -top-[200px] -right-[200px] w-[700px] h-[700px] rounded-full bg-green/[0.05]" />
        {/* Warm accent — bottom left */}
        <div className="absolute bottom-0 -left-[100px] w-[400px] h-[400px] rounded-full bg-orange/[0.05]" />
        {/* Warm gradient towards bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-orange/[0.05] via-orange/[0.025] to-transparent" />
        {/* Ambient blobs for the visual area */}
        <div className="absolute bottom-[5%] left-[25%] w-[500px] h-[500px] rounded-full bg-orange/[0.05] blur-[100px]" />
        <div className="absolute bottom-[8%] right-[15%] w-[400px] h-[400px] rounded-full bg-green/[0.05] blur-[80px]" />
        {/* Thin editorial line from hero to below the fold */}
        <div className="absolute top-[55%] left-[50%] w-px h-[300px] bg-gradient-to-b from-line-dark/30 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* ─ Split hero: headline left, subtitle + CTA right ─ */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-16 mb-10 md:mb-16">
          {/* LEFT — Headline */}
          <div className="lg:max-w-[58%] flex-shrink-0">
            <motion.p
              className="text-green text-xs sm:text-sm font-semibold tracking-widest uppercase mb-5 sm:mb-6"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t.home.hero.eyebrow}
            </motion.p>

            <motion.h1
              className="font-display text-[2.4rem] sm:text-5xl md:text-6xl lg:text-[4.2rem] leading-[1.05] tracking-tight text-forest"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {t.home.hero.title1}{" "}{t.home.hero.titleHighlight}.{" "}
              <span className="italic text-green">{t.home.hero.title2}.</span>
            </motion.h1>
          </div>

          {/* RIGHT — Subtitle + CTA, bottom-aligned with headline */}
          <motion.div
            className="lg:max-w-[38%] lg:pb-1"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-sm sm:text-base md:text-lg text-muted leading-relaxed mb-6 sm:mb-8">
              {t.home.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/${locale}/essai-gratuit`}
                className="group bg-green text-white font-medium px-6 sm:px-8 py-3 sm:py-3.5 rounded-full hover:bg-forest transition-colors duration-200 text-sm text-center"
              >
                {t.common.freeTrial}
                <span className="ml-2 inline-block group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
              <Link
                href={`/${locale}/demo`}
                className="border border-line-dark text-ink hover:border-green hover:text-green px-6 sm:px-8 py-3 sm:py-3.5 rounded-full transition-colors duration-200 text-sm text-center"
              >
                {t.common.requestDemo}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* ─ Full-width animated product visual ─ */}
        <motion.div
          className="relative -mx-4 sm:mx-0"
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroDashboardVisual />

          {/* Bottom fade — warm gradient to blend with page */}
          <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
        </motion.div>
      </div>

      {/* Bottom spacer */}
      <div className="h-6 md:h-12" />
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
      {/* Thin diagonal accent line */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-4 right-[15%] w-px h-[200%] bg-white/[0.06] rotate-[25deg] origin-top" />
      </div>
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
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle horizontal green accent line */}
        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-green/10 to-transparent" />
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
      <div className="absolute top-0 left-0 right-0 h-px bg-line" />
      {/* Large atmospheric arc — right side */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute -right-[25%] top-[10%] w-[70%] h-[90%] opacity-[0.025]" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="280" stroke="#E8752A" strokeWidth="1" />
          <circle cx="300" cy="300" r="200" stroke="#E8752A" strokeWidth="0.6" />
        </svg>
      </div>
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
                <div className="font-display text-[4rem] md:text-[5rem] leading-none text-forest/[0.05] select-none mb-2">{p.num}</div>
                <div className="text-orange mb-5">{problemIcons[i]}</div>
                <h3 className="text-xl font-bold text-ink mb-3 leading-snug">{p.stat}</h3>
                <p className="text-muted leading-relaxed text-[15px]">{p.detail}</p>
                <div className="mt-8 h-0.5 w-12 bg-orange/40" />
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-line" />
    </section>
  );
}

/* ── Solution Section ────────────────────────────── */

function SolutionSection() {
  const { t, locale } = useDictionary();
  return (
    <section className="py-24 md:py-36 bg-sand/40 relative overflow-hidden">
      {/* Large soft circle — creates spatial depth */}
      <div className="absolute -left-[15%] top-[20%] w-[500px] h-[500px] rounded-full bg-green/[0.02] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
          <FadeIn className="lg:col-span-3">
            <div className="relative rounded-2xl border border-line overflow-hidden bg-white aspect-[16/10] flex items-center justify-center group cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="relative z-10 w-20 h-20 rounded-full bg-green flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
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
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Bold sweeping arc — premium feel */}
        <svg className="absolute -left-[20%] -top-[30%] w-[90%] h-[160%] opacity-[0.06]" viewBox="0 0 800 800" fill="none">
          <circle cx="400" cy="400" r="380" stroke="white" strokeWidth="0.8" />
          <circle cx="400" cy="400" r="320" stroke="white" strokeWidth="0.5" />
        </svg>
        {/* Subtle green glow — top right */}
        <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-green/8 blur-[100px]" />
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
    <section className="py-24 md:py-36 relative overflow-hidden">
      {/* Large atmospheric circle — top right, creates spatial depth */}
      <div className="absolute -top-[15%] -right-[10%] w-[600px] h-[600px] rounded-full bg-sand/70 pointer-events-none" />
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
                  <Link href={`/${locale}${a.href}`} className="inline-flex items-center gap-1.5 text-white text-sm font-semibold bg-white/15 hover:bg-white/25 px-5 py-2.5 rounded-xl transition-colors">{a.cta}</Link>
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
      <div className="rounded-xl border border-white/10 bg-white/[0.07] p-3">{children}</div>
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
      <div className="rounded-2xl border border-white/10 bg-white/[0.06] overflow-hidden">
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
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[5%] w-[60%] h-[140%] bg-gradient-to-br from-green/15 to-transparent rotate-[12deg] origin-top-right" />
        {/* Large concentric arcs — premium, confident */}
        <svg className="absolute -bottom-[30%] -left-[15%] w-[80%] h-[130%] opacity-[0.05]" viewBox="0 0 800 800" fill="none">
          <circle cx="400" cy="400" r="380" stroke="white" strokeWidth="0.8" />
          <circle cx="400" cy="400" r="310" stroke="white" strokeWidth="0.5" />
          <circle cx="400" cy="400" r="240" stroke="white" strokeWidth="0.3" />
        </svg>
        {/* Green ambient glow */}
        <div className="absolute top-[15%] right-[10%] w-80 h-80 rounded-full bg-green/8 blur-[120px]" />
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
            <motion.p className="text-xs text-white/50 font-semibold tracking-widest uppercase mb-8" initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              {t.home.cta.badge}
            </motion.p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1]">
              {t.home.cta.title1}<br /><span className="italic text-green-muted">{t.home.cta.titleHighlight}</span>
            </h2>
            <p className="text-lg text-white/50 max-w-xl mx-auto mb-12 leading-relaxed">{t.home.cta.description}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href={`/${locale}/demo`} className="group bg-white text-forest font-semibold px-10 py-4 rounded-xl hover:bg-green-light transition-colors duration-200 text-sm">
                {t.common.requestDemo}<span className="ml-2 inline-block group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
              <Link href={`/${locale}/essai-gratuit`} className="border border-white/20 text-white hover:bg-white/10 hover:border-white/30 px-10 py-4 rounded-xl transition-colors duration-200 text-sm">
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
