import React from "react";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    href: string;
  };
}

export const EmptyState = ({ icon: Icon, title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white border border-dashed border-gray-200 rounded-[32px]">
      <div className="w-20 h-20 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mb-6">
        <Icon size={40} strokeWidth={1.5} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm font-medium text-gray-500 max-w-sm mx-auto leading-relaxed mb-8">
        {description}
      </p>
      {action && (
        <Link
          href={action.href}
          className="inline-flex h-11 items-center px-8 bg-[#155dfc] text-white rounded-xl text-xs font-bold tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/10 active:scale-95"
        >
          {action.label}
        </Link>
      )}
    </div>
  );
};
