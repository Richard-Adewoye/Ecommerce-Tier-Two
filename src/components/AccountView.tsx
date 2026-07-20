import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import { User, Phone, MapPin, Receipt, ClipboardList, HelpCircle, ChevronRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const AccountView: React.FC = () => {
  const { currentUser, orders, updateProfile, setSelectedOrderId, setCurrentView, showToast } = useApp();

  // Profile forms
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(name, phone, address);
  };

  const handleViewReceipt = (orderId: string) => {
    setSelectedOrderId(orderId);
    setCurrentView('receipt');
  };

  // Filter orders belonging to current user
  const userOrders = orders.filter(
    (order) => order.customerInfo.email.toLowerCase() === currentUser?.email.toLowerCase()
  );

  const getStatusBadge = (status: Order['status']) => {
    const classes = {
      Pending: 'bg-amber-100 text-amber-800',
      Processing: 'bg-indigo-100 text-indigo-800',
      'Out for Delivery': 'bg-sky-100 text-sky-800',
      Delivered: 'bg-emerald-100 text-emerald-800',
      Cancelled: 'bg-rose-100 text-rose-800'
    };
    return (
      <span className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full tracking-wider ${classes[status] || 'bg-slate-100 text-slate-800'}`}>
        {status}
      </span>
    );
  };

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h3 className="text-xl font-bold text-slate-800 font-sans">Access Denied</h3>
        <p className="text-sm text-slate-500 font-medium">Please sign in to access your membership account profile and past histories.</p>
        <button
          onClick={() => setCurrentView('auth')}
          className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-lg text-xs"
        >
          Sign In Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-emerald-600" />
          <span>My Account & Membership Workspace</span>
        </h2>
        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider mt-1">Manage profiles & review previous transactions</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column Profile settings */}
        <div className="lg:col-span-4 bg-white border border-slate-100 p-6 rounded-2xl space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-3">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800">
              Personal Profile Info
            </h3>
            <p className="text-xs text-slate-400 font-medium">Verify your direct contact details</p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Account ID</label>
              <input
                type="text"
                value={currentUser.id}
                disabled
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 border border-slate-100 text-slate-400 rounded-xl outline-none font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-700 font-medium"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                value={currentUser.email}
                disabled
                className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-100 text-slate-400 rounded-xl outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Telephone Line</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-700"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Saved Shipping Address</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-3 text-slate-400 w-4 h-4" />
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none text-slate-700 leading-relaxed"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs transition-colors cursor-pointer mt-4"
              id="account-profile-submit"
            >
              Update Membership Profile
            </button>
          </form>
        </div>

        {/* Right Column Order History */}
        <div className="lg:col-span-8 bg-white border border-slate-100 p-6 rounded-2xl space-y-6 shadow-sm">
          <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <ClipboardList className="w-5 h-5 text-emerald-600" />
                <span>Your Transaction History</span>
              </h3>
              <p className="text-xs text-slate-400 font-semibold">Review your digital printable invoice sheets</p>
            </div>
            <span className="text-xs bg-slate-100 font-extrabold text-slate-600 px-2.5 py-1 rounded-full">
              {userOrders.length} Orders
            </span>
          </div>

          {userOrders.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mx-auto">
                <Receipt className="w-6 h-6" />
              </div>
              <p className="text-sm text-slate-500 font-medium">You haven\'t made any premium transactions on your profile yet.</p>
              <button
                onClick={() => setCurrentView('shop')}
                className="px-4 py-2 bg-emerald-55 text-white font-bold rounded-xl text-xs hover:bg-emerald-600 cursor-pointer"
              >
                Browse Shop Catalog
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {userOrders.map((order) => (
                <div
                  key={order.id}
                  className="p-4 border border-slate-100 hover:border-slate-200 hover:shadow-xs rounded-xl transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1 flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-black text-slate-800 font-mono">{order.orderId}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                      {new Date(order.createdAt).toLocaleDateString('en-NG', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-slate-500 font-medium truncate max-w-sm">
                      <span className="font-bold text-slate-700">Items:</span>
                      <span className="truncate">
                        {order.items.map((i) => `${i.product.name} (x${i.quantity})`).join(', ')}
                      </span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto gap-2 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-50">
                    <div className="text-left sm:text-right">
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Sum Paid</p>
                      <h5 className="text-sm font-black text-slate-800 mt-0.5">{formatNaira(order.grandTotal)}</h5>
                    </div>
                    <button
                      onClick={() => handleViewReceipt(order.id)}
                      className="px-3.5 py-1.5 bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 text-slate-600 hover:text-emerald-700 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                      id={`view-receipt-btn-${order.orderId}`}
                    >
                      <span>Digital Receipt</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AccountView;
