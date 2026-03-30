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

interface UsersManagementTableProps {
  title: string;
  subtitle: string;
  roleFilter?: "STAFF" | "USER";
}

export default function UsersManagementTable({ title, subtitle, roleFilter }: UsersManagementTableProps) {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/api/users");
        
        let filtered = data || [];
        if (roleFilter === "STAFF") {
           filtered = filtered.filter((u: any) => ["ADMIN", "MANAGER", "EDITOR"].includes(u.role));
        } else if (roleFilter === "USER") {
           filtered = filtered.filter((u: any) => u.role === "USER");
        }

        setUsers(filtered);
      } catch (err) {
        toast.error("Failed to load user directory");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [roleFilter]);

  const verifiedPercent = users.length > 0 
    ? Math.round((users.filter(u => u.role !== "USER").length / users.length) * 100) 
    : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <h1 className="text-6xl font-black text-gray-950 tracking-tighter italic">
            {title.split(" ")[0]} <span className="text-blue-600">{title.split(" ").slice(1).join(" ")}</span>
          </h1>
          <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-[10px] mt-4">{subtitle}</p>
        </div>
        
        <div className="flex items-center space-x-6">
           <button className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition shadow-xl hover:bg-blue-700 shadow-blue-600/20 transform active:scale-95 flex items-center space-x-3">
              <UserPlus size={16} />
              <span>Create Record</span>
           </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-[3rem] overflow-hidden shadow-2xl shadow-gray-200/50">
         <div className="p-10 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex items-center space-x-6">
               <div className="px-5 py-2.5 bg-blue-50 border border-blue-100 text-blue-600 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center space-x-2">
                  <ShieldCheck size={14} />
                  <span>Authority Stream: {verifiedPercent}%</span>
               </div>
               <div className="px-5 py-2.5 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center space-x-2">
                  <Users size={14} />
                  <span>Total Records: {users.length}</span>
               </div>
            </div>

            <div className="flex items-center space-x-4">
               <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={16} />
                  <input 
                    type="text" 
                    placeholder="Search registry..." 
                    className="pl-12 pr-6 py-4 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-gray-200 outline-none transition-all font-bold text-[10px] uppercase tracking-widest w-64 shadow-inner"
                  />
               </div>
               <button className="p-4 bg-gray-50 text-gray-400 rounded-2xl border border-transparent hover:bg-white hover:border-gray-200 transition"><Filter size={20}/></button>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50 text-[10px] uppercase tracking-[0.3em] font-black text-gray-400">
                     <th className="px-10 py-6">Identity Portal</th>
                     <th className="px-10 py-6">Privilege Level</th>
                     <th className="px-10 py-6">Registration</th>
                     <th className="px-10 py-6 text-blue-600 font-black">Requests Till Now</th>
                     <th className="px-10 py-6">Strategy</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr><td colSpan={5} className="p-20 text-center text-gray-400 animate-pulse font-black text-xs uppercase tracking-[0.4em] italic">Scanning System Directories...</td></tr>
                  ) : users.length > 0 ? (
                    users.map((user: any) => (
                      <UserRow key={user._id} user={user} />
                    ))
                  ) : (
                    <tr><td colSpan={5} className="p-20 text-center text-gray-400 font-bold text-xs uppercase tracking-widest">No matching records found.</td></tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
}

function UserRow({ user }: any) {
  const isStaff = ["ADMIN", "EDITOR", "MANAGER"].includes(user.role);
  const registrationDate = new Date(user.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <tr className="hover:bg-gray-50/50 transition-colors group">
       <td className="px-10 py-8">
          <div className="flex items-center space-x-4">
             <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center font-black text-gray-400 text-xl border border-gray-200 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {user.name ? user.name[0] : "U"}
             </div>
             <div>
                <div className="text-lg font-black text-gray-950 tracking-tight italic group-hover:text-blue-600 transition-colors uppercase">{user.name}</div>
                <div className="flex items-center space-x-3 mt-1.5 font-sans">
                   <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{user.phone}</div>
                   <div className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">|</div>
                   <div className="text-[10px] font-bold text-gray-500 lowercase tracking-tight">{user.email}</div>
                </div>
             </div>
          </div>
       </td>
       <td className="px-10 py-8">
          <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black tracking-widest uppercase text-white shadow-xl ${isStaff ? 'bg-blue-600 shadow-blue-600/20' : 'bg-gray-100 text-gray-400 shadow-none'}`}>{user.role}</span>
       </td>
       <td className="px-10 py-8 text-[11px] font-extrabold text-gray-400 uppercase tracking-widest">{registrationDate}</td>
       <td className="px-10 py-8">
          <div className="flex items-center space-x-4">
             <div className="text-2xl font-black text-blue-600 italic drop-shadow-sm">{user.requestCount || 0}</div>
             <div className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-3">Requests<br/>Processed</div>
          </div>
       </td>
       <td className="px-10 py-8 text-right underline">
          <button className="p-3 bg-gray-50 text-gray-400 rounded-xl border border-transparent hover:bg-gray-950 hover:text-white transition-all">
             <ExternalLink size={18}/>
          </button>
       </td>
    </tr>
  );
}
