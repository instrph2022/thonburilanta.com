"use client";

import React, { useState, useEffect } from "react";
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

interface ReviewItem {
  name: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
  profile_photo_url?: string;
}

export default function Home() {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [googleReviews, setGoogleReviews] = useState<ReviewItem[]>(REVIEWS);
  const [googleRating, setGoogleRating] = useState("5.0");
  const [googleTotalReviews, setGoogleTotalReviews] = useState("60+");

  useEffect(() => {
    async function getReviews() {
      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
      const placeId = process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID || "ChIJTX2VL3jBUTARtzm-qlggWDg";

      if (!apiKey) return;

      try {
        const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&key=${apiKey}&language=${language}`;
        const res = await fetch(url);
        const result = await res.json();
        if (result.status === "OK" && result.result?.reviews) {
          const mapped = result.result.reviews.map((rev: {
            author_name: string;
            rating: number;
            text: string;
            profile_photo_url?: string;
            relative_time_description?: string;
          }) => ({
            name: rev.author_name,
            rating: rev.rating,
            date: rev.relative_time_description || "recently",
            text: rev.text,
            avatar: rev.author_name.charAt(0),
            profile_photo_url: rev.profile_photo_url,
          }));
          setGoogleReviews(mapped);
          setGoogleRating(result.result.rating.toFixed(1));
          setGoogleTotalReviews(result.result.user_ratings_total.toString());
        }
      } catch (error) {
        console.error("Failed to fetch Google reviews directly:", error);
      }
    }
    getReviews();
  }, [language]);

  const filteredInsurances = searchQuery.trim() === ""
    ? ["Allianz", "AXA", "Europ Assistance", "DAN", "Bupa", "Cigna", "Generali", "Folksam"]
    : INSURANCES.filter(ins => ins.toLowerCase().includes(searchQuery.toLowerCase()));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalClinic",
    "name": "Thonburi Lanta Clinic",
    "alternateName": "คลินิกธนบุรีลันตา",
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
    "medicalSpecialty": ["Emergency Medicine", "General Practice", "Dive Medicine"]
  };

  const faqData = {
    en: [
      {
        q: "Is there a medical clinic on Koh Lanta?",
        a: "Yes, Thonburi Lanta Clinic is Koh Lanta's premium medical clinic. It is open 24 hours a day for emergency contact and is located in the Saladan area, Koh Lanta, Krabi.",
      },
      {
        q: "What should I do if I get injured while diving in Koh Lanta?",
        a: "Go directly to Thonburi Lanta Clinic. We have dive medicine specialists available to consult on decompression sickness (DCS), pressure injuries, and marine wildlife stings, plus first-aid oxygen support.",
      },
      {
        q: "Does Koh Lanta have emergency care?",
        a: "Yes, Thonburi Lanta Clinic features a fully equipped Emergency Room (ER) open 24/7 for urgent clinical care and ambulance support. Walk-ins are welcome; no appointment is necessary for ER.",
      },
      {
        q: "Can I use international health insurance at Thonburi Lanta Clinic?",
        a: "Yes, we accept major international travel and health insurance (such as Allianz, AXA, Europ Assistance, and DAN). We provide English medical certificates, itemized bills, and direct-billing support (GOP processing).",
      },
      {
        q: "Is there an English-speaking doctor in Koh Lanta?",
        a: "Yes, all medical doctors, specialists, and nurses at Thonburi Lanta Clinic are fluent in English. We regularly treat expats, international tourists, and resort guests.",
      },
      {
        q: "What is the nearest clinic to Koh Lanta?",
        a: "Thonburi Lanta Clinic is located directly on Koh Lanta island (Krabi). You no longer need to travel to Krabi Town or Trang for outpatient clinical services or 24/7 emergency response.",
      },
    ],
    th: [
      {
        q: "คลินิกการแพทย์ในเกาะลันตามีไหม?",
        a: "มีครับ คลินิกธนบุรีลันตา เป็นคลินิกการแพทย์ครบวงจรแห่งแรกบนเกาะลันตา เปิดให้บริการตลอด 24 ชั่วโมงสำหรับการประสานงานฉุกเฉิน ตั้งอยู่ในย่านศาลาด่าน อำเภอเกาะลันตา จังหวัดกระบี่",
      },
      {
        q: "หากได้รับบาดเจ็บจากการดำน้ำที่เกาะลันตา ควรทำอย่างไร?",
        a: "เดินทางมาที่คลินิกธนบุรีลันตาได้ทันที เรามีแพทย์ผู้เชี่ยวชาญด้านเวชศาสตร์ใต้น้ำ (Dive Medicine) พร้อมให้คำปรึกษาดูแลรักษาภาวะโรคน้ำหนีบ (Decompression Sickness - DCS) และอุบัติเหตุจากการดำน้ำทุกประเภท",
      },
      {
        q: "เกาะลันตามีห้องฉุกเฉินหรือบริการผู้ป่วยอุบัติเหตุไหม?",
        a: "มีครับ คลินิกธนบุรีลันตาเปิดให้บริการแผนกฉุกเฉินและอุบัติเหตุ (ER) ตลอด 24 ชั่วโมง ทุกวัน พร้อมรถพยาบาลฉุกเฉินรับส่งผู้ป่วยกรณีเร่งด่วน โดยไม่ต้องนัดหมายล่วงหน้า",
      },
      {
        q: "สามารถใช้ประกันสุขภาพต่างประเทศที่คลินิกธนบุรีลันตาได้หรือไม่?",
        a: "ได้ครับ เรายินดีรับประกันภัยการเดินทางและประกันสุขภาพต่างประเทศชั้นนำเกือบทุกบริษัท โดยมีทีมงานช่วยประสานงานเคลมตรง (Direct Billing) ออกใบรับรองแพทย์และเอกสารสรุปประวัติเป็นภาษาอังกฤษเพื่อความสะดวกในการเคลมเคลียร์ค่าใช้จ่าย",
      },
      {
        q: "มีหมอที่สื่อสารภาษาอังกฤษบนเกาะลันตาไหม?",
        a: "มีครับ แพทย์และพยาบาลวิชาชีพของคลินิกธนบุรีลันตาสามารถสื่อสารภาษาอังกฤษได้อย่างคล่องแคล่ว พร้อมให้การดูแลนักท่องเที่ยวชาวต่างชาติและ Expat ที่พำนักระยะยาวบนเกาะอย่างเข้าใจละเอียด",
      },
      {
        q: "คลินิกที่ใกล้ที่สุดบนเกาะลันตาคือที่ไหน?",
        a: "คลินิกธนบุรีลันตา ตั้งอยู่บนเกาะลันตาโดยตรง ช่วยให้ผู้ป่วยไม่ต้องเดินทางข้ามเรือไปรักษาตัวที่ตัวเมืองกระบี่หรือตรังสำหรับอาการป่วยไข้ทั่วไปและการตรวจรักษาผู้ป่วยนอก",
      },
    ],
  };

  const currentFaqs = faqData[language] || faqData.en;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": currentFaqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };

  return (
    <>
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
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
              <Award className="w-3.5 h-3.5 text-teal-brand" />
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
              <span className="font-serif text-2xl font-bold text-dark block leading-none">OPD</span>
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

                <div className="flex items-center gap-4 bg-amber-light/30 rounded-xl p-3 border border-amber/15">
                  <img 
                    src="/logo-aaci.png" 
                    alt="AACI Quality & Patient Safety" 
                    className="w-12 h-12 object-contain shrink-0" 
                  />
                  <div className="flex-1">
                    <span className="text-[10px] font-bold text-amber uppercase tracking-wider block">AACI Certification</span>
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
                <h4 className="text-[15px] font-semibold text-dark mb-1.5">24/7 On-Call Emergency & OPD</h4>
                <p className="text-[12.5px] text-mid leading-relaxed">Emergency ambulance transfer, trauma response, and on-call medical consultations anytime.</p>
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
                <h4 className="text-[15px] font-semibold text-dark mb-1.5">Travel Medicine & Insurance</h4>
                <p className="text-[12.5px] text-mid leading-relaxed">Traveler health consulting, vaccine guidelines, and direct billing coordination with international insurers.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-teal-light text-teal-dark rounded-lg flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                <Heart className="w-5 h-5 text-teal-brand" />
              </div>
              <div>
                <h4 className="text-[15px] font-semibold text-dark mb-1.5">On-Site Pharmacy Services</h4>
                <p className="text-[12.5px] text-mid leading-relaxed">Certified pharmacy services on-site, providing essential medicines and travel clinic prescriptions.</p>
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

          <div className="bg-white rounded-2xl h-[420px] overflow-hidden border border-border shadow-sm relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3958.8260381648057!2d99.03080757574744!3d7.260580914275141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3051e7cc4d830b49%3A0xe54d9c49007f354f!2z4LmC4Lij4LiH4Lie4Lii4Liy4Lia4Liy4Lil4LiY4LiZ4Li44Lia4Lix4LiZ4LmC4Lil4Liw4LmC4LiB4LmH!5e0!3m2!1sth!2sth!4v1716942000000!5m2!1sth!2sth"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur p-4 rounded-xl shadow-md border border-border flex items-center justify-between gap-4">
              <div>
                <span className="font-serif text-[13.5px] font-bold text-dark block leading-tight">Thonburi Lanta Clinic</span>
                <span className="text-[10px] text-muted block mt-0.5">Saladan, Ko Lanta, Krabi 81150</span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Thonburi+Lanta+Hospital"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-teal-brand text-white border-0 py-2 px-3.5 rounded-lg text-[11px] font-semibold hover:bg-teal-dark transition-all shadow-sm cursor-pointer decoration-transparent whitespace-nowrap"
              >
                Open in Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS SECTION */}
      <section className="py-24 bg-cream/35 relative overflow-hidden border-t border-border">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800d_1px,transparent_1px),linear-gradient(to_bottom,#8080800d_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-teal-light opacity-50 blur-[100px]" />

        {/* Header */}
        <div className="container mx-auto px-4 relative z-10 mb-12 text-center">
          <span className="text-teal-brand font-bold tracking-wider uppercase text-xs mb-2 block bg-teal-light w-fit mx-auto px-3 py-1 rounded-full border border-teal-mid/10">
            {language === 'th' ? "รีวิวจากผู้ใช้บริการจริง" : "PATIENT REVIEWS"}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-dark leading-tight mb-4">
            {language === 'th' ? "เสียงยืนยันจาก" : "What Our Patients"}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-brand to-teal-mid">
              {language === 'th' ? "ผู้ใช้บริการจริง" : "Say"}
            </span>
          </h2>

          {/* Google Rating Badge */}
          <div className="inline-flex items-center gap-3 bg-white border border-border rounded-2xl px-5 py-3 shadow-sm mt-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-gray-900 text-lg leading-none">{googleRating}</span>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(i => (
                  <span key={i} className={`text-amber text-lg leading-none ${i <= Math.round(parseFloat(googleRating)) ? 'opacity-100' : 'opacity-20'}`}>★</span>
                ))}
              </div>
              <span className="text-gray-400 text-sm">({googleTotalReviews})</span>
            </div>
          </div>
        </div>

        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-warm-white via-warm-white/40 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-warm-white via-warm-white/40 to-transparent z-10 pointer-events-none" />
          
          <div className="flex w-max animate-marquee hover:[animation-play-state:paused] gap-6 py-4">
            {[...googleReviews, ...googleReviews, ...googleReviews].map((rev, index) => (
              <div
                key={`${rev.name}-${index}`}
                className="w-[340px] md:w-[380px] flex-shrink-0 bg-white rounded-2xl p-6 border border-border flex flex-col justify-between hover:scale-[1.01] transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full overflow-hidden bg-teal-brand/10 text-teal-brand flex items-center justify-center font-bold text-[15px] border border-border shrink-0">
                        {rev.profile_photo_url ? (
                          <img src={rev.profile_photo_url} alt={rev.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        ) : (
                          rev.avatar
                        )}
                      </div>
                      <div>
                        <h4 className="text-[13.5px] font-bold text-dark leading-tight">{rev.name}</h4>
                        <span className="text-[10px] text-muted">{rev.date}</span>
                      </div>
                    </div>
                    {/* Google Icon badge */}
                    <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <div className="flex gap-0.5 text-amber text-[13px] mb-3">
                    {"★".repeat(rev.rating)}
                  </div>
                  <p className="text-[12.5px] leading-relaxed text-mid line-clamp-4">
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

        {/* View All Button */}
        <div className="text-center mt-10 relative z-10">
          <a
            href="https://search.google.com/local/reviews?placeid=ChIJTX2VL3jBUTARtzm-qlggWDg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[12.5px] font-semibold text-mid hover:text-teal-brand transition-colors group px-6 py-3 rounded-full bg-white border border-border shadow-sm hover:shadow hover:border-teal-brand/20 decoration-transparent"
          >
            <span>{language === 'th' ? "ดูรีวิวทั้งหมดบน Google" : "View All Google Reviews"}</span>
            <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
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
