import React, { useState } from "react";
import { Calendar, UserCheck, ArrowRight, MapPin, CreditCard, Banknote, Phone, Clock } from "lucide-react";
import { UserBookingModal } from "./UserBookingModal";

interface BookingCardProps {
  booking: any;
}

export const BookingCard = ({ booking }: BookingCardProps) => {
  const [showModal, setShowModal] = useState(false);

  if (!booking) return null;

  const getStatusStyles = (status: string) => {
    switch (status?.toUpperCase()) {
      case "COMPLETED":
        return "bg-blue-50 text-blue-600 border-blue-100";
      case "FOLLOWING":
      case "CONVERTED":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";
      case "UNASSIGNED":
        return "bg-amber-50 text-amber-600 border-amber-100";
      default:
        return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  const technician = booking.assignedTechnician;

  return (
    <>
      <div 
        onClick={() => setShowModal(true)}
        className="bg-white p-6 sm:p-8 rounded-[24px] border border-gray-100 shadow-sm hover:shadow-md transition-all group overflow-hidden relative cursor-pointer active:scale-[0.99]"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Service Info */}
          <div className="flex-1 space-y-5">
            <div>
              <p className="text-[10px] font-bold text-[#155dfc] uppercase tracking-[0.2em] mb-3 opacity-70">
                ORDER ID: {booking.requestId}
              </p>
              <div className="flex items-center gap-3">
                <div className={`px-3 py-1 rounded-lg text-[10px] font-bold tracking-widest uppercase border ${getStatusStyles(booking.status)}`}>
                {booking.status}
              </div>
              {booking.paymentMethod === "ONLINE" ? (
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-lg">
                  <CreditCard size={12} className="text-blue-500" />
                  <span>Prepaid</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded-lg">
                  <Banknote size={12} className="text-amber-500" />
                  <span>Post-paid</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold text-gray-900 group-hover:text-[#155dfc] transition-colors mb-2">
                {booking.service}
              </h4>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-500">
                <MapPin size={14} className="text-gray-300" />
                <span className="truncate max-w-sm">{booking.address}</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 pt-4 border-t border-gray-50">
              <div className="flex items-center space-x-2 text-xs font-bold text-gray-600 uppercase tracking-widest">
                <Calendar size={14} className="text-[#155dfc]" />
                <span>{booking.bookingDate}</span>
              </div>
              <div className="flex items-center space-x-2 text-xs font-bold text-gray-600 uppercase tracking-widest">
                <Clock size={14} className="text-[#155dfc]" />
                <span>{booking.bookingTime}</span>
              </div>
            </div>
          </div>

          {/* Technician/Actions Section */}
          <div className="lg:w-72">
            {technician && (technician.name || technician.id) ? (
              <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#155dfc] text-white rounded-xl flex items-center justify-center font-bold">
                    {(technician.name?.[0] || "T").toUpperCase()}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-900">{technician.name || "Specialist Assigned"}</p>
                    <p className="text-[10px] font-medium text-blue-600 mt-0.5">{technician.phone || "Contact via Center"}</p>
                  </div>
                </div>
                <a 
                  href={`tel:${technician.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full flex items-center justify-center h-10 bg-[#155dfc] text-white rounded-xl text-[10px] font-bold tracking-widest hover:bg-blue-700 transition-all shadow-md shadow-blue-600/10"
                >
                  <Phone size={14} className="mr-2" /> CALL EXPERT
                </a>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-center">
                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Assigning Specialist</p>
                   <div className="mt-2 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-1/3 animate-[loading_2s_ease-in-out_infinite]" />
                   </div>
                </div>
                <button className="w-full h-11 border border-gray-200 text-gray-500 rounded-xl text-[10px] font-bold tracking-widest hover:border-gray-900 hover:text-gray-900 transition-all uppercase">
                  Track Status
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <UserBookingModal 
          booking={booking} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  );
};


