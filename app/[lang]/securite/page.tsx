"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useInView,
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
   SHIELD VISUAL — Hero visual with animated layers
   ================================================================ */

function ShieldVisual() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative w-full max-w-md mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, delay: 0.2, ease }}
    >
      {/* Shield container */}
      <div className="relative aspect-square">
        {/* Rotating outer ring */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-full h-full rounded-full border-2 border-dashed border-green/20" />
        </motion.div>

        {/* Concentric circles */}
        {[1, 0.78, 0.56, 0.34].map((scale, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={inView ? { scale, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease }}
          >
            <div
              className={`w-full h-full rounded-full border ${
                i === 0
                  ? "border-green/10 bg-green/[0.02]"
                  : i === 1
                  ? "border-green/20 bg-green/[0.03]"
                  : i === 2
                  ? "border-green/30 bg-green/[0.05]"
                  : "border-green bg-green/10"
              }`}
            />
          </motion.div>
        ))}

        {/* Center lock icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.7, type: "spring", stiffness: 200 }}
        >
          <div className="w-20 h-20 rounded-2xl bg-green flex items-center justify-center shadow-[0_8px_40px_rgba(0,129,74,0.4)]">
            <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
        </motion.div>

        {/* Floating badges */}
        {[
          { label: "TLS 1.3", angle: -30, delay: 0.8 },
          { label: "AES-256", angle: 45, delay: 0.9 },
          { label: "MFA", angle: 150, delay: 1.0 },
          { label: "RGPD", angle: 210, delay: 1.1 },
        ].map((badge, i) => {
          const radius = 160;
          const x = Math.cos((badge.angle * Math.PI) / 180) * radius;
          const y = Math.sin((badge.angle * Math.PI) / 180) * radius;
          return (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ x, y }}
              initial={{ scale: 0, opacity: 0 }}
              animate={inView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: badge.delay, type: "spring" }}
            >
              <motion.div
                className="px-3 py-1.5 rounded-full bg-white border border-green/20 shadow-[0_4px_20px_rgba(0,129,74,0.1)] text-[11px] font-semibold text-green tracking-wide whitespace-nowrap"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
              >
                {badge.label}
              </motion.div>
            </motion.div>
          );
        })}

        {/* Pulse rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <motion.div
            className="absolute w-32 h-32 rounded-full border border-green/30"
            animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
          />
          <motion.div
            className="absolute w-32 h-32 rounded-full border border-green/30"
            animate={{ scale: [1, 1.8], opacity: [0.5, 0] }}
            transition={{ duration: 2.5, delay: 1.25, repeat: Infinity, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================
   ENCRYPTION PROTOCOL — Visual display
   ================================================================ */

function EncryptionProtocol({ item }: { item: { label: string; protocol: string; description: string } }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease }}
    >
      <div className="relative p-6 rounded-2xl border border-line bg-white hover:border-green/30 hover:shadow-[0_8px_40px_rgba(0,129,74,0.08)] transition-all duration-300">
        {/* Protocol badge */}
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-green-light flex items-center justify-center">
            <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
          </div>
          <span className="text-xs font-semibold tracking-widest uppercase text-green">
            {item.label}
          </span>
        </div>

        {/* Protocol name */}
        <div className="font-display text-4xl md:text-5xl text-forest tracking-tight leading-none mb-4 group-hover:text-green transition-colors duration-300">
          {item.protocol}
        </div>

        {/* Description */}
        <p className="text-sm text-muted leading-relaxed">
          {item.description}
        </p>

        {/* Check mark */}
        <div className="absolute top-6 right-6">
          <div className="w-6 h-6 rounded-full bg-green-light flex items-center justify-center">
            <svg className="w-3 h-3 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================
   TLS DATA FLOW — Improved animation
   ================================================================ */

