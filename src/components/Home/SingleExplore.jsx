import React from 'react';
import AnimatedButton from '../ui/AnimmatedButton';
import { motion, useScroll, useTransform } from 'framer-motion';

const SingleExplore = () => {
  const images = [
    "./handloom3.jpg",
    "./Handloom-Weavers.webp",
    "silk_sarees_in_India.webp",
    "./handloom2.jpg",
  ];

  const { scrollYProgress } = useScroll();
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section className="w-full min-h-screen bg-[#F9F6F2] flex flex-col lg:flex-row items-center overflow-hidden">
      
      {/* LEFT CONTENT: Text Area */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
        className="w-full lg:w-2/5 p-8 lg:p-24 flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-2 lg:order-1 relative z-20"
      >
        <motion.span 
          className="text-[#A07B50] text-xs uppercase tracking-[0.4em] mb-4 font-semibold block"
        >
          Our Heritage
        </motion.span>
        
        <h2 className="text-5xl lg:text-6xl font-serif text-[#1a1a1a] mb-8 leading-[1.1]">
          Handcrafted <br /> 
          <span className="italic font-light text-[#A07B50]">with Love</span>
        </h2>
        
        <div className="w-20 h-[1px] bg-[#A07B50] mb-8 hidden lg:block" />

        <p className="text-gray-500 text-lg mb-10 tracking-tight leading-relaxed max-w-md font-light">
          Discover the elegance of Indian hand-woven sarees, crafted with 
          <span className="text-[#1a1a1a] font-normal italic"> timeless artistry </span> 
          and intricate designs. Each saree is a story of tradition.
        </p>

        <AnimatedButton 
          to='/allcategories'
          label="The Collection" 
          className="px-12 py-5 border-[1.5px] border-[#1a1a1a] text-[#1a1a1a] hover:bg-[#1a1a1a] hover:text-white transition-all duration-500 uppercase text-xs tracking-widest font-bold" 
        />
      </motion.div>

      {/* RIGHT CONTENT: Balanced Grid */}
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