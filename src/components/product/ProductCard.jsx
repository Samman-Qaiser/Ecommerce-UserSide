import { useState } from 'react';
import ProductQuickView from './ProductQuickView';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingCart, Check, ShoppingBagIcon } from 'lucide-react'; // Icons added
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../redux/wishlistSlice';
import { addToCart } from '../../redux/cartSlice'; // Cart action import kiya
import { toast } from 'sonner';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isAdded, setIsAdded] = useState(false); // Tick show karne ke liye state
  
  const dispatch = useDispatch();
  
  // Wishlist Logic
  const wishlistItems = useSelector(state => state.wishlist.items);
  const isFavorite = wishlistItems.some(item => item.id === product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
  
    dispatch(addToCart(product));
    
    // 2. UI update karein (Tick mark)
    setIsAdded(true);
    
    // 3. Feedback toast
    toast.success(`${product.name} added to cart`, {
      position: 'bottom-right',
    });

    // 4. 2 second baad wapis cart icon le aayein
    setTimeout(() => setIsAdded(false), 2000);
  };

const navigate = useNavigate();

const addToWishList = (e) => {
  e.preventDefault();
  e.stopPropagation();

  dispatch(toggleWishlist(product));

  showWishlistToast(product, isFavorite, navigate);
};

  return (
    <>
      <div
        className="group rounded-md relative border-none shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-transparent"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <Link to={`/product/${product.id}`} className="block relative aspect-3/4 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-md h-full object-cover transition-transform duration-500 group-hover:scale-105"
          /> 
          <Badge className='absolute top-2 rounded-t-r-md left-1 '>{product.badge}</Badge>

       

          {/* WISHLIST ICON (TOP RIGHT) */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white rounded-full h-9 w-9 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={addToWishList}
          >
            <Heart className={cn("h-4 w-4", isFavorite ? "fill-red-500 stroke-red-500" : "stroke-gray-700")} />
          </Button>

          {/* QUICK VIEW (BOTTOM RIGHT) */}
          <div
            className="absolute bottom-3 right-3 bg-white/90 px-2 py-1 rounded shadow-sm flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all cursor-pointer hover:bg-white"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setIsQuickViewOpen(true);
            }}
          >
            <Eye className="w-4 h-4 text-gray-500" />
            <span className="text-gray-600 text-[10px] font-medium uppercase">Quick View</span>
          </div>

          {/* RATING (BOTTOM LEFT) */}
          <div className="absolute bottom-3 left-3 bg-white/90 px-1.5 py-0.5 rounded shadow-sm flex items-center gap-0.5">
            <span className="text-[10px] font-bold">{product.rating}</span>
            <span className="text-yellow-500 text-xs">★</span>
          </div>
        </Link>

        {/* Product Details (Name, Price etc.) */}
        <div className="p-4">
           {/* ... aapka existing info code ... */}
           <h3 className="text-[12px] uppercase tracking-wider">{product.name}</h3>
            <p className="text-sm text-gray-600 mt-1 border border-gray-300 rounded px-2 py-0.5 inline-block">
            {product.category}
          </p>
           <div className="mt-2 font-medium">₹ {product.price.toLocaleString('en-IN')}</div>
        </div>
           {/* ADD TO CART ICON (TOP LEFT) */}
          <button
            onClick={handleAddToCart}
            className={cn(
              "absolute bottom-2 right-3 z-20 flex items-center justify-center h-9 w-9 rounded-full transition-all duration-300 shadow-md",
              "opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0",
              isAdded ? "bg-green-600 text-white" : "bg-black text-white hover:bg-gray-800"
            )}
          >
            {isAdded ? (
              <Check className="h-4 w-4 animate-in zoom-in duration-300" />
            ) : (
              <ShoppingBagIcon className="h-4 w-4"  />
            )}
          </button>
      </div>
{/* ProductCard.jsx ke end mein jahan Portal hai */}
{isQuickViewOpen && createPortal(
  <ProductQuickView 
    // Yahan hum ensure kar rahe hain ke images hamesha ek array ho
    product={{
      ...product,
      images: product.images || [product.image] 
    }} 
    open={isQuickViewOpen} 
    onClose={() => setIsQuickViewOpen(false)} 
  />,
  document.body
)}
    </>
  );
}
const showWishlistToast = (product, isFavorite, navigate) => {
  toast(
    <div className="flex items-center gap-3">
      <img
        src={product.image}
        alt={product.name}
        className="h-12 w-12 rounded object-cover border"
      />

      <div className="flex-1">
        <p className="text-sm font-semibold">
          {isFavorite ? "Removed from Wishlist" : "Added to Wishlist"}
        </p>
        <p className="text-xs text-muted-foreground line-clamp-1">
          {product.name}
        </p>

        {!isFavorite && (
          <button
            onClick={() => navigate("/wishlist")}
            className="mt-1 text-xs font-medium text-black underline"
          >
            View Wishlist
          </button>
        )}
      </div>
    </div>,
    {
      duration: 3000,
    }
  );
};
