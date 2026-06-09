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
            <Link href="/" className="flex items-center group decoration-transparent">
              <div className="bg-white p-2 rounded-lg inline-block">
                <img 
                  src="/logo-horizontal.png" 
                  alt="Thonburi Lanta Clinic" 
                  className="h-8 w-auto group-hover:scale-[1.01] transition-transform" 
                />
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
              Clinic
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
                <a href="tel:+66815697890" className="text-white/70 hover:text-white decoration-transparent">
                  081-569-7890
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

      {/* Mobile Sticky Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[300] bg-white/95 backdrop-blur-md border-t border-border md:hidden flex items-center justify-between p-3 gap-2 shadow-2xl">
        <a
          href="tel:+66815697890"
          className="flex-1 flex items-center justify-center gap-1.5 bg-red-soft text-white py-2.5 px-3 rounded-xl text-[12px] font-bold shadow-sm active:scale-95 transition-all decoration-transparent"
        >
          <Phone className="w-3.5 h-3.5 animate-pulse" />
          <span>Call 24/7</span>
        </a>
        
        <a
          href="https://wa.me/66815697890"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1.5 bg-[#25D366] text-white py-2.5 px-3 rounded-xl text-[12px] font-bold shadow-sm active:scale-95 transition-all decoration-transparent"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.703 1.455h.004c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          <span>WhatsApp</span>
        </a>

        <a
          href="https://line.me/R/ti/p/%40thonburilanta"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-1 bg-[#06C755] text-white py-2.5 px-3 rounded-xl text-[12px] font-bold shadow-sm active:scale-95 transition-all decoration-transparent"
        >
          <span className="font-extrabold text-[11px] tracking-tight">LINE Chat</span>
        </a>
      </div>
    </footer>
  );
}
