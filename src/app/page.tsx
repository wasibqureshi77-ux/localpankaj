"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import * as LucideIcons from "lucide-react";
import { 
  CheckCircle2, 
  Star, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  UserCheck,
  Settings2
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadPopup from "@/components/LeadPopup";

const HomePage = () => {
  const [services, setServices] = useState<any[]>([]);
  const [config, setConfig] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, configRes] = await Promise.all([
          axios.get("/api/services"),
          axios.get("/api/site-config")
        ]);
        setServices(servicesRes.data || []);
        setConfig(configRes.data || null);
      } catch (err) {
        console.error("Home data fetch error:", err);
      }
    };
    fetchData();
  }, []);

  const applianceServices = services.filter(s => s.category === "APPLIANCE");
  const homeServices = services.filter(s => s.category === "HOME");

  return (
    <main className="min-h-screen relative font-sans text-gray-900 bg-white">
      <Header />
      <LeadPopup />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gray-950 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
           <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/80 to-transparent z-10" />
           <div className="w-full h-full bg-[url('/hero-bg.jpg')] bg-cover bg-center" />
        </div>

        <div className="container mx-auto px-4 pt-48 md:pt-60 relative z-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 font-bold text-xs uppercase tracking-widest mb-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
               <Star size={14} className="fill-current" />
               <span>#1 Rated Home Service in Jaipur</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.1] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
               {config?.heroText || "Reliable"} <span className="text-blue-500 italic">{config?.heroText ? "" : "Home Services"}</span> {config?.heroText ? "" : "at Your Doorstep."}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
               {config?.heroSubtitle || "Expert AC repair, RO maintenance, and professional house cleaning across Jaipur. Book in 60 seconds."}
            </p>

            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
               <button className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 transform hover:-translate-y-1">
                  Book a Service
               </button>
               <a href={`tel:${config?.phone || "+919876543210"}`} className="flex items-center space-x-3 text-white font-bold text-lg hover:text-blue-400 transition-colors group">
                  <span className="p-3 rounded-full border border-blue-500/30 group-hover:bg-blue-500/10 transition-all">
                     <LucideIcons.Phone size={24} />
                  </span>
                  <span>Contact Now</span>
               </a>
            </div>
          </div>
        </div>
      </section>

      {/* Appliance Repair Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
           {/* Section Label */}
           <div className="flex flex-col items-center mb-12">
              <div className="flex items-center space-x-2 text-orange-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4">
                 <span>{">>>>>"}</span>
                 <span>OUR SERVICES</span>
                 <span>{"<<<<<"}</span>
              </div>
              <h2 className="text-4xl font-black text-gray-900 tracking-tight italic">Appliance Repair</h2>
           </div>

           {/* Grid */}
           <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {applianceServices.map((s) => (
                <ServiceBox 
                  key={s._id}
                  iconName={s.iconName} 
                  label={s.name} 
                  href={`/services/${s.slug}`} 
                />
              ))}
              {applianceServices.length === 0 && (
                 <div className="col-span-full py-20 text-center text-gray-400 font-bold uppercase tracking-widest italic opacity-50">Configuring Appliance Grid...</div>
              )}
           </div>
        </div>
      </section>

      {/* Home Repair Section */}
      <section className="py-20 bg-[#2b549e]">
        <div className="container mx-auto px-4">
           <h2 className="text-4xl font-black text-white text-center mb-16 tracking-tight italic text-shadow-sm">Home Repair</h2>
           <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
              {homeServices.map((s) => (
                <HomeRepairBox 
                  key={s._id}
                  iconName={s.iconName} 
                  label={s.name} 
                  href={`/services/${s.slug}`} 
                />
              ))}
              {homeServices.length === 0 && (
                 <div className="w-full py-20 text-center text-white/30 font-bold uppercase tracking-widest italic">Configuring Home Registry...</div>
              )}
           </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-white border-y border-gray-100 overflow-hidden">
         <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="relative">
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50" />
                  <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border border-gray-50">
                     <Image 
                        src="/jaipur-expert.png" 
                        alt="Jaipur Service Expert" 
                        width={600} 
                        height={500} 
                        className="w-full h-[500px] object-cover"
                     />
                     <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-sm p-6 rounded-2xl border border-white/40 shadow-xl">
                        <div className="flex items-center space-x-4">
                           <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white">
                              <UserCheck size={24} />
                           </div>
                           <div>
                              <div className="font-bold text-gray-900">Verified Professionals</div>
                              <div className="text-sm text-gray-500 font-medium">Background checked experts.</div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="space-y-10">
                  <div className="inline-block px-4 py-2 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs uppercase tracking-widest">The Local Pankaj Advantage</div>
                  <h2 className="text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                    {config?.aboutTitle || "Why Jaipur Trusts Us."}
                  </h2>
                  
                  <div className="space-y-8">
                     {features.map((f, i) => (
                        <div key={i} className="flex items-start space-x-5">
                           <div className="p-3 rounded-2xl bg-gray-50 text-blue-600">
                              {f.icon}
                           </div>
                           <div>
                              <h4 className="text-xl font-bold text-gray-900 mb-1">{f.title}</h4>
                              <p className="text-gray-500 font-medium">{f.desc}</p>
                           </div>
                        </div>
                     ))}
                  </div>

                  <div className="p-8 bg-blue-50/50 rounded-3xl border border-blue-100/50 italic text-gray-600 font-medium">
                     "{config?.aboutText || "We are dedicated to providing the best home services in Jaipur."}"
                  </div>

                  <button className="px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all flex items-center space-x-3">
                     <span>Learn More About Us</span>
                     <ArrowRight size={18} />
                  </button>
               </div>
            </div>
         </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
         <div className="container mx-auto px-4">
            <div className="text-center mb-16">
               <h2 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-tighter italic shadow-sm bg-blue-600 inline-block px-4 text-white">Clients Love Us</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
               {[1,2,3].map((_, i) => (
                  <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative group overflow-hidden">
                     <div className="flex space-x-1 text-yellow-400 mb-6">
                        {[1,2,3,4,5].map(s => <Star key={s} size={20} fill="currentColor" />)}
                     </div>
                     <p className="text-gray-700 font-medium italic mb-8 leading-relaxed text-sm">
                        "Exceptional service! The technician arrived exactly on time and fixed our RO within 30 minutes. High recommended for anyone in Jaipur."
                     </p>
                     <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full" />
                        <div>
                           <div className="font-bold text-gray-900">Anjali Sharma</div>
                           <div className="text-xs text-gray-500">Vaishali Nagar, Jaipur</div>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
};

const DynamicIcon = ({ name, size = 40 }: { name: string, size?: number }) => {
  const IconComponent = (LucideIcons as any)[name] || Settings2;
  return <IconComponent size={size} />;
};

const ServiceBox = ({ iconName, label, href }: any) => (
  <Link href={href} className="bg-white border border-gray-100 rounded-3xl p-8 flex flex-col items-center justify-center text-center group hover:border-blue-600 transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden">
     <div className="absolute top-0 left-0 right-0 h-1 bg-orange-500 transform -translate-y-full group-hover:translate-y-0 transition-transform" />
     <div className="text-blue-900 group-hover:scale-110 transition-transform mb-6">
        <DynamicIcon name={iconName} />
     </div>
     <div className="text-[10px] font-black text-gray-950 uppercase tracking-widest leading-relaxed">{label}</div>
  </Link>
);

const HomeRepairBox = ({ iconName, label, href }: any) => (
  <Link href={href} className="w-full md:w-56 h-48 bg-[#1e448a] border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center group hover:bg-[#15346d] transition-all relative overflow-hidden shadow-2xl">
     <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-white transform -translate-y-full group-hover:translate-y-0 transition-transform" />
     <div className="text-white mb-6 transform group-hover:-translate-y-2 transition-transform">
        <DynamicIcon name={iconName} />
     </div>
     <div className="text-[10px] font-black text-white uppercase tracking-[0.2em]">{label}</div>
  </Link>
);

const features = [
  {
     title: "No Hidden Costs",
     desc: "Upfront pricing before we start any work. No surprise charges.",
     icon: <ShieldCheck size={28} />
  },
  {
     title: "60-Min Response",
     desc: "Our technicians are always nearby to reach you within the hour.",
     icon: <Clock size={28} />
  },
  {
     title: "Quality Spares",
     desc: "We only use 100% genuine parts with 6-month warranty.",
     icon: <CheckCircle2 size={28} />
  }
];

export default HomePage;
