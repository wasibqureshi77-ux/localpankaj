"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  PhoneCall, 
  CheckCircle, 
  AlertTriangle, 
  ArrowUpRight,
  UserCheck,
  Zap,
  PackageCheck,
  TrendingUp,
  Loader2
} from "lucide-react";
import LeadDetailsModal from "@/components/LeadDetailsModal";

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const fetchStats = async () => {
    try {
      const { data: stats } = await axios.get("/api/admin/stats");
      setData(stats);
    } catch (err) {
      console.error("Failed to fetch dashboard stats");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
     return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
           <Loader2 className="animate-spin text-blue-600" size={60} />
           <div className="text-[10px] font-black text-blue-600 uppercase tracking-widest italic">Initialising Core Engine...</div>
        </div>
     );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in slide-in-from-bottom-10 duration-1000 font-sans">
      <div className="pt-0">
         <h1 className="text-4xl font-black text-blue-600 uppercase tracking-[0.4em] italic drop-shadow-sm">Executive Dashboard</h1>
         <p className="text-[10px] font-black text-blue-400 mt-3 tracking-[0.6em] uppercase">Operational Oversight Module</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-20">
         <AdminStat icon={<PhoneCall size={24}/>} label="NEW LEADS" value={data?.leads || "0"} delta="+12%" color="blue" />
         <AdminStat icon={<PackageCheck size={24}/>} label="APPOINTMENTS" value={data?.appointments || "0"} delta="+4.2%" color="blue" />
         <AdminStat icon={<CheckCircle size={24}/>} label="CONVERSIONS" value={data?.conversions || "0"} delta="+18.5%" color="blue" />
         <AdminStat icon={<AlertTriangle size={24}/>} label="FAILURES" value={data?.failures || "0"} delta="-2.1%" color="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
         {/* Live Pipeline View */}
         <div className="lg:col-span-2 space-y-10 animate-in slide-in-from-left-6 duration-1000 delay-300">
            <div className="flex items-center justify-between mb-4">
               <h3 className="text-2xl font-black text-black tracking-tighter flex items-center space-x-4 italic">
                  <span className="p-3 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-600/20"><TrendingUp size={24}/></span>
                  <span>LIVE LEAD PIPELINE</span>
               </h3>
               <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-black transition-colors underline decoration-blue-600/30">Explore All Leads</button>
            </div>

            <div className="overflow-hidden rounded-[2.5rem] border border-blue-100 bg-white shadow-2xl shadow-blue-900/5">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-blue-50/50">
                        <th className="px-10 py-7 text-[9px] font-black text-blue-900 tracking-[0.2em] uppercase">CLIENT IDENTITY</th>
                        <th className="px-10 py-7 text-[9px] font-black text-blue-900 tracking-[0.2em] uppercase">SERVICE UNIT</th>
                        <th className="px-10 py-7 text-[9px] font-black text-blue-900 tracking-[0.2em] uppercase">STATUS INDICATOR</th>
                        <th className="px-10 py-7 text-[9px] font-black text-blue-900 tracking-[0.2em] uppercase text-right">STRATEGY</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-blue-50">
                     {data?.recentLeads?.length > 0 ? (
                        data.recentLeads.map((lead: any) => (
                           <LeadRow key={lead._id} lead={lead} onView={() => setSelectedLead(lead)} />
                        ))
                     ) : (
                        <tr>
                           <td colSpan={4} className="px-10 py-16 text-center text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] italic">No active telemetry data detected.</td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Technician Availability */}
         <div className="lg:col-span-1 space-y-10 animate-in slide-in-from-right-6 duration-1000 delay-500">
             <h3 className="text-2xl font-black text-black tracking-tighter flex items-center space-x-4 italic">
                <span className="p-3 bg-blue-900 text-white rounded-2xl shadow-xl shadow-blue-900/20"><UserCheck size={24}/></span>
                <span>UNIT OPERATORS</span>
             </h3>
             <div className="space-y-6">
                  {data?.technicians?.length > 0 ? (
                     data.technicians.map((tech: any, idx: number) => (
                        <TechCard key={idx} name={tech.name} type={tech.type} status={tech.status} />
                     ))
                  ) : (
                     <div className="p-10 text-center bg-blue-50/50 border border-blue-100 rounded-[2.5rem] text-blue-400 font-extrabold uppercase tracking-widest text-[9px] italic">No deployed units found.</div>
                  )}
             </div>
             
             <button className="w-full py-6 bg-blue-900 text-white border border-transparent rounded-[2rem] font-black text-[10px] tracking-[0.5em] uppercase hover:bg-black transition-all duration-500 shadow-2xl shadow-blue-900/30 active:scale-95">
                DEPLOY ALL UNITS
             </button>
         </div>
      </div>

      {selectedLead && (
         <LeadDetailsModal 
           lead={selectedLead} 
           onClose={() => setSelectedLead(null)} 
           onRefresh={fetchStats}
         />
      )}
    </div>
  );
}

