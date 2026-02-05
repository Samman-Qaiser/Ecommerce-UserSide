import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { toggleWishlist } from '../redux/wishlistSlice';
import { addToCart } from '../redux/cartSlice';

import ProductCard from '../components/product/ProductCard2';
import AnimatedButton from '../components/ui/AnimmatedButton';

const WishlistPage = () => {
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const dispatch = useDispatch();
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));

    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <Link
            to="/allcategories"
            className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-black mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </Link>

          <h1 className="text-4xl font-light tracking-tighter text-slate-900">
            Your Wishlist
          </h1>
        </div>

        {/* EMPTY STATE */}
        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center text-center py-32"
          >
            <Heart className="w-16 h-16 text-slate-300 mb-6" />

            <h2 className="text-2xl font-light text-slate-800 mb-3">
              Your wishlist is empty
            </h2>

            <p className="text-slate-500 max-w-md mb-8">
              Browse our collection and save your favorite pieces to find them
              easily later.
            </p>

            <AnimatedButton
              label="Continue Shopping"
              to="/shop"
              align="center"
            />
          </motion.div>
        ) : (
          /* PRODUCTS GRID */
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            <AnimatePresence mode="popLayout">
              {wishlistItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard
                    item={item}
                    isWishlistPage={true}
                    onAddToCart={() => handleAddToCart(item)}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
