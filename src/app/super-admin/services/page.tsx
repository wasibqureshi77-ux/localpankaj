"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle, 
  XCircle, 
  Settings2,
  WashingMachine,
  AirVent,
  Wind,
  Refrigerator,
  Microwave,
  Waves,
  Thermometer,
  Zap,
  Hammer,
  Search,
  Filter,
  X,
  ChevronRight,
  MoreVertical,
  Star,
  Camera,
  Play,
  Loader2,
  ImageIcon,
  Video
} from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";

const ICON_OPTIONS = [
  { name: "WashingMachine", icon: <WashingMachine size={20}/> },
  { name: "AirVent", icon: <AirVent size={20}/> },
  { name: "Wind", icon: <Wind size={20}/> },
  { name: "Refrigerator", icon: <Refrigerator size={20}/> },
  { name: "Microwave", icon: <Microwave size={20}/> },
  { name: "Waves", icon: <Waves size={20}/> },
  { name: "Thermometer", icon: <Thermometer size={20}/> },
  { name: "Zap", icon: <Zap size={20}/> },
  { name: "Hammer", icon: <Hammer size={20}/> },
];

export default function ServicesManagement() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    category: "APPLIANCE",
    iconName: "WashingMachine",
    description: "",
    isBestSeller: false,
    heroImage: "",
    heroVideo: ""
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const { data } = await axios.get("/api/services");
      setServices(data || []);
    } catch (err) {
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'image') setUploadingImage(true);
    else setUploadingVideo(true);

    const data = new FormData();
    data.append("file", file);

    try {
      const res = await axios.post("/api/upload", data);
      if (type === 'image') {
        setFormData({ ...formData, heroImage: res.data.url });
      } else {
        setFormData({ ...formData, heroVideo: res.data.url });
      }
      toast.success(`${type === 'image' ? 'Image' : 'Video'} uploaded successfully`);
    } catch (err) {
      toast.error(`${type === 'image' ? 'Image' : 'Video'} upload failed`);
    } finally {
      if (type === 'image') setUploadingImage(false);
      else setUploadingVideo(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/api/services/${editId}`, formData);
        toast.success("Service updated successfully");
      } else {
        await axios.post("/api/services", formData);
        toast.success("Service added successfully");
      }
      handleCloseModal();
      fetchServices();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Operation failed");
    }
  };

  const handleEdit = (service: any) => {
    setEditId(service._id);
    setFormData({
      name: service.name,
      category: service.category,
      iconName: service.iconName,
      description: service.description || "",
      isBestSeller: service.isBestSeller || false,
      heroImage: service.heroImage || "",
      heroVideo: service.heroVideo || ""
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await axios.delete(`/api/services/${id}`);
      toast.success("Service deleted");
      fetchServices();
    } catch (err) {
      toast.error("Failed to delete service");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({ 
        name: "", 
        category: "APPLIANCE", 
        iconName: "WashingMachine", 
        description: "",
        isBestSeller: false,
        heroImage: "",
        heroVideo: "" 
    });
  };

  const filteredServices = services.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
     return (
        <div className="space-y-8 animate-pulse">
           <div className="h-12 w-64 bg-slate-100 rounded-lg"></div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="h-[400px] bg-slate-50 rounded-xl"></div>
              <div className="h-[400px] bg-slate-50 rounded-xl"></div>
           </div>
        </div>
     );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-8">
        <div>
           <h1 className="text-3xl font-bold text-slate-900">Service Catalog</h1>
           <p className="text-sm text-slate-500 mt-1">Manage public offerings, pricing, and display categorization.</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all shadow-blue-100 active:scale-95"
        >
          <Plus size={18} />
          Register New Service
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <ServiceSection 
            title="Appliance Repair" 
            services={filteredServices.filter(s => s.category === "APPLIANCE")} 
            onEdit={handleEdit}
            onDelete={handleDelete}
         />
         <ServiceSection 
            title="Home Maintenance" 
            services={filteredServices.filter(s => s.category === "HOME")} 
            onEdit={handleEdit}
            onDelete={handleDelete}
         />
      </div>

      {/* Registration Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={handleCloseModal} />
           <div className="relative bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
              <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between shrink-0">
                 <h3 className="app-h3 ">{editId ? 'Update Service Details' : 'Register New Service'}</h3>
                 <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-900"><X size={20}/></button>
              </div>
              <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
                 <div className="space-y-1.5">
                    <label className="text-[11px] font-bold text-slate-500 tracking-widest">Service Name</label>
                    <input 
                      required value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none tracking-wide"
                      placeholder="e.g. AC DEEP CLEANING"
                    />
                 </div>

                 {/* Media Uploads */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Hero Image */}
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3">
                       <div className="flex items-center justify-between">
                          <label className="text-[11px] font-bold text-slate-500 tracking-widest">Hero Image</label>
                          {formData.heroImage && (
                            <button type="button" onClick={() => setFormData({...formData, heroImage: ""})} className="text-rose-500 hover:text-rose-700">
                               <X size={14} />
                            </button>
                          )}
                       </div>
                       <div className="h-32 bg-white border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center relative">
                          {uploadingImage ? (
                             <Loader2 className="animate-spin text-blue-600" size={20} />
                          ) : formData.heroImage ? (
                             <Image src={formData.heroImage} alt="Hero Preview" fill className="object-contain" />
                          ) : (
                             <ImageIcon className="text-slate-300" size={32} />
                          )}
                       </div>
                       <label className="flex items-center justify-center gap-2 w-full py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 tracking-widest cursor-pointer hover:bg-slate-50 transition-all">
                          <Camera size={14} />
                          {formData.heroImage ? 'Change Image' : 'Upload Image'}
                          <input type="file" className="hidden" accept="image/*" onChange={(e) => handleMediaUpload(e, 'image')} disabled={uploadingImage} />
                       </label>
                    </div>

                    {/* Hero Video */}
                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl space-y-3">
                       <div className="flex items-center justify-between">
                          <label className="text-[11px] font-bold text-slate-500 tracking-widest">Hero Video</label>
                          {formData.heroVideo && (
                            <button type="button" onClick={() => setFormData({...formData, heroVideo: ""})} className="text-rose-500 hover:text-rose-700">
                               <X size={14} />
                            </button>
                          )}
                       </div>
                       <div className="h-32 bg-white border border-slate-200 rounded-lg overflow-hidden flex items-center justify-center relative">
                          {uploadingVideo ? (
                             <Loader2 className="animate-spin text-blue-600" size={20} />
                          ) : formData.heroVideo ? (
                             <div className="flex flex-col items-center gap-2">
                                <Play className="text-blue-600" size={24} />
                                <span className="text-[10px] text-slate-400 font-bold truncate max-w-[150px]">Video Uploaded</span>
                             </div>
                          ) : (
                             <Video className="text-slate-300" size={32} />
                          )}
                       </div>
                       <label className="flex items-center justify-center gap-2 w-full py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-bold text-slate-600 tracking-widest cursor-pointer hover:bg-slate-50 transition-all">
                          <Video size={14} />
                          {formData.heroVideo ? 'Change Video' : 'Upload Video'}
                          <input type="file" className="hidden" accept="video/*" onChange={(e) => handleMediaUpload(e, 'video')} disabled={uploadingVideo} />
                       </label>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-100 rounded-xl group/best transition-all cursor-pointer select-none"
                      onClick={() => setFormData({...formData, isBestSeller: !formData.isBestSeller})}>
                    <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all ${
                         formData.isBestSeller ? 'bg-orange-500 border-orange-500 text-white' : 'border-orange-200 bg-white'
                    }`}>
                        {formData.isBestSeller && <Star size={14} fill="currentColor" />}
                    </div>
                    <div>
                        <div className="text-[11px] font-black text-orange-600 tracking-[0.1em]">Best Seller Recognition</div>
                        <div className="text-[10px] font-bold text-orange-400 mt-0.5">Toggle this to mark this service as a top-selling offering.</div>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                       <label className="text-[11px] font-bold text-slate-500 tracking-widest">Display Category</label>
                       <select 
                         value={formData.category}
                         onChange={(e) => setFormData({...formData, category: e.target.value})}
                         className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:ring-1 focus:ring-blue-500 outline-none cursor-pointer"
                       >
                          <option value="APPLIANCE">Appliance Repair</option>
                          <option value="HOME">Home Repair</option>
                       </select>
                    </div>
                    <div className="space-y-1.5">
                       <label className="text-[11px] font-bold text-slate-500 tracking-widest">Visual Icon</label>
                       <div className="flex flex-wrap gap-2">
                          {ICON_OPTIONS.map(opt => (
                            <button
                              key={opt.name} type="button"
                              onClick={() => setFormData({...formData, iconName: opt.name})}
                              className={`p-2 rounded-lg border transition-all ${
                                formData.iconName === opt.name 
                                  ? 'border-blue-600 bg-blue-50 text-blue-600' 
                                  : 'border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-300'
                              }`}
                            >
                               {opt.icon}
                            </button>
                          ))}
                       </div>
                    </div>
                 </div>

                 <div className="pt-4 flex gap-3 sticky bottom-0 bg-white">
                    <button type="button" onClick={handleCloseModal} className="flex-1 py-2 text-sm font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50">Cancel</button>
                    <button type="submit" disabled={uploadingImage || uploadingVideo} className="flex-1 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm shadow-blue-100 disabled:opacity-50">
                       {editId ? 'Apply Changes' : 'Publish Service'}
                    </button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}

