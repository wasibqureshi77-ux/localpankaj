"use client";
import React, { useEffect, useState, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building,
  ArrowRight,
  ShieldCheck,
  Package,
  Calendar,
  Clock,
  CreditCard,
  HandCoins,
  CheckCircle2
} from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";
import Image from "next/image";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const CheckoutPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "Jaipur", 
    pincode: "",
    state: "Rajasthan",
    bookingDate: new Date().toISOString().split('T')[0],
    bookingTime: "Anytime",
    paymentMethod: "PAY_ON_VISIT", // Default
  });

  useEffect(() => {
    // 1. Load Cart
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    if (savedCart.length === 0) {
      toast.error("Your basket is empty");
      router.push("/cart");
      return;
    }
    setCartItems(savedCart);

    // 2. Pre-fill from Session
    if (session?.user) {
      setFormData(prev => ({
        ...prev,
        name: session.user.name || "",
        email: session.user.email || "",
        phone: session.user.phone || "",
        address: session.user.address || "",
        city: session.user.city || "Jaipur",
        pincode: session.user.pincode || "",
        state: session.user.state || "Rajasthan",
      }));
    }

    // 3. Load Razorpay Script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [session, router]);

  const total = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

  const handleRazorpayPayment = async (leadId: string) => {
    try {
      // 1. Create Order
      const { data: order } = await axios.post("/api/payment/order", {
        amount: total,
        currency: "INR",
        receipt: leadId
      });

      // 2. Open Razorpay Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        amount: order.amount,
        currency: order.currency,
        name: "Local Pankaj",
        description: `Payment for ${cartItems.map(i => i.name).join(", ")}`,
        order_id: order.id,
        handler: async (response: any) => {
          // Verification
          try {
            await axios.post("/api/payment/verify", {
               razorpay_order_id: response.razorpay_order_id,
               razorpay_payment_id: response.razorpay_payment_id,
               razorpay_signature: response.razorpay_signature,
               leadId
            });
            toast.success("Payment successful!");
            finalizeCheckout();
          } catch (err) {
            toast.error("Payment verification failed. Please contact support.");
            finalizeCheckout(); // Still move forward but payment is failed
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#2563eb"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response: any){
          toast.error("Payment Failed: " + response.error.description);
          finalizeCheckout();
      });
      rzp.open();

    } catch (err: any) {
      console.error("Razorpay error:", err);
      toast.error(err.response?.data?.error || "Payment initialization failed.");
      setIsSubmitting(false);
    }
  };

  const finalizeCheckout = () => {
    localStorage.setItem("cart", "[]");
    window.dispatchEvent(new Event('storage'));
    router.push("/dashboard/bookings");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const leadData = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode,
        state: formData.state,
        bookingDate: formData.bookingDate,
        bookingTime: formData.bookingTime,
        service: cartItems.map(i => i.name).join(", "),
        category: cartItems[0]?.category,
        price: total.toString(),
        paymentMethod: formData.paymentMethod,
        status: "UNASSIGNED",
      };

      const response = await axios.post("/api/leads", leadData);
      const lead = response.data;
      
      if (response.status === 201 || response.status === 200) {
        // Update user profile if logged in
        if (session?.user?.id) {
           await axios.patch(`/api/users/${session.user.id}`, {
              address: formData.address,
              city: formData.city,
              pincode: formData.pincode,
              state: formData.state,
              phone: formData.phone
           }).catch(err => console.error("Profile update failed", err));
        }

        if (formData.paymentMethod === "ONLINE") {
           await handleRazorpayPayment(lead._id);
        } else {
           toast.success("Booking Request Submitted Successfully!");
           finalizeCheckout();
        }
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(error.response?.data?.message || "Failed to submit request");
      setIsSubmitting(false);
    }
  };

  if (status === "loading") {
    return (
       <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
             <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
             <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Validating Session...</p>
          </div>
       </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50/50 font-sans">
      <Header />
      
      {/* Dynamic Header */}
      <section className="bg-neutral-900 pt-32 pb-12 px-4 shadow-xl">
         <div className="container mx-auto">
            <h1 className="text-4xl font-extrabold text-white mb-4 tracking-tight uppercase italic">Secure Checkout.</h1>
            <nav className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-gray-500">
               <Link href="/cart" className="hover:text-blue-500 transition">Basket</Link>
               <span>/</span>
               <span className="text-gray-300">Dispatch Details</span>
            </nav>
         </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Form Section */}
            <div className="lg:col-span-7 space-y-10">
               {/* Personal Details Section */}
               <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-4 mb-10">
                     <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                        <User size={24} />
                     </div>
                     <div>
                        <h2 className="text-2xl font-black text-gray-950 uppercase italic tracking-tighter">Personal Details</h2>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Identify the service recipient</p>
                     </div>
                  </div>

                  <form className="space-y-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 col-span-full">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Full Name*</label>
                           <div className="relative group">
                              <User className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                              <input 
                                 type="text"
                                 value={formData.name}
                                 onChange={(e) => setFormData({...formData, name: e.target.value})}
                                 placeholder="Enter your name"
                                 className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent focus:border-blue-600/20 focus:bg-white rounded-3xl outline-none transition-all font-bold text-gray-950 placeholder:text-gray-300"
                                 required
                              />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Email Address</label>
                           <div className="relative group">
                              <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                              <input 
                                 type="email"
                                 value={formData.email}
                                 onChange={(e) => setFormData({...formData, email: e.target.value})}
                                 placeholder="your@email.com"
                                 className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent focus:border-blue-600/20 focus:bg-white rounded-3xl outline-none transition-all font-bold text-gray-950 placeholder:text-gray-300"
                              />
                           </div>
                        </div>

                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Mobile Number*</label>
                           <div className="relative group">
                              <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" size={18} />
                              <input 
                                 type="tel"
                                 value={formData.phone}
                                 onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                 placeholder="10-digit number"
                                 className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent focus:border-blue-600/20 focus:bg-white rounded-3xl outline-none transition-all font-bold text-gray-950 placeholder:text-gray-300"
                                 required
                              />
                           </div>
                        </div>
                     </div>
                  </form>
               </div>

               {/* Dispatch Address Section */}
               <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-4 mb-10">
                     <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                        <MapPin size={24} />
                     </div>
                     <div>
                        <h2 className="text-2xl font-black text-gray-950 uppercase italic tracking-tighter">Dispatch Address</h2>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Where should we send the expert?</p>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Complete Address*</label>
                        <div className="relative group">
                           <Building className="absolute left-6 top-6 text-gray-400 group-focus-within:text-orange-600 transition-colors" size={18} />
                           <textarea 
                              value={formData.address}
                              onChange={(e) => setFormData({...formData, address: e.target.value})}
                              placeholder="House no, Street name, Landmark..."
                              rows={3}
                              className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent focus:border-orange-600/20 focus:bg-white rounded-3xl outline-none transition-all font-bold text-gray-950 placeholder:text-gray-300 resize-none"
                              required
                           />
                        </div>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">City / Area</label>
                           <input 
                              type="text"
                              value={formData.city}
                              onChange={(e) => setFormData({...formData, city: e.target.value})}
                              className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent focus:border-orange-600/20 focus:bg-white rounded-3xl outline-none transition-all font-bold text-gray-950"
                           />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Pincode</label>
                           <input 
                              type="text"
                              value={formData.pincode}
                              onChange={(e) => setFormData({...formData, pincode: e.target.value})}
                              className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent focus:border-orange-600/20 focus:bg-white rounded-3xl outline-none transition-all font-bold text-gray-950 placeholder:text-gray-300"
                              placeholder="302001"
                           />
                        </div>
                     </div>
                  </div>
               </div>

               {/* Payment Method Section */}
               <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-4 mb-10">
                     <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center text-green-600">
                        <CreditCard size={24} />
                     </div>
                     <div>
                        <h2 className="text-2xl font-black text-gray-950 uppercase italic tracking-tighter">Payment Mode</h2>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Choose how you want to pay</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <button 
                        onClick={() => setFormData({...formData, paymentMethod: "PAY_ON_VISIT"})}
                        className={`p-8 rounded-[2rem] border-2 transition-all text-left flex flex-col space-y-4 ${formData.paymentMethod === "PAY_ON_VISIT" ? "border-green-500 bg-green-50/20" : "border-gray-50 bg-gray-50/50 hover:border-gray-200"}`}
                     >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${formData.paymentMethod === "PAY_ON_VISIT" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400"}`}>
                           <HandCoins size={20} />
                        </div>
                        <div>
                           <div className="text-lg font-black text-gray-950 uppercase italic tracking-tighter">Pay on Visit</div>
                           <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Pay expert after service</div>
                        </div>
                        {formData.paymentMethod === "PAY_ON_VISIT" && <CheckCircle2 className="text-green-500 mt-auto ml-auto" size={20} />}
                     </button>

                     <button 
                        onClick={() => setFormData({...formData, paymentMethod: "ONLINE"})}
                        className={`p-8 rounded-[2rem] border-2 transition-all text-left flex flex-col space-y-4 ${formData.paymentMethod === "ONLINE" ? "border-blue-500 bg-blue-50/20" : "border-gray-50 bg-gray-50/50 hover:border-gray-200"}`}
                     >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${formData.paymentMethod === "ONLINE" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-400"}`}>
                           <CreditCard size={20} />
                        </div>
                        <div>
                           <div className="text-lg font-black text-gray-950 uppercase italic tracking-tighter">Pay Online</div>
                           <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Credit/Debit/UPI/Wallets</div>
                        </div>
                        {formData.paymentMethod === "ONLINE" && <CheckCircle2 className="text-blue-500 mt-auto ml-auto" size={20} />}
                     </button>
                  </div>
               </div>

               {/* Scheduling Section */}
               <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
                  <div className="flex items-center space-x-4 mb-10">
                     <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600">
                        <Calendar size={24} />
                     </div>
                     <div>
                        <h2 className="text-2xl font-black text-gray-950 uppercase italic tracking-tighter">Scheduling</h2>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Time slot for inspection</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Preferred Date</label>
                        <input 
                           type="date"
                           value={formData.bookingDate}
                           min={new Date().toISOString().split('T')[0]}
                           onChange={(e) => setFormData({...formData, bookingDate: e.target.value})}
                           className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent focus:border-purple-600/20 focus:bg-white rounded-3xl outline-none transition-all font-bold text-gray-950"
                        />
                     </div>
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Preferred Time</label>
                        <select 
                           value={formData.bookingTime}
                           onChange={(e) => setFormData({...formData, bookingTime: e.target.value})}
                           className="w-full px-8 py-5 bg-gray-50 border-2 border-transparent focus:border-purple-600/20 focus:bg-white rounded-3xl outline-none transition-all font-bold text-gray-950"
                        >
                           <option value="Anytime">Anytime</option>
                           <option value="Morning">Morning (9AM - 12PM)</option>
                           <option value="Afternoon">Afternoon (12PM - 4PM)</option>
                           <option value="Evening">Evening (4PM - 8PM)</option>
                        </select>
                     </div>
                  </div>
               </div>
            </div>

            {/* Sidebar Summary */}
            <div className="lg:col-span-5 relative">
               <div className="sticky top-32 space-y-8">
                  <div className="bg-neutral-900 p-10 rounded-[4rem] shadow-2xl text-white relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 blur-3xl rounded-full" />
                     
                     <h3 className="text-2xl font-black italic tracking-tighter uppercase mb-10 relative z-10">Order Summary.</h3>
                     
                     <div className="space-y-6 mb-10 relative z-10 max-h-[300px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-white/10">
                        {cartItems.map((item) => (
                           <div key={item.cartId} className="flex items-center space-x-5 group">
                              <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center p-2">
                                 {item.image ? (
                                    <Image src={item.image} alt={item.name} width={40} height={40} className="object-cover rounded-lg" />
                                 ) : (
                                    <Package size={20} className="text-blue-500" />
                                 )}
                              </div>
                              <div className="flex-1">
                                 <div className="text-[9px] font-black text-blue-500 uppercase tracking-widest mb-1">{item.subCategory}</div>
                                 <div className="text-sm font-bold text-gray-200 line-clamp-1">{item.name}</div>
                              </div>
                              <div className="text-right font-black italic">₹{item.price}</div>
                           </div>
                        ))}
                     </div>

                     <div className="space-y-4 mb-10 border-t border-white/10 pt-8 relative z-10">
                        <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                           <span>Sub-Total</span>
                           <span className="text-white">₹{total}</span>
                        </div>
                        <div className="flex justify-between text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                           <span>Dispatch Fee</span>
                           <span className="text-green-500 font-black">FREE</span>
                        </div>
                     </div>

                     <div className="flex items-center justify-between mb-12 relative z-10 p-6 bg-white/5 rounded-[2.5rem] border border-white/5">
                        <div className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Total Payable</div>
                        <div className="text-5xl font-black italic tracking-tighter text-blue-500">₹{total}</div>
                     </div>

                     <button 
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white py-8 rounded-[2rem] font-black text-base uppercase tracking-widest transition-all shadow-3xl shadow-blue-500/20 active:scale-95 disabled:opacity-50 disabled:active:scale-100 group"
                     >
                        {isSubmitting ? (
                           <>
                              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              <span>Processing...</span>
                           </>
                        ) : (
                           <>
                              <span>{formData.paymentMethod === "ONLINE" ? "Pay & Book Now" : "Complete Booking"}</span>
                              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                           </>
                        )}
                     </button>

                     <div className="mt-8 flex items-center justify-center space-x-2 text-[9px] font-black text-gray-500 uppercase tracking-[0.2em]">
                        <ShieldCheck size={14} className="text-green-500" />
                        <span>Secured by Jaipur Shield</span>
                     </div>
                  </div>

                  <div className="bg-white p-8 rounded-[3rem] border border-gray-100 shadow-sm">
                     <div className="flex items-center space-x-5 mb-6">
                        <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                           <Clock size={24} />
                        </div>
                        <div>
                           <div className="text-[10px] font-black text-gray-950 uppercase tracking-widest">Response SLA</div>
                           <div className="text-xs font-bold text-gray-500">60min Dispatch Commitment</div>
                        </div>
                     </div>
                     <p className="text-[11px] text-gray-400 font-medium leading-relaxed italic">
                        Our nearest technical unit will be dispatched immediately once the request is verified by our control center.
                     </p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

// Next.js client component hydration wrapper
import Link from "next/link";
export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <CheckoutPage />
    </Suspense>
  );
}
