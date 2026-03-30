"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Plus, 
  Trash2, 
  UserPlus, 
  Phone, 
  Mail, 
  Zap, 
  Settings, 
  Loader2,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function TechniciansPage() {
  const [technicians, setTechnicians] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    specialties: [] as string[],
    status: "ACTIVE"
  });

  const specialtiesOptions = [
    "Electrician",
    "AC Repair",
    "Plumber",
    "Appliances",
    "Carpenter",
    "Painter",
    "Cleaning"
  ];

  const toggleSpecialty = (spec: string) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(spec)
        ? prev.specialties.filter(s => s !== spec)
        : [...prev.specialties, spec]
    }));
  };

  const fetchTechnicians = async () => {
    try {
      const { data } = await axios.get("/api/technicians");
      setTechnicians(data);
    } catch (err) {
      toast.error("Failed to load technicians");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTechnicians();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.specialties.length === 0) {
      toast.error("Please select at least one specialty");
      return;
    }
    try {
      await axios.post("/api/technicians", formData);
      toast.success("Technician added successfully");
      setIsAdding(false);
      setFormData({ name: "", phone: "", email: "", specialties: [], status: "ACTIVE" });
      fetchTechnicians();
    } catch (err) {
      toast.error("Failed to add technician");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to remove this technician?")) return;
    try {
      await axios.delete("/api/technicians", { data: { id } });
      toast.success("Technician removed");
      fetchTechnicians();
    } catch (err) {
      toast.error("Failed to remove technician");
    }
  };

  const toggleStatus = async (tech: any) => {
      const nextStatus = tech.status === "ACTIVE" ? "BUSY" : tech.status === "BUSY" ? "OFFLINE" : "ACTIVE";
      try {
          await axios.patch("/api/technicians", { id: tech._id, status: nextStatus });
          fetchTechnicians();
      } catch (err) {
          toast.error("Failed to update status");
      }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-in fade-in duration-700 font-sans">
      <div className="flex items-center justify-between pb-6 border-b border-blue-50">
         <div>
            <h1 className="text-4xl font-black text-blue-600 uppercase tracking-[0.4em] italic drop-shadow-sm">Technicians</h1>
            <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.5em] mt-3 italic">Professional Field Force Management Hub</p>
         </div>
         <button 
            onClick={() => setIsAdding(!isAdding)}
            className="flex items-center space-x-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl shadow-blue-600/30 active:scale-95 transition-all hover:bg-black"
         >
            {isAdding ? <Settings size={20} className="animate-spin-slow" /> : <UserPlus size={20} />}
            <span>{isAdding ? "Abort Deployment" : "Register New Unit"}</span>
         </button>
      </div>

      {isAdding && (
         <div className="bg-white border border-blue-50 p-12 rounded-[3rem] shadow-2xl shadow-blue-900/5 animate-in slide-in-from-top-6 duration-700">
            <form onSubmit={handleSubmit} className="space-y-12">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-blue-900 uppercase tracking-[0.3em] ml-1">Personnel Full Name</label>
                     <input 
                       required
                       type="text" 
                       placeholder="e.g. Rahul Sharma"
                       className="w-full bg-blue-50 border border-transparent rounded-2xl px-8 py-5 text-sm font-black text-black outline-none focus:bg-white focus:border-blue-600 focus:shadow-xl transition-all"
                       value={formData.name}
                       onChange={(e) => setFormData({...formData, name: e.target.value})}
                     />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-blue-900 uppercase tracking-[0.3em] ml-1">Mobile Vector</label>
                     <input 
                       required
                       type="text" 
                       placeholder="+91 XXXXX XXXXX"
                       className="w-full bg-blue-50 border border-transparent rounded-2xl px-8 py-5 text-sm font-black text-black outline-none focus:bg-white focus:border-blue-600 focus:shadow-xl transition-all font-sans"
                       value={formData.phone}
                       onChange={(e) => setFormData({...formData, phone: e.target.value})}
                     />
                  </div>
                  <div className="space-y-3">
                     <label className="text-[10px] font-black text-blue-900 uppercase tracking-[0.3em] ml-1">Communication Email</label>
                     <input 
                       type="email" 
                       placeholder="rahul@localpankaj.com"
                       className="w-full bg-blue-50 border border-transparent rounded-2xl px-8 py-5 text-sm font-black text-black outline-none focus:bg-white focus:border-blue-600 focus:shadow-xl transition-all"
                       value={formData.email}
                       onChange={(e) => setFormData({...formData, email: e.target.value})}
                     />
                  </div>
               </div>

               <div className="space-y-6">
                  <label className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] block">Expertise Manifest (Select All That Apply)</label>
                  <div className="flex flex-wrap gap-4">
                     {specialtiesOptions.map(spec => (
                        <button
                           key={spec}
                           type="button"
                           onClick={() => toggleSpecialty(spec)}
                           className={`px-8 py-4 rounded-xl border text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 transform ${
                              formData.specialties.includes(spec)
                                 ? "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-600/30 scale-105"
                                 : "bg-blue-50 border-transparent text-blue-900 hover:bg-white hover:border-blue-100 hover:shadow-lg"
                           }`}
                        >
                           {spec}
                        </button>
                     ))}
                  </div>
               </div>

               <div className="flex justify-end pt-6">
                  <button type="submit" className="px-16 py-6 bg-blue-950 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.5em] hover:bg-black transition-all duration-500 shadow-2xl active:scale-95 italic">Initialize Unit</button>
               </div>
            </form>
         </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
         {loading ? (
            <div className="col-span-full py-32 flex flex-col items-center justify-center space-y-6">
               <Loader2 className="animate-spin text-blue-600" size={60} />
               <p className="text-[11px] font-black text-blue-900 uppercase tracking-[0.6em] italic animate-pulse">Syncing Technical Manifest...</p>
            </div>
         ) : technicians.length > 0 ? (
            technicians.map((tech) => (
               <div key={tech._id} className="bg-white border border-blue-50 p-10 rounded-[3rem] relative group hover:border-blue-200 transition-all duration-700 shadow-2xl shadow-blue-900/5 hover:-translate-y-2">
                  <div className="flex items-center justify-between mb-8">
                     <div className="p-5 bg-blue-50 text-blue-600 rounded-2xl shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all duration-500"><Zap size={24} /></div>
                     <div className="flex items-center space-x-3">
                        <StatusBadge status={tech.status} onClick={() => toggleStatus(tech)} />
                        <button 
                           onClick={() => handleDelete(tech._id)}
                           className="p-4 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all opacity-0 group-hover:opacity-100 shadow-sm"
                        >
                           <Trash2 size={18} />
                        </button>
                     </div>
                  </div>
                  
                  <div className="space-y-2">
                     <h3 className="text-2xl font-black text-black italic tracking-tighter uppercase">{tech.name}</h3>
                     <div className="flex flex-wrap gap-2 mt-2">
                        {tech.specialties && tech.specialties.length > 0 ? tech.specialties.map((s: string) => (
                           <span key={s} className="text-[9px] font-black text-blue-600 uppercase tracking-widest bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100/50 shadow-sm">{s}</span>
                        )) : (
                           <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest italic">General Operations Specialist</span>
                        )}
                     </div>
                  </div>

                  <div className="mt-10 pt-8 border-t border-blue-50 space-y-6">
                     <div className="flex items-center space-x-5 text-blue-900">
                        <div className="p-2 bg-blue-50 rounded-lg"><Phone size={16} className="text-blue-600" /></div>
                        <span className="text-sm font-black tabular-nums tracking-widest">{tech.phone}</span>
                     </div>
                     <div className="flex items-center space-x-5 text-blue-900">
                        <div className="p-2 bg-blue-50 rounded-lg"><Mail size={16} className="text-blue-600" /></div>
                        <span className="text-sm font-black tracking-tight underline decoration-blue-200">{tech.email || "NO-IDENTITY-LOGGED"}</span>
                     </div>
                  </div>

                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity pointer-events-none">
                     <UserPlus size={180} className="text-blue-900" />
                  </div>
               </div>
            ))
         ) : (
            <div className="col-span-full py-40 text-center bg-blue-50/50 rounded-[4rem] border-4 border-dashed border-blue-100 shadow-inner">
               <p className="text-[12px] font-black text-blue-300 uppercase tracking-[0.8em] italic">No active technical units detected in command registry.</p>
            </div>
         )}
      </div>
    </div>
  );
}

function StatusBadge({ status, onClick }: any) {
   const styles: any = {
      ACTIVE: "bg-emerald-50 text-emerald-600 border-emerald-100",
      BUSY: "bg-amber-50 text-amber-600 border-amber-100",
      OFFLINE: "bg-blue-50 text-blue-300 border-blue-100"
   };
   const icons: any = {
      ACTIVE: <CheckCircle size={10} />,
      BUSY: <Clock size={10} />,
      OFFLINE: <XCircle size={10} />
   };

   return (
      <button 
         onClick={onClick}
         className={`px-4 py-2 rounded-xl border text-[9px] font-black tracking-[0.2em] uppercase flex items-center space-x-2 transition-all hover:shadow-md hover:-translate-y-0.5 active:scale-95 shadow-sm ${styles[status]}`}
      >
         {icons[status]}
         <span>{status}</span>
      </button>
   );
}
