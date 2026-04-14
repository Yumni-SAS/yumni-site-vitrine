"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,

  useMotionValue,
  useSpring,
  AnimatePresence,
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
   NETWORK VISUAL — Animated constellation hero
   ================================================================ */

function NetworkVisual() {
  return (
    <div className="relative w-full h-[420px] md:h-[520px]">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-80 h-80 bg-green/8 rounded-full blur-[100px]" />
      </div>

      {/* Central Yumni node */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 200 }}
      >
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-forest flex items-center justify-center shadow-[0_12px_40px_rgba(27,58,45,0.3)]">
            <span className="font-display text-xl text-white tracking-tight">Y</span>
          </div>
          <div className="absolute -inset-3 rounded-3xl border border-green/20 animate-pulse-ring" />
          <div className="absolute -inset-6 rounded-[1.5rem] border border-green/10 animate-pulse-ring" style={{ animationDelay: "1s" }} />
        </div>
      </motion.div>

      {/* Partner nodes — orbiting around */}
      {[
        { top: "15%", left: "20%", delay: 0.5, label: "Cabinet A", color: "bg-green" },
        { top: "12%", left: "65%", delay: 0.7, label: "Cabinet B", color: "bg-orange" },
        { top: "70%", left: "15%", delay: 0.9, label: "Agence C", color: "bg-green" },
        { top: "75%", left: "72%", delay: 1.1, label: "Conseil D", color: "bg-orange" },
        { top: "42%", left: "5%", delay: 0.6, label: "Expert E", color: "bg-forest" },
        { top: "38%", left: "88%", delay: 0.8, label: "Cabinet F", color: "bg-forest" },
      ].map((node, i) => (
        <motion.div
          key={i}
          className="absolute z-10"
          style={{ top: node.top, left: node.left }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: node.delay, type: "spring", stiffness: 200 }}
        >
          <motion.div
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="bg-white rounded-xl border border-line px-3.5 py-2.5 shadow-sm flex items-center gap-2.5">
              <div className={`w-2.5 h-2.5 rounded-full ${node.color}`} />
              <span className="text-xs font-medium text-ink whitespace-nowrap">{node.label}</span>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Connecting lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 800 520" fill="none" preserveAspectRatio="xMidYMid meet">
        {[
          { x1: 400, y1: 260, x2: 160, y2: 78, d: 0.6 },
          { x1: 400, y1: 260, x2: 520, y2: 62, d: 0.8 },
          { x1: 400, y1: 260, x2: 120, y2: 364, d: 1.0 },
          { x1: 400, y1: 260, x2: 576, y2: 390, d: 1.2 },
          { x1: 400, y1: 260, x2: 40, y2: 218, d: 0.7 },
          { x1: 400, y1: 260, x2: 704, y2: 198, d: 0.9 },
        ].map((line, i) => (
          <motion.line
            key={i}
            x1={line.x1} y1={line.y1} x2={line.x2} y2={line.y2}
            stroke="url(#lineGrad)"
            strokeWidth={1.5}
            strokeDasharray="6 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.4 }}
            transition={{ duration: 1.2, delay: line.d, ease }}
          />
        ))}
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00814A" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#00814A" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00814A" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>

      {/* Floating data particles */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-1.5 h-1.5 bg-green/40 rounded-full"
          style={{
            top: `${20 + i * 15}%`,
            left: `${15 + i * 16}%`,
          }}
          animate={{
            x: [0, 30 + i * 10, 0],
            y: [0, -(20 + i * 8), 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* ================================================================
   FLOW DIAGRAM — Partner model (2-column: Vous → Vos clients)
   ================================================================ */

function FlowDiagram() {
  const { t } = useDictionary();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const rows = t.partners.model.rows;

  return (
    <div ref={ref} className="max-w-4xl mx-auto">
      {/* Column headers */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.2, ease }}
        className="grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 mb-3 px-6 md:px-10"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-green-light flex items-center justify-center">
            <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-green uppercase tracking-widest">{t.partners.model.columnYou}</span>
        </div>
        <div className="w-12 md:w-16" />
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-light flex items-center justify-center">
            <svg className="w-4 h-4 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
            </svg>
          </div>
          <span className="text-sm font-semibold text-orange uppercase tracking-widest">{t.partners.model.columnClients}</span>
        </div>
      </motion.div>

      {/* Rows */}
      <div className="rounded-2xl border border-line bg-white overflow-hidden shadow-sm">
        {rows.map((row: { you: string; clients: string }, i: number) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease }}
            className={`grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-3 md:gap-8 items-center px-6 md:px-10 py-6 group hover:bg-green-light/10 transition-colors duration-300 ${
              i < rows.length - 1 ? "border-b border-line/60" : ""
            }`}
          >
            {/* You side */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green shrink-0" />
              <span className="text-sm font-medium text-ink">{row.you}</span>
            </div>

            {/* Arrow */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.15, ease }}
              className="hidden md:flex items-center justify-center origin-left"
            >
              <div className="w-8 md:w-12 h-px bg-gradient-to-r from-green/40 via-forest/30 to-orange/40" />
              <span className="text-orange/60 text-sm ml-1">→</span>
            </motion.div>

            {/* Clients side */}
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-orange shrink-0 md:hidden" />
              <div className="hidden md:flex w-6 h-6 rounded-full bg-orange-light items-center justify-center shrink-0">
                <svg className="w-3 h-3 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-medium text-ink-light">{row.clients}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   BENEFIT CARD — Glassmorphism on dark bg
   ================================================================ */

const benefitIcons = [
  /* platform */ <svg key="0" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" /></svg>,
  /* price */ <svg key="1" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>,
  /* badge */ <svg key="2" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>,
  /* materials */ <svg key="3" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>,
  /* training */ <svg key="4" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" /></svg>,
  /* support */ <svg key="5" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M16.712 4.33a9.027 9.027 0 011.652 1.306c.51.51.944 1.064 1.306 1.652M16.712 4.33l-3.448 4.138m3.448-4.138a9.014 9.014 0 00-9.424 0M19.67 7.288l-4.138 3.448m4.138-3.448a9.014 9.014 0 010 9.424m-4.138-5.976a3.736 3.736 0 00-.88-1.388 3.737 3.737 0 00-1.388-.88m2.268 2.268a3.765 3.765 0 010 2.528m-2.268-4.796a3.765 3.765 0 00-2.528 0m4.796 4.796c-.181.506-.475.982-.88 1.388a3.736 3.736 0 01-1.388.88m2.268-2.268l4.138 3.448m0 0a9.027 9.027 0 01-1.306 1.652c-.51.51-1.064.944-1.652 1.306m0 0l-3.448-4.138m3.448 4.138a9.014 9.014 0 01-9.424 0m5.976-4.138a3.765 3.765 0 01-2.528 0m0 0a3.736 3.736 0 01-1.388-.88 3.737 3.737 0 01-.88-1.388m2.268 2.268L7.288 19.67m0 0a9.024 9.024 0 01-1.652-1.306 9.027 9.027 0 01-1.306-1.652m0 0l4.138-3.448M4.33 16.712a9.014 9.014 0 010-9.424m4.138 5.976a3.765 3.765 0 010-2.528m0 0c.181-.506.475-.982.88-1.388a3.736 3.736 0 011.388-.88m-2.268 2.268L4.33 7.288m6.406 1.18L7.288 4.33m0 0a9.024 9.024 0 00-1.652 1.306A9.025 9.025 0 004.33 7.288" /></svg>,
];

/* ================================================================
   BEFORE/AFTER TRANSFORM ROW
   ================================================================ */

function TransformRow({
  before,
  after,
  index,
}: {
  before: string;
  after: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease }}
      className="group relative"
    >
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-6 items-center py-6 px-6 md:px-8 rounded-2xl transition-all duration-300 hover:bg-green-light/10">
        {/* Before */}
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 shrink-0 rounded-full bg-orange-light flex items-center justify-center mt-0.5">
            <svg className="w-3 h-3 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          <p className="text-sm text-muted leading-relaxed line-through decoration-orange/30">{before}</p>
        </div>

        {/* Arrow */}
        <motion.div
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.5, delay: 0.3 + index * 0.12, ease }}
          className="hidden md:flex items-center justify-center origin-left"
        >
          <div className="w-12 h-px bg-gradient-to-r from-orange/30 via-green/50 to-green/30" />
          <span className="text-green text-xs ml-1">→</span>
        </motion.div>

        {/* After */}
        <div className="flex items-start gap-3">
          <div className="w-6 h-6 shrink-0 rounded-full bg-green-light flex items-center justify-center mt-0.5">
            <svg className="w-3.5 h-3.5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-sm font-medium text-ink leading-relaxed">{after}</p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-line to-transparent" />
    </motion.div>
  );
}

/* ================================================================
   EXPECTATION NODE — Dialogue axis item (no cards)
   ================================================================ */

function ExpectationNode({
  title,
  description,
  index,
  isLeft,
  accentColor,
}: {
  title: string;
  description: string;
  index: number;
  isLeft: boolean;
  accentColor: "green" | "orange";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const numStr = `0${index + 1}`;

  return (
    <div ref={ref} className="relative py-10 md:py-20 pl-20 md:pl-0 group">
      {/* ── Pulse node on axis ────────────────────────── */}
      <motion.div
        className="absolute left-8 md:left-1/2 top-14 md:top-24 -translate-x-1/2 z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.15, type: "spring", stiffness: 300 }}
      >
        <span className={`block w-3.5 h-3.5 rounded-full ring-[5px] ${
          accentColor === "orange"
            ? "bg-orange ring-orange/15"
            : "bg-green ring-green/15"
        }`} />
      </motion.div>

      {/* ── Horizontal connector from axis to content ── */}
      <motion.div
        className={`absolute top-[4.1rem] md:top-[6.6rem] h-px hidden md:block ${
          accentColor === "orange"
            ? "bg-gradient-to-r from-orange/30 to-transparent"
            : "bg-gradient-to-r from-green/30 to-transparent"
        } ${isLeft ? "right-1/2 mr-2 w-[10%] origin-right" : "left-1/2 ml-2 w-[10%] origin-left"}`}
        style={{ [isLeft ? "direction" : ""]: isLeft ? "rtl" : undefined }}
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3, ease }}
      />

      {/* ── Content block — alternating sides ────────── */}
      <div className={`md:w-[45%] ${isLeft ? "md:mr-auto md:pr-16" : "md:ml-auto md:pl-16"}`}>
        {/* Ghost number — bleeds behind */}
        <motion.div
          className={`absolute pointer-events-none select-none ${
            isLeft
              ? "right-0 md:right-auto md:left-[6%]"
              : "right-0 md:right-[6%] md:left-auto"
          } top-4 md:top-8`}
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1.2, delay: 0.1, ease }}
        >
          <span
            className="block text-[8rem] md:text-[13rem] font-display leading-none"
            style={{
              WebkitTextStroke: "1.5px rgba(27,58,45,0.05)",
              WebkitTextFillColor: "transparent",
            }}
          >
            {numStr}
          </span>
        </motion.div>

        {/* Accent line + number label */}
        <motion.div
          className={`flex items-center gap-3 mb-5 ${isLeft ? "" : "md:justify-start"}`}
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          <motion.span
            className={`block w-10 h-[2px] rounded-full ${
              accentColor === "orange" ? "bg-orange" : "bg-green"
            }`}
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.35, ease }}
            style={{ transformOrigin: "left" }}
          />
          <span className={`font-display text-xs tracking-[0.25em] font-semibold ${
            accentColor === "orange" ? "text-orange/70" : "text-green/70"
          }`}>
            {numStr}
          </span>
        </motion.div>

        {/* Title — large editorial */}
        <motion.h3
          className={`relative font-display text-2xl md:text-3xl lg:text-[2.25rem] text-forest tracking-tight leading-[1.15] ${
            isLeft ? "" : "md:text-left"
          } group-hover:text-green transition-colors duration-500`}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.25, ease }}
        >
          {title}
        </motion.h3>

        {/* Description — subtle, offset */}
        <motion.p
          className="text-muted text-sm md:text-[0.94rem] leading-relaxed mt-4 max-w-md"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease }}
        >
          {description}
        </motion.p>
      </div>
    </div>
  );
}

