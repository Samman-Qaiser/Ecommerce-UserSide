import { useState } from 'react';
import { Link } from 'react-router-dom';
import {Star,  Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../product/ProductCard';
import AnimatedButton from '../ui/AnimmatedButton';
import { useBestSubCategories } from '../../tanstackhooks/useSubCategories';

// Dummy products for categories that don't have products
const dummyProducts = [
  { 
    id: 'dummy-1', 
    name: 'CHERRY BLOSSOM', 
    description: 'Saree with blouse piece', 
    category: 'Cotton', 
    price: 3800, 
    badge: 'NEW', 
    rating: 4.9, 
    reviews: 456, 
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500' 
  },
  { 
    id: 'dummy-2', 
    name: 'ROYAL SILK BEAUTY', 
    description: 'Pure Silk Saree', 
    category: 'Silk', 
    price: 8900, 
    badge: 'BEST SELLER', 
    rating: 5.0, 
    reviews: 892, 
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500' 
  },
  { 
    id: 'dummy-3', 
    name: 'ETHNIC CHARM', 
    description: 'Handloom Saree', 
    category: 'Chanderi', 
    price: 5200, 
    badge: 'SALE', 
    rating: 4.8, 
    reviews: 623, 
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500' 
  },
  { 
    id: 'dummy-4', 
    name: 'SUMMER BREEZE', 
    description: 'Cotton Saree', 
    category: 'Cotton', 
    price: 3200, 
    badge: 'TOP RATED', 
    rating: 4.95, 
    reviews: 734, 
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500' 
  },
];

export default function BestSellerSection() {
  const [activeTab, setActiveTab] = useState(0);
  
  // Fetch data using your API hook
  const { data: bestSellerCategories, isLoading, isError } = useBestSubCategories();

  console.log('Best Seller Data:', bestSellerCategories);

  // Transform API data into tabs format
  const tabs = bestSellerCategories?.map((category, index) => ({
    id: index,
    label: category.name,
    slug: category.slug,
    name: category.name,
    categoryId: category.id,
    // Agar products nahi hain to dummy products use karo
    products: category.products && category.products.length > 0 
      ? category.products 
      : dummyProducts,
  })) || [];

  // Get current products based on active tab
  const currentProducts = tabs[activeTab]?.products || [];
  const currentTabInfo = tabs[activeTab];

  // Loading state
  if (isLoading) {
    return (
      <section className="py-4 mt-0 lg:mt-7 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-[#A07B50]" />
        </div>
      </section>
    );
  }

  // Error state
  if (isError || !bestSellerCategories?.length) {
    return (
      <section className="py-4 mt-0 lg:mt-7 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[400px]">
          <p className="text-slate-500">Unable to load bestsellers at this time.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 mt-0 lg:mt-7 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* --- Header & Tab Navigation --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-xl">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <div className="inline-flex items-center gap-2 bg-[#F5E6D3] px-4 py-2 rounded-full">
                <Star className="w-4 h-4 text-[#A07B50] fill-[#A07B50]" />
                <span className="text-sm font-semibold text-[#A07B50]">Customer Favorites</span>
              </div>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900"
            >
              Our Bestsellers.
            </motion.h2>
          </div>

          {/* --- Tabs --- */}
          {tabs.length > 0 && (
            <div className="flex items-center p-1.5 bg-slate-100/80 backdrop-blur-sm border border-slate-200/50 w-fit">
              {tabs.map((tab, index) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(index)}
                  className={`relative px-6 py-2.5 text-sm transition-all duration-300 ${
                    activeTab === index ? 'text-black' : 'text-slate-900 hover:text-slate-900'
                  }`}
                >
                  {activeTab === index && (
                    <motion.div 
                      layoutId="activeTabBackground"
                      className="absolute inset-0 bg-[#F5E6D3] border border-dotted border-gray-700"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* --- Animated Product Grid --- */}
        <div className="min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:w-[90%] m-auto"
            >
              {currentProducts.length > 0 ? (
                currentProducts.map((product, index) => (
                  <motion.div
                    key={product.id || index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-slate-500">
                  No products available in this category
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- View All CTA --- */}
        {currentTabInfo && (
          <AnimatedButton
            label={`Explore All ${currentTabInfo.name}`}
            align="center"
            to={`/category/${currentTabInfo.slug}?name=${encodeURIComponent(
              currentTabInfo.name
            )}`}
          />
        )}
      </div>
    </section>
  );
}