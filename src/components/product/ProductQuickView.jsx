import { useState, useEffect } from "react";
import { X, ChevronRight, ChevronLeft, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/cartSlice";
import { toggleWishlist } from "../../redux/wishlistSlice";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedButton from "../ui/AnimmatedButton";

export default function ProductQuickView({ product, open, onClose }) {
  const dispatch = useDispatch();
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Fallback for images array
  const images = product.images || [product.image];
  const hasVideo = !!product.video;
  const totalSlides = hasVideo ? images.length + 1 : images.length;
  const isVideoSlide = hasVideo && currentImageIndex === totalSlides - 1;

  const sizes = [
    { label: "XS-S", inStock: true },
    { label: "SM", inStock: true },
    { label: "M-L", inStock: false },
    { label: "XL-XXL", inStock: true },
    { label: "XXXL", inStock: true },
  ];

  // Redux Logic
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isFavorite = wishlistItems.some((item) => item.id === product.id);

  // Modal safety: Disable body scroll when open
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => (document.body.style.overflow = "unset");
  }, [open]);

  // Reset slide index when product changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [product]);

  if (!open || !product) return null;

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % totalSlides);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + totalSlides) % totalSlides);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size", { position: "bottom-center" });
      return;
    }
    dispatch(addToCart({ ...product, selectedSize }));
    toast.success("Added to cart successfully!");
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-0 lg:p-6">
      {/* Overlay */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md" 
        onClick={onClose} 
      />

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-110 w-full h-full lg:h-auto lg:max-w-5xl bg-white lg:rounded-lg overflow-hidden flex flex-col lg:flex-row"
      >
        {/* Desktop Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-50 p-2 bg-white/50 hover:bg-white rounded-full hidden lg:block transition-all">
          <X className="w-5 h-5" />
        </button>

        {/* LEFT: IMAGE / VIDEO CAROUSEL SECTION */}
        <div className="relative mt-5 w-full lg:w-1/2 h-[50vh] lg:h-[80vh] bg-[#F9F9F9] group">
          <AnimatePresence mode="wait">
            {isVideoSlide ? (
              /* VIDEO SLIDE */
              <motion.div
                key="video-slide"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full"
              >
                <video
                  src={product.video}
                  className="w-full h-full object-cover lg:object-contain"
          
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </motion.div>
            ) : (
              /* IMAGE SLIDE */
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full object-cover lg:object-contain"
              />
            )}
          </AnimatePresence>

          {/* Navigation Arrows */}
          {totalSlides > 1 && (
            <>
              <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          {/* Progress Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {Array.from({ length: totalSlides }).map((_, idx) => {
              const isVideo = hasVideo && idx === totalSlides - 1;
              const isActive = idx === currentImageIndex;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={cn(
                    "h-1 transition-all rounded-full",
                    isActive ? "w-6 bg-black" : "w-2 bg-black/20",
                    // video dot: show a small play icon feel with slightly different style
                    isVideo && !isActive && "bg-black/40"
                  )}
                />
              );
            })}
          </div>

          {/* Video Badge on last dot / slide */}
          {hasVideo && isVideoSlide && (
            <div className="absolute top-4 left-4 bg-black/70 text-white text-[10px] uppercase tracking-widest px-2 py-1 rounded">
              Video
            </div>
          )}
        </div>

        {/* RIGHT: CONTENT SECTION */}
        <div className="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col h-full bg-white overflow-y-auto">
          {/* Mobile Header (Only visible on Mobile) */}
          <div className="lg:hidden flex justify-between items-center mb-6">
            <button onClick={onClose}><X className="w-6 h-6" /></button>
            <span className="text-xs font-bold tracking-[0.2em] uppercase">Quick View</span>
            <button onClick={() => dispatch(toggleWishlist(product))}>
               <Heart className={cn("w-6 h-6", isFavorite ? "fill-red-500 stroke-red-500" : "")} />
            </button>
          </div>

          <div className="flex-1">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="secondary" className="rounded-none uppercase tracking-tighter text-[10px]">
                {product.category}
              </Badge>
              <button onClick={() => dispatch(toggleWishlist(product))} className="hidden lg:block">
                <Heart className={cn("w-6 h-6 transition-all hover:scale-110", isFavorite ? "fill-red-500 stroke-red-500" : "text-gray-400")} />
              </button>
            </div>

            <h1 className="text-2xl lg:text-3xl font-light tracking-wider uppercase text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="mb-8">
              <div className="text-2xl font-semibold text-gray-900">
                ₹ {product.price.toLocaleString("en-IN")}.00
              </div>
              <p className="text-xs text-gray-500 italic mt-1">MRP Inclusive of all taxes</p>
            </div>

            {/* Size Selection */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <label className="text-xs font-bold tracking-widest uppercase text-gray-500">
                  Select Size: <span className="text-black">{selectedSize || "None"}</span>
                </label>
                <button className="text-[10px] underline uppercase tracking-widest">Size Guide</button>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((size) => (
                  <button
                    key={size.label}
                    disabled={!size.inStock}
                    onClick={() => setSelectedSize(size.label)}
                    className={cn(
                      "h-12 border flex items-center justify-center text-xs transition-all",
                      !size.inStock ? "bg-gray-50 text-gray-300 cursor-not-allowed border-gray-100" : "hover:border-black",
                      selectedSize === size.label ? "bg-black text-white border-black" : "bg-white text-gray-900 border-gray-200"
                    )}
                  >
                    {size.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Full Width Action Button */}
          <div className="m-auto flex items-center -translate-y-5 w-full">
            <AnimatedButton
              onClick={handleAddToCart}
              label="ADD TO CART"
              className="font-light w-full"
            />
          </div>
          <Link 
            to={`/product/${product.id}`}
            className="block w-full py-2 text-[10px] uppercase tracking-[0.2em] text-gray-400 hover:text-black transition-colors"
          >
            View Full Product Details <ChevronRight className="inline w-3 h-3 ml-1" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}