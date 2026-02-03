import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Trash2, Check, Star } from 'lucide-react';
import { toggleWishlist } from '../../redux/wishlistSlice';
import { addToCart } from '../../redux/cartSlice';

const ProductCard = ({ item, isWishlistPage = false }) => {
  const dispatch = useDispatch();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevents navigation if wrapped in a Link
    dispatch(addToCart(item));
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <motion.div
      layout
      className="group relative h-100 bg-white overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500"
    >
      {/* --- Image Section --- */}
      <div className="relative h-full w-full overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
        />
        
        {/* Initially Visible Info (Overlay) */}
        <div className="absolute bottom-0 inset-x-0 p-6 bg-linear-to-t from-black/70 via-black/20 to-transparent group-hover:opacity-0 transition-opacity duration-300">
          <p className="text-[12px] text-slate-300 uppercase tracking-[0.2em] mb-1">{item.category}</p>
          <h3 className="text-white font-medium text-lg uppercase tracking-tight truncate">{item.name}</h3>
          <p className="text-white font-bold mt-1">₹{item.price.toLocaleString()}</p>
        </div>

        {/* Wishlist/Delete Toggle */}
        <button 
          onClick={() => dispatch(toggleWishlist(item))}
          className="absolute top-4 right-4 z-30 p-2.5 bg-white/10 backdrop-blur-md text-white hover:bg-white hover:text-red-500 transition-all"
        >
          {isWishlistPage ? <Trash2 className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
        </button>
      </div>

      {/* --- Hover Slide-up Panel (Sharp & Professional) --- */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end">
        <div className="bg-white translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.22, 1, 0.36, 1] p-6 h-[75%] border-t border-slate-100">
          <div className="flex flex-col h-full justify-between">
            
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[12px]  px-2 border border-gray-300  text-slate-400 uppercase tracking-[0.2em]">{item.category}</span>
                  <h3 className="text-lg font-medium text-slate-900 leading-tight mt-1 uppercase tracking-tighter">{item.name}</h3>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="w-3 h-3 fill-black text-black" />
                  <span className="text-[10px] font-bold text-black">{item.rating || '4.8'}</span>
                </div>
              </div>

              <p className="text-[12px] text-slate-500 font-normal leading-relaxed line-clamp-4">
                {item.description || "A curated essential for the modern wardrobe, blending traditional craftsmanship with contemporary lines."}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <div className="flex items-end justify-between mb-4">
                <div>
                  <p className="text-[14px] text-slate-400 uppercase tracking-widest mb-1">Price</p>
                  <p className="text-xl font-bold text-slate-900 tracking-tighter">₹{item.price.toLocaleString()}</p>
                </div>
                {item.originalPrice && (
                  <span className="text-[11px] text-slate-300 line-through mb-1 italic">₹{item.originalPrice.toLocaleString()}</span>
                )}
              </div>

              {/* Animated Button Inside Component */}
              <button 
                onClick={handleAddToCart}
                disabled={isAdded}
                className="group/btn relative w-full overflow-hidden border border-black bg-white py-4 transition-all duration-500"
              >
                <span className="relative z-10 flex items-center justify-center gap-3 font-bold text-[10px] uppercase tracking-[0.2em] group-hover/btn:text-white transition-colors duration-500">
                  {isAdded ? (
                    <><Check className="w-4 h-4" /> Added to Bag</>
                  ) : (
                    <><ShoppingBag className="w-4 h-4" /> Add to Bag</>
                  )}
                </span>
                <div className={`absolute inset-0 transition-transform duration-500 ease-out ${
                  isAdded ? 'bg-black translate-y-0' : 'bg-black translate-y-[101%] group-hover/btn:translate-y-0'
                }`} />
              </button>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;