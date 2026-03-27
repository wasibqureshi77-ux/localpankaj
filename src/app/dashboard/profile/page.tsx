import React from "react";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  Edit2, 
  Save, 
  Trash2,
  Camera
} from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700">
      <div className="mb-16">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tighter italic">Your <span className="text-blue-600">Profile.</span></h1>
        <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Identity and Security Settings</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Left Column: Avatar & Basic Stats */}
        <div className="lg:col-span-1 space-y-10">
           <div className="bg-white p-12 rounded-[3.5rem] border border-gray-100 shadow-2xl shadow-blue-500/5 relative group">
              <div className="relative w-40 h-40 mx-auto mb-8">
                 <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center text-5xl font-black text-blue-600 shadow-inner">RS</div>
                 <button className="absolute bottom-2 right-2 p-4 bg-gray-900 text-white rounded-3xl hover:bg-blue-600 transition-all shadow-xl active:scale-90">
                    <Camera size={20} />
                 </button>
              </div>
              <div className="text-center">
                 <h2 className="text-2xl font-black text-gray-900 mb-1">Rahul Sharma</h2>
                 <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.2em] mb-8">VERIFIED MEMBER SINCE 2026</p>
              </div>
              
              <div className="pt-8 border-t border-gray-50 grid grid-cols-2 gap-4 text-center">
                 <div>
                    <div className="text-xl font-black text-gray-900">12</div>
                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Total Orders</div>
                 </div>
                 <div>
                    <div className="text-xl font-black text-blue-600">4.9</div>
                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Client Rating</div>
                 </div>
              </div>
           </div>

           <div className="bg-green-50 p-8 rounded-[2.5rem] border border-green-100 flex items-center space-x-5 group cursor-help">
              <div className="p-3 bg-white text-green-600 rounded-2xl shadow-sm"><ShieldCheck size={24}/></div>
              <div>
                 <div className="text-sm font-black text-green-900">Identity Secure</div>
                 <div className="text-[10px] font-black text-green-600/60 uppercase tracking-widest">Multi-factor Enabled</div>
              </div>
           </div>
        </div>

        {/* Right Column: Information Forms */}
        <div className="lg:col-span-2 space-y-12">
           <div className="bg-white p-12 rounded-[4rem] border border-gray-100 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-100 transition-opacity">
                 <Edit2 size={24} className="text-gray-200" />
              </div>
              
              <h3 className="text-2xl font-black text-gray-900 mb-12 tracking-tight border-b border-gray-50 pb-8 flex items-center space-x-4">
                 <span className="p-2 bg-blue-50 text-blue-600 rounded-xl"><User size={20}/></span>
                 <span>Personal Identity</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                 <ProfileField label="Legal Full Name" value="Rahul Sharma" icon={<User size={18}/>} />
                 <ProfileField label="Digital Communication" value="rahul@localpankaj.com" icon={<Mail size={18}/>} />
                 <ProfileField label="Direct Hotline" value="+91 99999 00001" icon={<Phone size={18}/>} />
                 <ProfileField label="Primary Location" value="Vaishali Nagar, Jaipur" icon={<MapPin size={18}/>} />
              </div>

              <div className="mt-16 flex items-center space-x-6">
                 <button className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] flex items-center space-x-3 shadow-2xl shadow-blue-500/20 hover:bg-blue-700 transition-all transform hover:-translate-y-1">
                    <Save size={18} />
                    <span>Confirm Updates</span>
                 </button>
                 <button className="text-gray-400 font-black text-[10px] uppercase tracking-widest hover:text-gray-900 transition-colors">Discard Draft</button>
              </div>
           </div>

           <div className="bg-red-50/30 p-12 rounded-[3.5rem] border border-red-50 flex items-center justify-between group">
              <div className="space-y-2">
                 <h4 className="text-xl font-black text-red-900 tracking-tight">Danger Territory</h4>
                 <p className="text-xs font-bold text-red-600 uppercase tracking-widest leading-relaxed">Permanently delete your profile and booking history from Local Pankaj.</p>
              </div>
              <button className="p-5 bg-white text-red-500 rounded-[1.5rem] hover:bg-red-500 hover:text-white transition-all shadow-xl shadow-red-500/5 active:scale-95">
                 <Trash2 size={24} />
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value, icon }: any) {
   return (
      <div className="space-y-4">
         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</label>
         <div className="flex items-center space-x-4 group/field bg-gray-50/50 p-5 rounded-2xl border border-transparent hover:border-blue-100 hover:bg-white transition-all cursor-text">
            <div className="text-gray-400 group-hover/field:text-blue-500 transition-colors">{icon}</div>
            <span className="text-sm font-black text-gray-900 flex-1">{value}</span>
         </div>
      </div>
   );
}
