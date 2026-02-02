import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ProductQuickView from './ProductQuickView';

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);

  // Dummy product data (Firebase se replace hoga baad mein)
  const dummyProduct = {
    id: product?.id || 1,
    name: product?.name || 'BEET AND TURNIP',
    description: product?.description || 'Saree with blouse piece',
    category: product?.category || 'Cotton and Acrylic',
    price: product?.price || 4200.00,
    originalPrice: product?.originalPrice || null,
    discount: product?.discount || null,
    rating: product?.rating || 5.0,
    reviews: product?.reviews || 772,
    image: product?.image || 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
    images: product?.images || [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=500',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500',
    ],
    badge: product?.badge || 'TOP RATED', // 'TOP RATED', 'NEW', 'BEST SELLER', 'SALE'
    stock: product?.stock || 2,
    inStock: product?.inStock !== false,
  };

  return (
    <>
      <div 
        className="group relative overflow-hidden border-none shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer bg-transparent"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <Link to={`/product/${dummyProduct.id}`} className="block relative aspect-3/4 overflow-hidden ">
          <img
            src={dummyProduct.image}
            alt={dummyProduct.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Badge - Top Left */}
          {dummyProduct.badge && (
            <div className="absolute top-0 left-0 z-10">
              <Badge 
                className={cn(
                  "px-3 py-1 rounded-none text-xs font-semibold uppercase tracking-wide",
             
                )}
              >
                {dummyProduct.badge}
              </Badge>
            </div>
          )}

          {/* Wishlist - Top Right */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 z-10 bg-white/80 hover:bg-white rounded-full h-9 w-9 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            onClick={(e) => {
              e.preventDefault();
              setIsFavorite(!isFavorite);
            }}
          >
            <Heart 
              className={cn(
                "h-4 w-4 transition-colors",
                isFavorite ? "fill-red-500 stroke-red-500" : "stroke-gray-700"
              )} 
            />
          </Button>

          {/* Quick View - On Hover */}
          {isHovered && (
     
              <div className="absolute bottom-3 right-3 bg-white/80 px-2 py-1 rounded shadow-sm flex items-center gap-1"   onClick={(e) => {
                  e.preventDefault();
                  setShowQuickView(true);
                }}
              >
            <Eye className="size-5 text-gray-500" />
            <span className=" text-gray-600">view</span>
          </div>
          )}

          {/* Rating Badge - Bottom Left */}
          <div className="absolute bottom-3 left-3 bg-white px-1 rounded shadow-sm flex items-center">
            <span className="text-xs ">{dummyProduct.rating}</span>
            <span className="text-yellow-500 text-sm">★</span>
            <span className="text-xs text-gray-500">({dummyProduct.reviews})</span>
          </div>

          {/* View Count - Bottom Right */}
        
        </Link>

        {/* Product Info */}
        <div className="p-4 bg-transparent">
          {/* Product Name */}
          <Link to={`/product/${dummyProduct.id}`}>
            <h3 className=" tracking-wider text-base text-gray-900 uppercase  hover:text-gray-600 transition-colors text-[12px]">
              {dummyProduct.name}
            </h3>
          </Link>

          {/* Description/Category */}
          <p className="text-sm text-gray-600 mt-1 border border-gray-300 rounded px-2 py-0.5 inline-block">
            {dummyProduct.description}
          </p>

          {/* Price */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-sm text-gray-900">
              ₹ {dummyProduct.price.toLocaleString('en-IN')}
            </span>
            {dummyProduct.originalPrice && (
              <>
                <span className="text-sm text-gray-500 line-through">
                  ₹ {dummyProduct.originalPrice.toLocaleString('en-IN')}
                </span>
                <Badge variant="destructive" className="text-xs">
                  {Math.round(((dummyProduct.originalPrice - dummyProduct.price) / dummyProduct.originalPrice) * 100)}% OFF
                </Badge>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Quick View Dialog */}
      <ProductQuickView
        product={dummyProduct}
        open={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
}