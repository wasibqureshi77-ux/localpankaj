"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Lock, Mail, ArrowRight, Loader2 } from "lucide-react";

interface LoginFormProps {
  title: string;
  subtitle: string;
  redirectTo: string;
  role?: string;
}

const LoginForm = ({ title, subtitle, redirectTo, role }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Login successful!");
        
        // Fetch session to get the role (or we could decode JWT if using client-side decoding)
        // For simplicity, we can also use a small trick: fetch the session and redirect
        const sessionRes = await fetch('/api/auth/session');
        const session = await sessionRes.json();
        const userRole = session?.user?.role;

        if (userRole === "ADMIN" || userRole === "MANAGER") {
          router.push("/super-admin");
        } else if (userRole === "EDITOR") {
          router.push("/editor");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white p-12 rounded-[2.5rem] shadow-2xl shadow-blue-100 border border-gray-100">
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-2 tracking-tight">{title}</h2>
        <p className="text-gray-500 font-medium">{subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1 leading-8">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="email"
              required
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition font-medium text-gray-950"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
           <div className="flex items-center justify-between mb-1">
             <label className="block text-sm font-bold text-gray-700 leading-8">Password</label>
             <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700 transition">Forgot?</a>
           </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="password"
              required
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition font-medium text-gray-950"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              <span>Sign In</span>
              <ArrowRight size={20} />
            </>
          )}
        </button>
      </form>
      
      {role === "USER" && (
        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
            <p className="text-gray-500 font-medium text-sm mb-4">New to Local Pankaj?</p>
            <button 
              onClick={() => router.push("/register")}
              className="text-blue-600 font-extrabold hover:text-blue-700 transition"
            >
              Create Your Free Account
            </button>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
