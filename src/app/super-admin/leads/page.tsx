"use client";
import React, { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Calendar,
  MessageSquare,
  Phone,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  User,
  Zap,
  Tag,
  X,
  Loader2,
  UserCheck,
  ShieldCheck
} from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import LeadDetailsModal from "@/components/LeadDetailsModal";

export default function LeadsDashboard() {
  const [data, setData] = useState<any>({ leads: [], stats: { total: 0, unassigned: 0, converted: 0, completed: 0 } });
  const [loading, setLoading] = useState(true);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const fetchLeads = async () => {
    try {
      const { data: leadData } = await axios.get("/api/leads");
      setData(leadData);
    } catch (err) {
      toast.error("Failed to load Leads Pipeline");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
      {/* Metrics Header */}
      <MetricCardGrid stats={data.stats} />

      <div className="bg-white rounded-[3rem] border border-indigo-50 shadow-2xl shadow-indigo-500/5 overflow-hidden">
         <div className="p-10 border-b border-indigo-50 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
               <h1 className="text-4xl font-black text-indigo-950 tracking-tighter flex items-center space-x-4 italic">
                  <span>Jaipur <span className="text-indigo-600">Command.</span></span>
               </h1>
               <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mt-2">Leads and Prospect Lifecycle Engine</p>
            </div>

            <div className="flex items-center space-x-4">
               <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-300" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search prospect..." 
                    className="pl-12 pr-6 py-4 rounded-2xl bg-indigo-50/50 border border-transparent focus:bg-white focus:border-indigo-100 outline-none transition-all font-bold text-xs w-64 uppercase tracking-[0.2em] shadow-inner"
                  />
               </div>
               <button className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl hover:bg-indigo-600 hover:text-white transition shadow-sm active:scale-95"><Filter size={20}/></button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-indigo-50/30 text-[10px] uppercase tracking-[0.3em] font-black text-indigo-400/80">
                     <th className="px-10 py-6">Customer Profile</th>
                     <th className="px-10 py-6">Inquiry Point</th>
                     <th className="px-10 py-6">Chronology</th>
                     <th className="px-10 py-6">Lifecycle</th>
                     <th className="px-10 py-6">Strategy</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-indigo-50/50">
                  {loading ? (
                    <tr><td colSpan={5} className="p-20 text-center text-blue-300 animate-pulse font-black text-xs uppercase tracking-widest">Hydrating Jaipur Lead Stream...</td></tr>
                  ) : data.leads.length > 0 ? (
                    data.leads.map((lead: any) => (
                      <LeadStub 
                        key={lead._id} 
                        lead={lead}
                        onView={() => setSelectedLead(lead)}
                        time={new Date(lead.createdAt).toLocaleString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      />
                    ))
                  ) : (
                    <tr><td colSpan={5} className="p-20 text-center text-blue-900 font-bold text-xs uppercase italic tracking-widest">No leads captured yet from Jaipur.</td></tr>
                  )}
               </tbody>
            </table>
         </div>
         
         <div className="p-8 bg-indigo-50/20 border-t border-indigo-50 flex items-center justify-between">
            <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Showing {data.leads.length} of {data.stats.total} Lead Records</div>
            <div className="flex items-center space-x-2">
               <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-[10px] uppercase tracking-[0.3em] shadow-lg shadow-indigo-600/20 active:scale-95 transition">Export Manifest</button>
            </div>
         </div>
      </div>

      {selectedLead && (
         <LeadDetailsModal 
           lead={selectedLead} 
           onClose={() => setSelectedLead(null)} 
           onRefresh={fetchLeads}
         />
      )}
    </div>
  );
}

function LeadStub({ lead, onView, time }: any) {
   const statusStyles: any = {
      UNASSIGNED: "bg-amber-50 text-amber-600 border-amber-100",
      FOLLOWING: "bg-indigo-50 text-indigo-600 border-indigo-100",
      CONVERTED: "bg-emerald-50 text-emerald-600 border-emerald-100",
      COMPLETED: "bg-blue-50 text-blue-600 border-blue-100",
   };

   return (
      <tr 
        onClick={onView}
        className="hover:bg-indigo-50/30 transition-colors group cursor-pointer"
      >
         <td className="px-10 py-8">
            <div className="flex items-center space-x-4">
               <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center font-extrabold text-lg transition-transform group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-12 duration-500">
                  {lead.name[0]}
               </div>
               <div>
                  <div className="text-sm font-black text-indigo-950 tracking-tight">{lead.name}</div>
                  <div className="text-[10px] font-bold text-indigo-400 mt-0.5 font-sans">{lead.phone}</div>
               </div>
            </div>
         </td>
         <td className="px-10 py-8">
            <span className="text-[10px] font-black text-indigo-900 uppercase tracking-[0.2em]">{lead.service}</span>
         </td>
         <td className="px-10 py-8 text-[11px] font-extrabold text-blue-900 uppercase tracking-widest whitespace-nowrap">{time}</td>
         <td className="px-10 py-8">
            <span className={`px-4 py-2 border rounded-xl text-[9px] font-black tracking-widest uppercase inline-block min-w-[100px] text-center ${statusStyles[lead.status]}`}>
               {lead.status}
            </span>
         </td>
         <td className="px-10 py-8">
            <div className="flex items-center space-x-3">
               <button className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition shadow-sm"><Phone size={16}/></button>
               <button className="p-3 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-600 hover:text-white transition shadow-sm"><MessageSquare size={16}/></button>
            </div>
         </td>
      </tr>
   );
}

function MetricCardGrid({ stats }: any) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
       <MetricCard icon={<Zap size={24}/>} title="Total Leads" val={stats.total} trend="Live Stream" color="indigo" />
       <MetricCard icon={<Clock size={24}/>} title="Unassigned" val={stats.unassigned} trend="Requires Action" color="amber" />
       <MetricCard icon={<CheckCircle2 size={24}/>} title="Converted" val={stats.converted} trend="Global Wins" color="emerald" />
       <MetricCard icon={<CheckCircle2 size={24}/>} title="Completed" val={stats.completed} trend="Project Closure" color="pink" />
    </div>
  );
}

