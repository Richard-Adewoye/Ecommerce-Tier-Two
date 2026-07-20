import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutView } from './components/CheckoutView';
import { ReceiptView } from './components/ReceiptView';
import { AuthView } from './components/AuthView';
import { AccountView } from './components/AccountView';
import { AdminPortal } from './components/AdminPortal';
import { Toast } from './components/Toast';
import { ShieldCheck, Truck, RotateCcw, AlertCircle } from 'lucide-react';

const MainAppContent: React.FC = () => {
  const { products, currentView, setCurrentView } = useApp();
  
  // States managed locally but passed to components
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter products based on search and category
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans">
      {/* Dynamic Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Main Container Stage */}
      <main className="flex-grow">
        {currentView === 'shop' && (
          <div className="space-y-12 pb-16">
            {/* Promo banner hero */}
            <Hero />

            {/* Catalog list section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8" id="catalog-section">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {selectedCategory === 'All' ? 'Browse All Groceries' : selectedCategory}
                  </h3>
                  <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">
                    Showing {filteredProducts.length} premium quality items
                  </p>
                </div>
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg flex items-center gap-1"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Search</span>
                  </button>
                )}
              </div>

              {filteredProducts.length === 0 ? (
                /* Empty results container */
                <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 p-8 space-y-4 max-w-lg mx-auto shadow-sm">
                  <div className="w-14 h-14 bg-amber-50 rounded-full flex items-center justify-center text-amber-500 mx-auto">
                    <AlertCircle className="w-7 h-7" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-base">No grocery items found</h4>
                    <p className="text-xs text-slate-400 leading-normal max-w-xs mx-auto mt-1">
                      We couldn\'t find any match for "{searchQuery}" under {selectedCategory}. Try adjusting your keywords or category.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('All');
                    }}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                /* Products list grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>

            {/* In-depth delivery zone & logistics rate card notice */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16" id="delivery-zones-notice">
              <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-xl">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute w-72 h-72 rounded-full bg-emerald-500 -top-20 -right-20 blur-3xl" />
                </div>
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                  <div className="space-y-3">
                    <span className="text-[10px] bg-emerald-500 text-white font-extrabold px-3 py-1 rounded-full uppercase tracking-widest">
                      Logistics Coverage
                    </span>
                    <h4 className="text-2xl font-black">Lagos Delivery Logistics</h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      We dispatch straight from our temperature-controlled hubs in Ikeja and Lekki. Freshness guaranteed on arrival.
                    </p>
                  </div>

                  <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-800/50 border border-slate-700/50 p-4.5 rounded-2xl">
                      <h5 className="text-xs font-bold text-emerald-400">Mainland Rate</h5>
                      <p className="text-lg font-black mt-1">₦1,500.00</p>
                      <p className="text-[10px] text-slate-400 mt-1">Same-Day delivery within Ikeja, Yaba, Surulere, Gbagada etc.</p>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/50 p-4.5 rounded-2xl">
                      <h5 className="text-xs font-bold text-emerald-400">Island Rate</h5>
                      <p className="text-lg font-black mt-1">₦2,500.00</p>
                      <p className="text-[10px] text-slate-400 mt-1">Same-Day delivery within Lekki, Ikoyi, V.I., Ajah etc.</p>
                    </div>

                    <div className="bg-slate-800/50 border border-slate-700/50 p-4.5 rounded-2xl">
                      <h5 className="text-xs font-bold text-emerald-400">Outskirts Rate</h5>
                      <p className="text-lg font-black mt-1">₦3,500.00</p>
                      <p className="text-[10px] text-slate-400 mt-1">Next-Day delivery within Ikorodu, Badagry, Epe, LGAs.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Inner Router Views */}
        {currentView === 'checkout' && <CheckoutView />}
        {currentView === 'receipt' && <ReceiptView />}
        {currentView === 'account' && <AccountView />}
        {currentView === 'admin' && <AdminPortal />}
        {currentView === 'auth' && <AuthView />}
      </main>

      {/* Persistent Shopping Cart slide-over */}
      <CartDrawer />

      {/* Floating toast triggers */}
      <Toast />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 py-12 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h4 className="text-slate-900 font-extrabold text-sm tracking-tight flex items-center gap-1.5">
              <span>NaijaMart Supermarket</span>
            </h4>
            <p className="leading-relaxed font-medium text-slate-400">
              Nigeria\'s leading premium e-commerce food supermarket. Fast, reliable, direct farm sourcing, and seamless local checkouts.
            </p>
            <div className="flex gap-4 pt-1.5 text-slate-400">
              {/* social indicators */}
              <span className="hover:text-emerald-600 cursor-pointer">Instagram</span>
              <span className="hover:text-emerald-600 cursor-pointer">Twitter</span>
              <span className="hover:text-emerald-600 cursor-pointer">Facebook</span>
            </div>
          </div>

          <div className="space-y-3">
            <h5 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Quick Shortcuts</h5>
            <ul className="space-y-2 font-medium text-slate-400">
              <li><button onClick={() => setCurrentView('shop')} className="hover:text-emerald-600 cursor-pointer text-left">Browse Groceries</button></li>
              <li><button onClick={() => setCurrentView('account')} className="hover:text-emerald-600 cursor-pointer text-left">My Account Settings</button></li>
              <li><button onClick={() => setCurrentView('admin')} className="hover:text-emerald-600 cursor-pointer text-left">Admin Operations</button></li>
              <li><button onClick={() => setCurrentView('auth')} className="hover:text-emerald-600 cursor-pointer text-left">Join Membership</button></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h5 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Supermarket Categories</h5>
            <ul className="space-y-2 font-medium text-slate-400">
              <li><button onClick={() => { setSelectedCategory('Fresh Produce'); setCurrentView('shop'); }} className="hover:text-emerald-600 text-left">Fresh Produce & Tubers</button></li>
              <li><button onClick={() => { setSelectedCategory('Grocery Staples'); setCurrentView('shop'); }} className="hover:text-emerald-600 text-left">Rice, Noodles & Flour</button></li>
              <li><button onClick={() => { setSelectedCategory('Bakery & Breakfast'); setCurrentView('shop'); }} className="hover:text-emerald-600 text-left">Freshly Baked Bread</button></li>
              <li><button onClick={() => { setSelectedCategory('Drinks & Beverages'); setCurrentView('shop'); }} className="hover:text-emerald-600 text-left">Drinks & Malt Beverages</button></li>
            </ul>
          </div>

          <div className="space-y-3 bg-slate-50 border border-slate-100 p-4.5 rounded-2xl">
            <h5 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider">Payment Safety</h5>
            <p className="leading-relaxed text-[11px] text-slate-400">
              We integrate official Paystack secure checkouts. All cards, transfers, and USSD dials are processed with verified SSL encryption layers.
            </p>
            <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold uppercase tracking-wider mt-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>SSL SECURED CONNECT</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-100 mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
          <div className="flex gap-4">
            <span>© 2026 NaijaMart Super</span>
            <span>Delivery Partner: Gokada</span>
          </div>
          <div className="flex gap-4 items-center">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>API System Operational</span>
            </span>
            <span>Support: 0800-NAIJA-MART</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
