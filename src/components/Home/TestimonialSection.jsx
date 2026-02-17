import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

// Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Ananya Sharma",
    role: "Elite Bride",
    content:
      "The Banarasi silk quality is unmatched. It felt like wearing a piece of heritage art tailored for the modern woman.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "Fashion Curator",
    content:
      "Minimalist design and premium fabric. The drape of their organza is fluid, ethereal, and simply perfect.",
    rating: 5,
  },
  {
    id: 3,
    name: "Sneha Reddy",
    role: "Regular Patron",
    content:
      "The attention to detail in the zari work is breathtaking. Truly a luxury experience from order to delivery.",
    rating: 5,
  },
  {
    id: 4,
    name: "Meera Das",
    role: "Verified Connoisseur",
    content:
      "I bought a Kanjeevaram for my mother. The craftsmanship speaks volumes of the brand's commitment to excellence.",
    rating: 5,
  },
];

const TestimonialSection = () => {
  return (
    <section className="relative py-24 bg-[#FCFBF9] overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-125 h-125 bg-amber-100/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-125 h-125 bg-slate-200/50 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center text-center mb-20">
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
            transition={{ duration: 1 }}
            className="text-[10px] md:text-xs uppercase text-[#A07B50] font-medium mb-4"
          >
            The Testimonial Archive
          </motion.span>

          <h2 className="text-4xl md:text-6xl font-serif text-slate-900 leading-tight">
            Voices of <span className="italic">Elegance</span>
          </h2>

          <div className="w-12 h-px bg-amber-800/30 mt-8"></div>
        </div>

        {/* Slider Section */}
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={40}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-20 px-4!"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative bg-white/60 backdrop-blur-md p-10 rounded-2xl border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(0,0,0,0.05)] transition-all duration-500 h-full flex flex-col justify-between"
              >
                {/* Accent Icon */}
                <div className="absolute top-8 right-10">
                  <Quote
                    size={32}
                    className="text-[#A07B50]/10 group-hover:text-[#A07B50]/20 transition-colors duration-500"
                  />
                </div>

                <div className="relative">
                  <div className="flex gap-1 mb-6">
                    {[...Array(item.rating)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-1 rounded-full bg-amber-600"
                      ></div>
                    ))}
                  </div>

                  <p className="text-slate-700 text-lg leading-relaxed font-light mb-10 italic">
                    "{item.content}"
                  </p>
                </div>

                <div className="flex items-center gap-5 pt-8 border-t border-slate-100">
                  <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white font-serif text-sm tracking-widest overflow-hidden relative group-hover:scale-105 transition-transform duration-500">
                    {item.name.charAt(0)}
                    <div className="absolute inset-0 bg-amber-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>

                  <div className="flex flex-col">
                    <h4 className="font-serif text-lg text-slate-900 tracking-wide">
                      {item.name}
                    </h4>
                    <p className="text-amber-800/60 text-[10px] uppercase tracking-[0.2em] font-medium">
                      {item.role}
                    </p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #e2e8f0;
          opacity: 1;
          width: 6px;
          height: 6px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .swiper-pagination-bullet-active {
          background: #b45309 !important;
          width: 30px !important;
          border-radius: 10px !important;
        }
        .swiper-container {
          overflow: visible !important;
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;
