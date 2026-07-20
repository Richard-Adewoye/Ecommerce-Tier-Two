import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Truck, CheckSquare } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative bg-slate-900 text-white overflow-hidden py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      {/* Absolute Decorative Background Elements */}
      <div className="absolute inset-0 z-0 opacity-40">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1600"
          alt="Supermarket aisle"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left column text content */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-semibold text-emerald-400"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fastest Same-Day Delivery in Lagos</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight"
          >
            Freshly Harvested, <br />
            <span className="text-emerald-500">Premium Groceries</span> <br />
            Delivered in Hours.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-slate-300 text-base md:text-lg max-w-xl font-normal leading-relaxed"
          >
            Skip the traffic at Mile 12 or Balogun. Shop Abuja yams, sweet plantains, organic tomatoes, fresh catfish, and pantry essentials online with trusted Paystack checkout.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <a
              href="#catalog-section"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/25 group"
            >
              <span>Shop Fresh Arrivals</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#delivery-zones-notice"
              className="inline-flex items-center gap-2 px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-xl transition-all border border-slate-700"
            >
              <span>View Delivery Rates</span>
            </a>
          </motion.div>

          {/* Core USP Badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg"
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Same-Day</p>
                <p className="text-[10px] text-slate-400">Mainland & Island</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <CheckSquare className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Super Fresh</p>
                <p className="text-[10px] text-slate-400">100% Quality Check</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold text-white">Best Pricing</p>
                <p className="text-[10px] text-slate-400">Direct Farm Sourced</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right column promo graphics/features */}
        <div className="lg:col-span-5 hidden lg:block">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative bg-slate-800/40 backdrop-blur-md border border-slate-700/50 p-6 rounded-2xl shadow-2xl"
          >
            <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4">Naija Favorites of the Week</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-2 hover:bg-slate-800/30 rounded-xl transition-all">
                <img
                  src="https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&q=80&w=120"
                  alt="Abuja Yam"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-xs font-bold text-white">Fresh Abuja Yam Tuber</p>
                  <p className="text-[10px] text-slate-400">Sourced directly from Abuja farms</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-emerald-400">₦4,500</p>
                  <p className="text-[9px] text-slate-500">per tuber</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 hover:bg-slate-800/30 rounded-xl transition-all">
                <img
                  src="https://images.unsplash.com/photo-1566393028639-d108a42c46a7?auto=format&fit=crop&q=80&w=120"
                  alt="Plantain Bunch"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-xs font-bold text-white">Yellow Ripe Plantains</p>
                  <p className="text-[10px] text-slate-400">Sweet, firm, 1 bunch (5-7 pcs)</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-emerald-400">₦2,800</p>
                  <p className="text-[9px] text-slate-500">per bunch</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-2 hover:bg-slate-800/30 rounded-xl transition-all">
                <img
                  src="https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=120"
                  alt="Mama Pride Rice"
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="text-xs font-bold text-white">Mama\'s Pride Rice (5kg)</p>
                  <p className="text-[10px] text-slate-400">Premium stone-free long grain</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-emerald-400">₦9,200</p>
                  <p className="text-[9px] text-slate-500">5kg bag</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
