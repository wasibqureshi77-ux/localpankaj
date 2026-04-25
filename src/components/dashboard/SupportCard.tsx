import React from "react";
import { PhoneCall } from "lucide-react";

export const SupportCard = () => {
  return (
    <div className="bg-gray-950 text-white p-8 rounded-[32px] shadow-2xl relative overflow-hidden group border border-white/5 h-full flex flex-col justify-between">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#155dfc]/20 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-[2s]" />
      
      <div className="relative z-10">
        <div className="w-12 h-1 bg-[#155dfc] mb-6" />
        <h3 className="text-xl font-bold mb-3 tracking-tight">Need Assistance?</h3>
        <p className="text-gray-400 text-sm font-medium leading-relaxed mb-8">
          Our Jaipur coordination center is active 24/7. Reach out for real-time technician status or scheduling changes.
        </p>
      </div>

      <a 
        href="tel:+918000023359" 
        className="relative z-10 flex items-center space-x-4 bg-white/5 hover:bg-white/10 p-4 rounded-2xl transition-all border border-white/5 group/link"
      >
        <div className="p-3 bg-[#155dfc] text-white rounded-xl shadow-lg shadow-blue-600/20 group-hover/link:scale-110 transition-transform">
          <PhoneCall size={20} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-[#155dfc] uppercase tracking-widest mb-0.5">Quick Call</p>
          <p className="text-lg font-bold tracking-tight text-white">+91 80000 23359</p>
        </div>
      </a>
    </div>
  );
};
