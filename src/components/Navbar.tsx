"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, PhoneCall, Globe } from "lucide-react";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const navItems = [
    { label: t("navFamilies"), href: "/#families" },
    { label: t("navServices"), href: "/#services" },
    { label: t("navPackages"), href: "/packages" },
    { label: t("navInsurance"), href: "/#insurance" },
    { label: t("navFaq"), href: "/faq" },
    { label: t("navLocation"), href: "/#location" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[200] h-16 bg-cream/95 backdrop-blur-[16px] border-bottom border-border select-none flex items-center justify-between px-6 lg:px-12 transition-all">
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group decoration-transparent">
          <div className="w-9 h-9 bg-teal-brand text-white rounded-lg flex items-center justify-center text-lg font-bold group-hover:scale-105 transition-transform">
            🏥
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-[14px] font-semibold text-dark tracking-tight">
              Thonburi Lanta
            </span>
            <span className="font-sans text-[10px] text-muted">
              โรงพยาบาลธนบุรีลันตา
            </span>
          </div>
        </Link>

        {/* Desktop nav links */}
        <ul className="hidden md:flex items-center gap-7 list-none m-0 p-0">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-[13px] text-mid hover:text-teal-brand font-medium transition-colors duration-180"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === "en" ? "th" : "en")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-med text-[12px] font-medium hover:border-teal-brand hover:text-teal-brand transition-all cursor-pointer bg-white"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{language === "en" ? "TH" : "EN"}</span>
          </button>

          {/* Emergency 24/7 button */}
          <a
            href="tel:+66815697890"
            className="flex items-center gap-1.5 bg-red-soft text-white border-0 px-3.5 py-2 rounded-lg text-[12px] font-semibold cursor-pointer relative overflow-hidden group select-none animate-shimmer-btn decoration-transparent hover:opacity-90"
          >
            <div className="absolute inset-0 bg-white/10 -translate-x-full animate-shimmer" />
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-blink" />
            <span>{t("navEmergency")}</span>
          </a>

          {/* Book / Contact button */}
          <Link
            href="/#contact-form"
            className="bg-teal-brand text-white border-0 px-4 py-2 rounded-lg text-[12px] font-semibold hover:bg-teal-dark hover:-translate-y-[1px] active:translate-y-0 transition-all duration-200 cursor-pointer decoration-transparent"
          >
            {t("navBook")}
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-2">
          {/* Language Switch */}
          <button
            onClick={() => setLanguage(language === "en" ? "th" : "en")}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-border-med text-[11px] font-medium bg-white"
          >
            <Globe className="w-3 h-3" />
            <span>{language === "en" ? "TH" : "EN"}</span>
          </button>

          {/* Emergency button (mobile) */}
          <a
            href="tel:+66815697890"
            className="bg-red-soft text-white p-2 rounded-lg"
          >
            <PhoneCall className="w-4 h-4 animate-bounce" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-dark hover:text-teal-brand transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-cream/98 backdrop-blur-md border-b border-border shadow-lg flex flex-col md:hidden py-4 px-6 z-[150] transition-all">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={handleNavClick}
                className="text-[15px] text-mid hover:text-teal-brand font-medium py-1 transition-colors border-b border-black/5"
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/#contact-form"
              onClick={handleNavClick}
              className="bg-teal-brand text-white text-center py-2.5 rounded-lg text-[13px] font-semibold hover:bg-teal-dark transition-all"
            >
              {t("navBook")}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
