"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Users, Clock, Award } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-[#1a1a1a] pt-16 pb-12 px-5 border-t-4 border-blue-600">
         <div className="max-w-[1240px] mx-auto text-left">
            <h1 className="text-3xl sm:text-5xl font-black text-white mb-4 animate-in fade-in slide-in-from-left-4 duration-500">
               About Us
            </h1>
            <nav className="flex items-center space-x-2 text-sm sm:text-base font-medium text-gray-400">
               <Link href="/" className="hover:text-white transition-colors">Home</Link>
               <span className="text-gray-600">/</span>
               <span className="text-white">About Us</span>
            </nav>
         </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-4">
         <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-10 animate-in fade-in slide-in-from-left-10 duration-700">
                  <h2 className="text-5xl lg:text-5xl font-bold text-gray-950 leading-tight">Jaipur's Dedicated Service Force.</h2>
                  <p className="text-gray-600 leading-loose text-lg">
                    Local Pankaj was founded with a singular mission: to provide the residence of Jaipur with a transparent, efficient, and professional home maintenance experience. We understand that your home is your most valuable asset, and it deserves the highest standard of care.
                  </p>
                  <p className="text-gray-600 leading-loose text-lg">
                    With a team of certified technicians spanning across Mansarovar, Vaishali Nagar, Malviya Nagar, and surrounding Jaipur localities, we've built a reputation for same-day dispatch and quality fault resolution.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                     <div className="space-y-4">
                        <Award className="text-blue-600" size={32} />
                        <div className="text-[10px] font-black tracking-widest text-gray-400">Experience</div>
                        <div className="text-2xl font-black  text-gray-950">10+ Years</div>
                     </div>
                     <div className="space-y-4">
                        <Users className="text-blue-600" size={32} />
                        <div className="text-[10px] font-black tracking-widest text-gray-400">Technicians</div>
                        <div className="text-2xl font-black  text-gray-950">50+ Certified</div>
                     </div>
                  </div>
               </div>

               <div className="relative animate-in fade-in slide-in-from-right-10 duration-700">
                  <div className="absolute -inset-4 bg-orange-100 rounded-[3rem] -z-10 transform scale-95" />
                  <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white h-[600px]">
                     <Image 
                        src="/jaipur-expert.png" 
                        alt="Local Pankaj Team" 
                        width={800} 
                        height={1000} 
                        className="w-full h-full object-cover"
                     />
                  </div>
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}

