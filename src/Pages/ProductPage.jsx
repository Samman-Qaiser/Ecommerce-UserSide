import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag, Star, Truck, Shield, RefreshCw, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';

export default function ProductPage() {
  const { id } = useParams();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Dummy product data (Firebase se replace hoga)
  const product = {
    id: id || 1,
    name: 'BEET AND TURNIP',
    description: 'Saree with blouse piece',
    category: 'Cotton and Acrylic',
    price: 4200.00,
    originalPrice: null,
    rating: 4.95,
    reviews: 772,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800',
      'https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=800',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=800',
      'https://images.unsplash.com/photo-1606522321798-c51a9b286e0a?w=800',
    ],
    badge: 'TOP RATED',
    stock: 2,
    inStock: true,
    details: {
      fabric: 'Cotton and Acrylic Blend',
      length: '5.5 meters with blouse piece',
      blouseLength: '0.8 meters',
      care: 'Dry clean only',
      color: 'Burgundy and Olive Green',
      pattern: 'Geometric Print',
    },
    features: [
      'Handcrafted with love',
      'Sustainable and eco-friendly',
      'Comfortable for all-day wear',
      'Perfect for festive occasions',
    ],
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-3/4 bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={product.images[currentImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Badge */}
              {product.badge && (
                <Badge className="absolute top-4 left-4 bg-black text-white px-4 py-2 text-sm">
                  {product.badge}
                </Badge>
              )}

              {/* Navigation */}
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full shadow-lg"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full shadow-lg"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}

              {/* Dots */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {product.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      idx === currentImageIndex 
                        ? "w-8 bg-white" 
                        : "w-2 bg-white/60"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Grid */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={cn(
                    "aspect-square rounded-lg overflow-hidden border-2 transition-all",
                    idx === currentImageIndex 
                      ? "border-black" 
                      : "border-gray-200 opacity-70 hover:opacity-100"
                  )}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:sticky lg:top-24 h-fit">
            {/* Category Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="border-gray-400 text-sm px-3 py-1">
                {product.description}
              </Badge>
              <Badge variant="outline" className="border-gray-400 text-sm px-3 py-1">
                {product.category}
              </Badge>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded">
                <span className="text-sm font-semibold text-green-700">{product.rating}</span>
                <Star className="h-4 w-4 fill-green-600 stroke-green-600" />
              </div>
              <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
            </div>

            {/* Product Name */}
            <h1 className="text-3xl lg:text-4xl font-semibold uppercase tracking-wide mb-6">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-semibold">
                  ₹ {product.price.toLocaleString('en-IN')}
                </span>
                {product.badge === 'TOP RATED' && (
                  <Badge className="bg-black text-white px-3 py-1">
                    TOP RATED
                  </Badge>
                )}
              </div>
              <p className="text-sm text-gray-600 mt-2">MRP Inclusive of all taxes</p>
            </div>

            {/* Stock Alert */}
            {product.stock <= 5 && product.inStock && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700 font-medium flex items-center gap-2">
                  <span className="text-lg">⏰</span>
                  Only {product.stock} left in stock – SELLING FAST!
                </p>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-3 border border-gray-300 rounded-lg w-fit">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="h-10 w-10"
                >
                  -
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  className="h-10 w-10"
                >
                  +
                </Button>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Action Buttons */}
            <div className="space-y-3 mb-8">
              <Button 
                className="w-full h-14 text-base font-semibold bg-yellow-500 hover:bg-yellow-600 text-black shadow-md"
                size="lg"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                ADD TO CART
              </Button>

              <Button
                variant="outline"
                className="w-full h-14 text-base font-semibold border-2"
                size="lg"
                onClick={() => setIsFavorite(!isFavorite)}
              >
                <Heart 
                  className={cn(
                    "mr-2 h-5 w-5",
                    isFavorite && "fill-red-500 stroke-red-500"
                  )} 
                />
                {isFavorite ? 'SAVED TO WISHLIST' : 'ADD TO WISHLIST'}
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-gray-700" />
                <p className="text-xs text-gray-600">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-gray-700" />
                <p className="text-xs text-gray-600">Secure Payment</p>
              </div>
              <div className="text-center">
                <RefreshCw className="h-6 w-6 mx-auto mb-2 text-gray-700" />
                <p className="text-xs text-gray-600">Easy Returns</p>
              </div>
            </div>

            {/* Details Accordion */}
            <Accordion type="single" collapsible className="mt-6">
              <AccordionItem value="details">
                <AccordionTrigger className="text-base font-semibold">
                  DETAILS
                  <ChevronDown className="h-5 w-5" />
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-medium text-gray-700">Fabric:</span>
                      <span className="text-gray-600">{product.details.fabric}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-medium text-gray-700">Length:</span>
                      <span className="text-gray-600">{product.details.length}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-medium text-gray-700">Blouse:</span>
                      <span className="text-gray-600">{product.details.blouseLength}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-medium text-gray-700">Color:</span>
                      <span className="text-gray-600">{product.details.color}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <span className="font-medium text-gray-700">Pattern:</span>
                      <span className="text-gray-600">{product.details.pattern}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="care">
                <AccordionTrigger className="text-base font-semibold">
                  CARE INSTRUCTIONS
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-gray-600">{product.details.care}</p>
                  <ul className="mt-3 space-y-1 text-sm text-gray-600 list-disc list-inside">
                    <li>Do not bleach</li>
                    <li>Iron on low heat</li>
                    <li>Store in a cool, dry place</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="features">
                <AccordionTrigger className="text-base font-semibold">
                  FEATURES
                </AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-green-600 mt-0.5">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping">
                <AccordionTrigger className="text-base font-semibold">
                  SHIPPING & RETURNS
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 text-sm text-gray-600">
                    <p>• Free shipping on orders above ₹999</p>
                    <p>• Delivery within 5-7 business days</p>
                    <p>• Easy 7-day return policy</p>
                    <p>• COD available</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

         
          </div>
        </div>
      </div>
    </div>
  );
}