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
}: {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 300,
    damping: 30,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 300,
    damping: 30,
  });

  function handleMouse(e: React.MouseEvent) {
    if (!ref.current) return;
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
        rotateX,
        rotateY,
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
   FEATURE CHECK
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
  return (
    <span className="text-xs font-medium text-orange px-2 py-0.5 rounded-full bg-orange-light">{value}</span>
  );
}

/* ================================================================
   MAIN PAGE
   ================================================================ */

export default function TarifsPage() {
  const { t, locale } = useDictionary();
  const plans = t.pricing.plans;
  const comparisonCategories = t.pricing.comparison.categories;
  const faqs = t.pricing.faq.items;
  const ctaHrefs = ["/essai-gratuit", "/contact", "/contact"];

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 overflow-hidden">
        {/* Background — matching homepage hero style */}
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
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-green bg-green-light/50 border border-green/10 px-5 py-2 rounded-full shadow-[0_2px_8px_rgba(0,129,74,0.06)]">
              <span className="w-1.5 h-1.5 bg-green rounded-full animate-pulse" />
              {t.pricing.hero.eyebrow}
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-forest text-center max-w-4xl mx-auto">
            {t.pricing.hero.title1}{" "}<span className="italic text-green">{t.pricing.hero.titleHighlight}</span><br className="hidden sm:block" />{t.pricing.hero.title2}
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

      {/* ─── PRICING CARDS ─────────────────────────────────── */}
      <section className="relative -mt-4 pb-24 md:pb-36">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start" style={{ perspective: "1200px" }}>
            {plans.map((plan: { name: string; tagline: string; price: string; priceSuffix: string; priceNote: string; cta: string; features: string[] }, i: number) => (
              <motion.div key={plan.name} initial={{ opacity: 0, y: 48, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 + i * 0.12, ease }}>
                <TiltCard glowColor={i === 1 ? "rgba(0,129,74,0.15)" : "rgba(27,58,45,0.06)"} className={`relative rounded-2xl overflow-hidden transition-all duration-500 ${i === 1 ? "border-2 border-green bg-white md:-mt-6 md:mb-6" : "border border-line bg-white"}`}>
                  {i === 1 && (
                    <div className="bg-green text-white text-xs font-semibold text-center py-2 tracking-wider uppercase">{t.pricing.popularBadge}</div>
                  )}
                  <div className="p-8 md:p-10">
                    <div className="mb-6">
                      <h3 className="font-display text-2xl text-forest mb-1">{plan.name}</h3>
                      <p className="text-sm text-muted">{plan.tagline}</p>
                    </div>
                    <div className="mb-8">
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-5xl text-forest">{plan.price}</span>
                        {plan.priceSuffix && <span className="text-muted text-lg">{plan.priceSuffix}</span>}
                      </div>
                      <p className="text-xs text-muted mt-1">{plan.priceNote}</p>
                    </div>
                    <Link href={`/${locale}${ctaHrefs[i]}`} className={`block text-center font-medium text-sm py-3.5 rounded-full transition-all duration-300 mb-8 ${i === 1 ? "bg-green text-white shadow-[0_4px_20px_rgba(0,129,74,0.25)] hover:bg-forest hover:shadow-[0_8px_30px_rgba(0,129,74,0.35)]" : "border-2 border-green/20 text-ink hover:border-green hover:text-green hover:shadow-[0_4px_16px_rgba(0,129,74,0.08)]"}`}>
                      {plan.cta}<span className="ml-1.5 inline-block transition-transform group-hover:translate-x-0.5">→</span>
                    </Link>
                    <div className="space-y-3">
                      {plan.features.map((feature: string, fi: number) => (
                        <div key={fi} className="flex items-center gap-3 text-sm text-ink-light">
                          <svg className="w-4 h-4 text-green shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </TiltCard>
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
              <div className="grid grid-cols-[1fr_100px_100px_100px] md:grid-cols-[1fr_140px_140px_140px] items-center bg-sand/50 border-b border-line">
                <div className="px-6 py-5 text-sm font-semibold text-ink">{t.pricing.comparison.featureCol}</div>
                <div className="px-4 py-5 text-sm font-semibold text-ink text-center">{t.pricing.comparison.freeCol}</div>
                <div className="px-4 py-5 text-sm font-semibold text-green text-center">{t.pricing.comparison.proCol}</div>
                <div className="px-4 py-5 text-sm font-semibold text-forest text-center">{t.pricing.comparison.enterpriseCol}</div>
              </div>

              {comparisonCategories.map((category: { category: string; items: { name: string; free: boolean | string; pro: boolean | string; enterprise: boolean | string }[] }) => (
                <div key={category.category}>
                  <div className="px-6 py-3.5 bg-green-light/20 border-b border-line">
                    <span className="text-xs font-semibold tracking-wider uppercase text-forest/70">{category.category}</span>
                  </div>
                  {category.items.map((item, idx) => (
                    <div key={item.name} className={`grid grid-cols-[1fr_100px_100px_100px] md:grid-cols-[1fr_140px_140px_140px] items-center ${idx < category.items.length - 1 ? "border-b border-line/50" : "border-b border-line"} hover:bg-sand/30 transition-colors`}>
                      <div className="px-6 py-4 text-sm text-ink-light">{item.name}</div>
                      <div className="px-4 py-4 flex justify-center"><FeatureCheck value={item.free} /></div>
                      <div className="px-4 py-4 flex justify-center"><FeatureCheck value={item.pro} /></div>
                      <div className="px-4 py-4 flex justify-center"><FeatureCheck value={item.enterprise} /></div>
                    </div>
                  ))}
                </div>
              ))}

              <div className="grid grid-cols-[1fr_100px_100px_100px] md:grid-cols-[1fr_140px_140px_140px] items-center bg-sand/30 border-t border-line">
                <div className="px-6 py-5" />
                <div className="px-4 py-5 flex justify-center"><Link href={`/${locale}/essai-gratuit`} className="text-xs font-medium text-green hover:text-forest transition-colors">{t.pricing.comparison.startCta}</Link></div>
                <div className="px-4 py-5 flex justify-center"><Link href={`/${locale}/contact`} className="text-xs font-medium text-green hover:text-forest transition-colors">{t.pricing.comparison.quoteCta}</Link></div>
                <div className="px-4 py-5 flex justify-center"><Link href={`/${locale}/contact`} className="text-xs font-medium text-green hover:text-forest transition-colors">{t.pricing.comparison.contactCta}</Link></div>
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
