"use client";
import React, { useState, useEffect } from "react";
import { 
  Type, 
  MessageSquare, 
  Smile, 
  Save, 
  RefreshCcw, 
  Loader2,
  Info,
  ArrowRight,
  Sparkles,
  LayoutTemplate
} from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { EditorCategory } from "@/components/EditorCategory";

export default function ContentEngine() {
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [config, setConfig] = useState({
    heroText: "Reliable Home Services at Your Doorstep.",
    heroSubtitle: "Expert AC repair, RO maintenance, and professional house cleaning across Jaipur. Book in 60 seconds.",
    aboutTitle: "Jaipur Trusts Us.",
    aboutText: "The Local Pankaj Advantage: Upfront pricing, 60-min response, and quality spares with warranty.",
    missionText: "Our mission is to bring transparency and reliability to every household service in Jaipur.",
    footerText: "Jaipur's Trusted Partner for Home Excellence."
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await axios.get("/api/site-config");
        if (data) setConfig(prev => ({ ...prev, ...data }));
      } catch (err) {
        toast.error("Failed to load content configuration");
      } finally {
        setFetching(false);
      }
    };
    fetchConfig();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post("/api/site-config", config);
      toast.success("Content published live!");
    } catch (err) {
      toast.error("Failed to save content");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-20 animate-in slide-in-from-right-10 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 animate-in fade-in duration-1000">
         <div>
            <div className="flex items-center space-x-3 text-indigo-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4">
               <Sparkles size={14} className="fill-current" />
               <span>Strategic Textual Engine</span>
            </div>
            <h1 className="text-6xl font-black text-indigo-950 tracking-tighter leading-tight italic">
               Content <span className="text-indigo-600">Lab.</span>
            </h1>
         </div>
         <div className="flex items-center space-x-6">
            <button className="px-10 py-6 bg-white border border-indigo-100 text-indigo-900 rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] transition shadow-xl shadow-indigo-500/5 hover:bg-indigo-50 active:scale-95 flex items-center space-x-3">
               <RefreshCcw size={16} />
               <span>Reset wording</span>
            </button>
            <button 
              onClick={handleSave}
              disabled={loading}
              className="px-12 py-6 bg-indigo-600 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] transition shadow-2xl shadow-indigo-600/30 transform hover:-translate-y-1 active:scale-95 flex items-center space-x-3"
            >
               {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
               <span>Save Verbiage</span>
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
         {/* Welcome / Hero Section */}
         <EditorCategory icon={<LayoutTemplate size={20}/>} title="Welcome & Narrative" desc="Define the core message and hero story for Jaipur users.">
            <div className="space-y-10 mt-10">
               <div>
                  <label className="block text-[10px] font-black text-indigo-900/40 uppercase tracking-widest mb-4">Hero Title (H1)</label>
                  <textarea 
                     rows={3}
                     className="w-full bg-indigo-50 border border-indigo-100 px-6 py-5 rounded-[2rem] text-xl font-extrabold text-indigo-950 outline-none focus:ring-4 focus:ring-indigo-600/5 focus:border-indigo-600 transition-all resize-none shadow-sm"
                     value={config.heroText}
                     onChange={(e) => setConfig({ ...config, heroText: e.target.value })}
                  />
               </div>
               <div>
                  <label className="block text-[10px] font-black text-indigo-900/40 uppercase tracking-widest mb-4">Hero Subtitle / Description</label>
                  <textarea 
                     rows={4}
                     className="w-full bg-indigo-50 border border-indigo-100 px-6 py-5 rounded-[2rem] text-xs font-bold text-indigo-700 outline-none focus:border-indigo-600 transition-all resize-none shadow-sm font-sans"
                     value={config.heroSubtitle}
                     onChange={(e) => setConfig({ ...config, heroSubtitle: e.target.value })}
                  />
               </div>
            </div>
         </EditorCategory>

         {/* About Us Narrative */}
         <EditorCategory icon={<MessageSquare size={20}/>} title="Platform Identity" desc="Express values and local Jaipur commitment.">
            <div className="space-y-10 mt-10">
               <div>
                  <label className="block text-[10px] font-black text-indigo-900/40 uppercase tracking-widest mb-4">Identity Header</label>
                  <input 
                     type="text" 
                     value={config.aboutTitle} 
                     onChange={(e) => setConfig({ ...config, aboutTitle: e.target.value })}
                     className="w-full bg-indigo-50 border border-indigo-100 px-6 py-5 rounded-2xl text-lg font-black text-indigo-950 outline-none focus:border-indigo-600 transition-all" 
                  />
               </div>
               <div>
                  <label className="block text-[10px] font-black text-indigo-900/40 uppercase tracking-widest mb-4">Mission Statement</label>
                  <textarea 
                     rows={3}
                     className="w-full bg-indigo-50 border border-indigo-100 px-6 py-5 rounded-2xl text-[10px] font-extrabold text-indigo-900 uppercase tracking-widest outline-none focus:border-indigo-600 transition-all resize-none shadow-sm"
                     value={config.missionText}
                     onChange={(e) => setConfig({ ...config, missionText: e.target.value })}
                  />
               </div>
            </div>
         </EditorCategory>

         {/* Trust & Guarantee Section */}
         <EditorCategory icon={<Smile size={20}/>} title="Social Trust" desc="Update testimonials and value propositions.">
            <div className="space-y-10 mt-10">
               <div>
                  <label className="block text-[10px] font-black text-indigo-900/40 uppercase tracking-widest mb-4">Trust Description (Main Page)</label>
                  <textarea 
                     rows={5}
                     className="w-full bg-indigo-50 border border-indigo-100 px-6 py-5 rounded-[2.5rem] text-xs font-bold text-indigo-800 outline-none focus:border-indigo-600 transition-all resize-none shadow-sm italic"
                     value={config.aboutText}
                     onChange={(e) => setConfig({ ...config, aboutText: e.target.value })}
                  />
               </div>
               <div>
                  <label className="block text-[10px] font-black text-indigo-900/40 uppercase tracking-widest mb-4">Global Footer Tagline</label>
                  <input 
                     type="text" 
                     value={config.footerText} 
                     onChange={(e) => setConfig({ ...config, footerText: e.target.value })}
                     className="w-full bg-indigo-50 border border-indigo-100 px-6 py-5 rounded-2xl text-xs font-black text-indigo-950 outline-none focus:border-indigo-600 transition-all uppercase tracking-[0.2em]" 
                  />
               </div>
            </div>
         </EditorCategory>

         {/* Tip Card */}
         <div className="lg:col-span-1 p-12 bg-indigo-600 rounded-[3rem] text-white flex flex-col items-center justify-between text-center gap-10 shadow-2xl shadow-indigo-600/20 group cursor-pointer relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700" />
            <div className="space-y-4">
               <h4 className="text-3xl font-black italic tracking-tighter flex items-center justify-center space-x-4">
                  <span className="p-3 bg-white text-indigo-600 rounded-2xl rotate-12"><Info size={24}/></span>
                  <span>Content Strategy</span>
               </h4>
               <p className="text-indigo-100 font-bold max-w-sm text-[13px] leading-relaxed uppercase tracking-widest opacity-80">
                  Keep your messaging clear, results-oriented, and focused on Jaipur-local context for maximum conversion.
               </p>
            </div>
            <button className="px-10 py-6 bg-white text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] flex items-center space-x-3 transform transition-all duration-500 shadow-xl group-hover:scale-105">
               <span>Visual Copy Tips</span>
               <ArrowRight size={20} />
            </button>
         </div>
      </div>
    </div>
  );
}
