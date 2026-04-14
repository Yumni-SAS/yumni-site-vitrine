"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { useDictionary } from "../dictionary-provider";

/* ================================================================
   CONSTANTS
   ================================================================ */

const ease = [0.22, 1, 0.36, 1] as const;

/* ================================================================
   HERO VISUAL — Trust constellation network
   ================================================================ */

function HeroVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Node positions for the constellation
  const nodes = [
    { x: 200, y: 200, size: 32, primary: true }, // Center
    { x: 120, y: 100, size: 12 },
    { x: 280, y: 90, size: 10 },
    { x: 320, y: 180, size: 14 },
    { x: 300, y: 280, size: 11 },
    { x: 180, y: 320, size: 13 },
    { x: 80, y: 260, size: 10 },
    { x: 70, y: 160, size: 12 },
  ];

  // Connections between nodes (indices)
  const connections = [
    [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
    [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 1],
  ];

  return (
    <motion.div
      ref={ref}
      className="relative w-full max-w-md mx-auto"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 1, delay: 0.3 }}
    >
      <div className="relative aspect-square">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <defs>
            {/* Gradient for connections */}
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00814A" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00814A" stopOpacity="0.1" />
            </linearGradient>
            
            {/* Glow filter */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Connection lines */}
          {connections.map(([from, to], i) => (
            <motion.line
              key={`line-${i}`}
              x1={nodes[from].x}
              y1={nodes[from].y}
              x2={nodes[to].x}
              y2={nodes[to].y}
              stroke="url(#lineGradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5 + i * 0.05, ease: "easeOut" }}
            />
          ))}

          {/* Pulsing rings on connections - subtle data flow effect */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={`pulse-${i}`}
              r="3"
              fill="#00814A"
              opacity="0.4"
              initial={{ opacity: 0 }}
              animate={inView ? {
                cx: [nodes[0].x, nodes[i + 1].x, nodes[0].x],
                cy: [nodes[0].y, nodes[i + 1].y, nodes[0].y],
                opacity: [0, 0.6, 0],
              } : {}}
              transition={{
                duration: 4,
                delay: 2 + i * 1.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Nodes */}
          {nodes.map((node, i) => (
            <motion.g key={`node-${i}`}>
              {/* Node circle */}
              <motion.circle
                cx={node.x}
                cy={node.y}
                r={node.size / 2}
                fill={node.primary ? "#00814A" : "#E8F5EE"}
                stroke={node.primary ? "#1B3A2D" : "#00814A"}
                strokeWidth={node.primary ? 3 : 1}
                filter={node.primary ? "url(#glow)" : undefined}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.8 + i * 0.1,
                  type: "spring",
                  bounce: 0.4,
                }}
              />
              
              {/* Center icon */}
              {node.primary && (
                <motion.g
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 1.5 }}
                >
                  <text
                    x={node.x}
                    y={node.y + 5}
                    textAnchor="middle"
                    fill="white"
                    fontSize="18"
                    fontWeight="600"
                    fontFamily="var(--font-fraunces)"
                  >
                    Y
                  </text>
                </motion.g>
              )}
            </motion.g>
          ))}

          {/* Outer orbit ring */}
          <motion.circle
            cx="200"
            cy="200"
            r="160"
            fill="none"
            stroke="#00814A"
            strokeWidth="1"
            strokeDasharray="4 8"
            strokeOpacity="0.2"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.4 }}
          />
        </svg>

        {/* Floating labels */}
        <motion.div
          className="absolute top-[15%] left-[20%] px-3 py-1.5 rounded-full bg-white/90 border border-green/10 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <span className="text-[10px] font-semibold text-green tracking-wide uppercase">Impact</span>
        </motion.div>

        <motion.div
          className="absolute top-[60%] right-[10%] px-3 py-1.5 rounded-full bg-white/90 border border-green/10 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 2 }}
        >
          <span className="text-[10px] font-semibold text-green tracking-wide uppercase">Clarté</span>
        </motion.div>

        <motion.div
          className="absolute bottom-[20%] left-[12%] px-3 py-1.5 rounded-full bg-white/90 border border-green/10 shadow-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 2.2 }}
        >
          <span className="text-[10px] font-semibold text-green tracking-wide uppercase">Confiance</span>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ================================================================
   ANIMATED COUNTER (hero only)
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
   MAIN PAGE
   ================================================================ */

