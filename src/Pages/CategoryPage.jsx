import React, { useState } from "react";
import {
  SlidersHorizontal,
  X,
  Filter,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ProductCard from "../components/product/ProductCard";

// Filters Component
const Filters = ({
  priceRange,
  setPriceRange,
  filters,
  setFilters,
  onReset,
}) => {
  return (
    <div className="space-y-6">
      {/* Price Range Filter */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground">Price Range</h3>
          <button
            onClick={() => setPriceRange([0, 1000])}
            className="text-xs text-primary hover:underline"
          >
            Reset
          </button>
        </div>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={50000}
          step={10}
          className="w-full"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      {/* Discount Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Discount</h3>
        <div className="space-y-2">
          {[
            "10% or more",
            "20% or more",
            "30% or more",
            "40% or more",
            "50% or more",
          ].map((discount) => (
            <div key={discount} className="flex items-center space-x-2">
              <Checkbox
                id={discount}
                checked={filters.discount.includes(discount)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilters({
                      ...filters,
                      discount: [...filters.discount, discount],
                    });
                  } else {
                    setFilters({
                      ...filters,
                      discount: filters.discount.filter((d) => d !== discount),
                    });
                  }
                }}
              />
              <Label
                htmlFor={discount}
                className="text-sm font-normal cursor-pointer"
              >
                {discount}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Availability Filter */}
      <div className="space-y-3">
        <h3 className="font-semibold text-foreground">Availability</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="in-stock"
              checked={filters.availability.inStock}
              onCheckedChange={(checked) => {
                setFilters({
                  ...filters,
                  availability: { ...filters.availability, inStock: checked },
                });
              }}
            />
            <Label
              htmlFor="in-stock"
              className="text-sm font-normal cursor-pointer"
            >
              In Stock
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="out-of-stock"
              checked={filters.availability.outOfStock}
              onCheckedChange={(checked) => {
                setFilters({
                  ...filters,
                  availability: {
                    ...filters.availability,
                    outOfStock: checked,
                  },
                });
              }}
            />
            <Label
              htmlFor="out-of-stock"
              className="text-sm font-normal cursor-pointer"
            >
              Out of Stock
            </Label>
          </div>
        </div>
      </div>

      {/* Reset All Button */}
      <Button variant="outline" className="w-full" onClick={onReset}>
        Reset All Filters
      </Button>
    </div>
  );
};

// Main Category Page Component
const CategoryPage = ({
  categoryData = {
    name: "Silk Saree",
    bannerImage: "./web-banner02.jpg",
    description: "Explore our wide range of electronic products",
  },
  products = [
    {
      id: 11,
      name: "REGAL BLUE",
      description: "Designer Blouse",
      category: "Silk",
      price: 1800,
      badge: "NEW",
      rating: 4.8,
      reviews: 234,
      stock: 10,
      image:
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500",
      images: [
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500",
      ],
    },
    {
      id: 12,
      name: "CLASSIC CRIMSON",
      description: "Embroidered Blouse",
      category: "Cotton",
      price: 1200,
      badge: "BEST SELLER",
      rating: 5.0,
      reviews: 567,
      stock: 5,
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
      ],
    },
    {
      id: 13,
      name: "GOLDEN TOUCH",
      description: "Silk Blouse",
      category: "Silk",
      price: 2200,
      badge: "TOP RATED",
      rating: 4.9,
      reviews: 423,
      stock: 8,
      image:
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500",
      images: [
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500",
      ],
    },
    {
      id: 14,
      name: "PEARL ELEGANCE",
      description: "Designer Blouse",
      category: "Cotton",
      price: 1500,
      badge: "NEW",
      rating: 4.85,
      reviews: 312,
      stock: 12,
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
      ],
    },
    {
      id: 15,
      name: "VELVET DREAM",
      description: "Velvet Blouse",
      category: "Velvet",
      price: 2800,
      badge: "BEST SELLER",
      rating: 5.0,
      reviews: 678,
      stock: 4,
      image:
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500",
      images: [
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500",
      ],
    },
    {
      id: 16,
      name: "FLORAL FANTASY",
      description: "Printed Blouse",
      category: "Cotton",
      price: 1100,
      badge: "SALE",
      originalPrice: 1500,
      rating: 4.7,
      reviews: 189,
      stock: 20,
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
      ],
    },
    {
      id: 17,
      name: "MIRROR WORK MAGIC",
      description: "Embroidered Blouse",
      category: "Silk",
      price: 2500,
      badge: "TOP RATED",
      rating: 4.95,
      reviews: 445,
      stock: 6,
      image:
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500",
      images: [
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=500",
      ],
    },
    {
      id: 18,
      name: "CONTEMPORARY CHIC",
      description: "Modern Blouse",
      category: "Cotton",
      price: 1350,
      badge: "NEW",
      rating: 4.8,
      reviews: 267,
      stock: 15,
      image:
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
      images: [
        "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500",
      ],
    },
    {
      id: 1,
      name: "Royal Silk Lehenga",
      description: "Heavy Embroidered",
      category: "Bridal Collection",
      price: 15999,
      originalPrice: 24999,
      rating: 4.8,
      reviews: 234,
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500",
      images: [
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500",
        "https://images.unsplash.com/photo-1583391733956-6c78276477e5?w=500",
      ],
      badge: "BEST SELLER",
      stock: 5,
      inStock: true,
    },
    {
      id: 2,
      name: "Designer Lehenga Set",
      description: "Mirror Work",
      category: "Wedding Special",
      price: 12499,
      originalPrice: 18999,
      rating: 4.9,
      reviews: 456,
      image: "./suits.webp",
      badge: "TOP RATED",
      stock: 3,
      inStock: true,
    },
    {
      id: 3,
      name: "Embellished Lehenga",
      description: "Stone Work",
      category: "Festive Wear",
      price: 9999,
      originalPrice: 14999,
      rating: 4.7,
      reviews: 189,
      image:
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500",
      badge: "NEW",
      stock: 8,
      inStock: true,
    },
    {
      id: 4,
      name: "Traditional Lehenga",
      description: "Zari Work",
      category: "Classic Collection",
      price: 11999,
      originalPrice: 16999,
      rating: 4.6,
      reviews: 167,
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500",
      badge: "SALE",
      stock: 6,
      inStock: true,
    },
    {
      id: 5,
      name: "Silk Saree Premium",
      description: "Pure Banarasi",
      category: "Silk Collection",
      price: 7999,
      originalPrice: 12999,
      rating: 4.9,
      reviews: 567,
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500",
      badge: "TOP RATED",
      stock: 4,
      inStock: true,
    },
    {
      id: 6,
      name: "Designer Saree",
      description: "Printed Georgette",
      category: "Modern Fusion",
      price: 3999,
      originalPrice: 6999,
      rating: 4.7,
      reviews: 234,
      image: "./silk saree.webp",
      badge: "BEST SELLER",
      stock: 12,
      inStock: true,
    },
    {
      id: 7,
      name: "Embroidered Saree",
      description: "Heavy Border",
      category: "Wedding Collection",
      price: 5999,
      originalPrice: 8999,
      rating: 4.8,
      reviews: 345,
      image:
        "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=500",
      badge: "NEW",
      stock: 7,
      inStock: true,
    },
    {
      id: 8,
      name: "Cotton Silk Saree",
      description: "Lightweight",
      category: "Casual Wear",
      price: 2999,
      originalPrice: 4999,
      rating: 4.5,
      reviews: 123,
      image:
        "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500",
      badge: "SALE",
      stock: 15,
      inStock: true,
    },
  ],
}) => {
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [filters, setFilters] = useState({
    discount: [],
    availability: {
      inStock: false,
      outOfStock: false,
    },
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const handleResetFilters = () => {
    setPriceRange([0, 50000]);
    setFilters({
      discount: [],
      availability: {
        inStock: false,
        outOfStock: false,
      },
    });
    setCurrentPage(1);
  };

  const activeFiltersCount =
    filters.discount.length +
    (filters.availability.inStock ? 1 : 0) +
    (filters.availability.outOfStock ? 1 : 0);

  // ------------------------------
  // Derived Products: Filter + Sort
  // ------------------------------
  const filteredProducts = products.filter((product) => {
    // Price
    if (product.price < priceRange[0] || product.price > priceRange[1])
      return false;

    // Discount
    if (filters.discount.length > 0) {
      const discountPercent = product.originalPrice
        ? Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) *
              100,
          )
        : 0;
      const matchesDiscount = filters.discount.some(
        (d) => discountPercent >= parseInt(d),
      );
      if (!matchesDiscount) return false;
    }

    // Availability
    if (filters.availability.inStock && product.stock <= 0) return false;
    if (filters.availability.outOfStock && product.stock > 0) return false;

    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      case "popular":
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = sortedProducts.slice(startIndex, endIndex);

  // Reset to page 1 when filters or sort changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, priceRange, filters]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // ------------------------------
  return (
    <div className="min-h-screen bg-background">
      {/* Banner Image */}
      {categoryData.bannerImage && (
        <div className="relative w-full h-[60vh] xs:h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[90vh] overflow-hidden">
          <img
            src={categoryData.bannerImage}
            alt={categoryData.name}
            className="w-full h-full object-cover"
          />
          
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-2xl">
                {categoryData.name}
              </h1>
              {categoryData.description && (
                <p className="text-lg md:text-xl text-white/90 max-w-2xl drop-shadow-lg">
                  {categoryData.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sort Bar & Mobile Filter Button */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Showing{" "}
              <span className="font-semibold text-foreground">
                {sortedProducts.length}
              </span>{" "}
              products
            </p>
            {activeFiltersCount > 0 && (
              <div className="hidden lg:flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">|</span>
                <span className="text-primary font-medium">
                  {activeFiltersCount} filters active
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetFilters}
                  className="h-7 px-2"
                >
                  <X className="size-3 mr-1" />
                  Clear
                </Button>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile Filter Button */}
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden relative"
                >
                  <Filter className="size-4 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-75 sm:w-87.5 overflow-y-auto"
              >
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>
                    Refine your search results
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <Filters
                    priceRange={priceRange}
                    setPriceRange={setPriceRange}
                    filters={filters}
                    setFilters={setFilters}
                    onReset={handleResetFilters}
                  />
                </div>
              </SheetContent>
            </Sheet>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-muted-foreground hidden sm:block" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 sm:w-45">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Filters & Products Grid */}
        <div className="flex gap-8">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-6 bg-card rounded-xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Filter className="size-5" />
                  Filters
                </h2>
              </div>
              <Filters
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                filters={filters}
                setFilters={setFilters}
                onReset={handleResetFilters}
              />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {currentProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">
                  No products found
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {currentProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    {/* Previous Button */}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="h-9 w-9"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {/* Page Numbers */}
                    {getPageNumbers().map((page, index) =>
                      page === "..." ? (
                        <span
                          key={`ellipsis-${index}`}
                          className="px-2 text-muted-foreground"
                        >
                          ...
                        </span>
                      ) : (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="icon"
                          onClick={() => handlePageChange(page)}
                          className="h-9 w-9"
                        >
                          {page}
                        </Button>
                      ),
                    )}

                    {/* Next Button */}
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="h-9 w-9"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
