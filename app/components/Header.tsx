"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useDictionary } from "../[lang]/dictionary-provider";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, locale } = useDictionary();
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    { href: `/${locale}/produit`, label: t.header.product },
    { href: `/${locale}/solutions`, label: t.header.solutions },
    { href: `/${locale}/tarifs`, label: t.header.pricing },
    { href: `/${locale}/ressources`, label: t.header.resources },
  ];

  function switchLocale(newLocale: string) {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPath = segments.join("/");
    document.cookie = `NEXT_LOCALE=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
    router.push(newPath);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── Main Header ──────────────────────────────────── */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-xl border-b border-line shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            : "bg-white/80 backdrop-blur-xl border-b border-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2.5"
          >
            <Image
              src="/yumni.png"
              alt="Yumni"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="font-display text-2xl tracking-tight text-forest">
              Yumni
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-ink transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            {/* Language switcher */}
            <div className="flex items-center rounded-full border border-line bg-sand/60 p-0.5">
              <button
                onClick={() => switchLocale("fr")}
                className={`text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  locale === "fr"
                    ? "bg-white text-forest shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                FR
              </button>
              <button
                onClick={() => switchLocale("en")}
                className={`text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  locale === "en"
                    ? "bg-white text-forest shadow-sm"
                    : "text-muted hover:text-ink"
                }`}
              >
                EN
              </button>
            </div>

            <Link
              href={`/${locale}/demo`}
              className="hidden sm:block text-sm text-muted hover:text-ink transition-colors"
            >
              {t.common.demo}
            </Link>
            <Link
              href={`/${locale}/essai-gratuit`}
              className="bg-green text-white text-sm font-medium px-5 py-2 rounded-full hover:bg-forest transition-colors"
            >
              {t.common.freeTrial}
            </Link>

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex flex-col justify-center gap-1.5 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
            >
              <span
                className={`block w-5 h-0.5 bg-ink transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-[4px]" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-ink transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-ink transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-[4px]" : ""
                }`}
              />
            </button>
          </div>
        </nav>

        {/* ── Mobile Menu ────────────────────────────────── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden border-t border-line overflow-hidden bg-white"
            >
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="block text-sm text-muted hover:text-ink py-2.5"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href={`/${locale}/demo`}
                  onClick={() => setMenuOpen(false)}
                  className="block text-sm text-muted hover:text-ink py-2.5"
                >
                  {t.common.demo}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
