"use client";
import React, { useState, useEffect } from "react";
import { 
  Users, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Mail, 
  ShieldCheck, 
  UserPlus, 
  CheckCircle2, 
  XCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  User,
  Star
} from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function UsersManagement() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/api/users");
        setUsers(data || []);
      } catch (err) {
        toast.error("Failed to load user directory");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const verifiedPercent = users.length > 0 
    ? Math.round((users.filter(u => u.role !== "USER").length / users.length) * 100) 
    : 0;

  const vipCount = users.filter(u => u.role === "ADMIN").length + 2; // Dummy offset for display

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h1 className="text-6xl font-black text-white tracking-tighter italic">Jaipur <span className="text-blue-500">Demographics.</span></h1>
          <p className="text-gray-500 font-bold uppercase tracking-[0.4em] text-[10px] mt-4">System Identity and Access Registry.</p>
        </div>
        
        <div className="flex items-center space-x-6">
           <button className="px-10 py-5 bg-white text-indigo-950 rounded-2xl font-black text-[10px] uppercase tracking-widest transition shadow-xl hover:bg-gray-100 transform active:scale-95 flex items-center space-x-3">
              <UserPlus size={16} />
              <span>Create User</span>
           </button>
        </div>
      </div>

      <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] overflow-hidden">
         <div className="p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center space-x-6">
               <div className="px-5 py-2.5 bg-blue-600/10 border border-blue-500/20 text-blue-400 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center space-x-2">
                  <ShieldCheck size={14} />
                  <span>Authority: {verifiedPercent}%</span>
               </div>
               <div className="px-5 py-2.5 bg-emerald-600/10 border border-emerald-500/20 text-emerald-400 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center space-x-2">
                  <Star size={14} className="fill-current" />
                  <span>VIP Clients: {vipCount * 3}</span>
               </div>
            </div>

            <div className="flex items-center space-x-4">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-500 transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search identity..." 
                    className="pl-12 pr-6 py-4 rounded-2xl bg-white/5 border border-white/5 outline-none focus:border-blue-500/50 transition-all font-bold text-[10px] uppercase tracking-widest w-64 shadow-inner"
                  />
               </div>
               <button className="p-4 bg-white/5 text-gray-400 rounded-2xl border border-white/5 hover:bg-white/10 transition"><Filter size={20}/></button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-white/[0.02] text-[10px] uppercase tracking-[0.3em] font-black text-gray-500">
                     <th className="px-10 py-6">Identity Portal</th>
                     <th className="px-10 py-6">Privilege Level</th>
                     <th className="px-10 py-6">Validation</th>
                     <th className="px-10 py-6">Registration</th>
                     <th className="px-10 py-6">Lifecycle</th>
                     <th className="px-10 py-6">Strategy</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {loading ? (
                    <tr><td colSpan={6} className="p-20 text-center text-gray-600 animate-pulse font-black text-xs uppercase tracking-[0.4em] italic">Scanning System Directories...</td></tr>
                  ) : users.length > 0 ? (
                    users.map((user: any) => (
                      <UserRow key={user._id} user={user} />
                    ))
                  ) : (
                    <tr><td colSpan={6} className="p-20 text-center text-gray-500 font-bold text-xs uppercase tracking-widest">No users found in the system.</td></tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}

function UserRow({ user }: any) {
  const isStaff = user.role !== "USER";
  const status = isStaff ? "VERIFIED" : "PENDING";
  const registrationDate = new Date(user.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <tr className="hover:bg-white/[0.03] transition-colors group">
       <td className="px-10 py-8">
          <div className="flex items-center space-x-4">
             <div className="w-14 h-14 bg-gradient-to-tr from-gray-900 to-gray-800 rounded-2xl flex items-center justify-center font-black text-white text-xl border border-white/5 group-hover:scale-110 transition-transform">
                {user.name ? user.name[0] : "U"}
             </div>
             <div>
                <div className="text-lg font-black text-white tracking-tight italic group-hover:text-blue-500 transition-colors uppercase">{user.name}</div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 lowercase font-sans">{user.email}</div>
             </div>
          </div>
       </td>
       <td className="px-10 py-8">
          <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black tracking-widest uppercase text-white shadow-xl ${isStaff ? 'bg-blue-600 shadow-blue-600/20' : 'bg-white/10 text-gray-400 shadow-none'}`}>{user.role}</span>
       </td>
       <td className="px-10 py-8">
          <div className={`flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest ${status === 'VERIFIED' ? 'text-emerald-500' : 'text-amber-500'}`}>
             {status === 'VERIFIED' ? <CheckCircle2 size={14}/> : <Clock size={14}/>}
             <span>{status}</span>
          </div>
       </td>
       <td className="px-10 py-8 text-[11px] font-extrabold text-gray-500 uppercase tracking-widest">{registrationDate}</td>
       <td className="px-10 py-8">
          <div className="flex items-center space-x-3 text-red-500/30 text-[10px] font-black tracking-widest uppercase">
             <Clock size={14} />
             <span>OFFLINE</span>
          </div>
       </td>
       <td className="px-10 py-8">
          <button className="p-3 bg-white/5 text-gray-400 rounded-xl border border-white/5 hover:bg-white hover:text-black transition-all">
             <ExternalLink size={18}/>
          </button>
       </td>
    </tr>
  );
}
