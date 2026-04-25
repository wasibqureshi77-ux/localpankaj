"use client";
import React, { useState, useEffect } from "react";
import { 
  CheckCircle2, 
  Clock, 
  Package, 
  Plus,
  Loader2,
  Calendar,
  ArrowRight
} from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { BookingCard } from "@/components/dashboard/BookingCard";
import { SupportCard } from "@/components/dashboard/SupportCard";
import { EmptyState } from "@/components/dashboard/EmptyState";

export default function UserDashboard() {
  const { data: session }: any = useSession();
  const [data, setData] = useState<any>({ leads: [], stats: { total: 0, unassigned: 0, converted: 0, completed: 0 } });
  const [loading, setLoading] = useState(true);

  const fetchDashboardData = async () => {
    if (!session?.user?.email && !session?.user?.phone) return;
    try {
      const { data: leadData } = await axios.get(`/api/leads?email=${session.user.email || ""}&phone=${session.user.phone || ""}`);
      setData(leadData);
    } catch (err) {
      console.error("Dashboard sync failure:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) fetchDashboardData();
  }, [session]);

  const activeLeads = data.leads.filter((l: any) => l.status !== "COMPLETED").slice(0, 3);
  const firstName = session?.user?.name?.split(" ")[0] || "Member";

  if (loading) {
     return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
           <div className="relative">
              <div className="absolute inset-0 bg-[#155dfc] rounded-full blur-2xl opacity-10 animate-pulse" />
              <Loader2 className="animate-spin text-[#155dfc] relative z-10" size={40} strokeWidth={1.5} />
           </div>
           <div className="text-center">
              <p className="text-sm font-bold text-gray-900 tracking-tight">Syncing your dashboard...</p>
              <p className="text-xs font-medium text-gray-400 mt-1">Fetching your latest service updates</p>
           </div>
        </div>
     );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">
            Namaste, {firstName}!
          </h1>
          <p className="text-sm font-medium text-gray-500 mt-1 max-w-md">
            {activeLeads.length > 0 
              ? `You have ${activeLeads.length} active service units currently in progress.`
              : "Your service queue is clear. Need professional help around the house?"}
          </p>
        </div>
        <Link 
          href="/" 
          className="inline-flex h-12 items-center px-6 bg-[#155dfc] text-white rounded-xl text-xs font-black tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/10 active:scale-95 group"
        >
          <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform" />
          <span>NEW BOOKING</span>
        </Link>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
         <StatsCard 
           label="Total Requests" 
           value={data.stats.total} 
           icon={Package} 
         />
         <StatsCard 
           label="In Progress" 
           value={data.stats.unassigned + data.stats.converted} 
           icon={Clock} 
         />
         <StatsCard 
           label="Completed" 
           value={data.stats.completed} 
           icon={CheckCircle2} 
         />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Recent Operations */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-5">
            <h2 className="text-lg font-bold text-gray-900">Active Bookings</h2>
            {data.leads.length > 3 && (
               <Link href="/dashboard/bookings" className="text-xs font-bold text-[#155dfc] hover:underline flex items-center gap-1 group">
                  View Repository
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            )}
          </div>
          
          <div className="space-y-4">
            {activeLeads.length > 0 ? (
               activeLeads.map((lead: any) => (
                 <BookingCard 
                    key={lead._id}
                    booking={lead}
                 />
               ))
            ) : (
               <EmptyState 
                  icon={Package}
                  title="No Active Bookings"
                  description="You don't have any services scheduled right now. Our experts are just a click away."
                  action={{ label: "EXPLORE SERVICES", href: "/" }}
               />
            )}
          </div>
        </div>

        {/* Support Section */}
        <div className="lg:col-span-1">
           <SupportCard />
        </div>
      </div>
    </div>
  );
}


