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
          <div className="w-9 h-9 bg-teal-brand text-white rounded-lg flex items-center justify-center p-2 group-hover:scale-105 transition-transform">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-amber">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-serif text-[14px] font-semibold text-dark tracking-tight">
              Thonburi Lanta
            </span>
            <span className="font-sans text-[10px] text-muted">
              คลินิกธนบุรีลันตา
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

          {/* WhatsApp button */}
          <a
            href="https://wa.me/66815697890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#25D366] text-white border-0 px-3.5 py-2 rounded-lg text-[12px] font-bold cursor-pointer hover:opacity-90 transition-all decoration-transparent shrink-0"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            <span>WhatsApp</span>
          </a>

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

          {/* Mobile WhatsApp Button */}
          <a
            href="https://wa.me/66815697890"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] text-white p-2 rounded-lg flex items-center justify-center"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </a>

          {/* Emergency button (mobile) */}
          <a
            href="tel:+66815697890"
            className="bg-red-soft text-white p-2 rounded-lg flex items-center justify-center"
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
