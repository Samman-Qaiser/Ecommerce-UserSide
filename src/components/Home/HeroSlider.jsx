import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Landscape images for desktop
const bannersLandscape = [
  "https://picsum.photos/1200/500?random=1",
  "https://picsum.photos/1200/500?random=2",
  "https://picsum.photos/1200/500?random=3",
];

// Portrait images for XS / mobile
const bannersPortrait = [
  "https://picsum.photos/600/800?random=1",
  "https://picsum.photos/600/800?random=2",
  "https://picsum.photos/600/800?random=3",
];

const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile / xs screen
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640); // Tailwind xs breakpoint
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % bannersLandscape.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + bannersLandscape.length) % bannersLandscape.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % bannersLandscape.length);
  };

  const banners = isMobile ? bannersPortrait : bannersLandscape;

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* Slider Images */}
      <div className="w-full overflow-hidden relative">
        {banners.map((img, index) => (
          <div
            key={index}
            className={`transition-transform duration-700 ease-in-out ${
              index === current ? "translate-x-0" : "translate-x-full absolute top-0 left-0 w-full"
            }`}
          >
            <img
              src={img}
              alt={`Banner ${index + 1}`}
              className="w-full object-cover xs:h-auto lg:h-125"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <span
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === current ? "bg-white" : "bg-white/50"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
