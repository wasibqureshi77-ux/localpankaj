import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2, Info, ArrowRight, ShieldCheck, MapPin, Star } from "lucide-react";
import LeadPopup from "@/components/LeadPopup";

interface PageProps {
  params: Promise<{ service: string }>;
}

const ServicePage = async ({ params }: PageProps) => {
  const { service: serviceSlug } = await params;
  const serviceName = serviceSlug.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Header />
      <LeadPopup />

      {/* Breadcrumbs / Banner */}
      <div className="pt-32 pb-16 bg-blue-50">
        <div className="container mx-auto px-4">
           <nav className="flex space-x-2 text-sm font-medium text-gray-500 mb-6 uppercase tracking-widest">
              <span className="hover:text-blue-600 cursor-pointer">Home</span>
              <span>/</span>
              <span className="text-blue-600">{serviceName}</span>
           </nav>
           <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 leading-tight max-w-4xl tracking-tight">
              Professional <span className="text-blue-600">{serviceName} Services</span> in Jaipur.
           </h1>
           <div className="flex flex-wrap items-center gap-6">
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-blue-100 shadow-sm font-bold text-gray-600">
                 <ShieldCheck size={18} className="text-blue-600" />
                 <span>Verified Experts</span>
              </div>
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-blue-100 shadow-sm font-bold text-gray-600">
                 <MapPin size={18} className="text-blue-600" />
                 <span>All Jaipur Localities</span>
              </div>
           </div>
        </div>
      </div>

      <section className="py-20">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content (SEO ENGINE) */}
          <div className="lg:col-span-2 space-y-12">
             <div className="prose prose-lg max-w-none text-gray-700 font-medium leading-relaxed">
                <p className="text-xl text-gray-900 font-bold mb-8">
                   Welcome to Local Pankaj, your ultimate destination for top-notch {serviceName} services in Jaipur. 
                   We understand that home maintenance can be stressful, which is why we've streamlined the process 
                   to bring you fast, reliable, and professional solutions at your doorstep.
                </p>
                <h2 className="text-3xl font-extrabold text-gray-900 mt-12 mb-6">Why Choose Our {serviceName} Specialists?</h2>
                <p>
                   Our team of technicians is highly trained and background-verified to ensure your safety and satisfaction. 
                   Whether you are looking for urgent repairs or routine maintenance, we provide comprehensive services 
                   tailored to the unique needs of Jaipur residents. Our local presence allows us to reach any part of 
                   Jaipur—be it Vaishali Nagar, Malviya Nagar, or Mansarovar—within 60 minutes.
                </p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 my-10 not-prose">
                   {benefits.map((b, i) => (
                      <li key={i} className="flex items-center space-x-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                         <CheckCircle2 size={24} className="text-green-500 shrink-0" />
                         <span className="font-bold text-gray-800">{b}</span>
                      </li>
                   ))}
                </ul>
                
                <h3 className="text-2xl font-bold text-gray-900 mt-12 mb-6 tracking-tight">Comprehensive {serviceName} Checklist</h3>
                <p>
                   When you book a {serviceName} through us, we don't just do a surface-level job. Our exhaustive checklist ensures 
                   every component is inspected, cleaned, and optimized for performance. This proactive approach saves you money 
                   in the long run by preventing major breakdowns.
                </p>
                
                <div className="bg-blue-600 text-white p-10 rounded-[2.5rem] my-16 shadow-2xl shadow-blue-200">
                   <h3 className="text-3xl font-bold mb-4">Ready to Experience the Best in Jaipur?</h3>
                   <p className="mb-10 text-blue-100 font-medium">Join over 10,000 satisfied customers who trust Local Pankaj for their daily home needs.</p>
                   <button className="bg-white text-blue-600 px-10 py-5 rounded-2xl font-extrabold hover:bg-gray-50 transition-all flex items-center space-x-3">
                      <span>Book Now - Get 20% Off</span>
                      <ArrowRight size={20} />
                   </button>
                </div>
             </div>

             {/* FAQ Schema Placeholder */}
             <div className="space-y-6">
                <h3 className="text-3xl font-extrabold text-gray-900 mb-10 border-l-8 border-blue-600 pl-6">Frequently Asked Questions</h3>
                {faqs.map((f, i) => (
                   <div key={i} className="group border-b border-gray-100 pb-6 hover:bg-gray-50 p-4 rounded-xl transition-all">
                      <div className="flex items-center justify-between cursor-pointer">
                         <h4 className="text-xl font-bold text-gray-900">{f.q}</h4>
                         <Info size={18} className="text-gray-400 group-hover:text-blue-600" />
                      </div>
                      <p className="mt-4 text-gray-600 font-medium leading-relaxed">{f.a}</p>
                   </div>
                ))}
             </div>
          </div>

          {/* Sidebar Booking Form */}
          <div className="lg:col-span-1">
             <div className="sticky top-32 space-y-8">
                <div className="bg-white p-8 rounded-[2rem] border-2 border-blue-600 shadow-2xl shadow-blue-100">
                   <h4 className="text-2xl font-bold text-gray-900 mb-6">Quick Booking</h4>
                   <form className="space-y-5">
                      <input className="w-full px-4 py-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600" placeholder="Your Name" />
                      <input className="w-full px-4 py-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600" placeholder="Mobile Number" />
                      <select className="w-full px-4 py-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-blue-600 bg-white">
                         <option>Standard Service</option>
                         <option>Emergency Service</option>
                         <option>Inspection Only</option>
                      </select>
                      <button className="w-full py-5 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200">
                         Confirm Appointment
                      </button>
                   </form>
                </div>

                {/* Local Area Card */}
                <div className="bg-gray-900 text-white p-8 rounded-[2rem]">
                   <h5 className="font-bold mb-4 uppercase text-xs tracking-widest text-blue-400">Jaipur Coverage</h5>
                   <p className="text-sm font-medium mb-6">We serve all major localities with zero travel charge.</p>
                   <div className="grid grid-cols-2 gap-3 text-xs font-bold text-gray-400">
                      <div className="flex items-center space-x-1"><MapPin size={12}/> <span>Vaishali Nagar</span></div>
                      <div className="flex items-center space-x-1"><MapPin size={12}/> <span>Malviya Nagar</span></div>
                      <div className="flex items-center space-x-1"><MapPin size={12}/> <span>Mansarovar</span></div>
                      <div className="flex items-center space-x-1"><MapPin size={12}/> <span>C-Scheme</span></div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

const benefits = [
  "6-Month Service Warranty",
  "Transparent Fixed Pricing",
  "Trained & Certified Technicians",
  "Genuine Spare Parts Only",
  "Same Day Service Guarantee",
  "Safe & Secure Payments"
];

const faqs = [
  { q: "How soon can I get a technician?", a: "We typically arrive within 60-90 minutes of your booking anywhere in Jaipur." },
  { q: "Are your technicians background checked?", a: "Yes, every partner on Local Pankaj undergoes a rigorous background and skills verification." },
  { q: "Do you provide original spare parts?", a: "Absolutely. We only use 100% genuine, branded spare parts with warranty coverage." }
];

export default ServicePage;
