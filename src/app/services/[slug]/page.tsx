"use client";
import React, { useEffect, useState, use } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadPopup from "@/components/LeadPopup";
import { 
  CheckCircle2, 
  ArrowRight,
  WashingMachine,
  Hammer,
  Settings,
  Plus,
  ShoppingCart,
  ChevronRight
} from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [service, setService] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const servicesRes = await axios.get("/api/services");
        const found = servicesRes.data.find((s: any) => s.slug === slug);
        setService(found);

        if (found) {
           const productsRes = await axios.get(`/api/products?serviceId=${found._id}`);
           setProducts(productsRes.data || []);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const addToCart = (product: any) => {
    try {
      const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const updatedCart = [...existingCart, { ...product, category: service.category, serviceName: service.name, cartId: Date.now() }];
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      
      // Manually trigger storage event for the current window (since header is in the same window)
      window.dispatchEvent(new Event('storage'));
      
      toast.success(`${product.name} added to cart!`);
    } catch (err) {
      toast.error("Process interrupted");
    }
  };

  if (loading) return <div className="min-h-screen bg-white"></div>;
  if (!service) return <div className="min-h-screen bg-white flex items-center justify-center font-black uppercase text-gray-400 tracking-widest">Service Unit Offline</div>;

  const groupedProducts = {
    SERVICE: products.filter(p => p.subCategory === "SERVICE"),
    REPAIR: products.filter(p => p.subCategory === "REPAIR"),
    INSTALLATION: products.filter(p => p.subCategory === "INSTALLATION"),
  };

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <LeadPopup />

      {/* Hero Header */}
      <section className="bg-neutral-900 border-t border-white/5 pt-32 pb-12 px-4 shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
         <div className="container mx-auto relative z-10">
            <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight">Service Details</h1>
            <nav className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-500">
               <a href="/" className="hover:text-blue-500 transition">Home</a>
               <span>/</span>
               <span className="text-gray-400 capitalize">{service.category?.toLowerCase() || "Service"} Repair</span>
               <span>/</span>
               <span className="text-gray-300">{service.name}</span>
            </nav>
         </div>
      </section>

      {/* Overview Block */}
      <section className="py-20 px-4">
         <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
               <div className="space-y-8 animate-in fade-in slide-in-from-left-10 duration-700">
                  <h2 className="text-5xl font-black text-gray-950 uppercase italic tracking-tighter leading-none">{service.name}</h2>
                  
                  <div className="space-y-6 text-gray-600 leading-relaxed font-medium text-lg">
                     <p>
                        Local Pankaj provides same-day <strong className="text-orange-600 underline underline-offset-4 decoration-orange-200">{service.name.toLowerCase()} repair service in Jaipur</strong>. 
                        If you need to schedule a complaint for <strong className="text-orange-600">semi-automatic</strong> or <strong className="text-orange-600">fully automatic</strong> {service.name.toLowerCase()} repair or servicing, you can book them here.
                     </p>
                     
                     <p>
                        Our expert technicians are well-versed in diagnosing and resolving various {service.name.toLowerCase()} issues. 
                        Whether you need repairs, installations, or routine maintenance, our team has you covered.
                     </p>
                  </div>

                  <div className="flex flex-wrap gap-4 pt-6">
                     <ServiceFeatureBox onClick={() => scrollToSection('section-service')} icon={<WashingMachine size={32}/>} label="Service" count={groupedProducts.SERVICE.length} />
                     <ServiceFeatureBox onClick={() => scrollToSection('section-repair')} icon={<Settings size={32}/>} label="Repair" count={groupedProducts.REPAIR.length} />
                     <ServiceFeatureBox onClick={() => scrollToSection('section-installation')} icon={<Hammer size={32}/>} label="Installation" count={groupedProducts.INSTALLATION.length} />
                  </div>
               </div>

               <div className="relative animate-in fade-in slide-in-from-right-10 duration-700">
                  <div className="absolute -inset-4 bg-blue-50 rounded-[3rem] -z-10 transform scale-95" />
                  <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white bg-gray-50 flex items-center justify-center">
                     <Image 
                        src="/expert.png" 
                        alt="Service Expert" 
                        width={800} 
                        height={800} 
                        className="w-full h-auto object-contain transition-transform duration-700 hover:scale-105"
                     />
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Dynamic Inventory Sections */}
      <section className="pb-32 px-4 space-y-24">
         <div className="container mx-auto">
            {/* Service Section */}
            <div id="section-service" className="space-y-10 scroll-mt-32">
               <SectionHeader title="Operational Service" subtitle="Regular Maintenance Packages" />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {groupedProducts.SERVICE.map(p => <ProductCard key={p._id} product={p} onAdd={() => addToCart(p)} />)}
                  {groupedProducts.SERVICE.length === 0 && <EmptyState label="General Service Packages" />}
               </div>
            </div>

            {/* Repair Section */}
            <div id="section-repair" className="space-y-10 mt-24 scroll-mt-32">
               <SectionHeader title="Technical Repair" subtitle="Expert Fault Resolution" />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {groupedProducts.REPAIR.map(p => <ProductCard key={p._id} product={p} onAdd={() => addToCart(p)} />)}
                  {groupedProducts.REPAIR.length === 0 && <EmptyState label="Technical Repair Units" />}
               </div>
            </div>

            {/* Installation Section */}
            <div id="section-installation" className="space-y-10 mt-24 scroll-mt-32">
               <SectionHeader title="Pro Installation" subtitle="Certified System Setup" />
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {groupedProducts.INSTALLATION.map(p => <ProductCard key={p._id} product={p} onAdd={() => addToCart(p)} />)}
                  {groupedProducts.INSTALLATION.length === 0 && <EmptyState label="Installation Specialists" />}
               </div>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}

