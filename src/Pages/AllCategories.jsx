import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useActiveSubCategories } from '../tanstackhooks/useSubCategories';
import { Loader2 } from 'lucide-react';

// Hardcoded fallback images agar backend se nahi aaye
const fallbackImages = [
  "./web-banner01.jpg",
  "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb",
  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b",
  "./silk saree.webp",
  "./web-banner02.jpg",
  "./Work-Sarees.jpg",
  "./ready-to-wear.webp",
  "./suits.webp",
  "./formal-wear.jfif",
  "./fancy-saree.jfif",
  "./festive-wear.jfif",
  "./traditional-wear.jfif",
  "./web-banner01.jpg",
  "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb",
  "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b",
  "./silk saree.webp",
];

// Size pattern: large, medium, medium (repeat)
const getSizePattern = (index) => {
  const pattern = ['large', 'medium', 'medium'];
  return pattern[index % 3];
};

const AllCategories = () => {
  const { data: subCategories, isLoading, isError } = useActiveSubCategories();

  console.log('Active SubCategories:', subCategories);

  // Loading state
  if (isLoading) {
    return (
      <div className="bg-[#FDF8F1] min-h-screen py-16 px-4 lg:px-8 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-[#A07B50]" />
      </div>
    );
  }

  // Error state
  if (isError || !subCategories?.length) {
    return (
      <div className="bg-[#FDF8F1] min-h-screen py-16 px-4 lg:px-8 flex items-center justify-center">
        <p className="text-slate-500">Unable to load categories at this time.</p>
      </div>
    );
  }

  // Transform API data with fallback images and size pattern
  const categories = subCategories.map((cat, index) => ({
    id: cat.id,
    name: cat.name,
    // Agar backend se image hai to woh use karo, nahi to fallback
    img: cat.image || cat.banner || fallbackImages[index % fallbackImages.length],
    size: getSizePattern(index),
    slug: cat.slug,
  }));

  return (
    <div className="bg-[#FDF8F1] min-h-screen py-16 px-4 lg:px-8">
      {/* Title Section */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.h4 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs uppercase tracking-[0.5em] text-gray-500 mb-4"
        >
          Curated Collections
        </motion.h4>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl lg:text-7xl tracking-tighter"
        >
          Explore All Categories
        </motion.h1>
      </div>

      {/* Bento Grid with 'dense' flow to fill gaps */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 auto-rows-[180px] lg:auto-rows-[150px] grid-flow-dense">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className={`relative group overflow-hidden rounded-sm bg-gray-200 ${
              cat.size === 'large' ? 'md:col-span-2 md:row-span-2' : 
              cat.size === 'medium' ? 'md:row-span-2' : 
              'col-span-1 row-span-1'
            }`}
          >
            <Link 
              to={`/category/${cat.slug}?name=${encodeURIComponent(cat.name)}`} 
              className="w-full h-full block"
            >
              {/* Image with subtle zoom on hover */}
              <img 
                src={cat.img} 
                alt={cat.name} 
                className="w-full m-auto lg:object-top h-full object-cover group-hover:scale-105 transition-transform object-center duration-700 ease-out"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-[#2D160A]/90 via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity" />

              {/* Text Info */}
              <div className="absolute bottom-0 left-0 p-5 w-full">
                <h3 className="text-white text-lg lg:text-xl font-serif tracking-wide leading-tight">
                  {cat.name}
                </h3>
                <div className="w-0 h-px bg-[#A07B50] mt-2 group-hover:w-full transition-all duration-500 opacity-60" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;