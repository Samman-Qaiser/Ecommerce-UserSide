import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '../product/ProductCard';
import SectionHeading from '../ui/Heading';

export default function BestSellerSection() {
  const [activeTab, setActiveTab] = useState('sarees');

  // Tabs configuration
  const tabs = [
    {
      id: 'sarees',
      label: 'Bestseller Sarees',
      icon: '🪷',
      description: 'Top Rated Picks',
      link: '/sarees/bestsellers'
    },
    {
      id: 'blouses',
      label: 'Bestseller Blouses',
      icon: '👗',
      description: 'Most Loved',
      link: '/blouses/bestsellers'
    },
    {
      id: 'limited',
      label: 'Limited Drops',
      icon: '✨',
      description: 'Exclusive Finds',
      link: '/collections/limited-drops'
    }
  ];

  // Dummy data - Firebase se replace hoga baad mein
  const bestsellerSarees = [
    {
      id: 1,
      name: 'CHERRY BLOSSOM',
      description: 'Saree with blouse piece',
      category: 'Cotton',
      price: 3800,
      badge: 'NEW',
      rating: 4.9,
      reviews: 456,
      stock: 5,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
      images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500'],
    },
    {
      id: 2,
      name: 'ROYAL SILK BEAUTY',
      description: 'Pure Silk Saree',
      category: 'Silk',
      price: 8900,
      badge: 'BEST SELLER',
      rating: 5.0,
      reviews: 892,
      stock: 3,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=500',
      images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=500'],
    },
    {
      id: 3,
      name: 'ETHNIC CHARM',
      description: 'Handloom Saree',
      category: 'Chanderi',
      price: 5200,
      originalPrice: 6500,
      badge: 'SALE',
      rating: 4.8,
      reviews: 623,
      stock: 8,
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500',
      images: ['https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500'],
    },
    {
      id: 4,
      name: 'SUMMER BREEZE',
      description: 'Cotton Saree',
      category: 'Cotton',
      price: 3200,
      badge: 'TOP RATED',
      rating: 4.95,
      reviews: 734,
      stock: 12,
      image: 'https://images.unsplash.com/photo-1606522321798-c51a9b286e0a?w=500',
      images: ['https://images.unsplash.com/photo-1606522321798-c51a9b286e0a?w=500'],
    },
    {
      id: 5,
      name: 'FESTIVE GLORY',
      description: 'Designer Saree',
      category: 'Silk',
      price: 12500,
      badge: 'NEW',
      rating: 4.9,
      reviews: 234,
      stock: 4,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
      images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500'],
    },
    {
      id: 6,
      name: 'TIMELESS ELEGANCE',
      description: 'Banarasi Saree',
      category: 'Silk',
      price: 15800,
      badge: 'TOP RATED',
      rating: 5.0,
      reviews: 1023,
      stock: 2,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=500',
      images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=500'],
    },
    {
      id: 7,
      name: 'MODERN TRADITION',
      description: 'Linen Saree',
      category: 'Linen',
      price: 4500,
      badge: 'BEST SELLER',
      rating: 4.85,
      reviews: 567,
      stock: 15,
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500',
      images: ['https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500'],
    },
    {
      id: 8,
      name: 'GRACEFUL DRAPE',
      description: 'Chanderi Saree',
      category: 'Chanderi',
      price: 6200,
      badge: 'NEW',
      rating: 4.9,
      reviews: 345,
      stock: 7,
      image: 'https://images.unsplash.com/photo-1606522321798-c51a9b286e0a?w=500',
      images: ['https://images.unsplash.com/photo-1606522321798-c51a9b286e0a?w=500'],
    },
  ];

  const bestsellerBlouses = [
    {
      id: 11,
      name: 'REGAL BLUE',
      description: 'Designer Blouse',
      category: 'Silk',
      price: 1800,
      badge: 'NEW',
      rating: 4.8,
      reviews: 234,
      stock: 10,
      image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500',
      images: ['https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500'],
    },
    {
      id: 12,
      name: 'CLASSIC CRIMSON',
      description: 'Embroidered Blouse',
      category: 'Cotton',
      price: 1200,
      badge: 'BEST SELLER',
      rating: 5.0,
      reviews: 567,
      stock: 5,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500',
      images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500'],
    },
    {
      id: 13,
      name: 'GOLDEN TOUCH',
      description: 'Silk Blouse',
      category: 'Silk',
      price: 2200,
      badge: 'TOP RATED',
      rating: 4.9,
      reviews: 423,
      stock: 8,
      image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500',
      images: ['https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500'],
    },
    {
      id: 14,
      name: 'PEARL ELEGANCE',
      description: 'Designer Blouse',
      category: 'Cotton',
      price: 1500,
      badge: 'NEW',
      rating: 4.85,
      reviews: 312,
      stock: 12,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500',
      images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500'],
    },
    {
      id: 15,
      name: 'VELVET DREAM',
      description: 'Velvet Blouse',
      category: 'Velvet',
      price: 2800,
      badge: 'BEST SELLER',
      rating: 5.0,
      reviews: 678,
      stock: 4,
      image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500',
      images: ['https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500'],
    },
    {
      id: 16,
      name: 'FLORAL FANTASY',
      description: 'Printed Blouse',
      category: 'Cotton',
      price: 1100,
      badge: 'SALE',
      originalPrice: 1500,
      rating: 4.7,
      reviews: 189,
      stock: 20,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500',
      images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500'],
    },
    {
      id: 17,
      name: 'MIRROR WORK MAGIC',
      description: 'Embroidered Blouse',
      category: 'Silk',
      price: 2500,
      badge: 'TOP RATED',
      rating: 4.95,
      reviews: 445,
      stock: 6,
      image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500',
      images: ['https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500'],
    },
    {
      id: 18,
      name: 'CONTEMPORARY CHIC',
      description: 'Modern Blouse',
      category: 'Cotton',
      price: 1350,
      badge: 'NEW',
      rating: 4.8,
      reviews: 267,
      stock: 15,
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500',
      images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500'],
    },
  ];

  const limitedDrops = [
    {
      id: 21,
      name: 'WINTER COLLECTION',
      description: 'Limited Edition Saree',
      category: 'Pashmina',
      price: 18900,
      badge: 'NEW',
      rating: 5.0,
      reviews: 89,
      stock: 3,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
      images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500'],
    },
    {
      id: 22,
      name: 'HERITAGE SERIES',
      description: 'Exclusive Design',
      category: 'Silk',
      price: 22500,
      badge: 'BEST SELLER',
      rating: 5.0,
      reviews: 67,
      stock: 2,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=500',
      images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=500'],
    },
    {
      id: 23,
      name: 'ARTISAN SPECIAL',
      description: 'Hand-painted Saree',
      category: 'Cotton',
      price: 8900,
      badge: 'NEW',
      rating: 4.95,
      reviews: 134,
      stock: 5,
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500',
      images: ['https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500'],
    },
    {
      id: 24,
      name: 'FESTIVE EXCLUSIVE',
      description: 'Limited Stock',
      category: 'Banarasi',
      price: 16800,
      badge: 'TOP RATED',
      rating: 5.0,
      reviews: 156,
      stock: 4,
      image: 'https://images.unsplash.com/photo-1606522321798-c51a9b286e0a?w=500',
      images: ['https://images.unsplash.com/photo-1606522321798-c51a9b286e0a?w=500'],
    },
    {
      id: 25,
      name: 'BRIDAL EDITION',
      description: 'Wedding Special',
      category: 'Silk',
      price: 35000,
      badge: 'NEW',
      rating: 5.0,
      reviews: 45,
      stock: 1,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
      images: ['https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500'],
    },
    {
      id: 26,
      name: 'SIGNATURE COLLECTION',
      description: 'Designer Exclusive',
      category: 'Chanderi',
      price: 12900,
      badge: 'BEST SELLER',
      rating: 4.9,
      reviews: 98,
      stock: 6,
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=500',
      images: ['https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=500'],
    },
    {
      id: 27,
      name: 'ROYAL AFFAIR',
      description: 'Premium Saree',
      category: 'Silk',
      price: 28500,
      badge: 'NEW',
      rating: 5.0,
      reviews: 72,
      stock: 2,
      image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500',
      images: [
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500',
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500',
        'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500',
        'https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=500'
      ],
    },
    {
      id: 28,
      name: 'VINTAGE CHARM',
      description: 'Limited Drop',
      category: 'Cotton',
      price: 9800,
      badge: 'TOP RATED',
      rating: 4.95,
      reviews: 123,
      stock: 8,
      image: 'https://images.unsplash.com/photo-1606522321798-c51a9b286e0a?w=500',
      images: ['https://images.unsplash.com/photo-1606522321798-c51a9b286e0a?w=500'],
    },
  ];

  // Products data mapping
  const productsData = {
    'sarees': bestsellerSarees,
    'blouses': bestsellerBlouses,
    'limited': limitedDrops,
  };

  // Get current tab's products
  const currentProducts = productsData[activeTab] || [];
  const currentTabInfo = tabs.find(tab => tab.id === activeTab);

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-white via-purple-50/30 to-pink-50/30">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-2 bg-linear-to-r from-purple-100 to-pink-100 px-4 py-2 rounded-full mb-4">
            <Star className="w-4 h-4 text-purple-600 fill-purple-600" />
            <span className="text-sm font-semibold text-purple-900">Customer Favorites</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
            Bestsellers & Exclusives
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Shop our most-loved pieces and limited edition collections
          </p>
        </div>
 

        {/* Tabs Navigation */}
        <div className="mb-8 sm:mb-12">
          {/* Desktop Tabs */}
          <div className="hidden  sm:flex items-center justify-center gap-4 lg:gap-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group relative px-6 lg:px-8 py-2 border border-gray-500 border-dotted font-semibold text-base lg:text-lg
                  transition-all duration-300 transform hover:scale-105
                  ${activeTab === tab.id
                    ? ' bg-[#F5E6D3] border border-dotted border-black'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center gap-3">

                  <div className="text-left">
                    <div className="font-bold">{tab.label}</div>

                  </div>
                </div>


              </button>
            ))}
          </div>

          {/* Mobile Tabs - Horizontal Scroll */}
          <div className="sm:hidden overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-3 min-w-max">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                  group relative px-6 lg:px-8 py-2 border border-gray-500 border-dotted font-semibold text-base lg:text-lg
                  transition-all duration-300 transform hover:scale-105
                  ${activeTab === tab.id
                      ? ' bg-[#F5E6D3] border border-dotted border-black'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                    }
                `}
                >
                  <div className="flex items-center gap-2">

                    <span>{tab.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid with Animation */}
        <div className="relative w-full lg:w-[90%] m-auto">
          <div
            key={activeTab}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 animate-fadeIn"
          >
            {currentProducts.slice(0, 8).map((product, index) => (
              <div
                key={product.id}
                style={{
                  animation: `slideUp 0.5s ease-out ${index * 0.1}s both`
                }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-10 sm:mt-12">
          <Link to={currentTabInfo?.link || '#'}>
            <button className="group inline-flex items-center gap-3  px-8 sm:px-12 py-4 border border-black font-bold text-base sm:text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <span>View All Products</span>
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </Link>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.4s ease-out;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}