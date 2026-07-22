import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingCart, User as UserIcon, ShieldAlert, Store, LogOut, Search, Menu, X } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}) => {
  const {
    cart,
    currentUser,
    setCartOpen,
    currentView,
    setCurrentView,
    logout
  } = useApp();

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotalAmount = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 backdrop-blur-md shadow-sm">
      {/* Top micro-banner with elegant uppercase styling */}
      <div className="bg-emerald-800 text-emerald-50 text-[10px] font-bold py-2 px-4 text-center tracking-widest">
        FREE PREMIUM DELIVERY ON ORDERS OVER ₦25,000 IN IBADAN, OYO STATE!
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand Logo - Styled as requested with underline decoration */}
          <div 
            onClick={() => setCurrentView('shop')}
            className="flex items-center gap-2 cursor-pointer select-none group"
            id="brand-logo"
          >
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center text-white shadow-sm transition-all group-hover:bg-emerald-700">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-emerald-900 flex items-center gap-1 leading-none">
                NaijaMart<span className="text-emerald-500 underline decoration-2 underline-offset-4 font-black">Super</span>
              </h1>
            </div>
          </div>

          {/* Search Box - matching the exact design spec styling */}
          {currentView === 'shop' ? (
            <div className="hidden md:flex flex-1 max-w-md relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search groceries..."
                className="w-full pl-10 pr-8 py-2 text-xs bg-slate-100 border-none rounded-full focus:outline-hidden focus:ring-2 focus:ring-emerald-500/30 transition-all text-slate-800"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            <div className="hidden md:flex flex-1 max-w-md"></div>
          )}

          {/* Navigation Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Quick Demo Notice / View Toggle */}
            <button
              onClick={() => setCurrentView('shop')}
              className={`hidden sm:inline-flex px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                currentView === 'shop'
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'text-slate-500 hover:text-emerald-600 transition-colors'
              }`}
            >
              Storefront
            </button>

            {/* Admin Portal Shortcut with elegant styling */}
            <button
              onClick={() => setCurrentView('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all relative ${
                currentView === 'admin'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-slate-900 hover:bg-emerald-600 text-white shadow-sm'
              }`}
              id="header-admin-btn"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin Panel</span>
            </button>

            {/* Auth / Profile Option */}
            {currentUser ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentView('account')}
                  className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all border ${
                    currentView === 'account'
                      ? 'bg-slate-100 text-slate-950 border-slate-300'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border-slate-200'
                  }`}
                  id="header-profile-btn"
                >
                  <UserIcon className="w-4 h-4 text-emerald-600" />
                  <span className="max-w-[80px] truncate hidden sm:inline">{currentUser.name.split(' ')[0]}</span>
                </button>

                <button
                  onClick={logout}
                  title="Logout"
                  className="p-2 rounded-full hover:bg-slate-50 border border-slate-200 text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentView('auth')}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold transition-all ${
                  currentView === 'auth'
                    ? 'bg-slate-900 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-500/10'
                }`}
                id="header-signin-btn"
              >
                <UserIcon className="w-4 h-4" />
                <span>Sign In</span>
              </button>
            )}

            {/* Cart Trigger with live count & sum */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setCartOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-full transition-all shadow-md relative"
              id="header-cart-btn"
            >
              <div className="relative">
                <ShoppingCart className="w-4.5 h-4.5" />
                {totalCartItems > 0 && (
                  <span className="absolute -top-2.5 -right-2.5 bg-emerald-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 animate-bounce">
                    {totalCartItems}
                  </span>
                )}
              </div>
              <span className="text-xs font-bold hidden md:inline">
                {totalCartItems > 0 ? formatNaira(cartTotalAmount) : 'Cart'}
              </span>
            </motion.button>
          </div>
        </div>

        {/* Categories Bar & Mobile Search */}
        {currentView === 'shop' && (
          <div className="border-t border-slate-100 py-3 flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Horizontal Categories Scroll */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full no-scrollbar pb-1 sm:pb-0">
              {['All', 'Fresh Produce', 'Grocery Staples', 'Bakery & Breakfast', 'Meat & Seafood', 'Drinks & Beverages', 'Personal & Home Care'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    selectedCategory === category
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Mobile Search Input */}
            <div className="md:hidden w-full relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fresh grocery items..."
                className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-hidden focus:border-emerald-500 transition-all text-slate-700"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
