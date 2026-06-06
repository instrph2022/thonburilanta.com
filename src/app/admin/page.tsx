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
  Shield,
  Activity,
  Calendar,
  Trash2,
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
  responded_at?: string | null;
  insurance_info?: string | null;
  nationality?: string | null;
  length_of_stay?: string | null;
  current_stay?: string | null;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // View Mode
  const [viewMode, setViewMode] = useState<"table" | "kanban">("table");

  // Filters
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [channelFilter, setChannelFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all"); // 'all' | 'today' | 'week' | 'month' | 'custom'
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Trend Chart State
  const [trendView, setTrendView] = useState<"weekly" | "monthly">("monthly");

  // Toast Notification state for Realtime alerts
  const [toast, setToast] = useState<{ show: boolean; name: string; service: string } | null>(null);

  // Drag and drop state for Kanban
  const [draggedOverCol, setDraggedOverCol] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      // Bypassing auth check for testing/preview purposes
      setUser({ email: "admin-preview@thonburilanta.com" } as unknown as User);
      await fetchInquiries();
    };

    checkAuthAndFetch();
  }, []);

  useEffect(() => {
    // Subscribe to real-time additions on the inquiries table
    const channel = supabase
      .channel("inquiries-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "inquiries" },
        (payload) => {
          const newInq = payload.new as Inquiry;
          // Prepend new inquiry to list
          setInquiries((prev) => [newInq, ...prev]);
          // Display Toast Popup
          setToast({ show: true, name: newInq.name, service: newInq.service_interest });
          
          // Auto-hide toast after 7 seconds
          setTimeout(() => {
            setToast((t) => (t && t.name === newInq.name ? null : t));
          }, 7000);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

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
      const targetInq = inquiries.find((i) => i.id === id);
      const isResponding = newStatus !== "new" && (!targetInq || !targetInq.responded_at);
      const respondedAtVal = isResponding ? new Date().toISOString() : (targetInq ? targetInq.responded_at : null);

      const { error } = await supabase
        .from("inquiries")
        .update({ 
          status: newStatus,
          ...(isResponding ? { responded_at: respondedAtVal } : {})
        })
        .eq("id", id);

      if (error) throw error;

      // Update state locally
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus, ...(isResponding ? { responded_at: respondedAtVal } : {}) } : inq))
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Please verify database schema columns and permissions.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this inquiry? This action cannot be undone.")) return;
    try {
      const { error } = await supabase
        .from("inquiries")
        .delete()
        .eq("id", id);

      if (error) throw error;

      // Update state locally
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    } catch (err) {
      console.error("Error deleting inquiry:", err);
      alert("Failed to delete inquiry. Please verify database permissions.");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  const getServicePrice = (service: string) => {
    switch (service) {
      case "dive_package":
        return "฿1,490";
      case "health_check":
        return "฿3,990";
      case "general":
        return "฿990";
      case "resort_partnership":
        return "฿1,890";
      case "emergency":
        return "ER Triage";
      case "insurance":
        return "Billing Check";
      default:
        return "-";
    }
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

  const formatDuration = (ms: number) => {
    const totalMins = Math.round(ms / 60000);
    if (totalMins < 60) return `${totalMins} min${totalMins !== 1 ? "s" : ""}`;
    const hours = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    return `${hours}h ${mins}m`;
  };

  // Calculations for Metrics Row
  const respondedInqs = inquiries.filter((inq) => inq.responded_at);
  const totalResponseTime = respondedInqs.reduce((acc, inq) => {
    const diff = new Date(inq.responded_at!).getTime() - new Date(inq.created_at).getTime();
    return acc + diff;
  }, 0);
  const avgResponseTimeStr = respondedInqs.length > 0 
    ? formatDuration(totalResponseTime / respondedInqs.length) 
    : "No responses";

  const metrics = {
    today: inquiries.filter((inq) => isToday(inq.created_at)).length,
    week: inquiries.filter((inq) => isThisWeek(inq.created_at)).length,
    avgResponse: avgResponseTimeStr,
    new: inquiries.filter((inq) => inq.status === "new").length,
  };

  // Filter & Search Logic
  const filteredInquiries = inquiries.filter((inq) => {
    // Search match (name, email, phone, message, insurance_info, nationality, current_stay, length_of_stay)
    const searchLower = search.toLowerCase();
    const matchesSearch =
      inq.name.toLowerCase().includes(searchLower) ||
      (inq.email && inq.email.toLowerCase().includes(searchLower)) ||
      (inq.phone && inq.phone.toLowerCase().includes(searchLower)) ||
      (inq.message && inq.message.toLowerCase().includes(searchLower)) ||
      (inq.insurance_info && inq.insurance_info.toLowerCase().includes(searchLower)) ||
      (inq.nationality && inq.nationality.toLowerCase().includes(searchLower)) ||
      (inq.current_stay && inq.current_stay.toLowerCase().includes(searchLower)) ||
      (inq.length_of_stay && inq.length_of_stay.toLowerCase().includes(searchLower));

    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;
    const matchesChannel = channelFilter === "all" || inq.channel === channelFilter;
    const matchesService = serviceFilter === "all" || inq.service_interest === serviceFilter;

    let matchesDate = true;
    if (dateFilter === "today") {
      matchesDate = isToday(inq.created_at);
    } else if (dateFilter === "week") {
      matchesDate = isThisWeek(inq.created_at);
    } else if (dateFilter === "month") {
      matchesDate = isThisMonth(inq.created_at);
    } else if (dateFilter === "custom") {
      const createdTime = new Date(inq.created_at).getTime();
      const start = startDate ? new Date(startDate + "T00:00:00").getTime() : 0;
      const end = endDate ? new Date(endDate + "T23:59:59").getTime() : Infinity;
      matchesDate = createdTime >= start && createdTime <= end;
    }

    return matchesSearch && matchesStatus && matchesChannel && matchesService && matchesDate;
  });

  // Excel Export Logic
  const exportToExcel = () => {
    const formattedData = filteredInquiries.map((inq) => {
      let respTimeMins: string | number = "-";
      if (inq.responded_at) {
        const diff = new Date(inq.responded_at).getTime() - new Date(inq.created_at).getTime();
        respTimeMins = Math.round(diff / 60000);
      }
      return {
        Date: new Date(inq.created_at).toLocaleString("th-TH"),
        Name: inq.name,
        Phone: inq.phone || "-",
        Email: inq.email || "-",
        Nationality: inq.nationality || "-",
        "Current Stay": inq.current_stay || "-",
        "Length of Stay": inq.length_of_stay || "-",
        Insurance: inq.insurance_info || "-",
        Channel: inq.channel === "web_form" ? "Web Form" : inq.channel,
        "Service Interest": inq.service_interest,
        Message: inq.message || "-",
        Language: inq.language.toUpperCase(),
        Status: inq.status,
        "Responded At": inq.responded_at ? new Date(inq.responded_at).toLocaleString("th-TH") : "-",
        "Response Time (mins)": respTimeMins,
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inquiries");

    const dateStr = new Date().toISOString().split("T")[0];
    XLSX.writeFile(workbook, `thonburi-lanta-inquiries-${dateStr}.xlsx`);
  };

  // Channel breakdown counters
  const getChannelCount = (channel: string) => inquiries.filter((inq) => inq.channel === channel).length;
  const getServiceCount = (service: string) => inquiries.filter((inq) => inq.service_interest === service).length;

  const maxChannel = Math.max(1, ...["web_form", "facebook", "line", "whatsapp", "walk_in", "phone"].map(getChannelCount));
  const maxService = Math.max(1, ...["general", "dive_package", "health_check", "emergency", "insurance", "resort_partnership"].map(getServiceCount));

  // Calculate Trend Data for Line/Bar comparison
  const getTrendData = () => {
    const data: { label: string; count: number; avgTime: number }[] = [];
    const now = new Date();

    if (trendView === "monthly") {
      // Last 6 months
      for (let i = 5; i >= 0; i--) {
        const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const label = d.toLocaleString("en-US", { month: "short", year: "2-digit" });
        
        const monthlyInqs = inquiries.filter((inq) => {
          const inqDate = new Date(inq.created_at);
          return inqDate.getMonth() === d.getMonth() && inqDate.getFullYear() === d.getFullYear();
        });

        const responded = monthlyInqs.filter((inq) => inq.responded_at);
        const avgTime = responded.length > 0
          ? Math.round(responded.reduce((acc, inq) => acc + (new Date(inq.responded_at!).getTime() - new Date(inq.created_at).getTime()), 0) / responded.length / 60000)
          : 0;

        data.push({ label, count: monthlyInqs.length, avgTime });
      }
    } else {
      // Last 6 weeks (starting from current week back)
      for (let i = 5; i >= 0; i--) {
        const targetDate = new Date();
        targetDate.setDate(now.getDate() - i * 7);
        const day = targetDate.getDay();
        const diff = targetDate.getDate() - day + (day === 0 ? -6 : 1);
        const startOfWeek = new Date(targetDate.setDate(diff));
        startOfWeek.setHours(0, 0, 0, 0);
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);
        endOfWeek.setHours(23, 59, 59, 999);

        const label = `${startOfWeek.getDate()}/${startOfWeek.getMonth() + 1}`;

        const weeklyInqs = inquiries.filter((inq) => {
          const inqDate = new Date(inq.created_at);
          return inqDate >= startOfWeek && inqDate <= endOfWeek;
        });

        const responded = weeklyInqs.filter((inq) => inq.responded_at);
        const avgTime = responded.length > 0
          ? Math.round(responded.reduce((acc, inq) => acc + (new Date(inq.responded_at!).getTime() - new Date(inq.created_at).getTime()), 0) / responded.length / 60000)
          : 0;

        data.push({ label, count: weeklyInqs.length, avgTime });
      }
    }
    return data;
  };

  const trendData = getTrendData();
  const maxTrendCount = Math.max(1, ...trendData.map((d) => d.count));
  const maxTrendTime = Math.max(1, ...trendData.map((d) => d.avgTime));

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
          <div className="w-9 h-9 bg-teal-brand text-white rounded-lg flex items-center justify-center p-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-amber">
              <path d="M12 5v14M5 12h14" />
            </svg>
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
          <div className="bg-white border border-border rounded-xl p-5 shadow-sm relative overflow-hidden">
            <div className="text-[10px] uppercase tracking-wider text-muted font-semibold mb-1">Avg Response Time</div>
            <div className="text-2xl font-bold text-dark font-serif mt-1">{metrics.avgResponse}</div>
            <span className="text-[9.5px] text-teal-brand mt-1 block font-medium">
              From {respondedInqs.length} answered cases
            </span>
            <Activity className="absolute bottom-2 right-2 w-5 h-5 text-teal-brand/20" />
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
                { name: "WhatsApp", code: "whatsapp", color: "bg-[#25D366]" },
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

        {/* Trend Comparison Chart (Weekly/Monthly) */}
        <div className="bg-white border border-border rounded-xl p-6 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-6 select-none">
            <h3 className="font-serif text-[15px] font-semibold text-dark flex items-center gap-1.5">
              <Calendar className="w-4.5 h-4.5 text-teal-brand" />
              <span>Performance Trend & Response Times</span>
            </h3>
            <div className="flex bg-cream border border-border p-1 rounded-lg text-[12px] font-semibold">
              <button
                onClick={() => setTrendView("weekly")}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  trendView === "weekly" ? "bg-white shadow-sm text-teal-brand" : "text-muted hover:text-dark"
                }`}
              >
                Weekly View
              </button>
              <button
                onClick={() => setTrendView("monthly")}
                className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                  trendView === "monthly" ? "bg-white shadow-sm text-teal-brand" : "text-muted hover:text-dark"
                }`}
              >
                Monthly View
              </button>
            </div>
          </div>

          {/* Visualizing Bar Chart Group */}
          <div className="grid grid-cols-6 gap-4 items-end h-48 border-b border-border/80 pb-2 relative mb-3">
            {trendData.map((d, index) => {
              const hCount = Math.round((d.count / maxTrendCount) * 100) || 4;
              const hTime = Math.round((d.avgTime / maxTrendTime) * 100) || 4;

              return (
                <div key={index} className="flex flex-col items-center justify-end h-full w-full group relative">
                  {/* Tooltip on hover */}
                  <div className="absolute bottom-full mb-2 bg-dark text-white rounded text-[10px] px-2 py-1 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-md">
                    <span>Total Inquiries: <strong>{d.count}</strong></span>
                    <span>Avg Response: <strong>{d.avgTime} mins</strong></span>
                  </div>

                  <div className="flex gap-2 w-full justify-center max-w-[64px]">
                    {/* Count Bar */}
                    <div
                      className="bg-teal-brand w-3.5 rounded-t-sm transition-all duration-500"
                      style={{ height: `${hCount}px`, minHeight: "6px" }}
                      title={`Inquiries: ${d.count}`}
                    />
                    {/* Avg Response Time Bar */}
                    <div
                      className="bg-[#25D366]/80 w-3.5 rounded-t-sm transition-all duration-500"
                      style={{ height: `${hTime}px`, minHeight: "6px" }}
                      title={`Avg Response: ${d.avgTime} mins`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Labels & Legend */}
          <div className="flex justify-between items-center select-none text-[11px] text-muted font-bold px-1.5">
            <div className="grid grid-cols-6 w-full text-center">
              {trendData.map((d, index) => (
                <span key={index}>{d.label}</span>
              ))}
            </div>
          </div>

          <div className="flex gap-6 justify-center mt-4 text-[11.5px] font-semibold select-none border-t border-border/50 pt-3">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 bg-teal-brand rounded" />
              <span className="text-mid">Total Submissions (Volume)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 bg-[#25D366] rounded" />
              <span className="text-mid">Average Response Speed (Minutes)</span>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="bg-white border border-border rounded-xl p-5 mb-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4 select-none">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-[13.5px] font-semibold text-dark">
                <Filter className="w-4 h-4 text-teal-brand" />
                <span>Filter Inquiries</span>
              </div>
              
              {/* View Mode Switcher */}
              <div className="flex bg-cream border border-border p-1 rounded-lg text-[11px] font-bold">
                <button
                  onClick={() => setViewMode("table")}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    viewMode === "table" ? "bg-white shadow-sm text-teal-brand font-bold" : "text-muted hover:text-dark font-medium"
                  }`}
                >
                  Table View
                </button>
                <button
                  onClick={() => setViewMode("kanban")}
                  className={`px-3 py-1 rounded-md transition-colors cursor-pointer ${
                    viewMode === "kanban" ? "bg-white shadow-sm text-teal-brand font-bold" : "text-muted hover:text-dark font-medium"
                  }`}
                >
                  Kanban Board
                </button>
              </div>
            </div>
            <button
              onClick={exportToExcel}
              className="flex items-center gap-1.5 bg-teal-brand text-white border-0 py-2 px-4 rounded-lg text-[12px] font-bold cursor-pointer hover:bg-teal-dark transition-colors shadow-sm select-none"
            >
              <Download className="w-4.5 h-4.5" />
              <span>Export XLS</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, phone, insurance..."
                className="w-full border border-black/10 rounded-lg pl-9 pr-3 py-2 text-[12.5px] outline-none focus:border-teal-brand"
              />
            </div>

            {/* Status select */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-black/10 rounded-lg px-2.5 py-2 text-[12.5px] outline-none focus:border-teal-brand cursor-pointer bg-white"
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
              className="border border-black/10 rounded-lg px-2.5 py-2 text-[12.5px] outline-none focus:border-teal-brand cursor-pointer bg-white"
            >
              <option value="all">Channel: All</option>
              <option value="web_form">Web Form</option>
              <option value="facebook">Facebook</option>
              <option value="line">LINE</option>
              <option value="whatsapp">WhatsApp</option>
              <option value="walk_in">Walk-in</option>
              <option value="phone">Phone</option>
            </select>

            {/* Service select */}
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="border border-black/10 rounded-lg px-2.5 py-2 text-[12.5px] outline-none focus:border-teal-brand cursor-pointer bg-white"
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
              className="border border-black/10 rounded-lg px-2.5 py-2 text-[12.5px] outline-none focus:border-teal-brand cursor-pointer bg-white"
            >
              <option value="all">Date: All time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="custom">Custom Date Range</option>
            </select>

            {/* Date Pickers for Custom Option */}
            {dateFilter === "custom" ? (
              <div className="flex gap-2 items-center col-span-1 sm:col-span-2 lg:col-span-1">
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border border-black/10 rounded-lg px-2 py-1.5 text-[11px] outline-none focus:border-teal-brand cursor-pointer bg-white"
                  title="Start Date"
                />
                <span className="text-[10px] font-bold text-muted">to</span>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border border-black/10 rounded-lg px-2 py-1.5 text-[11px] outline-none focus:border-teal-brand cursor-pointer bg-white"
                  title="End Date"
                />
              </div>
            ) : null}
          </div>
        </div>

        {/* Inquiries Data View (Table / Kanban Board) */}
        {viewMode === "kanban" ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
            {[
              { title: "New Inquiries", key: "new", border: "border-t-4 border-t-red-soft", bg: "bg-red-50/5" },
              { title: "Contacted", key: "contacted", border: "border-t-4 border-t-blue-500", bg: "bg-blue-50/5" },
              { title: "Booked (Scheduled)", key: "booked", border: "border-t-4 border-t-teal-brand", bg: "bg-teal-50/5" },
              { title: "Closed (Treated)", key: "closed", border: "border-t-4 border-t-muted", bg: "bg-cream/10" },
            ].map((col) => {
              const colInquiries = filteredInquiries.filter((i) => i.status === col.key);

              return (
                <div
                  key={col.key}
                  onDragOver={(e) => {
                    e.preventDefault();
                  }}
                  onDragEnter={() => setDraggedOverCol(col.key)}
                  onDragLeave={() => setDraggedOverCol(null)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setDraggedOverCol(null);
                    const id = e.dataTransfer.getData("text/plain");
                    if (id) {
                      handleStatusChange(id, col.key);
                    }
                  }}
                  className={`bg-white border rounded-xl p-4 shadow-sm flex flex-col min-h-[500px] transition-all duration-200 ${col.border} ${
                    draggedOverCol === col.key
                      ? "bg-teal-brand/10 border-teal-brand scale-[1.01] shadow-md"
                      : "border-border"
                  }`}
                >
                  {/* Column Header */}
                  <div className="flex justify-between items-center mb-4 pb-2 border-b border-border/65 select-none">
                    <span className="font-serif text-[13.5px] font-bold text-dark">{col.title}</span>
                    <span className="text-[10px] bg-cream text-mid font-bold px-2 py-0.5 rounded-full">
                      {colInquiries.length}
                    </span>
                  </div>

                  {/* Cards List */}
                  <div className="flex flex-col gap-3.5 overflow-y-auto max-h-[650px] pr-1.5 scrollbar-thin">
                    {colInquiries.length > 0 ? (
                      colInquiries.map((inq) => {
                        const localTime = new Date(inq.created_at).toLocaleString("en-US", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                        });

                        const channelColors: Record<string, string> = {
                          web_form: "bg-teal-light text-teal-dark",
                          facebook: "bg-blue-100 text-blue-800",
                          line: "bg-green-100 text-green-800",
                          whatsapp: "bg-[#E5FBE5] text-[#128C7E]",
                          walk_in: "bg-amber-light text-amber",
                          phone: "bg-red-50 text-red-soft",
                        };

                        let responseText = "";
                        let isPending = true;
                        if (inq.responded_at) {
                          const diff = new Date(inq.responded_at).getTime() - new Date(inq.created_at).getTime();
                          responseText = `Replied: ${formatDuration(diff)}`;
                          isPending = false;
                        } else {
                          const diffPending = new Date().getTime() - new Date(inq.created_at).getTime();
                          responseText = `Pending: ${formatDuration(diffPending)}`;
                        }

                        return (
                          <div
                            key={inq.id}
                            draggable
                            onDragStart={(e) => {
                              e.dataTransfer.setData("text/plain", inq.id);
                              e.dataTransfer.effectAllowed = "move";
                            }}
                            className="bg-cream/10 hover:bg-cream/25 border border-border/85 rounded-xl p-4 transition-all shadow-sm flex flex-col gap-2.5 cursor-grab active:cursor-grabbing hover:shadow-md hover:-translate-y-0.5 select-none"
                          >
                            {/* Card Top Header */}
                            <div className="flex justify-between items-center gap-1 select-none pointer-events-none">
                              <span className="text-[9.5px] text-muted font-medium">{localTime}</span>
                              <span className={`text-[8.5px] font-bold uppercase px-2 py-0.5 rounded-full ${channelColors[inq.channel] || "bg-cream text-mid"}`}>
                                {inq.channel === "web_form" ? "Web Form" : inq.channel}
                              </span>
                            </div>

                            {/* Patient Info */}
                            <div className="pointer-events-none">
                              <h5 className="font-semibold text-dark text-[13.5px] leading-tight mb-1">
                                {inq.name}
                              </h5>
                              <div className="text-[11px] text-mid flex flex-col gap-0.5 leading-relaxed">
                                {inq.phone && <span className="flex items-center gap-1">📞 {inq.phone}</span>}
                                {inq.email && <span className="truncate">✉️ {inq.email}</span>}
                              </div>
                            </div>

                            {/* Medical Interest & Estimated Price */}
                            <div className="bg-white border border-border/60 rounded-lg p-2 flex flex-col gap-1 select-none pointer-events-none">
                              <span className="text-[10px] text-teal-dark font-semibold capitalize leading-none">
                                💡 {inq.service_interest.replace("_", " ")}
                              </span>
                              <div className="flex justify-between items-center text-[10px] text-muted border-t border-border/40 pt-1 mt-0.5">
                                <span>Est. Price:</span>
                                <strong className="text-dark font-serif font-bold text-[11px]">
                                  {getServicePrice(inq.service_interest)}
                                </strong>
                              </div>
                            </div>

                            {/* Nationality / Hotel Details */}
                            {(inq.nationality || inq.current_stay || inq.insurance_info) && (
                              <div className="text-[10.5px] text-muted flex flex-col gap-1 border-t border-dashed border-border/50 pt-2 select-none pointer-events-none">
                                {inq.nationality && <span>🌐 Nationality: <strong className="text-dark font-medium">{inq.nationality}</strong></span>}
                                {inq.current_stay && <span>🏨 Stay: <strong className="text-dark font-medium">{inq.current_stay}</strong></span>}
                                {inq.insurance_info && <span>🛡️ Insurance: <strong className="text-dark font-medium">{inq.insurance_info}</strong></span>}
                              </div>
                            )}

                            {/* Card Footer Actions & Status Tracker */}
                            <div className="flex justify-between items-center mt-1.5 pt-2.5 border-t border-border/40 select-none">
                              <span className={`text-[9.5px] font-bold ${isPending ? "text-red-soft" : "text-teal-dark"} pointer-events-none`}>
                                {responseText}
                              </span>
                              
                              <div className="flex items-center gap-1.5">
                                {/* Status Quick Switcher */}
                                <select
                                  value={inq.status}
                                  onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                                  className="text-[10.5px] font-bold border border-border/80 rounded bg-white px-2 py-1 cursor-pointer outline-none focus:border-teal-brand"
                                >
                                  <option value="new">New</option>
                                  <option value="contacted">Contacted</option>
                                  <option value="booked">Booked</option>
                                  <option value="closed">Closed</option>
                                </select>

                                <button
                                  onClick={() => handleDelete(inq.id)}
                                  className="p-1.5 text-red-500/70 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                  title="Delete Inquiry"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center text-muted/50 text-[11px] py-14 border border-dashed border-border/40 rounded-xl select-none">
                        No cases in this column
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table of Inquiries */
          <div className="bg-white border border-border rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-cream/40 border-b border-border select-none text-[11px] font-bold text-muted uppercase tracking-wider">
                    <th className="p-4.5">Date / Time</th>
                    <th className="p-4.5">Name</th>
                    <th className="p-4.5">Contact Details</th>
                    <th className="p-4.5">Nationality & Stay</th>
                    <th className="p-4.5">Insurance</th>
                    <th className="p-4.5">Channel</th>
                    <th className="p-4.5">Medical Interest</th>
                    <th className="p-4.5">Response Tracking</th>
                    <th className="p-4.5 text-center">Status</th>
                    <th className="p-4.5 text-center">Actions</th>
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
                        whatsapp: "bg-[#E5FBE5] text-[#128C7E]",
                        walk_in: "bg-amber-light text-amber",
                        phone: "bg-red-50 text-red-soft",
                      };

                      const statusBorderColors: Record<string, string> = {
                        new: "border-red-soft/25 bg-red-50/50 text-red-soft",
                        contacted: "border-blue-200 bg-blue-50 text-blue-800",
                        booked: "border-teal-mid/30 bg-teal-light/30 text-teal-dark",
                        closed: "border-black/10 bg-cream text-mid",
                      };

                      // Calculate Response Time snippet for this row
                      let responseInfo = (
                        <span className="text-[11.5px] font-medium text-muted/65 italic select-none">
                          Pending response
                        </span>
                      );

                      if (inq.responded_at) {
                        const diff = new Date(inq.responded_at).getTime() - new Date(inq.created_at).getTime();
                        responseInfo = (
                          <div className="flex flex-col gap-0.5 select-none">
                            <span className="text-[11.5px] text-teal-dark font-semibold">
                              Responded in {formatDuration(diff)}
                            </span>
                            <span className="text-[9.5px] text-muted font-mono leading-none">
                              {new Date(inq.responded_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false })}
                            </span>
                          </div>
                        );
                      } else {
                        // Calculate pending duration
                        const diffPending = new Date().getTime() - new Date(inq.created_at).getTime();
                        responseInfo = (
                          <div className="flex flex-col gap-0.5 select-none">
                            <span className="text-[11.5px] text-red-soft font-semibold">
                              Pending {formatDuration(diffPending)}
                            </span>
                          </div>
                        );
                      }

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
                            <div className="flex flex-col gap-0.5 text-[12px]">
                              {inq.nationality && (
                                <span className="font-semibold text-dark">
                                  🌐 {inq.nationality}
                                </span>
                              )}
                              {inq.current_stay && (
                                <span className="text-muted text-[11.5px]" title="Current stay">
                                  🏨 {inq.current_stay}
                                </span>
                              )}
                              {inq.length_of_stay && (
                                <span className="text-muted text-[10px]" title="Length of stay">
                                  ⏳ {inq.length_of_stay}
                                </span>
                              )}
                              {!inq.nationality && !inq.current_stay && !inq.length_of_stay && (
                                <span className="text-muted/50 italic">-</span>
                              )}
                            </div>
                          </td>
                          <td className="p-4.5 font-medium text-mid">
                            {inq.insurance_info ? (
                              <div className="flex items-center gap-1">
                                <Shield className="w-3.5 h-3.5 text-teal-brand shrink-0" />
                                <span className="truncate max-w-[120px]" title={inq.insurance_info}>{inq.insurance_info}</span>
                              </div>
                            ) : (
                              <span className="text-muted/50 italic">-</span>
                            )}
                          </td>
                          <td className="p-4.5">
                            <span className={`text-[10.5px] font-bold uppercase px-2.5 py-1 rounded-full ${channelColors[inq.channel] || "bg-cream text-mid"}`}>
                              {inq.channel === "web_form" ? "Web Form" : inq.channel}
                            </span>
                          </td>
                          <td className="p-4.5 font-medium capitalize text-teal-dark">{inq.service_interest.replace("_", " ")}</td>
                          <td className="p-4.5 font-medium">{responseInfo}</td>
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
                          <td className="p-4.5 text-center">
                            <button
                              onClick={() => handleDelete(inq.id)}
                              className="p-2 text-red-500/70 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer inline-flex items-center justify-center"
                              title="Delete Inquiry"
                            >
                              <Trash2 className="w-4.5 h-4.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={10} className="p-12 text-center text-muted font-medium select-none">
                        No inquiries match your selected filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Realtime Toast Notification Slide-in */}
      {toast?.show && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-border shadow-2xl rounded-xl p-4 max-w-xs w-72 flex flex-col gap-1.5 border-l-4 border-l-teal-brand select-none transition-all duration-300 animate-pulse">
          <div className="flex justify-between items-center">
            <span className="text-[10.5px] bg-teal-light text-teal-dark px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              New Inquiry
            </span>
            <button
              onClick={() => setToast(null)}
              className="text-muted hover:text-dark font-bold text-xs p-1 cursor-pointer transition-colors"
            >
              ✕
            </button>
          </div>
          <div>
            <h4 className="font-serif text-[13.5px] font-semibold text-dark leading-tight">
              {toast.name}
            </h4>
            <span className="text-[11.5px] text-muted mt-1 block">
              Interested in: <strong className="text-teal-dark capitalize">{toast.service.replace("_", " ")}</strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
