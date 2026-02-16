import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import AnimatedButton from "../ui/AnimmatedButton";

const ImageTextSection = () => {
  // Soft parallax effect for the background shape
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="w-full bg-[#FCF9F5] py-20 lg:py-32 overflow-hidden relative">
      {/* Background Decorative Element */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute top-20 right-[-10%] w-[400px] h-[400px] rounded-full bg-[#A07B50]/5 blur-3xl"
      />

      <section className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row-reverse items-center gap-16 lg:gap-24 relative z-10">
        
        {/* Right: Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/2 space-y-8"
        >
          <div className="space-y-4">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-[#A07B50] uppercase tracking-[0.2em] text-xs font-semibold block"
            >
              Premium Collection
            </motion.span>
            
            <h2 className="text-5xl lg:text-7xl font-serif text-[#2D2D2D] leading-[1.1] italic">
              Cosy <span className="font-sans not-italic font-light text-gray-400">&</span> <br /> 
              <span className="relative">
                Comfortable
                <svg className="absolute -bottom-2 left-0 w-full h-2 text-[#A07B50]/20" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 25 0 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
              </span>
            </h2>
          </div>

          <p className="text-gray-500 text-lg lg:text-xl leading-relaxed font-light max-w-lg">
            Whether you're lounging at home or stepping out, our eco-conscious 
            fabrics redefine the boundary between <span className="text-[#A07B50] font-medium">luxury and ease.</span>
          </p>

          <div className="pt-4">
            <AnimatedButton 
              label="Explore Collection" 
              className="px-10 py-4 bg-[#2D2D2D]  hover:bg-[#A07B50] transition-colors duration-500  shadow-lg" 
              to='/allcategories' 
            />
          </div>
        </motion.div>

        {/* Left: Enhanced Arch Image Section */}
        <div className="relative w-full lg:w-1/2 group">
          
          {/* Decorative Floating Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="absolute -bottom-10 -right-4 lg:-right-10 bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl z-20 hidden sm:block border border-white/50"
          >
            <p className="text-[#A07B50] font-serif italic text-2xl">100%</p>
            <p className="text-[10px] uppercase tracking-widest text-gray-500">Organic Cotton</p>
          </motion.div>

          {/* Main Image Container */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* The Outer Arch Border */}
            <div className="absolute -inset-6 border-[1px] border-[#A07B50]/30 rounded-t-full translate-y-4 group-hover:translate-y-2 transition-transform duration-700" />
            
            {/* The Image Wrapper */}
            <div className="relative aspect-3/5 w-full max-w-[450px] mx-auto rounded-t-full overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border-[8px] border-white">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
                src="/katan.jfif" 
                className="w-full h-full object-cover" 
                alt="Luxury Wear" 
              />
              
              {/* Subtle Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-40" />
            </div>
          </motion.div>
        </div>

      </section>
    </div>
  );
};

export default ImageTextSection;