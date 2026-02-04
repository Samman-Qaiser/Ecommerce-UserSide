import React from "react";
import { motion } from "framer-motion";
import AnimatedButton from "../ui/AnimmatedButton";

const ImageTextSection = () => {
  return (
    <div className="w-full bg-[#FDF8F1] py-16 lg:py-24 space-y-24 overflow-hidden">
      
  

      {/* SECTION 2: Eco-friendly Fabric (Arch Design Style) */}
      <section className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
        {/* Right: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2 text-center lg:text-left space-y-6"
        >
          <h2 className="text-4xl lg:text-5xl font-bold  leading-snug">
            Cosy & comfortable <br /> fabric
          </h2>
          <p className="text-gray-600 text-base lg:text-lg leading-relaxed font-light">
            You're lounging at home or heading out for a casual day, our eco-friendly 
            fabrics ensure you stay comfortable and chic. Embrace the perfect fusion 
            of fashion and ease.
          </p>
          <div className="flex justify-center lg:justify-start">
            <AnimatedButton label="View More" className="bg-[#A07B50]   " />
          </div>
        </motion.div>

        {/* Left: Arch Image (Inspired by Image 3) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="relative w-full lg:w-1/2 flex justify-center"
        >
          {/* Subtle Arch Border behind image */}
          <div className="absolute -inset-4 border border-[#A07B50]/20 rounded-t-full hidden lg:block" />
          
          <div className="w-75 h-112.5 lg:w-100 lg:h-137.5 rounded-t-full overflow-hidden border-12 border-white shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800" 
              className="w-full h-full object-cover" 
              alt="Comfortable Wear" 
            />
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default ImageTextSection;