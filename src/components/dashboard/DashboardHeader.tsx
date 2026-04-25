import React from "react";
import { Menu, Bell } from "lucide-react";

interface HeaderProps {
  userName: string;
  onOpenSidebar: () => void;
}

export const DashboardHeader = ({ userName, onOpenSidebar }: HeaderProps) => {
  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
      <div className="flex items-center space-x-4">
        <button 
          onClick={onOpenSidebar}
          className="lg:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-lg"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-bold text-gray-900 hidden sm:block">Dashboard</h1>
      </div>

      <div className="flex items-center space-x-6">
        <button className="text-gray-400 hover:text-gray-900 transition-colors relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </button>
        
        <div className="flex items-center space-x-3 pl-6 border-l border-gray-100">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-gray-900 leading-none mb-1">{userName}</p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Verified Member</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#155dfc] flex items-center justify-center font-bold text-sm border border-blue-100 shadow-sm transition-transform hover:scale-105 cursor-pointer">
            {initials || "U"}
          </div>
        </div>
      </div>
    </header>
  );
};
