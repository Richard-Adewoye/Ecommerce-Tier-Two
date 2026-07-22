import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, User, Mail, Lock, Phone, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export const AuthView: React.FC = () => {
  const { login, register, setCurrentView, showToast } = useApp();
  const [activeTab, setActiveTab] = useState<'signin' | 'register' | 'forgot'>('signin');
  
  // Sign In inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Register inputs
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Forgot password inputs
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotStep, setForgotStep] = useState<1 | 2>(1);
  const [newPassword, setNewPassword] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      setCurrentView('shop');
    } else {
      showToast(result.error || 'Login failed', 'error');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const result = register(regName, regEmail, regPhone, regAddress, regPassword);
    if (result.success) {
      setCurrentView('shop');
    } else {
      showToast(result.error || 'Registration failed', 'error');
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotStep === 1) {
      setForgotStep(2);
      showToast('Mock password reset code simulated to your email!', 'info');
    } else {
      showToast('Mock password reset successful! Logging in...', 'success');
      // Auto login
      const result = login(forgotEmail, newPassword);
      if (result.success) {
        setCurrentView('shop');
      } else {
        setActiveTab('signin');
      }
    }
  };

  const triggerTestLogin = (role: 'customer' | 'admin') => {
    if (role === 'customer') {
      setEmail('customer@naijamart.com');
      setPassword('customer123');
      const result = login('customer@naijamart.com', 'customer123');
      if (result.success) setCurrentView('shop');
    } else {
      setEmail('admin@naijamart.com');
      setPassword('admin123');
      const result = login('admin@naijamart.com', 'admin123');
      if (result.success) setCurrentView('admin');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      {/* Visual Logo banner */}
      <div className="text-center space-y-2 mb-8">
        <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto text-emerald-600 shadow-sm">
          <Sparkles className="w-6 h-6 animate-pulse" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">NaijaMart Member Center</h2>
        <p className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Secure Portal Credentials</p>
      </div>

      {/* Main card */}
      <div className="bg-white border border-slate-100 rounded-3xl shadow-xl overflow-hidden">
        {/* Tab switchers */}
        {activeTab !== 'forgot' && (
          <div className="flex border-b border-slate-100 bg-slate-50 text-xs">
            <button
              onClick={() => setActiveTab('signin')}
              className={`flex-1 py-4 font-extrabold text-center transition-all ${
                activeTab === 'signin'
                  ? 'bg-white border-b-2 border-emerald-600 text-slate-800'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              Sign In Account
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-4 font-extrabold text-center transition-all ${
                activeTab === 'register'
                  ? 'bg-white border-b-2 border-emerald-600 text-slate-800'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              Register New Membership
            </button>
          </div>
        )}

        <div className="p-6 sm:p-8">
          {activeTab === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="customer@naijamart.com"
                    className="w-full pl-11 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden text-slate-700 font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('forgot');
                      setForgotStep(1);
                    }}
                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden text-slate-700"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm shadow-emerald-500/10 cursor-pointer mt-6"
                id="auth-login-submit"
              >
                <span>Authorize Login</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {activeTab === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
                  <input
                    type="text"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Ayo David"
                    className="w-full pl-11 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden text-slate-700 font-medium"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
                  <input
                    type="email"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="ayo.david@example.com"
                    className="w-full pl-11 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden text-slate-700"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
                  <input
                    type="tel"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="0803 123 4567"
                    className="w-full pl-11 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden text-slate-700"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Default Delivery Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
                  <input
                    type="text"
                    value={regAddress}
                    onChange={(e) => setRegAddress(e.target.value)}
                    placeholder="15 Agbowo Shopping Complex, UI, Ibadan, Oyo State"
                    className="w-full pl-11 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden text-slate-700"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Secure Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
                  <input
                    type="password"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden text-slate-700"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm shadow-emerald-500/10 cursor-pointer mt-6"
                id="auth-register-submit"
              >
                <span>Register Membership</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {activeTab === 'forgot' && (
            <form onSubmit={handleForgotSubmit} className="space-y-4">
              <div className="border-b border-slate-100 pb-2 mb-4">
                <h4 className="font-bold text-slate-800 text-sm">Reset Password Token</h4>
                <p className="text-xs text-slate-400 leading-normal">Recover your account settings using password token verification.</p>
              </div>

              {forgotStep === 1 ? (
                <>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Enter your Email</label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
                      <input
                        type="email"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        placeholder="customer@naijamart.com"
                        className="w-full pl-11 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden text-slate-700"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer"
                  >
                    Send Reset Token
                  </button>
                </>
              ) : (
                <>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Set New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 w-4.5 h-4.5" />
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        className="w-full pl-11 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-hidden text-slate-700"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs cursor-pointer"
                  >
                    Confirm & Save Password
                  </button>
                </>
              )}

              <button
                type="button"
                onClick={() => setActiveTab('signin')}
                className="w-full py-2 text-xs font-bold text-slate-500 hover:text-slate-800 block text-center"
              >
                Return to Login
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Quick Test Logins selection */}
      <div className="mt-8 bg-slate-50 border border-slate-200/60 p-5 rounded-2xl space-y-3.5">
        <h4 className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest text-center">
          ⚡ DEMO TEAM QUICK CREDENTIAL TESTING
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => triggerTestLogin('customer')}
            className="p-3 bg-white border border-slate-200 hover:border-emerald-500 rounded-xl text-left cursor-pointer transition-all shadow-xs group"
            id="demo-customer-login"
          >
            <span className="text-[9px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 py-0.5 rounded-full uppercase">
              Customer
            </span>
            <p className="text-xs font-bold text-slate-800 mt-1.5 group-hover:text-emerald-700">Ayo David</p>
            <p className="text-[10px] text-slate-400 truncate mt-0.5 font-mono">customer@naijamart.com</p>
          </button>

          <button
            onClick={() => triggerTestLogin('admin')}
            className="p-3 bg-white border border-slate-200 hover:border-amber-500 rounded-xl text-left cursor-pointer transition-all shadow-xs group"
            id="demo-admin-login"
          >
            <span className="text-[9px] bg-amber-100 text-amber-800 font-extrabold px-1.5 py-0.5 rounded-full uppercase">
              Admin
            </span>
            <p className="text-xs font-bold text-slate-800 mt-1.5 group-hover:text-amber-700">Ayo David (Admin)</p>
            <p className="text-[10px] text-slate-400 truncate mt-0.5 font-mono font-medium">admin@naijamart.com</p>
          </button>
        </div>
      </div>
    </div>
  );
};
export default AuthView;
