import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Trash2, ArrowLeft, Check, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toggleWishlist } from '../redux/wishlistSlice';
import { addToCart } from '../redux/cartSlice';
import ProductCard from '../components/product/ProductCard2';

const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setAddedItems(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAddedItems(prev => ({ ...prev, [product.id]: false })), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-16">
          <Link to="/shop" className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-black mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
          <h1 className="text-4xl font-light tracking-tighter text-slate-900">Your Selection</h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AnimatePresence mode="popLayout">
         {wishlistItems.map((item) => (
      <ProductCard
        key={item.id} 
        item={item} 
        isWishlistPage={true} 
      />
    ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;