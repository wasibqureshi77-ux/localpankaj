"use client";
import React, { useState } from "react";
import { 
  ShieldAlert, 
  UserCog, 
  Lock, 
  Unlock, 
  CheckSquare, 
  Square,
  ChevronRight,
  ShieldCheck,
  Zap,
  Fingerprint
} from "lucide-react";

export default function RoleManagement() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h1 className="text-6xl font-black text-white tracking-tighter italic">Privilege <span className="text-blue-500">Security.</span></h1>
          <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-[10px] mt-4">System Permission Matrix and Security Tokens.</p>
        </div>
        
        <div className="flex items-center space-x-6">
           <button className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition shadow-2xl shadow-blue-500/20 active:scale-95 flex items-center space-x-3">
              <Zap size={16} />
              <span>Update Global Matrix</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         {/* Role Definition Cards */}
         <RoleCard 
            title="Super Administrator" 
            desc="Global Seed Access. Responsible for core infrastructure, financial reports, and system-wide security protocols."
            color="border-blue-500/30 bg-blue-500/5 text-blue-400"
            perms={["Full CRUD Leads", "Global Theme Engine", "Role Management", "Billing Access", "System Settings"]}
            active
         />
         <RoleCard 
            title="Chief Editor" 
            desc="Content and Visual lead. Manages the Jaipur Studio, media library, and SEO optimization pipelines."
            color="border-indigo-500/30 bg-indigo-500/5 text-indigo-400"
            perms={["Site Structure", "Media Library CRUD", "SEO Module", "Page Content CRUD", "Metadata Control"]}
            active
         />
         <RoleCard 
            title="Operations Manager" 
            desc="Operational efficiency lead. Manages technicians, dispatch queue, and logistics fulfillment."
            color="border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
            perms={["Dispatch Queue", "Technician Assignment", "Leads Viewing", "Customer Support", "Service Logs"]}
            active
         />
         <RoleCard 
            title="Support Specialist" 
            desc="Customer experience and lead qualifying. Focuses on lifecycle management and follow-ups."
            color="border-amber-500/30 bg-amber-500/5 text-amber-400"
            perms={["View Leads", "Status Updates", "Communication Logs", "Customer Database", "Site Preview"]}
            active
         />
      </div>

      {/* Security Protocol Info */}
      <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 text-center space-y-8">
         <div className="w-20 h-20 bg-blue-600/10 border border-blue-500/20 rounded-full flex items-center justify-center mx-auto text-blue-500 animate-pulse">
            <ShieldAlert size={40} />
         </div>
         <div className="max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl font-black text-white tracking-widest uppercase italic">Encryption Standard: Level 4</h3>
            <p className="text-gray-400 font-bold text-xs leading-[1.8] uppercase tracking-widest">
               Local Pankaj utilizes a proprietary high-security token system. All privilege changes are logged by the <span className="text-white italic">Strategic Command Engine</span> and require Super Admin fingerprints.
            </p>
         </div>
      </div>
    </div>
  );
}

function RoleCard({ title, desc, color, perms, active }: any) {
   return (
      <div className={`p-10 rounded-[3rem] border transition-all duration-500 group relative overflow-hidden ${color} hover:bg-white/[0.08]`}>
         {active && (
            <div className={`absolute top-8 right-8 px-4 py-1.5 rounded-full border ${color} text-[8px] font-black tracking-widest uppercase flex items-center space-x-2`}>
               <ShieldCheck size={12} />
               <span>ACTIVE POLICY</span>
            </div>
         )}
         
         <div className="space-y-8 relative z-10">
            <div>
               <h3 className="text-2xl font-black text-white tracking-tight italic mb-4">{title}</h3>
               <p className="text-gray-500 font-bold text-[10px] leading-relaxed uppercase tracking-widest">{desc}</p>
            </div>

            <div className="space-y-4">
               {perms.map((p: string, i: number) => (
                  <div key={i} className="flex items-center space-x-4 text-white/40 group-hover:text-white transition-colors">
                     <div className="p-1 rounded bg-white/5 border border-white/10"><CheckSquare size={14} /></div>
                     <span className="text-[10px] font-black uppercase tracking-widest">{p}</span>
                  </div>
               ))}
            </div>

            <button className="w-full py-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white hover:text-black transition-all font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center space-x-3">
               <Fingerprint size={16} />
               <span>Modify Permissions</span>
            </button>
         </div>
      </div>
   );
}
