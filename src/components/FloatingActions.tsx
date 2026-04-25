"use client";

import React, { useEffect, useState } from "react";
import { Phone, ShoppingCart } from "lucide-react";
import axios from "axios";
import Link from "next/link";

const FloatingActions = () => {
  const [phone, setPhone] = useState("8000023359");
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await axios.get("/api/site-config");
        if (data?.phone) {
          setPhone(data.phone.replace(/\s+/g, ""));
        }
      } catch (err) {
        console.error("Floating actions config fetch error:", err);
      }
    };

    const updateCartCount = () => {
      try {
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartCount(savedCart.length);
      } catch (err) {
        setCartCount(0);
      }
    };

    fetchConfig();
    updateCartCount();

    window.addEventListener('storage', updateCartCount);
    // Interval check as fallback for same-tab updates not triggering 'storage'
    const interval = setInterval(updateCartCount, 1000);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      clearInterval(interval);
    };
  }, []);

  const whatsappUrl = `https://wa.me/${phone.includes("+") ? phone : "+91" + phone}`;
  const callUrl = `tel:${phone.includes("+") ? phone : "+91" + phone}`;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-[99] pointer-events-none px-6 flex items-end justify-between">
      {/* WhatsApp Button - Left Corner */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-2xl hover:bg-[#128C7E] transition-all hover:scale-110 active:scale-95 group"
        aria-label="Chat on WhatsApp"
      >
        <svg 
          viewBox="0 0 24 24" 
          width="30" 
          height="30" 
          fill="currentColor"
          className="group-hover:animate-pulse"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.03c0 2.123.554 4.197 1.604 6.06L0 24l6.117-1.605a11.79 11.79 0 005.925 1.585h.005c6.637 0 12.032-5.396 12.035-12.03a11.799 11.799 0 00-3.417-8.467z"/>
        </svg>
      </a>

      {/* Cart Button - Center */}
      <Link
        href="/cart"
        className={`pointer-events-auto flex items-center space-x-2 px-6 h-12 bg-[#155dfc] text-white rounded-full shadow-2xl hover:bg-blue-700 transition-all hover:scale-105 active:scale-95 group ${cartCount === 0 ? "opacity-0 invisible translate-y-10" : "opacity-100 visible translate-y-0"}`}
      >
        <div className="relative">
          <ShoppingCart size={20} />
          <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[10px] font-bold w-4.5 h-4.5 flex items-center justify-center rounded-full border-2 border-[#155dfc]">
            {cartCount}
          </span>
        </div>
        <span className="text-[11px] font-black uppercase tracking-widest whitespace-nowrap">Go to Cart</span>
      </Link>

      {/* Call Button - Right Corner */}
      <a
        href={callUrl}
        className="pointer-events-auto flex items-center justify-center w-14 h-14 bg-[#155dfc] text-white rounded-full shadow-2xl hover:bg-blue-700 transition-all hover:scale-110 active:scale-95 group"
        aria-label="Call Support"
      >
        <Phone size={24} className="group-hover:animate-shake" />
      </a>
      
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(-10deg); }
          75% { transform: rotate(10deg); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default FloatingActions;
