"use client";

import { useRef, useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
} from "framer-motion";
import Link from "next/link";
import { useDictionary } from "../dictionary-provider";

/* ================================================================
   CONSTANTS
   ================================================================ */

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

/* ================================================================
   UTILITY — FadeIn
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
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================
   FEATURE ICONS — inline SVGs for each feature tab
   ================================================================ */

const featureIcons = [
  // Cockpit
  <svg key="cockpit" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></svg>,
  // KPIs
  <svg key="kpis" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>,
  // WSJF
  <svg key="wsjf" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>,
  // Risques
  <svg key="risques" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  // Reporting
  <svg key="reporting" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>,
  // ESRS
  <svg key="esrs" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11l3 3L22 4" /><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>,
  // Collaboration
  <svg key="collab" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
  // Multi-org
  <svg key="multiorg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></svg>,
];

/* ================================================================
   VISUALS — Cockpit (from homepage)
   ================================================================ */

function CockpitVisual() {
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => setActiveTab((p) => (p === 0 ? 1 : 0)), 5500);
    return () => clearInterval(iv);
  }, []);

  return (
    <div className="w-full h-full rounded-2xl border border-line/70 bg-white shadow-[0_12px_60px_rgba(27,58,45,0.12),0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-line bg-sand/60 shrink-0">
        <div className="flex gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400/70" /><span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" /><span className="w-2.5 h-2.5 rounded-full bg-green/50" /></div>
        <div className="ml-3 flex-1 h-6 rounded-md bg-white/80 border border-line/50 flex items-center px-2.5">
          <span className="text-[12px] text-muted/60 tracking-wide">app.yumni.fr / cockpit</span>
        </div>
      </div>
      <div className="px-5 pt-4 pb-3 shrink-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-green/10 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1" y="1" width="6" height="6" rx="1.5" fill="#00814A" opacity="0.7" /><rect x="9" y="1" width="6" height="6" rx="1.5" fill="#00814A" opacity="0.4" /><rect x="1" y="9" width="6" height="6" rx="1.5" fill="#00814A" opacity="0.4" /><rect x="9" y="9" width="6" height="6" rx="1.5" fill="#00814A" opacity="0.2" /></svg>
            </div>
            <div>
              <div className="text-xs font-semibold text-ink leading-tight">Tableau de bord RSE</div>
              <div className="text-[11px] text-muted leading-tight">Performance globale</div>
            </div>
          </div>
        </div>
        <div className="flex gap-1 p-0.5 bg-sand/80 rounded-lg w-fit">
          {["Vue d'ensemble", "Portefeuille RSE"].map((l, i) => (
            <button key={l} onClick={() => setActiveTab(i)} className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-300 ${activeTab === i ? "bg-white text-ink shadow-sm" : "text-muted hover:text-ink-light"}`}>{l}</button>
          ))}
        </div>
      </div>
      <div className="px-5 pb-5 flex-1 relative overflow-hidden">
        <motion.div initial={false} animate={{ opacity: activeTab === 0 ? 1 : 0, x: activeTab === 0 ? 0 : -12 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className={`${activeTab === 0 ? "" : "pointer-events-none absolute inset-x-5 top-0"}`}>
          <div className="rounded-xl border border-line/50 bg-gradient-to-br from-white to-sand/30 p-4 mb-3">
            <div className="flex items-center justify-between mb-3">
              <div><div className="text-[12px] font-semibold text-ink">Score RSE Global</div><div className="text-[10px] text-muted">Performance globale</div></div>
              <div className="text-[10px] text-muted flex items-center gap-1"><span className="inline-block w-1 h-1 rounded-full bg-green animate-pulse" />~ 0%</div>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative w-16 h-16 flex-shrink-0">
                <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90"><circle cx="32" cy="32" r="26" fill="none" stroke="#E8E8E8" strokeWidth="5" /><motion.circle cx="32" cy="32" r="26" fill="none" stroke="#E8752A" strokeWidth="5" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 26}`} initial={{ strokeDashoffset: 2 * Math.PI * 26 }} animate={{ strokeDashoffset: activeTab === 0 ? 2 * Math.PI * 26 * (1 - 0.69) : 2 * Math.PI * 26 }} transition={{ duration: 2.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} /></svg>
                <div className="absolute inset-0 flex items-center justify-center"><motion.span className="text-sm font-bold text-ink" initial={{ opacity: 0 }} animate={{ opacity: activeTab === 0 ? 1 : 0 }} transition={{ delay: 0.6, duration: 0.6 }}>69%</motion.span></div>
              </div>
              <div className="flex-1 grid grid-cols-3 gap-2">
                {[{ val: "3", label: "Axes" }, { val: "9", label: "Objectifs" }, { val: "6", label: "Projets" }].map((s, i) => (
                  <motion.div key={s.label} className="text-center" initial={{ opacity: 0, y: 6 }} animate={{ opacity: activeTab === 0 ? 1 : 0, y: activeTab === 0 ? 0 : 6 }} transition={{ delay: 0.5 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                    <div className="text-lg font-bold text-green">{s.val}</div>
                    <div className="text-[10px] text-muted">{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1"><span className="text-[11px] font-medium text-ink">Distribution KPIs</span><span className="text-[10px] text-muted">12 KPIs</span></div>
              <div className="h-2 rounded-full bg-line overflow-hidden flex">
                <motion.div className="h-full bg-green rounded-l-full" initial={{ width: 0 }} animate={{ width: activeTab === 0 ? "50%" : 0 }} transition={{ duration: 1.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }} />
                <motion.div className="h-full bg-amber-400" initial={{ width: 0 }} animate={{ width: activeTab === 0 ? "25%" : 0 }} transition={{ duration: 1.3, delay: 0.95, ease: [0.16, 1, 0.3, 1] }} />
                <motion.div className="h-full bg-red-400 rounded-r-full" initial={{ width: 0 }} animate={{ width: activeTab === 0 ? "25%" : 0 }} transition={{ duration: 1.1, delay: 1.15, ease: [0.16, 1, 0.3, 1] }} />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-[9px] text-muted flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green inline-block" />Sur cible (6)</span>
                <span className="text-[9px] text-muted flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />A risque (3)</span>
                <span className="text-[9px] text-muted flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-red-400 inline-block" />Hors cible (3)</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-5 gap-3">
            <div className="col-span-3 rounded-xl border border-line/50 bg-white p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[12px] font-semibold text-ink flex items-center gap-1.5"><svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M8 1L1 14h14L8 1z" stroke="#E8752A" strokeWidth="1.5" fill="#E8752A" fillOpacity="0.1" /><path d="M8 6v3M8 11h.01" stroke="#E8752A" strokeWidth="1.5" strokeLinecap="round" /></svg>Alertes critiques</span>
                <motion.span className="text-[10px] bg-red-400 text-white rounded-full px-1.5 py-0.5 font-bold" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>14</motion.span>
              </div>
              <div className="space-y-1.5">
                {[{ title: "Rapport mensuel émissions CO2", project: "Plan Mobilité Durable", days: 11 }, { title: "Mise à jour indicateurs CSRD", project: "Mise en Conformité CSRD", days: 8 }].map((alert, i) => (
                  <motion.div key={alert.title} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-sand/50 border border-line/30" initial={{ opacity: 0, x: -8 }} animate={{ opacity: activeTab === 0 ? 1 : 0, x: activeTab === 0 ? 0 : -8 }} transition={{ delay: 0.9 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
                    <div><div className="text-[10px] font-medium text-ink leading-tight">{alert.title}</div><div className="text-[9px] text-muted">{alert.project}</div></div>
                    <motion.span className="text-[9px] bg-red-400 text-white rounded px-1.5 py-0.5 font-medium flex-shrink-0" animate={{ opacity: [1, 0.6, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}>{alert.days}j de retard</motion.span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="col-span-2 rounded-xl border border-line/50 bg-white p-3">
              <span className="text-[12px] font-semibold text-ink">Analyse Budgétaire</span>
              <div className="text-right mb-2 mt-1"><span className="text-sm font-bold text-green">1 M €</span><div className="text-[9px] text-muted">Budget total alloué</div></div>
              <div className="space-y-2">
                {[{ label: "Environnement", w: "65%", delay: 0.7 }, { label: "Social", w: "40%", delay: 0.9 }, { label: "Gouvernance", w: "30%", delay: 1.1 }].map((bar) => (
                  <div key={bar.label}><div className="text-[9px] text-muted mb-0.5">{bar.label}</div><div className="h-4 rounded bg-sand/80 overflow-hidden"><motion.div className="h-full rounded bg-gradient-to-r from-green/60 to-green/30" initial={{ width: 0 }} animate={{ width: activeTab === 0 ? bar.w : 0 }} transition={{ duration: 1.4, delay: bar.delay, ease: [0.16, 1, 0.3, 1] }} /></div></div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div initial={false} animate={{ opacity: activeTab === 1 ? 1 : 0, x: activeTab === 1 ? 0 : 12 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className={`${activeTab === 1 ? "" : "pointer-events-none absolute inset-x-5 top-0"}`}>
          <div className="rounded-xl border border-line/50 bg-gradient-to-br from-white to-sand/30 p-4 mb-3">
            <div className="flex items-center justify-between mb-3"><div className="text-[12px] font-semibold text-ink">Vue Portefeuille RSE</div><motion.span className="text-[9px] bg-green text-white rounded-full px-2 py-0.5 font-medium" initial={{ opacity: 0 }} animate={{ opacity: activeTab === 1 ? 1 : 0 }} transition={{ delay: 0.4, duration: 0.6 }}>3 axes stratégiques</motion.span></div>
            <div className="grid grid-cols-4 gap-2">
              {[{ label: "Budget Total", val: "1.0M€" }, { label: "Projets Actifs", val: "8" }, { label: "Actions en Cours", val: "14" }, { label: "KPIs Suivis", val: "12" }].map((card, i) => (
                <motion.div key={card.label} className="rounded-lg border border-line/40 bg-white p-2" initial={{ opacity: 0, y: 8 }} animate={{ opacity: activeTab === 1 ? 1 : 0, y: activeTab === 1 ? 0 : 8 }} transition={{ delay: 0.3 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                  <div className="text-[9px] text-muted flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green/40" />{card.label}</div>
                  <div className="text-xs font-bold text-ink mt-0.5">{card.val}</div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            {[{ name: "Gouvernance - Éthique & Transparence", borderColor: "border-l-green", score: 53 }, { name: "Social - Bien-être & Diversité", borderColor: "border-l-amber-400", score: 34 }, { name: "Environnement - Neutralité Carbone", borderColor: "border-l-green", score: 33 }].map((axis, i) => (
              <motion.div key={axis.name} className={`rounded-xl border border-line/50 border-l-[3px] ${axis.borderColor} bg-white p-3`} initial={{ opacity: 0, x: 16 }} animate={{ opacity: activeTab === 1 ? 1 : 0, x: activeTab === 1 ? 0 : 16 }} transition={{ delay: 0.45 + i * 0.15, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2"><span className="text-[11px] font-semibold text-ink truncate">{axis.name}</span><span className="text-[8px] bg-green-light text-green rounded-full px-1.5 py-0.5 font-medium">active</span></div>
                  <motion.span className="text-lg font-bold text-green" initial={{ opacity: 0 }} animate={{ opacity: activeTab === 1 ? 1 : 0 }} transition={{ delay: 0.7 + i * 0.12, duration: 0.6 }}>{axis.score}</motion.span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[{ l: "Objectifs", v: "3" }, { l: "Projets", v: "2" }, { l: "Actions", v: "1" }, { l: "KPIs", v: "2" }].map((stat, si) => (
                    <motion.div key={stat.l} className="rounded-md bg-sand/50 p-1.5" initial={{ opacity: 0 }} animate={{ opacity: activeTab === 1 ? 1 : 0 }} transition={{ delay: 0.6 + i * 0.12 + si * 0.05, duration: 0.55 }}>
                      <div className="text-[9px] text-muted flex items-center gap-0.5"><span className="w-1 h-1 rounded-full bg-green/40" />{stat.l}</div>
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

/* ================================================================
   VISUALS — KPI
   ================================================================ */

function KPIVisual() {
  const [activeView, setActiveView] = useState(1);
  useEffect(() => { const iv = setInterval(() => setActiveView((p) => (p === 0 ? 1 : 0)), 6000); return () => clearInterval(iv); }, []);

  return (
    <div className="w-full h-full rounded-2xl border border-line/70 bg-white shadow-[0_12px_60px_rgba(27,58,45,0.12),0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-line bg-sand/60 shrink-0">
        <div className="flex gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400/70" /><span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" /><span className="w-2.5 h-2.5 rounded-full bg-green/50" /></div>
        <div className="ml-3 flex-1 h-6 rounded-md bg-white/80 border border-line/50 flex items-center px-2.5"><span className="text-[12px] text-muted/60 tracking-wide">app.yumni.fr / kpis</span></div>
      </div>
      <div className="px-5 pt-4 pb-3 shrink-0">
        <div className="grid grid-cols-4 gap-2 mb-3">
          {[{ label: "TOTAL", val: "12", color: "text-green" }, { label: "SUR CIBLE", val: "6", color: "text-green" }, { label: "À RISQUE", val: "3", color: "text-orange" }, { label: "PROGRESSION", val: "72.4%", color: "text-ink" }].map((stat, i) => (
            <motion.div key={stat.label} className="rounded-lg border border-line/40 bg-white p-2.5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
              <span className="text-[9px] text-muted uppercase tracking-wider">{stat.label}</span>
              <div className={`text-lg font-bold ${stat.color}`}>{stat.val}</div>
            </motion.div>
          ))}
        </div>
        <div className="flex gap-1 p-0.5 bg-sand/80 rounded-lg w-fit">
          {["Tableau", "Cartes"].map((l, i) => (<button key={l} onClick={() => setActiveView(i)} className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all duration-300 ${activeView === i ? "bg-white text-ink shadow-sm" : "text-muted"}`}>{l}</button>))}
        </div>
      </div>
      <div className="px-5 pb-5 flex-1 relative overflow-hidden">
        <motion.div initial={false} animate={{ opacity: activeView === 1 ? 1 : 0, x: activeView === 1 ? 0 : -12 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className={`${activeView === 1 ? "" : "pointer-events-none absolute inset-x-5 top-0"}`}>
          <motion.div className="rounded-lg border border-orange/20 bg-orange-light/50 px-3 py-2 mb-3" initial={{ opacity: 0, y: 6 }} animate={{ opacity: activeView === 1 ? 1 : 0, y: activeView === 1 ? 0 : 6 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <div className="text-[11px] font-semibold text-orange flex items-center gap-1.5">
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M8 1L1 14h14L8 1z" stroke="#E8752A" strokeWidth="1.5" fill="#E8752A" fillOpacity="0.1" /></svg>
              3 KPIs à risque
            </div>
          </motion.div>
          <div className="grid grid-cols-2 gap-2">
            {[{ name: "Émissions CO2 totales", val: "2100", unit: "/ 1500 tCO2e", pct: 100 }, { name: "Part femmes CODIR", val: "32", unit: "/ 40 %", pct: 80 }, { name: "Heures formation/salarié", val: "35", unit: "/ 40 heures", pct: 88 }, { name: "Score bien-être employés", val: "76", unit: "/ 80 %", pct: 95 }].map((card, i) => (
              <motion.div key={card.name} className="rounded-xl border border-line/40 bg-white p-3" initial={{ opacity: 0, y: 12 }} animate={{ opacity: activeView === 1 ? 1 : 0, y: activeView === 1 ? 0 : 12 }} transition={{ delay: 0.5 + i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
                <div className="flex items-center justify-between mb-1"><span className="text-[10px] font-semibold text-ink truncate">{card.name}</span><span className="text-[8px] bg-green-light text-green rounded-full px-1.5 py-0.5 font-medium">Sur la cible</span></div>
                <div className="flex items-baseline gap-1 mb-2"><span className="text-xl font-bold text-ink">{card.val}</span><span className="text-[10px] text-muted">{card.unit}</span></div>
                <div className="flex items-center gap-2"><span className="text-[9px] text-muted">Progression</span><div className="flex-1 h-1.5 rounded-full bg-line overflow-hidden"><motion.div className="h-full rounded-full bg-green" initial={{ width: 0 }} animate={{ width: activeView === 1 ? `${card.pct}%` : 0 }} transition={{ duration: 1.4, delay: 0.7 + i * 0.1, ease: [0.16, 1, 0.3, 1] }} /></div><span className="text-[9px] font-medium text-green">{card.pct}%</span></div>
                <div className="h-5 flex items-end gap-px mt-2">
                  {[20, 25, 22, 30, 28, 35, 32, 40, 38, 45, 50, 55].map((h, bi) => (
                    <motion.div key={bi} className="flex-1 rounded-t bg-green/20" initial={{ height: 0 }} animate={{ height: activeView === 1 ? `${h}%` : 0 }} transition={{ duration: 0.6, delay: 0.9 + i * 0.08 + bi * 0.03, ease: [0.16, 1, 0.3, 1] }} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div initial={false} animate={{ opacity: activeView === 0 ? 1 : 0, x: activeView === 0 ? 0 : 12 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }} className={`${activeView === 0 ? "" : "pointer-events-none absolute inset-x-5 top-0"}`}>
          <div className="rounded-xl border border-line/50 bg-white overflow-hidden">
            <div className="grid grid-cols-12 gap-1 px-3 py-2 bg-sand/50 border-b border-line/30">
              <div className="col-span-1 text-[9px] text-muted font-medium">Statut</div>
              <div className="col-span-4 text-[9px] text-muted font-medium">KPI</div>
              <div className="col-span-2 text-[9px] text-muted font-medium">Objectif</div>
              <div className="col-span-2 text-[9px] text-muted font-medium">Valeur</div>
              <div className="col-span-2 text-[9px] text-muted font-medium">Progression</div>
              <div className="col-span-1 text-[9px] text-muted font-medium">Trend</div>
            </div>
            {[{ status: "ok", name: "Émissions CO2", obj: "1500", val: "2100", pct: 100, trend: "↓" }, { status: "ok", name: "Part femmes CODIR", obj: "40%", val: "32%", pct: 80, trend: "↑" }, { status: "warning", name: "Réduction conso. eau", obj: "30%", val: "18%", pct: 60, trend: "↗" }, { status: "ok", name: "Taux recyclage", obj: "75%", val: "72%", pct: 96, trend: "↑" }, { status: "ok", name: "Budget RSE utilisé", obj: "100%", val: "89%", pct: 89, trend: "↑" }].map((row, i) => (
              <motion.div key={row.name} className={`grid grid-cols-12 gap-1 px-3 py-2 border-b border-line/20 ${i % 2 === 0 ? "bg-white" : "bg-sand/20"}`} initial={{ opacity: 0, x: 8 }} animate={{ opacity: activeView === 0 ? 1 : 0, x: activeView === 0 ? 0 : 8 }} transition={{ delay: 0.2 + i * 0.06, duration: 0.5 }}>
                <div className="col-span-1 flex items-center"><span className={`w-2 h-2 rounded-full ${row.status === "ok" ? "bg-green" : "bg-orange"}`} /></div>
                <div className="col-span-4 text-[10px] font-medium text-ink truncate">{row.name}</div>
                <div className="col-span-2 text-[9px] text-muted">{row.obj}</div>
                <div className="col-span-2 text-[10px] font-medium text-ink">{row.val}</div>
                <div className="col-span-2 flex items-center gap-1"><div className="flex-1 h-1 rounded-full bg-line overflow-hidden"><motion.div className={`h-full rounded-full ${row.status === "ok" ? "bg-green" : "bg-orange"}`} initial={{ width: 0 }} animate={{ width: activeView === 0 ? `${row.pct}%` : 0 }} transition={{ duration: 1, delay: 0.4 + i * 0.06 }} /></div><span className="text-[9px] text-muted">{row.pct}%</span></div>
                <div className="col-span-1 text-[10px] text-muted text-center">{row.trend}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ================================================================
   VISUALS — WSJF
   ================================================================ */

function WSJFVisual() {
  const [showDetail, setShowDetail] = useState(false);
  useEffect(() => { const iv = setInterval(() => setShowDetail((p) => !p), 5800); return () => clearInterval(iv); }, []);

  const ideas = [
    { name: "Quick wins tri sélectif", score: 18.0, status: "Inbox", breakdown: "BV:14 TC:12 RR:10 / JS:2" },
    { name: "Automatisation reporting CSRD", score: 16.0, status: "Inbox", breakdown: "BV:18 TC:16 RR:14 / JS:3" },
    { name: "Formation flash éco-gestes", score: 8.5, status: "Inbox", breakdown: "BV:12 TC:14 RR:8 / JS:4" },
    { name: "Audit énergétique bâtiments", score: 8.4, status: "Converti", breakdown: "BV:16 TC:14 RR:12 / JS:5" },
    { name: "Détecteurs présence éclairage", score: 6.0, status: "Inbox", breakdown: "BV:10 TC:8 RR:6 / JS:4" },
  ];

  return (
    <div className="w-full h-full rounded-2xl border border-line/70 bg-white shadow-[0_12px_60px_rgba(27,58,45,0.12),0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-line bg-sand/60 shrink-0">
        <div className="flex gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-400/70" /><span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" /><span className="w-2.5 h-2.5 rounded-full bg-green/50" /></div>
        <div className="ml-3 flex-1 h-6 rounded-md bg-white/80 border border-line/50 flex items-center px-2.5"><span className="text-[12px] text-muted/60 tracking-wide">app.yumni.fr / idées</span></div>
      </div>
      <div className="flex-1 relative overflow-hidden flex">
        <motion.div className="flex-1 px-5 py-3 overflow-hidden" animate={{ width: showDetail ? "55%" : "100%" }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <div className="space-y-0">
            {ideas.map((idea, i) => (
              <motion.div key={idea.name} className={`flex items-center justify-between px-2 py-2.5 border-b border-line/20 cursor-pointer ${showDetail && i === 0 ? "bg-green-light/30" : "hover:bg-sand/30"}`} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }} onClick={() => setShowDetail(!showDetail)}>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5"><span className="text-[10px] font-semibold text-ink truncate">{idea.name}</span>{i < 3 && <span className="text-[8px] bg-green-light text-green rounded px-1 py-0.5 font-bold">Top {i + 1}</span>}</div>
                  <div className="text-[7px] text-muted mt-0.5">{idea.breakdown}</div>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${idea.status === "Converti" ? "bg-green-light text-green" : "bg-sand text-muted"} text-[8px] font-medium`}>{idea.status}</span>
                  <motion.span className="text-sm font-bold text-green" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.08 }}>{idea.score.toFixed(1)}</motion.span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div className="border-l border-line/50 bg-white flex-shrink-0 overflow-hidden" initial={false} animate={{ width: showDetail ? "45%" : "0%", opacity: showDetail ? 1 : 0 }} transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}>
          <div className="p-4">
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: showDetail ? 1 : 0, y: showDetail ? 0 : 8 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <div className="text-[12px] font-bold text-ink mb-3">Quick wins tri sélectif</div>
              <div className="rounded-xl border border-line/40 bg-sand/20 p-3">
                <div className="text-[10px] text-muted uppercase tracking-wider mb-2">WSJF Score</div>
                <motion.div className="text-2xl font-bold text-green mb-3" initial={{ opacity: 0 }} animate={{ opacity: showDetail ? 1 : 0 }} transition={{ delay: 0.5 }}>18.00</motion.div>
                <div className="grid grid-cols-2 gap-2">
                  {[{ label: "Valeur métier", val: 14, max: 20, color: "bg-blue-400" }, { label: "Criticité temps", val: 12, max: 20, color: "bg-orange" }, { label: "Réduction risques", val: 10, max: 20, color: "bg-amber-400" }, { label: "Effort", val: 2, max: 20, color: "bg-ink" }].map((m, i) => (
                    <motion.div key={m.label} className="rounded-lg border border-line/30 bg-white p-2" initial={{ opacity: 0 }} animate={{ opacity: showDetail ? 1 : 0 }} transition={{ delay: 0.45 + i * 0.08 }}>
                      <div className="text-[9px] text-muted mb-0.5">{m.label}</div>
                      <div className="text-base font-bold text-ink mb-1">{m.val}</div>
                      <div className="h-1.5 rounded-full bg-line overflow-hidden"><motion.div className={`h-full rounded-full ${m.color}`} initial={{ width: 0 }} animate={{ width: showDetail ? `${(m.val / m.max) * 100}%` : 0 }} transition={{ duration: 1.2, delay: 0.6 + i * 0.1 }} /></div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="flex gap-1.5 mt-3">
                <span className="flex-1 text-center text-[9px] py-1.5 rounded-lg border border-line/40 text-muted bg-white">Collaborer</span>
                <motion.span className="flex-1 text-center text-[9px] py-1.5 rounded-lg bg-green text-white font-medium" animate={{ boxShadow: ["0 2px 8px rgba(0,129,74,0.2)", "0 4px 16px rgba(0,129,74,0.35)", "0 2px 8px rgba(0,129,74,0.2)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>Convertir en projet →</motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ================================================================
   VISUALS — Risques
   ================================================================ */

function RisquesVisual() {
  const [showTooltip, setShowTooltip] = useState(false);
  useEffect(() => { const iv = setInterval(() => setShowTooltip((v) => !v), 5500); return () => clearInterval(iv); }, []);

  const zones = [[2, 3, 3, 4, 4], [1, 2, 3, 3, 4], [1, 1, 2, 3, 3], [0, 1, 1, 2, 2], [0, 0, 1, 1, 2]];
  const zBg = ["bg-emerald-200/40", "bg-emerald-300/45", "bg-amber-300/40", "bg-orange-300/40", "bg-red-300/35"];
  const dots = [{ r: 1, c: 2, n: 1 }, { r: 2, c: 3, n: 2 }, { r: 0, c: 4, n: 3 }, { r: 1, c: 4, n: 2 }, { r: 3, c: 1, n: 1 }];

  return (
    <div className="w-full h-full rounded-2xl border border-line bg-white shadow-lg overflow-hidden flex flex-col">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-neutral-50 border-b border-line shrink-0"><div className="w-2 h-2 rounded-full bg-red-400/70" /><div className="w-2 h-2 rounded-full bg-amber-400/70" /><div className="w-2 h-2 rounded-full bg-green/50" /><div className="flex-1 mx-4 h-4 rounded bg-neutral-200/60" /></div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-line/50 shrink-0">
        <span className="text-[9px] text-muted">Tableau de bord</span><span className="text-[9px] text-muted">›</span><span className="text-[9px] px-2 py-0.5 rounded-full bg-green/10 text-green font-medium">Risques</span>
      </div>
      <div className="flex-1 p-3 flex flex-col gap-2.5 overflow-hidden">
        <motion.div className="flex items-center gap-2 shrink-0" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-red-50 border border-red-200/50"><div className="w-2 h-2 rounded-full bg-red-400" /><span className="text-[10px] font-semibold text-red-600">3</span><span className="text-[9px] text-red-500/80">critiques</span></div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-orange-50 border border-orange-200/50"><div className="w-2 h-2 rounded-full bg-orange" /><span className="text-[10px] font-semibold text-orange-600">5</span><span className="text-[9px] text-orange-500/80">élevés</span></div>
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/50"><div className="w-2 h-2 rounded-full bg-green" /><span className="text-[10px] font-semibold text-emerald-600">4</span><span className="text-[9px] text-emerald-500/80">maîtrisés</span></div>
        </motion.div>
        <div className="flex-1 rounded-xl border border-line/60 p-3 bg-white flex flex-col min-h-0">
          <div className="flex items-center gap-2 mb-2 shrink-0"><span className="text-[11px] font-semibold text-forest">Matrice des risques</span><span className="text-[9px] text-muted">Impact × Probabilité</span></div>
          <div className="flex-1 flex gap-1.5 min-h-0">
            <div className="flex flex-col justify-around shrink-0 pr-0.5">{[5, 4, 3, 2, 1].map((n) => (<span key={n} className="text-[9px] text-muted leading-none">{n}</span>))}</div>
            <div className="flex-1 flex flex-col gap-[2px] relative">
              {zones.map((row, ri) => (<div key={ri} className="flex-1 grid grid-cols-5 gap-[2px]">{row.map((z, ci) => (<motion.div key={ci} className={`rounded ${zBg[z]}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35, delay: 0.2 + (ri * 5 + ci) * 0.025 }} />))}</div>))}
              {dots.map((d, i) => {
                const sz = d.n >= 3 ? 18 : d.n >= 2 ? 14 : 10;
                return (<motion.div key={i} className="absolute flex items-center justify-center pointer-events-none" style={{ left: `${(d.c / 5) * 100 + 10}%`, top: `${(d.r / 5) * 100 + 10}%`, transform: "translate(-50%, -50%)" }} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 1.0 + i * 0.1, type: "spring", damping: 14, stiffness: 180 }}><div className="rounded-full bg-orange flex items-center justify-center shadow-md" style={{ width: sz, height: sz }}>{d.n > 1 && <span className="text-[8px] text-white font-bold leading-none">{d.n}</span>}</div></motion.div>);
              })}
              <AnimatePresence>
                {showTooltip && (
                  <motion.div className="absolute bg-white rounded-xl shadow-xl border border-line/70 p-3 z-10" style={{ right: "4%", top: "6%", width: "52%" }} initial={{ opacity: 0, scale: 0.92, y: 6 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 4 }} transition={{ duration: 0.4 }}>
                    <div className="text-[9px] text-muted">Probabilité: 4 · Impact: 5</div>
                    <div className="text-[11px] font-bold text-forest mt-0.5">Risque(s) total : 3</div>
                    <div className="mt-1.5 space-y-1 border-t border-line/40 pt-1.5">
                      <div className="text-[8px] text-forest/80">• Arrêt production — Panne équipement</div>
                      <div className="text-[8px] text-forest/80">• Perte client majeur (&gt;30% CA)</div>
                      <div className="text-[8px] text-forest/80">• Non-conformité CSRD</div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex ml-5 mt-1 shrink-0">{[1, 2, 3, 4, 5].map((n) => (<span key={n} className="flex-1 text-center text-[9px] text-muted">{n}</span>))}</div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   VISUALS — Reporting
   ================================================================ */

function ReportingVisual() {
  const [showConfig, setShowConfig] = useState(false);
  useEffect(() => { const iv = setInterval(() => setShowConfig((v) => !v), 5800); return () => clearInterval(iv); }, []);

  return (
    <div className="w-full h-full rounded-2xl border border-line bg-white shadow-lg overflow-hidden flex flex-col">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-neutral-50 border-b border-line shrink-0"><div className="w-2 h-2 rounded-full bg-red-400/70" /><div className="w-2 h-2 rounded-full bg-amber-400/70" /><div className="w-2 h-2 rounded-full bg-green/50" /><div className="flex-1 mx-4 h-4 rounded bg-neutral-200/60" /></div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-line/50 shrink-0">
        <span className="text-[9px] text-muted">Tableau de bord</span><span className="text-[9px] text-muted">›</span><span className="text-[9px] px-2 py-0.5 rounded-full bg-green/10 text-green font-medium">Rapports</span>
      </div>
      <div className="flex-1 p-3 flex flex-col overflow-hidden relative">
        <motion.div className="flex items-center gap-2 mb-3 shrink-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <div className="flex-1 flex items-center gap-1 px-2 py-1 rounded-md border border-line/60 bg-neutral-50/50"><span className="text-[8px] text-muted/40">Rechercher un rapport...</span></div>
          <motion.div className="px-2.5 py-1 rounded-md bg-green text-white text-[8px] font-medium" animate={{ boxShadow: ["0 1px 4px rgba(0,129,74,0.15)", "0 3px 10px rgba(0,129,74,0.3)", "0 1px 4px rgba(0,129,74,0.15)"] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>+ Générer un rapport</motion.div>
        </motion.div>
        <div className="flex-1 rounded-lg border border-line/50 overflow-hidden flex flex-col min-h-0">
          <div className="grid grid-cols-12 gap-1 px-2.5 py-1.5 bg-neutral-50/80 border-b border-line/40 shrink-0">
            <span className="col-span-4 text-[7px] text-muted/70 font-medium uppercase tracking-wider">Titre</span>
            <span className="col-span-2 text-[7px] text-muted/70 font-medium uppercase tracking-wider">Auteur</span>
            <span className="col-span-2 text-[7px] text-muted/70 font-medium uppercase tracking-wider">Date</span>
            <span className="col-span-2 text-[7px] text-muted/70 font-medium uppercase tracking-wider">Période</span>
            <span className="col-span-2 text-[7px] text-muted/70 font-medium uppercase tracking-wider">Statut</span>
          </div>
          {[{ title: "Rapport Q2", author: "Thomas D.", date: "2 avr. 2026", period: "Trimestre", status: "En attente", sc: "text-amber-500 bg-amber-50 border-amber-200/50" }, { title: "Rapport Q1 — Final", author: "Marie L.", date: "15 jan. 2026", period: "Trimestre", status: "Terminé", sc: "text-green bg-green/5 border-green/20" }, { title: "Bilan annuel 2025", author: "Thomas D.", date: "8 jan. 2026", period: "Annuel", status: "Terminé", sc: "text-green bg-green/5 border-green/20" }].map((row, i) => (
            <motion.div key={i} className="grid grid-cols-12 gap-1 px-2.5 py-2 border-b border-line/25 items-center" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}>
              <span className="col-span-4 text-[9px] font-medium text-forest truncate">{row.title}</span>
              <span className="col-span-2 text-[8px] text-muted">{row.author}</span>
              <span className="col-span-2 text-[8px] text-muted">{row.date}</span>
              <span className="col-span-2 text-[8px] text-muted">{row.period}</span>
              <span className={`col-span-2 text-[7px] font-medium px-1.5 py-0.5 rounded-full border text-center ${row.sc}`}>{row.status}</span>
            </motion.div>
          ))}
        </div>
        <AnimatePresence>
          {showConfig && (
            <motion.div className="absolute inset-0 flex justify-end z-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="absolute inset-0 bg-black/10 rounded-xl" />
              <motion.div className="relative w-[58%] bg-white shadow-2xl border-l border-line/60 rounded-r-xl flex flex-col overflow-hidden" initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
                <div className="p-3 border-b border-line/40"><div className="text-[11px] font-semibold text-forest">Générer un rapport</div><div className="text-[8px] text-muted mt-0.5">Configurez votre rapport PowerPoint</div></div>
                <div className="flex-1 p-3 overflow-hidden space-y-2.5">
                  <div><div className="text-[9px] font-semibold text-forest mb-1">Axes à inclure</div>{["Environnement - Neutralité Carbone", "Social - Bien-être & Diversité", "Gouvernance - Éthique & Transparence"].map((a, i) => (<motion.div key={i} className="flex items-center gap-1.5 mb-1" initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.06 }}><div className="w-3 h-3 rounded bg-green flex items-center justify-center"><span className="text-white text-[7px] font-bold">✓</span></div><span className="text-[8px] text-forest/80">{a}</span></motion.div>))}</div>
                  <div><div className="text-[9px] font-semibold text-forest mb-1">Sections</div><div className="grid grid-cols-2 gap-1">{["Résumé", "Vue d'ensemble", "KPIs", "Projets", "Actions", "Risques", "ESRS"].map((s, i) => (<motion.div key={i} className="flex items-center gap-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + i * 0.04 }}><div className="w-3 h-3 rounded bg-green flex items-center justify-center"><span className="text-white text-[7px] font-bold">✓</span></div><span className="text-[7px] text-forest/80">{s}</span></motion.div>))}</div></div>
                </div>
                <div className="p-2.5 border-t border-line/40 flex justify-end gap-2 shrink-0">
                  <span className="px-3 py-1 rounded-md border border-line/60 text-[8px] text-muted">Annuler</span>
                  <motion.span className="px-3 py-1 rounded-md bg-green text-white text-[8px] font-medium" animate={{ boxShadow: ["0 1px 6px rgba(0,129,74,0.2)", "0 3px 14px rgba(0,129,74,0.4)", "0 1px 6px rgba(0,129,74,0.2)"] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}>Générer</motion.span>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ================================================================
   VISUALS — ESRS (new)
   ================================================================ */

function ESRSVisual() {
  const standards = [
    { id: "E1", label: "Climat", covered: true },
    { id: "E2", label: "Pollution", covered: true },
    { id: "E3", label: "Eau", covered: false },
    { id: "E4", label: "Biodiversité", covered: false },
    { id: "E5", label: "Ressources", covered: true },
    { id: "S1", label: "Effectifs", covered: true },
    { id: "S2", label: "Chaîne valeur", covered: true },
    { id: "S3", label: "Communautés", covered: false },
    { id: "S4", label: "Consommateurs", covered: true },
    { id: "G1", label: "Gouvernance", covered: true },
    { id: "G2", label: "Conduite", covered: true },
    { id: "IRO", label: "Général", covered: false },
  ];

  const covered = standards.filter((s) => s.covered).length;

  return (
    <div className="w-full h-full rounded-2xl border border-line bg-white shadow-lg overflow-hidden flex flex-col">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-neutral-50 border-b border-line shrink-0"><div className="w-2 h-2 rounded-full bg-red-400/70" /><div className="w-2 h-2 rounded-full bg-amber-400/70" /><div className="w-2 h-2 rounded-full bg-green/50" /><div className="flex-1 mx-4 h-4 rounded bg-neutral-200/60" /></div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-line/50 shrink-0">
        <span className="text-[9px] text-muted">Tableau de bord</span><span className="text-[9px] text-muted">›</span><span className="text-[9px] px-2 py-0.5 rounded-full bg-green/10 text-green font-medium">Conformité ESRS</span>
      </div>
      <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
        <motion.div className="flex items-center justify-between" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div>
            <div className="text-[12px] font-semibold text-ink">Couverture ESRS</div>
            <div className="text-[10px] text-muted">{covered}/{standards.length} standards couverts</div>
          </div>
          <div className="relative w-14 h-14">
            <svg viewBox="0 0 56 56" className="w-full h-full -rotate-90">
              <circle cx="28" cy="28" r="22" fill="none" stroke="#E8E8E8" strokeWidth="4" />
              <motion.circle cx="28" cy="28" r="22" fill="none" stroke="#00814A" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${2 * Math.PI * 22}`} initial={{ strokeDashoffset: 2 * Math.PI * 22 }} animate={{ strokeDashoffset: 2 * Math.PI * 22 * (1 - covered / standards.length) }} transition={{ duration: 2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }} />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center"><motion.span className="text-sm font-bold text-green" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>{Math.round((covered / standards.length) * 100)}%</motion.span></div>
          </div>
        </motion.div>
        <div className="grid grid-cols-4 gap-2 flex-1">
          {standards.map((s, i) => (
            <motion.div key={s.id} className={`p-2.5 rounded-lg text-center flex flex-col items-center justify-center ${s.covered ? "bg-green-light border border-green/10" : "bg-cream border border-line-dark/30"}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.15 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}>
              <div className={`text-xs font-bold ${s.covered ? "text-forest" : "text-muted"}`}>{s.id}</div>
              <div className="text-[10px] text-muted mt-0.5">{s.label}</div>
              {s.covered && <motion.div className="w-3 h-3 rounded-full bg-green/20 flex items-center justify-center mt-1" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4 + i * 0.05, type: "spring" }}><svg width="8" height="8" viewBox="0 0 12 12" fill="none"><path d="M2.5 6L5 8.5L9.5 3.5" stroke="#00814A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg></motion.div>}
            </motion.div>
          ))}
        </div>
        <motion.div className="rounded-lg border border-orange/20 bg-orange-light/30 px-3 py-2" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.5 }}>
          <div className="text-[10px] font-semibold text-orange flex items-center gap-1.5">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none"><path d="M8 1L1 14h14L8 1z" stroke="#E8752A" strokeWidth="1.5" fill="#E8752A" fillOpacity="0.1" /></svg>
            4 standards à compléter
          </div>
          <div className="text-[9px] text-orange/70 mt-0.5">E3 (Eau), E4 (Biodiversité), S3 (Communautés), IRO (Général)</div>
        </motion.div>
      </div>
    </div>
  );
}

/* ================================================================
   VISUALS — Collaboration (new)
   ================================================================ */

function CollaborationVisual() {
  const [movingCard, setMovingCard] = useState(false);
  useEffect(() => { const iv = setInterval(() => setMovingCard((v) => !v), 4500); return () => clearInterval(iv); }, []);

  const columns = [
    { title: "À faire", color: "bg-muted", items: [{ title: "Collecte données CSRD", tag: "CSRD", user: "F.D." }, { title: "Audit fournisseurs ESG", tag: "Gouv", user: "A.M." }] },
    { title: "En cours", color: "bg-orange", items: [{ title: "Plan mobilité durable", tag: "Env", user: "S.L." }, { title: "Formation éco-gestes", tag: "Social", user: "T.D." }] },
    { title: "Terminé", color: "bg-green", items: [{ title: "Bilan carbone Q1", tag: "Env", user: "M.L." }] },
  ];

  return (
    <div className="w-full h-full rounded-2xl border border-line bg-white shadow-lg overflow-hidden flex flex-col">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-neutral-50 border-b border-line shrink-0"><div className="w-2 h-2 rounded-full bg-red-400/70" /><div className="w-2 h-2 rounded-full bg-amber-400/70" /><div className="w-2 h-2 rounded-full bg-green/50" /><div className="flex-1 mx-4 h-4 rounded bg-neutral-200/60" /></div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-line/50 shrink-0">
        <span className="text-[9px] text-muted">Actions RSE</span><span className="text-[9px] text-muted">›</span><span className="text-[9px] px-2 py-0.5 rounded-full bg-green/10 text-green font-medium">Kanban</span>
      </div>
      <div className="flex-1 p-3 flex gap-2.5 overflow-hidden">
        {columns.map((col, ci) => (
          <motion.div key={col.title} className="flex-1 flex flex-col min-w-0" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + ci * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
            <div className="flex items-center gap-2 mb-2.5 px-1">
              <div className={`w-2 h-2 rounded-full ${col.color}`} />
              <span className="text-[11px] font-semibold text-ink">{col.title}</span>
              <span className="text-[9px] text-muted ml-auto">{col.items.length + (ci === 2 && movingCard ? 1 : 0)}</span>
            </div>
            <div className="flex-1 space-y-2">
              {col.items.map((item, ii) => (
                <motion.div key={item.title} className="rounded-lg border border-line/50 bg-white p-2.5 shadow-sm" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + ci * 0.1 + ii * 0.08, duration: 0.5 }}>
                  <div className="text-[10px] font-medium text-ink mb-1.5">{item.title}</div>
                  <div className="flex items-center justify-between">
                    <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-green-light text-green font-medium">{item.tag}</span>
                    <div className="w-5 h-5 rounded-full bg-forest/10 flex items-center justify-center"><span className="text-[7px] font-bold text-forest">{item.user}</span></div>
                  </div>
                </motion.div>
              ))}
              {ci === 2 && (
                <AnimatePresence>
                  {movingCard && (
                    <motion.div className="rounded-lg border border-green/30 bg-green-light/30 p-2.5 shadow-sm" initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10. }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                      <div className="text-[10px] font-medium text-green mb-1.5">Index Égalité F/H ✓</div>
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-green/10 text-green font-medium">Social</span>
                        <div className="w-5 h-5 rounded-full bg-green/10 flex items-center justify-center"><span className="text-[7px] font-bold text-green">S.L.</span></div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        ))}
      </div>
      {/* Comment thread */}
      <div className="px-3 pb-3 shrink-0">
        <motion.div className="rounded-lg border border-line/50 bg-sand/30 p-2.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.5 }}>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-4 h-4 rounded-full bg-forest/10 flex items-center justify-center"><span className="text-[6px] font-bold text-forest">A.M.</span></div>
            <span className="text-[9px] font-medium text-ink">Antoine Moreau</span>
            <span className="text-[8px] text-muted">il y a 2h</span>
          </div>
          <div className="text-[9px] text-muted leading-relaxed">&ldquo;Données Caen toujours manquantes — <span className="text-green font-medium">@Sophie</span> relancé Fabrice 3 fois.&rdquo;</div>
        </motion.div>
      </div>
    </div>
  );
}

/* ================================================================
   VISUALS — Multi-org (new)
   ================================================================ */

function MultiOrgVisual() {
  const [expanded, setExpanded] = useState(true);
  useEffect(() => { const iv = setInterval(() => setExpanded((v) => !v), 5000); return () => clearInterval(iv); }, []);

  const orgs = [
    { name: "GreenTech Normandie", score: 72, projects: 8, users: 12 },
    { name: "GreenTech Est", score: 61, projects: 5, users: 8 },
    { name: "GreenTech Sud", score: 45, projects: 3, users: 6 },
  ];

  return (
    <div className="w-full h-full rounded-2xl border border-line bg-white shadow-lg overflow-hidden flex flex-col">
      <div className="flex items-center gap-1.5 px-3 py-2 bg-neutral-50 border-b border-line shrink-0"><div className="w-2 h-2 rounded-full bg-red-400/70" /><div className="w-2 h-2 rounded-full bg-amber-400/70" /><div className="w-2 h-2 rounded-full bg-green/50" /><div className="flex-1 mx-4 h-4 rounded bg-neutral-200/60" /></div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-line/50 shrink-0">
        <span className="text-[9px] text-muted">Administration</span><span className="text-[9px] text-muted">›</span><span className="text-[9px] px-2 py-0.5 rounded-full bg-green/10 text-green font-medium">Organisations</span>
      </div>
      <div className="flex-1 p-4 flex flex-col gap-3 overflow-hidden">
        {/* Consolidated view */}
        <motion.div className="rounded-xl border border-green/20 bg-gradient-to-br from-green-light/20 to-white p-3" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-green/10 flex items-center justify-center"><svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="1" y="5" width="14" height="10" rx="1.5" stroke="#00814A" strokeWidth="1.2" /><path d="M5 5V3.5A2.5 2.5 0 0 1 11 3.5V5" stroke="#00814A" strokeWidth="1.2" /></svg></div>
              <div>
                <div className="text-[12px] font-semibold text-forest">Vue groupe consolidée</div>
                <div className="text-[9px] text-muted">3 organisations · 26 utilisateurs</div>
              </div>
            </div>
            <motion.span className="text-xl font-bold text-green" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.6 }}>59%</motion.span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[{ label: "Projets totaux", val: "16" }, { label: "Actions", val: "47" }, { label: "KPIs", val: "36" }].map((s, i) => (
              <motion.div key={s.label} className="rounded-md bg-white/80 border border-line/30 p-1.5 text-center" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}>
                <div className="text-xs font-bold text-ink">{s.val}</div>
                <div className="text-[8px] text-muted">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Org list */}
        <div className="flex-1 space-y-2">
          {orgs.map((org, i) => (
            <motion.div key={org.name} className="rounded-xl border border-line/50 bg-white p-3" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-md bg-forest/5 flex items-center justify-center"><span className="text-[8px] font-bold text-forest">{org.name.split(" ").pop()?.charAt(0)}</span></div>
                  <span className="text-[11px] font-semibold text-ink">{org.name}</span>
                </div>
                <motion.span className={`text-sm font-bold ${org.score >= 70 ? "text-green" : org.score >= 50 ? "text-amber-500" : "text-orange"}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}>{org.score}%</motion.span>
              </div>
              <AnimatePresence>
                {expanded && (
                  <motion.div className="grid grid-cols-3 gap-2" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
                    <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-green/40" /><span className="text-[9px] text-muted">{org.projects} projets</span></div>
                    <div className="flex items-center gap-1"><span className="w-1 h-1 rounded-full bg-green/40" /><span className="text-[9px] text-muted">{org.users} users</span></div>
                    <div className="h-1.5 rounded-full bg-line overflow-hidden self-center"><motion.div className="h-full rounded-full bg-green/50" initial={{ width: 0 }} animate={{ width: `${org.score}%` }} transition={{ duration: 1.2, delay: 0.6 + i * 0.1 }} /></div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Isolation badge */}
        <motion.div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-sand/80 border border-line/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.5 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00814A" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
          <span className="text-[9px] text-muted">Données isolées par organisation · RLS PostgreSQL · RGPD by design</span>
        </motion.div>
      </div>
    </div>
  );
}

/* ================================================================
   ALL VISUALS ARRAY
   ================================================================ */

const VISUALS = [
  CockpitVisual,
  KPIVisual,
  WSJFVisual,
  RisquesVisual,
  ReportingVisual,
  ESRSVisual,
  CollaborationVisual,
  MultiOrgVisual,
];

/* ================================================================
   HERO SECTION
   ================================================================ */

function ProductHero() {
  const { t, locale } = useDictionary();
  const p = t.product;

  return (
    <section className="relative -mt-16 pt-40 pb-16 md:pt-52 md:pb-24 overflow-hidden">
      {/* Background — matching homepage style */}
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
        {/* Ambient blobs */}
        <div className="absolute bottom-[5%] left-[25%] w-[500px] h-[500px] rounded-full bg-orange/[0.05] blur-[100px]" />
        <div className="absolute bottom-[8%] right-[15%] w-[400px] h-[400px] rounded-full bg-green/[0.05] blur-[80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p className="text-sm font-semibold tracking-widest uppercase text-green mb-4" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            {p.hero.eyebrow}
          </motion.p>
          <motion.h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-forest mb-7" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
            {p.hero.title1}<br />
            <span className="italic text-green">{p.hero.title2}</span>
          </motion.h1>
          <motion.p className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.12, ease }}>
            {p.hero.subtitle}
          </motion.p>

          {/* Animated hierarchy — compact inline flow */}
          <motion.div 
            className="mb-12" 
            initial={{ opacity: 0, y: 16 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.24, ease }}
          >
            <div className="inline-flex items-center justify-center flex-wrap gap-x-2 gap-y-3 px-6 py-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-green/10 shadow-[0_4px_24px_rgba(0,129,74,0.06)]">
              {["Axes", "Objectifs", "Projets", "Actions", "KPIs"].map((step, i) => (
                <motion.div 
                  key={step} 
                  className="flex items-center gap-2"
                  initial={{ opacity: 0, y: 8 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease }}
                >
                  <span className="text-sm font-medium text-forest">{step}</span>
                  {i < 4 && (
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-green/40 ml-1">
                      <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div className="flex flex-col sm:flex-row items-center justify-center gap-4" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.36, ease }}>
            <Link href={`/${locale}/essai-gratuit`} className="group bg-green text-white font-medium px-8 py-3.5 rounded-full hover:bg-forest transition-all duration-300 text-sm text-center shadow-[0_4px_20px_rgba(0,129,74,0.25)] hover:shadow-[0_8px_30px_rgba(0,129,74,0.35)]">
              {t.common.freeTrialStart}<span className="ml-2 inline-block group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
            <Link href={`/${locale}/demo`} className="border-2 border-green/20 text-ink hover:border-green hover:text-green px-8 py-3.5 rounded-full transition-all duration-300 text-sm text-center hover:shadow-[0_4px_16px_rgba(0,129,74,0.08)]">
              {t.common.requestDemo}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FEATURE SHOWCASE — zero-click alternating scroll
   Each feature tells its own micro-story as the user scrolls.
   Nudge badges highlight the killer stat per feature.
   No clicks required. No cognitive overhead. Just value.
   ================================================================ */

/* Nudge stat for each feature — the one number that triggers desire */
const nudgeBadges = [
  { stat: "1 écran", label: "Score RSE global" },         // Cockpit
  { stat: "40+", label: "KPIs préconfigurés" },            // KPIs
  { stat: "0", label: "débats subjectifs" },                // WSJF
  { stat: "5×5", label: "matrice temps réel" },             // Risques
  { stat: "12 sec", label: "au lieu de 3 jours" },          // Reporting
  { stat: "12/12", label: "standards ESRS" },               // ESRS
  { stat: "0", label: "threads email perdus" },             // Collaboration
  { stat: "< 5 min", label: "onboarding client" },          // Multi-org
];

/* Background treatment: alternate between clean/subtle to create rhythm */
const rowBg = [
  "",                                          // 0 — white
  "bg-sand/30",                                // 1 — warm
  "",                                          // 2 — white
  "bg-forest",                                  // 3 — dark (wow moment)
  "",                                          // 4 — white
  "bg-sand/30",                                // 5 — warm
  "",                                          // 6 — white
  "bg-gradient-to-br from-forest/[0.03] to-sand/20", // 7 — subtle close
];

/* When dark bg, override text colors */
const isDark = (_i: number) => _i === 3;

function FeatureRow({ feature, index, Visual }: {
  feature: { tag: string; id: string; title: string; subtitle: string; description: string; bullets: string[] };
  index: number;
  Visual: React.ComponentType;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const reversed = index % 2 === 1;
  const dark = isDark(index);
  const nudge = nudgeBadges[index];

  return (
    <div ref={ref} className={`${rowBg[index]} relative overflow-hidden`}>
      {/* Subtle ambient glow for dark rows */}
      {dark && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-green/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 rounded-full bg-green/5 blur-2xl" />
          <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "radial-gradient(circle, #fff 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }} />
        </div>
      )}

      <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reversed ? "direction-rtl" : ""}`} style={reversed ? { direction: "rtl" } : {}}>

          {/* ── Visual side ── */}
          <motion.div
            className="w-full"
            style={reversed ? { direction: "ltr" } : {}}
            initial={{ opacity: 0, x: reversed ? 40 : -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <div className="aspect-[4/3] max-h-[480px] w-full">
              <Visual />
            </div>
          </motion.div>

          {/* ── Text side ── */}
          <motion.div
            className="w-full"
            style={reversed ? { direction: "ltr" } : {}}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            {/* Tag + number */}
            <div className="flex items-center gap-3 mb-5">
              <span className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold ${
                dark
                  ? "bg-white/10 text-green"
                  : "bg-green-light/50 text-green"
              }`}>
                {feature.tag}
              </span>
              <span className={dark ? "text-green" : "text-green"}>
                {featureIcons[index]}
              </span>
              <div className={`h-px flex-1 ${dark ? "bg-white/10" : "bg-line"}`} />
            </div>

            {/* Title */}
            <h3 className={`font-display text-2xl md:text-3xl leading-tight mb-2 ${dark ? "text-white" : "text-forest"}`}>
              {feature.title}
            </h3>

            {/* Subtitle — the hook */}
            <p className={`text-lg font-display italic mb-5 ${dark ? "text-green-muted" : "text-green"}`}>
              {feature.subtitle}
            </p>

            {/* Description */}
            <p className={`leading-relaxed mb-6 ${dark ? "text-white/60" : "text-muted"}`}>
              {feature.description}
            </p>

            {/* Bullets — staggered reveal */}
            <ul className="space-y-2.5 mb-7">
              {feature.bullets.map((bullet: string, bi: number) => (
                <motion.li
                  key={bi}
                  className={`flex items-start gap-3 text-sm leading-relaxed ${dark ? "text-white/70" : "text-ink-light"}`}
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + bi * 0.08, duration: 0.4, ease }}
                >
                  <span className="text-green mt-0.5 shrink-0">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  {bullet}
                </motion.li>
              ))}
            </ul>

            {/* Nudge badge — the killer stat */}
            <motion.div
              className={`inline-flex items-center gap-3 px-4 py-2.5 rounded-xl ${
                dark
                  ? "bg-white/[0.07] border border-white/10"
                  : "bg-green-light/40 border border-green/10"
              }`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6, duration: 0.5, ease }}
            >
              <span className={`text-xl font-display font-bold ${dark ? "text-green" : "text-green"}`}>
                {nudge.stat}
              </span>
              <span className={`text-sm ${dark ? "text-white/50" : "text-muted"}`}>
                {nudge.label}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function FeatureShowcase() {
  const { t } = useDictionary();
  const features = t.product.features as { tag: string; id: string; title: string; subtitle: string; description: string; bullets: string[] }[];

  return (
    <section>
      {features.map((f, i) => (
        <FeatureRow key={f.id} feature={f} index={i} Visual={VISUALS[i]} />
      ))}
    </section>
  );
}

/* ================================================================
   ROADMAP SECTION
   ================================================================ */

function RoadmapSection() {
  const { t } = useDictionary();
  const roadmap = t.product.roadmap;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const phaseIcons = [
    <svg key="0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M9 3v18M3 9h18" /></svg>,
    <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></svg>,
    <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>,
    <svg key="3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>,
    <svg key="4" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2a5 5 0 0 1 5 5c0 3-5 8-5 8s-5-5-5-8a5 5 0 0 1 5-5z" /><circle cx="12" cy="7" r="1.5" /></svg>,
    <svg key="5" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>,
  ];

  return (
    <section ref={ref} className="py-24 md:py-36 relative overflow-hidden bg-gradient-to-b from-white via-sand/20 to-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute -left-[10%] top-[20%] w-[50%] h-[60%] opacity-[0.03]" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="280" stroke="#E8752A" strokeWidth="1" />
          <circle cx="300" cy="300" r="200" stroke="#E8752A" strokeWidth="0.6" />
        </svg>
        <div className="absolute top-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-green/[0.02] blur-[80px]" />
        <div className="absolute bottom-[10%] left-[10%] w-[400px] h-[400px] rounded-full bg-orange/[0.03] blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <FadeIn className="text-center mb-20">
          <p className="text-orange text-sm font-semibold tracking-widest uppercase mb-4">{roadmap.eyebrow}</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-forest leading-tight">{roadmap.title}</h2>
        </FadeIn>

        {/* Creative timeline layout */}
        <div className="relative">
          {/* Central timeline spine — visible on desktop */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2">
            <motion.div 
              className="w-full h-full bg-gradient-to-b from-green/20 via-green/40 to-orange/30"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "top" }}
            />
          </div>

          <div className="space-y-8 lg:space-y-0">
            {roadmap.steps.map((step: { phase: string; title: string; description: string }, i: number) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div 
                  key={i} 
                  className={`relative lg:grid lg:grid-cols-2 lg:gap-16 ${i > 0 ? "lg:-mt-8" : ""}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease }}
                >
                  {/* Timeline node — center */}
                  <div className="hidden lg:flex absolute left-1/2 top-8 -translate-x-1/2 z-10">
                    <motion.div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${i < 3 ? "bg-green text-white" : "bg-orange text-white"}`}
                      initial={{ scale: 0 }}
                      animate={inView ? { scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 + i * 0.15, type: "spring", stiffness: 200 }}
                    >
                      <span className="font-display font-bold text-lg">{i + 1}</span>
                    </motion.div>
                  </div>

                  {/* Content card */}
                  <div className={`${isLeft ? "lg:pr-20" : "lg:col-start-2 lg:pl-20"}`}>
                    <div className={`group relative p-6 rounded-2xl border bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.08)] transition-all duration-500 ${i < 3 ? "border-green/20 hover:border-green/40" : "border-orange/20 hover:border-orange/40"}`}>
                      {/* Accent bar */}                      
                      {/* Mobile phase indicator */}
                      <div className="lg:hidden flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${i < 3 ? "bg-green text-white" : "bg-orange text-white"}`}>
                          <span className="font-bold">{i + 1}</span>
                        </div>
                        <span className="text-xs text-muted uppercase tracking-widest font-medium">{step.phase}</span>
                      </div>

                      {/* Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${i < 3 ? "bg-green-light/60 text-green group-hover:bg-green group-hover:text-white" : "bg-orange-light/60 text-orange group-hover:bg-orange group-hover:text-white"} transition-all duration-300`}>
                          {phaseIcons[i]}
                        </div>
                        <div>
                          <div className="hidden lg:block text-[10px] text-muted uppercase tracking-widest font-medium mb-1">{step.phase}</div>
                          <h3 className="text-lg font-bold text-forest">{step.title}</h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-muted text-sm leading-relaxed pl-0 lg:pl-16">{step.description}</p>

                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  {isLeft && <div className="hidden lg:block" />}
                </motion.div>
              );
            })}
          </div>


        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FINAL CTA
   ================================================================ */

function ProductCTA() {
  const { t, locale } = useDictionary();
  const cta = t.product.cta;

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
      </div>
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />
      <div className="absolute top-[38%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="relative z-10 flex flex-col items-center px-6 py-24 md:py-32">
        <FadeIn>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-[1.1]">
              {cta.title1}{" "}
              <span className="italic text-green-muted">{cta.titleAccent}</span>
            </h2>
            <p className="text-lg text-white/50 max-w-xl mx-auto mb-12 leading-relaxed">{cta.subtitle}</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href={`/${locale}/essai-gratuit`} className="group bg-white text-forest font-semibold px-10 py-4 rounded-full hover:bg-green-light transition-all text-sm shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
                {cta.cta1}<span className="ml-2 inline-block group-hover:translate-x-0.5 transition-transform">→</span>
              </Link>
              <Link href={`/${locale}/demo`} className="border border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-10 py-4 rounded-full transition-all text-sm">
                {cta.cta2}
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ================================================================
   MAIN PAGE EXPORT
   ================================================================ */

export default function ProductPage() {
  return (
    <>
      <ProductHero />
      <FeatureShowcase />
      <RoadmapSection />
      <ProductCTA />
    </>
  );
}