/* ================================================================
   PARTNER FORM — Application
   ================================================================ */

function PartnerForm() {
  const { t, locale } = useDictionary();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    clients: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          company: formData.company,
          type: "Programme partenaire",
          message: `Clients RSE accompagnés : ${formData.clients}\n\n${formData.message}`,
        }),
      });

      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const f = t.partners.cta.form;

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease }}
          className="text-center py-16 px-8"
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-8 rounded-full bg-green-light flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <motion.svg
              className="w-10 h-10 text-green"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <motion.path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease }}
              />
            </motion.svg>
          </motion.div>
          <h3 className="font-display text-3xl text-forest mb-3">{t.partners.cta.success.title}</h3>
          <p className="text-muted leading-relaxed max-w-md mx-auto mb-8">{t.partners.cta.success.description}</p>
          <Link
            href={`/${locale}`}
            className="text-sm text-green font-medium hover:text-forest transition-colors"
          >
            {t.common.back}
          </Link>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-5"
        >
          {/* Name + Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="p-name" className="block text-sm font-medium text-ink mb-2">
                {f.name} <span className="text-orange">{f.required}</span>
              </label>
              <input
                id="p-name"
                name="name"
                type="text"
                required
                maxLength={200}
                value={formData.name}
                onChange={handleChange}
                placeholder={f.namePlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-line bg-white text-sm text-ink placeholder:text-subtle focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 transition-all duration-300"
              />
            </div>
            <div>
              <label htmlFor="p-email" className="block text-sm font-medium text-ink mb-2">
                {f.email} <span className="text-orange">{f.required}</span>
              </label>
              <input
                id="p-email"
                name="email"
                type="email"
                required
                maxLength={254}
                value={formData.email}
                onChange={handleChange}
                placeholder={f.emailPlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-line bg-white text-sm text-ink placeholder:text-subtle focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 transition-all duration-300"
              />
            </div>
          </div>

          {/* Company + Clients */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="p-company" className="block text-sm font-medium text-ink mb-2">
                {f.company} <span className="text-orange">{f.required}</span>
              </label>
              <input
                id="p-company"
                name="company"
                type="text"
                required
                maxLength={200}
                value={formData.company}
                onChange={handleChange}
                placeholder={f.companyPlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-line bg-white text-sm text-ink placeholder:text-subtle focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 transition-all duration-300"
              />
            </div>
            <div>
              <label htmlFor="p-clients" className="block text-sm font-medium text-ink mb-2">
                {f.clients}
              </label>
              <input
                id="p-clients"
                name="clients"
                type="text"
                maxLength={50}
                value={formData.clients}
                onChange={handleChange}
                placeholder={f.clientsPlaceholder}
                className="w-full px-4 py-3 rounded-xl border border-line bg-white text-sm text-ink placeholder:text-subtle focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 transition-all duration-300"
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="p-message" className="block text-sm font-medium text-ink mb-2">
              {f.message} <span className="text-orange">{f.required}</span>
            </label>
            <textarea
              id="p-message"
              name="message"
              required
              maxLength={3000}
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder={f.messagePlaceholder}
              className="w-full px-4 py-3 rounded-xl border border-line bg-white text-sm text-ink placeholder:text-subtle focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 transition-all duration-300 resize-none"
            />
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={status === "sending"}
            whileTap={{ scale: 0.98 }}
            className={`group w-full font-medium text-sm py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
              status === "sending"
                ? "bg-green/50 text-white/70 cursor-not-allowed"
                : "bg-green text-white shadow-[0_4px_20px_rgba(0,129,74,0.25)] hover:bg-forest hover:shadow-[0_8px_30px_rgba(0,129,74,0.35)]"
            }`}
          >
            {status === "sending" ? (
              <>
                <motion.span
                  className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
                {f.sending}
              </>
            ) : (
              <>
                {f.submit}
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </>
            )}
          </motion.button>

          <p className="text-[11px] text-subtle text-center leading-relaxed">{f.privacy}</p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}

/* ================================================================
   MAIN PAGE
   ================================================================ */

export default function PartenairesPage() {
  const { t, locale } = useDictionary();

  return (
    <>
      {/* ─── HERO ──────────────────────────────────────────── */}
      <section className="relative pt-32 pb-8 md:pt-44 md:pb-16 overflow-hidden">
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
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-orange bg-orange-light/50 border border-orange/10 px-5 py-2 rounded-full shadow-[0_2px_8px_rgba(232,117,42,0.06)]">
              <span className="w-1.5 h-1.5 bg-orange rounded-full animate-pulse" />
              {t.partners.hero.eyebrow}
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-forest text-center max-w-5xl mx-auto"
          >
            {t.partners.hero.title1}
            <br />
            <span className="italic text-green">{t.partners.hero.titleHighlight}</span>
            <br />
            {t.partners.hero.title2}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto mt-7 leading-relaxed text-center"
          >
            {t.partners.hero.subtitle}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          >
            <a
              href="#candidater"
              className="group bg-green text-white font-medium px-8 py-3.5 rounded-full text-sm shadow-[0_4px_20px_rgba(0,129,74,0.25)] hover:bg-forest hover:shadow-[0_8px_30px_rgba(0,129,74,0.35)] transition-all duration-300 inline-flex items-center gap-2"
            >
              {t.partners.cta.form.submit}
              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
            </a>
            <Link
              href={`/${locale}/contact`}
              className="border-2 border-green/20 text-ink px-8 py-3.5 rounded-full text-sm hover:border-green hover:text-green hover:shadow-[0_4px_16px_rgba(0,129,74,0.08)] transition-all duration-300"
            >
              {t.common.requestDemo}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─── NETWORK VISUAL ────────────────────────────────── */}
      <section className="pb-16 md:pb-24 overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <NetworkVisual />
        </div>
      </section>

      {/* ─── PARTNER MODEL / FLOW ──────────────────────────── */}
      <section className="py-24 md:py-36 bg-sand/40">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase text-green">
              {t.partners.model.eyebrow}
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-forest mt-4 leading-tight">
              {t.partners.model.title}{" "}
              <span className="italic text-green">{t.partners.model.titleHighlight}</span>
            </h2>
          </FadeIn>

          <FlowDiagram />
        </div>
      </section>



      {/* ─── BENEFITS — Dark section ──────────────────────── */}
      <section className="py-24 md:py-36 bg-forest relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 rotate-[12deg] scale-150 opacity-[0.04]"
            style={{
              background: "linear-gradient(135deg, #00814A 0%, transparent 50%)",
            }}
          />
          <div
            className="absolute inset-0 -rotate-[8deg] scale-150 opacity-[0.03]"
            style={{
              background: "linear-gradient(225deg, #E8752A 0%, transparent 40%)",
            }}
          />
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-green/12 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-orange/8 rounded-full blur-[100px]" />
          {/* Grain texture */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
            <filter id="grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#grain)" />
          </svg>
          {/* Horizon line */}
          <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase text-orange-muted">
              {t.partners.benefits.eyebrow}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mt-4 leading-[1.1]">
              {t.partners.benefits.title}{" "}
              <span className="italic text-green-muted">{t.partners.benefits.titleHighlight}</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.partners.benefits.items.map(
              (item: { title: string; description: string }, i: number) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="group relative rounded-xl border border-white/15 bg-white/[0.06] backdrop-blur-sm p-6 md:p-8 hover:bg-white/[0.1] hover:border-white/25 transition-all duration-400 h-full">
                    {/* Icon */}
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-green-muted mb-5 group-hover:bg-green/20 group-hover:text-green-light transition-all duration-300">
                      {benefitIcons[i]}
                    </div>

                    <h3 className="text-base font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{item.description}</p>

                    {/* Subtle corner glow on hover */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-green/0 group-hover:bg-green/10 rounded-full blur-2xl transition-all duration-500 -translate-y-1/2 translate-x-1/2" />
                  </div>
                </FadeIn>
              )
            )}
          </div>
        </div>
      </section>

      {/* ─── EXPECTATIONS — Dialogue Axis ────────────────── */}
      <section className="py-28 md:py-44 bg-sand/40 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-24 md:mb-32">
            <span className="text-sm font-semibold tracking-widest uppercase text-green">
              {t.partners.expectations.eyebrow}
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-forest mt-4 leading-tight">
              {t.partners.expectations.title}{" "}
              <span className="italic text-green">{t.partners.expectations.titleHighlight}</span>
            </h2>
          </FadeIn>

          {/* Dialogue axis container */}
          <div className="relative">
            {/* Central vertical axis line (desktop: center, mobile: left) */}
            <motion.div
              className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
              style={{
                background: "linear-gradient(to bottom, transparent, var(--color-green) 10%, var(--color-forest) 50%, var(--color-green) 90%, transparent)",
                opacity: 0.25,
              }}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.8, ease }}
            />

            {/* Expectation items */}
            {t.partners.expectations.items.map(
              (item: { title: string; description: string }, i: number) => {
                const isLeft = i % 2 === 0;
                const accentColor = i === 1 ? "orange" : "green";
                return (
                  <ExpectationNode
                    key={i}
                    title={item.title}
                    description={item.description}
                    index={i}
                    isLeft={isLeft}
                    accentColor={accentColor}
                  />
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* ─── APPLICATION FORM CTA ──────────────────────────── */}
      <section id="candidater" className="py-24 md:py-36 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            {/* Left — Text + visual */}
            <FadeIn>
              <span className="text-sm font-semibold tracking-widest uppercase text-orange">
                {t.partners.cta.eyebrow}
              </span>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-forest mt-4 leading-tight">
                {t.partners.cta.title1}{" "}
                <span className="italic text-green">{t.partners.cta.titleHighlight}</span>
              </h2>
              <p className="text-muted leading-relaxed mt-6 max-w-lg">
                {t.partners.cta.description}
              </p>

              {/* Trust signals */}
              <div className="mt-10 space-y-4">
                {[
                  { icon: "✓", text: t.common.hostedInFrance },
                  { icon: "✓", text: t.common.gdprCompliant },
                  { icon: "✓", text: t.common.noCreditCard },
                  { icon: "✓", text: t.common.noCommitment },
                ].map((signal, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-light flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-ink-light">{signal.text}</span>
                  </motion.div>
                ))}
              </div>
            </FadeIn>

            {/* Right — Form */}
            <FadeIn delay={0.2}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-green-light/20 via-transparent to-orange-light/10 rounded-[2rem] blur-2xl" />
                <div className="relative bg-white rounded-2xl border border-line shadow-[0_12px_80px_rgba(27,58,45,0.08)] overflow-hidden">
                  {/* Window bar */}
                  <div className="flex items-center gap-2 px-6 py-4 border-b border-line bg-sand/50">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-300/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-300/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-300/60" />
                    </div>
                    <span className="ml-3 text-[11px] text-muted tracking-wide">yumni.fr / partenaires</span>
                  </div>

                  <div className="p-6 md:p-10">
                    <PartnerForm />
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA — Island ────────────────────────────── */}
      <section className="my-12 md:my-20 mx-4 md:mx-8 lg:mx-12">
        <div className="relative bg-forest rounded-3xl overflow-hidden">
          {/* Decorative layers */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 rotate-[12deg] scale-150 opacity-[0.06]" style={{ background: "linear-gradient(135deg, #00814A 0%, transparent 50%)" }} />
            <div className="absolute inset-0 -rotate-[8deg] scale-150 opacity-[0.04]" style={{ background: "linear-gradient(225deg, #E8752A 0%, transparent 40%)" }} />
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-green/12 rounded-full blur-[120px]" />
            <div className="absolute bottom-1/3 right-1/4 w-[300px] h-[300px] bg-orange/8 rounded-full blur-[100px]" />
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
              <filter id="grainCta">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#grainCta)" />
            </svg>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            {/* Corner arcs */}
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full border border-white/[0.04]" />
            <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full border border-white/[0.03]" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border border-white/[0.04]" />
            <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full border border-white/[0.03]" />
          </div>

          <div className="relative pt-24 md:pt-36 pb-16 md:pb-24">
            <div className="max-w-3xl mx-auto px-6 text-center">
              <FadeIn>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
                  {t.partners.finalCta.title1}{" "}
                  <span className="italic text-green-muted">{t.partners.finalCta.titleHighlight}</span>
                </h2>
                <p className="text-white/60 leading-relaxed mt-6 max-w-xl mx-auto">
                  {t.partners.finalCta.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                  <Link
                    href={`/${locale}/essai-gratuit`}
                    className="group bg-white text-forest font-semibold px-10 py-4 rounded-full text-sm shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:bg-green-light hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-300 inline-flex items-center gap-2"
                  >
                    {t.partners.finalCta.cta1}
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </Link>
                  <Link
                    href={`/${locale}/tarifs`}
                    className="border border-white/20 text-white px-10 py-4 rounded-full text-sm hover:bg-white/10 hover:border-white/40 transition-all"
                  >
                    {t.partners.finalCta.cta2}
                  </Link>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
