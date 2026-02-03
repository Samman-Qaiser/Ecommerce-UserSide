import React from 'react';
import AnimatedButton from '../ui/AnimmatedButton';
import { motion } from 'framer-motion';

const SingleExplore = () => {
  const images = [
    "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=1000",
    "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?q=80&w=500",
    "https://images.unsplash.com/photo-1617019114583-affb34d1b3cd?q=80&w=500",
    "https://images.unsplash.com/photo-1610030468706-9a6dbad49b0a?w=600&auto=format&fit=crop&q=60",
  ];

  return (
    <section className="w-full min-h-[80vh] bg-[#FDF8F1] flex flex-col lg:flex-row items-center overflow-hidden">
      
      {/* LEFT CONTENT: Text Area (Slide from Left) */}
      <motion.div 
        initial={{ opacity: 0, x: -100 }} // Starts 100px to the left
        whileInView={{ opacity: 1, x: 0 }} // Slides to center
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full lg:w-1/2 p-8 lg:p-20 flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
      >
        <h1 className="text-4xl lg:text-4xl mb-4 leading-tight ">
          Office Wear Saree
        </h1>
        
        <p className="text-gray-600 text-lg mb-8 tracking-wide italic font-light">
          Dream Drapping within a minute
        </p>

        <AnimatedButton 
          to="/shop" 
          label="Explore More" 
          className="py-5 border-[#A07B50] text-[#A07B50] hover:border-black" 
        />
      </motion.div>

      {/* RIGHT CONTENT: Image Grid (Slide from Right) */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }} // Starts 100px to the right
        whileInView={{ opacity: 1, x: 0 }} // Slides to center
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }} // Slight delay for a dynamic feel
        className="w-full lg:w-3/5 p-4 lg:p-10 order-1 lg:order-2"
      >
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 h-[50vh] lg:h-[70vh]">
          
          {/* Large Image */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="col-span-1 lg:col-span-1 row-span-2 overflow-hidden shadow-xl rounded-sm"
          >
            <img src={images[0]} alt="Main Model" className="w-full h-full object-cover" />
          </motion.div>

          {/* Top Square */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="hidden lg:block overflow-hidden shadow-lg rounded-sm"
          >
            <img src={images[1]} alt="Detail 1" className="w-full h-full object-cover" />
          </motion.div>

          {/* Right Long Image */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="row-span-2 overflow-hidden shadow-lg rounded-sm"
          >
            <img src={images[3]} alt="Model Side" className="w-full h-full object-cover" />
          </motion.div>

          {/* Bottom Square */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="hidden lg:block overflow-hidden shadow-lg rounded-sm"
          >
            <img src={images[2]} alt="Detail 2" className="w-full h-full object-cover" />
          </motion.div>

        </div>
      </motion.div>

    </section>
  );
};

export default SingleExplore;