import React from "react";
import { FaHome, FaThLarge, FaShoppingCart, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5"
import { FiShoppingCart } from "react-icons/fi";;
import { TbCategory } from "react-icons/tb";
import CartSidebar from "../CartSidebar";
export const SideNavigation = () => (
  <nav>
    {/* Large screens - vertical side nav */}
    <div className="hidden md:flex shadow-md fixed left-0 top-1/3 flex-col gap-4 z-50 bg-white p-3">
      <Link to="/"><IoHomeOutline className="font-light font-extralight" size={24} /></Link>
      <Link to="/allcategories"><TbCategory size={24} /></Link>
      <CartSidebar>
                <FiShoppingCart size={24} />
      </CartSidebar>
    </div>

    {/* Small screens - horizontal bottom nav */}
    <div className="md:hidden fixed bottom-0 bg-white left-0 w-full   flex justify-around p-3 z-50">
      <Link to="/"><IoHomeOutline size={24} /></Link>
      <Link to="/allcategories"><TbCategory size={24} /></Link>
      <CartSidebar>
        <FiShoppingCart size={24} />
      </CartSidebar>
     
    </div>
  </nav>
);
