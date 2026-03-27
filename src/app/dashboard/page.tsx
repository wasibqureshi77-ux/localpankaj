import React from "react";
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Package, 
  PhoneCall, 
  ArrowRight,
  Plus
} from "lucide-react";

export default function UserDashboard() {
  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="mb-20">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tighter">Namaste, <span className="text-blue-600">Rahul.</span></h1>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-sm italic">You have 2 active bookings in Jaipur today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 animate-in fade-in duration-1000 delay-300">
         <StatsCard icon={<Package className="text-blue-600"/>} label="Total Bookings" value="12" color="bg-blue-50" />
         <StatsCard icon={<Clock className="text-yellow-600"/>} label="Pending" value="02" color="bg-yellow-50" />
         <StatsCard icon={<CheckCircle2 className="text-green-600"/>} label="Completed" value="10" color="bg-green-50" />
         <StatsCard icon={<Calendar className="text-indigo-600"/>} label="Next Due" value="Tomorrow" color="bg-indigo-50" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Active Booking */}
        <div className="lg:col-span-2 space-y-12 animate-in fade-in slide-in-from-left-6 duration-1000 delay-500">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Current Requests</h2>
            <button className="flex items-center space-x-2 text-blue-600 font-bold hover:text-blue-700 transition">
               <span>New Booking</span>
               <Plus size={18} />
            </button>
          </div>
          
          <div className="space-y-6">
            <BookingItem 
               service="AC Repair & Maintenance" 
               status="IN PROGRESS" 
               technician="Amit Kumar" 
               time="Today, 4:00 PM"
               statusColor="text-blue-600 bg-blue-50"
            />
            <BookingItem 
               service="RO Filter Change" 
               status="PENDING" 
               technician="Assigning..." 
               time="28 Mar, 10:00 AM"
               statusColor="text-yellow-600 bg-yellow-50"
            />
          </div>
        </div>

        {/* Sidebar Help */}
        <div className="lg:col-span-1 space-y-8 animate-in fade-in slide-in-from-right-6 duration-1000 delay-700">
           <div className="bg-gray-900 text-white p-10 rounded-[3rem] shadow-2xl shadow-blue-900/10 relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 italic tracking-tight">Need Help?</h3>
                <p className="text-gray-400 font-medium mb-10 leading-relaxed text-sm uppercase tracking-widest">Our support team is available 24/7 for you.</p>
                <a href="tel:+919876543210" className="flex items-center space-x-4 bg-white/10 hover:bg-white/20 px-6 py-5 rounded-2xl transition">
                   <PhoneCall size={24} className="text-blue-500" />
                   <div className="text-left font-bold border-l border-white/10 pl-4">
                      <div className="text-[10px] text-gray-500 uppercase tracking-widest leading-none mb-1">Direct Line</div>
                      <div className="text-lg">+91 98765 43210</div>
                   </div>
                </a>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ icon, label, value, color }: { icon: React.ReactNode; label: string; value: string; color: string }) {
  return (
    <div className={`p-10 rounded-[2.5rem] ${color} border border-white shadow-sm flex items-center space-x-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
      <div className="p-5 bg-white rounded-2xl shadow-sm">{icon}</div>
      <div>
         <div className="text-4xl font-extrabold text-gray-900 tracking-tighter">{value}</div>
         <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-2 italic shadow-sm bg-white inline-block px-2 text-gray-500">{label}</div>
      </div>
    </div>
  );
}

function BookingItem({ service, status, technician, time, statusColor }: any) {
  return (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
             <div className={`inline-block px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-3 ${statusColor}`}>
                {status}
             </div>
             <h4 className="text-2xl font-extrabold text-gray-900 tracking-tight">{service}</h4>
             <div className="flex items-center space-x-6 text-gray-500 font-bold text-[12px] uppercase tracking-widest mt-4">
                <div className="flex items-center space-x-2"><Calendar size={14}/> <span>{time}</span></div>
                <div className="flex items-center space-x-2"><UserCheck size={14} className="text-blue-600"/> <span className="text-gray-900">{technician}</span></div>
             </div>
          </div>
          <button className="p-5 border-2 border-gray-100 group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 rounded-2xl transition-all duration-300 shadow-sm active:scale-95">
             <ArrowRight size={24} />
          </button>
       </div>
    </div>
  );
}

import { UserCheck } from "lucide-react";
