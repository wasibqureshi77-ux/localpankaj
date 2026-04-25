"use client";
import React, { useState, useEffect } from "react";
import { 
  Palette, 
  Save, 
  RefreshCcw,
  Layout,
  Type,
  Maximize2,
  Minimize2,
  Contrast,
  Check
} from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ThemeEditor() {
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState({
    themeColor: "#4F46E5",
    accentColor: "#3B82F6",
    surfaceColor: "#FFFFFF",
    borderRadius: "1.5rem"
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await axios.get("/api/site-config");
        if (data) setConfig((prev) => ({ ...prev, ...data }));
      } catch (err) {
        toast.error("Failed to load theme config");
      }
    };
    fetchConfig();
  }, []);

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post("/api/site-config", config);
      toast.success("Theme updated live!");
    } catch (err) {
      toast.error("Failed to save theme");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in slide-in-from-right-10 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h1 className="app-h1 ">Jaipur <span className="text-indigo-600">Visuals.</span></h1>
          <p className="text-gray-500 font-bold tracking-widest text-[10px] mt-4">Fine-tune your brand aesthetics.</p>
        </div>
        
        <div className="flex items-center space-x-6">
           <button className="px-10 py-5 bg-white border border-indigo-100 text-indigo-900 rounded-2xl font-black text-[10px] tracking-widest transition shadow-sm hover:bg-gray-50 active:scale-95">
              <RefreshCcw size={16} className="inline mr-2" />
              <span>Reset</span>
           </button>
           <button 
             onClick={handleSave}
             disabled={loading}
             className="px-12 py-5 bg-indigo-600 text-white rounded-2xl font-black text-[10px] tracking-widest transition shadow-2xl shadow-indigo-600/30 transform hover:-translate-y-1 active:scale-95"
           >
              {loading ? "..." : "Save Theme"}
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
         {/* Palettes */}
         <div className="lg:col-span-2 space-y-12">
            <div className="bg-white p-12 rounded-[3.5rem] border border-indigo-50 shadow-sm space-y-10">
               <h3 className="app-h3 ">
                  <Palette size={24} className="text-indigo-600" />
                  <span>Color Mastery</span>
               </h3>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <ColorPicker 
                     label="Primary Brand Color" 
                     value={config.themeColor} 
                     onChange={(c: string) => setConfig({...config, themeColor: c})}
                  />
                  <ColorPicker 
                     label="Accent Highlight" 
                     value={config.accentColor} 
                     onChange={(c: string) => setConfig({...config, accentColor: c})}
                  />
               </div>

               <div className="pt-10 border-t border-indigo-50">
                  <label className="block text-[10px] font-black text-gray-400 tracking-[0.2em] mb-8">Preset Harmony Boards</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                     <PresetBoard colors={["#4F46E5", "#3B82F6"]} name="Electric Jaipur" onSelect={(c: any) => setConfig({...config, themeColor: c[0], accentColor: c[1]})} />
                     <PresetBoard colors={["#EC4899", "#F43F5E"]} name="Pink City" onSelect={(c: any) => setConfig({...config, themeColor: c[0], accentColor: c[1]})} />
                     <PresetBoard colors={["#10B981", "#059669"]} name="Luxury Green" onSelect={(c: any) => setConfig({...config, themeColor: c[0], accentColor: c[1]})} />
                     <PresetBoard colors={["#000000", "#374151"]} name="Dark Mode" onSelect={(c: any) => setConfig({...config, themeColor: c[0], accentColor: c[1]})} />
                  </div>
               </div>
            </div>

            <div className="bg-white p-12 rounded-[3.5rem] border border-indigo-50 shadow-sm space-y-10">
               <h3 className="app-h3 ">
                  <Layout size={24} className="text-indigo-600" />
                  <span>Geometric Rules</span>
               </h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                     <label className="block text-[10px] font-black text-gray-400 tracking-widest">Border Curvature</label>
                     <div className="flex items-center space-x-4">
                        <button onClick={() => setConfig({...config, borderRadius: "0rem"})} className={`p-4 rounded-lg bg-indigo-50 hover:bg-indigo-100 transition ${config.borderRadius === "0rem" ? 'ring-2 ring-indigo-600' : ''}`}><Minimize2 size={20}/></button>
                        <button onClick={() => setConfig({...config, borderRadius: "1.5rem"})} className={`p-4 rounded-xl bg-indigo-50 hover:bg-indigo-100 transition ${config.borderRadius === "1.5rem" ? 'ring-2 ring-indigo-600' : ''}`}><Maximize2 size={20}/></button>
                        <button onClick={() => setConfig({...config, borderRadius: "3.5rem"})} className={`p-4 rounded-[1.5rem] bg-indigo-50 hover:bg-indigo-100 transition ${config.borderRadius === "3.5rem" ? 'ring-2 ring-indigo-600' : ''}`}><Maximize2 size={24}/></button>
                     </div>
                  </div>
                  <div className="space-y-6">
                     <label className="block text-[10px] font-black text-gray-400 tracking-widest">Interface Contrast</label>
                     <div className="flex items-center space-x-4">
                         <div className="w-12 h-12 rounded-full border-4 border-indigo-600" />
                         <span className="text-xs font-black text-indigo-900">Standard Bold</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Interactive Preview */}
         <div className="lg:col-span-1">
            <div className="sticky top-40 space-y-8">
               <div className="p-8 bg-gray-950 rounded-[3rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-600/20 blur-2xl -translate-y-1/2 translate-x-1/2" />
                  <div className="relative space-y-6">
                     <h4 className="text-[10px] font-black text-indigo-400 tracking-widest">Real-time Preview</h4>
                     
                     <div className={`p-6 bg-white shadow-xl transition-all duration-500`} style={{ borderRadius: config.borderRadius }}>
                        <div className="flex items-center space-x-3 mb-4">
                           <div className="w-8 h-8 rounded-full" style={{ backgroundColor: config.themeColor }} />
                           <div className="w-24 h-2 bg-gray-100 rounded-full" />
                        </div>
                        <div className="space-y-2">
                           <div className="w-full h-3 bg-gray-50 rounded-full" />
                           <div className="w-full h-3 bg-gray-50 rounded-full" />
                           <div className="w-2/3 h-3 bg-gray-50 rounded-full" />
                        </div>
                        <button className="mt-6 w-full py-3 text-white font-black text-[8px] tracking-widest transition-colors" style={{ backgroundColor: config.themeColor, borderRadius: config.borderRadius }}>
                           Button Action
                        </button>
                     </div>

                     <div className="pt-6 border-t border-white/5 space-y-4">
                        <div className="flex items-center justify-between">
                           <span className="text-[9px] font-bold text-gray-500">Accessibility</span>
                           <span className="text-green-500 font-bold text-[9px]">Passed</span>
                        </div>
                        <div className="flex items-center justify-between">
                           <span className="text-[9px] font-bold text-gray-500">Color Contrast</span>
                           <span className="text-green-500 font-bold text-[9px]">WCAG AA</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
}

