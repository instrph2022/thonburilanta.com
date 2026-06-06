"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import { Lock, Mail, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Check if already authenticated
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push("/admin");
      }
    };
    checkUser();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: password,
      });

      if (error) throw error;

      router.push("/admin");
    } catch (err: unknown) {
      console.error("Login error:", err);
      const msg = err instanceof Error ? err.message : "Invalid email or password.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-center items-center px-6">
      <div className="bg-white rounded-2xl p-8 border border-border shadow-sm max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-teal-brand text-white rounded-xl flex items-center justify-center p-2.5 mx-auto mb-3 shadow-md">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6 text-amber">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <h1 className="font-serif text-2xl font-normal text-dark">
            Thonburi Lanta Hospital
          </h1>
          <p className="text-[12px] text-muted mt-1">
            Admin Inquiry Portal Login
          </p>
        </div>

        {errorMsg && (
          <div className="bg-red-50 border border-red-soft/20 text-red-soft rounded-xl p-4 text-[13px] flex items-start gap-2.5 mb-6">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-soft mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="text-[11px] font-semibold text-mid mb-1.5 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@thonburilanta.com"
                className="w-full border border-black/10 rounded-lg pl-10 pr-4 py-2.5 text-[13px] outline-none focus:border-teal-brand bg-warm-white transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-[11px] font-semibold text-mid mb-1.5 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-black/10 rounded-lg pl-10 pr-4 py-2.5 text-[13px] outline-none focus:border-teal-brand bg-warm-white transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 p-3 bg-teal-brand text-white font-medium rounded-lg text-[13.5px] hover:bg-teal-dark disabled:bg-muted disabled:pointer-events-none transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
