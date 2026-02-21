import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTopSubCategories } from "../../tanstackhooks/useSubCategories";

// 🔥 Fallback images mapped by slug for precise matching
const fallbackImages = {
  suits: "/suits.jfif",
  "raw-silk": "/raw silk.jfif",
  tussar: "/tusar silk.jfif",
  "office-wear": "/office wear.jfif",
  tissue: "/tissue.jfif",
};

// 🔥 Default image if nothing is available
const defaultImage = "/default-category.jpg";

const CategoriesSection = () => {
  const { data } = useTopSubCategories();

  // 🔥 Show API data if available
  const displayCategories = data && data.length > 0 ? data : [];

  // 🔥 Fallback logic for image
  const getImage = (cat) => {
    if (cat.image) return cat.image; // API image
    if (fallbackImages[cat.slug]) return fallbackImages[cat.slug]; // fallback for that slug
    return defaultImage; // ultimate fallback
  };

  return (
    <section className="w-full py-6 mt-7 bg-white overflow-hidden">
      {/* Title Section */}
      <div className="flex flex-col items-center justify-center mb-10 px-4">
        <h2 className="lg:text-2xl text-lg tracking-[0.4em] uppercase font-light">
          Shop by Category
        </h2>
        <p className="text-gray-500 p-2 text-sm">
          India's most loved artisanal brand
        </p>
      </div>

      {/* Categories */}
      <div className="relative lg:px-10">
        <div className="flex lg:grid px-4 py-1 lg:grid-cols-5 gap-6 lg:gap-4 overflow-x-auto no-scrollbar pb-4 lg:pb-0 snap-x snap-mandatory box-border">
          {displayCategories.map((cat, index) => {
            const imageSrc = getImage(cat); // precise fallback

            return (
              <motion.div
                key={cat.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="shrink-0 w-24 lg:w-full snap-center"
              >
                <Link
                  to={`/category/${cat.slug}?name=${encodeURIComponent(
                    cat.name
                  )}`}
                  className="flex flex-col items-center group"
                >
                  {/* Image Circle */}
                  <div className="relative p-1 rounded-full  border-[#A07B50] border-2 group-hover:border-[#F5E6D3] transition-all duration-500">
                    <div className="relative w-24 h-24 lg:w-52 lg:h-52 rounded-full overflow-hidden shadow-sm">
                      <img
                        src={imageSrc}
                        alt={cat.name}
                        className="w-full h-full object-cover object-top grayscale-20 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-out"
                      />

                      {/* Subtle Overlay */}
                      <div className="absolute inset-0 bg-purple-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>

                  {/* Name */}
                  <span className="mt-4 text-[10px] lg:text-[20px] uppercase text-gray-900 group-hover:text-[#A07B50] transition-colors duration-300">
                    {cat.name}
                  </span>

                  {/* Hover Underline */}
                  <div className="w-0 h-px bg-[#F5E6D3] group-hover:w-8 transition-all duration-500 mt-1" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>

    </section>
  );
};

export default CategoriesSection;
