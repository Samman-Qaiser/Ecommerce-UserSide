import React, { useState } from 'react';
import { ChevronRight, Sparkles } from 'lucide-react';
import ProductCard from '../product/ProductCard';
import AnimatedButton from '../ui/AnimmatedButton';

const TabbedProducts = () => {
  const [activeTab, setActiveTab] = useState('festive-lehenga');

  // Tabs configuration
  const tabs = [
    {
      id: 'festive-lehenga',
      slug: 'festive-lehenga',
      label: 'Festive Lehenga',
      icon: '👗',
      description: 'Elegant & Traditional'
    },
    {
      id: 'festive-saree',
      slug: 'festive-saree',
      label: 'Festive Saree',
      icon: '🪷',
      description: 'Grace & Beauty'
    },
    {
      id: 'ready-to-wear',
      slug: 'ready-to-wear',
      label: 'Ready to Wear',
      icon: '✨',
      description: 'Comfort & Style'
    }
  ];

  // Dummy products data for each tab (Firebase se replace hoga)
  const productsData = {
    'festive-lehenga': [
      {
        id: 1,
        name: 'Royal Silk Lehenga',
        description: 'Heavy Embroidered',
        category: 'Bridal Collection',
        price: 15999,
        originalPrice: 24999,
        rating: 4.8,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
        badge: 'BEST SELLER',
        stock: 5,
        inStock: true,
      },
      {
        id: 2,
        name: 'Designer Lehenga Set',
        description: 'Mirror Work',
        category: 'Wedding Special',
        price: 12499,
        originalPrice: 18999,
        rating: 4.9,
        reviews: 456,
        image: './suits.webp',
        badge: 'TOP RATED',
        stock: 3,
        inStock: true,
      },
      {
        id: 3,
        name: 'Embellished Lehenga',
        description: 'Stone Work',
        category: 'Festive Wear',
        price: 9999,
        originalPrice: 14999,
        rating: 4.7,
        reviews: 189,
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500',
        badge: 'NEW',
        stock: 8,
        inStock: true,
      },
      {
        id: 4,
        name: 'Traditional Lehenga',
        description: 'Zari Work',
        category: 'Classic Collection',
        price: 11999,
        originalPrice: 16999,
        rating: 4.6,
        reviews: 167,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
        badge: 'SALE',
        stock: 6,
        inStock: true,
      },
    ],
    'festive-saree': [
      {
        id: 5,
        name: 'Silk Saree Premium',
        description: 'Pure Banarasi',
        category: 'Silk Collection',
        price: 7999,
        originalPrice: 12999,
        rating: 4.9,
        reviews: 567,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
        badge: 'TOP RATED',
        stock: 4,
        inStock: true,
      },
      {
        id: 6,
        name: 'Designer Saree',
        description: 'Printed Georgette',
        category: 'Modern Fusion',
        price: 3999,
        originalPrice: 6999,
        rating: 4.7,
        reviews: 234,
        image: './silk saree.webp',
        badge: 'BEST SELLER',
        stock: 12,
        inStock: true,
      },
      {
        id: 7,
        name: 'Embroidered Saree',
        description: 'Heavy Border',
        category: 'Wedding Collection',
        price: 5999,
        originalPrice: 8999,
        rating: 4.8,
        reviews: 345,
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500',
        badge: 'NEW',
        stock: 7,
        inStock: true,
      },
      {
        id: 8,
        name: 'Cotton Silk Saree',
        description: 'Lightweight',
        category: 'Casual Wear',
        price: 2999,
        originalPrice: 4999,
        rating: 4.5,
        reviews: 123,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
        badge: 'SALE',
        stock: 15,
        inStock: true,
      },
    ],
    'ready-to-wear': [
      {
        id: 9,
        name: 'Pre-Stitched Saree',
        description: 'Ready in Minutes',
        category: 'Quick Wear',
        price: 4999,
        originalPrice: 7999,
        rating: 4.8,
        reviews: 456,
        image: './ready-to-wear.webp',
        badge: 'BEST SELLER',
        stock: 10,
        inStock: true,
      },
      {
        id: 10,
        name: 'Dhoti Style Saree',
        description: 'Modern Drape',
        category: 'Contemporary',
        price: 3499,
        originalPrice: 5999,
        rating: 4.6,
        reviews: 234,
        image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500',
        badge: 'NEW',
        stock: 8,
        inStock: true,
      },
      {
        id: 11,
        name: 'Gown Style Lehenga',
        description: 'Ready to Wear',
        category: 'Fusion Wear',
        price: 6999,
        originalPrice: 9999,
        rating: 4.9,
        reviews: 678,
        image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
        badge: 'TOP RATED',
        stock: 5,
        inStock: true,
      },
      {
        id: 12,
        name: 'Indo-Western Set',
        description: 'Complete Look',
        category: 'Party Wear',
        price: 5499,
        originalPrice: 8999,
        rating: 4.7,
        reviews: 345,
        image: './Work-Sarees.jpg',
        badge: 'SALE',
        stock: 6,
        inStock: true,
      },
    ],
  };

  // Get current tab's products
  const currentProducts = productsData[activeTab] || [];
  const activeTabInfo = tabs.find(tab => tab.id === activeTab);

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-900">Curated Collections</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Shop by Category
          </h2>

          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our exclusive range of festive and ready-to-wear collections
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="mb-8 sm:mb-12">
          <div className="hidden sm:flex items-center justify-center gap-4 lg:gap-6">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative px-6 lg:px-8 py-2 border border-gray-500 border-dotted font-semibold text-base lg:text-lg transition-all duration-300 transform hover:scale-105
                  ${activeTab === tab.id ? 'bg-[#F5E6D3] border border-dotted border-black' : 'bg-white text-gray-700 hover:bg-gray-50'}
                `}
              >
                <div className="flex items-center gap-3">
                  <span className="font-bold">{tab.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Mobile Tabs */}
          <div className="sm:hidden overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-3 min-w-max">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative px-6 py-2 border border-gray-500 border-dotted font-semibold text-base transition-all duration-300 transform hover:scale-105
                    ${activeTab === tab.id ? 'bg-[#F5E6D3] border border-dotted border-black' : 'bg-white text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="relative w-full lg:w-[90%] m-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {currentProducts.map((product, index) => (
            <div
              key={product.id}
              style={{ animation: `slideUp 0.5s ease-out ${index * 0.1}s both` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-8 flex justify-center">
          <AnimatedButton
            label={`Explore All ${activeTabInfo?.label}`}
            align="center"
            to={`/category/${activeTabInfo?.slug}?name=${encodeURIComponent(activeTabInfo?.label)}`}
          />
        </div>

      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default TabbedProducts;
