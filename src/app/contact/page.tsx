"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  PhoneCall, 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  ArrowRight,
  Globe
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50/50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-neutral-900 pt-32 pb-48 px-4 shadow-xl text-center relative overflow-hidden">
         <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -ml-48 -mt-48" />
         <div className="container mx-auto relative z-10 max-w-4xl">
            <h1 className="text-6xl font-black text-white italic uppercase tracking-tighter mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700">Contact Bureau.</h1>
            <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-xs">Direct Channel for Jaipur Operational Assistance</p>
         </div>
      </section>

      {/* Main Info Section */}
      <section className="py-24 px-4 -mt-32 relative z-20">
         <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
               
               {/* Contact Card 1 */}
               <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-gray-100 space-y-8 animate-in fade-in slide-in-from-bottom-10 hover:shadow-2xl transition-all duration-500">
                  <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center">
                     <PhoneCall size={32} />
                  </div>
                  <div className="space-y-2">
                     <h3 className="text-2xl font-black italic uppercase tracking-tighter">Support Desk.</h3>
                     <p className="text-gray-500 text-sm font-medium">Connect with our Jaipur operations desk for immediate assistance.</p>
                  </div>
                  <a href="tel:+919876543210" className="block text-2xl font-black italic uppercase tracking-tighter text-blue-600 hover:underline">+91 98765 43210</a>
               </div>

               {/* Contact Card 2 */}
               <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-gray-100 space-y-8 animate-in fade-in slide-in-from-bottom-10 delay-100 hover:shadow-2xl transition-all duration-500">
                  <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center">
                     <Mail size={32} />
                  </div>
                  <div className="space-y-2">
                     <h3 className="text-2xl font-black italic uppercase tracking-tighter">Email Bureau.</h3>
                     <p className="text-gray-500 text-sm font-medium">Send us your strategic inquiries and professional service requisitions.</p>
                  </div>
                  <a href="mailto:support@localpankaj.com" className="block text-2xl font-black italic uppercase tracking-tighter text-blue-600 hover:underline">support@localpankaj.com</a>
               </div>

               {/* Contact Card 3 */}
               <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-gray-100 space-y-8 animate-in fade-in slide-in-from-bottom-10 delay-200 hover:shadow-2xl transition-all duration-500">
                  <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center">
                     <MapPin size={32} />
                  </div>
                  <div className="space-y-2">
                     <h3 className="text-2xl font-black italic uppercase tracking-tighter">Local Hub.</h3>
                     <p className="text-gray-500 text-sm font-medium">Our central strategic hub located in the heart of Jaipur, Rajasthan.</p>
                  </div>
                  <div className="text-2xl font-black italic uppercase tracking-tighter text-gray-950">Mansarovar, Jaipur-302020</div>
               </div>

            </div>

            {/* Form Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 py-32 items-center">
               <div className="space-y-10">
                  <h2 className="text-5xl font-black text-gray-950 uppercase italic tracking-tighter leading-none">Initialize Strategic Inquiry.</h2>
                  <p className="text-gray-500 font-medium leading-relaxed text-lg italic">Our coordination desk is on standby for your Jaipur dispatch request. Please fill out the requisition form for priority handling.</p>
                  
                  <div className="space-y-6">
                     <div className="flex items-center space-x-4 border-b border-gray-100 pb-6 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                        <Clock size={16} className="text-blue-600" />
                        <span>OPERATIONAL HOURS: MON - SUN (09:00 AM - 09:00 PM)</span>
                     </div>
                     <div className="flex items-center space-x-4 border-b border-gray-100 pb-6 text-gray-400 font-bold uppercase tracking-widest text-[10px]">
                        <Globe size={16} className="text-blue-600" />
                        <span>GEOGRAPHICAL RANGE: JAIPUR METROPOLITAN REGION</span>
                     </div>
                  </div>
               </div>

               <div className="bg-neutral-900 p-16 rounded-[4rem] shadow-2xl space-y-10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 blur-[100px] rounded-full -mr-24 -mt-24 group-hover:bg-blue-600/20 transition-all duration-700" />
                  
                  <form className="space-y-8">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">User Identity</label>
                           <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white font-bold outline-none focus:border-blue-500 transition-all uppercase tracking-widest text-xs" placeholder="ENTER NAME" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Registry Contact</label>
                           <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white font-bold outline-none focus:border-blue-500 transition-all uppercase tracking-widest text-xs" placeholder="+91-0000000000" />
                        </div>
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Dispatch Address (Jaipur)</label>
                        <input className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white font-bold outline-none focus:border-blue-500 transition-all uppercase tracking-widest text-xs" placeholder="LOCALITY, AREA CODE..." />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Service Requisition</label>
                        <textarea className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-5 text-white font-bold outline-none focus:border-blue-500 transition-all uppercase tracking-widest text-xs h-32" placeholder="DESCRIBE YOUR TECHNICAL FAULT..."></textarea>
                     </div>
                     <button className="w-full flex items-center justify-center space-x-4 bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-2xl shadow-blue-500/10 active:scale-95 group">
                        <span>Deploy Inquiry</span>
                        <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
