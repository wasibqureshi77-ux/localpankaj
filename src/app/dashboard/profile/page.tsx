"use client";
import React, { useState, useEffect } from "react";
import { 
  Camera,
  Loader2,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { ProfileCard } from "@/components/dashboard/ProfileCard";
import { PasswordChangeCard } from "@/components/dashboard/PasswordChangeCard";

export default function ProfilePage() {
  const { data: session }: any = useSession();
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProfileData = async () => {
    if (!session?.user?.email && !session?.user?.phone) return;
    try {
      const { data } = await axios.get(`/api/leads?email=${session.user.email || ""}&phone=${session.user.phone || ""}`);
      setLeads(data.leads || []);
    } catch (err) {
      console.error("Profile sync failure");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) fetchProfileData();
  }, [session]);

  const initials = session?.user?.name
    ? session.user.name.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const firstLeadAddress = leads.length > 0 ? leads[0].address : "";

  if (loading && !session) {
    return (
       <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
          <Loader2 className="animate-spin text-[#155dfc]" size={40} strokeWidth={1.5} />
          <p className="text-sm font-bold text-gray-900 tracking-tight">Loading your profile...</p>
       </div>
    );
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Profile Settings</h1>
        <p className="text-sm font-medium text-gray-500 mt-1">Manage your identity and security credentials.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left: Avatar and Identity Card */}
        <div className="lg:col-span-4 space-y-8">
           <div className="bg-white p-10 rounded-[32px] border border-gray-100 shadow-sm text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="relative w-40 h-40 mx-auto mb-8 group/avatar">
                 <div className="w-full h-full bg-gradient-to-tr from-[#155dfc] to-blue-400 rounded-full p-1 shadow-xl">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-5xl font-black text-[#155dfc]">
                       {initials}
                    </div>
                 </div>
                 <button className="absolute bottom-1 right-1 p-3 bg-gray-950 text-white rounded-xl border-4 border-white shadow-lg hover:bg-[#155dfc] transition-all active:scale-90">
                    <Camera size={18} />
                 </button>
              </div>

              <h2 className="text-xl font-bold text-gray-900 leading-tight mb-1">{session?.user?.name || "Member"}</h2>
              <div className="flex items-center justify-center gap-1.5 text-emerald-600 font-bold text-[10px] tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100 w-max mx-auto uppercase">
                 <ShieldCheck size={12} />
                 <span>Verified Account</span>
              </div>
              
              <div className="mt-10 pt-8 border-t border-gray-50 grid grid-cols-2 gap-4 text-center">
                 <div>
                    <p className="text-xl font-black text-gray-900 leading-none mb-1">{leads.length}</p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Total Bookings</p>
                 </div>
                 <div>
                    <p className="text-xl font-black text-gray-900 leading-none mb-1">
                       {leads.filter(l => l.status === "COMPLETED").length}
                    </p>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Successful</p>
                 </div>
              </div>
           </div>

           {/* Quick Tips or Meta */}
           <div className="bg-blue-600 text-white p-8 rounded-[32px] shadow-xl shadow-blue-600/10 relative overflow-hidden">
              <CheckCircle2 size={60} className="absolute -bottom-4 -right-4 text-white/10 rotate-12" />
              <p className="text-xs font-bold uppercase tracking-widest text-blue-100 mb-2">Service Grid</p>
              <h4 className="text-lg font-bold mb-4 tracking-tight">Your data is secured with AES-256 encryption.</h4>
              <p className="text-sm font-medium text-blue-50/80 leading-relaxed">
                 We take your privacy seriously. Your details are only shared with assigned technicians during active service.
              </p>
           </div>
        </div>

        {/* Right: Detailed Info and Security */}
        <div className="lg:col-span-8 space-y-8">
           <ProfileCard user={session?.user} address={firstLeadAddress} />
           <PasswordChangeCard />
        </div>

      </div>
    </div>
  );
}


