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
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.116-2.905-6.993-1.876-1.878-4.357-2.91-6.996-2.913-5.439 0-9.865 4.424-9.869 9.87-.001 1.645.428 3.25 1.241 4.665l-.997 3.639 3.737-.98zm11.233-6.52c-.3-.15-1.774-.875-2.046-.975-.27-.1-.466-.15-.66.15-.194.3-.75.975-.92 1.17-.17.195-.34.22-.64.07-1.125-.565-1.928-1.01-2.684-2.305-.2-.34.2-.315.575-1.065.06-.115.03-.215-.015-.315-.045-.1-.466-1.12-6.36-1.53-.18-.435-.38-.375-.515-.38-.135-.005-.29-.005-.44-.005-.15 0-.395.055-.6.28-.205.225-.78.765-.78 1.86s.8 2.155.91 2.305c.11.15 1.575 2.405 3.815 3.37.53.23 1.05.365 1.485.485.55.175 1.055.15 1.45.09.44-.065 1.445-.59 1.65-1.16.205-.57.205-1.06.145-1.16-.06-.1-.22-.15-.52-.3z"/>
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
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.739-1.446L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.42 9.864-9.864.002-2.637-1.03-5.116-2.905-6.993-1.876-1.878-4.357-2.91-6.996-2.913-5.439 0-9.865 4.424-9.869 9.87-.001 1.645.428 3.25 1.241 4.665l-.997 3.639 3.737-.98zm11.233-6.52c-.3-.15-1.774-.875-2.046-.975-.27-.1-.466-.15-.66.15-.194.3-.75.975-.92 1.17-.17.195-.34.22-.64.07-1.125-.565-1.928-1.01-2.684-2.305-.2-.34.2-.315.575-1.065.06-.115.03-.215-.015-.315-.045-.1-.466-1.12-6.36-1.53-.18-.435-.38-.375-.515-.38-.135-.005-.29-.005-.44-.005-.15 0-.395.055-.6.28-.205.225-.78.765-.78 1.86s.8 2.155.91 2.305c.11.15 1.575 2.405 3.815 3.37.53.23 1.05.365 1.485.485.55.175 1.055.15 1.45.09.44-.065 1.445-.59 1.65-1.16.205-.57.205-1.06.145-1.16-.06-.1-.22-.15-.52-.3z"/>
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
