"use client";
import React, { useState } from "react";
import { 
  Image as ImageIcon, 
  Upload, 
  Trash2, 
  ExternalLink, 
  Grid, 
  List, 
  Search,
  Filter,
  Plus,
  Loader2
} from "lucide-react";
import { toast } from "react-hot-toast";

export default function MediaLibrary() {
  const [view, setView] = useState("grid");
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className="max-w-6xl mx-auto space-y-16 animate-in fade-in slide-in-from-right-10 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h1 className="app-h1 ">Jaipur <span className="text-indigo-600">Assets.</span></h1>
          <p className="text-gray-500 font-bold tracking-widest text-[10px] mt-4">Manage your branding and media library.</p>
        </div>
        
        <div className="flex items-center space-x-6">
           <label className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-[10px] tracking-widest transition shadow-2xl shadow-indigo-600/30 transform hover:-translate-y-1 active:scale-95 cursor-pointer flex items-center space-x-3">
              {isUploading ? <Loader2 className="animate-spin" size={16} /> : <Plus size={16} />}
              <span>Upload New</span>
              <input type="file" className="hidden" multiple />
           </label>
        </div>
      </div>

      <div className="bg-white p-12 rounded-[3.5rem] border border-indigo-50 shadow-sm space-y-10">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-indigo-50">
            <div className="flex items-center space-x-4">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-600 transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search media..." 
                    className="pl-12 pr-6 py-4 rounded-xl bg-indigo-50/50 border border-transparent focus:bg-white focus:border-indigo-100 outline-none transition-all font-bold text-xs w-64 tracking-widest"
                  />
               </div>
               <button className="p-4 bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition"><Filter size={18}/></button>
            </div>

            <div className="flex items-center space-x-2 bg-indigo-50 p-2 rounded-2xl">
               <button 
                  onClick={() => setView("grid")}
                  className={`p-3 rounded-xl transition ${view === "grid" ? 'bg-white text-indigo-600 shadow-sm' : 'text-indigo-400 hover:text-indigo-600'}`}
               >
                  <Grid size={20}/>
               </button>
               <button 
                  onClick={() => setView("list")}
                  className={`p-3 rounded-xl transition ${view === "list" ? 'bg-white text-indigo-600 shadow-sm' : 'text-indigo-400 hover:text-indigo-600'}`}
               >
                  <List size={20}/>
               </button>
            </div>
         </div>

         {view === "grid" ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
               <MediaCard name="main-logo.png" type="PNG" size="420 KB" url="#" />
               <MediaCard name="hero-bg.jpg" type="JPG" size="2.4 MB" url="/hero-bg.jpg" />
               <MediaCard name="technician-1.jpg" type="JPG" size="840 KB" url="#" />
               <MediaCard name="service-ac.webp" type="WEBP" size="180 KB" url="#" />
               <div className="aspect-square border-2 border-dashed border-indigo-100 rounded-[2rem] flex flex-col items-center justify-center text-indigo-200 group hover:border-indigo-600 hover:text-indigo-600 transition cursor-pointer">
                  <Upload size={32} className="mb-4" />
                  <span className="text-[10px] font-black tracking-widest">Add More</span>
               </div>
            </div>
         ) : (
            <div className="space-y-4">
                <MediaRow name="main-logo.png" type="PNG" size="420 KB" date="27 Mar 2026" />
                <MediaRow name="hero-bg.jpg" type="JPG" size="2.4 MB" date="26 Mar 2026" />
                <MediaRow name="technician-1.jpg" type="JPG" size="840 KB" date="25 Mar 2026" />
            </div>
         )}
      </div>

      <div className="bg-indigo-950 text-white p-12 rounded-[3.5rem] flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative group">
         <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
         <div className="space-y-4">
            <h3 className="app-h3 ">Powered by Cloudinary.</h3>
            <p className="text-indigo-300 font-bold max-w-sm text-[10px] tracking-widest leading-loose opacity-80">
               All your assets are automatically optimized and served via lightning-fast CDN.
            </p>
         </div>
         <button className="px-10 py-5 bg-white text-indigo-950 rounded-2xl font-black text-[10px] tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-xl active:scale-95">
            Cloud Settings
         </button>
      </div>
    </div>
  );
}

function MediaCard({ name, type, size, url }: any) {
   return (
      <div className="group space-y-4">
         <div className="aspect-square bg-indigo-50 rounded-[2rem] overflow-hidden relative border border-indigo-50 group-hover:border-indigo-600 transition-all">
            {url !== "#" ? (
               <img src={url} alt={name} className="w-full h-full object-cover" />
            ) : (
               <div className="w-full h-full flex items-center justify-center text-indigo-300"><ImageIcon size={48}/></div>
            )}
            <div className="absolute inset-0 bg-indigo-950/80 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="flex justify-end space-x-2">
                  <button className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition"><ExternalLink size={16}/></button>
                  <button className="p-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500 hover:text-white transition"><Trash2 size={16}/></button>
               </div>
               <div className="space-y-1">
                  <div className="text-[10px] font-black text-white tracking-widest truncate">{name}</div>
                  <div className="text-[8px] font-bold text-indigo-400 tracking-widest">{size} • {type}</div>
               </div>
            </div>
         </div>
      </div>
   );
}

function MediaRow({ name, type, size, date }: any) {
   return (
      <div className="flex items-center justify-between p-6 hover:bg-indigo-50 rounded-2xl transition group">
         <div className="flex items-center space-x-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 group-hover:bg-white group-hover:shadow-sm transition-all"><ImageIcon size={24}/></div>
            <div>
               <div className="text-xs font-black text-indigo-950 tracking-widest">{name}</div>
               <div className="text-[8px] font-bold text-indigo-400 tracking-widest mt-1">{type} • {size}</div>
            </div>
         </div>
         <div className="flex items-center space-x-12">
            <div className="text-[9px] font-bold text-gray-400 tracking-widest hidden md:block">{date}</div>
            <div className="flex items-center space-x-2">
               <button className="p-3 text-indigo-400 hover:text-indigo-600 transition"><ExternalLink size={16}/></button>
               <button className="p-3 text-gray-300 hover:text-red-500 transition"><Trash2 size={16}/></button>
            </div>
         </div>
      </div>
   );
}

