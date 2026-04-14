"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useDictionary } from "../dictionary-provider";

/* ================================================================
   DESIGN TOKENS
   ================================================================ */

const ease = [0.22, 1, 0.36, 1] as const;

/* eslint-disable @typescript-eslint/no-explicit-any */

/* ================================================================
   UTILITY — FadeIn (conforme design system)
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
   UTILITY — CountUp (conforme design system)
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
   ICONS — Custom SVG icons
   ================================================================ */

function CabinetIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 9h18" />
      <rect x="6" y="12" width="5" height="3" rx="0.5" fill="currentColor" fillOpacity="0.15" stroke="none" />
      <rect x="13" y="12" width="5" height="3" rx="0.5" fill="currentColor" fillOpacity="0.15" stroke="none" />
    </svg>
  );
}

function PMEIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 20V8l8-4 8 4v12" />
      <rect x="9" y="12" width="6" height="8" rx="0.5" />
      <path d="M12 20v-4" />
    </svg>
  );
}

function ETIIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="8" y="2" width="8" height="6" rx="1" />
      <rect x="2" y="12" width="7" height="10" rx="1" />
      <rect x="15" y="12" width="7" height="10" rx="1" />
      <path d="M12 8v4M5.5 12V10a1 1 0 011-1h11a1 1 0 011 1v2" />
    </svg>
  );
}

type IconComponent = React.FC<{ className?: string }>;
const iconMap: Record<string, IconComponent> = { cabinet: CabinetIcon, pme: PMEIcon, eti: ETIIcon };

/* ================================================================
   HERO SECTION — Conforme au style Hero du design system
   ================================================================ */

