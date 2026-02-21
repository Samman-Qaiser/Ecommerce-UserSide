import React, { useState, useEffect } from "react";
import {
  SlidersHorizontal,
  X,
  Filter,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Loader2,
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
import { useParams, useSearchParams } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import { cn } from "@/lib/utils";
import { useSubCategoryBySlug } from "../tanstackhooks/useSubCategories";
import { useProductsBySubCategory } from "../tanstackhooks/useProduct";
import { ProductGridSkeleton } from "../components/product/ProductCardSekeleton";

// Color options with actual colors
const colorOptions = [
  { name: "Black", value: "black", color: "#2C2C2C" },
  { name: "Blue", value: "blue", color: "#5B9BD5" },
  { name: "Brown", value: "brown", color: "#A67C6D" },
  { name: "Yellow", value: "yellow", color: "#FFD966" },
  { name: "Green", value: "green", color: "#A9D18E" },
  { name: "Pink", value: "pink", color: "#E67C9F" },
  { name: "Gold", value: "gold", color: "#C5A572" },
  { name: "Orange", value: "orange", color: "#F4B183" },
  { name: "Light Pink", value: "light-pink", color: "#F4CBCF" },
  { name: "Purple", value: "purple", color: "#B565A7" },
  { name: "Peach", value: "peach", color: "#F4A1A1" },
  { name: "Rust", value: "rust", color: "#C76240" },
  { name: "Teal", value: "teal", color: "#5B9A9A" },
  { name: "White", value: "white", color: "#FFFFFF" },
  { name: "Cream", value: "cream", color: "#FFF2CC" },
];

// Fabric options
const fabricOptions = [
  { name: "Cotton", value: "cotton",},
  { name: "Cotton Acrylic", value: "cotton-acrylic",  },
  { name: "Linen Zari", value: "linen-zari",  },
  { name: "Modal", value: "modal",  },
  { name: "Mul Cotton", value: "mul-cotton",  },
  { name: "Viscose Blend", value: "viscose-blend", },
  { name: "Silk", value: "silk", },
  { name: "Georgette", value: "georgette",  },
  { name: "Chiffon", value: "chiffon", },
];

// Occasion options
const occasionOptions = [
  { name: "Casual Wear", value: "casual", count: 2 },
  { name: "Evening Wear", value: "evening", count: 5 },
  { name: "Festive Wear", value: "festive", count: 17 },
  { name: "Wedding Wear", value: "wedding", count: 7 },
  { name: "Party Wear", value: "party", count: 12 },
  { name: "Office Wear", value: "office", count: 4 },
];

// Collapsible Filter Section Component
const FilterSection = ({ title, children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-1  text-left"
      >
        <h3 className=" text-foreground">{title}</h3>
        {isOpen ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {isOpen && <div >{children}</div>}
    </div>
  );
};

// Filters Component
const Filters = ({
  priceRange,
  setPriceRange,
  filters,
  setFilters,
  onReset,
}) => {
  return (
    <div className="space-y-3">
      {/* Price Range Filter */}
      <FilterSection title="Price Range">
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={10000}
            step={100}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </FilterSection>

      {/* Color Filter */}
      <FilterSection title="Colour">
        <div className="grid grid-cols-5 gap-2">
          {colorOptions.map((color) => (
            <button
              key={color.value}
              onClick={() => {
                if (filters.colors.includes(color.value)) {
                  setFilters({
                    ...filters,
                    colors: filters.colors.filter((c) => c !== color.value),
                  });
                } else {
                  setFilters({
                    ...filters,
                    colors: [...filters.colors, color.value],
                  });
                }
              }}
              className={cn(
                "aspect-square rounded-md border-2 transition-all hover:scale-110",
                filters.colors.includes(color.value)
                  ? "border-primary ring-2 ring-primary ring-offset-2"
                  : "border-gray-300",
                color.value === "white" && "border-gray-400",
              )}
              style={{ backgroundColor: color.color }}
              title={color.name}
            />
          ))}
        </div>
      </FilterSection>

      {/* Fabric Filter */}
      <FilterSection title="Fabric">
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {fabricOptions.map((fabric) => (
            <div key={fabric.value} className="flex items-center space-x-2">
              <Checkbox
                id={fabric.value}
                checked={filters.fabrics.includes(fabric.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilters({
                      ...filters,
                      fabrics: [...filters.fabrics, fabric.value],
                    });
                  } else {
                    setFilters({
                      ...filters,
                      fabrics: filters.fabrics.filter(
                        (f) => f !== fabric.value,
                      ),
                    });
                  }
                }}
              />
              <Label
                htmlFor={fabric.value}
                className="text-sm font-normal cursor-pointer flex-1"
              >
                {fabric.name} 
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Occasion Filter */}
      <FilterSection title="Occasion">
        <div className="space-y-2">
          {occasionOptions.map((occasion) => (
            <div key={occasion.value} className="flex items-center space-x-2">
              <Checkbox
                id={occasion.value}
                checked={filters.occasions.includes(occasion.value)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setFilters({
                      ...filters,
                      occasions: [...filters.occasions, occasion.value],
                    });
                  } else {
                    setFilters({
                      ...filters,
                      occasions: filters.occasions.filter(
                        (o) => o !== occasion.value,
                      ),
                    });
                  }
                }}
              />
              <Label
                htmlFor={occasion.value}
                className="text-sm font-normal cursor-pointer flex-1"
              >
                {occasion.name} ({occasion.count})
              </Label>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Discount Filter */}
      <FilterSection title="Discount">
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
      </FilterSection>

      {/* Availability Filter */}
      <FilterSection title="Availability" defaultOpen={false}>
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
      </FilterSection>

      {/* Reset All Button */}
      <Button variant="outline" className="w-full" onClick={onReset}>
        <X className="size-4 mr-2" />
        Reset All Filters
      </Button>
    </div>
  );
};

// Main Category Page Component
const CategoryPage = () => {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get("name");

  // ✅ Backend Integration
  const {
    data: subCategory,
    isLoading: subCatLoading,
    error: subCatError,
  } = useSubCategoryBySlug(slug);

const {
  data: productsData,
  isLoading,
  isFetching,
  error: productsError,
} = useProductsBySubCategory(subCategory?.id, {
  pageSize: 100,
  inStock: null,
  sortBy: "createdAt",
  sortOrder: "desc",
});


  // State
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([200, 10000]);
  const [filters, setFilters] = useState({
    colors: [],
    fabrics: [],
    occasions: [],
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
    setPriceRange([200, 10000]);
    setFilters({
      colors: [],
      fabrics: [],
      occasions: [],
      discount: [],
      availability: {
        inStock: false,
        outOfStock: false,
      },
    });
    setCurrentPage(1);
  };

  const activeFiltersCount =
    filters.colors.length +
    filters.fabrics.length +
    filters.occasions.length +
    filters.discount.length +
    (filters.availability.inStock ? 1 : 0) +
    (filters.availability.outOfStock ? 1 : 0);

  // ✅ Get products array from backend response
  const products = productsData?.products || [];

  // Filter + Sort Logic
  const filteredProducts = products.filter((product) => {
    // Price
    if (product.price < priceRange[0] || product.price > priceRange[1])
      return false;

    // Color Filter
    if (filters.colors.length > 0 && !filters.colors.includes(product.color))
      return false;

    // Fabric Filter
    if (filters.fabrics.length > 0 && !filters.fabrics.includes(product.fabric))
      return false;

    // Occasion Filter
    if (
      filters.occasions.length > 0 &&
      !filters.occasions.includes(product.occasion)
    )
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
        return (b.rating || 0) - (a.rating || 0);
      case "newest":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "popular":
        return (b.reviews || 0) - (a.reviews || 0);
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
  useEffect(() => {
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

  // ✅ Loading State
 if (subCatLoading) {  // Sirf subcategory loading check karo
  return (
    <div className="min-h-screen flex items-center justify-center">
       <img
          src={
         
            "/categorybanner.png"
          }

          className="w-full h-full object-cover object-top"
        />
    </div>
  );
}


  // ✅ Error State
  if (subCatError || !subCategory) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Category Not Found
          </h2>
          <p className="text-gray-600">
            The category you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* ✅ Banner Image from Backend */}
      <div className="relative w-full h-[60vh] xs:h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[90vh] overflow-hidden">
        <img
          src={
             subCategory.banner||subCategory.image||
            "/categorybanner.png"
          }
          alt={subCategory.name}
          className="w-full h-full object-cover object-top"
        />
         <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl text-white md:text-5xl lg:text-6xl font-bold mb-3 drop-shadow-2xl">
              {subCategory.name}
            </h1>
            {subCategory.description && (
              <p className="text-lg text-white md:text-xl  max-w-2xl drop-shadow-lg">
                {subCategory.description}
              </p>
            )}
          </div>
        </div>
      </div>

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
                className="w-[90vw] p-2 sm:w-87.5 overflow-y-auto"
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
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-6 bg-card rounded-xl border border-border p-6 max-h-[calc(100vh-8rem)] overflow-y-auto">
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
           {isLoading && !productsData ? (
    // ✅ Skeleton while loading
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="aspect-3/4 bg-gray-200 rounded-lg mb-3"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  ):
          !isLoading && currentProducts.length === 0
? (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">
                  No products found matching your filters
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={handleResetFilters}
                >
                  Clear All Filters
                </Button>
              </div>
            ) : (
              <>
               {isFetching && (
      <p className="text-xs text-muted-foreground mb-2">
        Updating products...
      </p>
    )}
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
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
