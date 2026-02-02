import { useState } from "react";
import { X, ShoppingBag, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

export default function ProductQuickView({ product, open, onClose }) {
  const sizes = [
    { label: "XS-S", inStock: true },
    { label: "SM", inStock: true },
    { label: "M-L", inStock: false },
    { label: "XL-XXL", inStock: true },
    { label: "XXXL", inStock: true },
  ];

  const [selectedSize, setSelectedSize] = useState(null);

  const handleSelect = (size) => {
    if (!size.inStock) return; // prevent selecting out-of-stock
    setSelectedSize(size.label);
  };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!open || !product) return null;

  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  const prevImage = () =>
    setCurrentImageIndex(
      (prev) => (prev - 1 + product.images.length) % product.images.length,
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center lg:p-4">
      {/* Backdrop - Only visible on LG screens */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm lg:block hidden"
        onClick={onClose}
      />

      {/* --- DESKTOP VIEW (lg screen) --- */}
      <div className="relative z-50 w-[80vw] max-w-4xl bg-[#FCF8F3] overflow-hidden shadow-2xl rounded-sm">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-60 text-gray-500 hover:text-black transition-colors"
        >
          <X className="h-6 w-6 stroke-[1.5px]" />
        </button>

        <div className="flex lg:flex-row flex-col">
          {/* LEFT: Image Gallery */}
          <div className="relative  w-[50%] flex items-center justify-center  min-h-125">
            <div className="relative py-6 flex items-center justify-center">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="max-h-[85vh] w-full object-contain shadow-sm"
              />
            </div>

            {/* Carousel Dots (Bottom Left Style) */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
              {product.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={cn(
                    "h-2 w-2 rounded-full border border-gray-400 transition-all",
                    idx === currentImageIndex
                      ? "bg-gray-800 w-4"
                      : "bg-transparent",
                  )}
                />
              ))}
            </div>
          </div>

          {/* RIGHT: Product Info */}
          <div className="flex w-[53%] flex-col px-2 justify-center">
            {/* Product Tags */}
            <div className="flex gap-2 ">
              <Badge
                variant="outline"
                className="rounded-none mb-1 border-gray-400 font-light tracking-widest"
              >
                jhioo
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-medium  text-gray-900  tracking-widest uppercase">
              {product.name}
            </h1>

            {/* Price */}
            <div >
              <span className="text-xl font-medium text-gray-800">
                ₹ {product.price.toLocaleString("en-IN")}.00
              </span>
              <p className="text-[11px] text-gray-500 mt-1">
                MRP Inclusive of all taxes
              </p>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-2 mb-1">
              <span className="animate-pulse text-orange-700 text-lg">🔥</span>
              <p className="text-[11px] text-red-800 font-medium mt-2 ">
                39 others have this in their cart!
              </p>
      </div>

            {/* Action Buttons */}
            <div className="space-y-6 pt-1  border-t w-full border border-l-0 border-r-0">
              {/* --- SIZE SECTION START --- */}
              <div>
                <div className="flex items-center justify-between mt-2 mb-2">
                  <span className="text-sm font-medium tracking-widest text-gray-900">
                    SIZE:
                  </span>
                  <button className="text-sm mb-1 font-medium underline underline-offset-4 hover:text-gray-600 transition-colors">
                    Size chart
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => {
                    const isSelected = selectedSize === size.label;

                    return size.inStock ? (
                      <button
                        key={size.label}
                        onClick={() => handleSelect(size)}
                        className={`
                h-10 w-12 flex items-center justify-center text-md tracking-tighter font-light
                border transition-all
                ${
                  isSelected
                    ? "bg-[#FFB52E] border-[#FFB52E] text-white shadow-sm"
                    : "bg-white border-gray-200 text-gray-900 hover:border-[#FFB52E] hover:text-[#FFB52E]"
                }
                active:scale-95
              `}
                      >
                        {size.label}
                      </button>
                    ) : (
                      <div
                        key={size.label}
                        className="h-10 w-10 border border-gray-200 flex items-center justify-center text-gray-400 text-md tracking-tighter bg-white/50 cursor-not-allowed"
                      >
                        {size.label}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* --- SIZE SECTION END --- */}
              <Button className="w-full py-6 bg-[#FFB52E] hover:bg-[#E6A429] text-white text-xl tracking-[0.2em] font-               semibold rounded-md shadow-md transition-all active:scale-[0.98]">
                ADD TO CART
              </Button>
            </div>

            <Accordion
              type="single"
              collapsible
              defaultValue="item-1"
              className="border-b"
            >
              <AccordionItem value="item-1" className="border-b">
                <AccordionTrigger className="font-light tracking-wider">
                  Details
                </AccordionTrigger>
                <AccordionContent></AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link to={`/product/${product.id}`} className="py-7  ">
              View Details
            </Link>
          </div>
        </div>
      </div>

      {/* --- MOBILE VIEW (Same as your Screenshot) --- */}
      <div className="fixed inset-0 bg-[#FCF8F3] z-50 overflow-y-auto lg:hidden">
        {/* Yellow Header */}
        <div className="bg-[#FFB52E] text-white flex items-center justify-between px-4 py-4 sticky top-0 z-20 shadow-sm">
          <div className="w-6" /> {/* Spacer */}
          <h2 className="text-sm font-semibold tracking-[0.2em] uppercase">
            Choose Options
          </h2>
          <button onClick={onClose}>
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex flex-col">
          {/* Mobile Image Carousel */}
          <div className="relative aspect-3/4 bg-[#F3EFE9] flex items-center justify-center p-4">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="h-full w-full object-contain"
            />

            {/* Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 p-2 rounded-full"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Product Content */}
          <div className="p-6">
            <h1 className="text-xl font-light tracking-widest uppercase text-gray-900 mb-3">
              {product.name}
            </h1>
            <Badge
              variant="outline"
              className="rounded-none border-gray-300 font-light text-[10px] mb-4"
            >
              {product.category || "SKIRT"}
            </Badge>

            <div className="mb-6">
              <div className="text-lg font-medium text-gray-800">
                ₹ {product.price.toLocaleString("en-IN")}.00
              </div>
              <p className="text-[11px] text-gray-400 italic">
                MRP Inclusive of all taxes
              </p>
            </div>

            <hr className="border-gray-200 mb-4" />

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="details" className="border-b">
                <AccordionTrigger className="uppercase text-xs tracking-[0.2em] py-5">
                  Details
                </AccordionTrigger>
                <AccordionContent>Your product info here...</AccordionContent>
              </AccordionItem>
              <AccordionItem value="size" className="border-b">
                <AccordionTrigger className="uppercase text-xs tracking-[0.2em] py-5 flex justify-between">
                  <span>Size</span>
                  <span className="text-[10px] underline lowercase normal-case">
                    Size chart
                  </span>
                </AccordionTrigger>
                <AccordionContent>Select your size...</AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Sticky Mobile Add to Cart (Optional) */}
            <div className="mt-10">
              <Button className="w-full py-8 bg-[#FFB52E] text-white text-lg tracking-widest rounded-none">
                ADD TO CART
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
