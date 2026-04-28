"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useDictionary } from "../dictionary-provider";
import { track } from "../../lib/analytics";

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
   ANIMATED MAP / GLOBE VISUAL
   ================================================================ */

function GlobeVisual() {
  const { t, locale } = useDictionary();
  return (
    <div className="relative w-full aspect-square max-w-[380px] mx-auto">
      {/* Orbiting rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div className="absolute w-full h-full rounded-full border border-green/10" animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute w-[85%] h-[85%] rounded-full border border-green/8" animate={{ rotate: -360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute w-[70%] h-[70%] rounded-full border border-green/6" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} />
      </div>

      {/* Center glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 bg-green/10 rounded-full blur-3xl" />
      </div>

      {/* France dot — pulsing */}
      <div className="absolute top-[38%] left-[48%]">
        <div className="relative">
          <div className="w-3 h-3 bg-green rounded-full relative z-10" />
          <div className="absolute -inset-2 bg-green/20 rounded-full animate-pulse-ring" />
          <div className="absolute -inset-4 bg-green/10 rounded-full animate-pulse-ring" style={{ animationDelay: "0.5s" }} />
        </div>
        <div className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap">
          <span className="text-xs font-semibold text-forest bg-green-light/60 px-2.5 py-1 rounded-full border border-green/15">{t.common.france}</span>
        </div>
      </div>

      {/* Floating cards around the globe */}
      <motion.div className="absolute top-[10%] right-[5%] bg-white rounded-xl border border-line px-4 py-3 shadow-sm" animate={{ y: [-4, 4, -4] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-green-light flex items-center justify-center">
            <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /><circle cx="12" cy="12" r="10" strokeLinecap="round" /></svg>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-ink">{t.common.response}</div>
            <div className="text-[10px] text-muted">{t.common.lessThan24h}</div>
          </div>
        </div>
      </motion.div>

      <motion.div className="absolute bottom-[15%] left-[2%] bg-white rounded-xl border border-line px-4 py-3 shadow-sm" animate={{ y: [3, -5, 3] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-orange-light flex items-center justify-center">
            <svg className="w-4 h-4 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-ink">{t.common.gdpr}</div>
            <div className="text-[10px] text-muted">{t.common.compliant}</div>
          </div>
        </div>
      </motion.div>

      <motion.div className="absolute bottom-[5%] right-[10%] bg-white rounded-xl border border-line px-4 py-3 shadow-sm" animate={{ y: [-3, 5, -3] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-green-light flex items-center justify-center">
            <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>
          </div>
          <div>
            <div className="text-[11px] font-semibold text-ink">{t.common.scaleway}</div>
            <div className="text-[10px] text-muted">{t.common.frPar}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ================================================================
   SUCCESS STATE
   ================================================================ */

function SuccessState() {
  const { t, locale } = useDictionary();
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease }} className="text-center py-16 px-8">
      <motion.div className="w-20 h-20 mx-auto mb-8 rounded-full bg-green-light flex items-center justify-center" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}>
        <motion.svg className="w-10 h-10 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.5, ease }}>
          <motion.path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.5, ease }} />
        </motion.svg>
      </motion.div>

      <motion.h3 className="font-display text-3xl text-forest mb-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6, ease }}>
        {t.contact.success.title}
      </motion.h3>
      <motion.p className="text-muted leading-relaxed max-w-md mx-auto mb-8" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.7, ease }}>
        {t.contact.success.description}
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.8, ease }} className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link href={`/${locale}`} className="text-sm text-green font-medium hover:text-forest transition-colors">{t.common.back}</Link>
        <span className="text-line hidden sm:inline">|</span>
        <Link href="https://freemium-app.yumni.fr/fr/auth/login" target="_blank" rel="noopener noreferrer" className="bg-green text-white text-sm font-medium px-6 py-2.5 rounded-full hover:bg-forest transition-colors shadow-[0_4px_20px_rgba(0,129,74,0.25)]">{t.common.startFree}</Link>
      </motion.div>
    </motion.div>
  );
}

