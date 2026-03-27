"use client";
import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Package,
  Search,
  ChevronDown,
  Camera,
  Loader2,
  ImageIcon
} from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function ProductManagement() {
  const [products, setProducts] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    serviceId: "",
    subCategory: "SERVICE",
    description: "",
    image: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, servicesRes] = await Promise.all([
        axios.get("/api/products"),
        axios.get("/api/services")
      ]);
      setProducts(productsRes.data || []);
      setServices(servicesRes.data || []);
    } catch (err) {
      toast.error("Failed to load inventory");
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const data = new FormData();
    data.append("file", file);

    try {
      const res = await axios.post("/api/upload", data);
      setFormData({ ...formData, image: res.data.url });
      toast.success("Image uploaded successfully");
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editId) {
        await axios.put(`/api/products/${editId}`, formData);
        toast.success("Package updated");
      } else {
        await axios.post("/api/products", formData);
        toast.success("Package added to catalog");
      }
      handleCloseModal();
      fetchData();
    } catch (err: any) {
      toast.error("Operation failed");
    }
  };

  const handleEdit = (product: any) => {
    setEditId(product._id);
    setFormData({
      name: product.name,
      price: product.price,
      serviceId: product.serviceId,
      subCategory: product.subCategory,
      description: product.description || "",
      image: product.image || ""
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await axios.delete(`/api/products/${id}`);
      toast.success("Removed from catalog");
      fetchData();
    } catch (err) {
      toast.error("Failed to delete");
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditId(null);
    setFormData({ name: "", price: 0, serviceId: "", subCategory: "SERVICE", description: "", image: "" });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h1 className="text-6xl font-black text-white tracking-tighter italic uppercase">Product <span className="text-blue-500">Inventory.</span></h1>
          <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-[10px] mt-4">Create service packages with visual assets.</p>
        </div>
        
        <button 
          onClick={() => setShowModal(true)}
          className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition shadow-2xl shadow-blue-500/20 active:scale-95 flex items-center space-x-3"
        >
          <Plus size={16} />
          <span>Add Service Package</span>
        </button>
      </div>

      {loading ? (
         <div className="py-20 text-center text-gray-600 font-black uppercase tracking-[0.5em] text-xs">Accessing Inventory...</div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
           {products.map((p) => {
             const parentService = services.find(s => s._id === p.serviceId);
             return (
               <div key={p._id} className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between group hover:bg-white/10 transition-all">
                  <div className="flex items-center space-x-6">
                     <div className="w-20 h-20 bg-gray-950 rounded-2xl flex items-center justify-center text-blue-500 border border-white/5 shadow-inner overflow-hidden relative">
                        {p.image ? (
                           <Image src={p.image} alt={p.name} fill className="object-cover" />
                        ) : (
                           <Package size={24} />
                        )}
                     </div>
                     <div>
                        <div className="text-[8px] font-black text-blue-500 uppercase tracking-[0.3em] mb-1">{p.subCategory} | {parentService?.name || "Service Unit"}</div>
                        <div className="text-xl font-black text-white uppercase italic tracking-tighter">{p.name}</div>
                        <div className="text-xl font-black text-green-500 mt-1">₹{p.price}</div>
                     </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-6 md:mt-0">
                     <button onClick={() => handleEdit(p)} className="p-4 bg-white/5 text-gray-400 hover:text-white rounded-2xl transition border border-white/5"><Edit3 size={18}/></button>
                     <button onClick={() => handleDelete(p._id)} className="p-4 bg-red-500/10 text-red-500/50 hover:text-red-500 rounded-2xl transition border border-red-500/10"><Trash2 size={18}/></button>
                  </div>
               </div>
             );
           })}
           {products.length === 0 && (
              <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem] text-gray-600 font-bold uppercase tracking-widest text-xs">Inventory is empty. Add your first service package.</div>
           )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-950/80 backdrop-blur-md">
           <div className="bg-gray-900 border border-white/10 w-full max-w-3xl rounded-[3.5rem] p-12 space-y-8 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar">
              <div className="flex justify-between items-center">
                 <h2 className="text-4xl font-black text-white italic tracking-tighter uppercase">{editId ? 'Modify Package.' : 'Package Entry.'}</h2>
                 <button onClick={handleCloseModal} className="p-3 bg-white/5 rounded-full hover:bg-white/10 text-gray-500 transition-all"><X size={20}/></button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                 {/* Image Upload Area */}
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center bg-white/5 p-8 rounded-[2.5rem] border border-white/5 relative group">
                    <div className="md:col-span-1 aspect-square bg-gray-950 rounded-3xl border border-white/10 overflow-hidden relative group-hover:border-blue-500/50 transition-all flex items-center justify-center">
                       {uploading ? (
                          <Loader2 className="animate-spin text-blue-500" size={32} />
                       ) : formData.image ? (
                          <Image src={formData.image} alt="Preview" fill className="object-cover" />
                       ) : (
                          <ImageIcon className="text-gray-800" size={48} />
                       )}
                    </div>
                    
                    <div className="md:col-span-2 space-y-4">
                       <h4 className="text-xs font-black text-white uppercase tracking-widest italic">Visual Identity Asset</h4>
                       <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed">Upload a high-resolution product image. Supported formats: JPG, PNG, WEBP. Max size 2MB.</p>
                       
                       <label className="inline-flex items-center space-x-3 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black text-white uppercase tracking-widest cursor-pointer hover:bg-blue-600 hover:border-blue-600 transition-all active:scale-95 shadow-lg">
                          <Camera size={16} />
                          <span>{formData.image ? 'Replace Digital Asset' : 'Upload Digital Asset'}</span>
                          <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploading} />
                       </label>
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Package Name</label>
                       <input 
                         required
                         value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-blue-500 transition-all uppercase tracking-widest text-xs"
                         placeholder="E.G. JET PUMP CLEANING"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Package Price (INR)</label>
                       <input 
                         type="number"
                         required
                         value={formData.price}
                         onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                         className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-blue-500 transition-all uppercase tracking-widest text-xs"
                         placeholder="499"
                       />
                    </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Parent Service</label>
                       <select 
                         required
                         value={formData.serviceId}
                         onChange={(e) => setFormData({...formData, serviceId: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-blue-500 transition-all uppercase tracking-widest text-[10px] cursor-pointer"
                       >
                          <option value="" className="bg-gray-900">SELECT SERVICE</option>
                          {services.map(s => (
                             <option key={s._id} value={s._id} className="bg-gray-900">{s.name.toUpperCase()}</option>
                          ))}
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Operation Type</label>
                       <select 
                         value={formData.subCategory}
                         onChange={(e) => setFormData({...formData, subCategory: e.target.value})}
                         className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-blue-500 transition-all uppercase tracking-widest text-[10px] cursor-pointer"
                       >
                          <option value="SERVICE" className="bg-gray-900 text-white">GENERAL SERVICE</option>
                          <option value="REPAIR" className="bg-gray-900 text-white">REPAIR DESPATCH</option>
                          <option value="INSTALLATION" className="bg-gray-900 text-white">PRO INSTALLATION</option>
                       </select>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Package Description</label>
                    <textarea 
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white font-bold outline-none focus:border-blue-500 transition-all uppercase tracking-widest text-xs h-32"
                      placeholder="ENTER DETAILED SPECIFICATIONS..."
                    ></textarea>
                 </div>

                 <div className="flex items-center space-x-6 pt-10">
                    <button type="submit" disabled={uploading} className="flex-1 py-6 bg-blue-600 text-white rounded-3xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-500/20 transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                       {editId ? 'Apply Strategic Updates' : 'Publish Asset to Catalog'}
                    </button>
                    <button type="button" onClick={handleCloseModal} className="px-10 py-6 bg-white/5 text-gray-400 rounded-3xl font-black text-[10px] uppercase tracking-widest border border-white/5 hover:bg-white/10 transition-all">Abort</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
}

// Re-importing X as it was missed in manual write
const X = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);
