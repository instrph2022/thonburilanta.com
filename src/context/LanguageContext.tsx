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
    heroBadgeEnglish: "Multilingual Clinical Team",
    heroBadgeInsurance: "Direct Billing Support",
    heroBadgeFamily: "AACI Accredited Clinic",
    heroEyebrow: "Thonburi Healthcare Group",
    heroTitleHtml: "Standard Medical Services<br/>on Koh Lanta Island",
    heroSub: "A modern medical clinic offering 24/7 emergency response contact, pediatric consultations, and international insurance coordination under the standards of Thonburi Healthcare Group.",
    heroErLabel: "EMERGENCY · 24 HOURS",
    heroErPhone: "081-569-7890",
    heroErNote: "Walk in directly · No appointment required",
    heroBtnPackages: "Medical Packages",
    heroBtnDoctors: "Our Medical Team",
    heroStatBeds: "Outpatient care",
    heroStatEr: "Emergency contact",
    heroStatLang: "English speaking",
    heroStatGroup: "THG Network",

    // Trust Band
    tbEnglish: "English-Speaking Doctors",
    tbInsurance: "Direct Insurance Billing",
    tbEmergency: "24/7 Emergency Room",
    tbPaediatric: "AACI Standard Facility",
    tbGroup: "Thonburi Healthcare Group",

    // Families
    famEyebrow: "Clinical Services",
    famTitleHtml: "Professional Care<br/><em class='italic text-teal-brand'>Near Your Resort</em>",
    famDesc: "We provide high-standard medical treatments and prompt outpatient services for international tourists and local residents, ensuring complete peace of mind.",
    famPediatricTitle: "Pediatric Consultations",
    famPediatricDesc: "Specialist care for infants, toddlers, and children. Handling infections, fevers, allergies, and pediatric diagnostics in a calm environment.",
    famBeachTitle: "Marine & Beach Injuries",
    famBeachDesc: "Prompt treatment for jellyfish stings, sea urchin contact, coral lacerations, and environmental heat issues typical to island activities.",
    famInsTitle: "Insurance Direct Billing",
    famInsDesc: "Seamless coordination with major global travel insurers. We manage the documentation and claims process directly on your behalf.",

    // Expect
    expectEyebrow: "Patient Journey",
    expectTitleHtml: "Efficient, Transparent<br/>and Reliable",
    expectDesc: "Our pathways are structured to minimize stress and maximize clarity—ensuring prompt medical attention and seamless billing.",
    expectStep1Title: "Registration & Triaging",
    expectStep1Desc: "Walk in directly or notify us prior to arrival. Emergency cases are prioritized immediately.",
    expectStep2Title: "Clinical Consultation",
    expectStep2Desc: "Our doctors communicate clearly in English, detailing your diagnosis and treatment options.",
    expectStep3Title: "Treatment & Pharmacy",
    expectStep3Desc: "On-site diagnostic lab, digital imaging, and pharmacy ensure most visits are resolved in one stop.",
    expectStep4Title: "Billing & Documentation",
    expectStep4Desc: "All records are issued in English. Direct billing is coordinated with partner insurers.",
    expectQuote: "Having an accredited clinic on Koh Lanta with English-speaking doctors gave us absolute peace of mind during our family trip.",
    expectQuoteAuthor: "— Anna, Sweden (Family of 4)",
    expectPill1: "No Appointment Required",
    expectPill2: "Same-Day Lab Results",
    expectPill3: "English Medical Reports",
    expectPill4: "24-Hour Pharmacy",

    // Insurance
    insTitle: "Direct Billing Partners",
    insSub: "Direct billing coordination · English clinical documentation · Professional claims support",
    insCheckBtn: "Verify Your Insurer",
    insNote: "If your insurer is not listed above, please contact our team. We coordinate with most major global travel policies to arrange direct payment options.",

    // Packages
    pkgEyebrow: "Medical Programs",
    pkgTitleHtml: "Transparent Rates,<br/>Professional Standards",
    pkgDesc: "Structured fixed-price packages designed to provide safety and clinical oversight for travelers and expatriates.",
    pkgDiveTitle: "Dive Safety Program",
    pkgDiveTag: "Popular",
    pkgDiveSub: "Pre/post dive clinical checkup",
    pkgDivePrice: "฿1,490",
    pkgDivePriceSub: "per visit · ~$40 · ~SEK 450",
    pkgDiveItem1: "Fitness-to-dive evaluation",
    pkgDiveItem2: "EKG + oxygen saturation",
    pkgDiveItem3: "Dive medical certificate (EN)",
    pkgDiveItem4: "DCS preventative consultation",

    pkgIslandTitle: "Island Care Program",
    pkgIslandTag: "Outpatient Care",
    pkgIslandSub: "Tourist healthcare & consulting",
    pkgIslandPrice: "฿990",
    pkgIslandPriceSub: "per visit · ~$27 · ~SEK 305",
    pkgIslandItem1: "Outpatient medical consultation",
    pkgIslandItem2: "Wound care and dressing",
    pkgIslandItem3: "Marine injury treatment",
    pkgIslandItem4: "Medical certificate (EN)",

    pkgHealthTitle: "Premium Health Check",
    pkgHealthTag: "Preventative",
    pkgHealthSub: "For expats & long-stay travelers",
    pkgHealthPrice: "฿3,990",
    pkgHealthPriceSub: "Full Assessment · ~$110",
    pkgHealthItem1: "Full blood chemistry panel + EKG",
    pkgHealthItem2: "Chest X-ray imaging",
    pkgHealthItem3: "Basic tumor markers",
    pkgHealthItem4: "Comprehensive clinical report (EN)",

    pkgResortTitle: "Corporate Wellness",
    pkgResortTag: "Enterprise",
    pkgResortSub: "For resort & business partners",
    pkgResortPrice: "฿1,890",
    pkgResortPriceSub: "per person · min 10 staff",
    pkgResortItem1: "Annual health screenings",
    pkgResortItem2: "On-site wellness visits",
    pkgResortItem3: "Priority clinical access",
    pkgResortItem4: "Executive summary reporting",

    pkgActionInquire: "Inquire Now",
    pkgActionContact: "Contact Clinic",

    // Checklist
    checkEyebrow: "Travel Safety",
    checkTitleHtml: "Patient Information<br/>& Preparation Guide",
    checkDesc: "A few clinical and practical preparations before your arrival ensure smooth medical coordination if needed.",
    checkItem1Title: "Record Emergency Contacts",
    checkItem1Desc: "Save +66 81 569 7890 in your mobile address book before traveling to Koh Lanta.",
    checkItem2Title: "Prepare Insurance Documents",
    checkItem2Desc: "Keep your policy number, insurer contact details, and medical history notes accessible.",
    checkItem3Title: "Vaccination Records",
    checkItem3Desc: "Maintain a digital copy of family vaccination files for pediatric reference.",
    checkItem4Title: "List Current Medications & Allergies",
    checkItem4Desc: "A clear list written in English helps our clinical staff expedite your care.",
    checkItem5Title: "Schedule Dive Screenings",
    checkItem5Desc: "Obtain your dive certification medical clearance prior to major open-water activities.",

    // Location
    locEyebrow: "Our Location",
    locTitleHtml: "Easily Accessible<br/>on Koh Lanta",
    locAddressLabel: "ADDRESS",
    locAddressVal: "Koh Lanta District, Krabi 81150\nThailand",
    locPill1: "10 min from Long Beach",
    locPill2: "15 min from Klong Dao",
    locPill3: "8 min from Ban Saladan",
    locHoursLabel: "OPERATING HOURS",
    locHoursVal: "Outpatient Department (OPD): 08:00 – 20:00\nEmergency Room (ER): 24 Hours / 7 Days",
    locPhoneLabel: "TELEPHONE",
    locPhoneVal: "+66 81 569 7890\nInternational calls welcome",
    locSocialLabel: "LINE / WHATSAPP",
    locSocialVal: "@thonburilanta\nResponse within 2 hours",
    locMapPlaceholder: "Google Maps coordinates",


    // Inquiry
    inqTitle: "Get in touch",
    inqSubtitle: "We'll reply in English within 2 hours · ตอบกลับภายใน 2 ชั่วโมง",
    inqFieldName: "Full name *",
    inqFieldPhone: "Phone / WhatsApp",
    inqFieldEmail: "Email",
    inqFieldInsuranceInfo: "Insurance Provider (Optional)",
    inqFieldNationality: "Nationality",
    inqFieldLengthOfStay: "Length of stay on Koh Lanta",
    inqFieldCurrentStay: "Current Stay (Hotel / Resort)",
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
    inqPlaceholderInsuranceInfo: "e.g. Allianz, AXA, Bupa...",
    inqPlaceholderNationality: "e.g. Swedish, British, Thai...",
    inqPlaceholderLengthOfStay: "e.g. 5 days, 2 weeks, 1 month...",
    inqPlaceholderCurrentStay: "e.g. Layana Resort, Pimalai Resort...",
    inqPlaceholderMessage: "Tell us about your situation, travel dates, or any questions…",
    inqBtnSubmit: "Send message →",
    inqSuccess: "Thank you! Your message has been sent successfully. A staff member will contact you back shortly.",
    inqError: "An error occurred. Please try again.",

    inqRightEyebrow: "Contact",
    inqRightTitleHtml: "We're here<br/>whenever<br/>you need us",
    inqRightSub: "Whether you have a medical question before your trip, or you need care right now — our English-speaking team is ready.",

    // Reviews
    revTitle: "Real Google Reviews from Travelers",
    revSub: "Real Patients. Real Stories. Over 60 reviews with a 5.0 rating on Google.",
    revWriteBtn: "Write a review on Google",

    // Footer
    footBrandDesc: "A member of Thonburi Healthcare Group (THG), delivering standard clinical care for local residents and international visitors on Koh Lanta.",
    footLinksDoc: "Doctors & Team",
    footLinksCareer: "Careers",
    footLinksContact: "Contact",
    footLinksPrivacy: "Privacy Policy",
    footCopy: "© 2026 Thonburi Lanta Clinic. All rights reserved."
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
    heroBadgeEnglish: "ทีมแพทย์ดูแลและสื่อสารภาษาอังกฤษ",
    heroBadgeInsurance: "ประสานงานเคลมตรงประกันภัย",
    heroBadgeFamily: "มาตรฐานสถานพยาบาลระดับสากล AACI",
    heroEyebrow: "เครือธนบุรี เฮลท์แคร์ กรุ๊ป (THG)",
    heroTitleHtml: "มาตรฐานบริการการแพทย์<br/>บนเกาะลันตา",
    heroSub: "คลินิกการแพทย์ในเครือ THG พร้อมบริการติดต่อฉุกเฉิน 24 ชั่วโมง ศูนย์ตรวจเด็ก กุมารเวชกรรม และระบบประสานงานประกันภัยสุขภาพต่างประเทศชั้นนำเพื่อนักท่องเที่ยวและผู้พักอาศัย",
    heroErLabel: "แผนกฉุกเฉิน · ตลอด 24 ชั่วโมง",
    heroErPhone: "081-569-7890",
    heroErNote: "เข้ารับการรักษาได้ทันทีโดยไม่ต้องนัดหมายล่วงหน้า",
    heroBtnPackages: "แพ็กเกจการรักษา",
    heroBtnDoctors: "ทีมแพทย์ของเรา",
    heroStatBeds: "บริการผู้ป่วยนอก (OPD)",
    heroStatEr: "ติดต่อฉุกเฉิน 24 ชม.",
    heroStatLang: "แพทย์สื่อสารภาษาอังกฤษ",
    heroStatGroup: "เครือข่ายสุขภาพ THG",

    // Trust Band
    tbEnglish: "แพทย์สื่อสารภาษาอังกฤษ",
    tbInsurance: "บริการเคลมตรงประกันคู่สัญญา",
    tbEmergency: "ห้องฉุกเฉินบริการตลอด 24 ชั่วโมง",
    tbPaediatric: "มาตรฐานความปลอดภัย AACI",
    tbGroup: "เครือธนบุรี เฮลท์แคร์ กรุ๊ป (THG)",

    // Families
    famEyebrow: "บริการเฉพาะทาง",
    famTitleHtml: "การดูแลอย่างมืออาชีพ<br/><em class='italic text-teal-brand'>ใกล้รีสอร์ทของคุณ</em>",
    famDesc: "เรามอบการรักษาพยาบาลที่ได้มาตรฐานระดับสากล พร้อมแผนกผู้ป่วยนอกที่พร้อมดูแลผู้เข้าพักและผู้พำนักระยะยาวอย่างรวดเร็ว เพื่อความอุ่นใจตลอดช่วงเวลาบนเกาะลันตา",
    famPediatricTitle: "กุมารเวชและการดูแลเด็ก",
    famPediatricDesc: "การตรวจวินิจฉัยและรักษาเด็กเล็กโดยทีมแพทย์ผู้เชี่ยวชาญ ดูแลรักษาไข้สูง อาการแพ้ การติดเชื้อ และอุบัติเหตุทั่วไปในเด็กอย่างอบอุ่นและปลอดภัย",
    famBeachTitle: "อุบัติเหตุจากการท่องเที่ยวชายหาดและทะเล",
    famBeachDesc: "การรักษาพยาบาลฉุกเฉินจากพิษแมงกะพรุน หอยเม่นตำ แผลจากปะการัง และภาวะฮีทสโตรกที่พบบ่อยในการทำกิจกรรมกลางแจ้งอย่างรวดเร็วและถูกวิธี",
    famInsTitle: "บริการแฟกซ์เคลมตรงประกันภัย",
    famInsDesc: "ประสานงานกับบริษัทประกันภัยเดินทางและประกันสุขภาพชั้นนำทั่วโลกโดยตรง อำนวยความสะดวกเรื่องเอกสารเพื่อลดความยุ่งยากในการสำรองจ่าย",

    // Expect
    expectEyebrow: "ขั้นตอนการเข้ารับบริการ",
    expectTitleHtml: "รวดเร็ว โปร่งใส<br/>และวางใจได้",
    expectDesc: "เราออกแบบขั้นตอนการประสานงานและขั้นตอนการรักษาให้เรียบง่ายและไม่ซับซ้อน เพื่อประหยัดเวลาและลดความกังวลในการมารักษาระหว่างวันหยุด",
    expectStep1Title: "ลงทะเบียนและคัดกรองอาการ",
    expectStep1Desc: "สามารถเข้ามาติดต่อได้ทันที หรือโทรประสานงานล่วงหน้า โดยกรณีอุบัติเหตุฉุกเฉินจะได้รับการประเมินรักษาทันที",
    expectStep2Title: "ตรวจวินิจฉัยโดยทีมแพทย์",
    expectStep2Desc: "ทีมแพทย์สื่อสารภาษาอังกฤษได้อย่างเข้าใจชัดเจน พร้อมอธิบายสาเหตุ แผนการรักษา และขั้นตอนอย่างละเอียด",
    expectStep3Title: "ตรวจรักษาและรับยา",
    expectStep3Desc: "บริการตรวจโรคครบครันในที่เดียวด้วยห้องปฏิบัติการวิเคราะห์โรค เอกซเรย์ดิจิทัล และห้องยามาตรฐานสากล",
    expectStep4Title: "ประสานงานประกันและสรุปค่าใช้จ่าย",
    expectStep4Desc: "จัดทำเอกสารและใบรับรองแพทย์อย่างครบถ้วนเพื่ออำนวยความสะดวกในการเบิกจ่ายหรือเคลมตรงประกันภัย",
    expectQuote: "การมีคลินิกมาตรฐานระดับสากลบนเกาะลันตา ทำให้ครอบครัวของเรารู้สึกปลอดภัยและท่องเที่ยวได้อย่างอุ่นใจอย่างแท้จริง",
    expectQuoteAuthor: "— แอนนา, ครอบครัวนักท่องเที่ยวจากสวีเดน",
    expectPill1: "ไม่ต้องจองคิวก่อนเข้ารับบริการ",
    expectPill2: "ทราบผลตรวจแล็บภายในวัน",
    expectPill3: "รายงานการรักษาภาษาอังกฤษ",
    expectPill4: "ห้องยาเปิดบริการ 24 ชั่วโมง",

    // Insurance
    insTitle: "บริษัทประกันภัยคู่สัญญา",
    insSub: "บริการเคลมตรงไม่ต้องสำรองจ่าย · เอกสารรับรองภาษาอังกฤษครบถ้วน · ทีมประสานงานประกันภัยเฉพาะทาง",
    insCheckBtn: "ตรวจสอบรายชื่อบริษัทประกัน",
    insNote: "หากไม่พบรายชื่อประกันของคุณ สามารถโทรติดต่อเราเพื่อสอบถามข้อมูลล่วงหน้า เรายินดีให้บริการประสานงานกับบริษัทประกันภัยของท่านเพื่ออำนวยความสะดวกอย่างเต็มที่",

    // Packages
    pkgEyebrow: "แพ็กเกจตรวจสุขภาพ",
    pkgTitleHtml: "ราคาชัดเจน<br/>ไม่มีค่าใช้จ่ายแอบแฝง",
    pkgDesc: "แพ็กเกจดูแลรักษาสุขภาพที่ครอบคลุมความปลอดภัยและการใช้ชีวิตบนเกาะ จ่ายราคาตามจริงตามระบุ",
    pkgDiveTitle: "ความปลอดภัยในการดำน้ำ (Dive Safety)",
    pkgDiveTag: "ยอดนิยม",
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
    locPill1: "10 นาที จากหาดพระแอะ (Long Beach)",
    locPill2: "15 นาที จากหาดคลองดาว",
    locPill3: "8 นาที จากท่าเรือบ้านศาลาด่าน",
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
    inqFieldInsuranceInfo: "บริษัทประกันคู่สัญญา / ประกันเดินทาง (ถ้ามี)",
    inqFieldNationality: "สัญชาติ",
    inqFieldLengthOfStay: "ระยะเวลาที่เข้าพักบนเกาะลันตา",
    inqFieldCurrentStay: "ที่พักปัจจุบัน (โรงแรม / รีสอร์ท)",
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
    inqPlaceholderInsuranceInfo: "เช่น Allianz, AXA, กรุงเทพประกันภัย...",
    inqPlaceholderNationality: "เช่น สวีเดน, อังกฤษ, ไทย...",
    inqPlaceholderLengthOfStay: "เช่น 5 วัน, 2 สัปดาห์, 1 เดือน...",
    inqPlaceholderCurrentStay: "เช่น โรงแรมเลญานา, พิมาลัย รีสอร์ท...",
    inqPlaceholderMessage: "รายละเอียดอาการ วันที่ประสงค์จะเข้ารับบริการ หรือคำถามอื่นๆ...",
    inqBtnSubmit: "ส่งข้อความ →",
    inqSuccess: "ส่งข้อมูลเรียบร้อยแล้ว! เจ้าหน้าที่ของเราจะติดต่อกลับหาคุณโดยเร็วที่สุด",
    inqError: "เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง",

    inqRightEyebrow: "ช่องทางการติดต่อ",
    inqRightTitleHtml: "เราพร้อมดูแลคุณ<br/>ในทุกช่วงเวลา<br/>ที่คุณต้องการ",
    inqRightSub: "ไม่ว่าคุณจะมีคำปรึกษาล่วงหน้าก่อนเดินทาง หรือต้องการการรักษาเร่งด่วนในขณะนี้ ทีมงานคลินิกธนบุรีลันตาพร้อมช่วยเหลือเสมอ",

    // Reviews
    revTitle: "ความคิดเห็นจากผู้รับบริการจริงบน Google",
    revSub: "คะแนนเฉลี่ย 5.0 ดาว จากกว่า 60 รีวิว โดยนักท่องเที่ยวและผู้รับบริการจริง",
    revWriteBtn: "เขียนรีวิวบน Google",

    // Footer
    footBrandDesc: "คลินิกในเครือธนบุรี เฮลท์แคร์ กรุ๊ป (THG) มุ่งมั่นที่จะมอบมาตรฐานการดูแลรักษาระดับสากลให้กับผู้อยู่อาศัยในเกาะลันตาและนักท่องเที่ยวทั่วโลก",
    footLinksDoc: "รายชื่อแพทย์ผู้รักษา",
    footLinksCareer: "สมัครงาน / ร่วมงานกับเรา",
    footLinksContact: "ติดต่อคลินิก",
    footLinksPrivacy: "นโยบายความเป็นส่วนตัว",
    footCopy: "© 2026 คลินิกธนบุรีลันตา สงวนลิขสิทธิ์."
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
