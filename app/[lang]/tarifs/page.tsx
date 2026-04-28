"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import Link from "next/link";
import { useDictionary } from "../dictionary-provider";

/* ================================================================
   CONSTANTS
   ================================================================ */

const ease = [0.22, 1, 0.36, 1] as const;

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
      transition={{ duration: 0.7, delay, ease }}
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
   TILT CARD — 3D perspective on hover
   ================================================================ */

function TiltCard({
  children,
  className = "",
  glowColor = "rgba(0,129,74,0.08)",
  disabled = false,
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [4, -4]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-4, 4]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX: disabled ? 0 : rotateX,
        rotateY: disabled ? 0 : rotateY,
        transformStyle: "preserve-3d",
        boxShadow: `0 20px 60px ${glowColor}`,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================
   FAQ ACCORDION
   ================================================================ */

function FAQItem({ q, a, index }: { q: string; a: string; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <FadeIn delay={index * 0.06}>
      <div className={`border-b border-line/80 transition-colors duration-300 ${open ? "bg-green-light/20" : ""}`}>
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-6 px-6 md:px-8 text-left group cursor-pointer">
          <span className="text-base font-semibold text-ink pr-8 group-hover:text-green transition-colors">{q}</span>
          <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3, ease }} className="text-2xl text-green shrink-0 leading-none">+</motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4, ease }} className="overflow-hidden">
              <p className="px-6 md:px-8 pb-6 text-muted leading-relaxed text-[15px]">{a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FadeIn>
  );
}

/* ================================================================
   ROI CALCULATOR
   ================================================================ */

