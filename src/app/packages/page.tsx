"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Check, Info, ArrowLeft, Star, Shield, Heart, Activity } from "lucide-react";

export default function PackagesPage() {
  const { language, t } = useLanguage();

  const [activeImage, setActiveImage] = React.useState<string | null>(null);

  const packagesList = [
    {
      id: "std_testing",
      isHero: true,
      tag: language === "en" ? "Confidential Testing" : "ตรวจหาเชื้อแบบรักษาความลับ",
      icon: "🩺",
      title: language === "en" ? "Confidential STD/STI Testing" : "ตรวจความลับกามโรค STD/STI",
      tagline: language === "en" ? "Fast results, 100% private, walk-ins welcome" : "ผลตรวจรวดเร็ว เป็นส่วนตัว 100% และรับผู้ป่วย Walk-In",
      price: language === "en" ? "Contact Us" : "ติดต่อสอบถาม",
      priceSub: language === "en" ? "For current rates and testing options" : "เพื่อรับข้อมูลราคาโปรแกรมล่าสุด",
      items: [
        language === "en" ? "Fast and highly accurate results" : "รายงานผลตรวจรวดเร็วและแม่นยำสูง",
        language === "en" ? "100% private and confidential consultation" : "การปรึกษาและเก็บรักษาความลับผู้ป่วย 100%",
        language === "en" ? "Walk-ins are welcome anytime" : "ยินดีรับผู้ป่วย Walk-in ทุกช่วงเวลาทำการ",
        language === "en" ? "Detailed medical report in English" : "ออกรายงานการตรวจสุขภาพเป็นภาษาอังกฤษ",
      ],
      target: language === "en" ? "Tourists, active travelers, expats" : "นักท่องเที่ยว ผู้ที่เดินทาง หรือชาวต่างชาติ",
      aeo: "std testing koh lanta, sti test thailand, confidential clinic koh lanta",
      imageUrl: "/pkg-std-testing.webp"
    },
    {
      id: "dengue_vaccine",
      isHero: false,
      tag: language === "en" ? "Preventive Vaccines" : "วัคซีนป้องกันโรค",
      icon: "💉",
      title: language === "en" ? "Dengue Fever Vaccines" : "วัคซีนป้องกันไข้เลือดออก",
      tagline: language === "en" ? "Protect your loved ones with preventive vaccines" : "ปกป้องคนที่คุณรักด้วยการฉีดวัคซีนป้องกันโรคไข้เลือดออก",
      price: language === "en" ? "Contact Us" : "ติดต่อสอบถาม",
      priceSub: language === "en" ? "For pricing and dose schedule details" : "สอบถามรายละเอียดราคาและรอบการฉีดวัคซีน",
      items: [
        language === "en" ? "Protects against all 4 strains of dengue virus" : "ป้องกันครอบคลุมไข้เลือดออกทั้ง 4 สายพันธุ์",
        language === "en" ? "Suitable for individuals aged 4 years and above" : "เหมาะสำหรับผู้มีอายุตั้งแต่ 4 ปีขึ้นไป",
        language === "en" ? "Reduces hospitalization rate by 90.4%" : "ช่วยลดอัตราการนอนรักษาในโรงพยาบาลได้ถึง 90.4%",
        language === "en" ? "Reduces severity and complications" : "ช่วยลดความรุนแรงของโรคและภาวะแทรกซ้อน",
      ],
      target: language === "en" ? "Families, travelers, long-stay residents" : "ครอบครัว นักท่องเที่ยว หรือผู้พำนักอาศัยระยะยาว",
      aeo: "dengue vaccine koh lanta, health clinic thailand, prevent dengue fever",
      imageUrl: "/pkg-dengue-vaccine.webp"
    },
    {
      id: "annual_vitality",
      isHero: false,
      tag: language === "en" ? "Health Checkup" : "ตรวจสุขภาพประจำปี",
      icon: "❤️",
      title: language === "en" ? "Annual Vitality Check" : "ตรวจสุขภาพประจำปีเพื่อพลังแห่งชีวิต",
      tagline: language === "en" ? "General and Advance health check programs" : "โปรแกรมตรวจสุขภาพทั่วไปและโปรแกรมตรวจวิเคราะห์ละเอียด",
      price: language === "en" ? "Contact Us" : "ติดต่อสอบถาม",
      priceSub: language === "en" ? "For Vitality Programs (1 & 2) pricing" : "สอบถามราคาโปรแกรม Vitality 1 และ 2",
      items: [
        language === "en" ? "Complete Blood Count (CBC) & Blood Glucose" : "ตรวจความสมบูรณ์ของเม็ดเลือด (CBC) และระดับน้ำตาล",
        language === "en" ? "Lipid, Kidney, Liver, and Thyroid functions" : "ตรวจไขมัน การทำงานของไต ตับ และไทรอยด์ฮอร์โมน",
        language === "en" ? "Physical examination & Check up report book" : "ตรวจร่างกายโดยแพทย์และสมุดรายงานผลการตรวจ",
        language === "en" ? "Program 1 (General) & Program 2 (Advance)" : "มีให้เลือกทั้งโปรแกรม 1 (ทั่วไป) และโปรแกรม 2 (ละเอียด)",
      ],
      target: language === "en" ? "Expats, long-stay tourists, local residents" : "ชาวต่างชาติ ผู้พำนักอาศัยระยะยาว หรือคนในพื้นที่",
      aeo: "health checkup koh lanta, wellness screening thailand, body check lanta",
      imageUrl: "/pkg-annual-vitality.webp"
    }
  ];

  return (
    <div className="min-h-screen bg-cream py-16 px-6 sm:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[12.5px] text-mid hover:text-teal-brand font-medium mb-10 transition-colors decoration-transparent"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === "en" ? "Back to Home" : "กลับหน้าหลัก"}</span>
        </Link>

        {/* Header */}
        <div className="text-center mb-16">
          <div className="text-[10px] font-semibold tracking-[2px] uppercase text-teal-brand mb-3 flex items-center justify-center gap-1.5">
            <Shield className="w-4 h-4 text-teal-brand" />
            <span>TRANSPARENT PRICING & SPECIALIST CARE</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-dark tracking-tight mb-4">
            {language === "en" ? "Our Healthcare Packages" : "แพ็กเกจสุขภาพและการรักษา"}
          </h1>
          <p className="text-[14.5px] text-mid max-w-xl mx-auto leading-relaxed">
            {language === "en"
              ? "Transparent, fixed prices designed for diverse island residents, active dive teams, tourists, and resort partners."
              : "ราคาโปร่งใส ชัดเจน ครอบคลุมการใช้ชีวิตบนเกาะ ทั้งกลุ่มนักดำน้ำ นักท่องเที่ยวทั่วไป และพนักงานโรงแรมคู่สัญญา"}
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packagesList.map((pkg) => (
            <div
              key={pkg.id}
              className={`rounded-2xl p-7 flex flex-col justify-between border transition-all duration-300 shadow-sm relative hover:-translate-y-1.5 hover:shadow-lg ${
                pkg.isHero
                  ? "bg-teal-brand border-teal-brand text-white"
                  : "bg-white border-border text-dark"
              }`}
            >
              <div>
                {/* Package image with Lightbox click trigger */}
                {pkg.imageUrl && (
                  <div 
                    onClick={() => setActiveImage(pkg.imageUrl)}
                    className="w-[calc(100%+3.5rem)] -mt-7 -mx-7 mb-5 overflow-hidden relative rounded-t-2xl cursor-zoom-in group aspect-[16/10] bg-black/5"
                  >
                    <img 
                      src={pkg.imageUrl} 
                      alt={pkg.title} 
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105" 
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 text-dark px-3 py-1.5 rounded-full text-[11px] font-bold shadow-md">
                        {language === "en" ? "🔍 Zoom Image" : "🔍 ขยายรูปภาพ"}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-start gap-2 mb-4">
                  <span
                    className={`text-[9.5px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                      pkg.isHero ? "bg-white/20 text-white" : "bg-teal-light text-teal-dark"
                    }`}
                  >
                    {pkg.tag}
                  </span>
                  {pkg.isHero && <Star className="w-4 h-4 text-amber fill-amber shrink-0" />}
                </div>

                {(() => {
                  const cn = `w-8 h-8 mb-3 ${pkg.isHero ? "text-white" : "text-teal-brand"}`;
                  switch(pkg.icon) {
                    case "🩺": return <Heart className={cn} />;
                    case "💉": return <Activity className={cn} />;
                    case "❤️": return <Shield className={cn} />;
                    default: return <Shield className={cn} />;
                  }
                })()}
                <h3 className="font-serif text-[19px] font-semibold mb-1">
                  {pkg.title}
                </h3>
                <p className={`text-[11.5px] mb-5 ${pkg.isHero ? "text-white/70" : "text-muted"}`}>
                  {pkg.tagline}
                </p>

                {/* Price block */}
                <div className="mb-6">
                  <div className="font-serif text-3xl font-bold">{pkg.price}</div>
                  <div className={`text-[10px] mt-1 ${pkg.isHero ? "text-white/60" : "text-muted"}`}>
                    {pkg.priceSub}
                  </div>
                </div>

                <div className={`w-full h-px mb-5 ${pkg.isHero ? "bg-white/20" : "bg-black/5"}`} />

                {/* Bullet items */}
                <ul className="list-none m-0 p-0 flex flex-col gap-3">
                  {pkg.items.map((item, idx) => (
                    <li key={idx} className="text-[12px] flex items-start gap-2">
                      <Check
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          pkg.isHero ? "text-white/70" : "text-teal-brand"
                        }`}
                      />
                      <span className={pkg.isHero ? "text-white/90" : "text-mid"}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons */}
              <div className="mt-8">
                {/* Target info */}
                <div
                  className={`flex items-start gap-2 p-3 rounded-lg mb-4 text-[11px] leading-snug border ${
                    pkg.isHero
                      ? "bg-white/10 border-white/15 text-white/90"
                      : "bg-cream border-border-med text-mid"
                  }`}
                >
                  <Info className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                  <div>
                    <strong>Target:</strong> {pkg.target}
                  </div>
                </div>

                <Link
                  href="/#contact-form"
                  className={`w-full text-center py-3 rounded-lg text-[13px] font-bold block transition-colors decoration-transparent ${
                    pkg.isHero
                      ? "bg-white text-teal-brand hover:bg-cream"
                      : "bg-teal-brand text-white hover:bg-teal-dark"
                  }`}
                >
                  {t("pkgActionContact")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal Component */}
      {activeImage && (
        <div 
          className="fixed inset-0 bg-dark/90 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          <div className="absolute top-4 right-4 text-white text-3xl font-normal cursor-pointer select-none bg-black/40 hover:bg-black/70 w-12 h-12 rounded-full flex items-center justify-center transition-colors">
            ✕
          </div>
          <div 
            className="max-w-5xl max-h-[90vh] w-full flex items-center justify-center overflow-hidden rounded-xl shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={activeImage} 
              alt="Healthcare Program Detail Banner" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg animate-scale-up" 
            />
          </div>
        </div>
      )}
    </div>
  );
}
