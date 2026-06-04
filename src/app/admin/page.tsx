"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";
import type { User } from "@supabase/supabase-js";
import * as XLSX from "xlsx";
import {
  Download,
  Filter,
  Search,
  LogOut,
  Layers,
  Phone,
  Clock,
  Inbox,
  User as UserIcon,
} from "lucide-react";

interface Inquiry {
  id: string;
  created_at: string;
  name: string;
  phone: string | null;
  email: string | null;
  channel: string;
  service_interest: string;
  message: string | null;
  language: string;
  status: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [channelFilter, setChannelFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all"); // 'all' | 'today' | 'week' | 'month'

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/admin/login");
        return;
      }
      setUser(session.user);
      await fetchInquiries();
    };

    checkAuthAndFetch();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        router.push("/admin/login");
      } else {
        setUser(session.user);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const fetchInquiries = async () => {
    try {
      const { data, error } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (err) {
      console.error("Error fetching inquiries:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("inquiries")
        .update({ status: newStatus })
        .eq("id", id);

      if (error) throw error;

      // Update state locally
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Please verify permissions.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  // Helper date logic
  const isToday = (dateStr: string) => {
    const d = new Date(dateStr);
    const today = new Date();
    return d.toDateString() === today.toDateString();
  };

  const isThisWeek = (dateStr: string) => {
    const d = new Date(dateStr);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7;
  };

  const isThisMonth = (dateStr: string) => {
    const d = new Date(dateStr);
    const today = new Date();
    return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  };

  // Calculations for Metrics Row
  const metrics = {
    today: inquiries.filter((inq) => isToday(inq.created_at)).length,
    week: inquiries.filter((inq) => isThisWeek(inq.created_at)).length,
    month: inquiries.filter((inq) => isThisMonth(inq.created_at)).length,
    new: inquiries.filter((inq) => inq.status === "new").length,
  };

  // Filter & Search Logic
  const filteredInquiries = inquiries.filter((inq) => {
    // Search match (name, email, phone, message)
    const searchLower = search.toLowerCase();
    const matchesSearch =
      inq.name.toLowerCase().includes(searchLower) ||
      (inq.email && inq.email.toLowerCase().includes(searchLower)) ||
      (inq.phone && inq.phone.toLowerCase().includes(searchLower)) ||
      (inq.message && inq.message.toLowerCase().includes(searchLower));

    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    const matchesChannel = channelFilter === "all" || inq.channel === channelFilter;
    const matchesService = serviceFilter === "all" || inq.service_interest === serviceFilter;

    let matchesDate = true;
    if (dateFilter === "today") matchesDate = isToday(inq.created_at);
    else if (dateFilter === "week") matchesDate = isThisWeek(inq.created_at);
    else if (dateFilter === "month") matchesDate = isThisMonth(inq.created_at);

    return matchesSearch && matchesStatus && matchesChannel && matchesService && matchesDate;
  });

  // Excel Export Logic
  const exportToExcel = () => {
    const formattedData = filteredInquiries.map((inq) => ({
      Date: new Date(inq.created_at).toLocaleString("th-TH"),
      Name: inq.name,
      Phone: inq.phone || "-",
      Email: inq.email || "-",
      Channel: inq.channel,
      "Service Interest": inq.service_interest,
      Message: inq.message || "-",
      Language: inq.language.toUpperCase(),
      Status: inq.status,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inquiries");

    const dateStr = new Date().toISOString().split("T")[0];
    XLSX.writeFile(workbook, `thonburi-lanta-inquiries-${dateStr}.xlsx`);
  };

  // Pure SVG/HTML visual breakdowns
  const getChannelCount = (channel: string) => inquiries.filter((inq) => inq.channel === channel).length;
  const getServiceCount = (service: string) => inquiries.filter((inq) => inq.service_interest === service).length;

  const maxChannel = Math.max(1, ...["web_form", "facebook", "line", "walk_in", "phone"].map(getChannelCount));
  const maxService = Math.max(1, ...["general", "dive_package", "health_check", "emergency", "insurance", "resort_partnership"].map(getServiceCount));

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <span className="w-10 h-10 border-4 border-teal-brand/35 border-t-teal-brand rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pb-16">
      {/* Dashboard Top bar */}
      <header className="bg-white border-b border-border px-8 py-4 flex justify-between items-center select-none shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-teal-brand text-white rounded-lg flex items-center justify-center text-lg font-bold">
            🏥
          </div>
          <div>
            <h1 className="font-serif text-lg font-semibold text-dark leading-none">
              Thonburi Lanta Hospital
            </h1>
            <span className="text-[10.5px] text-muted tracking-wide mt-1 block">
              Inquiry Admin Console
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-[12px] bg-cream border border-border px-3 py-1.5 rounded-lg font-medium text-mid">
            <UserIcon className="w-3.5 h-3.5" />
            <span>{user?.email}</span>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 bg-red-soft/10 text-red-soft hover:bg-red-soft hover:text-white px-3 py-1.5 rounded-lg text-[12px] font-semibold transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-8 pt-8">
        {/* Metrics Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
            <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-1">Today</div>
            <div className="text-3xl font-bold text-dark font-serif">{metrics.today}</div>
            <span className="text-[9.5px] text-teal-brand mt-1 block font-medium">Daily submissions</span>
          </div>
          <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
            <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-1">This Week</div>
            <div className="text-3xl font-bold text-dark font-serif">{metrics.week}</div>
            <span className="text-[9.5px] text-teal-brand mt-1 block font-medium">Last 7 days</span>
          </div>
          <div className="bg-white border border-border rounded-xl p-5 shadow-sm">
            <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-1">This Month</div>
            <div className="text-3xl font-bold text-dark font-serif">{metrics.month}</div>
            <span className="text-[9.5px] text-teal-brand mt-1 block font-medium">Current billing month</span>
          </div>
          <div className="bg-white border border-border rounded-xl p-5 shadow-sm relative overflow-hidden">
            <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-1">New Inquiries</div>
            <div className="text-3xl font-bold text-red-soft font-serif">{metrics.new}</div>
            <span className="text-[9.5px] text-red-soft/75 mt-1 block font-medium animate-pulse">Needs follow-up</span>
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-soft animate-ping" />
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Channel Breakdown */}
          <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-serif text-[15px] font-semibold text-dark mb-4 flex items-center gap-1.5">
              <Layers className="w-4.5 h-4.5 text-teal-brand" />
              <span>Inquiry by Channel Breakdown</span>
            </h3>
            <div className="flex flex-col gap-4">
              {[
                { name: "Web Form", code: "web_form", color: "bg-teal-brand" },
                { name: "Facebook Messenger", code: "facebook", color: "bg-blue-600" },
                { name: "LINE OA", code: "line", color: "bg-green-500" },
                { name: "Walk-in", code: "walk_in", color: "bg-amber" },
                { name: "Phone call", code: "phone", color: "bg-red-soft" },
              ].map((chan) => {
                const count = getChannelCount(chan.code);
                const percent = Math.round((count / maxChannel) * 100) || 0;
                return (
                  <div key={chan.code} className="flex flex-col">
                    <div className="flex justify-between items-center text-[12px] font-medium text-mid mb-1">
                      <span>{chan.name}</span>
                      <span className="font-semibold text-dark">{count} inquiries</span>
                    </div>
                    <div className="w-full bg-cream h-2.5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${chan.color}`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Service Breakdown */}
          <div className="bg-white border border-border rounded-xl p-6 shadow-sm">
            <h3 className="font-serif text-[15px] font-semibold text-dark mb-4 flex items-center gap-1.5">
              <Inbox className="w-4.5 h-4.5 text-teal-brand" />
              <span>Inquiry by Medical Interest</span>
            </h3>
            <div className="flex flex-col gap-3">
              {[
                { name: "General / Pediatric", code: "general" },
                { name: "Dive Safety Package", code: "dive_package" },
                { name: "Health Checkup", code: "health_check" },
                { name: "Emergency Care", code: "emergency" },
                { name: "Insurance Billing", code: "insurance" },
                { name: "Resort Partnership", code: "resort_partnership" },
              ].map((serv) => {
                const count = getServiceCount(serv.code);
                const percent = Math.round((count / maxService) * 100) || 0;
                return (
                  <div key={serv.code} className="flex flex-col">
                    <div className="flex justify-between items-center text-[11.5px] font-medium text-mid mb-0.5">
                      <span>{serv.name}</span>
                      <span className="font-semibold text-dark">{count}</span>
                    </div>
                    <div className="w-full bg-cream h-2 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-teal-dark transition-all duration-500"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white border border-border rounded-xl p-5 mb-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 select-none">
            <div className="flex items-center gap-2 text-[13.5px] font-semibold text-dark">
              <Filter className="w-4 h-4 text-teal-brand" />
              <span>Filter Inquiries</span>
            </div>
            <button
              onClick={exportToExcel}
              className="flex items-center gap-1.5 bg-teal-brand text-white border-0 py-2 px-4 rounded-lg text-[12px] font-bold cursor-pointer hover:bg-teal-dark transition-colors shadow-sm select-none"
            >
              <Download className="w-4.5 h-4.5" />
              <span>Export XLS</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, phone, msg..."
                className="w-full border border-black/10 rounded-lg pl-9 pr-3 py-2 text-[12.5px] outline-none focus:border-teal-brand"
              />
            </div>

            {/* Status select */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-black/10 rounded-lg px-2.5 py-2 text-[12.5px] outline-none focus:border-teal-brand cursor-pointer"
            >
              <option value="all">Status: All</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="booked">Booked</option>
              <option value="closed">Closed</option>
            </select>

            {/* Channel select */}
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
              className="border border-black/10 rounded-lg px-2.5 py-2 text-[12.5px] outline-none focus:border-teal-brand cursor-pointer"
            >
              <option value="all">Channel: All</option>
              <option value="web_form">Web Form</option>
              <option value="facebook">Facebook</option>
              <option value="line">LINE</option>
              <option value="walk_in">Walk-in</option>
              <option value="phone">Phone</option>
            </select>

            {/* Service select */}
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="border border-black/10 rounded-lg px-2.5 py-2 text-[12.5px] outline-none focus:border-teal-brand cursor-pointer"
            >
              <option value="all">Service: All</option>
              <option value="general">General / Pediatric</option>
              <option value="dive_package">Dive Safety Package</option>
              <option value="health_check">Health Checkup</option>
              <option value="emergency">Emergency Care</option>
              <option value="insurance">Insurance Billing</option>
              <option value="resort_partnership">Resort Partnership</option>
            </select>

            {/* Date Select */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border border-black/10 rounded-lg px-2.5 py-2 text-[12.5px] outline-none focus:border-teal-brand cursor-pointer"
            >
              <option value="all">Date: All time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>
        </div>

        {/* Table of Inquiries */}
        <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-cream/40 border-b border-border select-none text-[11px] font-bold text-muted uppercase tracking-wider">
                  <th className="p-4.5">Date / Time</th>
                  <th className="p-4.5">Name</th>
                  <th className="p-4.5">Contact Details</th>
                  <th className="p-4.5">Channel</th>
                  <th className="p-4.5">Medical Interest</th>
                  <th className="p-4.5">Message</th>
                  <th className="p-4.5 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-[13px] text-dark">
                {filteredInquiries.length > 0 ? (
                  filteredInquiries.map((inq) => {
                    const localTime = new Date(inq.created_at).toLocaleString("en-US", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    });

                    // Badge colors matching channel
                    const channelColors: Record<string, string> = {
                      web_form: "bg-teal-light text-teal-dark",
                      facebook: "bg-blue-100 text-blue-800",
                      line: "bg-green-100 text-green-800",
                      walk_in: "bg-amber-light text-amber",
                      phone: "bg-red-50 text-red-soft",
                    };

                    const statusBorderColors: Record<string, string> = {
                      new: "border-red-soft/25 bg-red-50/50 text-red-soft",
                      contacted: "border-blue-200 bg-blue-50 text-blue-800",
                      booked: "border-teal-mid/30 bg-teal-light/30 text-teal-dark",
                      closed: "border-black/10 bg-cream text-mid",
                    };

                    return (
                      <tr key={inq.id} className="hover:bg-cream/20 transition-colors">
                        <td className="p-4.5 font-medium whitespace-nowrap text-muted flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{localTime}</span>
                          <span className="text-[10px] bg-black/5 text-mid px-1 py-0.5 rounded font-mono font-bold uppercase select-none">
                            {inq.language}
                          </span>
                        </td>
                        <td className="p-4.5 font-semibold text-dark">{inq.name}</td>
                        <td className="p-4.5 font-medium whitespace-pre-wrap">
                          <div className="flex flex-col gap-0.5">
                            {inq.phone && <span className="flex items-center gap-1"><Phone className="w-3 h-3 text-muted shrink-0" /> {inq.phone}</span>}
                            {inq.email && <span className="text-muted text-[12px]">{inq.email}</span>}
                          </div>
                        </td>
                        <td className="p-4.5">
                          <span className={`text-[10.5px] font-bold uppercase px-2.5 py-1 rounded-full ${channelColors[inq.channel] || "bg-cream text-mid"}`}>
                            {inq.channel === "web_form" ? "Web Form" : inq.channel}
                          </span>
                        </td>
                        <td className="p-4.5 font-medium capitalize text-teal-dark">{inq.service_interest.replace("_", " ")}</td>
                        <td className="p-4.5 max-w-xs truncate text-[12px] text-mid" title={inq.message || ""}>
                          {inq.message || "-"}
                        </td>
                        <td className="p-4.5 text-center">
                          <select
                            value={inq.status}
                            onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                            className={`border rounded-lg px-2.5 py-1.5 text-[12px] font-bold cursor-pointer focus:outline-none ${statusBorderColors[inq.status]}`}
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="booked">Booked</option>
                            <option value="closed">Closed</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="p-12 text-center text-muted font-medium select-none">
                      No inquiries match your selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
