"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useDictionary } from "../dictionary-provider";
import { track } from "../../lib/analytics";

const ease = [0.22, 1, 0.36, 1] as const;

const CALENDLY_BASE =
  "https://calendly.com/yumni-sas/30min?hide_event_type_details=1&hide_gdpr_banner=1&hide_landing_page_details=1&background_color=ffffff&text_color=1B3A2D&primary_color=00814A";

/* ================================================================
   SINGLE-SCREEN BOOKING — Split-panel layout
   Left:  Value proposition + social proof (dark forest)
   Right: Calendly inline embed (white, full height)
   Desktop: h-dvh, zero scroll
   Mobile:  stacked, scroll allowed
   ================================================================ */

export default function DemoPage() {
  const { t, locale } = useDictionary();
  const router = useRouter();
  const pathname = usePathname();
  const calendlyUrl = `${CALENDLY_BASE}&locale=${locale === "fr" ? "fr" : "en"}`;

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
    router.push(segments.join("/"));
  }

  useEffect(() => {
    document.body.classList.add("demo-tunnel");
    return () => document.body.classList.remove("demo-tunnel");
  }, []);

  useEffect(() => {
    function onCalendlyMessage(e: MessageEvent) {
      if (e.data?.event === "calendly.event_scheduled") {
        track("calendly_booked");
      }
    }
    window.addEventListener("message", onCalendlyMessage);
    return () => window.removeEventListener("message", onCalendlyMessage);
  }, []);

  return (
    <div className="min-h-dvh lg:h-dvh w-full flex flex-col lg:flex-row lg:overflow-hidden bg-white">
      {/* ─── LEFT PANEL — Conversion copy ────────────────── */}
      <div className="relative lg:w-[42%] xl:w-[40%] 2xl:w-[38%] shrink-0 bg-forest text-white">
        {/* Grain texture */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none mix-blend-overlay"
          aria-hidden="true"
        >
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.7"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {/* Ambient glow orbs */}
        <div className="absolute top-[-10%] right-[-5%] w-80 h-80 bg-emerald-500/[0.06] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-5%] left-[-10%] w-64 h-64 bg-emerald-400/[0.04] rounded-full blur-[100px] pointer-events-none" />

        {/* Edge glow separator — desktop */}
        <div className="hidden lg:block absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-emerald-400/20 to-transparent z-20" />

        <div className="relative z-10 flex flex-col h-full p-5 sm:p-6 lg:p-8 xl:p-10 2xl:p-12">
          {/* ── Top bar ── */}
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2.5 group"
            >
              <Image
                src="/yumni.png"
                alt="Yumni"
                width={24}
                height={24}
                className="w-6 h-6 brightness-0 invert opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <span className="font-display text-lg text-white/80 group-hover:text-white transition-colors">
                Yumni
              </span>
            </Link>

            {/* Language switcher — center */}
            <div className="flex items-center rounded-lg border border-white/[0.08] bg-white/[0.04] p-0.5">
              <button
                onClick={() => switchLocale("fr")}
                className={`text-xs font-medium px-2.5 py-1 rounded-md transition-all duration-200 cursor-pointer ${
                  locale === "fr"
                    ? "bg-white/[0.12] text-white shadow-sm"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => switchLocale("en")}
                className={`text-xs font-medium px-2.5 py-1 rounded-md transition-all duration-200 cursor-pointer ${
                  locale === "en"
                    ? "bg-white/[0.12] text-white shadow-sm"
                    : "text-white/30 hover:text-white/60"
                }`}
              >
                EN
              </button>
            </div>

            {/* Back to site — right */}
            <Link
              href={`/${locale}`}
              className="text-sm font-medium text-white/50 hover:text-white transition-colors flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04] backdrop-blur-sm"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              {t.demo.tunnel.backToSite}
            </Link>
          </div>

          {/* ── Hero headline ── */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05, ease }}
            className="font-display text-[1.55rem] sm:text-[1.8rem] lg:text-[1.9rem] xl:text-[2.2rem] 2xl:text-[2.5rem] leading-[1.1] tracking-tight text-white mb-3 lg:mb-4 mt-8 lg:mt-12"
          >
            {t.demo.tunnel.title1}{" "}
            <span className="italic text-emerald-300">
              {t.demo.tunnel.titleHighlight}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease }}
            className="text-white/45 text-[13px] lg:text-sm leading-relaxed mb-6 lg:mb-8 max-w-[26rem]"
          >
            {t.demo.tunnel.calendlySubtitle}
          </motion.p>

          {/* ── Benefits — desktop only ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.18, ease }}
            className="hidden lg:flex flex-col gap-3 mb-auto"
          >
            {t.demo.tunnel.benefits.map(
              (b: { icon: string; text: string }, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.22 + i * 0.08, ease }}
                  className="flex items-start gap-3"
                >
                  <svg
                    className="w-4 h-4 text-emerald-400/60 shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-[13px] text-white/50 leading-snug">
                    {b.text}
                  </span>
                </motion.div>
              )
            )}
          </motion.div>

          {/* ── Trust badges ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.32, ease }}
            className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-3 border-t border-white/[0.06] lg:mt-8 mt-auto"
          >
            {[t.demo.trust.noCommitment, t.demo.trust.noSharing, t.demo.trust.response].map(
              (text: string, i: number) => (
                <span
                  key={i}
                  className="flex items-center gap-1 text-[11px] text-white/25"
                >
                  <svg
                    className="w-3 h-3 text-emerald-400/40 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  {text}
                </span>
              )
            )}
          </motion.div>
        </div>
      </div>

      {/* ─── RIGHT PANEL — Calendly embed ────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.25, ease }}
        className="flex-1 min-h-[680px] lg:min-h-0 relative bg-white"
      >
        {/* Soft shadow cast from left panel */}
        <div className="hidden lg:block absolute top-0 left-0 w-5 h-full bg-gradient-to-r from-black/[0.03] to-transparent pointer-events-none z-10" />

        {/* Loading placeholder (behind iframe) */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-7 h-7 rounded-full border-2 border-green/20 border-t-green animate-spin" />
        </div>

        <iframe
          src={calendlyUrl}
          frameBorder="0"
          title={t.demo.calendly.title}
          className="relative z-[1] w-full h-full min-h-[680px] lg:min-h-0 border-0"
          allow="payment"
          loading="eager"
        />
      </motion.div>
    </div>
  );
}
