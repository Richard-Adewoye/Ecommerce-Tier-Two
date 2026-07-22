import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Printer, ArrowLeft, Download, ShoppingBag, ShieldCheck } from 'lucide-react';

export const ReceiptView: React.FC = () => {
  const { orders, selectedOrderId, setCurrentView } = useApp();
  const receiptRef = useRef<HTMLDivElement>(null);

  const order = orders.find((o) => o.id === selectedOrderId);

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!order) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h3 className="text-lg font-bold text-slate-800">No order receipt selected</h3>
        <button
          onClick={() => setCurrentView('shop')}
          className="px-5 py-2.5 bg-emerald-600 text-white font-bold rounded-lg text-xs"
        >
          Return to Shop Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      {/* Back button */}
      <button
        onClick={() => setCurrentView('shop')}
        className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 cursor-pointer transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Shopping</span>
      </button>

      {/* Main Printable Till Receipt Card */}
      <div 
        ref={receiptRef}
        className="bg-white border border-slate-100 rounded-3xl shadow-xl overflow-hidden relative print:border-0 print:shadow-none"
        id="order-receipt-card"
      >
        {/* Top green success banner */}
        <div className="bg-emerald-600 text-white p-6 text-center space-y-3">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mx-auto text-emerald-100">
            <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
          </div>
          <div>
            <span className="text-[10px] bg-emerald-700 font-extrabold px-3 py-1 rounded-full uppercase tracking-widest text-emerald-100">
              Payment Confirmed
            </span>
            <h3 className="text-lg font-extrabold mt-2">Thank you for your order!</h3>
            <p className="text-xs text-emerald-100/90 mt-0.5">Your payment was secured & validated via Paystack.</p>
          </div>
        </div>

        {/* Till invoice body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Core metadata: Order ID and dates */}
          <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-100 text-xs text-slate-500 font-medium">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Order Reference</p>
              <p className="text-slate-800 font-black text-sm mt-0.5">{order.orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase font-bold text-slate-400">Date & Time</p>
              <p className="text-slate-800 font-semibold mt-0.5">
                {new Date(order.createdAt).toLocaleDateString('en-NG', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          {/* Delivery & Logistics */}
          <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs space-y-3">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px] text-emerald-700">
              Logistics Delivery details
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 leading-relaxed">
              <div>
                <span className="text-slate-400 font-bold block uppercase text-[9px]">Recipient</span>
                <span className="font-bold text-slate-700">{order.customerInfo.name}</span>
                <span className="text-slate-500 block text-[11px] mt-0.5">{order.customerInfo.phone}</span>
                <span className="text-slate-500 block text-[11px] truncate max-w-[200px]" title={order.customerInfo.email}>{order.customerInfo.email}</span>
              </div>
              <div>
                <span className="text-slate-400 font-bold block uppercase text-[9px]">Destination Address</span>
                <span className="font-semibold text-slate-600 block leading-normal">{order.customerInfo.address}</span>
                <span className="font-bold text-emerald-600 block mt-1.5 text-[11px]">{order.deliveryZone} Zone</span>
              </div>
            </div>
            <div className="pt-2 border-t border-slate-200/50 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] gap-1 text-slate-500">
              <span className="font-bold">Estimated Dispatch Window:</span>
              <span className="font-black text-slate-700">{order.estimatedDelivery}</span>
            </div>
          </div>

          {/* Itemized list table */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
              Purchased Grocery Items
            </h4>
            <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto pr-1">
              {order.items.map((item, idx) => (
                <div key={idx} className="py-3 flex justify-between items-center text-xs gap-4 first:pt-0">
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-800 truncate">{item.product.name}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {item.quantity} {item.quantity > 1 ? 'units' : 'unit'} &times; {formatNaira(item.product.price)}
                    </p>
                  </div>
                  <span className="font-black text-slate-800 flex-shrink-0 tabular-nums">
                    {formatNaira(item.subtotal)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing aggregates */}
          <div className="pt-4 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex justify-between text-slate-500 font-medium">
              <span>Subtotal Amount</span>
              <span className="text-slate-800 font-semibold tabular-nums">{formatNaira(order.subtotal)}</span>
            </div>
            <div className="flex justify-between text-slate-500 font-medium">
              <span>VAT / Taxes (5%)</span>
              <span className="text-slate-800 font-semibold tabular-nums">{formatNaira(order.tax)}</span>
            </div>
            <div className="flex justify-between text-slate-500 font-medium">
              <span>Logistics Delivery Fee</span>
              <span className="text-slate-800 font-semibold tabular-nums">{formatNaira(order.deliveryFee)}</span>
            </div>
            <div className="pt-3 border-t-2 border-dashed border-slate-200 flex justify-between items-center text-slate-900 font-black">
              <span className="text-sm">Total Paid Amount</span>
              <span className="text-lg text-emerald-600 tabular-nums">{formatNaira(order.grandTotal)}</span>
            </div>
          </div>

          {/* Paystack Reference logs */}
          {order.paymentDetails && (
            <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-[10px] text-slate-500 space-y-1">
              <div className="flex justify-between">
                <span>Transaction Ref:</span>
                <span className="font-mono font-bold text-slate-700">{order.paymentDetails.reference}</span>
              </div>
              <div className="flex justify-between">
                <span>Payment Channel:</span>
                <span className="font-semibold text-slate-700">{order.paymentDetails.channel}</span>
              </div>
              <div className="flex justify-between">
                <span>Processor Callback:</span>
                <span className="font-bold text-emerald-600">VERIFIED SUCCESSFUL</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom stylized jagged cut receipt border */}
        <div className="bg-slate-100 p-4 border-t border-dashed border-slate-200 flex items-center justify-center gap-1.5 text-[10px] text-slate-400 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Verified Digital Till Invoice • NaijaMart Supermarket</span>
        </div>
      </div>

      {/* Printable buttons row */}
      <div className="mt-6 flex gap-4 print:hidden">
        <button
          onClick={handlePrint}
          className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print Receipt</span>
        </button>
        <button
          onClick={() => setCurrentView('shop')}
          className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>
      </div>
    </div>
  );
};
export default ReceiptView;
