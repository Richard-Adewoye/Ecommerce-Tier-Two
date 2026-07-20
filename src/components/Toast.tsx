import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500" />,
    info: <Info className="w-5 h-5 text-amber-500" />
  };

  const borderColors = {
    success: 'border-emerald-500/20 bg-emerald-50/95 dark:bg-emerald-950/90',
    error: 'border-rose-500/20 bg-rose-50/95 dark:bg-rose-950/90',
    info: 'border-amber-500/20 bg-amber-50/95 dark:bg-amber-950/90'
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md max-w-sm ${borderColors[toast.type]}`}
      >
        <div className="flex-shrink-0">{icons[toast.type]}</div>
        <p className="text-sm font-medium text-slate-800 dark:text-slate-100">{toast.message}</p>
      </motion.div>
    </AnimatePresence>
  );
};
export default Toast;