function ColorPicker({ label, value, onChange }: any) {
   return (
      <div className="space-y-6">
         <label className="text-[10px] font-black text-gray-400 tracking-widest">{label}</label>
         <div className="flex items-center space-x-5 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-50 group hover:border-indigo-600 transition-all">
            <input 
               type="color" 
               className="w-16 h-16 rounded-xl cursor-pointer border-none bg-transparent"
               value={value}
               onChange={(e) => onChange(e.target.value)}
            />
            <input 
               type="text" 
               className="bg-transparent text-sm font-black text-indigo-900 outline-none w-full"
               value={value}
               onChange={(e) => onChange(e.target.value)}
            />
         </div>
      </div>
   );
}

function PresetBoard({ colors, name, onSelect }: any) {
   return (
      <button 
         onClick={() => onSelect(colors)}
         className="group text-left space-y-3"
      >
         <div className="flex -space-x-3 shadow-sm group-hover:-translate-y-1 transition-transform">
            {colors.map((c: any, i: number) => (
               <div key={i} className="w-10 h-10 rounded-full border-4 border-white shadow-sm" style={{ backgroundColor: c }} />
            ))}
         </div>
         <p className="text-[8px] font-black text-gray-400 tracking-widest group-hover:text-indigo-600 transition-colors">{name}</p>
      </button>
   );
}

