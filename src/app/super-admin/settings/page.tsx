"use client";
import React, { useState } from "react";
import { 
  Settings2, 
  Database, 
  Cpu, 
  Globe, 
  Cloud, 
  BellRing, 
  ShieldCheck,
  Zap,
  RefreshCw,
  HardDrive
} from "lucide-react";

export default function SystemSettings() {
  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h1 className="text-6xl font-black text-white tracking-tighter italic text-shadow-lg">Core <span className="text-blue-500">Engine.</span></h1>
          <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-[10px] mt-4">Platform Hyperparameter and Global Configuration.</p>
        </div>
        
        <div className="flex items-center space-x-6">
           <button className="px-10 py-5 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest transition shadow-2xl hover:bg-gray-100 transform active:scale-95 flex items-center space-x-3">
              <RefreshCw size={16} />
              <span>Hard Reboot System</span>
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
         {/* Server Infrastructure */}
         <div className="lg:col-span-2 space-y-10">
            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 space-y-12">
               <h3 className="text-xl font-black text-white tracking-widest uppercase italic flex items-center space-x-4">
                  <Database size={24} className="text-blue-500" />
                  <span>Infrastructure Grid</span>
               </h3>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <SettingItem icon={<Globe size={18}/>} label="Public Domain" val="localpankaj.com" status="ACTIVE" color="text-emerald-500" />
                  <SettingItem icon={<Database size={18}/>} label="Database Stream" val="MongoDB Atlas Cluster" status="SYNCED" color="text-blue-500" />
                  <SettingItem icon={<Cloud size={18}/>} label="Media Storage" val="Cloudinary CDN" status="CONNECTED" color="text-indigo-500" />
                  <SettingItem icon={<Cpu size={18}/>} label="Runtime Env" val="Node.js 20 / Next.js 15" status="STABLE" color="text-amber-500" />
               </div>

               <div className="pt-10 border-t border-white/5">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-8">System Optimization</h4>
                  <div className="space-y-6">
                     <ProgressItem label="CPU Cache Load" perc={12} color="bg-emerald-500" />
                     <ProgressItem label="Query latency (avg)" perc={4} color="bg-blue-500" />
                     <ProgressItem label="Resource Utilization" perc={42} color="bg-indigo-500" />
                  </div>
               </div>
            </div>
         </div>

         {/* Configuration Sidebar */}
         <div className="space-y-8">
            <div className="bg-blue-600 rounded-[3rem] p-12 text-white shadow-2xl shadow-blue-500/30">
               <div className="p-4 bg-white/20 rounded-2xl w-fit mb-8"><Zap size={24}/></div>
               <h3 className="text-2xl font-black italic tracking-tight mb-4 leading-tight">Global Service Status</h3>
               <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 leading-relaxed mb-8">All core systems are operational across Jaipur availability zones. No latency detected in lead streams.</p>
               <div className="flex items-center space-x-3 text-[10px] font-black uppercase tracking-widest">
                  <div className="w-3 h-3 bg-white rounded-full animate-ping" />
                  <span>Live Heartbeat: 24ms</span>
               </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[3rem] p-12 space-y-10">
               <h4 className="text-sm font-black text-white tracking-widest uppercase italic">Alert Center</h4>
               <div className="space-y-6 text-[10px] font-black tracking-widest uppercase">
                  <div className="flex items-center space-x-4 text-emerald-400">
                     <ShieldCheck size={18} />
                     <span>SSL Certificate Secure</span>
                  </div>
                  <div className="flex items-center space-x-4 text-blue-400">
                     <BellRing size={18} />
                     <span>No Pending Alerts</span>
                  </div>
                  <div className="flex items-center space-x-4 text-indigo-400">
                     <HardDrive size={18} />
                     <span>Backups: Automated Daily</span>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function SettingItem({ icon, label, val, status, color }: any) {
   return (
      <div className="p-8 rounded-3xl bg-white/5 border border-white/5 group hover:bg-white/[0.08] transition-all">
         <div className="flex items-center space-x-4 mb-6">
            <div className={`p-2.5 rounded-xl bg-white/5 ${color}`}>{icon}</div>
            <span className="text-[10px] font-black text-white uppercase tracking-widest">{label}</span>
         </div>
         <div className="text-lg font-bold text-gray-400 mb-4 font-mono">{val}</div>
         <div className={`text-[8px] font-black tracking-widest uppercase px-3 py-1 bg-white/5 rounded-lg border border-white/10 w-fit ${color}`}>{status}</div>
      </div>
   );
}

function ProgressItem({ label, perc, color }: any) {
   return (
      <div className="space-y-3">
         <div className="flex justify-between items-center text-[10px] font-black tracking-widest uppercase">
            <span className="text-gray-400">{label}</span>
            <span className="text-white">{perc}%</span>
         </div>
         <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div className={`h-full ${color} transition-all duration-1000 shadow-[0_0_15px_rgba(59,130,246,0.2)]`} style={{ width: `${perc}%` }} />
         </div>
      </div>
   );
}
