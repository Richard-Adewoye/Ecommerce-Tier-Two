import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, CreditCard, Landmark, PhoneCall, RefreshCw, CheckCircle, XCircle } from 'lucide-react';

interface PaystackSimProps {
  isOpen: boolean;
  amount: number;
  email: string;
  onSuccess: (reference: string) => void;
  onClose: () => void;
}

export const PaystackSim: React.FC<PaystackSimProps> = ({
  isOpen,
  amount,
  email,
  onSuccess,
  onClose
}) => {
  const [activeTab, setActiveTab] = useState<'card' | 'bank' | 'ussd'>('card');
  const [payStatus, setPayStatus] = useState<'idle' | 'loading' | 'otp' | 'success' | 'failed'>('idle');
  
  // Card Inputs
  const [cardNumber, setCardNumber] = useState('4084 0812 3456 7890');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('321');
  const [otp, setOtp] = useState('');
  const [selectedOutcome, setSelectedOutcome] = useState<'success' | 'fail'>('success');

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPayStatus('loading');
    
    // Simulate loading authorization
    setTimeout(() => {
      setPayStatus('otp');
    }, 1500);
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPayStatus('loading');
    
    setTimeout(() => {
      if (selectedOutcome === 'success') {
        setPayStatus('success');
      } else {
        setPayStatus('failed');
      }
    }, 1800);
  };

  // Trigger Success Callback on complete
  useEffect(() => {
    if (payStatus === 'success') {
      const timer = setTimeout(() => {
        const reference = `PSTK-${Math.floor(100000000 + Math.random() * 900000000)}`;
        onSuccess(reference);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [payStatus]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 15 }}
          className="w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-slate-100"
          id="paystack-simulator-modal"
        >
          {/* Top Secure Header bar */}
          <div className="bg-slate-50 border-b border-slate-100 p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              <Shield className="w-4 h-4 text-emerald-500 fill-emerald-500/10" />
              <span>SECURED BY paystack</span>
            </div>
            <button 
              onClick={onClose}
              disabled={payStatus === 'loading'}
              className="text-xs font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              Cancel
            </button>
          </div>

          {/* Supermarket Header */}
          <div className="bg-emerald-600 text-white p-5 flex items-center justify-between">
            <div>
              <p className="text-[10px] text-emerald-200 uppercase font-black tracking-widest">PAYING TO</p>
              <h4 className="text-base font-bold">NaijaMart Supermarket</h4>
              <p className="text-xs text-emerald-100/80 truncate max-w-[200px] mt-0.5">{email}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-emerald-200 uppercase font-black tracking-widest">AMOUNT</p>
              <p className="text-lg font-black">{formatNaira(amount)}</p>
            </div>
          </div>

          {/* Sandbox Demo Helper */}
          {payStatus !== 'success' && payStatus !== 'failed' && (
            <div className="bg-amber-50 border-b border-amber-100 px-5 py-2.5 flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-800 flex items-center gap-1">
                <span>⚠️ TEST MODE: Select desired outcome</span>
              </span>
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedOutcome('success')}
                  className={`px-2 py-0.5 text-[9px] font-extrabold uppercase rounded-full border transition-all ${
                    selectedOutcome === 'success'
                      ? 'bg-emerald-500 text-white border-transparent'
                      : 'bg-white text-slate-500 border-slate-200'
                  }`}
                >
                  Success
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOutcome('fail')}
                  className={`px-2 py-0.5 text-[9px] font-extrabold uppercase rounded-full border transition-all ${
                    selectedOutcome === 'fail'
                      ? 'bg-rose-500 text-white border-transparent'
                      : 'bg-white text-slate-500 border-slate-200'
                  }`}
                >
                  Decline
                </button>
              </div>
            </div>
          )}

          {/* Gateway Tabs */}
          {payStatus === 'idle' && (
            <div className="flex border-b border-slate-100 text-xs">
              <button
                onClick={() => setActiveTab('card')}
                className={`flex-1 py-3 font-bold text-center border-b-2 flex items-center justify-center gap-1.5 ${
                  activeTab === 'card' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>Card</span>
              </button>
              <button
                onClick={() => setActiveTab('bank')}
                className={`flex-1 py-3 font-bold text-center border-b-2 flex items-center justify-center gap-1.5 ${
                  activeTab === 'bank' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Landmark className="w-3.5 h-3.5" />
                <span>Bank Transfer</span>
              </button>
              <button
                onClick={() => setActiveTab('ussd')}
                className={`flex-1 py-3 font-bold text-center border-b-2 flex items-center justify-center gap-1.5 ${
                  activeTab === 'ussd' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>USSD</span>
              </button>
            </div>
          )}

          {/* Screen Content Panels */}
          <div className="p-5 flex-1 min-h-[220px] flex flex-col justify-center">
            {payStatus === 'idle' && (
              <>
                {activeTab === 'card' && (
                  <form onSubmit={handlePaymentSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Card Number</label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden font-mono tracking-wider text-slate-700"
                        placeholder="0000 0000 0000 0000"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Expiry Date</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden font-mono text-slate-700"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">CVV</label>
                        <input
                          type="password"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full px-3.5 py-2.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden font-mono text-slate-700"
                          placeholder="000"
                          required
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg text-sm transition-colors mt-2 cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                    >
                      <span>Pay {formatNaira(amount)}</span>
                    </button>
                  </form>
                )}

                {activeTab === 'bank' && (
                  <div className="text-center space-y-4">
                    <p className="text-xs font-semibold text-slate-500 leading-normal">
                      To complete via Mock Bank Transfer, send the exact sum of <span className="font-bold text-slate-800">{formatNaira(amount)}</span> to:
                    </p>
                    <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-4 inline-block w-full">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">MOCK PAYSTACK ACCOUNT</p>
                      <h5 className="text-lg font-extrabold text-slate-800 mt-1">9921 8294 0210</h5>
                      <p className="text-xs text-slate-600 font-bold mt-0.5">WEMA Bank (Paystack Account)</p>
                    </div>
                    <button
                      onClick={() => setPayStatus('loading')}
                      className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                    >
                      I have made the transfer
                    </button>
                  </div>
                )}

                {activeTab === 'ussd' && (
                  <div className="text-center space-y-4">
                    <p className="text-xs text-slate-500 leading-normal font-semibold">
                      Select your simulated bank USSD code below to initiate checkout:
                    </p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {['*737# GTBank', '*901# Access', '*894# FirstBank', '*966# ZenithBank'].map((code) => (
                        <button
                          key={code}
                          onClick={() => setPayStatus('loading')}
                          className="p-3 border border-slate-100 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/25 rounded-xl font-bold text-slate-700 transition-all text-left"
                        >
                          {code}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Spinner Progress Loading Screen */}
            {payStatus === 'loading' && (
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-8">
                <RefreshCw className="w-10 h-10 text-emerald-500 animate-spin" />
                <div>
                  <h5 className="font-bold text-slate-800 text-sm">Processing Transaction</h5>
                  <p className="text-xs text-slate-400 mt-1">Validating security logs & bank callbacks...</p>
                </div>
              </div>
            )}

            {/* OTP Simulator PIN Entry Screen */}
            {payStatus === 'otp' && (
              <form onSubmit={handleOtpSubmit} className="space-y-4">
                <div className="text-center space-y-1.5">
                  <h5 className="font-bold text-slate-800 text-sm">Enter Secure OTP Code</h5>
                  <p className="text-xs text-slate-500 max-w-xs mx-auto font-medium">
                    A test verification pin has been logged. Enter <span className="font-bold text-emerald-600">123456</span> to authorize payment.
                  </p>
                </div>
                <div>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    className="w-32 mx-auto text-center tracking-[12px] font-black text-lg px-2 py-2 border border-slate-300 rounded-lg focus:border-emerald-500 outline-hidden block text-slate-700"
                    placeholder="******"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Verify Payment Code
                </button>
              </form>
            )}

            {/* Transaction Success Overlay */}
            {payStatus === 'success' && (
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <CheckCircle className="w-16 h-16 text-emerald-500 fill-emerald-50" />
                </motion.div>
                <div>
                  <h4 className="font-black text-slate-800 text-base">Payment Successful</h4>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs leading-normal">
                    Amount: <span className="font-bold text-slate-700">{formatNaira(amount)}</span>. <br />
                    Redirecting to your digital printable invoice receipt...
                  </p>
                </div>
              </div>
            )}

            {/* Transaction Failed Overlay */}
            {payStatus === 'failed' && (
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  <XCircle className="w-16 h-16 text-rose-500 fill-rose-50" />
                </motion.div>
                <div>
                  <h4 className="font-black text-slate-800 text-base">Transaction Declined</h4>
                  <p className="text-xs text-rose-500/80 font-medium max-w-xs leading-normal mt-1">
                    The payment request was rejected by customer simulator. Check account balance or try a different outcome card.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setPayStatus('idle')}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Return to Card Inputs
                </button>
              </div>
            )}
          </div>

          {/* Secure SSL Notice */}
          <div className="bg-slate-50 border-t border-slate-100 p-3 text-center text-[10px] text-slate-400 font-medium">
            🛡️ 256-bit Secure Sockets Layer (SSL) connection active.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
export default PaystackSim;
