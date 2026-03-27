"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Lock, Mail, User, Phone, ArrowRight, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import axios from "axios";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("/api/auth/register", formData);
      toast.success("Account created successfully!");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 py-12">
      <div className="absolute top-8 left-8 transition-all hover:-translate-x-2">
         <Link href="/login" className="flex items-center space-x-2 font-extrabold text-blue-600 hover:text-blue-700">
            <ArrowLeft size={20} />
            <span>Back to Login</span>
         </Link>
      </div>

      <div className="mb-12 text-center">
         <div className="text-4xl font-extrabold text-gray-900 tracking-tighter mb-2 italic shadow-sm bg-blue-600 inline-block px-4 text-white">LOCAL<span className="text-black">PANKAJ</span></div>
         <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-4">Join Modern Home Services</p>
      </div>

      <div className="w-full max-w-md bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-blue-100 border border-gray-100">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">Create Account</h2>
          <p className="text-gray-500 font-medium">Start your journey with Jaipur's best.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 leading-8">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                required
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition font-medium"
                placeholder="Rahul Sharma"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 leading-8">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="email"
                required
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition font-medium"
                placeholder="rahul@example.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 leading-8">Phone Number</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="tel"
                required
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition font-medium"
                placeholder="+91 XXXXX XXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1 leading-8">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="password"
                required
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition font-medium"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-5 bg-blue-600 text-white rounded-xl font-extrabold text-lg hover:bg-blue-700 transition shadow-xl shadow-blue-500/20 transform hover:-translate-y-1 flex items-center justify-center space-x-3"
          >
            {loading ? (
               <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <span>Sign Up</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>
        
        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 font-medium text-sm mb-4">Already have an account?</p>
            <Link href="/login" className="text-blue-600 font-extrabold hover:text-blue-700 transition">Sign in instead</Link>
        </div>
      </div>
    </div>
  );
}
