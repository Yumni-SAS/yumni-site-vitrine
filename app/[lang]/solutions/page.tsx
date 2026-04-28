"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

const ease = [0.22, 1, 0.36, 1] as const;

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
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ================================================================
   VISUAL — Cabinet
   Story : 1 consultant, N clients, chaque rapport en moins de 12 secondes
   ================================================================ */

function CabinetVisual() {
  const [sentIdx, setSentIdx] = useState(-1);

  const clients = [
    { name: "Lumos RSE", initials: "LR", color: "bg-green/10 text-green", sent: false },
    { name: "Cabinet Aria", initials: "CA", color: "bg-orange/10 text-orange", sent: false },
    { name: "EcoPartners", initials: "EP", color: "bg-forest/10 text-forest", sent: false },
    { name: "Veritas Group", initials: "VG", color: "bg-green/10 text-green", sent: false },
    { name: "Nova Conseil", initials: "NC", color: "bg-orange/10 text-orange", sent: false },
  ];

  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setSentIdx(i);
      i++;
      if (i >= clients.length) {
        setTimeout(() => { setSentIdx(-1); i = 0; }, 1200);
      }
    }, 600);
    return () => clearInterval(iv);
  }, [clients.length]);

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      {/* Top — stat */}
      <div className="rounded-2xl bg-forest px-5 py-4 flex items-center justify-between">
        <div>
          <div className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-0.5">Rapports générés</div>
          <div className="font-display text-3xl font-bold text-white">
            {sentIdx >= 0 ? sentIdx + 1 : clients.length}
            <span className="text-white/40 text-base font-normal"> / {clients.length}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-white/40 mb-0.5">Temps / rapport</div>
          <div className="font-display text-xl font-bold text-green">
            &lt; 12s
          </div>
        </div>
      </div>

      {/* Client rows — reports being sent */}
      <div className="flex-1 rounded-2xl border border-line bg-white overflow-hidden divide-y divide-line/50">
        <div className="px-4 py-2.5 flex items-center justify-between bg-sand/40">
          <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Clients</span>
          <span className="text-[10px] font-bold text-muted uppercase tracking-wider">Rapport COMEX</span>
        </div>
        {clients.map((c, i) => {
          const isSent = sentIdx >= i;
          const isCurrent = sentIdx === i;
          return (
            <motion.div
              key={c.name}
              className="px-4 py-3 flex items-center justify-between"
              animate={isCurrent ? { backgroundColor: ["#ffffff", "#f0faf5", "#ffffff"] } : {}}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-bold ${c.color}`}>
                  {c.initials}
                </div>
                <span className="text-sm font-medium text-ink">{c.name}</span>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.7 }}
                animate={isSent ? { opacity: 1, scale: 1 } : { opacity: 0.25, scale: 0.9 }}
                transition={{ duration: 0.3, ease }}
                className={`flex items-center gap-1.5 text-[11px] font-semibold ${isSent ? "text-green" : "text-muted"}`}
              >
                {isSent ? (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    Envoyé
                  </>
                ) : (
                  <>
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    En attente
                  </>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ================================================================
   VISUAL — PME
   Story : parcours de 0 à CSRD Ready en 4 étapes simples
   ================================================================ */

function PMEVisual() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: "01",
      label: "Inscription",
      detail: "60 secondes. Email + mot de passe. C'est tout.",
      badge: "Gratuit · sans CB",
      badgeColor: "bg-green/10 text-green",
    },
    {
      num: "02",
      label: "Template PME chargé",
      detail: "Axes Env. / Social / Gouvernance pré-remplis.",
      badge: "Prêt en 2 min",
      badgeColor: "bg-green/10 text-green",
    },
    {
      num: "03",
      label: "Premiers KPIs configurés",
      detail: "12 indicateurs recommandés pour votre secteur.",
      badge: "Guidé pas à pas",
      badgeColor: "bg-orange/10 text-orange",
    },
    {
      num: "04",
      label: "CSRD Ready",
      detail: "Couverture ESRS visible. Rapport COMEX en 1 clic.",
      badge: "✓ Conforme",
      badgeColor: "bg-green text-white",
    },
  ];

  useEffect(() => {
    const iv = setInterval(() => setActiveStep((p) => (p + 1) % steps.length), 2400);
    return () => clearInterval(iv);
  }, [steps.length]);

  return (
    <div className="w-full h-full flex flex-col gap-3 select-none">
      {/* Steps */}
      <div className="flex-1 flex flex-col gap-2.5">
        {steps.map((s, i) => {
          const isDone = i < activeStep;
          const isActive = i === activeStep;
          return (
            <motion.div
              key={s.num}
              onClick={() => setActiveStep(i)}
              animate={{
                opacity: isDone ? 0.55 : 1,
                scale: isActive ? 1 : 0.99,
              }}
              transition={{ duration: 0.3, ease }}
              className={`rounded-2xl border-2 px-5 py-4 cursor-pointer transition-all duration-300 ${
                isActive
                  ? "border-green/30 bg-green-light/30 shadow-sm"
                  : isDone
                  ? "border-line/40 bg-white"
                  : "border-line/40 bg-white"
              }`}
            >
              <div className="flex items-center gap-4">
                {/* Circle */}
                <div className={`w-9 h-9 rounded-full flex items-center justify-center font-display font-bold text-sm flex-shrink-0 transition-all duration-300 ${
                  isDone
                    ? "bg-green text-white"
                    : isActive
                    ? "bg-green text-white shadow-[0_4px_12px_rgba(0,129,74,0.3)]"
                    : "bg-sand border border-line text-muted"
                }`}>
                  {isDone ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : s.num}
                </div>

                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-semibold transition-colors ${isActive ? "text-ink" : "text-muted"}`}>
                    {s.label}
                  </div>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="text-[11px] text-muted mt-0.5 leading-relaxed"
                    >
                      {s.detail}
                    </motion.div>
                  )}
                </div>

                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0 ${s.badgeColor}`}
                  >
                    {s.badge}
                  </motion.span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="rounded-xl border border-line bg-white px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-semibold text-ink">Progression CSRD</span>
          <span className="text-[11px] font-bold text-green">{Math.round(((activeStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="h-2 bg-line rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-green rounded-full"
            animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            transition={{ duration: 0.5, ease }}
          />
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   VISUAL — ETI
   Story : 1 direction, N filiales, données cloisonnées
   Org-tree illustrant la structure multi-entités
   ================================================================ */

function ETIVisual() {
  const filiales = [
    { name: "Normandie", role: "Accès isolé", color: "border-green/25 bg-green/5" },
    { name: "Est", role: "Accès isolé", color: "border-line bg-white" },
    { name: "Sud", role: "Accès isolé", color: "border-orange/25 bg-orange/5" },
  ];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-0 select-none px-4">

      {/* Direction groupe */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="rounded-2xl border-2 border-forest/20 bg-forest/5 px-6 py-3.5 text-center w-56"
      >
        <div className="text-[10px] font-bold tracking-widest uppercase text-forest/50 mb-0.5">Direction groupe</div>
        <div className="text-sm font-bold text-forest">GreenTech Industries</div>
        <div className="text-[10px] text-muted mt-0.5">Vue consolidée · RBAC Owner</div>
      </motion.div>

      {/* Connector */}
      <div className="flex flex-col items-center gap-0 py-1">
        <div className="w-px h-5 bg-line-dark/50" />
        {/* Horizontal line */}
        <div className="relative flex items-start justify-center" style={{ width: 320 }}>
          <div className="absolute top-0 left-[15%] right-[15%] h-px bg-line-dark/50" />
          {filiales.map((_, i) => (
            <div
              key={i}
              className="w-px h-5 bg-line-dark/50"
              style={{ position: "absolute", top: 0, left: `calc(${16.5 + i * 33.3}% )` }}
            />
          ))}
        </div>
        <div className="h-5" />
      </div>

      {/* Filiales */}
      <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
        {filiales.map((f, i) => (
          <motion.div
            key={f.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease }}
            className={`rounded-xl border-2 ${f.color} px-3 py-3 text-center`}
          >
            <div className="w-8 h-8 rounded-lg bg-white border border-line/60 flex items-center justify-center mx-auto mb-2 shadow-sm">
              <svg className="w-4 h-4 text-forest/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 20V8l8-4 8 4v12" /><rect x="9" y="12" width="6" height="8" rx="0.5" />
              </svg>
            </div>
            <div className="text-[11px] font-semibold text-ink">Filiale {f.name}</div>
            <div className="text-[9px] text-muted mt-0.5">{f.role}</div>
          </motion.div>
        ))}
      </div>

      {/* Connector down */}
      <div className="w-px h-5 bg-line-dark/50" />

      {/* Dashboard consolidé */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.55, ease }}
        className="rounded-2xl border-2 border-green/25 bg-green-light/40 px-6 py-4 text-center w-64"
      >
        <div className="text-[10px] font-bold tracking-widest uppercase text-green/60 mb-1">Rapport groupe consolidé</div>
        <div className="flex items-center justify-center gap-2">
          <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="text-sm font-bold text-forest">PowerPoint · 1 clic</span>
        </div>
        <div className="mt-2 flex justify-center gap-2">
          {["Normandie", "Est", "Sud"].map((l) => (
            <span key={l} className="text-[9px] bg-white text-green font-medium px-2 py-0.5 rounded-full border border-green/20">
              {l}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ================================================================
   HERO
   ================================================================ */

function Hero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative -mt-16 pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Background identique homepage */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute -right-[15%] -top-[10%] w-[80%] h-[120%] opacity-[0.05]" viewBox="0 0 800 800" fill="none">
          <circle cx="400" cy="400" r="380" stroke="#1B3A2D" strokeWidth="1.2" />
          <circle cx="400" cy="400" r="300" stroke="#1B3A2D" strokeWidth="0.8" />
          <circle cx="400" cy="400" r="220" stroke="#1B3A2D" strokeWidth="0.5" />
          <circle cx="400" cy="400" r="140" stroke="#1B3A2D" strokeWidth="0.3" />
        </svg>
        <div className="absolute -top-[200px] -right-[200px] w-[700px] h-[700px] rounded-full bg-green/[0.05]" />
        <div className="absolute bottom-0 -left-[100px] w-[400px] h-[400px] rounded-full bg-orange/[0.05]" />
        <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-orange/[0.04] via-orange/[0.02] to-transparent" />
        <div className="absolute bottom-[5%] left-[25%] w-[500px] h-[500px] rounded-full bg-orange/[0.04] blur-[100px]" />
        <div className="absolute bottom-[8%] right-[15%] w-[400px] h-[400px] rounded-full bg-green/[0.04] blur-[80px]" />
        <div className="absolute top-[55%] left-[50%] w-px h-[300px] bg-gradient-to-b from-line-dark/30 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            className="text-sm font-semibold tracking-widest uppercase text-green mb-5"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            Solutions
          </motion.p>

          <motion.h1
            className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-forest mb-7"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            Yumni s&rsquo;adapte à
            <br />
            <span className="italic text-green">votre structure.</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease }}
          >
            La CSRD s&rsquo;impose. Les obligations réglementaires s&rsquo;accumulent. Yumni structure votre pilotage RSE — quel que soit votre périmètre.
          </motion.p>

          {/* Persona anchors */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.22, ease }}
          >
            {[
              { label: "Cabinets de conseil RSE", id: "cabinets" },
              { label: "PME", id: "pme" },
              { label: "ETI & Groupes", id: "eti" },
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => scrollTo(p.id)}
                className="group flex items-center gap-2 px-5 py-2.5 rounded-full border border-line bg-white/70 backdrop-blur-sm text-sm font-medium text-forest hover:border-green hover:text-green transition-all duration-200 shadow-sm"
              >
                {p.label}
                <svg className="w-3.5 h-3.5 text-muted group-hover:text-green group-hover:translate-y-0.5 transition-all duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32, ease }}
          >
            <Link
              href="/essai-gratuit"
              className="group bg-green text-white font-medium px-8 py-3.5 rounded-full hover:bg-forest transition-all duration-300 text-sm shadow-[0_4px_20px_rgba(0,129,74,0.25)] hover:shadow-[0_8px_30px_rgba(0,129,74,0.35)]"
            >
              Commencer gratuitement
              <span className="ml-2 inline-block group-hover:translate-x-0.5 transition-transform">→</span>
            </Link>
            <Link
              href="/contact"
              className="border-2 border-green/20 text-ink hover:border-green hover:text-green px-8 py-3.5 rounded-full transition-all duration-300 text-sm"
            >
              Demander une démo
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   PERSONA ROW — alternating 2-col layout, inspired by produit
   ================================================================ */

function PersonaRow({
  id,
  reversed = false,
  bg = "",
  eyebrow,
  headline,
  headlineAccent,
  subtitle,
  bullets,
  ctaLabel,
  ctaHref,
  ctaSecondaryLabel,
  ctaSecondaryHref,
  nudgeStat,
  nudgeLabel,
  Visual,
}: {
  id: string;
  reversed?: boolean;
  bg?: string;
  eyebrow: string;
  headline: string;
  headlineAccent: string;
  subtitle: string;
  bullets: string[];
  ctaLabel: string;
  ctaHref: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  nudgeStat: string;
  nudgeLabel: string;
  Visual: React.ComponentType;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div id={id} ref={ref} className={`${bg} relative overflow-hidden`}>
      <div className="relative max-w-7xl mx-auto px-6 pt-14 pb-16 md:pt-20 md:pb-24">

        {/* Audience section header — full width */}
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: -12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease }}
        >
          <div className="flex items-center gap-5">
            <div className="h-px w-8 bg-green/40 flex-shrink-0" />
            <p className="text-[11px] font-bold tracking-[0.22em] uppercase text-green/70">Pour les</p>
            <div className="h-px w-4 bg-line flex-shrink-0" />
            <p className="font-display text-2xl md:text-3xl font-bold text-forest">{eyebrow}</p>
            <div className="h-px flex-1 bg-line" />
          </div>
        </motion.div>

        <div
          className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
          style={reversed ? { direction: "rtl" } : {}}
        >
          {/* Visual */}
          <motion.div
            style={reversed ? { direction: "ltr" } : {}}
            initial={{ opacity: 0, x: reversed ? 40 : -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <div className="aspect-[4/3] max-h-[440px] w-full">
              <Visual />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            style={reversed ? { direction: "ltr" } : {}}
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, ease }}
          >
            {/* Nudge badge */}
            <div className="flex items-center gap-3 mb-5">
              <div className="bg-green-light border border-green/15 rounded-lg px-3 py-1.5 flex items-baseline gap-1.5">
                <span className="font-display font-bold text-base text-green">{nudgeStat}</span>
                <span className="text-[11px] text-muted">{nudgeLabel}</span>
              </div>
            </div>

            {/* Title */}
            <h2 className="font-display text-4xl md:text-5xl leading-[1.08] text-forest mb-4">
              {headline}{" "}
              {headlineAccent && <span className="italic text-green">{headlineAccent}</span>}
            </h2>

            {/* Subtitle */}
            <p className="text-base text-muted leading-relaxed mb-6">
              {subtitle}
            </p>

            {/* Bullets */}
            <ul className="space-y-3 mb-8">
              {bullets.map((b, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3 text-sm text-ink-light leading-relaxed"
                  initial={{ opacity: 0, x: -8 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.4, ease }}
                >
                  <span className="text-green mt-0.5 shrink-0">
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {b}
                </motion.li>
              ))}
            </ul>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                href={ctaHref}
                className="group inline-flex items-center gap-2 bg-green text-white font-medium px-7 py-3.5 rounded-full text-sm hover:bg-forest transition-all duration-300 shadow-[0_4px_20px_rgba(0,129,74,0.2)] hover:shadow-[0_8px_28px_rgba(0,129,74,0.3)]"
              >
                {ctaLabel}
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              {ctaSecondaryLabel && (
                <Link
                  href={ctaSecondaryHref || "#"}
                  className="inline-flex items-center px-7 py-3.5 border-2 border-line-dark text-ink rounded-full text-sm font-medium hover:border-green hover:text-green transition-all duration-300"
                >
                  {ctaSecondaryLabel}
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   FINAL CTA
   ================================================================ */

function FinalCTA() {
  return (
    <section className="my-12 md:my-20 mx-4 md:mx-8 lg:mx-12">
      <div className="relative bg-forest rounded-3xl overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-[60%] h-[200%] rotate-[12deg] opacity-[0.08]" style={{ background: "linear-gradient(180deg, var(--color-green) 0%, transparent 70%)" }} />
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-green/[0.10] blur-[120px]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.025]">
            <filter id="ctaNoise"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" /></filter>
            <rect width="100%" height="100%" filter="url(#ctaNoise)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-2xl mx-auto text-center py-20 md:py-28 px-6">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] text-white leading-[1.1]">
              La CSRD n&rsquo;attend pas.{" "}
              <span className="italic text-green-muted">Votre pilotage non plus.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-5 text-lg text-white/55 leading-relaxed">
              Cockpit RSE, KPIs automatisés, conformité ESRS, rapport COMEX en 12 secondes. Structurez votre RSE avant l&rsquo;audit.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Link href="/contact" className="group inline-flex items-center gap-2 px-9 py-4 bg-white text-forest font-semibold rounded-full text-sm shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:bg-green-light transition-all duration-300">
                Demander une démo
                <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              <Link href="/essai-gratuit" className="inline-flex items-center px-9 py-4 border border-white/25 text-white font-medium rounded-full text-sm hover:bg-white/10 hover:border-white/40 transition-all">
                Commencer gratuitement
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   PAGE
   ================================================================ */

export default function SolutionsPage() {
  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <>
      <Hero />

      <PersonaRow
        id="cabinets"
        reversed={false}
        bg=""
        eyebrow="Cabinets de conseil RSE"
        headline="Démultipliez l'impact de votre cabinet."
        headlineAccent=""
        subtitle="Yumni est la plateforme de pilotage RSE que vous proposez à vos clients. Vous gardez le conseil et la relation — on vous donne l'outil. Vous passez de mission ponctuelle à partenariat technologique continu : la valeur perçue augmente, la récurrence aussi."
        bullets={[
          "Un rapport généré en moins de 12 secondes — contre 2 jours de compilation Excel.",
          "Onboarding d'un nouveau client en moins de 5 minutes avec des templates pré-configurés.",
          "WSJF intégré : votre méthodologie devient un avantage concurrentiel que vous valorisez auprès de vos clients.",
        ]}
        nudgeStat="< 12s"
        nudgeLabel="par rapport généré"
        ctaLabel="Demander une démo cabinet"
        ctaHref="/contact"
        ctaSecondaryLabel="Programme partenaire"
        ctaSecondaryHref="/partenaires"
        Visual={CabinetVisual}
      />

      <PersonaRow
        id="pme"
        reversed={true}
        bg="bg-sand/30"
        eyebrow="PME"
        headline="Votre RSE structurée."
        headlineAccent="Pilotée depuis votre direction."
        subtitle="La CSRD vous oblige à reporter. Structurez votre pilotage RSE sans projet long, sans recrutement dédié, et sans dépendre d'Excel. Yumni s'intègre à votre organisation existante."
        bullets={[
          "Démarrez gratuitement. Montez en puissance à votre rythme — votre cabinet RSE reste votre allié stratégique.",
          "Templates sectoriels pré-configurés — axes, objectifs, KPIs recommandés. Opérationnel en 2 minutes.",
          "12 standards ESRS mappés automatiquement. Vos gaps identifiés en un écran avant votre audit.",
        ]}
        nudgeStat="−40j/an"
        nudgeLabel="économisés sur le reporting"
        ctaLabel="Commencer gratuitement"
        ctaHref="/essai-gratuit"
        ctaSecondaryLabel="Voir les tarifs"
        ctaSecondaryHref="/tarifs"
        Visual={PMEVisual}
      />

      <PersonaRow
        id="eti"
        reversed={false}
        bg=""
        eyebrow="ETI & Groupes"
        headline="Pilotez la RSE de votre groupe."
        headlineAccent="Chaque filiale, chaque KPI, un seul cockpit."
        subtitle="Multi-sites, multi-filiales, multi-réglementations. Yumni consolide tout en temps réel, sécurise l'accès par entité, et génère votre rapport groupe en 1 clic."
        bullets={[
          "Consolidation groupe en temps réel. Rapport COMEX groupe en 1 clic — format PowerPoint natif.",
          "RBAC 4 niveaux : chaque entité accède uniquement à son périmètre. Isolation RLS PostgreSQL.",
          "MFA natif, hébergement Scaleway France, RGPD by design. Conformité non négociable pour vos DSI et DPO.",
        ]}
        nudgeStat="1 clic"
        nudgeLabel="rapport groupe consolidé"
        ctaLabel="Demander une démo groupe"
        ctaHref="/contact"
        ctaSecondaryLabel="Sécurité & conformité"
        ctaSecondaryHref="/securite"
        Visual={ETIVisual}
      />

      <FinalCTA />
    </>
  );
}
