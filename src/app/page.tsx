"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import InquiryForm from "@/components/InquiryForm";
import { Shield, Compass } from "lucide-react";

export default function Home() {
  const { t } = useLanguage();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    "name": "Thonburi Lanta Hospital",
    "alternateName": "โรงพยาบาลธนบุรีลันตา",
    "url": "https://thonburilanta.com",
    "telephone": "+66-75-821-999",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Koh Lanta",
      "addressLocality": "เกาะลันตา",
      "addressRegion": "กระบี่",
      "addressCountry": "TH",
      "postalCode": "81150"
    },
    "openingHours": "Mo-Su 00:00-24:00",
    "availableService": [
      { "@type": "MedicalTherapy", "name": "Emergency Care" },
      { "@type": "MedicalTherapy", "name": "Dive Medicine" },
      { "@type": "MedicalTherapy", "name": "Health Check" }
    ],
    "numberOfBeds": 36,
    "medicalSpecialty": ["Emergency Medicine", "General Practice", "Dive Medicine"]
  };

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO SECTION */}
      <section className="min-h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-[55%_45%] relative overflow-hidden bg-warm-white">
        <div className="flex flex-col justify-center py-12 px-6 sm:px-12 lg:pl-20 lg:pr-12 relative z-10">
          {/* Trust Chips */}
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="flex items-center gap-2 bg-teal-light text-teal-dark border border-teal-mid/20 px-3 py-1.5 rounded-full text-[11.5px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-brand animate-ping" />
              <span>{t("heroBadgeEnglish")}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-border-med px-3 py-1.5 rounded-full text-[11.5px] text-mid font-medium shadow-sm">
              <Shield className="w-3.5 h-3.5 text-teal-brand" />
              <span>{t("heroBadgeInsurance")}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white border border-border-med px-3 py-1.5 rounded-full text-[11.5px] text-mid font-medium shadow-sm">
              <span>👨👩👧</span>
              <span>{t("heroBadgeFamily")}</span>
            </div>
          </div>

          <div className="text-[11px] font-semibold tracking-[2.5px] uppercase text-teal-brand mb-4">
            {t("heroEyebrow")}
          </div>

          <h1
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal leading-[1.1] text-dark tracking-tight mb-6"
            dangerouslySetInnerHTML={{ __html: t("heroTitleHtml") }}
          />

          <p className="text-[15.5px] leading-relaxed text-mid max-w-lg mb-8">
            {t("heroSub")}
          </p>

          {/* ER Emergency callout block */}
          <div className="flex items-start gap-4 bg-red-50 border border-red-soft/20 border-l-4 border-l-red-soft rounded-xl p-4.5 mb-8 max-w-lg shadow-sm">
            <div className="text-2xl mt-0.5 shrink-0">🚨</div>
            <div>
              <div className="text-[11px] font-semibold text-red-soft tracking-wider mb-1">
                {t("heroErLabel")}
              </div>
              <div className="font-serif text-2xl font-semibold text-dark tracking-tight">
                <a href="tel:075821999" className="hover:underline decoration-transparent">
                  {t("heroErPhone")}
                </a>
              </div>
              <div className="text-[11px] text-muted mt-1">
                {t("heroErNote")}
              </div>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <Link
              href="/packages"
              className="bg-teal-brand text-white border-0 px-7 py-3.5 rounded-xl text-[14.5px] font-medium hover:bg-teal-dark hover:-translate-y-[2px] transition-all cursor-pointer shadow-md decoration-transparent"
            >
              {t("heroBtnPackages")}
            </Link>
            <Link
              href="#contact-form"
              className="bg-transparent text-mid border-1.5 border-border-med px-6 py-3.5 rounded-xl text-[14px] font-medium hover:border-teal-brand hover:text-teal-brand transition-all decoration-transparent"
            >
              {t("heroBtnDoctors")}
            </Link>
          </div>

          {/* Stats strip */}
          <div className="flex flex-wrap border border-border-med rounded-xl overflow-hidden bg-white max-w-xl shadow-sm">
            <div className="flex-1 min-w-[120px] p-4 border-r border-b border-border">
              <span className="font-serif text-2xl font-bold text-dark block leading-none">36</span>
              <span className="text-[10px] text-muted block mt-1.5">{t("heroStatBeds")}</span>
            </div>
            <div className="flex-1 min-w-[120px] p-4 border-r border-b border-border">
              <span className="font-serif text-2xl font-bold text-dark block leading-none">24/7</span>
              <span className="text-[10px] text-muted block mt-1.5">{t("heroStatEr")}</span>
            </div>
            <div className="flex-1 min-w-[120px] p-4 border-r border-b border-border">
              <span className="font-serif text-2xl font-bold text-dark block leading-none">EN</span>
              <span className="text-[10px] text-muted block mt-1.5">{t("heroStatLang")}</span>
            </div>
            <div className="flex-1 min-w-[120px] p-4 border-b border-border">
              <span className="font-serif text-2xl font-bold text-dark block leading-none">THG</span>
              <span className="text-[10px] text-muted block mt-1.5">{t("heroStatGroup")}</span>
            </div>
          </div>
        </div>

        {/* HERO RIGHT */}
        <div className="bg-cream relative flex flex-col justify-center items-center py-16 px-6 lg:px-12 border-l border-border">
          {/* Abstract tropical gradient bg */}
          <div className="absolute inset-0 bg-gradient-to-br from-teal-light/45 via-sand/35 to-ocean-light/45 pointer-events-none" />

          <div className="relative z-10 w-full max-w-[460px] flex flex-col items-center gap-6">
            {/* SVG doctor illustration */}
            <svg width="100%" viewBox="0 0 400 340" xmlns="http://www.w3.org/2000/svg" className="max-w-[420px] drop-shadow-md">
              <rect x="0" y="180" width="400" height="160" rx="0" fill="#C8EDD9" opacity="0.4"/>
              <rect x="28" y="120" width="7" height="100" rx="3" fill="#5C8A5A"/>
              <ellipse cx="31" cy="110" rx="28" ry="18" fill="#4A7A48" opacity="0.85"/>
              <ellipse cx="14" cy="118" rx="18" ry="12" fill="#5C8A5A" opacity="0.8"/>
              <ellipse cx="50" cy="115" rx="18" ry="11" fill="#5C8A5A" opacity="0.8"/>
              <rect x="365" y="130" width="7" height="90" rx="3" fill="#5C8A5A"/>
              <ellipse cx="368" cy="120" rx="26" ry="16" fill="#4A7A48" opacity="0.85"/>
              <ellipse cx="352" cy="127" rx="17" ry="11" fill="#5C8A5A" opacity="0.75"/>
              <ellipse cx="385" cy="124" rx="17" ry="10" fill="#5C8A5A" opacity="0.75"/>
              <rect x="140" y="90" width="120" height="130" rx="10" fill="white" stroke="#C8EDD9" stroke-width="1.5"/>
              <rect x="158" y="108" width="24" height="20" rx="4" fill="#D4E8F5"/>
              <rect x="194" y="108" width="24" height="20" rx="4" fill="#D4E8F5"/>
              <rect x="218" y="108" width="24" height="20" rx="4" fill="#D4E8F5"/>
              <rect x="158" y="138" width="24" height="20" rx="4" fill="#D4E8F5"/>
              <rect x="194" y="138" width="24" height="20" rx="4" fill="#D4E8F5"/>
              <rect x="183" y="178" width="34" height="42" rx="5" fill="#D6F0E6"/>
              <rect x="192" y="100" width="16" height="5" rx="2" fill="#1A8C68"/>
              <rect x="197" y="95" width="5" height="14" rx="2" fill="#1A8C68"/>
              <rect x="152" y="163" width="96" height="14" rx="4" fill="#1A8C68" opacity="0.12"/>
              <text x="200" y="173" text-anchor="middle" font-size="7" fill="#0D5C45" font-family="sans-serif" font-weight="500">THONBURI LANTA</text>
              <rect x="0" y="220" width="400" height="6" rx="3" fill="#9FD4B8" opacity="0.5"/>
              <rect x="183" y="220" width="34" height="18" rx="2" fill="#E8E0D0" opacity="0.8"/>
              <rect x="190" y="155" width="22" height="30" rx="4" fill="white" stroke="#C8EDD9" stroke-width="1"/>
              <path d="M196 162 Q200 168 204 162" fill="none" stroke="#1A8C68" stroke-width="1.5" stroke-linecap="round"/>
              <circle cx="200" cy="148" r="10" fill="#F5C9A0"/>
              <path d="M191 145 Q200 138 209 145" fill="#3D2B1F" stroke="none"/>
              <path d="M196 151 Q200 154 204 151" fill="none" stroke="#C07048" stroke-width="1" stroke-linecap="round"/>
              <rect x="212" y="160" width="10" height="18" rx="4" fill="white" stroke="#C8EDD9" stroke-width="1"/>
              <rect x="213" y="163" width="8" height="12" rx="2" fill="#D6F0E6"/>
              <rect x="214" y="165" width="6" height="1.5" rx="1" fill="#1A8C68" opacity="0.5"/>
              <rect x="214" y="168" width="6" height="1.5" rx="1" fill="#1A8C68" opacity="0.5"/>
              <rect x="214" y="171" width="4" height="1.5" rx="1" fill="#1A8C68" opacity="0.5"/>
              <circle cx="248" cy="160" r="9" fill="#E8B090"/>
              <path d="M240 157 Q248 151 256 157" fill="#4A3020" stroke="none"/>
              <rect x="240" y="168" width="16" height="26" rx="4" fill="#5B8DD9"/>
              <circle cx="266" cy="162" r="8" fill="#F0C0A0"/>
              <path d="M259 159 Q266 154 273 159" fill="#7A5030" stroke="none"/>
              <rect x="259" y="169" width="14" height="24" rx="4" fill="#E8829A"/>
              <circle cx="257" cy="176" r="6" fill="#F5C9A0"/>
              <rect x="252" y="181" width="10" height="16" rx="3" fill="#FFD166"/>
              <line x1="262" y1="184" x2="267" y2="179" stroke="#F5C9A0" stroke-width="3" stroke-linecap="round"/>
              <circle cx="228" cy="145" r="10" fill="#FFF0F3"/>
              <path d="M224 144 Q224 141 228 144 Q232 141 232 144 Q232 148 228 151 Q224 148 224 144Z" fill="#E8829A"/>
              <circle cx="355" cy="55" r="20" fill="#FFF3CC" opacity="0.9"/>
              <circle cx="355" cy="55" r="14" fill="#FFD166" opacity="0.9"/>
              <line x1="355" y1="26" x2="355" y2="32" stroke="#FFD166" stroke-width="2" stroke-linecap="round"/>
              <line x1="355" y1="78" x2="355" y2="84" stroke="#FFD166" stroke-width="2" stroke-linecap="round"/>
              <line x1="326" y1="55" x2="332" y2="55" stroke="#FFD166" stroke-width="2" stroke-linecap="round"/>
              <line x1="378" y1="55" x2="384" y2="55" stroke="#FFD166" stroke-width="2" stroke-linecap="round"/>
              <ellipse cx="60" cy="234" rx="50" ry="8" fill="#7EC8E3" opacity="0.4"/>
              <ellipse cx="340" cy="238" rx="45" ry="7" fill="#7EC8E3" opacity="0.35"/>
              <path d="M44 228 Q60 218 76 228Z" fill="#E8829A" opacity="0.7"/>
            </svg>

            {/* 3 Trust info boxes below SVG illustration */}
            <div className="flex flex-col gap-3 w-full">
              <div className="flex gap-3">
                <div className="flex-1 bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm hover:scale-[1.02] transition-transform">
                  <span className="text-xl">👶</span>
                  <div>
                    <div className="text-[11.5px] font-semibold text-dark leading-snug">Paediatric care</div>
                    <div className="text-[9.5px] text-muted mt-0.5">Children welcome</div>
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm hover:scale-[1.02] transition-transform">
                  <span className="text-xl">💬</span>
                  <div>
                    <div className="text-[11.5px] font-semibold text-dark leading-snug">English spoken</div>
                    <div className="text-[9.5px] text-muted mt-0.5">All clinical staff</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm hover:scale-[1.01] transition-transform">
                <span className="text-xl shrink-0">🚨</span>
                <div className="flex-1">
                  <div className="text-[11.5px] font-semibold text-dark leading-snug">Emergency room open 24/7</div>
                  <div className="text-[9.5px] text-muted mt-0.5">Walk in anytime — no appointment needed</div>
                </div>
                <div className="bg-teal-light text-teal-dark px-2.5 py-1 rounded-full text-[9px] font-bold whitespace-nowrap flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-brand animate-blink" />
                  <span>Open Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAND */}
      <section className="bg-dark text-white/80 py-5 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12.5px]">
          <div className="flex items-center gap-2">
            <span className="text-lg">💬</span>
            <span>{t("tbEnglish")}</span>
          </div>
          <div className="w-px h-4.5 bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-lg">🛡️</span>
            <span>{t("tbInsurance")}</span>
          </div>
          <div className="w-px h-4.5 bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-lg">🚨</span>
            <span>{t("tbEmergency")}</span>
          </div>
          <div className="w-px h-4.5 bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-lg">👶</span>
            <span>{t("tbPaediatric")}</span>
          </div>
          <div className="w-px h-4.5 bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <span className="text-lg">🏥</span>
            <span>{t("tbGroup")}</span>
          </div>
        </div>
      </section>

      {/* FOR FAMILIES */}
      <section id="families" className="py-20 px-6 sm:px-12 lg:px-20 bg-cream">
        <div className="max-w-7xl mx-auto">
          <div className="text-[10.5px] font-semibold uppercase tracking-[2.5px] text-teal-brand mb-3">
            {t("famEyebrow")}
          </div>
          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-dark tracking-tight mb-4"
            dangerouslySetInnerHTML={{ __html: t("famTitleHtml") }}
          />
          <p className="text-[15px] leading-relaxed text-mid max-w-xl mb-14">
            {t("famDesc")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pediatric Card */}
            <div className="bg-white rounded-2xl p-7 border border-border hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-teal-light flex items-center justify-center text-2xl mb-5">
                👶
              </div>
              <h4 className="text-[15.5px] font-bold text-dark mb-2">
                {t("famPediatricTitle")}
              </h4>
              <p className="text-[12.5px] leading-relaxed text-mid mb-5">
                {t("famPediatricDesc")}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] bg-cream text-mid border border-border px-2.5 py-1 rounded-full">Fever & infection</span>
                <span className="text-[10px] bg-cream text-mid border border-border px-2.5 py-1 rounded-full">Ear & throat</span>
                <span className="text-[10px] bg-cream text-mid border border-border px-2.5 py-1 rounded-full">Allergies</span>
              </div>
            </div>

            {/* Ocean Card */}
            <div className="bg-white rounded-2xl p-7 border border-border hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-ocean-light flex items-center justify-center text-2xl mb-5">
                🌊
              </div>
              <h4 className="text-[15.5px] font-bold text-dark mb-2">
                {t("famBeachTitle")}
              </h4>
              <p className="text-[12.5px] leading-relaxed text-mid mb-5">
                {t("famBeachDesc")}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] bg-cream text-mid border border-border px-2.5 py-1 rounded-full">Jellyfish sting</span>
                <span className="text-[10px] bg-cream text-mid border border-border px-2.5 py-1 rounded-full">Sea urchin</span>
                <span className="text-[10px] bg-cream text-mid border border-border px-2.5 py-1 rounded-full">Coral wound</span>
              </div>
            </div>

            {/* Insurance Card */}
            <div className="bg-white rounded-2xl p-7 border border-border hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-light flex items-center justify-center text-2xl mb-5">
                🛡️
              </div>
              <h4 className="text-[15.5px] font-bold text-dark mb-2">
                {t("famInsTitle")}
              </h4>
              <p className="text-[12.5px] leading-relaxed text-mid mb-5">
                {t("famInsDesc")}
              </p>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] bg-cream text-mid border border-border px-2.5 py-1 rounded-full">Direct billing</span>
                <span className="text-[10px] bg-cream text-mid border border-border px-2.5 py-1 rounded-full">EU insurance</span>
                <span className="text-[10px] bg-cream text-mid border border-border px-2.5 py-1 rounded-full">EN reports</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section id="services" className="py-20 px-6 sm:px-12 lg:px-20 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="text-[10.5px] font-semibold uppercase tracking-[2.5px] text-teal-brand mb-3">
            Services
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-dark tracking-tight mb-4">
            Comprehensive Medical Care
          </h2>
          <p className="text-[15px] leading-relaxed text-mid max-w-xl mb-14">
            From round-the-clock emergency responses to specialized packages, our clinic covers standard inpatient and outpatient hospital features on the island.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-teal-light text-teal-dark rounded-lg flex items-center justify-center text-lg shrink-0 mt-0.5">
                🚑
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-dark mb-1.5">OPD & ER 24hr</h4>
                <p className="text-[12.5px] text-mid leading-relaxed">Emergency ambulance transfer, trauma response, and walk-in outpatient consultations anytime.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-teal-light text-teal-dark rounded-lg flex items-center justify-center text-lg shrink-0 mt-0.5">
                🤿
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-dark mb-1.5">Dive Medicine Specialist</h4>
                <p className="text-[12.5px] text-mid leading-relaxed">Providing fitness-to-dive certificates and urgent decompression sickness (DCS) support.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-teal-light text-teal-dark rounded-lg flex items-center justify-center text-lg shrink-0 mt-0.5">
                🩺
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-dark mb-1.5">Health Checkup Center</h4>
                <p className="text-[12.5px] text-mid leading-relaxed">Yearly checkups, blood tests, kidney/liver profiles, and wellness consulting.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-teal-light text-teal-dark rounded-lg flex items-center justify-center text-lg shrink-0 mt-0.5">
                🔪
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-dark mb-1.5">General Surgery</h4>
                <p className="text-[12.5px] text-mid leading-relaxed">Minor surgeries, wound suture, advanced stitches, and burn treatments.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-teal-light text-teal-dark rounded-lg flex items-center justify-center text-lg shrink-0 mt-0.5">
                🔬
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-dark mb-1.5">Lab & Diagnostics</h4>
                <p className="text-[12.5px] text-mid leading-relaxed">Fully equipped on-site diagnostic lab, biochemistry testing, and fast reports.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-teal-light text-teal-dark rounded-lg flex items-center justify-center text-lg shrink-0 mt-0.5">
                💊
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-dark mb-1.5">24h Pharmacy</h4>
                <p className="text-[12.5px] text-mid leading-relaxed">Certified pharmacist on duty, providing essential medicines and travel clinic prescriptions.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPECTATIONS / PROCESS */}
      <section className="py-20 px-6 sm:px-12 lg:px-20 bg-white grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div className="bg-teal-light/40 rounded-3xl p-8 sm:p-10 border border-teal-mid/10">
          <div className="flex flex-col gap-6">
            <div className="flex gap-4">
              <div className="w-8 h-8 rounded-full bg-teal-brand text-white flex items-center justify-center text-[12px] font-bold shrink-0 mt-1">1</div>
              <div>
                <h4 className="text-[14px] font-semibold text-dark mb-1">{t("expectStep1Title")}</h4>
                <p className="text-[12px] text-mid leading-relaxed">{t("expectStep1Desc")}</p>
              </div>
            </div>
            <div className="flex gap-4 border-t border-black/5 pt-6">
              <div className="w-8 h-8 rounded-full bg-teal-brand text-white flex items-center justify-center text-[12px] font-bold shrink-0 mt-1">2</div>
              <div>
                <h4 className="text-[14px] font-semibold text-dark mb-1">{t("expectStep2Title")}</h4>
                <p className="text-[12px] text-mid leading-relaxed">{t("expectStep2Desc")}</p>
              </div>
            </div>
            <div className="flex gap-4 border-t border-black/5 pt-6">
              <div className="w-8 h-8 rounded-full bg-teal-brand text-white flex items-center justify-center text-[12px] font-bold shrink-0 mt-1">3</div>
              <div>
                <h4 className="text-[14px] font-semibold text-dark mb-1">{t("expectStep3Title")}</h4>
                <p className="text-[12px] text-mid leading-relaxed">{t("expectStep3Desc")}</p>
              </div>
            </div>
            <div className="flex gap-4 border-t border-black/5 pt-6">
              <div className="w-8 h-8 rounded-full bg-teal-brand text-white flex items-center justify-center text-[12px] font-bold shrink-0 mt-1">4</div>
              <div>
                <h4 className="text-[14px] font-semibold text-dark mb-1">{t("expectStep4Title")}</h4>
                <p className="text-[12px] text-mid leading-relaxed">{t("expectStep4Desc")}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="text-[10.5px] font-semibold uppercase tracking-[2.5px] text-teal-brand mb-3">
            {t("expectEyebrow")}
          </div>
          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-dark tracking-tight mb-4"
            dangerouslySetInnerHTML={{ __html: t("expectTitleHtml") }}
          />
          <p className="text-[15px] leading-relaxed text-mid max-w-xl mb-8">
            {t("expectDesc")}
          </p>

          <blockquote className="bg-cream border-l-4 border-teal-brand rounded-r-xl p-5 mb-8 font-serif text-[16px] italic text-dark leading-relaxed">
            &ldquo;{t("expectQuote")}&rdquo;
            <cite className="block font-sans not-italic text-[11px] text-muted mt-3">
              {t("expectQuoteAuthor")}
            </cite>
          </blockquote>

          <div className="flex flex-wrap gap-2">
            <span className="text-[11.5px] bg-cream text-mid border border-border px-3 py-1.5 rounded-full font-medium">{t("expectPill1")}</span>
            <span className="text-[11.5px] bg-cream text-mid border border-border px-3 py-1.5 rounded-full font-medium">{t("expectPill2")}</span>
            <span className="text-[11.5px] bg-cream text-mid border border-border px-3 py-1.5 rounded-full font-medium">{t("expectPill3")}</span>
            <span className="text-[11.5px] bg-cream text-mid border border-border px-3 py-1.5 rounded-full font-medium">{t("expectPill4")}</span>
          </div>
        </div>
      </section>

      {/* INSURANCE SECTION */}
      <section id="insurance" className="bg-ocean text-white py-16 px-6 sm:px-12 lg:px-20 select-none">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight max-w-lg">
                {t("insTitle")}
              </h2>
              <div className="text-[13px] text-white/60 mt-3 font-medium">
                {t("insSub")}
              </div>
            </div>
            <Link
              href="#contact-form"
              className="bg-teal-brand text-white border-0 py-3.5 px-6 rounded-lg text-[13px] font-bold cursor-pointer hover:bg-teal-dark transition-colors shrink-0 max-w-fit decoration-transparent"
            >
              {t("insCheckBtn")}
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/10 border border-white/15 rounded-xl p-5 text-center hover:bg-white/15 transition-colors">
              <span className="text-xl mb-2 block">🛡️</span>
              <div className="text-[13.5px] font-bold text-white mb-0.5">Allianz</div>
              <div className="text-[10px] text-white/50">Global Partner</div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-5 text-center hover:bg-white/15 transition-colors">
              <span className="text-xl mb-2 block">🛡️</span>
              <div className="text-[13.5px] font-bold text-white mb-0.5">AXA</div>
              <div className="text-[10px] text-white/50">Europe / Global</div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-5 text-center hover:bg-white/15 transition-colors">
              <span className="text-xl mb-2 block">🛡️</span>
              <div className="text-[13.5px] font-bold text-white mb-0.5">Europ Assistance</div>
              <div className="text-[10px] text-white/50">Europe Direct</div>
            </div>
            <div className="bg-white/10 border border-white/15 rounded-xl p-5 text-center hover:bg-white/15 transition-colors">
              <span className="text-xl mb-2 block">🛡️</span>
              <div className="text-[13.5px] font-bold text-white mb-0.5">DAN</div>
              <div className="text-[10px] text-white/50">Dive Insurance</div>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4.5 text-[12.5px] text-white/70 leading-relaxed flex items-start gap-3">
            <span className="text-lg mt-0.5 shrink-0">ℹ️</span>
            <span>{t("insNote")}</span>
          </div>
        </div>
      </section>

      {/* PACKAGES PREVIEW SECTION */}
      <section id="packages" className="py-20 px-6 sm:px-12 lg:px-20 bg-warm-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-[10.5px] font-semibold uppercase tracking-[2.5px] text-teal-brand mb-3">
            {t("pkgEyebrow")}
          </div>
          <h2
            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-dark tracking-tight mb-4"
            dangerouslySetInnerHTML={{ __html: t("pkgTitleHtml") }}
          />
          <p className="text-[15px] leading-relaxed text-mid max-w-xl mb-12">
            {t("pkgDesc")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Package 1 */}
            <div className="bg-teal-brand border border-teal-brand rounded-2xl p-6.5 text-white flex flex-col hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300">
              <span className="text-[9.5px] bg-white/20 text-white font-bold uppercase tracking-wider px-2 py-1 rounded-full w-fit mb-4">
                {t("pkgDiveTag")}
              </span>
              <div className="text-3xl mb-2">🤿</div>
              <h4 className="font-serif text-[17px] font-semibold mb-1">
                {t("pkgDiveTitle")}
              </h4>
              <p className="text-[11px] text-white/60 mb-5">
                {t("pkgDiveSub")}
              </p>
              <div className="mb-5">
                <div className="font-serif text-2xl font-bold">{t("pkgDivePrice")}</div>
                <div className="text-[10px] text-white/60 mt-1">{t("pkgDivePriceSub")}</div>
              </div>
              <div className="w-full h-px bg-white/20 mb-4" />
              <ul className="list-none m-0 p-0 flex-1 flex flex-col gap-2.5">
                <li className="text-[11.5px] text-white/90 flex gap-2"><span className="text-[10px] text-white/60">✓</span> {t("pkgDiveItem1")}</li>
                <li className="text-[11.5px] text-white/90 flex gap-2"><span className="text-[10px] text-white/60">✓</span> {t("pkgDiveItem2")}</li>
                <li className="text-[11.5px] text-white/90 flex gap-2"><span className="text-[10px] text-white/60">✓</span> {t("pkgDiveItem3")}</li>
                <li className="text-[11.5px] text-white/90 flex gap-2"><span className="text-[10px] text-white/60">✓</span> {t("pkgDiveItem4")}</li>
              </ul>
              <Link href="#contact-form" className="text-[12px] font-bold text-white hover:underline mt-6 flex items-center justify-between group decoration-transparent">
                <span>{t("pkgActionInquire")}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Package 2 */}
            <div className="bg-white border border-border rounded-2xl p-6.5 flex flex-col hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300">
              <span className="text-[9.5px] bg-teal-light text-teal-dark font-bold uppercase tracking-wider px-2 py-1 rounded-full w-fit mb-4">
                {t("pkgIslandTag")}
              </span>
              <div className="text-3xl mb-2">🩺</div>
              <h4 className="font-serif text-[17px] font-semibold text-dark mb-1">
                {t("pkgIslandTitle")}
              </h4>
              <p className="text-[11px] text-muted mb-5">
                {t("pkgIslandSub")}
              </p>
              <div className="mb-5">
                <div className="font-serif text-2xl font-bold text-ocean">{t("pkgIslandPrice")}</div>
                <div className="text-[10px] text-muted mt-1">{t("pkgIslandPriceSub")}</div>
              </div>
              <div className="w-full h-px bg-black/5 mb-4" />
              <ul className="list-none m-0 p-0 flex-1 flex flex-col gap-2.5">
                <li className="text-[11.5px] text-mid flex gap-2"><span className="text-[10px] text-teal-brand font-bold">✓</span> {t("pkgIslandItem1")}</li>
                <li className="text-[11.5px] text-mid flex gap-2"><span className="text-[10px] text-teal-brand font-bold">✓</span> {t("pkgIslandItem2")}</li>
                <li className="text-[11.5px] text-mid flex gap-2"><span className="text-[10px] text-teal-brand font-bold">✓</span> {t("pkgIslandItem3")}</li>
                <li className="text-[11.5px] text-mid flex gap-2"><span className="text-[10px] text-teal-brand font-bold">✓</span> {t("pkgIslandItem4")}</li>
              </ul>
              <Link href="#contact-form" className="text-[12px] font-bold text-ocean hover:underline mt-6 flex items-center justify-between group decoration-transparent">
                <span>{t("pkgActionInquire")}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Package 3 */}
            <div className="bg-white border border-border rounded-2xl p-6.5 flex flex-col hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300">
              <span className="text-[9.5px] bg-amber-light text-amber font-bold uppercase tracking-wider px-2 py-1 rounded-full w-fit mb-4">
                {t("pkgHealthTag")}
              </span>
              <div className="text-3xl mb-2">❤️</div>
              <h4 className="font-serif text-[17px] font-semibold text-dark mb-1">
                {t("pkgHealthTitle")}
              </h4>
              <p className="text-[11px] text-muted mb-5">
                {t("pkgHealthSub")}
              </p>
              <div className="mb-5">
                <div className="font-serif text-2xl font-bold text-amber">{t("pkgHealthPrice")}</div>
                <div className="text-[10px] text-muted mt-1">{t("pkgHealthPriceSub")}</div>
              </div>
              <div className="w-full h-px bg-black/5 mb-4" />
              <ul className="list-none m-0 p-0 flex-1 flex flex-col gap-2.5">
                <li className="text-[11.5px] text-mid flex gap-2"><span className="text-[10px] text-teal-brand font-bold">✓</span> {t("pkgHealthItem1")}</li>
                <li className="text-[11.5px] text-mid flex gap-2"><span className="text-[10px] text-teal-brand font-bold">✓</span> {t("pkgHealthItem2")}</li>
                <li className="text-[11.5px] text-mid flex gap-2"><span className="text-[10px] text-teal-brand font-bold">✓</span> {t("pkgHealthItem3")}</li>
                <li className="text-[11.5px] text-mid flex gap-2"><span className="text-[10px] text-teal-brand font-bold">✓</span> {t("pkgHealthItem4")}</li>
              </ul>
              <Link href="#contact-form" className="text-[12px] font-bold text-amber hover:underline mt-6 flex items-center justify-between group decoration-transparent">
                <span>{t("pkgActionInquire")}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Package 4 */}
            <div className="bg-white border border-border rounded-2xl p-6.5 flex flex-col hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300">
              <span className="text-[9.5px] bg-black/5 text-mid font-bold uppercase tracking-wider px-2 py-1 rounded-full w-fit mb-4">
                {t("pkgResortTag")}
              </span>
              <div className="text-3xl mb-2">🏨</div>
              <h4 className="font-serif text-[17px] font-semibold text-dark mb-1">
                {t("pkgResortTitle")}
              </h4>
              <p className="text-[11px] text-muted mb-5">
                {t("pkgResortSub")}
              </p>
              <div className="mb-5">
                <div className="font-serif text-2xl font-bold text-dark">{t("pkgResortPrice")}</div>
                <div className="text-[10px] text-muted mt-1">{t("pkgResortPriceSub")}</div>
              </div>
              <div className="w-full h-px bg-black/5 mb-4" />
              <ul className="list-none m-0 p-0 flex-1 flex flex-col gap-2.5">
                <li className="text-[11.5px] text-mid flex gap-2"><span className="text-[10px] text-teal-brand font-bold">✓</span> {t("pkgResortItem1")}</li>
                <li className="text-[11.5px] text-mid flex gap-2"><span className="text-[10px] text-teal-brand font-bold">✓</span> {t("pkgResortItem2")}</li>
                <li className="text-[11.5px] text-mid flex gap-2"><span className="text-[10px] text-teal-brand font-bold">✓</span> {t("pkgResortItem3")}</li>
                <li className="text-[11.5px] text-mid flex gap-2"><span className="text-[10px] text-teal-brand font-bold">✓</span> {t("pkgResortItem4")}</li>
              </ul>
              <Link href="#contact-form" className="text-[12px] font-bold text-dark hover:underline mt-6 flex items-center justify-between group decoration-transparent">
                <span>{t("pkgActionContact")}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TRAVEL CHECKLIST SECTION */}
      <section className="py-20 px-6 sm:px-12 lg:px-20 bg-sand/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <div className="text-[10.5px] font-semibold uppercase tracking-[2.5px] text-teal-brand mb-3">
              {t("checkEyebrow")}
            </div>
            <h2
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-dark tracking-tight mb-4"
              dangerouslySetInnerHTML={{ __html: t("checkTitleHtml") }}
            />
            <p className="text-[15px] leading-relaxed text-mid max-w-lg">
              {t("checkDesc")}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="bg-white rounded-xl p-4.5 border border-border flex items-start gap-4">
              <span className="w-6 h-6 rounded bg-teal-light text-teal-dark flex items-center justify-center font-bold text-sm shrink-0">✓</span>
              <div>
                <div className="text-[13px] font-bold text-dark mb-1">{t("checkItem1Title")}</div>
                <div className="text-[11.5px] text-muted leading-relaxed">{t("checkItem1Desc")}</div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4.5 border border-border flex items-start gap-4">
              <span className="w-6 h-6 rounded bg-teal-light text-teal-dark flex items-center justify-center font-bold text-sm shrink-0">✓</span>
              <div>
                <div className="text-[13px] font-bold text-dark mb-1">{t("checkItem2Title")}</div>
                <div className="text-[11.5px] text-muted leading-relaxed">{t("checkItem2Desc")}</div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4.5 border border-border flex items-start gap-4">
              <span className="w-6 h-6 rounded bg-teal-light text-teal-dark flex items-center justify-center font-bold text-sm shrink-0">✓</span>
              <div>
                <div className="text-[13px] font-bold text-dark mb-1">{t("checkItem3Title")}</div>
                <div className="text-[11.5px] text-muted leading-relaxed">{t("checkItem3Desc")}</div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4.5 border border-border flex items-start gap-4">
              <span className="w-6 h-6 rounded bg-teal-light text-teal-dark flex items-center justify-center font-bold text-sm shrink-0">✓</span>
              <div>
                <div className="text-[13px] font-bold text-dark mb-1">{t("checkItem4Title")}</div>
                <div className="text-[11.5px] text-muted leading-relaxed">{t("checkItem4Desc")}</div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4.5 border border-border flex items-start gap-4">
              <span className="w-6 h-6 rounded bg-teal-light text-teal-dark flex items-center justify-center font-bold text-sm shrink-0">✓</span>
              <div>
                <div className="text-[13px] font-bold text-dark mb-1">{t("checkItem5Title")}</div>
                <div className="text-[11.5px] text-muted leading-relaxed">{t("checkItem5Desc")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION SECTION */}
      <section id="location" className="py-20 px-6 sm:px-12 lg:px-20 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <div className="text-[10.5px] font-semibold uppercase tracking-[2.5px] text-teal-brand mb-3">
              {t("locEyebrow")}
            </div>
            <h2
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.15] text-dark tracking-tight mb-8"
              dangerouslySetInnerHTML={{ __html: t("locTitleHtml") }}
            />

            <div className="flex flex-col gap-6">
              <div className="flex gap-4 border-b border-border pb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-light text-teal-dark flex items-center justify-center text-lg shrink-0">📍</div>
                <div>
                  <div className="text-[11px] font-semibold text-muted tracking-wider mb-1">{t("locAddressLabel")}</div>
                  <div className="text-[13.5px] leading-relaxed text-dark font-medium whitespace-pre-line">{t("locAddressVal")}</div>
                  <div className="flex flex-wrap gap-2 mt-3.5">
                    <span className="text-[11px] bg-cream text-mid border border-border-med px-3 py-1.5 rounded-full">{t("locPill1")}</span>
                    <span className="text-[11px] bg-cream text-mid border border-border-med px-3 py-1.5 rounded-full">{t("locPill2")}</span>
                    <span className="text-[11px] bg-cream text-mid border border-border-med px-3 py-1.5 rounded-full">{t("locPill3")}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 border-b border-border pb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-light text-teal-dark flex items-center justify-center text-lg shrink-0">🕐</div>
                <div>
                  <div className="text-[11px] font-semibold text-muted tracking-wider mb-1">{t("locHoursLabel")}</div>
                  <div className="text-[13.5px] leading-relaxed text-dark font-medium whitespace-pre-line">{t("locHoursVal")}</div>
                </div>
              </div>

              <div className="flex gap-4 border-b border-border pb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-light text-teal-dark flex items-center justify-center text-lg shrink-0">📞</div>
                <div>
                  <div className="text-[11px] font-semibold text-muted tracking-wider mb-1">{t("locPhoneLabel")}</div>
                  <div className="text-[13.5px] leading-relaxed text-dark font-medium whitespace-pre-line font-serif font-bold">
                    <a href="tel:075821999" className="hover:underline">{t("locPhoneVal")}</a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-light text-teal-dark flex items-center justify-center text-lg shrink-0">💬</div>
                <div>
                  <div className="text-[11px] font-semibold text-muted tracking-wider mb-1">{t("locSocialLabel")}</div>
                  <div className="text-[13.5px] leading-relaxed text-dark font-medium whitespace-pre-line">{t("locSocialVal")}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-teal-light/40 rounded-2xl h-[420px] flex flex-col items-center justify-center gap-4 text-teal-dark border border-teal-brand/10 p-6 shadow-inner select-none relative overflow-hidden">
            {/* Real OpenStreetMap fallback/mock style design */}
            <div className="absolute inset-0 bg-cover bg-center opacity-25" style={{ backgroundImage: `url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/100.2,7.6,12/420x420?access_token=placeholder')` }} />
            <Compass className="w-14 h-14 text-teal-brand animate-spin" style={{ animationDuration: "12s" }} />
            <span className="font-serif text-lg font-semibold z-10 text-dark">Thonburi Lanta Hospital</span>
            <span className="text-[12px] text-muted tracking-wide text-center z-10 max-w-[280px]">Saladan Sub-district, Ko Lanta District, Krabi 81150</span>
            <a
              href="https://maps.google.com/?q=Koh+Lanta"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 bg-teal-brand text-white border-0 py-2.5 px-5 rounded-lg text-[12px] font-semibold hover:bg-teal-dark transition-all shadow-md z-10 cursor-pointer decoration-transparent"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* INQUIRY FORM SECTION */}
      <section className="py-20 px-6 sm:px-12 lg:px-20 bg-cream">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20">
          <InquiryForm />

          <div className="lg:pt-4 flex flex-col justify-center">
            <div className="text-[10.5px] font-semibold uppercase tracking-[2.5px] text-teal-brand mb-3">
              {t("inqRightEyebrow")}
            </div>
            <h2
              className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-[1.2] text-dark tracking-tight mb-4"
              dangerouslySetInnerHTML={{ __html: t("inqRightTitleHtml") }}
            />
            <p className="text-[14.5px] leading-relaxed text-mid mb-10 max-w-md">
              {t("inqRightSub")}
            </p>

            <div className="flex flex-col">
              <div className="flex items-start gap-4 border-b border-border py-4">
                <div className="w-10 h-10 rounded-lg bg-teal-light text-teal-dark flex items-center justify-center text-lg shrink-0 mt-0.5">📞</div>
                <div>
                  <div className="text-[10.5px] font-semibold text-muted tracking-wider mb-1">CALL US 24/7</div>
                  <div className="text-[14px] text-dark font-serif font-bold">075-821-999</div>
                </div>
              </div>
              <div className="flex items-start gap-4 border-b border-border py-4">
                <div className="w-10 h-10 rounded-lg bg-teal-light text-teal-dark flex items-center justify-center text-lg shrink-0 mt-0.5">💬</div>
                <div>
                  <div className="text-[10.5px] font-semibold text-muted tracking-wider mb-1">LINE OA</div>
                  <div className="text-[14px] text-dark font-medium">@thonburilanta</div>
                </div>
              </div>
              <div className="flex items-start gap-4 py-4">
                <div className="w-10 h-10 rounded-lg bg-teal-light text-teal-dark flex items-center justify-center text-lg shrink-0 mt-0.5">✉️</div>
                <div>
                  <div className="text-[10.5px] font-semibold text-muted tracking-wider mb-1">EMAIL</div>
                  <div className="text-[14px] text-dark font-medium">contact@thonburilanta.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