function ServiceSection({ title, services, onEdit, onDelete }: any) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-full">
       <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <h3 className="app-h3 ">{title}</h3>
          <span className="text-[10px] font-bold text-slate-400 tracking-widest">{services.length} items</span>
       </div>
       <div className="divide-y divide-slate-50 p-2 overflow-y-auto max-h-[500px]">
          {services.length > 0 ? (
             services.map((s: any) => (
                <div key={s._id} className="flex items-center justify-between p-4 rounded-lg group hover:bg-slate-50 transition-all border border-transparent hover:border-slate-100">
                   <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-white border border-slate-100 rounded-lg flex items-center justify-center text-slate-400 group-hover:text-blue-600 group-hover:border-blue-100 transition-all shadow-sm relative">
                         {React.createElement((require("lucide-react") as any)[s.iconName || "Settings2"] || Settings2, { size: 20 })}
                         {s.isBestSeller && (
                            <div className="absolute -top-1 -right-1 bg-orange-500 text-white rounded-full p-0.5 border border-white shadow-sm scale-75">
                                <Star size={8} fill="currentColor" />
                            </div>
                         )}
                      </div>
                      <div>
                         <div className="flex items-center gap-2">
                             <div className="font-bold text-sm text-slate-900">{s.name}</div>
                             {s.isBestSeller && (
                                <span className="bg-orange-100 text-orange-600 text-[8px] font-black px-2 py-0.5 rounded-full border border-orange-200 tracking-widest">Best Seller</span>
                             )}
                         </div>
                         <div className="text-[10px] font-bold text-slate-400 mt-0.5 tracking-wider font-mono">/{s.slug}</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                       <button onClick={() => onEdit(s)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-white rounded-md transition-all shadow-sm border border-transparent hover:border-blue-100">
                          <Edit3 size={14}/>
                       </button>
                       <button onClick={() => onDelete(s._id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-md transition-all shadow-sm border border-transparent hover:border-rose-100">
                          <Trash2 size={14}/>
                       </button>
                   </div>
                </div>
             ))
          ) : (
             <div className="p-12 text-center text-slate-400 text-xs font-medium tracking-widest  opacity-50">Empty Manifest</div>
          )}
       </div>
    </div>
  );
}

