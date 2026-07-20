import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { ShoppingCart, Star, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useApp();
  const [isAdding, setIsAdding] = useState(false);

  const formatNaira = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const handleAddToCart = () => {
    if (product.stock <= 0) return;
    
    setIsAdding(true);
    addToCart(product, 1);
    
    setTimeout(() => {
      setIsAdding(false);
    }, 1200);
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35 }}
      className="group bg-white rounded-2xl border border-slate-200 p-4 shadow-sm hover:shadow-md hover:border-slate-300/80 transition-all duration-300 flex flex-col h-full relative"
    >
      {/* Product Image Stage with decorative glow and rounded frame */}
      <div className="relative aspect-square bg-slate-100 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
        {/* Badges inside image frame */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
          <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded tracking-wide uppercase">
            {product.category === 'Fresh Produce' ? 'FRESH' : 'PREMIUM'}
          </span>
          {isOutOfStock && (
            <span className="bg-rose-100 text-rose-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
              Sold Out
            </span>
          )}
          {!isOutOfStock && product.stock < 10 && (
            <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide animate-pulse">
              Only {product.stock} Left
            </span>
          )}
        </div>

        {/* Dynamic ambient backdrop blur glow */}
        <div className="absolute w-20 h-20 bg-emerald-200 rounded-full blur-2xl opacity-40 group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

        <motion.img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/5 via-transparent to-transparent opacity-100 transition-opacity" />
      </div>

      {/* Product Info */}
      <div className="flex flex-col flex-grow">
        {/* Rating and Unit */}
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            {product.unit}
          </span>
          <div className="flex items-center gap-0.5 bg-slate-50 px-1.5 py-0.5 rounded">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span className="text-[10px] font-extrabold text-slate-600">{product.rating}</span>
          </div>
        </div>

        {/* Title */}
        <h4 className="font-bold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors line-clamp-1 mb-1">
          {product.name}
        </h4>

        {/* Description */}
        <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-normal flex-grow">
          {product.description}
        </p>

        {/* Buy Actions Footer */}
        <div className="flex items-center justify-between gap-2 mt-auto pt-3 border-t border-slate-100">
          <div className="flex flex-col">
            <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">Price</span>
            <span className="text-sm sm:text-base font-extrabold text-emerald-700">
              {formatNaira(product.price)}
            </span>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            disabled={isOutOfStock}
            onClick={handleAddToCart}
            className={`relative flex items-center justify-center w-8 h-8 rounded-lg transition-all cursor-pointer ${
              isOutOfStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : isAdding
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-900 hover:bg-emerald-600 text-white shadow-xs hover:shadow-sm'
            }`}
          >
            {isAdding ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <Check className="w-4 h-4 stroke-[3]" />
              </motion.div>
            ) : (
              <ShoppingCart className="w-4 h-4" />
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
export default ProductCard;
