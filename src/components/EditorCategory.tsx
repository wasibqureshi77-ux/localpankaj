"use client";
import React from "react";

interface CategoryProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  children: React.ReactNode;
}

export function EditorCategory({ icon, title, desc, children }: CategoryProps) {
  return (
    <div className="p-12 bg-white border border-indigo-50 rounded-[3.5rem] shadow-2xl shadow-indigo-500/5 hover:shadow-indigo-500/10 transition-shadow">
      <div className="flex items-center space-x-6 mb-10 pb-10 border-b border-indigo-50">
        <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl shadow-inner">{icon}</div>
        <div>
          <h3 className="app-h3 ">{title}</h3>
          <p className="text-[10px] font-extrabold text-indigo-400 tracking-widest mt-1">{desc}</p>
        </div>
      </div>
      {children}
    </div>
  );
}