const ServiceFeatureBox = ({ icon, label, count, onClick }: any) => (
  <button onClick={onClick} className="flex-1 min-w-[120px] bg-white border-2 border-[#2b549e] rounded-2xl p-6 flex flex-col items-center justify-center text-center group hover:bg-[#2b549e] transition-all transform active:scale-95 shadow-sm hover:shadow-xl">
     <div className="text-[#2b549e] group-hover:text-white mb-3 transition-colors">
        {icon}
     </div>
     <div className="text-[10px] font-black text-[#2b549e] group-hover:text-white uppercase tracking-widest transition-colors">{label}</div>
     {count > 0 && (
        <div className="mt-2 text-[8px] font-bold text-gray-400 group-hover:text-blue-200 transition-colors uppercase">{count} Packages</div>
     )}
  </button>
);

const SectionHeader = ({ title, subtitle }: any) => (
  <div className="flex flex-col space-y-2 border-l-4 border-blue-600 pl-6">
     <div className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em]">{subtitle}</div>
     <h3 className="text-4xl font-black text-gray-950 uppercase italic tracking-tighter">{title}</h3>
  </div>
);

const ProductCard = ({ product, onAdd }: any) => (
  <div className="bg-white border border-gray-100 rounded-[2rem] p-8 flex flex-col sm:flex-row items-center justify-between group hover:border-blue-600 transition-all hover:shadow-2xl relative overflow-hidden">
     <div className="flex items-center space-x-6">
        <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 flex items-center justify-center relative shadow-inner">
           {product.image ? (
              <Image src={product.image} alt={product.name} fill className="object-cover" />
           ) : (
              <ShoppingCart className="text-gray-200" size={40} />
           )}
        </div>
        <div className="space-y-1">
           <h4 className="text-lg font-black text-gray-900 uppercase italic leading-tight">{product.name}</h4>
           <div className="text-2xl font-black text-blue-600">₹{product.price}</div>
           <button className="text-[10px] font-bold text-blue-500 hover:text-blue-700 uppercase tracking-widest flex items-center space-x-1 transition-colors">
              <span>View Details</span>
              <ChevronRight size={12} />
           </button>
        </div>
     </div>
     
     <button 
        onClick={onAdd}
        className="mt-6 sm:mt-0 px-8 py-4 bg-[#2b549e] text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all transform active:scale-90 flex items-center space-x-2 shadow-lg shadow-blue-500/10"
     >
        <Plus size={16} />
        <span>Add Unit</span>
     </button>
  </div>
);

const EmptyState = ({ label }: any) => (
  <div className="col-span-full py-16 text-center border-2 border-dashed border-gray-100 rounded-[2.5rem] bg-gray-50/30">
     <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic leading-relaxed">
        Registry Update in Progress:<br />
        {label} are being calibrated.
     </div>
  </div>
);
