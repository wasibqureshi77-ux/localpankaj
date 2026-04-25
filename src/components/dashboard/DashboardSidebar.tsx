import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  LogOut, 
  User, 
  Home,
  X
} from "lucide-react";
import { signOut } from "next-auth/react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DashboardSidebar = ({ isOpen, onClose }: SidebarProps) => {
  const pathname = usePathname();

  const navLinks = [
    { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
    { href: "/dashboard/bookings", label: "Bookings", icon: Calendar },
    { href: "/dashboard/profile", label: "Profile Settings", icon: User },
  ];

  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-gray-100 flex flex-col transform transition-transform duration-300 ease-in-out lg:static lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Brand Section */}
      <div className="h-20 flex items-center justify-between px-8 border-b border-gray-50">
        <Link href="/" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 bg-[#155dfc] rounded-lg flex items-center justify-center text-white font-black text-lg transition-transform group-hover:scale-105">
            L
          </div>
          <span className="text-xl font-black text-gray-900 tracking-tight">
            Local<span className="text-[#155dfc]">Pankaj</span>
          </span>
        </Link>
        <button onClick={onClose} className="lg:hidden p-2 text-gray-400 hover:text-gray-900">
          <X size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-8 px-4 space-y-1">
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`
                flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-bold transition-all
                ${isActive 
                  ? "bg-[#155dfc] text-white shadow-lg shadow-blue-500/10" 
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"}
              `}
            >
              <Icon size={18} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions */}
      <div className="p-4 border-t border-gray-50 space-y-1">
        <Link 
          href="/" 
          className="flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold text-gray-500 hover:text-[#155dfc] hover:bg-blue-50 transition-all uppercase tracking-wider"
        >
          <Home size={16} />
          <span>Back to Site</span>
        </Link>
        <button 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-xs font-bold text-red-500 hover:bg-red-50 transition-all uppercase tracking-wider"
        >
          <LogOut size={16} />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};
