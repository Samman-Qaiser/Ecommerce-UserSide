// components/navigation/NavbarData.jsx
import React from "react";

// 1. Navbar ka sara data array form mein
export const navbarMenu = [
  {
    name: "Sarees",
    href: "/category/sarees",
    isDropdown: true,
    subCategories: [
      { title: "Kora / Organza Silk", href: "/category/organza-silk" },
      { title: "Chiffon", href: "/category/chiffon" },
      { title: "Matka Silk", href: "/category/matka-silk" },
      { title: "Banarsi Silk", href: "/category/banarsi-silk" },
      { title: "Katan Silk", href: "/category/katan-silk" },
      { title: "Chanderi", href: "/category/chanderi" },
      { title: "Maheshwari", href: "/category/maheshwari" },
      { title: "Muslin", href: "/category/muslin" },
      { title: "Linen", href: "/category/linen" },
      { title: "Cotton", href: "/category/cotton" },
      { title: "Tissue", href: "/category/tissue" },
      { title: "Tussar", href: "/category/tussar" },
      { title: "Raw Silk", href: "/category/raw-silk" },
      { title: "Kanjivaram Silk", href: "/category/kanjivaram-silk" }
    ]
  },
  { name: "Suits", href: "/category/suits", isDropdown: false },
  { name: "All Collection", href: "/all-collections", isDropdown: false },
  { name: "About Us", href: "/about-us", isDropdown: false },
  { name: "Contact Us", href: "/contact-us", isDropdown: false }
];

// 2. Navbar Skeleton Component
export const NavbarSkeleton = () => {
  const skeletonItems = ["80px", "60px", "120px", "100px", "90px", "100px"];

  return (
    <div className="flex items-center justify-center w-full py-6 bg-white border-b">
      <div className="flex gap-8">
        {skeletonItems.map((width, i) => (
          <div 
            key={i} 
            className="h-4 bg-slate-100 rounded-full animate-pulse shadow-sm"
            style={{ width: width }}
          />
        ))}
      </div>
    </div>
  );
};