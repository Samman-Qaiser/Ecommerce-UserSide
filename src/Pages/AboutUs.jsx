import React from 'react';
import { motion } from 'framer-motion';
import { Award, ShieldCheck, Heart, Sparkles, MapPin, History } from 'lucide-react';

const AboutPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
  };

  return (
    <div className="bg-[#FCF9F5] min-h-screen font-serif">
      
      {/* HERO SECTION: High-End Fashion Look */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8 }}
          className="absolute inset-0"
        >
          <img 
            src="./doritaga.jpg" 
            className="w-full h-full object-cover object-[50%_20%]"
            alt="Doritaaga Heritage"
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
        </motion.div>
        
        <div className="relative text-center z-10 px-4">
          <motion.span 
            initial={{ opacity: 0, letterSpacing: "0.2em" }}
            animate={{ opacity: 1, letterSpacing: "0.5em" }}
            className="text-white text-xs lg:text-sm uppercase mb-4 block font-sans tracking-[0.5em]"
          >
            Since 2016 • A Decade of Artistry
          </motion.span>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-5xl lg:text-8xl text-white font-light lowercase italic tracking-tighter"
          >
            Doritaaga <span className="font-sans not-italic font-bold text-3xl lg:text-5xl uppercase tracking-widest block mt-2">By Kirti</span>
          </motion.h1>
        </div>
      </section>

      {/* THE FOUNDATION: Defence Background Section */}
      <section className="max-w-7xl mx-auto py-24 px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div {...fadeIn} className="relative group">
          <div className="relative z-10 w-full aspect-3/4 rounded-t-full overflow-hidden border-12px border-white shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800" 
              className="w-full h-full object-cover transition-transform duration-2000ms group-hover:scale-110"
              alt="Handloom Artistry"
            />
          </div>
          {/* Accent Element */}
          <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-amber-100 rounded-full z-0 opacity-50 blur-3xl"></div>
        </motion.div>

        <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="space-y-8">
          <div className="space-y-2">
            <h6 className="text-gray-500 uppercase tracking-widest text-xs font-bold font-sans">The Founder's Journey</h6>
            <h2 className="text-4xl lg:text-5xl font-light leading-tight text-slate-900">
              Woven with <span className="italic">Discipline</span> & <span className="italic">Grace</span>
            </h2>
          </div>
          
          <div className="space-y-6 text-gray-500 text-lg font-light leading-relaxed">
            <p>
              Born from a life shaped by resilience, <strong>Doritaaga By Kirti</strong> is the reflection of a journey across India's rich cultural landscape. Coming from a <strong>Defence Background</strong>, Kirti's vision was nurtured through constant movement—from the looms of Banaras to the silks of the South.
            </p>
            <p className="border-l-4 border-gray-300 pl-6 italic text-gray-500">
              "I observed the grace of Armed Forces ladies—women who carry themselves with dignity and quiet confidence. These experiences became my greatest classroom."
            </p>
            <p>
              This unique blend of military values—discipline, commitment, and integrity—ensures that every thread at Doritaaga stands for premium quality and absolute trust.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 pt-4 font-sans uppercase text-[10px] tracking-widest font-bold">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-gray-500" /> Authentic Handloom
            </div>
            <div className="flex items-center gap-3">
              <History className="w-5 h-5 text-gray-500" /> 10 Years Legacy
            </div>
          </div>
        </motion.div>
      </section>

      {/* STATS SECTION: Minimalist Dark */}
      <section className="bg-black text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-linear-to-l from-white/5 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center relative z-10">
          {[
            { label: "Handcrafted Pieces", val: "2,500+" },
            { label: "Global Clients", val: "10,000+" },
            { label: "Artisan Clusters", val: "12+" },
            { label: "Years of Trust", val: "10+" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-4xl lg:text-6xl font-light mb-2 text-gray-300">{stat.val}</h3>
              <p className="text-[10px] uppercase tracking-[0.3em] font-medium opacity-50 font-sans">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CORE PHILOSOPHY: Grid with subtle hover */}
      <section className="max-w-7xl mx-auto py-32 px-6">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl lg:text-5xl font-light">The Doritaaga Values</h2>
          <div className="w-24 h-1 bg-gray-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            { 
              icon: <Award className="w-8 h-8" />,
              title: "Uncompromising Quality", 
              desc: "Every order is handled with personal attention, ensuring the finest weaves at honest, accessible prices." 
            },
            { 
              icon: <MapPin className="w-8 h-8" />,
              title: "Regional Heritage", 
              desc: "From every region we called home, we've curated authentic traditions—preserving India's heritage." 
            },
            { 
              icon: <Heart className="w-8 h-8" />,
              title: "Personalized Care", 
              desc: "We understand the emotions attached to handloom wear, treating every client's preference with sincerity." 
            }
          ].map((value, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-12 bg-white shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] border-b-4 border-transparent hover:border-gray-500 transition-all duration-500 text-center"
            >
              <div className="text-gray-500 mb-6 flex justify-center">{value.icon}</div>
              <h4 className="text-xl uppercase tracking-widest font-sans font-bold mb-4">{value.title}</h4>
              <p className="text-slate-500 font-light leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SIGNATURE FOOTER: Branding */}
      <section className="pb-24 px-6 text-center max-w-4xl mx-auto">
        <motion.div {...fadeIn}>
           <Sparkles className="w-8 h-8 text-gray-500 mx-auto mb-6 opacity-40" />
           <p className="text-2xl lg:text-3xl font-light italic text-slate-800 leading-snug">
             "At Doritaaga By Kirti, we don’t just sell sarees — we carry forward a legacy of culture, discipline, and beauty woven into every thread."
           </p>
           <div className="mt-10">
              <img src="/signature.png" alt="Kirti Signature" className="h-16 mx-auto opacity-70" />
              <p className="uppercase tracking-[0.2em] text-xs font-bold mt-2 font-sans">Kirti — Founder</p>
           </div>
        </motion.div>
      </section>
     {/* --- VISION & MISSION: THE SOUL OF DORITAAGA --- */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-slate-200 border border-slate-200 rounded-3xl overflow-hidden shadow-2xl shadow-slate-100">
            
            {/* Vision Box */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[#FAF7F2] p-12 lg:p-20 flex flex-col justify-center space-y-6 relative overflow-hidden group"
            >
              <div className="absolute -top-10 -left-10 text-slate-100 group-hover:text-amber-100/50 transition-colors duration-700">
                <Sparkles size={200} />
              </div>
              
              <div className="relative z-10">
                <div className="w-12 h-12 bg-gray-600 text-white rounded-full flex items-center justify-center mb-8 shadow-lg">
                  <span className="font-sans font-bold text-xs tracking-tighter">01</span>
                </div>
                <h3 className="text-sm uppercase tracking-[0.3em] font-sans font-bold text-gray-600 mb-4">Our Vision</h3>
                <h2 className="text-3xl lg:text-4xl font-light text-slate-900 leading-tight">
                  To preserve India's <span className="italic">timeless heritage</span> and bring authentic luxury to every modern household.
                </h2>
                <p className="mt-6 text-slate-600 font-light leading-relaxed">
                  Humara maqsad sirf kapda bechna nahi, balki har ghar mein Bharat ki mitti aur karigari ki kahani pahunchana hai. We envision a future where tradition is not just a memory, but a lifestyle.
                </p>
              </div>
            </motion.div>

            {/* Mission Box */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-black p-12 lg:p-20 flex flex-col justify-center space-y-6 relative group"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center mb-8 shadow-lg">
                  <span className="font-sans font-bold text-xs tracking-tighter">02</span>
                </div>
                <h3 className="text-sm uppercase tracking-[0.3em] font-sans font-bold text-gray-400 mb-4">Our Mission</h3>
                <h2 className="text-3xl lg:text-4xl font-light text-white leading-tight">
                  Delivering <span className="italic  text-gray-400">unmatched quality</span> with the discipline and integrity of our roots.
                </h2>
                <p className="mt-6 text-slate-400 font-light leading-relaxed">
                  We are committed to making premium handloom accessible. Through honest pricing and personalized attention, we ensure that every client feels the trust and dedication that Doritaaga stands for.
                </p>
              </div>
              
              {/* Decorative Background Pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;