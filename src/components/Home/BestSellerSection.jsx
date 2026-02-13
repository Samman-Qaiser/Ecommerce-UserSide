import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, Sparkles, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../product/ProductCard';
import AnimatedButton from '../ui/AnimmatedButton';

// --- Dummy Data (Defined before the component) ---

const bestsellerSarees = [
  { id: 1, name: 'CHERRY BLOSSOM', description: 'Saree with blouse piece', category: 'Cotton', price: 3800, badge: 'NEW', rating: 4.9, reviews: 456, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500' },
  { id: 2, name: 'ROYAL SILK BEAUTY', description: 'Pure Silk Saree', category: 'Silk', price: 8900, badge: 'BEST SELLER', rating: 5.0, reviews: 892, image: './silk saree.webp' },
  { id: 3, name: 'ETHNIC CHARM', description: 'Handloom Saree', category: 'Chanderi', price: 5200, badge: 'SALE', rating: 4.8, reviews: 623, image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500' },
  { id: 4, name: 'SUMMER BREEZE', description: 'Cotton Saree', category: 'Cotton', price: 3200, badge: 'TOP RATED', rating: 4.95, reviews: 734, image: 'ready-to-wear.webp' },
];

const bestsellerBlouses = [
  { id: 11, name: 'REGAL BLUE', description: 'Designer Blouse', category: 'Silk', price: 1800, badge: 'NEW', rating: 4.8, reviews: 234, image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500' },
  { id: 12, name: 'CLASSIC CRIMSON', description: 'Embroidered Blouse', category: 'Cotton', price: 1200, badge: 'BEST SELLER', rating: 5.0, reviews: 567, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500' },
  { id: 13, name: 'GOLDEN TOUCH', description: 'Silk Blouse', category: 'Silk', price: 2200, badge: 'TOP RATED', rating: 4.9, reviews: 423, image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500' },
  { id: 14, name: 'PEARL ELEGANCE', description: 'Designer Blouse', category: 'Cotton', price: 1500, badge: 'NEW', rating: 4.85, reviews: 312, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500' },
];

const limitedDrops = [
  { id: 21, name: 'WINTER COLLECTION', description: 'Limited Edition Saree', category: 'Pashmina', price: 18900, badge: 'NEW', rating: 5.0, reviews: 89, image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500' },
  { id: 22, name: 'HERITAGE SERIES', description: 'Exclusive Design', category: 'Silk', price: 22500, badge: 'BEST SELLER', rating: 5.0, reviews: 67, image: 'ready-to-wear.webp' },
];
const productsData = { 
  sarees: bestsellerSarees, 
  blouses: bestsellerBlouses, 
  limited: limitedDrops 
};

export default function BestSellerSection() {
  const [activeTab, setActiveTab] = useState('sarees');

const tabs = [
  {
    id: 'sarees',
    label: 'Sarees',
    slug: 'sarees',
    name: 'Sarees',
    icon: <Sparkles className="w-4 h-4" />,
  },
  {
    id: 'blouses',
    label: 'Blouses',
    slug: 'blouses',
    name: 'Blouses',
    icon: <ShoppingBag className="w-4 h-4" />,
  },
  {
    id: 'limited',
    label: 'Limited Drops',
    slug: 'limited',
    name: 'Limited Drops',
    icon: <Star className="w-4 h-4" />,
  },
]


  const productsData = { 
    sarees: bestsellerSarees, 
    blouses: bestsellerBlouses, 
    limited: limitedDrops 
  };

  const currentProducts = productsData[activeTab] || [];
  const currentTabInfo = tabs.find(tab => tab.id === activeTab);

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
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 mb-4"
            >
              <div className="inline-flex items-center gap-2 bg-linear-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full ">

            <Star className="w-4 h-4 text-purple-600 fill-purple-600" />

            <span className="text-sm font-semibold text-purple-900">Customer Favorites</span>

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
          <div className="flex items-center p-1.5 bg-slate-100/80  backdrop-blur-sm border border-slate-200/50 w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-2.5  text-sm transition-all duration-300 ${
                  activeTab === tab.id ? 'text-black' : 'text-slate-900 hover:text-slate-900'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTabBackground"
                    className="absolute inset-0 bg-[#F5E6D3] border border-dotted border-gray-700 "
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* --- Animated Product Grid --- */}
        <div className="min-h-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8 lg:w-[90%] m-auto"
            >
              {currentProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* --- View All CTA --- */}
<AnimatedButton
  label={`Explore All ${currentTabInfo?.name}`}
  align="center"
  to={`/category/${currentTabInfo?.slug}?name=${encodeURIComponent(
    currentTabInfo?.name
  )}`}
/>



      </div>
    </section>
  );
}