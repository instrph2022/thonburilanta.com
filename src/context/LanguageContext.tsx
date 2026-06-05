"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "th" | "en";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Nav
    navFamilies: "For Families",
    navServices: "Services",
    navPackages: "Packages",
    navInsurance: "Insurance",
    navFaq: "FAQ",
    navLocation: "Location",
    navEmergency: "Emergency 24/7",
    navBook: "Contact Doctor",

    // Hero
    heroBadgeEnglish: "English-speaking doctors",
    heroBadgeInsurance: "International insurance accepted",
    heroBadgeFamily: "AACI Accredited Clinic",
    heroEyebrow: "Koh Lanta's First Full Hospital",
    heroTitleHtml: "Your family's<br/><em>safe harbour</em><br/>on the island",
    heroSub: "A full-service 36-bed hospital on Koh Lanta — with English-speaking doctors, 24-hour emergency care, and support for international insurance. So your family can explore freely.",
    heroErLabel: "EMERGENCY · 24 HOURS",
    heroErPhone: "081-569-7890", // actual phone number
    heroErNote: "Walk in anytime · No appointment needed",
    heroBtnPackages: "View Packages →",
    heroBtnDoctors: "Meet our doctors",
    heroStatBeds: "Inpatient beds",
    heroStatEr: "Emergency room",
    heroStatLang: "All doctors speak English",
    heroStatGroup: "Hospital group",

    // Trust Band
    tbEnglish: "Doctors speak English",
    tbInsurance: "Direct insurance billing",
    tbEmergency: "24/7 Emergency room",
    tbPaediatric: "AACI International Standard",
    tbGroup: "Thonburi Healthcare Group",

    // Families
    famEyebrow: "For families",
    famTitleHtml: "Explore the island<br/><em class='italic text-teal-brand'>without worry</em>",
    famDesc: "We know travelling with children brings extra responsibility. That's why we've designed our services with families from Scandinavia, Poland, and across Europe in mind.",
    famPediatricTitle: "Paediatric consultations",
    famPediatricDesc: "Experienced doctors for infants, toddlers, and children. From fevers and rashes to ear infections and allergic reactions — we handle it calmly.",
    famBeachTitle: "Beach & sea injuries",
    famBeachDesc: "Jellyfish stings, sea urchin spines, coral cuts, and sunstroke — the most common island emergencies, treated quickly and professionally.",
    famInsTitle: "Insurance made easy",
    famInsDesc: "We work directly with major European and international insurers. No complex paperwork for you — we handle claims on your behalf when possible.",

    // Expect
    expectEyebrow: "What to expect",
    expectTitleHtml: "Simple, clear,<br/>and reassuring",
    expectDesc: "We've streamlined every step so that visiting a hospital on holiday is as stress-free as possible — for you and your children.",
    expectStep1Title: "Arrive or call ahead",
    expectStep1Desc: "Walk in anytime or call us before you come. Emergency cases are seen immediately.",
    expectStep2Title: "Seen by an English-speaking doctor",
    expectStep2Desc: "No language barrier. Every doctor speaks English fluently and explains clearly.",
    expectStep3Title: "Treatment & prescription",
    expectStep3Desc: "On-site pharmacy, lab, and imaging. Most cases resolved in a single visit.",
    expectStep4Title: "Insurance claim or payment",
    expectStep4Desc: "We prepare all documentation in English. Direct billing available with partner insurers.",
    expectQuote: "Having a proper hospital on Koh Lanta — with English-speaking doctors — gave us real peace of mind travelling with our kids.",
    expectQuoteAuthor: "— Anna, Sweden (family of 4)",
    expectPill1: "No appointment for ER",
    expectPill2: "Same-day results",
    expectPill3: "English reports",
    expectPill4: "24-hour pharmacy",

    // Insurance
    insTitle: "We work with your\ntravel insurance",
    insSub: "Direct billing available · English documentation · No hassle claims support",
    insCheckBtn: "Check my insurer →",
    insNote: "Don't see your insurer? Contact us before your visit — we work with most major European travel insurance providers and can arrange direct billing or provide full documentation for reimbursement claims.",

    // Packages
    pkgEyebrow: "Packages",
    pkgTitleHtml: "Transparent pricing,<br/>no surprises",
    pkgDesc: "Fixed-price packages designed for island life. Pay once, know exactly what you get.",
    pkgDiveTitle: "Dive Safety",
    pkgDiveTag: "⭐ Most popular",
    pkgDiveSub: "Pre/post dive medical check",
    pkgDivePrice: "฿1,490",
    pkgDivePriceSub: "per visit · ~$40 · ~SEK 450",
    pkgDiveItem1: "Fitness-to-dive assessment",
    pkgDiveItem2: "EKG + oxygen saturation",
    pkgDiveItem3: "Dive medical certificate (EN)",
    pkgDiveItem4: "DCS first aid consultation",

    pkgIslandTitle: "Island Care",
    pkgIslandTag: "Tourist care",
    pkgIslandSub: "Travel health on Lanta",
    pkgIslandPrice: "฿990",
    pkgIslandPriceSub: "per visit · ~$27 · ~SEK 305",
    pkgIslandItem1: "OPD consultation (any condition)",
    pkgIslandItem2: "Wound care & dressing",
    pkgIslandItem3: "Jellyfish & sea urchin treatment",
    pkgIslandItem4: "Medical certificate in English",

    pkgHealthTitle: "Health Check",
    pkgHealthTag: "Annual check",
    pkgHealthSub: "For expats & long-stay visitors",
    pkgHealthPrice: "฿3,990",
    pkgHealthPriceSub: "Premium · ~$110 · ~SEK 1,270",
    pkgHealthItem1: "Full blood panel + EKG",
    pkgHealthItem2: "Chest X-ray",
    pkgHealthItem3: "Cancer markers (basic)",
    pkgHealthItem4: "Complete report in English",

    pkgResortTitle: "Resort Wellness",
    pkgResortTag: "Corporate",
    pkgResortSub: "Staff health programme",
    pkgResortPrice: "฿1,890",
    pkgResortPriceSub: "per person · min 10 staff",
    pkgResortItem1: "Annual health screening",
    pkgResortItem2: "3 OPD visits/year",
    pkgResortItem3: "Priority lane access",
    pkgResortItem4: "HR summary report",

    pkgActionInquire: "Inquire now",
    pkgActionContact: "Contact us",

    // Checklist
    checkEyebrow: "Before you travel",
    checkTitleHtml: "Smart family<br/>travel checklist",
    checkDesc: "A few simple steps before you arrive make all the difference — especially with young children.",
    checkItem1Title: "Save our emergency number",
    checkItem1Desc: "+66 81 569 7890 — add it to your phone before you land on Koh Lanta.",
    checkItem2Title: "Bring your insurance documents",
    checkItem2Desc: "Policy number, insurer contact, and any pre-existing condition notes.",
    checkItem3Title: "Check children's vaccination records",
    checkItem3Desc: "Bring a copy in case your child needs treatment or documentation.",
    checkItem4Title: "Note any allergies or medications",
    checkItem4Desc: "Our doctors speak English, but a written list helps everyone move faster.",
    checkItem5Title: "Book a dive check if you're diving",
    checkItem5Desc: "Our Dive Safety package includes a fitness-to-dive certificate recognised by major dive schools.",

    // Location
    locEyebrow: "Find us",
    locTitleHtml: "On the island,<br/>easy to reach",
    locAddressLabel: "ADDRESS",
    locAddressVal: "Koh Lanta, Krabi 81150\nThailand",
    locPill1: "🚗 10 min from Long Beach",
    locPill2: "🚗 15 min from Klong Dao",
    locPill3: "🚗 8 min from Ban Saladan",
    locHoursLabel: "HOURS",
    locHoursVal: "OPD: 08:00 – 20:00\nEmergency: 24 hours, 7 days",
    locPhoneLabel: "PHONE",
    locPhoneVal: "+66 81 569 7890\nInternational calls welcome",
    locSocialLabel: "LINE / WHATSAPP",
    locSocialVal: "@thonburilanta\nReply within 2 hours",
    locMapPlaceholder: "Google Maps embed here",

    // Inquiry
    inqTitle: "Get in touch",
    inqSubtitle: "We'll reply in English within 2 hours · ตอบกลับภายใน 2 ชั่วโมง",
    inqFieldName: "Full name *",
    inqFieldPhone: "Phone / WhatsApp",
    inqFieldEmail: "Email",
    inqFieldInterest: "I'm interested in",
    inqFieldMessage: "Message (optional)",
    inqInterestDefault: "— Select a service —",
    inqInterestGeneral: "General Inquiry / Pediatric Consultation",
    inqInterestDive: "Dive Safety Package",
    inqInterestCare: "Island Care Package",
    inqInterestCheck: "Health Check (Basic/Premium)",
    inqInterestEmergency: "Emergency / Urgent Care info",
    inqInterestInsurance: "Insurance / Billing Question",
    inqInterestResort: "Resort / Corporate Partnership",
    inqPlaceholderName: "Your name",
    inqPlaceholderPhone: "+46 XX XXX XXXX",
    inqPlaceholderEmail: "your@email.com",
    inqPlaceholderMessage: "Tell us about your situation, travel dates, or any questions…",
    inqBtnSubmit: "Send message →",
    inqSuccess: "Thank you! Your message has been received.",
    inqError: "An error occurred. Please try again.",

    inqRightEyebrow: "Contact",
    inqRightTitleHtml: "We're here<br/>whenever<br/>you need us",
    inqRightSub: "Whether you have a medical question before your trip, or you need care right now — our English-speaking team is ready.",

    // Footer
    footBrandDesc: "A member of Thonburi Healthcare Group (THG), delivering standard clinical care for local residents and international visitors on Koh Lanta.",
    footLinksDoc: "Doctors & Team",
    footLinksCareer: "Careers",
    footLinksContact: "Contact",
    footLinksPrivacy: "Privacy Policy",
    footCopy: "© 2026 Thonburi Lanta Hospital. All rights reserved."
  },
  th: {
    // Nav
    navFamilies: "สำหรับครอบครัว",
    navServices: "บริการทางการแพทย์",
    navPackages: "แพ็กเกจสุขภาพ",
    navInsurance: "คู่สัญญาประกันภัย",
    navFaq: "คำถามที่พบบ่อย",
    navLocation: "ที่ตั้งและแผนที่",
    navEmergency: "ฉุกเฉิน 24/7",
    navBook: "นัดหมายแพทย์",

    // Hero
    heroBadgeEnglish: "ทีมแพทย์สื่อสารภาษาอังกฤษได้ดี",
    heroBadgeInsurance: "ยินดีรับประกันสุขภาพต่างประเทศ",
    heroBadgeFamily: "ผ่านการรับรองมาตรฐานสากล AACI",
    heroEyebrow: "โรงพยาบาลเต็มรูปแบบแห่งแรกบนเกาะลันตา",
    heroTitleHtml: "ดูแลสุขภาพของ<br/><em>คนที่คุณรัก</em><br/>ในทุกการเดินทาง",
    heroSub: "โรงพยาบาลขนาด 36 เตียงที่มีบริการครบครันบนเกาะลันตา พร้อมทีมแพทย์ดูแลรักษาตลอด 24 ชั่วโมง และระบบประสานงานประกันภัยต่างประเทศ ให้คุณท่องเที่ยวได้อย่างอุ่นใจ",
    heroErLabel: "แผนกฉุกเฉิน · ตลอด 24 ชั่วโมง",
    heroErPhone: "081-569-7890",
    heroErNote: "สามารถเข้ารับบริการได้ทันทีโดยไม่ต้องนัดหมาย",
    heroBtnPackages: "ดูแพ็กเกจสุขภาพ →",
    heroBtnDoctors: "ทำความรู้จักทีมแพทย์",
    heroStatBeds: "เตียงผู้ป่วยใน (IPD)",
    heroStatEr: "ห้องฉุกเฉิน 24 ชม.",
    heroStatLang: "แพทย์สื่อสารภาษาอังกฤษ",
    heroStatGroup: "เครือโรงพยาบาล",

    // Trust Band
    tbEnglish: "ทีมแพทย์ดูแลและอธิบายเป็นภาษาอังกฤษ",
    tbInsurance: "บริการเคลมตรงกับบริษัทประกัน",
    tbEmergency: "ห้องฉุกเฉินบริการตลอด 24 ชั่วโมง",
    tbPaediatric: "มาตรฐานสากล AACI",
    tbGroup: "เครือธนบุรี เฮลท์แคร์ กรุ๊ป (THG)",

    // Families
    famEyebrow: "การดูแลสำหรับครอบครัว",
    famTitleHtml: "ท่องเที่ยวทั่วเกาะลันตา<br/><em class='italic text-teal-brand'>อย่างไร้กังวล</em>",
    famDesc: "เราตระหนักดีว่าการเดินทางกับเด็กและครอบครัวต้องการความดูแลเป็นพิเศษ เราจึงออกแบบการรักษาให้รองรับความต้องการของนักท่องเที่ยวทั้งชาวไทยและชาวต่างชาติอย่างใส่ใจ",
    famPediatricTitle: "ตรวจและรักษาเด็ก (กุมารเวช)",
    famPediatricDesc: "การบริการตรวจรักษาเด็กเล็กและทารกโดยแพทย์ผู้เชี่ยวชาญ ไม่ว่าจะเป็นไข้สูง ผดผื่น หูอักเสบ หรืออาการแพ้เฉียบพลัน เพื่อให้การรักษานั้นดำเนินไปอย่างผ่อนคลายและปลอดภัยที่สุด",
    famBeachTitle: "อุบัติเหตุจากการทำกิจกรรมทางทะเล",
    famBeachDesc: "การรักษาแผลจากแมงกะพรุน หอยเม่นตำ บาดแผลจากปะการังบาด หรืออาการฮีทสโตรก ซึ่งพบบ่อยที่สุดในการท่องเที่ยวชายทะเล",
    famInsTitle: "ประสานงานเคลมประกันสะดวกรวดเร็ว",
    famInsDesc: "เราประสานงานและดูแลเอกสารเคลมกับบริษัทประกันสุขภาพชั้นนำทั้งในและต่างประเทศโดยตรง เพื่อลดความยุ่งยากเรื่องค่าใช้จ่ายและการสำรองจ่ายให้กับคุณ",

    // Expect
    expectEyebrow: "ขั้นตอนการบริการ",
    expectTitleHtml: "ง่าย ชัดเจน<br/>และน่าเชื่อถือ",
    expectDesc: "เราจัดระบบขั้นตอนการเข้ารับการบริการให้สะดวกและไม่ซับซ้อน เพื่อให้การมาโรงพยาบาลของคุณราบรื่นและลดความตึงเครียดให้ได้มากที่สุด",
    expectStep1Title: "เข้าตรวจหรือโทรปรึกษา",
    expectStep1Desc: "สามารถเข้ามาติดต่อได้ทันที หรือโทรแจ้งล่วงหน้าสำหรับกรณีผู้ป่วยฉุกเฉินเพื่อส่งรถไปรับ",
    expectStep2Title: "พบแพทย์ผู้เชี่ยวชาญ",
    expectStep2Desc: "สื่อสารอย่างเข้าใจชัดเจน แพทย์พร้อมให้ข้อมูลการวินิจฉัยและขั้นตอนการรักษาอย่างละเอียด",
    expectStep3Title: "ตรวจรักษาและรับยา",
    expectStep3Desc: "มีแล็บตรวจเลือด เอกซเรย์ และศูนย์ยาในที่เดียว ให้การรักษาเสร็จสิ้นภายในครั้งเดียว",
    expectStep4Title: "ประสานงานเคลมหรือชำระเงิน",
    expectStep4Desc: "จัดทำเอกสารและใบรับรองแพทย์อย่างครบถ้วน พร้อมระบบบริการเคลมตรงคู่สัญญาประกันภัย",
    expectQuote: "การมีโรงพยาบาลมาตรฐานบนเกาะลันตา พร้อมทีมแพทย์ที่พร้อมดูแลและสื่อสารเข้าใจง่าย ช่วยสร้างความมั่นใจให้ครอบครัวเราอย่างมากในระหว่างการพักผ่อน",
    expectQuoteAuthor: "— แอนนา, ลูกค้าชาวสวีเดน (ครอบครัว 4 คน)",
    expectPill1: "ไม่ต้องจองคิวแผนกฉุกเฉิน",
    expectPill2: "รับผลตรวจแล็บภายในวัน",
    expectPill3: "ออกเอกสารรับรองภาษาอังกฤษ",
    expectPill4: "ห้องจ่ายยาเปิดตลอด 24 ชั่วโมง",

    // Insurance
    insTitle: "รองรับประกันภัยชั้นนำ\nทั้งในและต่างประเทศ",
    insSub: "บริการแฟกซ์เคลมตรง · เอกสารภาษาอังกฤษครบถ้วน · ทีมดูแลเคลมเฉพาะทาง",
    insCheckBtn: "ตรวจสอบรายชื่อบริษัทประกัน →",
    insNote: "หากไม่พบรายชื่อประกันของคุณ สามารถโทรติดต่อเราเพื่อสอบถามข้อมูลล่วงหน้า เรายินดีให้บริการประสานงานกับบริษัทประกันภัยของท่านเพื่ออำนวยความสะดวกอย่างเต็มที่",

    // Packages
    pkgEyebrow: "แพ็กเกจตรวจสุขภาพ",
    pkgTitleHtml: "ราคาชัดเจน<br/>ไม่มีค่าใช้จ่ายแอบแฝง",
    pkgDesc: "แพ็กเกจดูแลรักษาสุขภาพที่ครอบคลุมความปลอดภัยและการใช้ชีวิตบนเกาะ จ่ายราคาตามจริงตามระบุ",
    pkgDiveTitle: "ความปลอดภัยในการดำน้ำ (Dive Safety)",
    pkgDiveTag: "⭐ ยอดนิยม",
    pkgDiveSub: "ตรวจประเมินก่อนและหลังการดำน้ำ",
    pkgDivePrice: "฿1,490",
    pkgDivePriceSub: "ต่อครั้ง (ประมาณ 40 USD / 450 SEK)",
    pkgDiveItem1: "ประเมินความพร้อมและตรวจสมรรถภาพร่างกาย",
    pkgDiveItem2: "ตรวจคลื่นไฟฟ้าหัวใจ (EKG) + วัดออกซิเจนในเลือด",
    pkgDiveItem3: "ออกใบรับรองแพทย์ตรวจประเมินดำน้ำ (EN)",
    pkgDiveItem4: "ปรึกษาแพทย์ป้องกันโรคน้ำหนีบ (DCS Consultation)",

    pkgIslandTitle: "ดูแลนักท่องเที่ยว (Island Care)",
    pkgIslandTag: "สำหรับนักเดินทาง",
    pkgIslandSub: "บริการดูแลรักษาพยาบาลฉุกเฉินทั่วไป",
    pkgIslandPrice: "฿990",
    pkgIslandPriceSub: "ต่อครั้ง (ประมาณ 27 USD / 305 SEK)",
    pkgIslandItem1: "ตรวจโดยแพทย์แผนกผู้ป่วยนอก (ทุกอาการ)",
    pkgIslandItem2: "ทำแผล ล้างแผล และทำความสะอาดบาดแผล",
    pkgIslandItem3: "การรักษาพิษแมงกะพรุนและหอยเม่นตำ",
    pkgIslandItem4: "ออกเอกสารใบรับรองแพทย์ภาษาอังกฤษ/ไทย",

    pkgHealthTitle: "ตรวจสุขภาพประจำปี (Lanta Check)",
    pkgHealthTag: "สำหรับผู้อยู่อาศัยระยะยาว",
    pkgHealthSub: "ตรวจคัดกรองละเอียดสำหรับ Expat และผู้รักสุขภาพ",
    pkgHealthPrice: "฿3,990",
    pkgHealthPriceSub: "ตรวจระดับพรีเมียม (ประมาณ 110 USD / 1,270 SEK)",
    pkgHealthItem1: "ตรวจเลือดครบชุด ตรวจเบาหวาน ไขมัน ตับ ไต + คลื่นไฟฟ้าหัวใจ",
    pkgHealthItem2: "เอกซเรย์ปอดและทรวงอก (Chest X-Ray)",
    pkgHealthItem3: "ตรวจหาสารบ่งชี้มะเร็งเบื้องต้น (Cancer Markers)",
    pkgHealthItem4: "รายงานผลสุขภาพฉบับสมบูรณ์พร้อมปรึกษาแพทย์",

    pkgResortTitle: "สวัสดิการผู้ประกอบการ (Resort Wellness)",
    pkgResortTag: "สำหรับกลุ่มองค์กร B2B",
    pkgResortSub: "โปรแกรมดูแลสุขภาพพนักงานโรงแรมและร้านค้า",
    pkgResortPrice: "฿1,890",
    pkgResortPriceSub: "ต่อคน (ขั้นต่ำ 10 คนขึ้นไป)",
    pkgResortItem1: "การตรวจสุขภาพประจำปีพื้นฐานพนักงาน",
    pkgResortItem2: "สิทธิ์พบแพทย์แผนกผู้ป่วยนอก (OPD) 3 ครั้ง/ปี",
    pkgResortItem3: "ช่องทางบริการพิเศษ (Priority Lane)",
    pkgResortItem4: "ออกรายงานสรุปผลภาพรวมสุขภาพส่งแผนก HR",

    pkgActionInquire: "สอบถามข้อมูล",
    pkgActionContact: "ติดต่อเรา",

    // Checklist
    checkEyebrow: "ข้อมูลก่อนการเดินทาง",
    checkTitleHtml: "เช็คลิสต์เตรียมความพร้อม<br/>เพื่อความปลอดภัยของครอบครัว",
    checkDesc: "การเตรียมตัวง่ายๆ เพียงไม่กี่ขั้นตอน จะช่วยให้ทริปครอบครัวบนเกาะลันตาราบรื่นและอุ่นใจสูงสุด",
    checkItem1Title: "บันทึกเบอร์โทรฉุกเฉินของเรา",
    checkItem1Desc: "081-569-7890 — บันทึกใส่โทรศัพท์ของคุณก่อนเดินทางมาถึงเกาะลันตา",
    checkItem2Title: "เตรียมเอกสารประกันภัยการเดินทาง",
    checkItem2Desc: "เลขกรมธรรม์ ช่องทางติดต่อ และเอกสารประวัติการรักษาหากมีโรคประจำตัว",
    checkItem3Title: "ตรวจสอบประวัติวัคซีนของเด็กๆ",
    checkItem3Desc: "ควรมีภาพถ่ายหรือสำเนาติดตัวเผื่อกรณีจำเป็นที่ต้องแสดงประวัติวัคซีน",
    checkItem4Title: "บันทึกข้อมูลอาการแพ้ยา/ยาประจำตัว",
    checkItem4Desc: "ทีมแพทย์ของเราสื่อสารภาษาอังกฤษได้ดี การมีรายการบันทึกจะช่วยให้ดูแลได้รวดเร็วขึ้น",
    checkItem5Title: "จองตรวจสมรรถภาพการดำน้ำล่วงหน้า",
    checkItem5Desc: "แพ็กเกจความปลอดภัยการดำน้ำของเราออกใบรับรองแพทย์ที่เป็นที่ยอมรับของร้านดำน้ำชั้นนำ",

    // Location
    locEyebrow: "การเดินทางและแผนที่",
    locTitleHtml: "สะดวก เข้าถึงง่าย<br/>บนทำเลหลักของเกาะ",
    locAddressLabel: "ที่อยู่ของเรา",
    locAddressVal: "อำเภอเกาะลันตา จังหวัดกระบี่ 81150\nประเทศไทย",
    locPill1: "🚗 10 นาที จากหาดพระแอะ (Long Beach)",
    locPill2: "🚗 15 นาที จากหาดคลองดาว",
    locPill3: "🚗 8 นาที จากท่าเรือบ้านศาลาด่าน",
    locHoursLabel: "เวลาเปิดทำการ",
    locHoursVal: "ตรวจผู้ป่วยนอก (OPD): 08:00 – 20:00\nฉุกเฉิน (ER): บริการ 24 ชั่วโมง ทุกวัน",
    locPhoneLabel: "เบอร์โทรติดต่อ",
    locPhoneVal: "081-569-7890\n(ยินดีรับสายจากต่างประเทศ)",
    locSocialLabel: "ไลน์ / วอตส์แอปป์",
    locSocialVal: "@thonburilanta\nตอบกลับภายใน 2 ชั่วโมง",
    locMapPlaceholder: "แผนที่ Google Maps แสดงบนหน้าเว็บ",

    // Inquiry
    inqTitle: "ส่งข้อความติดต่อเรา",
    inqSubtitle: "ตอบกลับภายใน 2 ชั่วโมงทั้งภาษาไทยและภาษาอังกฤษ",
    inqFieldName: "ชื่อ - นามสกุล *",
    inqFieldPhone: "เบอร์โทรศัพท์ / WhatsApp",
    inqFieldEmail: "อีเมล",
    inqFieldInterest: "หัวข้อที่ต้องการติดต่อ",
    inqFieldMessage: "ข้อความรายละเอียด (เพิ่มเติม)",
    inqInterestDefault: "— เลือกบริการที่คุณสนใจ —",
    inqInterestGeneral: "ติดต่อทั่วไป / ปรึกษาโรคเด็ก",
    inqInterestDive: "แพ็กเกจความพร้อมการดำน้ำ (Dive Safety)",
    inqInterestCare: "แพ็กเกจการรักษานักท่องเที่ยว (Island Care)",
    inqInterestCheck: "ตรวจสุขภาพประจำปี (Lanta Check)",
    inqInterestEmergency: "ข้อมูลแผนกฉุกเฉินและอุบัติเหตุ",
    inqInterestInsurance: "สอบถามการเคลมประกันสุขภาพ",
    inqInterestResort: "ข้อเสนอพันธมิตรร่วมกับโรงแรม/ธุรกิจ",
    inqPlaceholderName: "กรุณากรอกชื่อของคุณ",
    inqPlaceholderPhone: "เช่น 081-XXX-XXXX หรือเบอร์ต่างประเทศ",
    inqPlaceholderEmail: "name@example.com",
    inqPlaceholderMessage: "รายละเอียดอาการ วันที่ประสงค์จะเข้ารับบริการ หรือคำถามอื่นๆ...",
    inqBtnSubmit: "ส่งข้อความ →",
    inqSuccess: "ส่งข้อมูลเรียบร้อยแล้ว! เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด",
    inqError: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",

    inqRightEyebrow: "ช่องทางการติดต่อ",
    inqRightTitleHtml: "เราพร้อมดูแลคุณ<br/>ในทุกช่วงเวลา<br/>ที่คุณต้องการ",
    inqRightSub: "ไม่ว่าคุณจะมีคำปรึกษาล่วงหน้าก่อนเดินทาง หรือต้องการการรักษาเร่งด่วนในขณะนี้ ทีมงานโรงพยาบาลธนบุรีลันตาพร้อมช่วยเหลือเสมอ",

    // Footer
    footBrandDesc: "โรงพยาบาลในเครือธนบุรี เฮลท์แคร์ กรุ๊ป (THG) มุ่งมั่นที่จะมอบมาตรฐานการดูแลรักษาระดับสากลให้กับผู้อยู่อาศัยในเกาะลันตาและนักท่องเที่ยวทั่วโลก",
    footLinksDoc: "รายชื่อแพทย์ผู้รักษา",
    footLinksCareer: "สมัครงาน / ร่วมงานกับเรา",
    footLinksContact: "ติดต่อโรงพยาบาล",
    footLinksPrivacy: "นโยบายความเป็นส่วนตัว",
    footCopy: "© 2026 โรงพยาบาลธนบุรีลันตา สงวนลิขสิทธิ์."
  }
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("th");

  useEffect(() => {
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang === "en" || savedLang === "th") {
      setLanguageState(savedLang);
    } else {
      // Auto detect language
      const userLang = navigator.language.toLowerCase();
      if (userLang.includes("th")) {
        setLanguageState("th");
      } else {
        setLanguageState("en");
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations["en"]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
