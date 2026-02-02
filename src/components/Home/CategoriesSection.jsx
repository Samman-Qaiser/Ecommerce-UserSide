import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Saree", img: "https://picsum.photos/150/150?random=1", link: "/shop/saree" },
  { name: "Blouse", img: "https://picsum.photos/150/150?random=2", link: "/shop/blouse" },
  { name: "Pre Draped", img: "https://picsum.photos/150/150?random=3", link: "/shop/pre-draped" },
  { name: "Dresses", img: "https://picsum.photos/150/150?random=4", link: "/shop/dresses" },
  { name: "Kurta", img: "https://picsum.photos/150/150?random=5", link: "/shop/kurta" },
  { name: "Lehenga", img: "https://picsum.photos/150/150?random=6", link: "/shop/lehenga" },
  { name: "Men", img: "https://picsum.photos/150/150?random=7", link: "/shop/men" },
  { name: "Combo", img: "https://picsum.photos/150/150?random=8", link: "/shop/combo" },
];

const CategoriesSection = () => {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4; // Number of categories to show on small screens

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.innerWidth < 1024) {
        setStartIndex((prev) => (prev + 1) % categories.length); // slide one at a time
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Small screen slice logic
  let currentCategories = [];
  for (let i = 0; i < visibleCount; i++) {
    currentCategories.push(categories[(startIndex + i) % categories.length]);
  }

  return (
    <div className="w-full py-8 px-2 lg:px-4">
    <div className="flex items-center justify-center gap-4">
    <img src="./love.jfif"/>
    </div>

      {/* Large screens */}
      <div className="hidden mt-6 lg:flex justify-between items-center gap-4 w-full">
        {categories.map((cat, index) => (
          <Link
            key={index}
            to={cat.link}
            className="flex flex-col items-center gap-2 w-full hover:scale-105 transition-transform"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="w-full h-36 object-cover rounded-full border-2 border-red-500"
            />
            <span className="text-xl  ">{cat.name}</span>
          </Link>
        ))}
      </div>

      {/* Small screens: auto sliding without visible scrollbar */}
      <div className=" lg:hidden grid grid-cols-4 gap-2">
        {currentCategories.map((cat, index) => (
          <Link
            key={index}
            to={cat.link}
            className="flex flex-col items-center gap-2 w-full hover:scale-105 transition-transform"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="w-20 h-20 object-cover rounded-full border-2 border-red-500"
            />
            <span className="text-sm font-medium text-center">{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
