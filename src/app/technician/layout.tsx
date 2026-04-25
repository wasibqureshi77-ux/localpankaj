"use client";
import React from "react";
import Link from "next/link";
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  User, 
  LogOut,
  Menu,
  Bell,
  X
} from "lucide-react";
import { usePathname } from "next/navigation";

export default function TechnicianLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const isLoginPage = pathname === "/technician/login";

  if (isLoginPage) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden animate-in fade-in duration-300" 
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-100 z-[70] lg:hidden transform transition-transform duration-300 ease-out ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="h-16 flex items-center px-6 border-b border-gray-100 justify-between">
           <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-indigo-600 rounded flex items-center justify-center">
                 <div className="w-1.5 h-1.5 bg-white rounded-full" />
              </div>
              <span className="text-xs font-bold text-gray-900 tracking-tight">TechPanel</span>
           </div>
           <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-gray-400">
              <X size={20} />
           </button>
        </div>

        <nav className="p-3 space-y-1">
          <SidebarLink href="/technician" current={pathname === "/technician"} icon={<LayoutDashboard size={18} />} label="Overview" onClick={() => setIsMobileMenuOpen(false)} />
          <SidebarLink href="/technician/jobs" current={pathname === "/technician/jobs"} icon={<Briefcase size={18} />} label="My Assignments" onClick={() => setIsMobileMenuOpen(false)} />
          <SidebarLink href="/technician/completed" current={pathname === "/technician/completed"} icon={<CheckSquare size={18} />} label="Completed History" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="pt-4 pb-1 px-3">
             <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Settings</span>
          </div>
          <SidebarLink href="/technician/profile" current={pathname === "/technician/profile"} icon={<User size={18} />} label="Profile Update" onClick={() => setIsMobileMenuOpen(false)} />
        </nav>

        <div className="mt-auto p-4 border-t border-gray-50">
           <button 
              className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-500 font-bold text-sm bg-red-50"
              onClick={() => { window.location.href = "/api/auth/signout"; }}
           >
              <LogOut size={18} />
              <span>Sign Out</span>
           </button>
        </div>
      </aside>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex w-64 flex-col bg-gray-50 border-r border-gray-200">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 bg-white">
           <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center">
                 <div className="w-2 h-2 bg-white rounded-full" />
              </div>
              <span className="text-sm font-bold text-gray-900">TechPanel</span>
           </div>
        </div>

        <nav className="flex-1 p-3 space-y-0.5">
          <SidebarLink href="/technician" current={pathname === "/technician"} icon={<LayoutDashboard size={18} />} label="Overview" />
          <SidebarLink href="/technician/jobs" current={pathname === "/technician/jobs"} icon={<Briefcase size={18} />} label="My Assignments" />
          <SidebarLink href="/technician/completed" current={pathname === "/technician/completed"} icon={<CheckSquare size={18} />} label="Completed" />
          <div className="pt-4 pb-1 px-3">
             <span className="text-[10px] font-bold text-gray-400 tracking-widest">Account</span>
          </div>
          <SidebarLink href="/technician/profile" current={pathname === "/technician/profile"} icon={<User size={18} />} label="Profile Settings" />
        </nav>

        <div className="p-3 border-t border-gray-200">
          <button 
             className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-gray-500 font-medium text-sm hover:bg-red-50 hover:text-red-600 transition-colors"
             onClick={() => {
                window.location.href = "/api/auth/signout";
             }}
          >
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-white">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur-md z-10">
            <div className="flex items-center gap-3">
               <button 
                 onClick={() => setIsMobileMenuOpen(true)}
                 className="lg:hidden p-1.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
               >
                  <Menu size={22} />
               </button>
               <h2 className="text-sm font-bold text-gray-800">
                  {pathname === "/technician" ? "Dashboard" : 
                   pathname === "/technician/jobs" ? "My Assignments" : 
                   pathname === "/technician/completed" ? "History" : "Account"}
               </h2>
            </div>
            <div className="flex items-center gap-4">
               <button className="p-2 text-gray-400 hover:text-gray-600 rounded-md hover:bg-gray-100 transition-all">
                  <Bell size={18} />
               </button>
               <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-500">
                  T
               </div>
            </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-50/50">
           <div className="p-4 sm:p-6 lg:p-10 max-w-7xl mx-auto">
              {children}
           </div>
        </main>
      </div>
    </div>
  );
}

function SidebarLink({ href, icon, label, current, onClick }: { href: string; icon: React.ReactNode; label: string; current?: boolean; onClick?: () => void }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2 rounded-md font-medium text-sm transition-all ${
        current 
        ? "bg-indigo-50 text-indigo-700 shadow-sm shadow-indigo-100/50" 
        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <span className={`${current ? "text-indigo-600" : "text-gray-400"}`}>{icon}</span>
      <span>{label}</span>
    </Link>
  );
}

