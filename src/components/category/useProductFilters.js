import { useState, useEffect, useMemo } from "react";

export const useProductFilters = (products) => {
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState([0, 50000]);
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
  const [currentPage, setCurrentPage] = useState(1);

  const handleResetFilters = () => {
    setPriceRange([0, 50000]);
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

  // Filter Products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Price
      if (product.price < priceRange[0] || product.price > priceRange[1])
        return false;

      // Color
      if (filters.colors.length > 0 && !filters.colors.includes(product.color))
        return false;

      // Fabric
      if (
        filters.fabrics.length > 0 &&
        !filters.fabrics.includes(product.fabric)
      )
        return false;

      // Occasion
      if (
        filters.occasions.length > 0 &&
        !filters.occasions.includes(product.occasion)
      )
        return false;

      // Discount
      if (filters.discount.length > 0) {
        const discountPercent = product.originalPrice
          ? Math.round(
              ((product.originalPrice - product.price) /
                product.originalPrice) *
                100
            )
          : 0;
        const matchesDiscount = filters.discount.some(
          (d) => discountPercent >= parseInt(d)
        );
        if (!matchesDiscount) return false;
      }

      // Availability
      if (filters.availability.inStock && product.stock <= 0) return false;
      if (filters.availability.outOfStock && product.stock > 0) return false;

      return true;
    });
  }, [products, priceRange, filters]);

  // Sort Products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
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
  }, [filteredProducts, sortBy]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [sortBy, priceRange, filters]);

  return {
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    filters,
    setFilters,
    currentPage,
    setCurrentPage,
    handleResetFilters,
    activeFiltersCount,
    filteredProducts,
    sortedProducts,
  };
};