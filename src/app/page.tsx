"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import InquiryForm from "@/components/InquiryForm";
import { Shield, Compass, Search, Heart, Phone, Clock, MapPin, Activity, Award, Users, Check, AlertCircle } from "lucide-react";

const INSURANCES = [
  "Allianz", "Allianz Partners", "AXA", "AXA Assistance", "AXA PPP Healthcare", "Bupa", "Cigna", 
  "Generali", "Gouda", "Hanse MerKur", "Falck", "Folksam", "Gjensidige", "Luma", "Blue Cross Blue Shield", 
  "Chubb", "Aviva", "Bangkok Insurance", "Bangkok Life", "Muang Thai Life (MTL)", "LMG Insurance", 
  "Liberty Insurance", "DAN (Divers Alert Network)", "Australasian Assistance", "Barclays", 
  "Barmenia Versicherungen", "Best Service Group", "Can Assistance", "CCS Insurance Services", 
  "CEGA", "Celta Assistance", "Columbus Direct", "Compass", "Coris", "Cover for you", "Cover More", 
  "Debeka", "Deutsche Assistance", "Direct Line Group", "Dkv", "Dynamiq", "Ema Global", 
  "Eurocross Assistance", "Europ Assistance", "First Assistance", "Harel", "Healix", "Henner Assurances", 
  "HTH Worldwide", "Huk Coburg", "IATI", "If Insurance", "Mima Groupe", "InsureandGo", "Intana Global", 
  "Inter Mutuelles", "Inter Partner", "ICS", "Localtapiola", "Malteser", "Manulife", "Medic Air", 
  "MetLife", "Mondial Assistance", "Morgan Price", "Mutas", "Nationwide", "NextCare", "Nib", 
  "Now Health International", "On Call International"
];

const REVIEWS = [
  {
    name: "Laura Moggs",
    rating: 5,
    date: "2025-02-25",
    text: "Probably the best health care experience of my life. Seen very quickly and given exceptional care. The clinic manager Joah was on hand at all times and sat with me whilst my medication was being prepared as I was alone. Couldn’t fault my experience. The loveliest people work here!",
    avatar: "L"
  },
  {
    name: "Vanessa Fernandes",
    rating: 5,
    date: "2025-05-20",
    text: "Excellent service. I fainted at the restaurant next door and they immediately called the clinic. They arrived instantly, brought me in and did tests. The nurse and doctor were incredibly friendly and explained everything clearly in English. Super smooth insurance coordination!",
    avatar: "V"
  },
  {
    name: "Madeleine Davis",
    rating: 5,
    date: "2025-05-06",
    text: "Really lovely and welcoming team. I was seen and given treatment incredibly quickly and efficiently. Thank you for making what could be quite a daunting experience very positive!",
    avatar: "M"
  },
  {
    name: "Rob A.",
    rating: 5,
    date: "2025-04-16",
    text: "Excellent service provided. Good communication and very helpful and friendly staff. Needed wound cleaning and dressing daily and they sorted this liaising with my travel insurer.",
    avatar: "R"
  },
  {
    name: "Sunesh Smith",
    rating: 5,
    date: "2025-04-02",
    text: "I suffered very bad food poisoning and spent an evening in the clinic. I was very well looked after by the staff and seen to by the doctor quickly. They even helped contact my insurance to settle the bill on the night. Highly recommend!",
    avatar: "S"
  },
  {
    name: "Amelia Kirby",
    rating: 5,
    date: "2025-04-02",
    text: "Kind attentive staff, little to no wait. Clean and professional facility. I was treated as soon as I arrived and they even drove me back to my hotel. They delivered medicine to my hotel later that day. Highly recommend.",
    avatar: "A"
  }
];

