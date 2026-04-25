import React, { useState } from "react";
import { Lock, Loader2, ShieldCheck } from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";

export const PasswordChangeCard = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    if (form.newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    setIsUpdating(true);
    try {
      await axios.post("/api/auth/change-password", {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword
      });
      toast.success("Password updated successfully");
      setForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update password");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-gray-50">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-50 text-amber-600 rounded-lg">
            <Lock size={20} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Security & Password</h3>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 space-y-5">
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Old Password</label>
          <input 
            type="password"
            required
            value={form.oldPassword}
            onChange={(e) => setForm({...form, oldPassword: e.target.value})}
            className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm focus:ring-4 focus:ring-blue-50 focus:border-[#155dfc] outline-none transition-all placeholder:text-gray-300"
            placeholder="••••••••"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">New Password</label>
          <input 
            type="password"
            required
            value={form.newPassword}
            onChange={(e) => setForm({...form, newPassword: e.target.value})}
            className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm focus:ring-4 focus:ring-blue-50 focus:border-[#155dfc] outline-none transition-all placeholder:text-gray-300"
            placeholder="••••••••"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Confirm New Password</label>
          <input 
            type="password"
            required
            value={form.confirmPassword}
            onChange={(e) => setForm({...form, confirmPassword: e.target.value})}
            className="w-full h-11 bg-gray-50 border border-gray-100 rounded-xl px-4 text-sm focus:ring-4 focus:ring-blue-50 focus:border-[#155dfc] outline-none transition-all placeholder:text-gray-300"
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit"
          disabled={isUpdating}
          className="w-full h-11 bg-gray-900 text-white rounded-xl text-xs font-bold tracking-widest hover:bg-black transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
        >
          {isUpdating ? (
            <Loader2 size={16} className="animate-spin" />
          ) : (
            <>
              <ShieldCheck size={16} className="group-hover:text-[#155dfc] transition-colors" />
              UPDATE CREDENTIALS
            </>
          )}
        </button>
      </form>
    </div>
  );
};
