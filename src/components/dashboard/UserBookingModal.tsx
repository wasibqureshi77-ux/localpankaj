"use client";
import React from "react";
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  CreditCard, 
  Banknote, 
  ShieldCheck, 
  Phone,
  Package,
  AlertCircle
} from "lucide-react";

interface UserBookingModalProps {
  booking: any;
  onClose: () => void;
}

export const UserBookingModal = ({ booking, onClose }: UserBookingModalProps) => {
  if (!booking) return null;

  const technician = booking.assignedTechnician;

  const getStatusInfo = (status: string) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
        return {
          label: "Service Completed",
          color: "text-blue-600 bg-blue-50 border-blue-100",
          description: "This service has been successfully fulfilled. Thank you for choosing LocalPankaj!"
        };
      case "CONVERTED":
        return {
          label: "Expert Assigned",
          color: "text-emerald-600 bg-emerald-50 border-emerald-100",
          description: "A specialist has been successfully assigned and will arrive at the scheduled time."
        };
      case "UNASSIGNED":
        return {
          label: "Request Received",
          color: "text-amber-600 bg-amber-50 border-amber-100",
          description: "Your request is in our queue. Our coordination center is currently assigning the best expert for your location."
        };
      default:
        return {
          label: status || "Processing",
          color: "text-gray-500 bg-gray-50 border-gray-100",
          description: "We are currently processing your service request."
        };
    }
  };

  const statusInfo = getStatusInfo(booking.status);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="p-2 bg-blue-50 text-[#155dfc] rounded-xl">
                <Package size={20} />
             </div>
             <div>
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">Booking Details</h3>
                <p className="text-[10px] font-bold text-[#155dfc] uppercase tracking-wider mt-0.5">ORDER ID: {booking.requestId}</p>
             </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-gray-900 transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8 max-h-[75vh] overflow-y-auto">
          {/* Status Alert */}
          <div className={`p-5 rounded-2xl border ${statusInfo.color} space-y-2`}>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest">
              <ShieldCheck size={14} />
              <span>{statusInfo.label}</span>
            </div>
            <p className="text-sm font-medium leading-relaxed opacity-80">
              {statusInfo.description}
            </p>
          </div>

          {/* Service Title */}
          <div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1.5 px-1">Selected Service</p>
            <h4 className="text-2xl font-black text-gray-900 leading-tight">
              {booking.service}
            </h4>
            <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-500 rounded-lg text-xs font-bold uppercase tracking-widest">
               {booking.category || "Home Maintenance"}
            </div>
          </div>

          {/* Schedule & Location Grid */}
          <div className="grid grid-cols-2 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Schedule Date</p>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <Calendar size={14} className="text-[#155dfc]" />
                <span>{booking.bookingDate}</span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Time Slot</p>
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <Clock size={14} className="text-[#155dfc]" />
                <span>{booking.bookingTime}</span>
              </div>
            </div>
            <div className="col-span-2 space-y-1 pt-3 border-t border-gray-200/50">
              <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Service Address</p>
              <div className="flex items-start gap-2 text-sm font-bold text-gray-900">
                <MapPin size={16} className="text-[#155dfc] mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed">{booking.address}</span>
              </div>
            </div>
          </div>

          {/* Expert Info */}
          {technician && (technician.name || technician.id) && (
            <div className="space-y-4">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Assigned Specialist</p>
              <div className="flex items-center justify-between p-4 border border-blue-100 bg-blue-50/30 rounded-2xl">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#155dfc] text-white rounded-xl flex items-center justify-center text-xl font-bold">
                       {(technician.name?.[0] || "T").toUpperCase()}
                    </div>
                    <div>
                       <p className="text-sm font-bold text-gray-900">{technician.name || "Specialist Assigned"}</p>
                       <p className="text-[11px] font-medium text-blue-600 mt-0.5">Rating: 4.9/5</p>
                    </div>
                 </div>
                 <a 
                   href={`tel:${technician.phone}`} 
                   className="w-11 h-11 flex items-center justify-center bg-white border border-blue-100 text-[#155dfc] rounded-xl shadow-sm hover:bg-[#155dfc] hover:text-white transition-all"
                 >
                    <Phone size={18} />
                 </a>
              </div>
            </div>
          )}

          {/* Payment Summary */}
          <div className="space-y-4">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Financial Summary</p>
            <div className="space-y-3 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm">
               <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-500">Base Service Charge</span>
                  <span className="font-bold text-gray-900">₹{booking.price || "To be quoted"}</span>
               </div>
               <div className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-500">Payment Mode</span>
                  <div className="flex items-center gap-1.5 font-bold text-gray-900">
                     {booking.paymentMethod === "ONLINE" ? (
                       <>
                         <CreditCard size={14} className="text-[#155dfc]" />
                         <span>Handled Online</span>
                       </>
                     ) : (
                       <>
                         <Banknote size={14} className="text-amber-500" />
                         <span>Cash on Arrival</span>
                       </>
                     )}
                  </div>
               </div>
               <div className="pt-3 border-t border-gray-50 flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Current Status</span>
                  <span className={`text-xs font-black uppercase tracking-widest ${booking.paymentStatus === "COMPLETED" ? "text-emerald-600" : "text-amber-600"}`}>
                     {booking.paymentStatus || "PENDING"}
                  </span>
               </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2 p-4 bg-amber-50 rounded-xl border border-amber-100">
             <AlertCircle size={16} className="text-amber-600 flex-shrink-0" />
             <p className="text-[11px] font-medium text-amber-900 leading-tight">
                For changes or support, please call our 24/7 Jaipur center at <strong>+91 80000 23359</strong>.
             </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-end gap-3">
           <button 
             onClick={onClose}
             className="px-6 py-2.5 bg-white border border-gray-200 text-gray-500 rounded-xl text-[10px] font-bold tracking-widest hover:border-gray-900 hover:text-gray-900 transition-all uppercase"
           >
              Dismiss
           </button>
        </div>
      </div>
    </div>
  );
};