function HeroSection({ 
  activePersona, 
  setActivePersona 
}: { 
  activePersona: number; 
  setActivePersona: (idx: number) => void;
}) {
  const { t } = useDictionary();
  const solutions = t.solutions as any;
  if (!solutions?.hero) return null;
  const { hero, personas } = solutions;

  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
      {/* ─ Background layers (design system pattern) ─ */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `linear-gradient(var(--color-forest) 1px, transparent 1px), linear-gradient(90deg, var(--color-forest) 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
        {/* Dot noise */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle, var(--color-forest) 0.8px, transparent 0.8px)`,
            backgroundSize: "20px 20px",
          }}
        />
        {/* Orbe green-light */}
        <div className="absolute -top-40 right-0 w-[700px] h-[700px] rounded-full bg-green-light/50 blur-[140px]" />
        {/* Orbe orange-light */}
        <div className="absolute top-1/2 -left-40 w-[500px] h-[500px] rounded-full bg-orange-light/30 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 pt-24 pb-20 md:pt-36 md:pb-32">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease }}
          className="text-sm font-semibold tracking-widest uppercase text-orange mb-4"
        >
          {hero.eyebrow}
        </motion.p>

        {/* Title H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-forest max-w-4xl"
        >
          {hero.title1}{" "}
          <span className="italic text-green">{hero.titleAccent}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="mt-7 text-lg md:text-xl text-muted max-w-2xl leading-relaxed"
        >
          {hero.subtitle}
        </motion.p>

        {/* Persona cards */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
          className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl"
        >
          {personas?.map((persona: any, idx: number) => {
            const Icon = iconMap[persona.icon] || CabinetIcon;
            const isActive = idx === activePersona;
            return (
              <motion.button
                key={persona.tag}
                onClick={() => setActivePersona(idx)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={`relative group text-left px-6 py-5 rounded-xl border transition-all duration-300 ${
                  isActive
                    ? "bg-white border-green/20 shadow-[0_2px_12px_rgba(0,129,74,0.08)]"
                    : "bg-white/60 border-line hover:border-green/15 hover:bg-sand/40"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                      isActive
                        ? "bg-green text-white"
                        : "bg-green-light text-green group-hover:bg-green/20"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div
                      className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide mb-2 transition-colors ${
                        isActive
                          ? "bg-green/10 text-green"
                          : "bg-forest/5 text-forest"
                      }`}
                    >
                      {persona.tag}
                    </div>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span
                        className={`text-2xl font-display font-semibold transition-colors ${
                          isActive ? "text-green" : "text-forest"
                        }`}
                      >
                        {persona.stat}
                      </span>
                      <span className="text-sm text-muted">{persona.statLabel}</span>
                    </div>
                  </div>
                </div>
                {isActive && (
                  <motion.div
                    layoutId="personaIndicator"
                    className="absolute -bottom-0.5 left-6 right-6 h-0.5 bg-green rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Scroll indicator */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-10 text-sm text-muted flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
          {hero.scroll}
        </motion.p>
      </div>
    </section>
  );
}

/* ================================================================
   STICKY NAV
   ================================================================ */

function StickyNav({ 
  activePersona, 
  setActivePersona 
}: { 
  activePersona: number; 
  setActivePersona: (idx: number) => void;
}) {
  const { t } = useDictionary();
  const solutions = t.solutions as any;
  const personas = solutions?.personas || [];
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const segments = ["cabinets", "pme", "eti"];

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3, ease }}
          className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-xl border-b border-line shadow-sm"
        >
          <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-1">
              {personas.map((persona: any, idx: number) => (
                <button
                  key={persona.tag}
                  onClick={() => {
                    setActivePersona(idx);
                    const el = document.getElementById(segments[idx]);
                    if (el) el.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activePersona === idx
                      ? "bg-green text-white"
                      : "text-forest hover:bg-green-light"
                  }`}
                >
                  {persona.shortTitle || persona.tag}
                </button>
              ))}
            </div>
            <Link
              href="/contact"
              className="hidden sm:inline-flex items-center px-5 py-2 bg-green text-white text-sm font-medium rounded-full hover:bg-forest transition-all duration-300"
            >
              Demander une démo
            </Link>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}

/* ================================================================
   PAIN CARD — Flip card component
   ================================================================ */

function PainCard({ 
  pain, 
  index,
  variant = "dark"
}: { 
  pain: { before: string; after: string; detail: string }; 
  index: number;
  variant?: "dark" | "light";
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <FadeIn delay={index * 0.08}>
      <div
        className="relative h-56 cursor-pointer group"
        onClick={() => setIsFlipped(!isFlipped)}
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        style={{ perspective: "1000px" }}
      >
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front - Problem */}
          <div
            className={`absolute inset-0 rounded-xl p-5 flex flex-col justify-between ${
              variant === "dark"
                ? "bg-white/10 backdrop-blur-sm border border-white/20"
                : "bg-white border border-line"
            }`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <p className={`font-medium leading-snug text-sm ${variant === "dark" ? "text-white/90" : "text-ink"}`}>
              {pain.before}
            </p>
            <div className={`flex items-center gap-1 text-xs ${variant === "dark" ? "text-white/50" : "text-muted"}`}>
              <span>Survoler pour la solution</span>
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </div>

          {/* Back - Solution */}
          <div
            className="absolute inset-0 rounded-xl bg-green p-5 flex flex-col justify-between"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white font-semibold leading-snug text-sm">{pain.after}</p>
            <p className="text-white/70 text-xs leading-relaxed line-clamp-3">{pain.detail}</p>
          </div>
        </motion.div>
      </div>
    </FadeIn>
  );
}

/* ================================================================
   METRIC STRIP — Stats section
   ================================================================ */

function MetricStrip({ 
  metrics, 
  variant = "dark" 
}: { 
  metrics: { value: number; suffix: string; label: string }[]; 
  variant?: "dark" | "light";
}) {
  return (
    <div className={`py-20 md:py-28 ${variant === "dark" ? "bg-forest" : "bg-green-light/50"}`}>
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
        {metrics.map((m: any, i: number) => (
          <FadeIn key={i} delay={i * 0.1} className="text-center">
            <div
              className={`font-display text-4xl md:text-5xl font-bold ${
                variant === "dark" ? "text-white" : "text-green"
              }`}
            >
              <CountUp target={m.value} suffix={m.suffix} />
            </div>
            <p
              className={`mt-2 text-sm ${
                variant === "dark" ? "text-white/70" : "text-muted"
              }`}
            >
              {m.label}
            </p>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   ARCHITECTURE VISUAL
   ================================================================ */

function ArchitectureVisual({ labels }: { labels: string[] }) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur-md p-8 md:p-10">
        {/* Central hub */}
        <div className="relative flex items-center justify-center mb-8">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green to-forest flex items-center justify-center shadow-xl"
          >
            <span className="text-white font-display font-bold">Yumni</span>
          </motion.div>
        </div>
        {/* Labels grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {labels.map((label, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.08}>
              <div className="bg-white/5 rounded-xl px-4 py-3 text-center border border-white/10">
                <span className="text-sm text-white/80">{label}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   DASHBOARD MOCK — Mini preview
   ================================================================ */

function DashboardMock() {
  return (
    <div className="relative rounded-2xl overflow-hidden shadow-[0_12px_80px_rgba(27,58,45,0.14),0_2px_8px_rgba(0,0,0,0.04)] border border-line/70 ring-1 ring-green/[0.04]">
      <div className="bg-gradient-to-br from-forest to-green p-0.5">
        <div className="bg-white rounded-xl overflow-hidden">
          {/* Window bar */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-sand/50">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-300/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-yellow-300/60" />
              <span className="w-2.5 h-2.5 rounded-full bg-green-300/60" />
            </div>
            <div className="flex-1 mx-8">
              <div className="bg-white rounded-md px-3 py-1 text-[11px] text-muted tracking-wide text-center">
                app.yumni.fr/dashboard
              </div>
            </div>
          </div>
          {/* Dashboard content */}
          <div className="p-6 min-h-[280px] bg-green-light/20">
            {/* KPI cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { label: "Score RSE", value: "78%", trend: "+12%" },
                { label: "Actions", value: "24", trend: "+6" },
                { label: "Certificats", value: "3", trend: "→" },
              ].map((stat, i) => (
                <div key={i} className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-xs text-muted">{stat.label}</p>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-xl font-display font-bold text-forest">{stat.value}</span>
                    <span className="text-xs text-green">{stat.trend}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Actions list */}
            <div className="bg-white rounded-xl p-4 shadow-sm">
              <p className="text-sm font-medium text-forest mb-3">Actions recommandées</p>
              <div className="space-y-2">
                {["Compléter le bilan carbone Q2", "Former l'équipe RH aux pratiques RSE"].map((task, i) => (
                  <div key={i} className="flex items-center gap-3 bg-green-light/50 rounded-lg px-3 py-2">
                    <div className="w-5 h-5 rounded-full border-2 border-green" />
                    <span className="text-sm text-forest">{task}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   JOURNEY STEPS — PME section
   ================================================================ */

function JourneySteps({ steps }: { steps: string[] }) {
  return (
    <div className="relative">
      <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-green via-green/50 to-transparent" />
      <div className="space-y-6">
        {steps.map((step: string, idx: number) => (
          <FadeIn key={idx} delay={idx * 0.1}>
            <div className="relative flex items-center gap-5 pl-1">
              <div className="relative z-10 w-9 h-9 rounded-full bg-green text-white font-display font-bold text-sm flex items-center justify-center shadow-[0_4px_20px_rgba(0,129,74,0.25)]">
                {idx + 1}
              </div>
              <p className="flex-1 text-forest text-sm leading-relaxed">{step}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   SECURITY BADGES — ETI section
   ================================================================ */

function SecurityBadges({ badges }: { badges: { label: string; icon: string }[] }) {
  const iconMap: Record<string, React.ReactNode> = {
    shield: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    lock: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    flag: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
      </svg>
    ),
    check: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    database: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    encrypt: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
      </svg>
    ),
  };

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {badges.map((badge: any, idx: number) => (
        <FadeIn key={idx} delay={idx * 0.08}>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2.5 border border-white/20">
            <span className="text-green">{iconMap[badge.icon] || iconMap.check}</span>
            <span className="text-xs font-medium text-white">{badge.label}</span>
          </div>
        </FadeIn>
      ))}
    </div>
  );
}

/* ================================================================
   CABINETS SECTION
   ================================================================ */

function CabinetsSection() {
  const { t } = useDictionary();
  const solutions = t.solutions as any;
  const cabinets = solutions?.cabinets;
  if (!cabinets) return null;

  return (
    <section id="cabinets" className="relative bg-forest text-white overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>
      {/* Orbes */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] opacity-10 rounded-full bg-green blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] opacity-5 rounded-full bg-green blur-[80px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-36">
        {/* Numéro ghost */}
        <div className="absolute top-16 left-6 text-[5.5rem] md:text-[7rem] leading-none text-forest/[0.06] font-display font-bold pointer-events-none">
          {cabinets.num}
        </div>

        <div className="max-w-3xl">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-sm font-medium mb-6 border border-white/10">
              <CabinetIcon className="w-4 h-4" />
              {cabinets.eyebrow}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              {cabinets.title}{" "}
              <span className="italic text-green-muted">{cabinets.titleAccent}</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-4 text-lg text-white/70 leading-relaxed max-w-2xl">
              {cabinets.subtitle}
            </p>
          </FadeIn>
        </div>

        {/* Pain cards */}
        <div className="mt-16">
          <FadeIn delay={0.2}>
            <p className="text-sm font-semibold tracking-widest uppercase text-white/50 mb-6">
              Vos défis → Nos solutions
            </p>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {cabinets.pains.map((pain: any, idx: number) => (
              <PainCard key={idx} pain={pain} index={idx} variant="dark" />
            ))}
          </div>
        </div>

        {/* Metrics */}
        <div className="mt-20 -mx-6 px-6">
          <MetricStrip metrics={cabinets.metrics} variant="light" />
        </div>

        {/* Architecture + Key argument */}
        <div className="mt-20 grid lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase text-white/50 mb-4">
                {cabinets.archTitle}
              </p>
              <ArchitectureVisual labels={cabinets.archLabels} />
            </div>
          </FadeIn>
          <FadeIn delay={0.15}>
            <div className="bg-gradient-to-br from-green/20 to-transparent rounded-2xl p-8 border border-green/20">
              <div className="w-12 h-12 rounded-xl bg-green flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">L&apos;argument clé</h3>
              <p className="text-white/70 leading-relaxed">{cabinets.keyArgument}</p>
            </div>
          </FadeIn>
        </div>

        {/* CTAs */}
        <FadeIn delay={0.25}>
          <div className="mt-16 flex flex-wrap gap-4 justify-center lg:justify-start">
            <Link
              href="/contact"
              className="group inline-flex items-center px-10 py-4 bg-white text-forest font-semibold rounded-full text-sm shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:bg-green-light hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
            >
              {cabinets.cta1}
              <svg className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="/partenaires"
              className="inline-flex items-center px-10 py-4 bg-white/10 text-white font-semibold rounded-full text-sm hover:bg-white/20 hover:border-white/40 transition-all border border-white/20"
            >
              {cabinets.cta2}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ================================================================
   PME SECTION
   ================================================================ */

function PMESection() {
  const { t } = useDictionary();
  const solutions = t.solutions as any;
  const pme = solutions?.pme;
  if (!pme) return null;

  return (
    <section id="pme" className="relative bg-white overflow-hidden">
      {/* Background orbe */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            background: "radial-gradient(circle at 100% 0%, var(--color-orange) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-36">
        {/* Numéro ghost */}
        <div className="absolute top-16 left-6 text-[5.5rem] md:text-[7rem] leading-none text-orange/[0.06] font-display font-bold pointer-events-none">
          {pme.num}
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange/10 text-orange text-sm font-medium mb-6">
              <PMEIcon className="w-4 h-4" />
              {pme.eyebrow}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-forest leading-tight">
              {pme.title}{" "}
              <span className="italic text-orange">{pme.titleAccent}</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl mx-auto">
              {pme.subtitle}
            </p>
          </FadeIn>
        </div>

        {/* Two columns: Dashboard + Journey */}
        <div className="mt-20 grid lg:grid-cols-2 gap-16 items-start">
          <FadeIn>
            <DashboardMock />
          </FadeIn>
          <FadeIn delay={0.1}>
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase text-muted mb-6">
                Votre parcours RSE simplifié
              </p>
              <JourneySteps steps={pme.journey} />
              <div className="mt-10 p-6 rounded-2xl bg-gradient-to-br from-orange/10 to-orange/5 border border-orange/20">
                <p className="text-forest font-medium">{pme.priceHighlight}</p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Pain points grid */}
        <div className="mt-20">
          <FadeIn>
            <p className="text-sm font-semibold tracking-widest uppercase text-muted mb-6 text-center">
              On résout vos problèmes
            </p>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {pme.pains.map((pain: any, idx: number) => (
              <FadeIn key={idx} delay={idx * 0.05}>
                <div className="group relative bg-green-light/50 hover:bg-green rounded-xl p-4 text-center transition-all duration-300 cursor-default h-full">
                  <div className="w-8 h-8 mx-auto mb-2 rounded-lg bg-red-500/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 text-red-500 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <p className="text-xs text-forest group-hover:text-white transition-colors leading-tight font-medium">
                    {pain.before}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <FadeIn delay={0.2}>
          <div className="mt-16 flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center px-8 py-3.5 bg-orange text-white font-medium rounded-full text-sm shadow-[0_4px_20px_rgba(232,117,42,0.25)] hover:shadow-[0_8px_30px_rgba(232,117,42,0.35)] transition-all duration-300"
            >
              {pme.cta1}
              <svg className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="/tarifs"
              className="inline-flex items-center px-8 py-3.5 border-2 border-green/20 text-ink rounded-full text-sm hover:border-green hover:text-green transition-all duration-300"
            >
              {pme.cta2}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ================================================================
   ETI SECTION
   ================================================================ */

function ETISection() {
  const { t } = useDictionary();
  const solutions = t.solutions as any;
  const eti = solutions?.eti;
  if (!eti) return null;

  return (
    <section id="eti" className="relative bg-gradient-to-br from-forest via-forest to-[#0a1f17] text-white overflow-hidden">
      {/* Background orbes */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 right-0 w-[40vw] h-[40vw] opacity-20 rounded-full"
          style={{
            background: "radial-gradient(circle, var(--color-green) 0%, transparent 60%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-36">
        {/* Numéro ghost */}
        <div className="absolute top-16 left-6 text-[5.5rem] md:text-[7rem] leading-none text-green/[0.06] font-display font-bold pointer-events-none">
          {eti.num}
        </div>

        <div className="max-w-3xl">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green/20 text-green text-sm font-medium mb-6 border border-green/30">
              <ETIIcon className="w-4 h-4" />
              {eti.eyebrow}
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              {eti.title}{" "}
              <span className="italic text-green-muted">{eti.titleAccent}</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.15}>
            <p className="mt-4 text-lg text-white/70 leading-relaxed max-w-2xl">
              {eti.subtitle}
            </p>
          </FadeIn>
        </div>

        {/* Pain cards */}
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {eti.pains.map((pain: any, idx: number) => (
            <PainCard key={idx} pain={pain} index={idx} variant="dark" />
          ))}
        </div>

        {/* Security badges */}
        <div className="mt-16">
          <FadeIn>
            <p className="text-sm font-semibold tracking-widest uppercase text-white/50 mb-6 text-center">
              Conformité et sécurité
            </p>
          </FadeIn>
          <SecurityBadges badges={eti.securityBadges} />
        </div>

        {/* Architecture */}
        <div className="mt-20">
          <FadeIn>
            <p className="text-sm font-semibold tracking-widest uppercase text-white/50 mb-8 text-center">
              {eti.archTitle}
            </p>
          </FadeIn>
          <ArchitectureVisual labels={eti.archLabels} />
        </div>

        {/* CTAs */}
        <FadeIn delay={0.25}>
          <div className="mt-16 flex flex-wrap gap-4 justify-center">
            <Link
              href="/contact"
              className="group inline-flex items-center px-10 py-4 bg-white text-forest font-semibold rounded-full text-sm shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:bg-green-light transition-all duration-300"
            >
              {eti.cta1}
              <svg className="ml-2 w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-10 py-4 bg-white/10 text-white font-semibold rounded-full text-sm hover:bg-white/20 transition-all border border-white/20"
            >
              {eti.cta2}
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ================================================================
   COMPARISON SECTION
   ================================================================ */

function ComparisonSection() {
  const { t } = useDictionary();
  const solutions = t.solutions as any;
  const comparison = solutions?.comparison;
  if (!comparison) return null;

  return (
    <section className="bg-sand/40 py-24 md:py-36">
      <div className="max-w-5xl mx-auto px-6">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-forest leading-tight">
              {comparison.title}
            </h2>
          </div>
        </FadeIn>
        <FadeIn delay={0.15}>
          <div className="bg-white rounded-2xl shadow-[0_12px_80px_rgba(27,58,45,0.14),0_2px_8px_rgba(0,0,0,0.04)] overflow-hidden overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="bg-forest text-white">
                  {comparison.headers.map((h: string, i: number) => (
                    <th
                      key={i}
                      className={`p-4 text-sm font-semibold ${i === 0 ? "text-left" : "text-center"}`}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.features.map((row: any, idx: number) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 0 ? "bg-white" : "bg-green-light/30"}
                  >
                    <td className="p-4 text-sm text-forest font-medium">{row.name}</td>
                    {[row.cabinet, row.pme, row.eti].map((val: boolean, i: number) => (
                      <td key={i} className="p-4 text-center">
                        {val ? (
                          <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-green text-white">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                        ) : (
                          <span className="inline-flex w-6 h-6 items-center justify-center rounded-full bg-line text-muted">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ================================================================
   FINAL CTA SECTION — Design system compliant
   ================================================================ */

function FinalCTA() {
  const { t } = useDictionary();
  const solutions = t.solutions as any;
  const finalCta = solutions?.finalCta;
  if (!finalCta) return null;

  return (
    <section className="my-12 md:my-20 mx-4 md:mx-8 lg:mx-12">
      <div className="relative bg-forest rounded-3xl overflow-hidden">
        {/* Background decorative layers */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Diagonal slices */}
          <div
            className="absolute -top-20 -left-20 w-[60%] h-[200%] rotate-[12deg] opacity-[0.08]"
            style={{ background: "linear-gradient(180deg, var(--color-green) 0%, transparent 70%)" }}
          />
          <div
            className="absolute -bottom-20 -right-20 w-[50%] h-[200%] -rotate-[8deg] opacity-[0.06]"
            style={{ background: "linear-gradient(180deg, var(--color-orange) 0%, transparent 70%)" }}
          />
          {/* Orbe meshes */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-green/12 blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full bg-orange/8 blur-[100px]" />
          {/* Grain texture */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
          {/* Horizon line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
          {/* Corner arcs */}
          <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full border border-white/[0.04]" />
          <div className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full border border-white/[0.03]" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto text-center pt-24 md:pt-36 pb-16 md:pb-24 px-6">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
              {finalCta.title1}{" "}
              <span className="italic text-green-muted">{finalCta.titleAccent}</span>
              {finalCta.title2}
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-xl mx-auto">
              {finalCta.subtitle}
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="group inline-flex items-center px-10 py-4 bg-white text-forest font-semibold rounded-full text-sm shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:bg-green-light hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-300"
              >
                {finalCta.cta1}
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link
                href="/tarifs"
                className="inline-flex items-center px-10 py-4 border border-white/20 text-white font-semibold rounded-full text-sm hover:bg-white/10 hover:border-white/40 transition-all"
              >
                {finalCta.cta2}
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   MAIN PAGE EXPORT
   ================================================================ */

export default function SolutionsPage() {
  const [activePersona, setActivePersona] = useState(0);
  
  return (
    <>
      <StickyNav activePersona={activePersona} setActivePersona={setActivePersona} />
      <HeroSection activePersona={activePersona} setActivePersona={setActivePersona} />
      <CabinetsSection />
      <PMESection />
      <ETISection />
      <ComparisonSection />
      <FinalCTA />
    </>
  );
}
