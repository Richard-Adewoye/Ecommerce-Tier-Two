import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PaystackSim } from './PaystackSim';
import { ArrowLeft, ArrowRight, MapPin, User, ShieldCheck, Mail, Phone, ChevronRight, Check } from 'lucide-react';
import { motion } from 'motion/react';

export const CheckoutView: React.FC = () => {
  const {
    cart,
    currentUser,
    deliveryZones,
    selectedZone,
    setSelectedZone,
    placeOrder,
    setCurrentView
  } = useApp();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  
  // Paystack Modal triggers
  const [isPaystackOpen, setPaystackOpen] = useState(false);

  // Auto fill if user logged in
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setEmail(currentUser.email);
      setPhone(currentUser.phone);
      setAddress(currentUser.address);
    }
  }, [currentUser]);

  const cartSubtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const estimatedTax = Math.round(cartSubtotal * 0.05); // 5% VAT
  const deliveryFee = selectedZone ? selectedZone.fee : 0;
  const grandTotal = cartSubtotal + estimatedTax + deliveryFee;

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep((prev) => (prev + 1) as any);
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep((prev) => (prev - 1) as any);
    } else {
      setCurrentView('shop');
    }
  };

  const handlePaystackSuccess = (reference: string) => {
    setPaystackOpen(false);
    placeOrder(
      { name, email, phone, address },
      selectedZone?.id || 'lagos-mainland',
      reference
    );
  };

  // Guard against empty cart
  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-800">Your checkout cart is empty!</h3>
        <p className="text-sm text-slate-500">Add fresh groceries or items to proceed with the secure checkout simulation.</p>
        <button
          onClick={() => setCurrentView('shop')}
          className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 text-xs shadow-xs"
        >
          Return to Shop Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Checkout Header and Back button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrevStep}
            className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">Secure Checkout</h2>
            <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Simulated Paystack Sandbox Platform</p>
          </div>
        </div>

        {/* Step progress bar visual */}
        <div className="flex items-center gap-2 text-xs">
          {[1, 2, 3].map((num) => (
            <div key={num} className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-bold border transition-all ${
                  step === num
                    ? 'bg-emerald-600 border-transparent text-white ring-4 ring-emerald-100'
                    : step > num
                    ? 'bg-emerald-100 border-transparent text-emerald-700'
                    : 'bg-white border-slate-200 text-slate-400'
                }`}
              >
                {step > num ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : num}
              </div>
              <span className={`font-semibold hidden sm:inline ${step === num ? 'text-slate-800' : 'text-slate-400'}`}>
                {num === 1 ? 'Customer Info' : num === 2 ? 'Logistics Details' : 'Payment Method'}
              </span>
              {num < 3 && <ChevronRight className="w-4 h-4 text-slate-300 hidden sm:block" />}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column Forms (Checkout steps) */}
        <div className="lg:col-span-8 bg-white border border-slate-100 p-6 rounded-2xl">
          {step === 1 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-600" />
                  <span>1. Customer Personal Information</span>
                </h3>
                <p className="text-xs text-slate-400 font-medium">Provide your contact details. If logged in, these are auto-filled.</p>
              </div>

              {!currentUser && (
                <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 flex items-center justify-between">
                  <p className="text-xs text-emerald-800 font-medium">
                    Have an account? Login to auto-fill profiles and track previous order histories.
                  </p>
                  <button
                    type="button"
                    onClick={() => setCurrentView('auth')}
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg transition-colors"
                  >
                    Log In
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Recipient Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Chinedu Adebayo"
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden text-slate-700"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="chinedu@example.com"
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden text-slate-700"
                      required
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0803 123 4567"
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden text-slate-700"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex justify-end">
                <button
                  type="submit"
                  className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-sm shadow-emerald-500/10"
                >
                  <span>Logistics Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleNextStep} className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-emerald-600" />
                  <span>2. Shipping Address & Delivery Zones</span>
                </h3>
                <p className="text-xs text-slate-400 font-medium">Select a zone in Lagos to auto-calculate logistics and timeline delivery fees.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Street Address</label>
                  <textarea
                    rows={3}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter apartment, house number, estate road, and city location..."
                    className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden text-slate-700"
                    required
                  />
                </div>

                <div className="space-y-2.5">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Choose Delivery Area Rate</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {deliveryZones.map((zone) => (
                      <div
                        key={zone.id}
                        onClick={() => setSelectedZone(zone)}
                        className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                          selectedZone?.id === zone.id
                            ? 'border-emerald-500 bg-emerald-50/40 shadow-xs'
                            : 'border-slate-100 hover:border-slate-200 bg-slate-50/50'
                        }`}
                      >
                        <h4 className="text-xs font-bold text-slate-800">{zone.name}</h4>
                        <p className="text-[10px] text-slate-400 font-medium mt-1 mb-2 leading-tight">
                          {zone.description}
                        </p>
                        <div className="flex justify-between items-center mt-auto pt-2 border-t border-slate-200/50">
                          <span className="text-[9px] font-semibold text-slate-400 uppercase">Rate:</span>
                          <span className="text-xs font-black text-emerald-700">{formatNaira(zone.fee)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 cursor-pointer transition-all shadow-sm"
                >
                  <span>Select Payment Method</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                  <span>3. Payment Channel Gateway Integration</span>
                </h3>
                <p className="text-xs text-slate-400 font-semibold">Select your payment option to initiate transaction confirmation loops.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Paystack Option */}
                <div 
                  onClick={() => setPaystackOpen(true)}
                  className="p-5 rounded-2xl border border-emerald-400 bg-emerald-50/20 text-left hover:border-emerald-500 transition-all cursor-pointer shadow-xs flex items-start gap-4"
                  id="checkout-paystack-btn"
                >
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                    <svg className="w-5.5 h-5.5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <span>Paystack Web Checkout</span>
                      <span className="text-[8px] bg-emerald-600 font-extrabold text-white px-2 py-0.5 rounded-full uppercase tracking-wider">POPULAR</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-medium">
                      Authorize payments via card, instant bank transfer, or USSD dial codes securely using Paystack Sandbox environment.
                    </p>
                  </div>
                </div>

                {/* Cash on Delivery option (disabled in demo with friendly notice) */}
                <div className="p-5 rounded-2xl border border-slate-100 bg-slate-50/50 text-left opacity-70 cursor-not-allowed flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-500 flex items-center gap-1.5">
                      <span>Cash on Delivery</span>
                      <span className="text-[8px] bg-slate-400 font-extrabold text-white px-2 py-0.5 rounded-full uppercase tracking-wider">DISABLED</span>
                    </h4>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed font-medium">
                      Cash/POS payments on arrival are disabled for the demo version to fully emphasize the seamless digital transaction flows.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-4 py-2.5 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 text-xs font-bold transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setPaystackOpen(true)}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl text-sm shadow-md shadow-emerald-500/15 cursor-pointer animate-pulse"
                >
                  Launch Paystack Gateway
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column Order Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-55 border border-slate-100 p-6 rounded-2xl space-y-4">
            <h3 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider pb-3 border-b border-slate-100">
              Order Summary
            </h3>

            {/* Itemized summary list */}
            <div className="max-h-60 overflow-y-auto space-y-3.5 divide-y divide-slate-100/50 pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-3 pt-3.5 first:pt-0">
                  <div className="w-11 h-11 rounded-lg border border-slate-100 overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h5 className="text-xs font-bold text-slate-700 truncate">{item.product.name}</h5>
                    <p className="text-[10px] text-slate-400 font-semibold mt-0.5">
                      {item.quantity} x {formatNaira(item.product.price)}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-slate-700 self-center">
                    {formatNaira(item.product.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations math list */}
            <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-500">
                <span>Items Subtotal</span>
                <span className="font-semibold text-slate-700">{formatNaira(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>VAT / Tax (5%)</span>
                <span className="font-semibold text-slate-700">{formatNaira(estimatedTax)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Delivery Logistics ({selectedZone?.name || 'None'})</span>
                <span className="font-semibold text-slate-700">
                  {selectedZone ? formatNaira(selectedZone.fee) : 'Select Zone'}
                </span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between text-slate-900 font-black">
                <span className="text-sm">Grand Total Amount</span>
                <span className="text-base text-emerald-600">{formatNaira(grandTotal)}</span>
              </div>
            </div>

            {/* Delivery Timeline info */}
            {selectedZone && (
              <div className="bg-slate-100/40 p-3 rounded-xl border border-slate-200/50 text-[11px] text-slate-500 leading-normal flex flex-col gap-1">
                <span className="font-bold text-slate-700 uppercase tracking-wide text-[9px]">Estimated Dispatch Window:</span>
                <span>{selectedZone.timeline}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Embedded paystack simulator */}
      <PaystackSim
        isOpen={isPaystackOpen}
        amount={grandTotal}
        email={email || 'guest@example.com'}
        onSuccess={handlePaystackSuccess}
        onClose={() => setPaystackOpen(false)}
      />
    </div>
  );
};
export default CheckoutView;
