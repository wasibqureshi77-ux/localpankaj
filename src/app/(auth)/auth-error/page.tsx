import React, { Suspense } from "react";
import Link from "next/link";
import { 
  AlertTriangle, 
  ArrowLeft, 
  ShieldAlert, 
  Lock, 
  UserX,
  RefreshCw,
  Home,
  MessageCircleOff
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authentication Error | Local Pankaj",
  description: "There was a problem verifying your identity.",
};

const ErrorIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "CredentialsSignin":
      return <Lock className="text-amber-500" size={48} />;
    case "SessionRequired":
      return <ShieldAlert className="text-red-500" size={48} />;
    case "AccessDenied":
      return <UserX className="text-red-500" size={48} />;
    default:
      return <AlertTriangle className="text-blue-500" size={48} />;
  }
};

const getErrorMessage = (type: string) => {
  switch (type) {
    case "CredentialsSignin":
      return {
        title: "Identity Check Failed",
        message: "The credentials provided do not match our secure records. Please verify your email and password.",
        action: "Try Again"
      };
    case "SessionRequired":
      return {
        title: "Authorization Required",
        message: "You must be authenticated to access this protected system directory.",
        action: "Login Now"
      };
    case "AccessDenied":
      return {
        title: "Access Restricted",
        message: "Your current identity does not have the required privilege level for this operation.",
        action: "Switch Account"
      };
    default:
      return {
        title: "System Sync Error",
        message: "An unexpected error occurred during the identity verification process. Our engineers have been alerted.",
        action: "Restart Session"
      };
  }
};

function AuthErrorContent({ searchParams }: { searchParams: { error?: string } }) {
  const error = searchParams.error || "Default";
  const { title, message, action } = getErrorMessage(error);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="w-full max-w-xl relative z-10">
        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 text-center shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          
          <div className="mb-10 inline-flex items-center justify-center w-24 h-24 bg-white/5 border border-white/10 rounded-[2rem] shadow-inner relative">
             <div className="absolute inset-0 bg-blue-500/5 blur-xl rounded-full animate-pulse" />
             <ErrorIcon type={error} />
          </div>

          <h1 className="text-4xl font-black text-white mb-4 tracking-tighter italic uppercase">{title}</h1>
          <p className="text-gray-400 font-medium text-lg mb-12 leading-relaxed">
            {message}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link 
              href="/login" 
              className="px-8 py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center space-x-3 group/btn"
            >
              <RefreshCw size={16} className="group-hover/btn:rotate-180 transition-transform duration-500" />
              <span>{action}</span>
            </Link>
            <Link 
              href="/" 
              className="px-8 py-5 bg-white/5 text-gray-400 border border-white/10 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 hover:text-white transition-all flex items-center justify-center space-x-3"
            >
              <Home size={16} />
              <span>Identity Hub</span>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col items-center">
             <Link href="/contact" className="text-blue-500 font-bold text-xs uppercase tracking-widest flex items-center space-x-2 hover:underline">
                <MessageCircleOff size={14} />
                <span>Contact System Architect</span>
             </Link>
          </div>
        </div>

        {/* Role Portal Links */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-gray-600">
           <Link href="/super-admin/login" className="hover:text-blue-500 transition-colors">Admin Portal</Link>
           <Link href="/editor/login" className="hover:text-indigo-400 transition-colors">Editor Hub</Link>
           <Link href="/login" className="hover:text-white transition-colors">User Access</Link>
        </div>
      </div>
      
      <div className="mt-20 text-[9px] font-bold text-gray-700 uppercase tracking-[0.5em] flex items-center space-x-4">
         <span>LOCAL PANKAJ</span>
         <span className="w-1 h-1 bg-gray-800 rounded-full" />
         <span>SECURE AUTHENTICATION LAYER v4.2</span>
      </div>
    </div>
  );
}

export default function AuthErrorPage({ searchParams }: { searchParams: { error?: string } }) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-blue-500 animate-pulse font-black text-xs uppercase tracking-[0.5em]">Initializing Secure Layer...</div>
      </div>
    }>
      <AuthErrorContent searchParams={searchParams} />
    </Suspense>
  );
}