export default function AboutPage() {
  const { t, locale } = useDictionary();
  const a = t.about;

  return (
    <>
      {/* ─── HERO ─────────────────────────────────────────────── */}
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

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-green bg-green-light/50 border border-green/10 px-5 py-2 rounded-full shadow-[0_2px_8px_rgba(0,129,74,0.06)]">
              <span className="w-1.5 h-1.5 bg-green rounded-full animate-pulse" />
              {a.hero.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-forest max-w-4xl mx-auto"
          >
            {a.hero.title1}
            <br className="hidden sm:block" />
            <span className="italic text-green">{a.hero.titleHighlight}</span>
            <br className="hidden sm:block" />
            {a.hero.title2}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto mt-7 leading-relaxed"
          >
            {a.hero.subtitle}
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row justify-center gap-4 mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease }}
          >
            <Link
              href={`/${locale}/essai-gratuit`}
              className="bg-green text-white font-medium px-8 py-3.5 rounded-full text-sm text-center shadow-[0_4px_20px_rgba(0,129,74,0.25)]"
            >
              {t.common.freeTrial}
              <span className="ml-2">→</span>
            </Link>
            <Link
              href={`/${locale}/contact`}
              className="border-2 border-green/20 text-ink px-8 py-3.5 rounded-full text-sm text-center"
            >
              {locale === "fr" ? "Nous contacter" : "Contact us"}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── VISION & STATS ───────────────────────────────────── */}
      <section className="py-24 md:py-36 bg-sand/40 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-green-light/40 blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Vision text */}
          <div className="max-w-3xl mx-auto text-center mb-20">
            <span className="text-sm font-semibold tracking-widest uppercase text-green">
              {a.vision.eyebrow}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-forest mt-4 leading-tight">
              {a.vision.title}
              <br />
              <span className="italic text-green">{a.vision.titleHighlight}</span>
            </h2>
            <p className="text-lg text-muted leading-relaxed mt-6 max-w-2xl mx-auto">
              {a.vision.description}
            </p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {a.vision.stats.map(
              (stat: { value: string; suffix: string; label: string }, i: number) => (
                <div key={i} className="relative text-center p-8">
                  <div className="font-display text-6xl md:text-7xl text-forest mb-2 tracking-tight">
                    <CountUp target={parseInt(stat.value)} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-muted">{stat.label}</div>
                  <div className="mt-4 h-1 mx-auto rounded-full bg-gradient-to-r from-transparent via-green/30 to-transparent w-20" />
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ─── VALUES ───────────────────────────────────────────── */}
      <section className="py-24 md:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Section header */}
          <div className="text-center mb-20">
            <span className="text-sm font-semibold tracking-widest uppercase text-orange">
              {a.values.eyebrow}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-forest mt-4 leading-tight">
              {a.values.title}
              <br />
              <span className="italic text-green">{a.values.titleHighlight}</span>
            </h2>
          </div>

          {/* Values grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {a.values.items.map(
              (value: { name: string; description: string; icon: string }, i: number) => {
                const icons = {
                  eye: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ),
                  target: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h.01" />
                    </svg>
                  ),
                  shield: (
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  ),
                };

                return (
                  <div key={i} className="relative text-center">
                    {/* Icon container */}
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-white to-green-light border border-green/20 flex items-center justify-center shadow-[0_8px_32px_rgba(0,129,74,0.12)]">
                      <div className="text-green">
                        {icons[value.icon as keyof typeof icons]}
                      </div>
                    </div>

                    {/* Text */}
                    <h3 className="font-display text-xl text-forest mb-3">
                      {value.name}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed max-w-xs mx-auto">
                      {value.description}
                    </p>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* ─── TIMELINE ─────────────────────────────────────────── */}
      <section className="py-24 md:py-36 bg-forest relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange/5 rounded-full blur-[100px]" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
            <filter id="timelineGrain">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#timelineGrain)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — Header */}
            <div className="lg:sticky lg:top-32">
              <span className="text-sm font-semibold tracking-widest uppercase text-green-muted">
                {a.timeline.eyebrow}
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mt-4 leading-[1.1]">
                {a.timeline.title}
                <br />
                <span className="italic text-green-muted">{a.timeline.titleHighlight}</span>
              </h2>
            </div>

            {/* Right — Timeline */}
            <div className="pt-4">
              {a.timeline.events.map(
                (event: { date: string; title: string; description: string }, i: number) => (
                  <div key={i} className="relative flex gap-8 pb-12 last:pb-0">
                    {/* Timeline spine */}
                    <div className="relative flex flex-col items-center shrink-0">
                      {/* Node */}
                      <div className="relative z-10">
                        <div className="w-4 h-4 rounded-full bg-green shadow-[0_0_0_4px_rgba(0,129,74,0.1)]" />
                      </div>

                      {/* Line */}
                      {i < a.timeline.events.length - 1 && (
                        <div className="w-px flex-1 bg-gradient-to-b from-green/40 to-green/10 min-h-[80px]" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pt-0">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-light border border-green/10 mb-3">
                        <span className="text-xs font-semibold text-green tracking-wide">{event.date}</span>
                      </div>
                      <h3 className="font-display text-xl text-white mb-2">{event.title}</h3>
                      <p className="text-sm text-white/60 leading-relaxed max-w-md">{event.description}</p>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── TEAM ─────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-sm font-semibold tracking-widest uppercase text-green">
            {a.team.eyebrow}
          </span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-forest mt-4 leading-tight">
            {a.team.title}
            <br />
            <span className="italic text-green">{a.team.titleHighlight}</span>
          </h2>
          <p className="text-lg text-muted leading-relaxed mt-6 max-w-xl mx-auto">
            {a.team.description}
          </p>

          {/* Team avatars — 2 members */}
          <div className="flex justify-center items-center gap-8 mt-12">
            {[0, 1].map((i) => (
              <div key={i} className="relative">
                <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-green-light to-sand border-2 border-white shadow-lg flex items-center justify-center">
                  <svg
                    className="w-12 h-12 md:w-14 md:h-14 text-green/30"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                {/* Role label */}
                <div className="mt-4">
                  <div className="text-sm font-semibold text-forest">
                    {locale === "fr" 
                      ? (i === 0 ? "Co-fondateur" : "Co-fondatrice")
                      : (i === 0 ? "Co-founder" : "Co-founder")
                    }
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────── */}
      <section className="py-24 md:py-36 bg-sand/60 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-green-light/30 blur-[100px]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-forest leading-tight">
            {a.cta.title}
            <br />
            <span className="italic text-green">{a.cta.titleHighlight}</span>
          </h2>
          <p className="text-lg text-muted leading-relaxed mt-6 max-w-xl mx-auto">
            {a.cta.description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Link
              href={`/${locale}/contact`}
              className="bg-green text-white font-medium px-10 py-4 rounded-full text-sm shadow-[0_4px_20px_rgba(0,129,74,0.25)]"
            >
              {a.cta.secondaryButton}
              <span className="ml-2">→</span>
            </Link>
            <Link
              href={`/${locale}/essai-gratuit`}
              className="border-2 border-green/20 text-ink px-10 py-4 rounded-full text-sm"
            >
              {t.common.freeTrial}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