/* ================================================================
   MAIN PAGE
   ================================================================ */

export default function ContactPage() {
  const { t, locale } = useDictionary();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    type: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    track("contact_form_submit", { type: formData.type });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error || t.contact.errors.generic);
        track("contact_form_error", { type: formData.type });
        return;
      }

      setStatus("success");
      track("contact_form_success", { type: formData.type });
    } catch {
      setStatus("error");
      setErrorMsg(t.contact.errors.network);
      track("contact_form_error", { type: formData.type });
    }
  }

  const requestTypes = t.contact.requestTypes;

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

        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="flex justify-center mb-6">
            <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-green bg-green-light/50 border border-green/10 px-5 py-2 rounded-full shadow-[0_2px_8px_rgba(0,129,74,0.06)]">
              <span className="w-1.5 h-1.5 bg-green rounded-full animate-pulse" />
              {t.contact.hero.eyebrow}
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-forest max-w-4xl mx-auto">
            {t.contact.hero.title1}{" "}<span className="italic text-green">{t.contact.hero.titleHighlight}</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12, ease }} className="text-lg md:text-xl text-muted max-w-2xl mx-auto mt-7 leading-relaxed">
            {t.contact.hero.subtitle1}<br className="hidden md:block" />{t.contact.hero.subtitle2}
          </motion.p>
        </div>
      </section>

      {/* ─── MAIN CONTENT: FORM + VISUALS ─────────────────── */}
      <section className="pb-24 md:pb-36">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
            {/* ── LEFT: Contact Form ────────────────────────── */}
            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease }}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-green-light/20 via-transparent to-orange-light/10 rounded-[2rem] blur-2xl" />
                <div className="relative bg-white rounded-2xl border border-line shadow-[0_12px_80px_rgba(27,58,45,0.08)] overflow-hidden">
                  <div className="flex items-center gap-2 px-6 py-4 border-b border-line bg-sand/50">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-300/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-300/60" />
                      <span className="w-2.5 h-2.5 rounded-full bg-green-300/60" />
                    </div>
                    <span className="ml-3 text-[11px] text-muted tracking-wide">{t.contact.form.windowBar}</span>
                  </div>

                  <AnimatePresence mode="wait">
                    {status === "success" ? (
                      <SuccessState key="success" />
                    ) : (
                      <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.3 }} className="p-6 md:p-10 space-y-6">
                        {/* Name + Email */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">{t.contact.form.name} <span className="text-orange">{t.contact.form.required}</span></label>
                            <input id="name" name="name" type="text" required maxLength={200} value={formData.name} onChange={handleChange} placeholder={t.contact.form.namePlaceholder} className="w-full px-4 py-3 rounded-xl border border-line bg-white text-sm text-ink placeholder:text-subtle focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 transition-all duration-300" />
                          </div>
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">{t.contact.form.email} <span className="text-orange">{t.contact.form.required}</span></label>
                            <input id="email" name="email" type="email" required maxLength={254} value={formData.email} onChange={handleChange} placeholder={t.contact.form.emailPlaceholder} className="w-full px-4 py-3 rounded-xl border border-line bg-white text-sm text-ink placeholder:text-subtle focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 transition-all duration-300" />
                          </div>
                        </div>

                        {/* Phone + Company */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                          <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-ink mb-2">{t.contact.form.phone} <span className="text-subtle text-xs font-normal">{t.contact.form.phoneOptional}</span></label>
                            <input id="phone" name="phone" type="tel" maxLength={30} value={formData.phone} onChange={handleChange} placeholder={t.contact.form.phonePlaceholder} className="w-full px-4 py-3 rounded-xl border border-line bg-white text-sm text-ink placeholder:text-subtle focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 transition-all duration-300" />
                          </div>
                          <div>
                            <label htmlFor="company" className="block text-sm font-medium text-ink mb-2">{t.contact.form.company} <span className="text-orange">{t.contact.form.required}</span></label>
                            <input id="company" name="company" type="text" required maxLength={200} value={formData.company} onChange={handleChange} placeholder={t.contact.form.companyPlaceholder} className="w-full px-4 py-3 rounded-xl border border-line bg-white text-sm text-ink placeholder:text-subtle focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 transition-all duration-300" />
                          </div>
                        </div>

                        {/* Request type */}
                        <div>
                          <label htmlFor="type" className="block text-sm font-medium text-ink mb-2">{t.contact.form.requestType} <span className="text-orange">{t.contact.form.required}</span></label>
                          <div className="flex flex-wrap gap-2">
                            {requestTypes.map((type: string) => (
                              <button key={type} type="button" onClick={() => { setFormData((prev) => ({ ...prev, type })); track("contact_type_selected", { type }); }} className={`px-4 py-2.5 rounded-full text-sm transition-all duration-300 border cursor-pointer ${formData.type === type ? "bg-green text-white border-green shadow-[0_4px_16px_rgba(0,129,74,0.2)]" : "bg-white text-ink-light border-line hover:border-green/30 hover:bg-green-light/20"}`}>
                                {type}
                              </button>
                            ))}
                          </div>
                          <input type="hidden" name="type" value={formData.type} required />
                        </div>

                        {/* Message */}
                        <div>
                          <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">{t.contact.form.message} <span className="text-orange">{t.contact.form.required}</span></label>
                          <textarea id="message" name="message" required maxLength={5000} rows={5} value={formData.message} onChange={handleChange} placeholder={t.contact.form.messagePlaceholder} className="w-full px-4 py-3 rounded-xl border border-line bg-white text-sm text-ink placeholder:text-subtle focus:outline-none focus:border-green focus:ring-2 focus:ring-green/10 transition-all duration-300 resize-none" />
                          <div className="flex justify-end mt-1"><span className="text-[11px] text-subtle">{formData.message.length}/5000</span></div>
                        </div>

                        {/* Error */}
                        <AnimatePresence>
                          {status === "error" && (
                            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">{errorMsg}</div>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Submit */}
                        <motion.button type="submit" disabled={status === "sending" || !formData.type} whileTap={{ scale: 0.98 }} className={`group w-full font-medium text-sm py-4 rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${status === "sending" || !formData.type ? "bg-green/50 text-white/70 cursor-not-allowed" : "bg-green text-white shadow-[0_4px_20px_rgba(0,129,74,0.25)] hover:bg-forest hover:shadow-[0_8px_30px_rgba(0,129,74,0.35)]"}`}>
                          {status === "sending" ? (
                            <>
                              <motion.span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
                              {t.contact.form.sending}
                            </>
                          ) : (
                            <>
                              {t.contact.form.submit}
                              <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                            </>
                          )}
                        </motion.button>

                        {/* Privacy note */}
                        <p className="text-[11px] text-subtle text-center leading-relaxed">
                          {t.contact.form.privacy}{" "}
                          <Link href={`/${locale}/politique-confidentialite`} className="text-green hover:text-forest transition-colors underline underline-offset-2">{t.contact.form.privacyLink}</Link>
                          {t.contact.form.privacyEnd}
                        </p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* ── RIGHT: Visuals + Info ─────────────────────── */}
            <div className="space-y-10 lg:sticky lg:top-28">
              <FadeIn delay={0.3}><GlobeVisual /></FadeIn>

              <div className="space-y-4">
                <FadeIn delay={0.4}>
                  <a href="mailto:contact@yumni.fr" onClick={() => track("contact_email_click")} className="group flex items-center gap-4 p-5 rounded-xl border border-line bg-white hover:border-green/20 hover:shadow-[0_4px_16px_rgba(0,129,74,0.06)] transition-all duration-300">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-green-light/50 flex items-center justify-center group-hover:bg-green-light transition-colors">
                      <svg className="w-5 h-5 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ink group-hover:text-green transition-colors">{t.contact.info.emailLabel}</div>
                      <div className="text-xs text-muted">{t.contact.info.emailSub}</div>
                    </div>
                    <svg className="w-4 h-4 text-line-dark ml-auto group-hover:text-green group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                  </a>
                </FadeIn>

                <FadeIn delay={0.5}>
                  <a href="https://www.linkedin.com/company/yumni" target="_blank" rel="noopener noreferrer" onClick={() => track("contact_linkedin_click")} className="group flex items-center gap-4 p-5 rounded-xl border border-line bg-white hover:border-green/20 hover:shadow-[0_4px_16px_rgba(0,129,74,0.06)] transition-all duration-300">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-green-light/50 flex items-center justify-center group-hover:bg-green-light transition-colors">
                      <svg className="w-5 h-5 text-green" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ink group-hover:text-green transition-colors">{t.contact.info.linkedinLabel}</div>
                      <div className="text-xs text-muted">{t.contact.info.linkedinSub}</div>
                    </div>
                    <svg className="w-4 h-4 text-line-dark ml-auto group-hover:text-green group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                  </a>
                </FadeIn>

                <FadeIn delay={0.6}>
                  <div className="flex items-center gap-4 p-5 rounded-xl border border-line bg-white">
                    <div className="w-12 h-12 shrink-0 rounded-xl bg-orange-light/50 flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" /></svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-ink">{t.contact.info.scheduleLabel}</div>
                      <div className="text-xs text-muted">{t.contact.info.scheduleSub}</div>
                    </div>
                  </div>
                </FadeIn>
              </div>

              <FadeIn delay={0.7}>
                <div className="bg-forest rounded-2xl p-6 relative overflow-hidden">
                  <div className="absolute -top-8 -right-8 w-28 h-28 bg-green/20 rounded-full blur-2xl" />
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-green-muted/15 rounded-full blur-xl" />
                  <div className="relative flex items-center gap-4">
                    <div className="w-14 h-14 shrink-0 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <div>
                      <div className="text-white font-display text-lg">{t.contact.info.responseTitle}</div>
                      <div className="text-white/50 text-sm">{t.contact.info.responseSub}</div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ RAPIDE ────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-sand/40 border-t border-b border-line/50">
        <div className="max-w-4xl mx-auto px-6">
          <FadeIn>
            <div className="text-center mb-12">
              <span className="text-sm font-semibold tracking-widest uppercase text-orange">{t.contact.faq.eyebrow}</span>
              <h2 className="font-display text-3xl md:text-4xl text-forest leading-tight mt-3">{t.contact.faq.title}</h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-6">
            {t.contact.faq.items.map((faq: { q: string; a: string; linkLabel: string; linkHref: string }, i: number) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white rounded-xl border border-line p-6 h-full hover:shadow-[0_4px_16px_rgba(0,129,74,0.04)] hover:border-green/15 transition-all duration-300">
                  <h3 className="text-base font-semibold text-ink mb-2">{faq.q}</h3>
                  <p className="text-sm text-muted leading-relaxed mb-3">{faq.a}</p>
                  <Link href={`/${locale}${faq.linkHref}`} className="text-sm text-green font-medium hover:text-forest transition-colors">{faq.linkLabel}</Link>
                </div>
              </FadeIn>
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
                {t.contact.finalCta.title1}{" "}<span className="italic text-green-muted">{t.contact.finalCta.titleHighlight}</span>
              </h2>
              <p className="text-lg text-white/50 max-w-xl mx-auto mt-6 leading-relaxed">{t.contact.finalCta.description}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                <Link href="https://freemium-app.yumni.fr/fr/auth/login" target="_blank" rel="noopener noreferrer" className="group bg-white text-forest font-semibold px-10 py-4 rounded-full hover:bg-green-light transition-all text-sm shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)]">
                  {t.contact.finalCta.cta1}<span className="ml-2 inline-block group-hover:translate-x-0.5 transition-transform">→</span>
                </Link>
                <Link href={`/${locale}/demo`} className="border border-white/20 text-white hover:bg-white/10 hover:border-white/40 px-10 py-4 rounded-full transition-all text-sm">
                  {t.contact.finalCta.cta2}
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