export default function Home() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredInsurances = searchQuery.trim() === ""
    ? ["Allianz", "AXA", "Europ Assistance", "DAN", "Bupa", "Cigna", "Generali", "Folksam"]
    : INSURANCES.filter(ins => ins.toLowerCase().includes(searchQuery.toLowerCase()));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    "name": "Thonburi Lanta Hospital",
    "alternateName": "โรงพยาบาลธนบุรีลันตา",
    "url": "https://thonburilanta.com",
    "telephone": "+66-81-569-7890",
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
                <a href="tel:+66815697890" className="hover:underline decoration-transparent">
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
        <div className="relative flex flex-col justify-center items-center py-16 px-6 lg:px-12 border-l border-border overflow-hidden min-h-[500px]">
          {/* Main Hospital Exterior Render Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] hover:scale-105"
            style={{ backgroundImage: "url('/hospital_exterior.jpg')" }}
          />
          {/* Premium dark/glass overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/45 to-transparent pointer-events-none" />

          <div className="relative z-10 w-full max-w-[440px] flex flex-col gap-6">
            
            {/* Primary Admissions Gate Card */}
            <div className="bg-white/85 backdrop-blur-md rounded-2xl p-6 border border-white/60 shadow-xl shadow-teal-dark/5 hover:scale-[1.01] transition-transform duration-300">
              <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-brand flex items-center justify-center p-1.5 shadow-md shadow-teal-brand/10">
                    <Activity className="w-4 h-4 text-amber" />
                  </div>
                  <div>
                    <h3 className="text-[12.5px] font-bold text-dark tracking-tight leading-tight">CLINICAL ADMISSION</h3>
                    <p className="text-[9px] font-medium text-muted tracking-wider">THONBURI HEALTHCARE GROUP</p>
                  </div>
                </div>
                <div className="bg-teal-light border border-teal-brand/10 text-teal-dark px-2.5 py-1 rounded-full text-[9px] font-bold flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-brand animate-ping" />
                  <span>Fully Operational</span>
                </div>
              </div>

              {/* Patient Passport Data Roster */}
              <div className="flex flex-col gap-3.5">
                <div className="flex items-start gap-3 bg-cream/50 rounded-xl p-3 border border-border/40">
                  <Clock className="w-4 h-4 text-teal-brand mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Emergency & OPD Response</span>
                    <span className="text-[12.5px] font-bold text-dark block mt-0.5">24 Hours / 7 Days On-Duty</span>
                    <span className="text-[10px] text-mid block mt-0.5">Walk in directly — medical staff present at all hours.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-cream/50 rounded-xl p-3 border border-border/40">
                  <Users className="w-4 h-4 text-teal-brand mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider block">Clinical Language Gate</span>
                    <span className="text-[12.5px] font-bold text-dark block mt-0.5">English & Multilingual Staff</span>
                    <span className="text-[10px] text-mid block mt-0.5">Full translation support, medical documentation in English.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-amber-light/70 rounded-xl p-3 border border-amber/10">
                  <Award className="w-4 h-4 text-amber mt-0.5 shrink-0" />
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-amber-light text-dark uppercase tracking-wider block">AACI Certification</span>
                    <span className="text-[12.5px] font-bold text-dark block mt-0.5">Accredited Ambulatory Facility</span>
                    <span className="text-[10px] text-mid block mt-0.5">International safety and quality standards audited under US guidelines.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions / Micro-info cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 border border-white/50 shadow-md hover:translate-y-[-2px] transition-all duration-300">
                <div className="w-7 h-7 rounded-lg bg-teal-light flex items-center justify-center text-teal-brand mb-2">
                  <Shield className="w-4 h-4 text-teal-brand" />
                </div>
                <h4 className="text-[11.5px] font-bold text-dark">Insurance Gate</h4>
                <p className="text-[9.5px] text-muted mt-1 leading-snug">Direct billing with 60+ global travel policies.</p>
              </div>

              <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 border border-white/50 shadow-md hover:translate-y-[-2px] transition-all duration-300">
                <div className="w-7 h-7 rounded-lg bg-red-50 flex items-center justify-center text-red-soft mb-2">
                  <Heart className="w-4 h-4 text-red-soft" />
                </div>
                <h4 className="text-[11.5px] font-bold text-dark">Pediatric Clinic</h4>
                <p className="text-[9.5px] text-muted mt-1 leading-snug">Comfortable diagnostic room for infants and children.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TRUST BAND */}
      <section className="bg-dark text-white/80 py-5 px-6 lg:px-12 select-none">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] font-medium tracking-wide">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-amber" />
            <span>{t("tbEnglish")}</span>
          </div>
          <div className="w-px h-4.5 bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-amber" />
            <span>{t("tbInsurance")}</span>
          </div>
          <div className="w-px h-4.5 bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-red-soft" />
            <span>{t("tbEmergency")}</span>
          </div>
          <div className="w-px h-4.5 bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-amber" />
            <span>{t("tbPaediatric")}</span>
          </div>
          <div className="w-px h-4.5 bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber" />
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
            <div className="bg-white rounded-2xl p-7 border border-border shadow-sm hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-teal-light flex items-center justify-center mb-5">
                <Heart className="w-6 h-6 text-teal-brand" />
              </div>
              <h4 className="text-[15px] font-bold text-dark mb-2">
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
            <div className="bg-white rounded-2xl p-7 border border-border shadow-sm hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-ocean-light flex items-center justify-center mb-5">
                <Compass className="w-6 h-6 text-teal-brand" />
              </div>
              <h4 className="text-[15px] font-bold text-dark mb-2">
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
            <div className="bg-white rounded-2xl p-7 border border-border shadow-sm hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-amber-light flex items-center justify-center mb-5">
                <Shield className="w-6 h-6 text-amber" />
              </div>
              <h4 className="text-[15px] font-bold text-dark mb-2">
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
              <div className="w-10 h-10 bg-teal-light text-teal-dark rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Activity className="w-5 h-5 text-teal-brand" />
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-dark mb-1.5">OPD & ER 24hr</h4>
                <p className="text-[12.5px] text-mid leading-relaxed">Emergency ambulance transfer, trauma response, and walk-in outpatient consultations anytime.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-teal-light text-teal-dark rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Compass className="w-5 h-5 text-teal-brand" />
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-dark mb-1.5">Dive Medicine Specialist</h4>
                <p className="text-[12.5px] text-mid leading-relaxed">Providing fitness-to-dive certificates and urgent decompression sickness (DCS) support.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-teal-light text-teal-dark rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Shield className="w-5 h-5 text-teal-brand" />
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-dark mb-1.5">Health Checkup Center</h4>
                <p className="text-[12.5px] text-mid leading-relaxed">Yearly checkups, blood tests, kidney/liver profiles, and wellness consulting.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-teal-light text-teal-dark rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Award className="w-5 h-5 text-teal-brand" />
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-dark mb-1.5">General Surgery</h4>
                <p className="text-[12.5px] text-mid leading-relaxed">Minor surgeries, wound suture, advanced stitches, and burn treatments.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-teal-light text-teal-dark rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Search className="w-5 h-5 text-teal-brand" />
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-dark mb-1.5">Lab & Diagnostics</h4>
                <p className="text-[12.5px] text-mid leading-relaxed">Fully equipped on-site diagnostic lab, biochemistry testing, and fast reports.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-teal-light text-teal-dark rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Heart className="w-5 h-5 text-teal-brand" />
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

          <div className="mb-8 max-w-md relative">
            <span className="absolute left-4 top-3.5 text-white/50">
              <Search className="w-5 h-5" />
            </span>
            <input
              type="text"
              placeholder="Type to search your travel insurance provider..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/15 border border-white/20 rounded-xl py-3 pl-12 pr-10 text-white placeholder-white/40 focus:outline-none focus:border-white/50 text-[14.5px] shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-3.5 text-white/50 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {filteredInsurances.slice(0, 8).map((ins) => (
              <div key={ins} className="bg-white/10 border border-white/15 rounded-xl p-5 text-center hover:bg-white/15 transition-colors duration-200">
                <Shield className="w-5 h-5 text-amber mx-auto mb-3" />
                <div className="text-[13.5px] font-bold text-white mb-0.5">{ins}</div>
                <div className="text-[10px] text-white/50">Accepted Direct Billing</div>
              </div>
            ))}
            {filteredInsurances.length === 0 && (
              <div className="col-span-2 md:col-span-4 text-center py-8 text-white/60 text-[14px]">
                No matching insurer found. Contact us to verify. We work with most international travel policies.
              </div>
            )}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4.5 text-[12.5px] text-white/70 leading-relaxed flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber shrink-0 mt-0.5" />
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
            <div className="bg-teal-brand border border-teal-brand rounded-2xl p-6.5 text-white flex flex-col hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 overflow-hidden">
              <img src="/hyperbaric.png" alt="Hyperbaric Chamber" className="w-[calc(100%+3.25rem)] h-32 object-cover -mt-6.5 -mx-6.5 mb-5 opacity-90 hover:scale-105 transition-transform duration-500" />
              <span className="text-[9.5px] bg-white/20 text-white font-bold uppercase tracking-wider px-2 py-1 rounded-full w-fit mb-4">
                {t("pkgDiveTag")}
              </span>
              <Compass className="w-8 h-8 text-white mb-3" />
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
                <li className="text-[11.5px] text-white/90 flex gap-2"><Check className="w-3.5 h-3.5 text-white/60 shrink-0 mt-0.5" /> {t("pkgDiveItem1")}</li>
                <li className="text-[11.5px] text-white/90 flex gap-2"><Check className="w-3.5 h-3.5 text-white/60 shrink-0 mt-0.5" /> {t("pkgDiveItem2")}</li>
                <li className="text-[11.5px] text-white/90 flex gap-2"><Check className="w-3.5 h-3.5 text-white/60 shrink-0 mt-0.5" /> {t("pkgDiveItem3")}</li>
                <li className="text-[11.5px] text-white/90 flex gap-2"><Check className="w-3.5 h-3.5 text-white/60 shrink-0 mt-0.5" /> {t("pkgDiveItem4")}</li>
              </ul>
              <Link href="#contact-form" className="text-[12px] font-bold text-white hover:underline mt-6 flex items-center justify-between group decoration-transparent">
                <span>{t("pkgActionInquire")}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Package 2 */}
            <div className="bg-white border border-border rounded-2xl p-6.5 flex flex-col hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 overflow-hidden">
              <img src="/reception.png" alt="Hospital Reception" className="w-[calc(100%+3.25rem)] h-32 object-cover -mt-6.5 -mx-6.5 mb-5 hover:scale-105 transition-transform duration-500" />
              <span className="text-[9.5px] bg-teal-light text-teal-dark font-bold uppercase tracking-wider px-2 py-1 rounded-full w-fit mb-4">
                {t("pkgIslandTag")}
              </span>
              <Heart className="w-8 h-8 text-teal-brand mb-3" />
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
                <li className="text-[11.5px] text-mid flex gap-2"><Check className="w-3.5 h-3.5 text-teal-brand shrink-0 mt-0.5" /> {t("pkgIslandItem1")}</li>
                <li className="text-[11.5px] text-mid flex gap-2"><Check className="w-3.5 h-3.5 text-teal-brand shrink-0 mt-0.5" /> {t("pkgIslandItem2")}</li>
                <li className="text-[11.5px] text-mid flex gap-2"><Check className="w-3.5 h-3.5 text-teal-brand shrink-0 mt-0.5" /> {t("pkgIslandItem3")}</li>
                <li className="text-[11.5px] text-mid flex gap-2"><Check className="w-3.5 h-3.5 text-teal-brand shrink-0 mt-0.5" /> {t("pkgIslandItem4")}</li>
              </ul>
              <Link href="#contact-form" className="text-[12px] font-bold text-ocean hover:underline mt-6 flex items-center justify-between group decoration-transparent">
                <span>{t("pkgActionInquire")}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Package 3 */}
            <div className="bg-white border border-border rounded-2xl p-6.5 flex flex-col hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 overflow-hidden">
              <img src="/ct_scan.png" alt="CT Scan Room" className="w-[calc(100%+3.25rem)] h-32 object-cover -mt-6.5 -mx-6.5 mb-5 hover:scale-105 transition-transform duration-500" />
              <span className="text-[9.5px] bg-amber-light text-amber font-bold uppercase tracking-wider px-2 py-1 rounded-full w-fit mb-4">
                {t("pkgHealthTag")}
              </span>
              <Activity className="w-8 h-8 text-amber mb-3" />
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
                <li className="text-[11.5px] text-mid flex gap-2"><Check className="w-3.5 h-3.5 text-teal-brand shrink-0 mt-0.5" /> {t("pkgHealthItem1")}</li>
                <li className="text-[11.5px] text-mid flex gap-2"><Check className="w-3.5 h-3.5 text-teal-brand shrink-0 mt-0.5" /> {t("pkgHealthItem2")}</li>
                <li className="text-[11.5px] text-mid flex gap-2"><Check className="w-3.5 h-3.5 text-teal-brand shrink-0 mt-0.5" /> {t("pkgHealthItem3")}</li>
                <li className="text-[11.5px] text-mid flex gap-2"><Check className="w-3.5 h-3.5 text-teal-brand shrink-0 mt-0.5" /> {t("pkgHealthItem4")}</li>
              </ul>
              <Link href="#contact-form" className="text-[12px] font-bold text-amber hover:underline mt-6 flex items-center justify-between group decoration-transparent">
                <span>{t("pkgActionInquire")}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>

            {/* Package 4 */}
            <div className="bg-white border border-border rounded-2xl p-6.5 flex flex-col hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 overflow-hidden">
              <img src="/hospital_exterior.jpg" alt="Thonburi Lanta Hospital" className="w-[calc(100%+3.25rem)] h-32 object-cover -mt-6.5 -mx-6.5 mb-5 hover:scale-105 transition-transform duration-500" />
              <span className="text-[9.5px] bg-black/5 text-mid font-bold uppercase tracking-wider px-2 py-1 rounded-full w-fit mb-4">
                {t("pkgResortTag")}
              </span>
              <Award className="w-8 h-8 text-dark mb-3 animate-pulse" />
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
                <li className="text-[11.5px] text-mid flex gap-2"><Check className="w-3.5 h-3.5 text-teal-brand shrink-0 mt-0.5" /> {t("pkgResortItem1")}</li>
                <li className="text-[11.5px] text-mid flex gap-2"><Check className="w-3.5 h-3.5 text-teal-brand shrink-0 mt-0.5" /> {t("pkgResortItem2")}</li>
                <li className="text-[11.5px] text-mid flex gap-2"><Check className="w-3.5 h-3.5 text-teal-brand shrink-0 mt-0.5" /> {t("pkgResortItem3")}</li>
                <li className="text-[11.5px] text-mid flex gap-2"><Check className="w-3.5 h-3.5 text-teal-brand shrink-0 mt-0.5" /> {t("pkgResortItem4")}</li>
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
            <div className="bg-white rounded-xl p-4.5 border border-border flex items-start gap-4 shadow-sm">
              <div className="w-6 h-6 rounded bg-teal-light flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                <Check className="w-3.5 h-3.5 text-teal-brand" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-dark mb-1">{t("checkItem1Title")}</div>
                <div className="text-[11.5px] text-muted leading-relaxed">{t("checkItem1Desc")}</div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4.5 border border-border flex items-start gap-4 shadow-sm">
              <div className="w-6 h-6 rounded bg-teal-light flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                <Check className="w-3.5 h-3.5 text-teal-brand" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-dark mb-1">{t("checkItem2Title")}</div>
                <div className="text-[11.5px] text-muted leading-relaxed">{t("checkItem2Desc")}</div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4.5 border border-border flex items-start gap-4 shadow-sm">
              <div className="w-6 h-6 rounded bg-teal-light flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                <Check className="w-3.5 h-3.5 text-teal-brand" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-dark mb-1">{t("checkItem3Title")}</div>
                <div className="text-[11.5px] text-muted leading-relaxed">{t("checkItem3Desc")}</div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4.5 border border-border flex items-start gap-4 shadow-sm">
              <div className="w-6 h-6 rounded bg-teal-light flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                <Check className="w-3.5 h-3.5 text-teal-brand" />
              </div>
              <div>
                <div className="text-[13px] font-bold text-dark mb-1">{t("checkItem4Title")}</div>
                <div className="text-[11.5px] text-muted leading-relaxed">{t("checkItem4Desc")}</div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-4.5 border border-border flex items-start gap-4 shadow-sm">
              <div className="w-6 h-6 rounded bg-teal-light flex items-center justify-center shrink-0 mt-0.5 shadow-inner">
                <Check className="w-3.5 h-3.5 text-teal-brand" />
              </div>
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
                <div className="w-10 h-10 rounded-xl bg-teal-light text-teal-dark flex items-center justify-center shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5 text-teal-brand" />
                </div>
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
                <div className="w-10 h-10 rounded-xl bg-teal-light text-teal-dark flex items-center justify-center shrink-0 shadow-sm">
                  <Clock className="w-5 h-5 text-teal-brand" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-muted tracking-wider mb-1">{t("locHoursLabel")}</div>
                  <div className="text-[13.5px] leading-relaxed text-dark font-medium whitespace-pre-line">{t("locHoursVal")}</div>
                </div>
              </div>

              <div className="flex gap-4 border-b border-border pb-6">
                <div className="w-10 h-10 rounded-xl bg-teal-light text-teal-dark flex items-center justify-center shrink-0 shadow-sm">
                  <Phone className="w-5 h-5 text-teal-brand" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-muted tracking-wider mb-1">{t("locPhoneLabel")}</div>
                  <div className="text-[13.5px] leading-relaxed text-dark font-medium whitespace-pre-line font-serif font-bold">
                    <a href="tel:+66815697890" className="hover:underline">{t("locPhoneVal")}</a>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-teal-light text-teal-dark flex items-center justify-center shrink-0 shadow-sm">
                  <Users className="w-5 h-5 text-teal-brand" />
                </div>
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

      {/* GOOGLE REVIEWS SECTION */}
      <section className="py-20 px-6 sm:px-12 lg:px-20 bg-warm-white border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[30%_70%] gap-12 items-center">
            <div>
              <div className="text-[10.5px] font-semibold uppercase tracking-[2.5px] text-teal-brand mb-3">
                Reviews
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-dark tracking-tight mb-4">
                {t("revTitle")}
              </h2>
              <p className="text-[14px] text-mid leading-relaxed mb-6">
                {t("revSub")}
              </p>
              
              {/* Google Big Rating Badge */}
              <div className="bg-cream rounded-2xl p-5 border border-border flex flex-col items-center text-center shadow-sm max-w-[240px]">
                <span className="text-[13px] font-bold text-dark mb-1">Google Rating</span>
                <span className="text-4xl font-serif font-black text-teal-brand mb-1">5.0</span>
                <div className="flex gap-1 mb-2">
                  <span className="text-amber text-lg">★</span>
                  <span className="text-amber text-lg">★</span>
                  <span className="text-amber text-lg">★</span>
                  <span className="text-amber text-lg">★</span>
                  <span className="text-amber text-lg">★</span>
                </div>
                <span className="text-[11px] text-muted mb-4">Based on 60+ travelers&apos; reviews</span>
                <a
                  href="https://search.google.com/local/writereview?placeid=ChIJTX2VL3jBUTARtzm-qlggWDg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-teal-brand text-white border-0 py-2 px-4 rounded-xl text-[12px] font-semibold hover:bg-teal-dark transition-all cursor-pointer shadow-md decoration-transparent"
                >
                  {t("revWriteBtn")}
                </a>
              </div>
            </div>

            {/* Scrollable horizontal review list */}
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-teal-brand/20">
              {REVIEWS.map((rev) => (
                <div key={rev.name} className="min-w-[280px] sm:min-w-[340px] bg-cream rounded-2xl p-6 border border-border flex flex-col justify-between hover:scale-[1.01] transition-transform shadow-sm">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-teal-brand/10 text-teal-brand flex items-center justify-center font-bold text-[14px]">
                          {rev.avatar}
                        </div>
                        <div>
                          <h4 className="text-[13.5px] font-bold text-dark">{rev.name}</h4>
                          <span className="text-[10px] text-muted">{rev.date}</span>
                        </div>
                      </div>
                      <div className="flex gap-0.5 text-amber text-[13px]">
                        {"★".repeat(rev.rating)}
                      </div>
                    </div>
                    <p className="text-[12.5px] leading-relaxed text-mid italic">
                      &ldquo;{rev.text}&rdquo;
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 mt-5 text-[10px] text-teal-brand font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-brand animate-blink" />
                    <span>Verified Google Review</span>
                  </div>
                </div>
              ))}
            </div>
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
                  <div className="text-[14px] text-dark font-serif font-bold">
                    <a href="tel:+66815697890" className="hover:underline">081-569-7890</a>
                  </div>
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
