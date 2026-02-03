import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="bg-[#FDF8F1] min-h-screen  text-[#2D160A]">
      
      {/* HERO SECTION: Minimalist & Grand */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1600" 
            className="w-full h-full object-cover opacity-30 grayscale"
            alt="Heritage"
          />
        </motion.div>
        <div className="relative text-center z-10 px-4">
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl lg:text-8xl uppercase tracking-tighter font-bold mb-4"
          >
            Our Story
          </motion.h1>
          <div className="w-20 h- mx-auto"></div>
        </div>
      </section>

      {/* PHILOSOPHY: Image Left, Text Right (Arch Style) */}
      <section className="max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeIn} className="relative group">
          <div className="w-full h-[500px] lg:h-[650px] rounded-t-full overflow-hidden border-[15px] border-white shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800" 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              alt="Craftsmanship"
            />
          </div>
          {/* Decorative element */}
          <div className="absolute -bottom-6 -right-6 w-32 h-3 -z-10 rounded-full opacity-20 blur-2xl"></div>
        </motion.div>

        <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="space-y-6">
          <h2 className="text-3xl lg:text-5xl leading-tight italic">
            "Where Tradition Meets the Modern Woman"
          </h2>
          <p className="text-lg text-gray-700 font-light leading-relaxed">
            Ambika was born out of a passion for the six yards of elegance. We believe that a saree isn't just an outfit; it's a piece of art that carries centuries of Indian heritage.
          </p>
          <p className="text-lg text-gray-700 font-light leading-relaxed">
            Our mission is to simplify elegance. With our <strong>Ready-to-Wear</strong> collections, we've removed the struggle of draping, so you can focus on making memories.
          </p>
        </motion.div>
      </section>

      {/* STATS / VALUES: Clean Grid */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
          {[
            { label: "Handcrafted Designs", val: "500+" },
            { label: "Happy Clients", val: "10k+" },
            { label: "Artisans Empowed", val: "50+" },
            { label: "Years of Legacy", val: "15+" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl lg:text-5xl font-bold mb-2 ">{stat.val}</h3>
              <p className="text-xs uppercase tracking-[0.2em] font-light opacity-70">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CORE VALUES: Horizontal Scroll feel on desktop */}
      <section className="max-w-7xl mx-auto py-24 px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-light uppercase tracking-widest">Our Core Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Authenticity", desc: "Every thread tells a story of genuine Indian craftsmanship." },
            { title: "Innovation", desc: "Redefining the saree experience for the fast-paced modern world." },
            { title: "Sustainability", desc: "Eco-friendly fabrics that are as kind to the planet as to your skin." }
          ].map((value, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 border border-black bg-white shadow-sm hover:shadow-xl transition-all duration-300 text-center space-y-4"
            >
              <div className="w-12 h-[1px mx-auto mb-4"></div>
              <h4 className="text-xl uppercase tracking-wider font-semibold">{value.title}</h4>
              <p className="text-gray-500 font-light leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default AboutPage;