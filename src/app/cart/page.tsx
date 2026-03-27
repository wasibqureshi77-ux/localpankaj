"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Trash2, 
  ArrowRight, 
  ShoppingCart, 
  ChevronLeft,
  Calendar,
  MapPin,
  Clock
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-hot-toast";

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      setItems(savedCart);
      setLoading(false);
    };
    loadCart();
    
    // Listen for updates
    window.addEventListener('storage', loadCart);
    return () => window.removeEventListener('storage', loadCart);
  }, []);

  const removeFromCart = (cartId: number) => {
    const updated = items.filter(i => i.cartId !== cartId);
    setItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
    toast.success("Item removed");
  };

  const total = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <main className="min-h-screen bg-gray-50/50 font-sans">
      <Header />
      
      {/* Dynamic Header */}
      <section className="bg-neutral-900 pt-32 pb-12 px-4 shadow-xl">
         <div className="container mx-auto">
            <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight uppercase italic">Service Basket.</h1>
            <nav className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
               <Link href="/" className="hover:text-blue-500 transition">Home</Link>
               <span>/</span>
               <span className="text-gray-300">Cart Inventory</span>
            </nav>
         </div>
      </section>

      <section className="py-20 px-4">
         <div className="container mx-auto max-w-6xl">
            {loading ? (
               <div className="py-20 text-center text-gray-400 font-black uppercase tracking-[0.5em] text-xs">Syncing Basket...</div>
            ) : items.length === 0 ? (
               <div className="text-center py-24 bg-white rounded-[3rem] border-2 border-dashed border-gray-200 shadow-sm animate-in fade-in zoom-in-95 duration-700">
                  <div className="w-24 h-24 bg-gray-50 rounded-3xl mx-auto flex items-center justify-center text-gray-300 mb-8 border border-gray-100">
                     <ShoppingCart size={40} />
                  </div>
                  <h2 className="text-3xl font-black text-gray-950 uppercase italic tracking-tighter mb-4">Your basket is empty.</h2>
                  <p className="text-gray-500 font-medium mb-12 max-w-md mx-auto">Looks like you haven't added any professional services to your Jaipur dispatch list yet.</p>
                  <Link href="/#services" className="inline-flex items-center space-x-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95">
                     <ChevronLeft size={16} />
                     <span>Browse Categories</span>
                  </Link>
               </div>
            ) : (
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
                  {/* Cart Items List */}
                  <div className="lg:col-span-2 space-y-6">
                     <div className="flex items-center justify-between px-6 mb-4">
                        <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Scheduled Registry ({items.length})</div>
                        <button onClick={() => { localStorage.setItem("cart", "[]"); window.dispatchEvent(new Event('storage')); }} className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline">Clear Basket</button>
                     </div>

                     {items.map((item) => (
                        <div key={item.cartId} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between group hover:shadow-xl transition-all animate-in slide-in-from-left-4 duration-500">
                           <div className="flex items-center space-x-6">
                              <div className="w-20 h-20 bg-gray-50 rounded-2xl border border-gray-100 flex items-center justify-center overflow-hidden relative shadow-inner">
                                 {item.image ? (
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                 ) : (
                                    <ShoppingCart className="text-gray-200" size={32} />
                                 )}
                              </div>
                              <div className="space-y-1">
                                 <div className="text-[8px] font-black text-blue-500 uppercase tracking-widest">{item.subCategory} SERVICE</div>
                                 <h3 className="text-lg font-black text-gray-950 uppercase italic tracking-tighter">{item.name}</h3>
                                 <div className="text-xl font-black text-blue-600">₹{item.price}</div>
                              </div>
                           </div>
                           
                           <button 
                              onClick={() => removeFromCart(item.cartId)}
                              className="p-4 bg-red-50/50 text-red-500/50 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all border border-transparent hover:border-red-100"
                           >
                              <Trash2 size={20} />
                           </button>
                        </div>
                     ))}
                  </div>

                  {/* Summary Sidebar */}
                  <div className="space-y-8 sticky top-32">
                     <div className="bg-neutral-900 p-10 rounded-[3rem] shadow-2xl text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full -mr-16 -mt-16" />
                        
                        <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-8 relative z-10">Dispatch Summary.</h3>
                        
                        <div className="space-y-4 mb-8 border-b border-white/10 pb-8 relative z-10">
                           <div className="flex justify-between text-xs font-bold text-gray-400">
                              <span>Sub-Total Units</span>
                              <span className="text-white">₹{total}</span>
                           </div>
                           <div className="flex justify-between text-xs font-bold text-gray-400">
                              <span>Jaipur Conveyance</span>
                              <span className="text-green-500 uppercase tracking-widest font-black">Free</span>
                           </div>
                        </div>

                        <div className="flex justify-between items-end mb-10 relative z-10">
                           <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Payable</div>
                           <div className="text-4xl font-black italic tracking-tighter">₹{total}</div>
                        </div>

                        <div className="space-y-4 mb-10">
                           <div className="flex items-center space-x-3 text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                              <Calendar size={12} className="text-blue-500" />
                              <span>Instant Dispatch Available</span>
                           </div>
                           <div className="flex items-center space-x-3 text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                              <MapPin size={12} className="text-blue-500" />
                              <span>Verified Jaipur Experts</span>
                           </div>
                        </div>

                        <button className="w-full flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-blue-500/10 active:scale-95 group">
                           <span>Initialize Checkout</span>
                           <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                     </div>

                     <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-blue-600">
                           <Clock size={24} />
                        </div>
                        <div>
                           <div className="text-[10px] font-black text-gray-950 uppercase tracking-widest">Technician ETA</div>
                           <div className="text-xs font-bold text-gray-500">Scheduled within 60 mins of Dispatch</div>
                        </div>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </section>

      <Footer />
    </main>
  );
}
