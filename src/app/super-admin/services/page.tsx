"use client";
import React, { useState, useEffect } from "react";
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
  Hammer
} from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

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
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    category: "APPLIANCE",
    iconName: "WashingMachine",
    description: ""
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
      description: service.description || ""
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
    setFormData({ name: "", category: "APPLIANCE", iconName: "WashingMachine", description: "" });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h1 className="text-6xl font-black text-white tracking-tighter italic">Service <span className="text-blue-500">Catalog.</span></h1>
          <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-[10px] mt-4">Manage public offerings and categorization.</p>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition shadow-2xl shadow-blue-500/20 active:scale-95 flex items-center space-x-3"
        >
          <Plus size={16} />
          <span>Add New Service</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
         <ServiceCategorySection 
            title="Appliance Repair" 
            services={services.filter(s => s.category === "APPLIANCE")} 
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
         />
         <ServiceCategorySection 
            title="Home Repair" 
            services={services.filter(s => s.category === "HOME")} 
            loading={loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            dark
         />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md">
           <div className="bg-gray-900 border border-white/10 w-full max-w-xl rounded-[3rem] p-12 space-y-8 shadow-2xl">
              <h2 className="text-3xl font-black text-white italic tracking-tighter">{editId ? 'Update Service.' : 'Register New Service.'}</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Service Name</label>
                    <input 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-blue-500 transition-all uppercase tracking-widest text-xs"
                      placeholder="E.G. CHIMNEY REPAIR"
                    />
                 </div>

                 <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Display Category</label>
                       <select 
                         value={formData.category}
                         onChange={(e) => setFormData({...formData, category: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-blue-500 transition-all uppercase tracking-widest text-[10px] cursor-pointer"
                       >
                          <option value="APPLIANCE" className="bg-gray-900 text-white">Appliance Repair</option>
                          <option value="HOME" className="bg-gray-900 text-white">Home Repair</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Select Icon</label>
                       <div className="flex flex-wrap gap-2">
                          {ICON_OPTIONS.map(opt => (
                            <button
                              key={opt.name}
                              type="button"
                              onClick={() => setFormData({...formData, iconName: opt.name})}
                              className={`p-3 rounded-xl border transition-all ${formData.iconName === opt.name ? 'border-blue-500 bg-blue-500/20 text-blue-400' : 'border-white/5 bg-white/5 text-gray-500'}`}
                            >
                               {opt.icon}
                            </button>
                          ))}
                       </div>
                    </div>
                 </div>

                 <div className="flex items-center space-x-4 pt-6">
                    <button type="submit" className="flex-1 py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/10">
                       {editId ? 'Apply Changes' : 'Publish Service'}
                    </button>
                    <button type="button" onClick={handleCloseModal} className="px-8 py-5 bg-white/5 text-gray-400 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-white/5">Cancel</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}

function ServiceCategorySection({ title, services, loading, onEdit, onDelete, dark }: any) {
  return (
    <div className={`p-10 rounded-[3rem] border ${dark ? 'bg-[#1e448a]/20 border-blue-500/20' : 'bg-white/5 border-white/10'}`}>
       <h3 className="text-2xl font-black text-white italic tracking-tight mb-8">{title}</h3>
       <div className="space-y-4">
          {loading ? (
             <div className="py-10 text-center animate-pulse text-gray-600 font-black text-[10px] uppercase tracking-widest">Accessing catalog...</div>
          ) : services.length > 0 ? (
             services.map((s: any) => (
                <div key={s._id} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
                   <div className="flex items-center space-x-4">
                      <div className="p-3 bg-gray-900 rounded-xl text-blue-400 border border-white/5">
                         {React.createElement((require("lucide-react") as any)[s.iconName || "Settings2"] || Settings2, { size: 20 })}
                      </div>
                      <div>
                         <div className="font-black text-xs text-white uppercase tracking-widest">{s.name}</div>
                         <div className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1 italic">slug: {s.slug}</div>
                      </div>
                   </div>
                   <div className="flex items-center space-x-2">
                       <button 
                          onClick={() => onEdit(s)}
                          className="p-2 text-gray-500 hover:text-white transition"
                       >
                          <Edit3 size={16}/>
                       </button>
                       <button 
                          onClick={() => onDelete(s._id)}
                          className="p-2 text-red-500/50 hover:text-red-500 transition"
                       >
                          <Trash2 size={16}/>
                       </button>
                   </div>
                </div>
             ))
          ) : (
             <div className="py-10 text-center text-gray-600 font-black text-[10px] uppercase tracking-widest italic border border-dashed border-white/10 rounded-2xl">No services found.</div>
          )}
       </div>
    </div>
  );
}
