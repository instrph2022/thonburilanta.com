"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Phone, MessageCircle, MapPin, Clock } from "lucide-react";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-dark text-white/55 pt-16 pb-24 md:pb-12 px-6 lg:px-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-10">
          {/* Brand Info */}
          <div className="flex flex-col gap-3">
            <Link href="/" className="flex items-center gap-2 group decoration-transparent">
              <div className="w-8 h-8 bg-teal-brand text-white rounded-lg flex items-center justify-center text-md font-bold">
                🏥
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-[15px] font-semibold text-white tracking-tight">
                  Thonburi Lanta
                </span>
                <span className="font-sans text-[9px] text-white/40">
                  โรงพยาบาลธนบุรีลันตา
                </span>
              </div>
            </Link>
            <p className="text-[12px] leading-relaxed text-white/50 max-w-[280px] mt-2">
              {t("footBrandDesc")}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col">
            <h5 className="text-[10px] tracking-[1.5px] uppercase text-white/40 font-bold mb-4">
              Navigation
            </h5>
            <div className="flex flex-col gap-2">
              <Link href="/#families" className="text-[12.5px] text-white/50 hover:text-white transition-colors decoration-transparent">
                {t("navFamilies")}
              </Link>
              <Link href="/#services" className="text-[12.5px] text-white/50 hover:text-white transition-colors decoration-transparent">
                {t("navServices")}
              </Link>
              <Link href="/packages" className="text-[12.5px] text-white/50 hover:text-white transition-colors decoration-transparent">
                {t("navPackages")}
              </Link>
              <Link href="/#insurance" className="text-[12.5px] text-white/50 hover:text-white transition-colors decoration-transparent">
                {t("navInsurance")}
              </Link>
              <Link href="/faq" className="text-[12.5px] text-white/50 hover:text-white transition-colors decoration-transparent">
                {t("navFaq")}
              </Link>
            </div>
          </div>

          {/* Clinical Links */}
          <div className="flex flex-col">
            <h5 className="text-[10px] tracking-[1.5px] uppercase text-white/40 font-bold mb-4">
              Hospital
            </h5>
            <div className="flex flex-col gap-2">
              <Link href="/#doctors" className="text-[12.5px] text-white/50 hover:text-white transition-colors decoration-transparent">
                {t("footLinksDoc")}
              </Link>
              <Link href="/#careers" className="text-[12.5px] text-white/50 hover:text-white transition-colors decoration-transparent">
                {t("footLinksCareer")}
              </Link>
              <Link href="/#contact-form" className="text-[12.5px] text-white/50 hover:text-white transition-colors decoration-transparent">
                {t("footLinksContact")}
              </Link>
              <Link href="/#privacy" className="text-[12.5px] text-white/50 hover:text-white transition-colors decoration-transparent">
                {t("footLinksPrivacy")}
              </Link>
            </div>
          </div>

          {/* Contact Details */}
          <div className="flex flex-col gap-3">
            <h5 className="text-[10px] tracking-[1.5px] uppercase text-white/40 font-bold mb-4">
              Contact
            </h5>
            <div className="flex flex-col gap-2 text-[12px] text-white/60">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-brand mt-0.5 shrink-0" />
                <span>{t("locAddressVal")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal-brand shrink-0" />
                <span>OPD: 08:00 - 20:00 | ER: 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-brand shrink-0" />
                <a href="tel:075821999" className="text-white/70 hover:text-white decoration-transparent">
                  075-821-999
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-teal-brand shrink-0" />
                <span>LINE: @thonburilanta</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row justify-between gap-4 text-[11px] text-white/30">
          <span>{t("footCopy")}</span>
          <div className="flex gap-4">
            <Link href="/admin/login" className="hover:text-white transition-colors decoration-transparent">
              Admin Login
            </Link>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Emergency Button */}
      <a
        href="tel:075821999"
        className="fixed bottom-5 right-5 z-[300] bg-red-soft text-white rounded-full py-3 px-5 flex md:hidden items-center gap-2 text-[13px] font-semibold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all select-none animate-float2 decoration-transparent"
      >
        <span className="w-2 h-2 rounded-full bg-white animate-blink" />
        <span>🚨 EMERGENCY 24/7</span>
      </a>
    </footer>
  );
}
