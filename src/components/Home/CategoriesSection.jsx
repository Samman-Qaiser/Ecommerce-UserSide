import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  { name: "Saree", img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=200", slug: "saree" },
  { name: "Blouse", img: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=200", slug: 'blouse' },
  {
    name: "Pre Draped", img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=200",
    slug: 'pre-draped'
  },
  { name: "Work Sarees", img: "./Work-Sarees.jpg", slug: "work-saree" },
  { name: "Kurta", img: "https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?q=80&w=200", slug: 'work-sarees' },
  { name: "Lehenga", img: "./suits.webp", slug: "lehnga" },
  { name: "Silk Saree", img: "./silk saree.webp", slug: "silk-saree" },
  { name: "Ready To Wear", img: "./ready-to-wear.webp", slug: "ready-to-wear" },
];

const CategoriesSection = () => {
  return (
    <section className="w-full py-6 mt-7 bg-white overflow-hidden">
      {/* Title / Brand Icon */}
      <div className="flex flex-col items-center justify-center mb-10 px-4">

        <h2 className="lg:text-2xl text-lg tracking-[0.4em] uppercase  font-light">Shop by Category</h2>
        <p className="text-gray-500 p-2 text-sm">India's most loved artisanal brand </p>
      </div>

      {/* Main Container - Desktop: Grid | Mobile: Horizontal Scroll */}
      <div className="relative px-4 lg:px-10">
        <div className="flex lg:grid lg:grid-cols-8 gap-6 lg:gap-4 overflow-x-auto no-scrollbar pb-4 lg:pb-0 snap-x snap-mandatory">
          {categories.map((cat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -5 }}
              className="shrink-0 w-24 lg:w-full snap-center"
            >
              <Link
                to={`/category/${cat.slug}?name=${encodeURIComponent(cat.name)}`}
                className="flex flex-col items-center group"
              >

                {/* Image Wrapper with Luxury Border */}
                <div className="relative p-1 rounded-full border border-gray-100 group-hover:border-purple-200 transition-all duration-500">
                  <div className="relative w-20 h-20 lg:w-32 lg:h-32 rounded-full overflow-hidden shadow-sm">
                    <img
                      src={cat.img}
                      alt={cat.name}
                      className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                    />
                    {/* Subtle Overlay */}
                    <div className="absolute inset-0 bg-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                {/* Typography */}
                <span className="mt-4 text-[10px] lg:text-xs font-semibold tracking-[0.15em] uppercase text-gray-500 group-hover:text-purple-700 transition-colors duration-300">
                  {cat.name}
                </span>

                {/* Underline Indicator */}
                <div className="w-0 h-px bg-purple-300 group-hover:w-8 transition-all duration-500 mt-1" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Custom Styles for hidden scrollbar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
};

export default CategoriesSection;