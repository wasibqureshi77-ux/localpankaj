"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Palette, 
  Image as ImageIcon, 
  Type, 
  Smartphone, 
  Globe, 
  LogOut,
  Edit3,
  CheckCircle,
  Eye,
  Settings,
  Menu,
  X
} from "lucide-react";
import { signOut } from "next-auth/react";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const isLoginPage = pathname === "/editor/login";

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-indigo-50/10 flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-indigo-600/20">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#e0e7ff_0%,_#f8fafc_100%)] z-0" />
         <div className="relative z-10 w-full flex flex-col items-center">
            {children}
         </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-indigo-50/30 overflow-hidden font-sans selection:bg-indigo-600/20">
      {/* Mobile Sidebar Toggle */}
      <button 
         onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
         className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-indigo-600 text-white rounded-full shadow-2xl shadow-indigo-500/20 active:scale-95 transition-all"
      >
         {isSidebarOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-0 z-40 w-80 bg-white border-r border-indigo-100 flex flex-col transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-12 border-b border-indigo-50 bg-gradient-to-br from-indigo-50 to-transparent mb-8">
           <Link href="/editor" className="text-3xl font-extrabold tracking-tighter italic text-indigo-900 flex items-center space-x-2">
              <span className="p-2 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-500/30"><Edit3 size={32}/></span>
              <span>EDITOR</span>
           </Link>
           <p className="text-[10px] font-bold text-indigo-400 mt-6 tracking-[0.3em] uppercase pl-1">Creative Control</p>
        </div>

        <nav className="flex-1 px-8 space-y-3 font-bold text-[10px] tracking-[0.15em] uppercase text-indigo-900/60">
           <EditorSidebarLink href="/editor" icon={<Globe size={20}/>} label="Site Structure" active={pathname === "/editor"} />
           <EditorSidebarLink href="/editor/theme" icon={<Palette size={20}/>} label="Visual Identity" active={pathname === "/editor/theme"} />
           <EditorSidebarLink href="/editor/media" icon={<ImageIcon size={20}/>} label="Media Library" active={pathname === "/editor/media"} />
           <EditorSidebarLink href="/editor/content" icon={<Type size={20}/>} label="Content Engine" active={pathname === "/editor/content"} />
           <EditorSidebarLink href="/editor/seo" icon={<Smartphone size={20}/>} label="SEO & Social" active={pathname === "/editor/seo"} />
        </nav>

        <div className="p-8 border-t border-indigo-50 mt-auto bg-indigo-50/10">
           <div className="flex items-center space-x-4 mb-8 bg-indigo-600/5 p-4 rounded-3xl border border-indigo-600/10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center font-extrabold text-white text-lg shadow-lg">EP</div>
               <div>
                  <div className="text-[11px] font-extrabold tracking-tight text-indigo-900 mb-0.5">Pankaj Sharma</div>
                  <div className="text-[8px] font-bold text-indigo-400 uppercase tracking-widest">Chief Editor</div>
               </div>
           </div>
           
           <button 
              onClick={() => signOut({ callbackUrl: "/" })}
              className="w-full flex items-center justify-center space-x-3 text-indigo-600 hover:text-indigo-800 transition-all px-5 py-4 rounded-2xl bg-indigo-600/5 hover:bg-indigo-600/10 font-bold text-[10px] uppercase tracking-widest border border-indigo-600/10 shadow-sm"
           >
              <LogOut size={16} />
              <span>Leave Studio</span>
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col relative bg-white">
          {/* Top Navbar */}
          <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-3xl border-b border-indigo-50 px-12 py-8 flex items-center justify-between">
             <div className="flex items-center space-x-4">
                <span className="p-2 bg-indigo-50 text-indigo-600 rounded-xl"><Eye size={20}/></span>
                <span className="text-[11px] font-black text-indigo-900 uppercase tracking-widest">Preview Mode: Jaipur Live</span>
             </div>
             
             <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 px-6 py-3 bg-indigo-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-indigo-600/20 transform hover:-translate-y-0.5 transition-all">
                   <Settings size={16}/>
                   <span>Global Config</span>
                </button>
                <div className="w-[1px] h-8 bg-indigo-100" />
                <div className="flex items-center space-x-2 text-green-500 font-bold text-[10px] uppercase tracking-widest">
                   <CheckCircle size={16} />
                   <span>Draft Saved</span>
                </div>
             </div>
          </header>

          {/* Page Content */}
          <div className="p-12 lg:p-20 flex-1 relative animate-in fade-in slide-in-from-right-10 duration-700">
             {children}
          </div>
      </main>
    </div>
  );
}

function EditorSidebarLink({ href, icon, label, active }: any) {
  return (
    <Link 
      href={href} 
      className={`
        flex items-center space-x-5 px-6 py-5 rounded-3xl transition-all duration-300 relative overflow-hidden group
        ${active ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-600/30 font-black' : 'text-indigo-900/40 hover:text-indigo-900 hover:bg-indigo-50'}
      `}
    >
      <div className={`${active ? 'text-white' : 'text-indigo-400 group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-300'}`}>{icon}</div>
      <span className="text-[10px] tracking-[0.2em] font-black">{label}</span>
      {active && <div className="absolute left-0 top-0 bottom-0 w-1 bg-white" />}
    </Link>
  );
}
