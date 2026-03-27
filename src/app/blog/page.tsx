"use client";
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  ArrowRight, 
  Calendar, 
  User, 
  Tag, 
  ChevronRight,
  ChevronLeft
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "EXTENDING THE LIFESPAN OF YOUR AC DURING JAIPUR SUMMERS",
      excerpt: "Professional tips and regular maintenance strategies to keep your AC performing at its best during the intense heat of Jaipur.",
      date: "MAR 22, 2026",
      category: "MAINTENANCE",
      author: "Local Pankaj Bureau",
      image: "https://images.unsplash.com/photo-1558227751-f3b15401183c?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 2,
      title: "THE IMPORTANCE OF REGULAR RO SERVICING",
      excerpt: "Explaining how hard water in Jaipur affects your RO system and why regular servicing is crucial for your family's health.",
      date: "MAR 18, 2026",
      category: "WATER PURITY",
      author: "P-ADMIN Desk",
      image: "https://images.unsplash.com/photo-1585704032915-c3400ca1f963?auto=format&fit=crop&q=80&w=800"
    },
    {
      id: 3,
      title: "PREVENTING ELECTRICAL FAULTS IN RESIDENTIAL BUILDINGS",
      excerpt: "Essential guide to identifying early signs of electrical issues and when it's critical to call a professional electrician.",
      date: "MAR 15, 2026",
      category: "SAFETY GUIDE",
      author: "System Support",
      image: "https://images.unsplash.com/photo-1558227751-f3b15401183c?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50/50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-neutral-900 pt-32 pb-24 px-4 shadow-xl">
         <div className="container mx-auto">
            <h1 className="text-6xl font-black text-white italic uppercase tracking-tighter mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700">Journal & Blog.</h1>
            <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-xs">Professional Insights from the Service Bureau</p>
         </div>
      </section>

      {/* Featured Articles Section */}
      <section className="py-24 px-4">
         <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
               
               {/* Blog Post List */}
               <div className="lg:col-span-8 space-y-16">
                  {posts.map((post, idx) => (
                     <article key={post.id} className="group bg-white rounded-[3.5rem] p-12 shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 animate-in fade-in zoom-in-95" style={{ animationDelay: `${idx * 200}ms` }}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                           <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden relative shadow-2xl">
                              <Image 
                                 src={post.image} 
                                 alt={post.title} 
                                 fill 
                                 className="object-cover group-hover:scale-110 transition-transform duration-700"
                              />
                           </div>
                           <div className="space-y-6">
                              <div className="flex items-center space-x-4">
                                 <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest px-4 py-1 rounded-full">{post.category}</span>
                                 <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">{post.date}</span>
                              </div>
                              <h2 className="text-3xl font-black text-gray-950 uppercase italic tracking-tighter leading-none group-hover:text-blue-600 transition-colors">{post.title}</h2>
                              <p className="text-gray-500 font-medium leading-relaxed leading-7 text-sm">
                                 {post.excerpt}
                              </p>
                              <Link href={`/blog/${post.id}`} className="inline-flex items-center space-x-3 px-8 py-4 bg-gray-50 text-gray-950 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95">
                                 <span>Read Article</span>
                                 <ArrowRight size={16} />
                              </Link>
                           </div>
                        </div>
                     </article>
                  ))}

                  {/* Pagination */}
                  <div className="flex items-center justify-center space-x-4 pt-10">
                     <button className="p-4 bg-white rounded-2xl border border-gray-100 text-gray-400 hover:text-blue-600 transition shadow-sm"><ChevronLeft size={20} /></button>
                     <div className="flex items-center space-x-2">
                        <button className="w-12 h-12 bg-blue-600 text-white rounded-2xl font-black text-xs shadow-lg">01</button>
                        <button className="w-12 h-12 bg-white text-gray-400 rounded-2xl font-black text-xs border border-gray-100 hover:text-blue-600 transition">02</button>
                     </div>
                     <button className="p-4 bg-white rounded-2xl border border-gray-100 text-gray-400 hover:text-blue-600 transition shadow-sm"><ChevronRight size={20} /></button>
                  </div>
               </div>

               {/* Sidebar Widgets */}
               <div className="lg:col-span-4 space-y-12 sticky top-32">
                  <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100 space-y-10">
                     <h3 className="text-2xl font-black italic tracking-tighter uppercase border-b border-gray-100 pb-4">Dispatch Bureau.</h3>
                     <div className="space-y-4">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-relaxed mb-6">Receive strategic home maintenance alerts on your terminal.</p>
                        <input className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-[10px] font-black uppercase tracking-widest outline-none focus:border-blue-600 transition-all" placeholder="USER EMAIL@DOMAIN.COM" />
                        <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/10 active:scale-95 transition-all">Subscribe</button>
                     </div>
                  </div>

                  <div className="bg-neutral-900 p-10 rounded-[3rem] shadow-2xl text-white relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full -mr-16 -mt-16" />
                     <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-6 relative z-10">Need Support?</h3>
                     <p className="text-gray-400 text-xs font-bold leading-relaxed mb-8 relative z-10">Connect with our Jaipur operations desk for immediate assistance.</p>
                     <a href="tel:+919876543210" className="block text-center py-4 bg-white text-gray-950 rounded-2xl font-black text-[10px] uppercase tracking-widest relative z-10 hover:shadow-xl transition-all">Dispatch Call</a>
                  </div>
               </div>

            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