const metricColors: any = {
      indigo: "bg-blue-600 text-white shadow-xl shadow-blue-600/20",
      amber: "bg-white border-amber-100 text-amber-600 shadow-xl shadow-gray-200/50",
      emerald: "bg-white border-emerald-100 text-emerald-600 shadow-xl shadow-gray-200/50",
      pink: "bg-white border-pink-100 text-pink-600 shadow-xl shadow-gray-200/50"
   };

function MetricCard({ icon, title, val, trend, color }: any) {
   return (
      <div className={`p-10 rounded-[2.5rem] border transition-all duration-500 hover:-translate-y-2 ${metricColors[color]} group`}>
         <div className={`p-4 rounded-2xl w-fit shadow-inner ${color === 'indigo' ? 'bg-blue-500' : 'bg-gray-50'}`}>
            <div className={`${color === 'indigo' ? 'text-white' : ''}`}>{icon}</div>
         </div>
         <div className="mt-6">
            <div className="text-5xl font-black italic tracking-tighter mb-1">{val}</div>
            <div className={`text-[10px] font-black uppercase tracking-[0.2em] ${color === 'indigo' ? 'text-blue-100' : 'text-gray-400'}`}>{title}</div>
         </div>
         <div className={`mt-6 pt-6 border-t ${color === 'indigo' ? 'border-white/10' : 'border-gray-100'}`}>
            <div className={`text-[9px] font-black uppercase tracking-[0.3em] ${color === 'indigo' ? 'text-white' : 'text-gray-900'}`}>{trend}</div>
         </div>
      </div>
   );
}
