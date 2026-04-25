import React from "react";
import { User, Mail, Phone, MapPin, Edit2 } from "lucide-react";

interface ProfileItemProps {
  label: string;
  value: string;
  icon: React.ElementType;
}

const ProfileItem = ({ label, value, icon: Icon }: ProfileItemProps) => (
  <div className="flex items-start space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors group">
    <div className="w-10 h-10 bg-gray-50 text-gray-400 rounded-xl flex items-center justify-center group-hover:bg-[#155dfc] group-hover:text-white transition-colors flex-shrink-0">
      <Icon size={18} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">{label}</p>
      <p className="text-sm font-bold text-gray-900 break-words">{value || "Not provided"}</p>
    </div>
  </div>
);

interface ProfileCardProps {
  user: any;
  address?: string;
}

export const ProfileCard = ({ user, address }: ProfileCardProps) => {
  return (
    <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-8 border-b border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-50 text-[#155dfc] rounded-lg">
            <User size={20} />
          </div>
          <h3 className="text-lg font-bold text-gray-900">Personal Information</h3>
        </div>
        <button className="text-gray-400 hover:text-[#155dfc] transition-colors p-2 rounded-lg hover:bg-blue-50">
          <Edit2 size={18} />
        </button>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-2">
        <ProfileItem label="Full Name" value={user?.name} icon={User} />
        <ProfileItem label="Email Address" value={user?.email} icon={Mail} />
        <ProfileItem label="Phone Number" value={user?.phone} icon={Phone} />
        <ProfileItem label="Last Service Address" value={address || "Jaipur, Rajasthan"} icon={MapPin} />
      </div>
    </div>
  );
};