function ROICalculator() {
  const { t, locale } = useDictionary();
  const [etp, setEtp] = useState(3);
  const [daysPerMonth, setDaysPerMonth] = useState(4);
  const savedDaysYear = etp * daysPerMonth * 11;
  const savedEuros = savedDaysYear * 450;
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease }} className="relative">
      <div className="absolute inset-0 rounded-3xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-light/40 via-white to-orange-light/30" />
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, #1B3A2D 0.8px, transparent 0.8px)", backgroundSize: "20px 20px" }} />
      </div>

      <div className="relative rounded-3xl border border-line/60 p-8 md:p-12">
        <div className="text-center mb-10">
          <span className="text-sm font-semibold tracking-widest uppercase text-orange">{t.pricing.roi.eyebrow}</span>
          <h3 className="font-display text-3xl md:text-4xl text-forest mt-3 leading-tight">
            {t.pricing.roi.title} <span className="italic text-green">{t.pricing.roi.titleHighlight}</span> ?
          </h3>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="space-y-8">
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <label className="text-sm font-medium text-ink">{t.pricing.roi.etpLabel}</label>
                <span className="text-lg font-display font-semibold text-forest">{etp}</span>
              </div>
              <input type="range" min={1} max={15} value={etp} onChange={(e) => setEtp(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer bg-line accent-green [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(0,129,74,0.3)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white" />
              <div className="flex justify-between text-xs text-muted mt-1"><span>1</span><span>15</span></div>
            </div>
            <div>
              <div className="flex justify-between items-baseline mb-3">
                <label className="text-sm font-medium text-ink">{t.pricing.roi.daysLabel}</label>
                <span className="text-lg font-display font-semibold text-forest">{daysPerMonth}</span>
              </div>
              <input type="range" min={1} max={15} value={daysPerMonth} onChange={(e) => setDaysPerMonth(Number(e.target.value))} className="w-full h-2 rounded-full appearance-none cursor-pointer bg-line accent-green [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green [&::-webkit-slider-thumb]:shadow-[0_2px_8px_rgba(0,129,74,0.3)] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white" />
              <div className="flex justify-between text-xs text-muted mt-1"><span>1</span><span>15</span></div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-line p-6 shadow-sm">
              <div className="text-sm text-muted mb-1">{t.pricing.roi.savedDays}</div>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-display text-forest font-semibold">{savedDaysYear}</span>
                <span className="text-lg text-muted">{t.pricing.roi.daysUnit}</span>
              </div>
              <div className="mt-3 h-2 rounded-full bg-line overflow-hidden">
                <motion.div className="h-full rounded-full bg-gradient-to-r from-green to-green/60" animate={{ width: `${Math.min((savedDaysYear / 200) * 100, 100)}%` }} transition={{ duration: 0.5, ease }} />
              </div>
            </div>

            <div className="bg-forest rounded-2xl p-6 relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-green/20 rounded-full blur-2xl" />
              <div className="relative">
                <div className="text-sm text-white/60 mb-1">{t.pricing.roi.savedMoney}</div>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-display text-white font-semibold">{savedEuros.toLocaleString(locale === "fr" ? "fr-FR" : "en-GB")}</span>
                  <span className="text-lg text-white/60">€</span>
                </div>
                <p className="text-xs text-white/40 mt-2">{t.pricing.roi.moneyNote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================
   FEATURE CHECK — comparison table cell
   ================================================================ */

function FeatureCheck({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-green/10">
        <svg className="w-3.5 h-3.5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-sand">
        <span className="w-2.5 h-[1.5px] bg-line-dark/40 rounded-full" />
      </span>
    );
  }
  if (value === "Limité" || value === "Limited" || value === "basic") {
    return <span className="text-[11px] font-semibold text-orange px-1.5 py-0.5 rounded-full bg-orange-light/70 whitespace-nowrap">{value}</span>;
  }
  if (value === "Bientôt" || value === "Soon") {
    return <span className="text-[11px] font-semibold text-green px-1.5 py-0.5 rounded-full bg-green-light/70 whitespace-nowrap">{value}</span>;
  }
  return <span className="text-[11px] font-medium text-ink-light text-center">{value}</span>;
}

/* ================================================================
   PLAN CARD
   ================================================================ */

type Plan = {
  name: string;
  tagline: string;
  disclaimer: string | null;
  price: string;
  priceSuffix: string;
  priceNote: string;
  annualPrice: string;
  annualPriceSuffix: string;
  annualPriceNote: string;
  users: string;
  cta: string;
  comingSoon: boolean;
  features: string[];
};

function PlanCard({
  plan,
  index,
  billing,
  ctaHref,
  locale,
  popularBadge,
  comingSoonBadge,
}: {
  plan: Plan;
  index: number;
  billing: "monthly" | "annual";
  ctaHref: string;
  locale: string;
  popularBadge: string;
  comingSoonBadge: string;
}) {
  const isRecommended = index === 1;
  const isComingSoon = plan.comingSoon;
  const isEnterprise = index === 3;

  const displayPrice = billing === "annual" ? plan.annualPrice : plan.price;
  const displaySuffix = billing === "annual" ? plan.annualPriceSuffix : plan.priceSuffix;
  const displayNote = billing === "annual" ? plan.annualPriceNote : plan.priceNote;

  const glowColor = isRecommended
    ? "rgba(0,129,74,0.15)"
    : isComingSoon
    ? "rgba(232,117,42,0.10)"
    : "rgba(27,58,45,0.05)";

  const borderClass = isRecommended
    ? "border-2 border-green"
    : isComingSoon
    ? "border-2 border-orange/40 border-dashed"
    : "border border-line";

  const bgClass = isComingSoon ? "bg-white/80" : "bg-white";

  return (
    <TiltCard
      glowColor={glowColor}
      disabled={isComingSoon}
      className={`relative rounded-2xl overflow-hidden transition-all duration-500 h-full ${borderClass} ${bgClass}`}
    >
      {/* Top badge */}
      {isRecommended && (
        <div className="bg-green text-white text-xs font-semibold text-center py-2 tracking-wider uppercase">
          {popularBadge}
        </div>
      )}
      {isComingSoon && (
        <div className="bg-orange/10 text-orange text-xs font-semibold text-center py-2 tracking-wider uppercase border-b border-orange/20">
          {comingSoonBadge}
        </div>
      )}

      <div className={`p-7 md:p-8 flex flex-col h-full ${isComingSoon ? "opacity-85" : ""}`}>
        {/* Header */}
        <div className="mb-5">
          <h3 className={`font-display text-xl mb-1 ${isRecommended ? "text-forest" : isComingSoon ? "text-ink" : "text-forest"}`}>
            {plan.name}
          </h3>
          <p className="text-sm text-muted">{plan.tagline}</p>
        </div>

        {/* Users badge */}
        <div className="mb-5">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-light bg-sand rounded-full px-3 py-1.5 border border-line/60">
            <svg className="w-3 h-3 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" /></svg>
            {plan.users}
          </span>
        </div>

        {/* Price */}
        <div className="mb-6">
          {isComingSoon ? (
            <div className="py-2">
              <div className="text-2xl font-display font-semibold text-orange">{displayPrice}</div>
              <p className="text-xs text-muted mt-1">{displayNote}</p>
            </div>
          ) : (
            <div>
              <div className="flex items-baseline gap-1 flex-wrap">
                <span className={`font-display text-4xl font-semibold ${isRecommended ? "text-forest" : "text-forest"}`}>
                  {displayPrice}
                </span>
                {displaySuffix && (
                  <span className="text-sm text-muted leading-tight">{displaySuffix}</span>
                )}
              </div>
              <p className={`text-xs mt-1.5 ${isRecommended ? "text-green font-medium" : "text-muted"}`}>
                {displayNote}
              </p>
              {/* Annual savings indicator for Starter */}
              {isRecommended && billing === "annual" && (
                <div className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-green bg-green-light/50 rounded-full px-2.5 py-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33" /></svg>
                  {locale === "fr" ? "Économie : 48 €/an" : "Save €48/year"}
                </div>
              )}
            </div>
          )}
        </div>

        {/* CTA */}
        {isComingSoon ? (
          <Link
            href={`/${locale}/contact`}
            className="block text-center font-medium text-sm py-3.5 rounded-full transition-all duration-300 mb-6 border-2 border-orange/30 text-orange hover:border-orange hover:bg-orange/5"
          >
            {plan.cta}
          </Link>
        ) : (
          <Link
            href={`/${locale}${ctaHref}`}
            className={`block text-center font-medium text-sm py-3.5 rounded-full transition-all duration-300 mb-6 ${
              isRecommended
                ? "bg-green text-white shadow-[0_4px_20px_rgba(0,129,74,0.25)] hover:bg-forest hover:shadow-[0_8px_30px_rgba(0,129,74,0.35)]"
                : isEnterprise
                ? "bg-forest text-white hover:bg-forest/80"
                : "border-2 border-green/20 text-ink hover:border-green hover:text-green hover:shadow-[0_4px_16px_rgba(0,129,74,0.08)]"
            }`}
          >
            {plan.cta}
          </Link>
        )}

        {/* Features */}
        <div className="space-y-2.5 flex-1">
          {plan.features.map((feature: string, fi: number) => (
            <div key={fi} className="flex items-start gap-2.5 text-sm text-ink-light">
              <svg className={`w-4 h-4 shrink-0 mt-0.5 ${isComingSoon ? "text-orange/60" : "text-green"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        {plan.disclaimer && (
          <div className={`mt-5 pt-4 border-t ${isComingSoon ? "border-orange/20" : "border-line/60"}`}>
            <p className={`text-xs leading-relaxed ${isComingSoon ? "text-orange/70" : "text-muted/80"}`}>
              <svg className="w-3 h-3 inline mr-1 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {plan.disclaimer}
            </p>
          </div>
        )}
      </div>
    </TiltCard>
  );
}

/* ================================================================
   MAIN PAGE
   ================================================================ */

export default function TarifsPage() {
  const { t, locale } = useDictionary();
  const [billing, setBilling] = useState<"monthly" | "annual">("monthly");

  const plans: Plan[] = t.pricing.plans;
  const comparisonCategories = t.pricing.comparison.categories;
  const faqs = t.pricing.faq.items;
  const ctaHrefs = ["/essai-gratuit", "/demo", "/contact", "/contact"];

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <svg className="absolute -right-[15%] -top-[10%] w-[80%] h-[120%] opacity-[0.05]" viewBox="0 0 800 800" fill="none">
            <circle cx="400" cy="400" r="380" stroke="#1B3A2D" strokeWidth="1.2" />
            <circle cx="400" cy="400" r="300" stroke="#1B3A2D" strokeWidth="0.8" />
            <circle cx="400" cy="400" r="220" stroke="#1B3A2D" strokeWidth="0.5" />
          </svg>
          <div className="absolute -top-[200px] -right-[200px] w-[700px] h-[700px] rounded-full bg-green/[0.05]" />
          <div className="absolute bottom-0 -left-[100px] w-[400px] h-[400px] rounded-full bg-orange/[0.05]" />
          <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-orange/[0.04] via-orange/[0.02] to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-green bg-green-light/50 border border-green/10 px-5 py-2 rounded-full shadow-[0_2px_8px_rgba(0,129,74,0.06)]">
              <span className="w-1.5 h-1.5 bg-green rounded-full animate-pulse" />
              {t.pricing.hero.eyebrow}
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-forest text-center max-w-4xl mx-auto">
            {t.pricing.hero.title1}{" "}<span className="italic text-green">{t.pricing.hero.titleHighlight}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12, ease }} className="text-lg md:text-xl text-muted max-w-2xl mx-auto text-center mt-7 leading-relaxed">
            {t.pricing.hero.subtitle1}<br className="hidden md:block" />{t.pricing.hero.subtitle2}
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.24, ease }} className="flex flex-wrap justify-center gap-3 mt-8">
            {[t.common.noCreditCard, t.common.noCommitment, t.common.hostedInFrance, t.common.gdprCompliant].map((badge) => (
              <span key={badge} className="text-xs text-muted px-3.5 py-1.5 rounded-full border border-line bg-white/80">{badge}</span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── BILLING TOGGLE + DEPLOYMENT PHASE ─────────────── */}
      <section className="pb-4">
        <div className="max-w-7xl mx-auto px-6">
          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease }}
            className="flex justify-center mb-8"
          >
            <div className="flex items-center gap-1 bg-sand rounded-full p-1 border border-line shadow-sm">
              <button
                onClick={() => setBilling("monthly")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${billing === "monthly" ? "bg-white text-forest shadow-sm" : "text-muted hover:text-ink"}`}
              >
                {t.pricing.billingToggle.monthly}
              </button>
              <button
                onClick={() => setBilling("annual")}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${billing === "annual" ? "bg-white text-forest shadow-sm" : "text-muted hover:text-ink"}`}
              >
                {t.pricing.billingToggle.annual}
                <span className="text-xs font-semibold text-green bg-green-light/70 px-2 py-0.5 rounded-full border border-green/10">
                  {t.pricing.billingToggle.save}
                </span>
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ─── PRICING CARDS ─────────────────────────────────── */}
      <section className="pb-24 md:pb-36">
        <div className="max-w-7xl mx-auto px-6">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6 items-start"
            style={{ perspective: "1200px" }}
          >
            {plans.map((plan: Plan, i: number) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 48, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease }}
                className={i === 1 ? "xl:-mt-4" : ""}
              >
                <PlanCard
                  plan={plan}
                  index={i}
                  billing={billing}
                  ctaHref={ctaHrefs[i]}
                  locale={locale}
                  popularBadge={t.pricing.popularBadge}
                  comingSoonBadge={t.pricing.comingSoonBadge}
                />
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── STATS STRIP ───────────────────────────────────── */}
      <section className="bg-forest py-20 md:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green/5 rounded-full blur-2xl" />
        <div className="relative max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="text-sm font-semibold tracking-widest uppercase text-green-muted">{t.pricing.stats.eyebrow}</span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] mt-4">
                {t.pricing.stats.title1}{" "}<span className="italic text-green-muted">{t.pricing.stats.titleHighlight}</span>
              </h2>
            </div>
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 gap-x-8">
            {t.pricing.stats.items.map((stat: { value: number; suffix: string; label: string }, i: number) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-5xl md:text-6xl font-display text-white mb-2"><CountUp target={stat.value} suffix={stat.suffix} /></div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURE COMPARISON ────────────────────────────── */}
      <section className="py-24 md:py-36">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold tracking-widest uppercase text-orange">{t.pricing.comparison.eyebrow}</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-forest leading-tight mt-4">{t.pricing.comparison.title}</h2>
              <p className="text-muted leading-relaxed text-base mt-4 max-w-2xl mx-auto">{t.pricing.comparison.description}</p>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="rounded-2xl border border-line overflow-hidden bg-white">
              {/* Scrollable wrapper on mobile */}
              <div className="overflow-x-auto">
                <div className="min-w-[680px]">
                  {/* Header */}
                  <div className="grid grid-cols-[1fr_90px_90px_90px_90px] md:grid-cols-[1fr_130px_130px_130px_130px] items-center bg-sand/50 border-b border-line">
                    <div className="px-6 py-5 text-sm font-semibold text-ink">{t.pricing.comparison.featureCol}</div>
                    <div className="px-3 py-5 text-xs font-semibold text-muted text-center">{t.pricing.comparison.freemiumCol}</div>
                    <div className="px-3 py-5 text-xs font-semibold text-green text-center">{t.pricing.comparison.starterCol}</div>
                    <div className="px-3 py-5 text-xs font-semibold text-orange text-center">{t.pricing.comparison.proCol}</div>
                    <div className="px-3 py-5 text-xs font-semibold text-forest text-center">{t.pricing.comparison.enterpriseCol}</div>
                  </div>

                  {/* Rows */}
                  {comparisonCategories.map((category: { category: string; items: { name: string; freemium: boolean | string; starter: boolean | string; pro: boolean | string; enterprise: boolean | string }[] }) => (
                    <div key={category.category}>
                      <div className="px-6 py-3.5 bg-green-light/20 border-b border-line">
                        <span className="text-xs font-semibold tracking-wider uppercase text-forest/70">{category.category}</span>
                      </div>
                      {category.items.map((item, idx) => (
                        <div
                          key={item.name}
                          className={`grid grid-cols-[1fr_90px_90px_90px_90px] md:grid-cols-[1fr_130px_130px_130px_130px] items-center ${idx < category.items.length - 1 ? "border-b border-line/50" : "border-b border-line"} hover:bg-sand/30 transition-colors`}
                        >
                          <div className="px-6 py-4 text-sm text-ink-light">{item.name}</div>
                          <div className="px-3 py-4 flex justify-center"><FeatureCheck value={item.freemium} /></div>
                          <div className="px-3 py-4 flex justify-center"><FeatureCheck value={item.starter} /></div>
                          <div className="px-3 py-4 flex justify-center"><FeatureCheck value={item.pro} /></div>
                          <div className="px-3 py-4 flex justify-center"><FeatureCheck value={item.enterprise} /></div>
                        </div>
                      ))}
                    </div>
                  ))}

                  {/* Footer CTAs */}
                  <div className="grid grid-cols-[1fr_90px_90px_90px_90px] md:grid-cols-[1fr_130px_130px_130px_130px] items-center bg-sand/30 border-t border-line">
                    <div className="px-6 py-5" />
                    <div className="px-3 py-4 flex justify-center">
                      <Link href={`/${locale}/essai-gratuit`} className="text-[11px] font-semibold px-3 py-1.5 rounded-full border border-line text-ink hover:border-green hover:text-green transition-all whitespace-nowrap">{t.pricing.comparison.startCta}</Link>
                    </div>
                    <div className="px-3 py-4 flex justify-center">
                      <Link href={`/${locale}/demo`} className="text-[11px] font-semibold px-3 py-1.5 rounded-full bg-green text-white hover:bg-forest transition-all shadow-sm whitespace-nowrap">{t.pricing.comparison.starterCta}</Link>
                    </div>
                    <div className="px-3 py-4 flex justify-center">
                      <Link href={`/${locale}/contact`} className="text-[11px] font-semibold px-3 py-1.5 rounded-full border border-orange/40 text-orange hover:border-orange hover:bg-orange/5 transition-all whitespace-nowrap">{t.pricing.comparison.notifyCta}</Link>
                    </div>
                    <div className="px-3 py-4 flex justify-center">
                      <Link href={`/${locale}/contact`} className="text-[11px] font-semibold px-3 py-1.5 rounded-full border border-forest/20 text-forest hover:border-forest hover:bg-forest/5 transition-all whitespace-nowrap">{t.pricing.comparison.contactCta}</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── ROI CALCULATOR ────────────────────────────────── */}
      <section className="pb-24 md:pb-36">
        <div className="max-w-5xl mx-auto px-6">
          <ROICalculator />
        </div>
      </section>

      {/* ─── GUARANTEE STRIP ───────────────────────────────── */}
      <section className="py-16 md:py-20 bg-sand/40">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <div className="grid md:grid-cols-3 gap-10 md:gap-14">
              {t.pricing.guarantees.map((item: { title: string; desc: string }, i: number) => {
                const icons = [
                  <svg key="0" className="w-6 h-6 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>,
                  <svg key="1" className="w-6 h-6 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" /></svg>,
                  <svg key="2" className="w-6 h-6 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>,
                ];
                return (
                  <FadeIn key={i} delay={i * 0.1}>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 shrink-0 rounded-xl bg-green-light/50 flex items-center justify-center">{icons[i]}</div>
                      <div>
                        <h3 className="text-base font-semibold text-ink mb-1.5">{item.title}</h3>
                        <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </FadeIn>
                );
              })}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── FAQ ───────────────────────────────────────────── */}
      <section className="py-24 md:py-36">
        <div className="max-w-3xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold tracking-widest uppercase text-orange">{t.pricing.faq.eyebrow}</span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-forest leading-tight mt-4">{t.pricing.faq.title}</h2>
            </div>
          </FadeIn>
          <div className="rounded-2xl border border-line overflow-hidden bg-white">
            {faqs.map((faq: { q: string; a: string }, i: number) => (
              <FAQItem key={i} q={faq.q} a={faq.a} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────── */}
      <section className="my-12 md:my-20 mx-4 md:mx-8 lg:mx-12">
        <div className="relative rounded-3xl bg-forest overflow-hidden">
          <div className="absolute inset-0 rotate-[12deg] scale-150 opacity-[0.07]" style={{ background: "linear-gradient(135deg, transparent 40%, #00814A 40%, #00814A 45%, transparent 45%)" }} />
          <div className="absolute inset-0 -rotate-[8deg] scale-150 opacity-[0.05]" style={{ background: "linear-gradient(135deg, transparent 55%, #E8752A 55%, #E8752A 60%, transparent 60%)" }} />
          <div className="absolute top-0 right-0 w-96 h-96 bg-green/12 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-orange/8 rounded-full blur-[100px]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")' }} />

          <div className="relative z-10 py-20 md:py-28 px-6 text-center">
            <FadeIn>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1] max-w-3xl mx-auto">
                {t.pricing.finalCta.title1}{" "}<span className="italic text-green-muted">{t.pricing.finalCta.titleHighlight}</span> ?
              </h2>
              <p className="text-lg text-white/50 max-w-xl mx-auto mt-6 leading-relaxed">{t.pricing.finalCta.description}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                <Link href={`/${locale}/essai-gratuit`} className="group bg-white text-forest font-semibold px-10 py-4 rounded-full hover:bg-green-light transition-all text-sm shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
                  {t.common.freeTrial}<span className="ml-2 inline-block group-hover:translate-x-0.5 transition-transform">→</span>
                </Link>
                <Link href={`/${locale}/demo`} className="border border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-10 py-4 rounded-full transition-all text-sm">
                  {t.common.requestDemo}
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
