import React from 'react';
import { useApp } from '../context/AppContext';
import { X, ShoppingBag, Plus, Minus, Trash2, ShieldCheck, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    deliveryZones,
    selectedZone,
    setSelectedZone,
    setCurrentView
  } = useApp();

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

  const handleCheckoutClick = () => {
    setCartOpen(false);
    setCurrentView('checkout');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Dark Overlay Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-xs"
            id="cart-overlay"
          />

          {/* Right Sliding Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 z-50 w-full sm:max-w-md h-full bg-white shadow-2xl flex flex-col border-l border-slate-100"
            id="cart-drawer-panel"
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg">Your Cart</h3>
                  <p className="text-xs font-semibold text-slate-400">
                    {cart.length === 0 ? 'Empty' : `${cart.reduce((sum, i) => sum + i.quantity, 0)} items`}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Body Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {cart.length === 0 ? (
                /* Empty Cart State */
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-base">Your cart is empty</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs">
                      Looks like you haven\'t added any premium groceries to your cart yet.
                    </p>
                  </div>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition-colors shadow-xs"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                /* Itemized List */
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-50">
                    <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">Item Details</span>
                    <button
                      onClick={clearCart}
                      className="text-xs font-semibold text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Clear Cart</span>
                    </button>
                  </div>

                  <div className="divide-y divide-slate-100">
                    {cart.map((item) => (
                      <div key={item.product.id} className="py-4 flex gap-3.5 first:pt-0">
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Description & Quantities */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h5 className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                              {item.product.name}
                            </h5>
                            <p className="text-[10px] text-slate-400 font-medium">
                              Unit: {item.product.unit} | {formatNaira(item.product.price)}
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-2 mt-1">
                            {/* Counter buttons */}
                            <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-slate-50">
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                                className="p-1 rounded-md hover:bg-white text-slate-500 transition-colors cursor-pointer"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-bold text-slate-700 px-2.5 min-w-[24px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                                className="p-1 rounded-md hover:bg-white text-slate-500 transition-colors cursor-pointer"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            {/* Item Subtotal */}
                            <span className="text-xs font-black text-slate-800 tabular-nums">
                              {formatNaira(item.product.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Rate Zone Quick Select */}
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700">Delivery Zone Rate:</span>
                      <span className="text-[10px] bg-slate-100 font-bold px-2 py-0.5 rounded-full text-slate-500 uppercase tracking-wide">
                        Lagos Hubs
                      </span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {deliveryZones.map((zone) => (
                        <div
                          key={zone.id}
                          onClick={() => setSelectedZone(zone)}
                          className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                            selectedZone?.id === zone.id
                              ? 'border-emerald-500 bg-emerald-50/40 shadow-xs'
                              : 'border-slate-100 hover:border-slate-200'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-800">{zone.name}</span>
                            <span className="text-xs font-black text-emerald-700 tabular-nums">{formatNaira(zone.fee)}</span>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-0.5 font-medium leading-tight">
                            {zone.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Order Pricing Summary Footer */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50 space-y-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Subtotal</span>
                    <span className="font-semibold text-slate-700 tabular-nums">{formatNaira(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <span>VAT (5%)</span>
                      <HelpCircle className="w-3 h-3 text-slate-400" title="Government Value Added Tax" />
                    </span>
                    <span className="font-semibold text-slate-700 tabular-nums">{formatNaira(estimatedTax)}</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Delivery Fee ({selectedZone?.name})</span>
                    <span className="font-semibold text-slate-700 tabular-nums">{formatNaira(deliveryFee)}</span>
                  </div>
                  <div className="h-px bg-slate-200 my-2"></div>
                  <div className="flex justify-between text-base font-bold text-slate-900">
                    <span>Total</span>
                    <span className="text-base sm:text-lg font-black text-slate-900 tabular-nums">
                      {formatNaira(grandTotal)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2.5 pt-1">
                  <button
                    onClick={handleCheckoutClick}
                    className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-100 cursor-pointer"
                  >
                    <span>Checkout via</span>
                    <span className="font-black italic text-white tracking-tight">paystack</span>
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[9px] text-slate-400 font-semibold uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Encrypted checkout. Secure & fast payment.</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default CartDrawer;
