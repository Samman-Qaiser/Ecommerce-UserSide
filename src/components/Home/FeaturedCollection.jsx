// components/FeaturedCollection.jsx
import React from "react";
import { 
  ArrowRight, 
  Sparkles, 
  TrendingUp, 
  Star,
 
  Crown,
  Gem,
 
  Award,
  Palette,
  Flower,
  CircleDot
} from "lucide-react";
import AnimatedButton from "../ui/AnimmatedButton";
import { Link } from "react-router-dom";
import { useFeaturedSubCategories } from "../../tanstackhooks/useSubCategories";

const FeaturedCollection = () => {
  const { data: featuredSubCategories, isLoading } = useFeaturedSubCategories();

  // Fallback static data for skeleton/loading
  const placeholderCollections = [
    {
      id: "p1",
      name: "Kora Silk",
      slug: "kora-silk",
      subtitle: "Hot Trending",
      itemCount: 124,
      image: "formal-wear.jfif",
      size: "large",
      icon: TrendingUp,
      isPlaceholder: true,
    },
    {
      id: "p2",
      name: "Festive Wear",
      slug: "festive-wear",
      subtitle: "Cozy Vibes",
      itemCount: 89,
      image: "festive-wear.jfif",
      size: "small",
      icon: Sparkles,
      isPlaceholder: true,
    },
    {
      id: "p3",
      name: "Silk Saree",
      slug: "silk-saree",
      subtitle: "Complete Look",
      itemCount: 156,
      image: "./silk saree.webp",
      size: "small",
      icon: Star,
      isPlaceholder: true,
    },
    {
      id: "p4",
      name: "Traditional Wear",
      slug: "traditional-wear",
      subtitle: "Active Lifestyle",
      itemCount: 67,
      image: "traditional-wear.jfif",
      size: "large",
      icon: TrendingUp,
      isPlaceholder: true,
    },
    {
      id: "p5",
      name: "Office Wear",
      slug: "office-wear",
      subtitle: "Business Ready",
      itemCount: 93,
      image: "./Work-Sarees.jpg",
      size: "small",
      icon: Star,
      isPlaceholder: true,
    },
    {
      id: "p6",
      name: "Fancy Saree",
      slug: "fancy-saree",
      subtitle: "Must Have",
      itemCount: 201,
      image: "./fancy-saree.jfif",
      size: "small",
      icon: Sparkles,
      isPlaceholder: true,
    },
  ];

  // Helper: Get fallback image based on subcategory name
  function getFallbackImage(name, slug) {
    const nameLower = (name || '').toLowerCase();
    
    // Silk varieties
    if (nameLower.includes('kora') || nameLower.includes('organza')) return 'formal-wear.jfif';
    if (nameLower.includes('banarsi') || nameLower.includes('banaras')) return './Banarasi Saree.jfif';
    if (nameLower.includes('chiffon')) return './chiffon saree.jfif';
    if (nameLower.includes('linen')) return './linen.png';
    if (nameLower.includes('katan')) return './katan.jfif';
    if (nameLower.includes('raw silk')) return './silk saree.webp';
    if (nameLower.includes('kanjivaram') || nameLower.includes('kanjeevaram')) return './kanjivaram.jfif';
    
    // Default fallback
    return './silk saree.webp';
  }

  // Helper: Get icon based on subcategory name/slug
  function getIconBySubcategory(name, slug) {
    const nameLower = (name || '').toLowerCase();
    
    // Silk varieties
    if (nameLower.includes('kora') || nameLower.includes('organza')) return Gem;
    if (nameLower.includes('banarsi') || nameLower.includes('banaras')) return Crown;
    if (nameLower.includes('katan')) return Award;
    if (nameLower.includes('matka')) return CircleDot;
    if (nameLower.includes('tussar')) return Flower;
    if (nameLower.includes('raw silk')) return Palette;
    if (nameLower.includes('kanjivaram') || nameLower.includes('kanjeevaram')) return Star;
    
    return Sparkles;
  }

  // Helper: Determine if subcategory should be large
  function shouldBeLarge(name) {
    const nameLower = (name || '').toLowerCase();
    
    // Only Kora/Organza and Banarsi should be large
    if (nameLower.includes('kora') || nameLower.includes('organza')) return true;
    if (nameLower.includes('banarsi') || nameLower.includes('banaras')) return true;
    
    return false;
  }

  // Map Firebase data to component structure - LIMIT TO 6 ITEMS
  const collections = (featuredSubCategories?.slice(0, 6).map((subCat, index) => ({
    id: subCat.id,
    name: subCat.name,
    slug: subCat.slug,
    subtitle: subCat.subtitle || "Popular Choice",
    itemCount: subCat.productCount || 10,
    image: subCat.banner || subCat.image || getFallbackImage(subCat.name, subCat.slug),
    size: subCat.gridSize 
      ? subCat.gridSize 
      : shouldBeLarge(subCat.name) 
        ? 'large' 
        : 'small',
    icon: getIconBySubcategory(subCat.name, subCat.slug),
    categorySlug: subCat.categorySlug,
  }))) || placeholderCollections;

  // ⭐ Reorder collections: L-S-S | S-S-L pattern
  const reorderedCollections = (() => {
    const largeCards = collections.filter(c => c.size === 'large');
    const smallCards = collections.filter(c => c.size === 'small');
    
    // Pattern: L-S-S | S-S-L
    // Position 0: First large (left in row 1)
    // Position 1-2: First two smalls
    // Position 3-4: Next two smalls  
    // Position 5: Second large (right in row 2)
    
    const result = [];
    
    if (largeCards.length >= 1) result[0] = largeCards[0]; // First large at position 0
    if (smallCards.length >= 1) result[1] = smallCards[0];
    if (smallCards.length >= 2) result[2] = smallCards[1];
    if (smallCards.length >= 3) result[3] = smallCards[2];
    if (smallCards.length >= 4) result[4] = smallCards[3];
    if (largeCards.length >= 2) result[5] = largeCards[1]; // Second large at position 5
    
    // Fill any remaining positions with leftover cards
    let resultIndex = 6;
    const usedCards = new Set([
      largeCards[0]?.id, 
      largeCards[1]?.id,
      smallCards[0]?.id,
      smallCards[1]?.id,
      smallCards[2]?.id,
      smallCards[3]?.id,
    ]);
    
    collections.forEach(card => {
      if (!usedCards.has(card.id) && resultIndex < 6) {
        result[resultIndex] = card;
        resultIndex++;
      }
    });
    
    return result.filter(Boolean);
  })();

  // Bento grid size classes
  const sizeClasses = {
    small: "col-span-1 row-span-1 h-74 sm:h-80",
    medium: "col-span-1 sm:col-span-1 row-span-1 h-74 sm:h-80",
    large: "col-span-1 sm:col-span-2 row-span-1 h-64 sm:h-72 lg:h-80",
  };

  return (
    <section className="pb-5 lg:w-[90vw] lg:m-auto  mt-10 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mb-5 mt-10 mx-auto">
        {/* Section Header */}
        <div className=" mb-10 sm:mb-12 lg:mb-16 relative  flex flex-col items-center lg:items-start">
          <div className="inline-flex items-center gap-2 bg-[#F5E6D3] px-4 py-2 rounded-full mb-4">
            <Sparkles className="w-4 h-4 text-[#A07B50]" />
            <span className="text-sm font-semibold text-[#A07B50]">
              Curated Just For You
            </span>
          </div>
          <h2 className="text-3xl ml-5 bg-white sm:text-4xl lg:text-5xl tracking-wide text-gray-900 mb-3 sm:mb-4">
            Featured Categories
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl text-center lg:text-left ">
            Explore our handpicked collections designed to elevate your style
          </p>
             <span className='absolute lg:inline hidden -left-2 -z-1 top-[55%] w-full h-0.5 bg-gray-400'></span>
        </div>

        {/* Bento Grid - 2 Rows Only */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {reorderedCollections.map((collection, index) => {
            const Icon = collection.icon;
            const isClickable = !collection.isPlaceholder;

            return (
              <div
                key={collection.id}
                className={`group relative overflow-hidden rounded-md shadow-lg hover:shadow-2xl transition-all duration-500 ${
                  isClickable ? "cursor-pointer" : "cursor-default"
                } ${sizeClasses[collection.size]}`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                {isClickable ? (
                  <Link
                    to={`/category/${collection.categorySlug || collection.slug}?name=${encodeURIComponent(
                      collection.name
                    )}`}
                  >
                    <CollectionCard collection={collection} Icon={Icon} />
                  </Link>
                ) : (
                  <div className="pointer-events-none">
                    <CollectionCard collection={collection} Icon={Icon} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
      
      <AnimatedButton
        label="Discover All Collections"
        align="center"
        to="/allcategories"
        className="mt-5"
      />
    </section>
  );
};

// Separate Card Component for reusability
const CollectionCard = ({ collection, Icon }) => {
  return (
    <>
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={collection.image}
          alt={collection.name}
          className="w-full h-full object-top object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-black/40 to-black/60 opacity-10 group-hover:opacity-80 transition-opacity duration-500"></div>

        {/* Noise Texture Effect */}
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-between p-6 sm:p-8 text-white">
        {/* Top Section */}
        <div className="flex items-start justify-between">
          <div className="bg-white/20 backdrop-blur-md rounded-full p-3 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>

          {collection.itemCount > 0 && (
            <div className="bg-white/90 text-gray-900 px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
              {collection.itemCount}+
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="space-y-3">
          <div>
            {collection.subtitle && (
              <p className="text-xs sm:text-sm font-medium opacity-90 mb-1">
                {collection.subtitle}
              </p>
            )}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold drop-shadow-lg leading-tight">
              {collection.name}
            </h3>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
            <button className="bg-white text-gray-900 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 hover:bg-gray-100 transition-colors shadow-lg">
              Explore
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Shine Effect on Hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
      </div>

      {/* Border Glow Effect */}
      <div className="absolute inset-0 rounded-md border-2 border-white/0 group-hover:border-white/30 transition-all duration-500"></div>
    </>
  );
};

export default FeaturedCollection;