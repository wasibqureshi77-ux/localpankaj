import React from "react";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  PhoneCall,
  Search,
  Filter
} from "lucide-react";

export default function BookingsPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tighter italic">Your <span className="text-blue-600">Bookings.</span></h1>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Track and manage your home service history.</p>
        </div>
        
        <div className="flex items-center space-x-4">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
              <input 
                type="text" 
                placeholder="Search service..." 
                className="pl-12 pr-6 py-4 rounded-2xl bg-white border border-gray-100 shadow-sm outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all font-medium text-sm"
              />
           </div>
           <button className="p-4 bg-white border border-gray-100 rounded-2xl shadow-sm text-gray-500 hover:text-blue-600 transition group active:scale-95">
              <Filter size={20} className="group-hover:rotate-12 transition-transform" />
           </button>
        </div>
      </div>

      <div className="space-y-8">
        <BookingCard 
           service="AC Repair & Maintenance"
           date="Today, 27 Mar 2026"
           time="04:00 PM"
           location="Vaishali Nagar, Jaipur"
           status="IN PROGRESS"
           statusColor="text-blue-600 bg-blue-50"
           icon={<Clock size={20}/>}
        />
        
        <BookingCard 
           service="RO Water Purifier Service"
           date="Tomorrow, 28 Mar 2026"
           time="10:30 AM"
           location="Mansarovar, Jaipur"
           status="PENDING"
           statusColor="text-yellow-600 bg-yellow-50"
           icon={<AlertCircle size={20}/>}
        />

        <BookingCard 
           service="Full Home Sanitization"
           date="20 Mar 2026"
           time="09:00 AM"
           location="C-Scheme, Jaipur"
           status="COMPLETED"
           statusColor="text-green-600 bg-green-50"
           icon={<CheckCircle2 size={20}/>}
        />

        <BookingCard 
           service="Kitchen Deep Cleaning"
           date="15 Feb 2026"
           time="11:00 AM"
           location="Malviya Nagar, Jaipur"
           status="CANCELLED"
           statusColor="text-red-600 bg-red-50"
           icon={<XCircle size={20}/>}
        />
      </div>

      <div className="bg-gray-900 text-white p-12 rounded-[3.5rem] shadow-2xl shadow-blue-900/10 flex flex-col md:flex-row items-center justify-between gap-10 mt-20 relative overflow-hidden group border border-white/5">
         <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-125 transition-transform duration-1000" />
         <div className="space-y-4">
            <h3 className="text-3xl font-extrabold italic tracking-tight">Need to reschedule?</h3>
            <p className="text-gray-400 font-medium max-w-sm text-sm uppercase tracking-widest leading-relaxed">
               Cancel or change your slot up to 2 hours before the appointment at no extra cost.
            </p>
         </div>
         <button className="px-12 py-6 bg-white text-gray-900 rounded-3xl font-black text-xs uppercase tracking-[0.3em] flex items-center space-x-3 hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1 shadow-xl">
            <PhoneCall size={18} />
            <span>Support Line</span>
         </button>
      </div>
    </div>
  );
}

function BookingCard({ service, date, time, location, status, statusColor, icon }: any) {
  return (
    <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 group relative">
       <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="flex items-start space-x-8">
             <div className="p-6 bg-gray-50 rounded-[1.5rem] text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-inner">
                {icon}
             </div>
             <div>
                <div className={`inline-flex items-center space-x-2 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest mb-4 shadow-sm ${statusColor}`}>
                   {status}
                </div>
                <h2 className="text-2xl font-black text-gray-900 mb-2 tracking-tight group-hover:text-blue-600 transition-colors">{service}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                   <div className="flex items-center space-x-2"><Calendar size={14} className="text-blue-500"/> <span>{date}</span></div>
                   <div className="flex items-center space-x-2"><Clock size={14} className="text-blue-500"/> <span>{time}</span></div>
                   <div className="flex items-center space-x-2 col-span-full"><MapPin size={14} className="text-blue-500"/> <span>{location}</span></div>
                </div>
             </div>
          </div>
          
          <div className="flex items-center space-x-4">
             <button className="flex-1 lg:flex-none px-8 py-4 bg-gray-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl active:scale-95">
                View Details
             </button>
             <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl hover:bg-red-50 hover:text-red-500 transition-all active:scale-95">
                <XCircle size={20} />
             </button>
          </div>
       </div>
    </div>
  );
}