function AdminStat({ icon, label, value, delta, color }: any) {
  return (
    <div className="p-10 rounded-[3rem] bg-white border border-blue-50 shadow-2xl shadow-blue-900/5 relative group hover:border-blue-200 transition-all duration-500 transform hover:-translate-y-2">
       <div className="p-4 rounded-2xl bg-blue-50 text-blue-600 border border-blue-100 w-fit mb-8 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">{icon}</div>
       <div className="text-6xl font-black text-black tabular-nums tracking-tighter mb-4 italic leading-tight">{value}</div>
       <div className="flex items-center justify-between">
          <div className="text-[10px] font-black text-blue-900 tracking-[0.3em] uppercase">{label}</div>
          <div className={`text-[10px] font-black px-3 py-1.5 rounded-xl shadow-sm ${delta.startsWith('+') ? 'text-emerald-600 bg-emerald-50 border border-emerald-100' : 'text-rose-600 bg-rose-50 border border-rose-100'}`}>
             {delta}
          </div>
       </div>
    </div>
  );
}

function LeadRow({ lead, onView }: any) {
   const statusMap: any = {
      NEW: "text-blue-600 bg-blue-50 border-blue-100",
      CONTACTED: "text-amber-600 bg-amber-50 border-amber-100",
      CONVERTED: "text-emerald-600 bg-emerald-50 border-emerald-100",
      QUALIFIED: "text-indigo-600 bg-indigo-50 border-indigo-100",
      ARCHIVED: "text-blue-900 bg-blue-50 border-blue-200",
      COMPLETED: "text-blue-900 bg-blue-100 border-blue-200",
   };
   return (
      <tr 
        onClick={onView}
        className="group hover:bg-blue-50/30 transition-colors cursor-pointer"
      >
         <td className="px-10 py-9">
            <div className="font-black text-black text-lg tracking-tight mb-1 uppercase italic">{lead.name}</div>
            <div className="text-[10px] font-black text-blue-400 tracking-[0.2em] uppercase font-sans">{lead.phone}</div>
         </td>
         <td className="px-10 py-9 font-black text-[11px] text-blue-800 tracking-[0.3em] uppercase italic">{lead.serviceType || "GENERAL REPAIR"}</td>
         <td className="px-10 py-9">
            <span className={`px-5 py-2.5 rounded-xl text-[9px] font-black tracking-widest border shadow-sm inline-block min-w-[110px] text-center ${statusMap[lead.status] || statusMap["NEW"]}`}>
               {lead.status || "NEW"}
            </span>
         </td>
         <td className="px-10 py-9 text-right font-black italic">
            <button className="text-blue-600 font-black text-[10px] tracking-widest uppercase hover:text-black transition-colors underline decoration-blue-200">View Details</button>
         </td>
      </tr>
   );
}

function TechCard({ name, type, status }: any) {
   const statusMap: any = {
      ACTIVE: "bg-emerald-500",
      BUSY: "bg-amber-500",
      OFFLINE: "bg-blue-200",
   };
   return (
      <div className="p-8 bg-white border border-blue-50 rounded-[3rem] flex items-center justify-between group hover:bg-blue-50 hover:border-blue-100 transition-all cursor-pointer shadow-xl shadow-blue-900/5">
         <div className="flex items-center space-x-6">
            <div className="relative">
               <div className="w-14 h-14 bg-blue-950 rounded-2xl flex items-center justify-center font-black text-white text-xl uppercase shadow-lg group-hover:rotate-12 transition-transform">
                  {name ? name[0] : "O"}
               </div>
               <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-4 border-white ${statusMap[status] || statusMap["OFFLINE"]} shadow-sm`} />
            </div>
            <div>
               <div className="font-black text-black text-sm uppercase italic mb-1">{name}</div>
               <div className="text-[9px] font-black text-blue-600 uppercase tracking-[0.4em]">{type}</div>
            </div>
         </div>
         <div className="opacity-0 group-hover:opacity-100 transition-all transform translate-x-4 group-hover:translate-x-0 text-blue-600">
             <ArrowUpRight size={24} />
         </div>
      </div>
   );
}
