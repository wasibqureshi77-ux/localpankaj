"use client";
import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  Search,
  Filter,
  Loader2,
} from "lucide-react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BookingCard } from "@/components/dashboard/BookingCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { SupportCard } from "@/components/dashboard/SupportCard";

export default function BookingsPage() {
  const { data: session }: any = useSession();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchBookings = async () => {
    if (!session?.user?.email && !session?.user?.phone) return;
    try {
      const { data } = await axios.get(`/api/leads?email=${session.user.email || ""}&phone=${session.user.phone || ""}`);
      setBookings(data.leads || []);
    } catch (err) {
      toast.error("Failed to sync bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) fetchBookings();
  }, [session]);

  const filteredBookings = bookings.filter(b => {
    const query = searchQuery.toLowerCase();
    return (
      b.service?.toLowerCase().includes(query) ||
      b.status?.toLowerCase().includes(query) ||
      b.requestId?.toLowerCase().includes(query) ||
      b.category?.toLowerCase().includes(query) ||
      b.address?.toLowerCase().includes(query)
    );
  });

  if (loading) {
     return (
        <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
           <Loader2 className="animate-spin text-[#155dfc]" size={40} strokeWidth={1.5} />
           <p className="text-sm font-bold text-gray-900 tracking-tight">Syncing booking data...</p>
        </div>
     );
  }

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Your Bookings</h1>
          <p className="text-sm font-medium text-gray-500 mt-1">Track and manage your entire service history.</p>
        </div>
        
        <div className="flex items-center gap-3">
           <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search services..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-6 py-3 rounded-xl bg-white border border-gray-100 shadow-sm outline-none focus:ring-4 focus:ring-blue-50 focus:border-[#155dfc] transition-all font-medium text-sm w-full md:w-64"
              />
           </div>
           <button className="hidden sm:flex h-11 w-11 items-center justify-center bg-white border border-gray-100 rounded-xl shadow-sm text-gray-500 hover:text-gray-900 transition-all">
              <Filter size={18} />
           </button>
        </div>
      </div>

      {/* Bookings List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {filteredBookings.length > 0 ? (
             filteredBookings.map((booking) => (
               <BookingCard 
                  key={booking._id}
                  booking={booking}
               />
             ))
          ) : (
             <EmptyState 
                icon={Calendar}
                title={searchQuery ? "No matches found" : "No Service History"}
                description={searchQuery ? "Try adjusting your search terms to find what you're looking for." : "You haven't booked any services yet. Professional help is just a few clicks away."}
                action={searchQuery ? undefined : { label: "START BOOKING", href: "/" }}
             />
          )}
        </div>

        {/* Support Sidebar */}
        <div className="lg:col-span-1">
          <SupportCard />
        </div>
      </div>
    </div>
  );
}