function TLSDataFlow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <FadeIn>
      <div ref={ref} className="relative overflow-hidden rounded-3xl border border-line bg-white p-8 md:p-12 shadow-[0_8px_60px_rgba(27,58,45,0.06)]">
        <div className="flex items-center justify-between gap-8 flex-wrap lg:flex-nowrap">
          {/* Browser */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-green-light border border-green/20 flex items-center justify-center shadow-sm">
              <svg className="w-7 h-7 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-semibold text-ink block">Votre navigateur</span>
              <span className="text-xs text-muted">Connexion sécurisée</span>
            </div>
          </div>

          {/* Animated flow line with packets */}
          <div className="flex-1 relative h-16 flex items-center min-w-[200px]">
            {/* Line background */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 rounded-full bg-gradient-to-r from-green/20 via-green/40 to-green/20" />
            
            {/* Flow direction arrow marks */}
            <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 flex justify-between">
              {[0, 1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rotate-45 border-r border-t border-green/30"
                  initial={{ opacity: 0 }}
                  animate={inView ? { opacity: [0.3, 0.8, 0.3] } : {}}
                  transition={{ duration: 2.8, delay: i * 0.4, repeat: Infinity }}
                />
              ))}
            </div>

            {/* Animated data packets */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 -translate-y-1/2"
                initial={{ left: "0%", opacity: 0 }}
                animate={inView ? {
                  left: ["0%", "100%"],
                  opacity: [0, 1, 1, 0],
                } : {}}
                transition={{
                  duration: 4.5,
                  delay: i * 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="w-4 h-4 rounded-md bg-green shadow-[0_0_12px_rgba(0,129,74,0.5),0_0_24px_rgba(0,129,74,0.3)]">
                  <div className="w-full h-full rounded-md bg-gradient-to-br from-green to-green/80" />
                </div>
              </motion.div>
            ))}

            {/* TLS badge in center */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.div
                className="px-4 py-2 rounded-full bg-white border-2 border-green shadow-lg"
                initial={{ scale: 0 }}
                animate={inView ? { scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3, type: "spring" }}
              >
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <span className="text-xs font-bold text-green tracking-wider">TLS 1.3</span>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Server */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-14 h-14 rounded-2xl bg-forest flex items-center justify-center shadow-[0_4px_20px_rgba(27,58,45,0.2)]">
              <svg className="w-7 h-7 text-green-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
              </svg>
            </div>
            <div>
              <span className="text-sm font-semibold text-ink block">Serveur Yumni</span>
              <span className="text-xs text-muted">Scaleway fr-par · France 🇫🇷</span>
            </div>
          </div>
        </div>

        {/* Bottom security indicators */}
        <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-line">
          {[
            { icon: "🔒", label: "Chiffrement bout en bout" },
            { icon: "🛡️", label: "AES-256 au repos" },
            { icon: "✓", label: "Certificat vérifié" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-2 text-xs text-muted"
              initial={{ opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}

/* ================================================================
   RBAC VISUAL — Permission hierarchy with horizontal layers
   ================================================================ */

function RBACPyramid({ levels }: { levels: { role: string; description: string; color: string }[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const widths = ["100%", "82%", "64%", "46%"];
  const colorMap: Record<string, { bar: string; dot: string; text: string }> = {
    green: { bar: "bg-green", dot: "bg-green", text: "text-green" },
    orange: { bar: "bg-orange/60", dot: "bg-orange", text: "text-orange" },
    muted: { bar: "bg-muted/30", dot: "bg-muted", text: "text-muted" },
  };

  return (
    <div ref={ref} className="max-w-xl mx-auto lg:mx-0">
      {/* Visual hierarchy bars */}
      <div className="space-y-6">
        {levels.map((level, i) => {
          const colors = colorMap[level.color] || colorMap.muted;
          return (
            <motion.div
              key={i}
              className="relative"
              initial={{ opacity: 0, x: -32 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1, ease }}
            >
              {/* Horizontal permission bar */}
              <div className="relative">
                {/* Permission level indicator bar */}
                <div className="flex items-center gap-4">
                  {/* Animated bar showing permission scope */}
                  <motion.div
                    className={`h-1.5 rounded-full ${colors.bar}`}
                    style={{ width: widths[i] }}
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={inView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease }}
                  />
                  
                  {/* Node indicator */}
                  <motion.div
                    className={`w-3 h-3 rounded-full ${colors.dot} shrink-0`}
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.1, ease }}
                  />
                </div>

                {/* Role name and description */}
                <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className={`font-semibold text-sm ${colors.text}`}>
                    {level.role}
                  </span>
                  <span className="text-xs text-muted leading-relaxed">
                    {level.description}
                  </span>
                </div>

                {/* Connecting line to next level */}
                {i < levels.length - 1 && (
                  <motion.div
                    className="absolute left-0 top-full w-px h-4 bg-gradient-to-b from-line to-transparent"
                    style={{ marginLeft: `calc(${widths[i]} - 1px)` }}
                    initial={{ scaleY: 0, originY: 0 }}
                    animate={inView ? { scaleY: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.6 + i * 0.1 }}
                  />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Permission legend */}
      <motion.div
        className="mt-10 pt-6 border-t border-line flex flex-wrap gap-6"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <div className="flex items-center gap-2 text-xs text-muted">
          <div className="w-8 h-1 rounded-full bg-green" />
          <span>Accès complet</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted">
          <div className="w-6 h-1 rounded-full bg-orange/60" />
          <span>Accès partiel</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted">
          <div className="w-4 h-1 rounded-full bg-muted/30" />
          <span>Lecture seule</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ================================================================
   GDPR RIGHT PILL — expandable
   ================================================================ */

function GDPRRight({ title, description, index }: { title: string; description: string; index: number }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.09, ease }}
    >
      <button
        className="w-full text-left group"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-4 py-5 border-b border-line/60 group-hover:border-green/30 transition-colors duration-300">
          {/* Index number */}
          <span className="font-display text-xs tracking-widest text-green/50 w-6 shrink-0">
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Title */}
          <span className={`flex-1 font-semibold text-sm transition-colors duration-300 ${open ? "text-green" : "text-ink group-hover:text-green"}`}>
            {title}
          </span>

          {/* Arrow */}
          <motion.svg
            className={`w-4 h-4 shrink-0 transition-colors duration-300 ${open ? "text-green" : "text-subtle"}`}
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.25 }}
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </motion.svg>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28 }}
              className="overflow-hidden"
            >
              <p className="text-sm text-muted leading-relaxed py-4 pl-10 pr-6">
                {description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

/* ================================================================
   CERTIFICATION BADGE — timeline item
   ================================================================ */

function CertBadge({
  name,
  status,
  label,
  description,
  index,
}: {
  name: string;
  status: string;
  label: string;
  description: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const statusConfig = {
    active: {
      bg: "bg-green-light",
      text: "text-green",
      border: "border-green/20",
      dot: "bg-green",
      dotAnim: true,
    },
    progress: {
      bg: "bg-orange-light",
      text: "text-orange",
      border: "border-orange/20",
      dot: "bg-orange",
      dotAnim: false,
    },
    roadmap: {
      bg: "bg-sand",
      text: "text-muted",
      border: "border-line",
      dot: "bg-subtle",
      dotAnim: false,
    },
  }[status] ?? {
    bg: "bg-sand",
    text: "text-muted",
    border: "border-line",
    dot: "bg-subtle",
    dotAnim: false,
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.12, ease }}
      className="relative group"
    >
      {/* Connector line */}
      {index < 3 && (
        <div className="hidden md:block absolute top-7 left-[calc(100%+0px)] w-full h-px bg-gradient-to-r from-line to-transparent z-0" />
      )}

      <div className={`relative z-10 p-6 rounded-2xl border ${statusConfig.border} ${statusConfig.bg} transition-all duration-300 hover:shadow-md`}>
        {/* Status dot */}
        <div className="flex items-center gap-2.5 mb-4">
          <span className={`w-2.5 h-2.5 rounded-full ${statusConfig.dot} ${statusConfig.dotAnim ? "animate-pulse" : ""}`} />
          <span className={`text-[11px] font-semibold tracking-widest uppercase ${statusConfig.text}`}>
            {label}
          </span>
        </div>

        <div className={`font-display text-xl font-semibold text-forest mb-2`}>{name}</div>
        <p className="text-xs text-muted leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

/* ================================================================
   AUTH ITEM — stacked list
   ================================================================ */

function AuthItem({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease }}
      className="relative flex gap-5 group pb-8 last:pb-0"
    >
      {/* Vertical connector */}
      <div className="flex flex-col items-center shrink-0">
        <div className="w-8 h-8 rounded-full bg-green-light border border-green/20 flex items-center justify-center shrink-0 group-hover:bg-green group-hover:border-green transition-all duration-300">
          <svg className="w-4 h-4 text-green group-hover:text-white transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        {index < 4 && (
          <div className="w-px flex-1 bg-gradient-to-b from-green/20 to-transparent mt-2 min-h-[2rem]" />
        )}
      </div>

      <div className="pt-0.5">
        <h3 className="text-sm font-semibold text-ink mb-1 group-hover:text-green transition-colors duration-300">
          {title}
        </h3>
        <p className="text-sm text-muted leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}

/* ================================================================
   HOSTING STAT LIGHT — metric display for light backgrounds
   ================================================================ */

function HostingStatLight({ label, value, detail, index }: { label: string; value: string; detail: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl border border-line bg-white p-6 hover:border-green/30 hover:shadow-[0_8px_40px_rgba(0,129,74,0.08)] transition-all duration-300">
        <div className="text-xs font-semibold tracking-widest uppercase text-muted mb-2">{label}</div>
        <div className="font-display text-2xl font-semibold text-forest mb-1 group-hover:text-green transition-colors">{value}</div>
        <div className="text-xs text-muted">{detail}</div>
        <div className="absolute top-4 right-4">
          <div className="w-8 h-8 rounded-lg bg-green-light flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================
   MAIN PAGE
   ================================================================ */

export default function SecuritePage() {
  const { t, locale } = useDictionary();
  const s = t.security;

  return (
    <>
      {/* ─── HERO — Centered style matching /tarifs ─────────────────────────── */}
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
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="flex justify-center mb-6"
          >
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-green bg-green-light/50 border border-green/10 px-5 py-2 rounded-full shadow-[0_2px_8px_rgba(0,129,74,0.06)]">
              <span className="w-1.5 h-1.5 bg-green rounded-full animate-pulse" />
              {s.hero.eyebrow}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-forest max-w-4xl mx-auto"
          >
            {s.hero.title}{" "}<br className="hidden sm:block" /><span className="italic text-green">{s.hero.titleHighlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            className="text-lg md:text-xl text-muted max-w-2xl mx-auto mt-7 leading-relaxed"
          >
            {s.hero.subtitle}
          </motion.p>

          {/* Trust pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mt-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.24, ease }}
          >
            {["TLS 1.3", "AES-256", "MFA", "RGPD", "🇫🇷 France"].map((pill, i) => (
              <span
                key={i}
                className="text-xs font-semibold tracking-wider uppercase text-green border border-green/20 bg-green-light/50 px-3 py-1.5 rounded-full"
              >
                {pill}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── Trust Strip — matching homepage style ─────────────────── */}
      <section className="relative py-7 md:py-8 bg-forest overflow-hidden">
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
            {s.hero.statusItems.map((item: { label: string; value: string }, i: number) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-green-muted group-hover:bg-white/15 transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-base font-bold text-white leading-tight">{item.label}</div>
                    <div className="text-sm text-white/50 leading-tight mt-0.5">{item.value}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOSTING & SOVEREIGNTY ─────────────────────────── */}
      <section className="py-24 md:py-36 bg-sand/40 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-green-light/40 blur-[100px]" />
          <div className="absolute bottom-0 -left-32 w-[400px] h-[400px] rounded-full bg-orange-light/20 blur-[80px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left — text */}
            <div>
              <FadeIn>
                <span className="text-sm font-semibold tracking-widest uppercase text-orange">
                  {s.hosting.eyebrow}
                </span>
                <h2 className="font-display text-4xl md:text-5xl text-forest mt-4 leading-tight">
                  {s.hosting.title}
                  <br />
                  <span className="italic text-green">{s.hosting.titleHighlight}</span>
                </h2>
                <p className="text-muted leading-relaxed mt-5 text-base max-w-md">
                  {s.hosting.description}
                </p>
              </FadeIn>
            </div>

            {/* Right — hosting stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {s.hosting.items.map(
                (item: { label: string; value: string; detail: string }, i: number) => (
                  <HostingStatLight
                    key={i}
                    label={item.label}
                    value={item.value}
                    detail={item.detail}
                    index={i}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── ENCRYPTION ─────────────────────────────────────── */}
      <section className="py-24 md:py-36 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase text-green">
              {s.encryption.eyebrow}
            </span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-forest mt-4 leading-tight max-w-2xl">
              {s.encryption.title}
              <br />
              <span className="italic text-green">{s.encryption.titleHighlight}</span>
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[s.encryption.transit, s.encryption.rest, s.encryption.passwords].map(
              (item, i) => (
                <EncryptionProtocol key={i} item={item} />
              )
            )}
          </div>

          {/* TLS Data Flow visualization */}
          <div className="mt-16">
            <TLSDataFlow />
          </div>
        </div>
      </section>

      {/* ─── AUTHENTICATION ──────────────────────────────────── */}
      <section className="py-24 md:py-36 bg-sand/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — sticky heading */}
            <div className="lg:sticky lg:top-32">
              <FadeIn>
                <span className="text-sm font-semibold tracking-widest uppercase text-green">
                  {s.auth.eyebrow}
                </span>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-forest mt-4 leading-[1.1]">
                  {s.auth.title}
                  <br />
                  <span className="italic text-green">{s.auth.titleHighlight}</span>
                </h2>
                <p className="text-muted leading-relaxed mt-5 max-w-sm text-base">
                  {s.auth.description}
                </p>

                {/* Security score display */}
                <div className="mt-10 inline-flex items-center gap-4 bg-forest rounded-2xl px-6 py-4">
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5">Score défense</div>
                    <div className="font-display text-3xl text-white font-semibold">A+</div>
                  </div>
                  <div className="w-px h-10 bg-white/10" />
                  <div className="space-y-1">
                    {["Auth", "Réseau", "Données"].map((l, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-16 h-1 rounded-full bg-white/10 overflow-hidden">
                          <motion.div
                            className="h-full bg-green rounded-full"
                            initial={{ width: "0%" }}
                            whileInView={{ width: ["95%", "100%", "98%"][i] }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.5 + i * 0.1, ease }}
                          />
                        </div>
                        <span className="text-[10px] text-white/40">{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </FadeIn>
            </div>

            {/* Right — auth items list */}
            <div className="mt-4">
              {s.auth.items.map(
                (item: { title: string; description: string }, i: number) => (
                  <AuthItem
                    key={i}
                    title={item.title}
                    description={item.description}
                    index={i}
                  />
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ─── RBAC ────────────────────────────────────────────── */}
      <section className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — pyramid */}
            <div>
              <FadeIn className="mb-10">
                <span className="text-sm font-semibold tracking-widest uppercase text-green">
                  {s.rbac.eyebrow}
                </span>
                <h2 className="font-display text-4xl md:text-5xl text-forest mt-4 leading-tight">
                  {s.rbac.title}
                  <br />
                  <span className="italic text-green">{s.rbac.titleHighlight}</span>
                </h2>
                <p className="text-muted leading-relaxed mt-5 max-w-md text-sm">
                  {s.rbac.description}
                </p>
              </FadeIn>

              <RBACPyramid levels={s.rbac.levels} />
            </div>

            {/* Right — isolation callout */}
            <FadeIn delay={0.2} className="lg:mt-32">
              <div className="relative rounded-3xl bg-forest overflow-hidden">
                {/* background effects */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-green/10 rounded-full blur-[80px]" />
                  <svg className="absolute inset-0 w-full h-full opacity-[0.04]">
                    <filter id="rbacGrain">
                      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#rbacGrain)" />
                  </svg>
                </div>

                <div className="relative p-8 md:p-10">
                  {/* Org isolation diagram */}
                  <div className="space-y-3 mb-8">
                    {["Org. Cliente A", "Org. Cliente B", "Votre cabinet"].map((org, i) => (
                      <motion.div
                        key={i}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -16 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 + i * 0.1, ease }}
                      >
                        <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${i === 2 ? "bg-green" : "bg-white/30"}`} />
                        <div className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium ${
                          i === 2
                            ? "border-green/30 bg-green/10 text-green-muted"
                            : "border-white/[0.08] bg-white/[0.04] text-white/50"
                        }`}>
                          {org}
                          <span className={`ml-2 text-[10px] font-normal ${i === 2 ? "text-green/60" : "text-white/20"}`}>
                            {i === 2 ? "— accès lecture" : "— isolée par RLS"}
                          </span>
                        </div>
                        {i < 2 && (
                          <svg className="w-4 h-4 text-red-400/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
                          </svg>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  <div className="border-t border-white/[0.08] pt-6">
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 rounded-lg bg-green/20 flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                        </svg>
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed">
                        {s.rbac.isolation}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── GDPR ────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 bg-sand/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left — rights accordeon */}
            <div>
              <FadeIn className="mb-10">
                <span className="text-sm font-semibold tracking-widest uppercase text-green">
                  {s.gdpr.eyebrow}
                </span>
                <h2 className="font-display text-4xl md:text-5xl text-forest mt-4 leading-tight">
                  {s.gdpr.title}
                  <br />
                  <span className="italic text-green">{s.gdpr.titleHighlight}</span>
                </h2>
                <p className="text-muted leading-relaxed mt-5 max-w-md text-sm">
                  {s.gdpr.description}
                </p>
              </FadeIn>

              <div className="border-t border-line">
                {s.gdpr.rights.map(
                  (right: { title: string; description: string }, i: number) => (
                    <GDPRRight
                      key={i}
                      title={right.title}
                      description={right.description}
                      index={i}
                    />
                  )
                )}
              </div>
            </div>

            {/* Right — DPO contact callout */}
            <FadeIn delay={0.15} className="lg:mt-40">
              {/* Retention notice */}
              <div className="mb-6 flex items-start gap-3 text-sm text-muted">
                <svg className="w-4 h-4 text-green shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{s.gdpr.retention}</span>
              </div>

              {/* DPO contact card */}
              <div className="relative rounded-3xl border border-line bg-white shadow-[0_8px_60px_rgba(27,58,45,0.07)] overflow-hidden">
                {/* top accent */}
                <div className="h-1 bg-gradient-to-r from-green via-forest to-green" />
                <div className="p-8 md:p-10">
                  <div className="w-12 h-12 rounded-2xl bg-green-light flex items-center justify-center mb-5">
                    <svg className="w-6 h-6 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                    </svg>
                  </div>

                  <h3 className="font-display text-2xl text-forest mb-2">{s.gdpr.dpo}</h3>
                  <a
                    href={`mailto:${s.gdpr.dpoEmail}`}
                    className="text-green font-medium text-sm hover:text-forest transition-colors"
                  >
                    {s.gdpr.dpoEmail}
                  </a>

                  <div className="mt-8 pt-6 border-t border-line">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-light flex items-center justify-center shrink-0 mt-0.5">
                        <svg className="w-3 h-3 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </div>
                      <p className="text-sm text-muted leading-relaxed">
                        Réponse garantie sous 24h ouvrées. Droit à l'effacement traité sous 30 jours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── CERTIFICATIONS ────────────────────────────────── */}
      <section className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn className="text-center mb-16">
            <span className="text-sm font-semibold tracking-widest uppercase text-orange">
              {s.certifications.eyebrow}
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-forest mt-4 leading-tight">
              {s.certifications.title}{" "}
              <span className="italic text-green">{s.certifications.titleHighlight}</span>
            </h2>
            <p className="text-muted mt-5 max-w-xl mx-auto leading-relaxed text-sm">
              {s.certifications.description}
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative">
            {/* Timeline connector (desktop) */}
            <div className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-green/40 via-line to-line pointer-events-none" />

            {s.certifications.items.map(
              (cert: { name: string; status: string; label: string; description: string }, i: number) => (
                <CertBadge
                  key={i}
                  name={cert.name}
                  status={cert.status}
                  label={cert.label}
                  description={cert.description}
                  index={i}
                />
              )
            )}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ────────────────────────────────────────── */}
      <section className="my-12 md:my-20 mx-4 md:mx-8 lg:mx-12">
        <div className="relative bg-forest rounded-3xl overflow-hidden">
          {/* Decorative background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 rotate-[12deg] scale-150 opacity-[0.06]" style={{ background: "linear-gradient(135deg, #00814A 0%, transparent 50%)" }} />
            <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-green/12 rounded-full blur-[120px]" />
            <svg className="absolute inset-0 w-full h-full opacity-[0.03]">
              <filter id="ctaGrain">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
              </filter>
              <rect width="100%" height="100%" filter="url(#ctaGrain)" />
            </svg>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
            <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full border border-white/[0.04]" />
            <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full border border-white/[0.04]" />
          </div>

          <div className="relative py-24 md:py-36">
            <div className="max-w-2xl mx-auto px-6 text-center">
              <FadeIn>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-[1.1]">
                  {s.cta.title}{" "}
                  <span className="italic text-green-muted">{s.cta.titleHighlight}</span>
                </h2>
                <p className="text-white/50 leading-relaxed mt-6 max-w-lg mx-auto">
                  {s.cta.description}
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                  <a
                    href={`mailto:${s.gdpr.dpoEmail}`}
                    className="group bg-white text-forest font-semibold px-10 py-4 rounded-full text-sm shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:bg-green-light hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] transition-all duration-300 inline-flex items-center gap-2"
                  >
                    {s.cta.dpoButton}
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </a>
                  <Link
                    href={`/${locale}/essai-gratuit`}
                    className="border border-white/20 text-white px-10 py-4 rounded-full text-sm hover:bg-white/10 hover:border-white/40 transition-all"
                  >
                    {s.cta.trialButton}
                  </Link>
                </div>

                <p className="text-white/25 text-xs mt-6">{s.cta.trialSub}</p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
