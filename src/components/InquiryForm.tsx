"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { supabase } from "@/utils/supabase";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export default function InquiryForm() {
  const { language, t } = useLanguage();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [serviceInterest, setServiceInterest] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    // Basic validation
    if (!name.trim()) {
      setStatusMsg({ type: "error", text: language === "en" ? "Full name is required." : "กรุณากรอกชื่อ-นามสกุล" });
      return;
    }

    if (!phone.trim() && !email.trim()) {
      setStatusMsg({
        type: "error",
        text: language === "en" ? "Please provide either a phone number or email address." : "กรุณากรอกเบอร์โทรศัพท์หรืออีเมลอย่างใดอย่างหนึ่ง",
      });
      return;
    }

    if (!serviceInterest) {
      setStatusMsg({
        type: "error",
        text: language === "en" ? "Please select a service interest." : "กรุณาเลือกบริการที่สนใจ",
      });
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("inquiries").insert([
        {
          name: name.trim(),
          phone: phone.trim() || null,
          email: email.trim() || null,
          channel: "web_form",
          service_interest: serviceInterest,
          message: message.trim() || null,
          language: language,
          status: "new",
        },
      ]);

      if (error) throw error;

      setStatusMsg({ type: "success", text: t("inqSuccess") });
      // Reset form
      setName("");
      setPhone("");
      setEmail("");
      setServiceInterest("");
      setMessage("");
    } catch (err: unknown) {
      console.error("Error submitting inquiry:", err);
      setStatusMsg({ type: "error", text: t("inqError") });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="contact-form" className="bg-white rounded-2xl p-8 border border-border shadow-sm max-w-xl w-full mx-auto">
      <h3 className="font-serif text-2xl font-normal text-dark mb-1">
        {t("inqTitle")}
      </h3>
      <p className="text-[12.5px] text-muted mb-6">
        {t("inqSubtitle")}
      </p>

      {statusMsg && (
        <div
          className={`flex items-start gap-2.5 p-4 rounded-xl mb-6 text-[13px] border ${
            statusMsg.type === "success"
              ? "bg-teal-light/40 border-teal-mid/20 text-teal-dark"
              : "bg-red-50 border-red-soft/20 text-red-soft"
          }`}
        >
          {statusMsg.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 shrink-0 text-teal-brand mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 shrink-0 text-red-soft mt-0.5" />
          )}
          <span>{statusMsg.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-[11px] font-semibold text-mid mb-1.5 uppercase tracking-wider">
              {t("inqFieldName")}
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t("inqPlaceholderName")}
              className="w-full border border-black/10 rounded-lg p-2.5 text-[13px] outline-none focus:border-teal-brand bg-warm-white transition-colors"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-[11px] font-semibold text-mid mb-1.5 uppercase tracking-wider">
              {t("inqFieldPhone")}
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t("inqPlaceholderPhone")}
              className="w-full border border-black/10 rounded-lg p-2.5 text-[13px] outline-none focus:border-teal-brand bg-warm-white transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-[11px] font-semibold text-mid mb-1.5 uppercase tracking-wider">
            {t("inqFieldEmail")}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("inqPlaceholderEmail")}
            className="w-full border border-black/10 rounded-lg p-2.5 text-[13px] outline-none focus:border-teal-brand bg-warm-white transition-colors"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-[11px] font-semibold text-mid mb-1.5 uppercase tracking-wider">
            {t("inqFieldInterest")}
          </label>
          <select
            required
            value={serviceInterest}
            onChange={(e) => setServiceInterest(e.target.value)}
            className="w-full border border-black/10 rounded-lg p-2.5 text-[13px] outline-none focus:border-teal-brand bg-warm-white transition-colors cursor-pointer"
          >
            <option value="">{t("inqInterestDefault")}</option>
            <option value="general">{t("inqInterestGeneral")}</option>
            <option value="dive_package">{t("inqInterestDive")}</option>
            <option value="health_check">{t("inqInterestCheck")}</option>
            <option value="emergency">{t("inqInterestEmergency")}</option>
            <option value="insurance">{t("inqInterestInsurance")}</option>
            <option value="resort_partnership">{t("inqInterestResort")}</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-[11px] font-semibold text-mid mb-1.5 uppercase tracking-wider">
            {t("inqFieldMessage")}
          </label>
          <textarea
            maxLength={500}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("inqPlaceholderMessage")}
            className="w-full border border-black/10 rounded-lg p-2.5 text-[13px] outline-none focus:border-teal-brand bg-warm-white transition-colors h-24 resize-none"
          />
          <span className="text-[10px] text-right text-muted mt-1 select-none">
            {message.length} / 500 chars
          </span>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full p-3 bg-teal-brand text-white font-medium rounded-lg text-[14px] hover:bg-teal-dark hover:-translate-y-[1px] active:translate-y-0 disabled:bg-muted disabled:pointer-events-none transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>{t("inqBtnSubmit")}</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
