import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';

// Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const testimonials = [
  { id: 1, name: "Ananya Sharma", role: "Bride", content: "The Banarasi silk quality is unmatched. It felt like wearing a piece of art.", image: "https://i.pravatar.cc/150?u=1", rating: 5 },
  { id: 2, name: "Priya Patel", role: "Blogger", content: "Minimalist design and premium fabric. The drape of their organza is just perfect.", image: "https://i.pravatar.cc/150?u=2", rating: 5 },
  { id: 3, name: "Sneha Reddy", role: "Customer", content: "Fast delivery and the colors are exactly as shown in the pictures. Highly recommended!", image: "https://i.pravatar.cc/150?u=3", rating: 4 },
  { id: 4, name: "Meera Das", role: "Verified Buyer", content: "I bought a Kanjeevaram for my mom, and she absolutely loved the zari work.", image: "https://i.pravatar.cc/150?u=4", rating: 5 },
];

const TestimonialSection = () => {
  return (
    <section className="py-20 bg-[#faf9f6]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Section - Centered */}
        <div className="flex flex-col items-center justify-center text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm uppercase tracking-[0.3em] text-gray-500 font-semibold mb-3"
          >
            Voices of Elegance
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl  text-slate-800 max-w-2xl leading-tight">
            What Our Patrons Say
          </h2>
          
          <div className="w-24 h-1 bg-gray-500 mt-6 rounded-full opacity-30"></div>
        </div>

        {/* Slider Section */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16"
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id} className="h-auto">
              <motion.div 
                whileHover={{ y: -8 }}
                className="bg-white p-8 rounded-[2rem] shadow-[0_15px_40px_-20px_rgba(0,0,0,0.08)] border border-gray-100 h-full flex flex-col"
              >
                <div className="text-5xl text-gray-500 opacity-20  leading-none mb-2">“</div>
                
                <p className="text-gray-600 leading-relaxed flex-grow italic mb-8 px-2">
                  {item.content}
                </p>

                <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-14 h-14 rounded-full object-cover ring-4 ring-[#faf9f6]"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 leading-tight">{item.name}</h4>
                    <p className="text-gray-400 text-[11px] uppercase tracking-wider mt-1">{item.role}</p>
                    <div className="flex text-yellow-500 text-[10px] mt-1">
                      {"★".repeat(item.rating)}
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modern Gold Theme Overrides */}
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #d1d1d1;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          background: gray !important;
          width: 25px !important;
          border-radius: 5px !important;
          transition: all 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default TestimonialSection;