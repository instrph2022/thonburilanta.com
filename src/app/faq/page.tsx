"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown, Search, HelpCircle } from "lucide-react";

export default function FAQPage() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqData = {
    en: [
      {
        q: "Is there a hospital on Koh Lanta?",
        a: "Yes, Thonburi Lanta Hospital is Koh Lanta's first full-service 36-bed hospital. It is open 24 hours a day and is located in the Saladan area, Koh Lanta, Krabi.",
      },
      {
        q: "What should I do if I get injured while diving in Koh Lanta?",
        a: "Go directly to Thonburi Lanta Hospital. We have dive medicine specialists available to consult on decompression sickness (DCS), pressure injuries, and marine wildlife stings, plus first-aid oxygen support.",
      },
      {
        q: "Does Koh Lanta have emergency care?",
        a: "Yes, Thonburi Lanta Hospital features a fully equipped Emergency Room (ER) open 24/7, staffed by trauma-trained clinicians and emergency responders. Walk-ins are welcome; no appointment is necessary for ER.",
      },
      {
        q: "Can I use international health insurance at Thonburi Lanta Hospital?",
        a: "Yes, we accept major international travel and health insurance (such as Allianz, AXA, Europ Assistance, and DAN). We provide English medical certificates, itemized bills, and direct-billing support (GOP processing).",
      },
      {
        q: "Is there an English-speaking doctor in Koh Lanta?",
        a: "Yes, all medical doctors, specialists, and nurses at Thonburi Lanta Hospital are fluent in English. We regularly treat expats, international tourists, and resort guests.",
      },
      {
        q: "What is the nearest hospital to Koh Lanta?",
        a: "Thonburi Lanta Hospital is located directly on Koh Lanta island (Krabi). You no longer need to travel to Krabi Town or Trang for standard inpatient admission or 24/7 emergency trauma care.",
      },
    ],
    th: [
      {
        q: "โรงพยาบาลในเกาะลันตามีไหม?",
        a: "มีครับ โรงพยาบาลธนบุรีลันตา เป็นโรงพยาบาลขนาด 36 เตียงแห่งแรกบนเกาะลันตา เปิดให้บริการรักษาพยาบาลตลอด 24 ชั่วโมง ตั้งอยู่ในย่านศาลาด่าน อำเภอเกาะลันตา จังหวัดกระบี่",
      },
      {
        q: "หากได้รับบาดเจ็บจากการดำน้ำที่เกาะลันตา ควรทำอย่างไร?",
        a: "เดินทางมาที่ห้องฉุกเฉินโรงพยาบาลธนบุรีลันตาได้ทันที เรามีแพทย์ผู้เชี่ยวชาญด้านเวชศาสตร์ใต้น้ำ (Dive Medicine) พร้อมให้คำปรึกษาดูแลรักษาภาวะโรคน้ำหนีบ (Decompression Sickness - DCS) และอุบัติเหตุจากการดำน้ำทุกประเภท",
      },
      {
        q: "เกาะลันตามีห้องฉุกเฉินหรือบริการผู้ป่วยอุบัติเหตุไหม?",
        a: "มีครับ โรงพยาบาลธนบุรีลันตาเปิดให้บริการแผนกฉุกเฉินและอุบัติเหตุ (ER) ตลอด 24 ชั่วโมง ทุกวัน พร้อมรถพยาบาลฉุกเฉินรับส่งผู้ป่วยกรณีเร่งด่วน โดยไม่ต้องนัดหมายล่วงหน้า",
      },
      {
        q: "สามารถใช้ประกันสุขภาพต่างประเทศที่โรงพยาบาลธนบุรีลันตาได้หรือไม่?",
        a: "ได้ครับ เรายินดีรับประกันภัยการเดินทางและประกันสุขภาพต่างประเทศชั้นนำเกือบทุกบริษัท โดยมีทีมงานช่วยประสานงานเคลมตรง (Direct Billing) ออกใบรับรองแพทย์และเอกสารสรุปประวัติเป็นภาษาอังกฤษเพื่อความสะดวกในการเคลมเคลียร์ค่าใช้จ่าย",
      },
      {
        q: "มีหมอที่สื่อสารภาษาอังกฤษบนเกาะลันตาไหม?",
        a: "มีครับ แพทย์และพยาบาลวิชาชีพของโรงพยาบาลธนบุรีลันตาสามารถสื่อสารภาษาอังกฤษได้อย่างคล่องแคล่ว พร้อมให้การดูแลนักท่องเที่ยวชาวต่างชาติและ Expat ที่พำนักระยะยาวบนเกาะอย่างเข้าใจละเอียด",
      },
      {
        q: "โรงพยาบาลที่ใกล้ที่สุดบนเกาะลันตาคือที่ไหน?",
        a: "โรงพยาบาลธนบุรีลันตา ตั้งอยู่บนเกาะลันตาโดยตรง ช่วยให้ผู้ป่วยไม่ต้องเดินทางข้ามเรือไปรักษาตัวที่ตัวเมืองกระบี่หรือตรังสำหรับอาการป่วยไข้ทั่วไปและการแอดมิทเป็นผู้ป่วยใน (IPD)",
      },
    ],
  };

  const currentFaqs = faqData[language] || faqData.en;

  const filteredFaqs = currentFaqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Generate JSON-LD FAQ Schema
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
      {/* Schema.org FAQ Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-cream py-16 px-6 sm:px-12 lg:px-20">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="text-[10px] font-semibold tracking-[2px] uppercase text-teal-brand mb-3 flex items-center justify-center gap-1.5">
              <HelpCircle className="w-4.5 h-4.5 text-teal-brand" />
              <span>FAQ / AEO OPTIMIZED</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-dark tracking-tight mb-4">
              {language === "en" ? "Frequently Asked Questions" : "คำถามที่พบบ่อย"}
            </h1>
            <p className="text-[14px] text-mid max-w-lg mx-auto leading-relaxed">
              {language === "en"
                ? "Find fast answers about hospital capacities, dive safety, insurance claims, and emergency responses on Koh Lanta."
                : "ค้นหาข้อมูลบริการโรงพยาบาล การดูแลฉุกเฉิน ประกันภัยสุขภาพ และขั้นตอนตรวจประเมินดำน้ำ"}
            </p>
          </div>

          {/* Search bar */}
          <div className="relative mb-8 max-w-md mx-auto">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === "en" ? "Search questions or keywords..." : "ค้นหาคำถาม คีย์เวิร์ด..."}
              className="w-full border border-black/10 rounded-xl pl-10 pr-4 py-2.5 text-[13px] bg-white outline-none focus:border-teal-brand shadow-sm transition-colors"
            />
          </div>

          {/* FAQ Accordion List */}
          <div className="flex flex-col gap-3">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-white border border-border rounded-xl overflow-hidden shadow-sm transition-all"
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : index)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-[14px] sm:text-[14.5px] text-dark hover:bg-cream/40 transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4.5 h-4.5 text-muted transition-transform shrink-0 ${
                          isOpen ? "rotate-180 text-teal-brand" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-[13px] leading-relaxed text-mid border-t border-black/5 bg-warm-white/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="text-center py-12 text-muted text-[13px]">
                {language === "en" ? "No matches found. Try other keywords." : "ไม่พบข้อความที่ค้นหา กรุณาลองใหม่อีกครั้ง"}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
