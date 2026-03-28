"use client";
import React, { useState, useEffect } from "react";
import { 
  Settings, 
  Upload, 
  Palette, 
  Type, 
  Smartphone, 
  Layout,
  Save, 
  RefreshCcw,
  ArrowRight,
  Info,
  Loader2,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { EditorCategory } from "@/components/EditorCategory";

export default function EditorDashboard() {
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [config, setConfig] = useState({
    logo: "",
    phone: "+91 98765 43210",
    email: "support@localpankaj.com",
    themeColor: "#4F46E5",
    workingHours: "08:00 AM - 08:00 PM",
    logoSizeDesktop: 100,
    logoSizeMobile: 50
  });
  const [isPreviewMobile, setIsPreviewMobile] = useState(false);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await axios.get("/api/site-config");
        if (data) setConfig(prev => ({ ...prev, ...data }));
      } catch (err) {
        toast.error("Failed to load configuration");
      }
    };
    fetchConfig();
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const { data } = await axios.post("/api/upload", formData);
      setConfig({ ...config, logo: data.secure_url });
      toast.success("Logo uploaded successfully!");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post("/api/site-config", config);
      toast.success("Structural changes published live!");
    } catch (err) {
      toast.error("Failed to save changes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-20 animate-in slide-in-from-bottom-10 duration-1000">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 animate-in fade-in duration-1000">
         <div>
            <div className="flex items-center space-x-3 text-indigo-500 font-black text-[10px] uppercase tracking-[0.5em] mb-4">
               <Settings size={14} className="fill-current" />
               <span>Global Infrastructure</span>
            </div>
            <h1 className="text-6xl font-black text-indigo-950 tracking-tighter leading-tight italic">
               Studio <span className="text-indigo-600">Core.</span>
            </h1>
         </div>
         <div className="flex items-center space-x-6">
            <button className="px-10 py-6 bg-white border border-indigo-100 text-indigo-900 rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] transition shadow-xl shadow-indigo-500/5 hover:bg-indigo-50 active:scale-95 flex items-center space-x-3">
               <RefreshCcw size={16} />
               <span>Discard Draft</span>
            </button>
            <button 
              onClick={handleSave}
              disabled={loading}
              className="px-12 py-6 bg-indigo-600 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.3em] transition shadow-2xl shadow-indigo-600/30 transform hover:-translate-y-1 active:scale-95 flex items-center space-x-3"
            >
               {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
               <span>Commit Infrastructure</span>
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
         {/* Branding Section */}
         <EditorCategory icon={<Palette size={20}/>} title="Brand & Identity" desc="Update your logos, colors and typography.">
            <div className="space-y-10 mt-10">
               <div>
                  <label className="block text-[10px] font-black text-indigo-900/40 uppercase tracking-widest mb-4">Site Logo (Horizontal)</label>
                  <div className="flex justify-end mb-4 space-x-2">
                     <button 
                        onClick={() => setIsPreviewMobile(false)}
                        className={`p-2 rounded-lg transition ${!isPreviewMobile ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-400'}`}
                     >
                        <Layout size={14}/>
                     </button>
                     <button 
                        onClick={() => setIsPreviewMobile(true)}
                        className={`p-2 rounded-lg transition ${isPreviewMobile ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-400'}`}
                     >
                        <Smartphone size={14}/>
                     </button>
                  </div>
                  <label className="p-10 border-2 border-dashed border-indigo-100 rounded-[2.5rem] bg-indigo-50/20 flex flex-col items-center justify-center group hover:border-indigo-600 transition-colors cursor-pointer relative overflow-hidden">
                     {config.logo ? (
                        <div className={`relative flex items-center justify-center transition-all duration-500 ${isPreviewMobile ? 'w-[320px] bg-white border border-indigo-50 rounded-xl py-6' : 'w-full'}`}>
                           <img 
                            src={config.logo} 
                            alt="Logo Preview" 
                            style={{ height: `${isPreviewMobile ? config.logoSizeMobile : config.logoSizeDesktop}px` }}
                            className="max-w-full object-contain" 
                           />
                           <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs uppercase tracking-widest">
                               Click to Replace
                           </div>
                        </div>
                     ) : (
                        <>
                           <Upload size={32} className={`mb-4 transition-colors ${uploading ? 'animate-bounce text-indigo-600' : 'text-indigo-200 group-hover:text-indigo-600'}`} />
                           <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{uploading ? 'Uploading...' : 'CHOOSE SVG OR PNG'}</p>
                        </>
                     )}
                     <input type="file" className="hidden" accept="image/*" onChange={handleUpload} disabled={uploading} />
                  </label>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                     <label className="block text-[10px] font-black text-indigo-900/40 uppercase tracking-widest mb-4">Desktop Size ({config.logoSizeDesktop}px)</label>
                     <input 
                        type="range" 
                        min="50" 
                        max="400" 
                        value={config.logoSizeDesktop} 
                        onChange={(e) => setConfig({...config, logoSizeDesktop: parseInt(e.target.value)})}
                        className="w-full h-2 bg-indigo-50 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                     />
                  </div>
                  <div>
                     <label className="block text-[10px] font-black text-indigo-900/40 uppercase tracking-widest mb-4">Mobile Size ({config.logoSizeMobile}px)</label>
                     <input 
                        type="range" 
                        min="30" 
                        max="200" 
                        value={config.logoSizeMobile} 
                        onChange={(e) => setConfig({...config, logoSizeMobile: parseInt(e.target.value)})}
                        className="w-full h-2 bg-indigo-50 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                     />
                  </div>
               </div>
            </div>
         </EditorCategory>

         {/* Visual Highlights */}
         <EditorCategory icon={<Type size={20}/>} title="System Aesthetics" desc="Define the core color palette and highlight strategies.">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
                  <div>
                     <label className="block text-[10px] font-black text-indigo-900/40 uppercase tracking-widest mb-4">Primary Theme</label>
                     <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 rounded-2xl shadow-xl shadow-indigo-600/30 transition-colors" style={{ backgroundColor: config.themeColor }} />
                        <input 
                           type="text" 
                           value={config.themeColor} 
                           onChange={(e) => setConfig({ ...config, themeColor: e.target.value })}
                           className="bg-indigo-50 border border-indigo-100 px-4 py-3 rounded-xl text-xs font-bold text-indigo-900 outline-none w-full uppercase" 
                        />
                     </div>
                  </div>
                  <div>
                     <label className="block text-[10px] font-black text-indigo-900/40 uppercase tracking-widest mb-4">Global Accent</label>
                     <div className="flex items-center space-x-4">
                        <div className="w-14 h-14 bg-blue-500 rounded-2xl shadow-xl shadow-blue-500/30" />
                        <input type="text" value="#3B82F6" disabled className="bg-indigo-50 border border-indigo-100 px-4 py-3 rounded-xl text-xs font-bold text-indigo-900 outline-none w-full opacity-50" />
                     </div>
                  </div>
               </div>
         </EditorCategory>

         {/* Contact Config */}
         <EditorCategory icon={<Smartphone size={20}/>} title="System Reach" desc="Update phones, support emails and hours.">
            <div className="space-y-10 mt-10">
               <div>
                  <label className="block text-[10px] font-black text-indigo-900/40 uppercase tracking-widest mb-4">Primary Hotline</label>
                  <input 
                     type="text" 
                     value={config.phone} 
                     onChange={(e) => setConfig({ ...config, phone: e.target.value })}
                     className="w-full bg-indigo-50 border border-indigo-100 px-6 py-5 rounded-2xl text-xs font-black text-indigo-900 outline-none focus:border-indigo-600 transition-all font-sans" 
                  />
               </div>
               <div>
                  <label className="block text-[10px] font-black text-indigo-900/40 uppercase tracking-widest mb-4">Support Email</label>
                   <input 
                     type="text" 
                     value={config.email} 
                     onChange={(e) => setConfig({ ...config, email: e.target.value })}
                     className="w-full bg-indigo-50 border border-indigo-100 px-6 py-5 rounded-2xl text-xs font-black text-indigo-900 outline-none focus:border-indigo-600 transition-all font-sans" 
                  />
               </div>
               <div>
                  <label className="block text-[10px] font-black text-indigo-900/40 uppercase tracking-widest mb-4">Operating Window</label>
                   <input 
                     type="text" 
                     value={config.workingHours} 
                     onChange={(e) => setConfig({ ...config, workingHours: e.target.value })}
                     className="w-full bg-indigo-50 border border-indigo-100 px-6 py-5 rounded-2xl text-xs font-black text-indigo-900 outline-none focus:border-indigo-600 transition-all font-sans" 
                  />
               </div>
            </div>
         </EditorCategory>

         {/* Live Preview Tip */}
         <div className="lg:col-span-1 py-12 px-15 bg-indigo-600 rounded-[3rem] text-white flex flex-col items-center justify-between gap-10 shadow-2xl shadow-indigo-600/20 group cursor-pointer relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-700" />
            <div className="space-y-4">
               <h4 className="text-3xl font-black italic tracking-tighter flex items-center justify-center space-x-4">
                  <span className="p-3 bg-white text-indigo-600 rounded-2xl"><Info size={24}/></span>
                  <span>Core Hub Active</span>
               </h4>
               <p className="text-indigo-100 font-bold max-w-md text-[13px] leading-relaxed uppercase tracking-widest opacity-80">
                  You are currently in the Core Infrastructure portal. Use the sidebar to access wording, media or SEO settings.
               </p>
            </div>
            <button className="px-10 py-6 bg-white text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-[0.4em] flex items-center space-x-3 transition-all duration-500 shadow-xl group-hover:scale-105">
               <span>Studio Overview</span>
               <ArrowRight size={20} />
            </button>
         </div>
      </div>
    </div>
  );
}
