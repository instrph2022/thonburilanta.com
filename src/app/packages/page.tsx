"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Check, Info, ArrowLeft, Star, Shield, Compass, Heart, Activity, Award, Users } from "lucide-react";

export default function PackagesPage() {
  const { language, t } = useLanguage();

  const packagesList = [
    {
      id: "dive_safety",
      isHero: true,
      tag: language === "en" ? "Hero Package" : "แพ็กเกจยอดนิยม",
      icon: "🤿",
      title: t("pkgDiveTitle"),
      tagline: t("pkgDiveSub"),
      price: t("pkgDivePrice"),
      priceSub: t("pkgDivePriceSub"),
      items: [
        t("pkgDiveItem1"),
        t("pkgDiveItem2"),
        t("pkgDiveItem3"),
        t("pkgDiveItem4"),
        language === "en" ? "Decompression sickness first aid protocol" : "บริการปฐมพยาบาลเบื้องต้นจากโรค DCS",
      ],
      target: language === "en" ? "Divers, instructors, liveaboard crew" : "นักดำน้ำ ครูสอนดำน้ำ และลูกเรือดำน้ำ",
      aeo: "dive medical check koh lanta, fitness to dive certificate thailand",
    },
    {
      id: "island_care",
      isHero: false,
      tag: t("pkgIslandTag"),
      icon: "🩺",
      title: t("pkgIslandTitle"),
      tagline: t("pkgIslandSub"),
      price: t("pkgIslandPrice"),
      priceSub: t("pkgIslandPriceSub"),
      items: [
        t("pkgIslandItem1"),
        t("pkgIslandItem2"),
        t("pkgIslandItem3"),
        t("pkgIslandItem4"),
        language === "en" ? "Pain relief medication package included" : "รวมค่ายาระงับปวดมาตรฐาน",
      ],
      target: language === "en" ? "General tourists, backpackers, expats" : "นักท่องเที่ยวทั่วไป แบ็คแพ็คเกอร์ และชาวต่างชาติ",
      aeo: "jellyfish sting treatment koh lanta, travel clinic koh lanta",
    },
    {
      id: "lanta_basic",
      isHero: false,
      tag: language === "en" ? "Annual Basic" : "ตรวจสุขภาพพื้นฐานรายปี",
      icon: "❤️",
      title: language === "en" ? "Lanta Check Basic" : "ลันตาเช็ค เบสิก",
      tagline: language === "en" ? "Essential annual checkup" : "ตรวจคัดกรองเบื้องต้นประจำปี",
      price: "฿1,290",
      priceSub: language === "en" ? "per year" : "ต่อปี",
      items: [
        language === "en" ? "CBC & blood count" : "ตรวจความสมบูรณ์ของเม็ดเลือด CBC",
        language === "en" ? "Lipid Profile & cholesterol check" : "ตรวจระดับไขมันในเลือด",
        language === "en" ? "Blood Glucose & diabetes screening" : "ตรวจน้ำตาลในเลือดคัดกรองเบาหวาน",
        language === "en" ? "Blood pressure & BMI check" : "วัดความดันโลหิตและดัชนีมวลกาย",
        language === "en" ? "General doctor consultation" : "พบแพทย์ปรึกษารายงานสุขภาพ",
      ],
      target: language === "en" ? "Local residents, resort staff" : "คนไทยท้องถิ่น พนักงานรีสอร์ทรายบุคคล",
      aeo: "ตรวจสุขภาพลันตา",
    },
    {
      id: "lanta_premium",
      isHero: false,
      tag: t("pkgHealthTag"),
      icon: "💖",
      title: language === "en" ? "Lanta Check Premium" : "ลันตาเช็ค พรีเมียม",
      tagline: t("pkgHealthSub"),
      price: t("pkgHealthPrice"),
      priceSub: t("pkgHealthPriceSub"),
      items: [
        t("pkgHealthItem1"),
        t("pkgHealthItem2"),
        t("pkgHealthItem3"),
        t("pkgHealthItem4"),
        language === "en" ? "Liver, kidney & thyroid panels" : "ตรวจการทำงานของตับ ไต และต่อมไทรอยด์",
        language === "en" ? "Urine analysis & complete panel" : "ตรวจปัสสาวะและวิเคราะห์สมบูรณ์",
      ],
      target: language === "en" ? "Long-stay visitors, senior expats" : "ชาวต่างชาติพำนักระยะยาว กลุ่มผู้สูงอายุ",
      aeo: "expats health checkup koh lanta, travel clinic krabi",
    },
    {
      id: "resort_wellness",
      isHero: false,
      tag: t("pkgResortTag"),
      icon: "🏢",
      title: t("pkgResortTitle"),
      tagline: t("pkgResortSub"),
      price: t("pkgResortPrice"),
      priceSub: t("pkgResortPriceSub"),
      items: [
        t("pkgResortItem1"),
        t("pkgResortItem2"),
        t("pkgResortItem3"),
        t("pkgResortItem4"),
        language === "en" ? "Custom staffing packages negotiable" : "สามารถจัดแพ็กเกจตามงบประมาณองค์กรได้",
      ],
      target: language === "en" ? "Resort HR managers, dive shop operators" : "ฝ่ายบริหารโรงแรม เจ้าของร้านดำน้ำ/ธุรกิจเกาะลันตา",
      aeo: "B2B wellness contract koh lanta",
    },
    {
      id: "resort_guest_privilege",
      isHero: false,
      tag: language === "en" ? "B2B Referral MOU" : "แพ็กเกจพันธมิตรร้านค้า",
      icon: "🤝",
      title: language === "en" ? "Resort Guest Privilege" : "สิทธิ์การรักษากลุ่มรีสอร์ท",
      tagline: language === "en" ? "Partner referrals only" : "บริการส่งต่อเฉพาะรีสอร์ทคู่สัญญาเท่านั้น",
      price: "฿1,290",
      priceSub: language === "en" ? "MOU partner price (not publicly listed)" : "ราคาสมาชิกคู่สัญญา (ไม่แสดงหน้ารายการหลัก)",
      items: [
        language === "en" ? "Fast-track OPD queue" : "ช่องทางด่วนพบแพทย์ OPD ทันที",
        language === "en" ? "English-speaking doctor priority" : "พบทีมแพทย์ผู้เชี่ยวชาญภาษาอังกฤษทันที",
        language === "en" ? "Travel insurance claim processing assistant" : "มีเจ้าหน้าที่ประสานเอกสารแฟกซ์เคลมประกันฟรี",
        language === "en" ? "Direct billing (if MOU agreement signed)" : "บริการเคลมตรงไม่ต้องสำรองจ่าย (หากเซ็น MOU)",
        language === "en" ? "Reports sent directly to resort managers" : "บริการส่งรายงานสุขภาพให้ผู้จัดการรีสอร์ท (หากร้องขอ)",
      ],
      target: language === "en" ? "Guests of partner hotels & resorts" : "นักท่องเที่ยวที่พักในรีสอร์ทพันธมิตร",
      aeo: "resort guest healthcare referrals",
    },
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
                {/* Header elements */}
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
                    case "🤿": return <Compass className={cn} />;
                    case "🩺": return <Heart className={cn} />;
                    case "❤️": return <Activity className={cn} />;
                    case "💖": return <Shield className={cn} />;
                    case "🏢": return <Award className={cn} />;
                    case "🤝": return <Users className={cn} />;
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
                  {pkg.id === "resort_wellness" || pkg.id === "resort_guest_privilege"
                    ? t("pkgActionContact")
                    : t("pkgActionInquire")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
