"use client";
import React, { useState, useEffect } from "react";
import { X, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const LeadPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    service: "AC REPAIR",
  });

  useEffect(() => {
    // Expose trigger globally
    (window as any).showLeadPopup = () => setIsOpen(true);

    const timer = setTimeout(() => {
      const hasSeenPopup = sessionStorage.getItem("hasSeenPopup");
      if (!hasSeenPopup) {
         setIsOpen(true);
      }
    }, 4000); // 4 seconds before opening

    return () => {
      clearTimeout(timer);
      delete (window as any).showLeadPopup;
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem("hasSeenPopup", "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/leads", formData);
      setIsSubmitted(true);
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
       console.error("Lead submission failed", error);
    } finally {
       setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="w-full max-w-lg bg-white rounded-2xl shadow-2xl relative overflow-hidden"
          >
            <button
               onClick={handleClose}
               className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
            >
               <X size={24} />
            </button>

            {!isSubmitted ? (
               <div className="p-8">
                 <div className="mb-6">
                    <h3 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">Need a Service in Jaipur?</h3>
                    <p className="text-gray-500 font-medium">Get a quick estimate or booking within minutes.</p>
                 </div>

                 <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                      <input
                         type="text"
                         required
                         className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                         placeholder="e.g. Rahul Sharma"
                         value={formData.name}
                         onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Mobile number</label>
                      <input
                         type="tel"
                         required
                         className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition"
                         placeholder="e.g. +91 99999 99999"
                         value={formData.phone}
                         onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Required Service</label>
                      <select
                         className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition bg-white"
                         value={formData.service}
                         onChange={(e) => setFormData({...formData, service: e.target.value})}
                      >
                         <option value="AC REPAIR">AC Repair & Maintenance</option>
                         <option value="RO REPAIR">RO Repair & Installation</option>
                         <option value="HOUSE CLEANING">House Cleaning</option>
                         <option value="ESTIMATION">General Inquiry / Estimation</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center space-x-2"
                    >
                       {loading ? "Submitting..." : "Get Quick Call Back"}
                    </button>
                    <p className="text-xs text-center text-gray-400 mt-4 italic">
                      Fastest response in Jaipur. Guaranteed.
                    </p>
                 </form>
               </div>
            ) : (
               <div className="p-12 text-center animate-in zoom-in-95 duration-500">
                  <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                     <CheckCircle2 size={40} className="text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">Request Received!</h3>
                  <p className="text-gray-600 mb-4">Our team will call you within <span className="font-bold text-blue-600">5 minutes</span>.</p>
                  <div className="h-1 bg-gray-100 rounded-full w-48 mx-auto mt-6">
                     <motion.div
                       initial={{ width: 0 }}
                       animate={{ width: "100%" }}
                       transition={{ duration: 3 }}
                       className="h-full bg-green-500 rounded-full"
                     />
                  </div>
               </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LeadPopup;
