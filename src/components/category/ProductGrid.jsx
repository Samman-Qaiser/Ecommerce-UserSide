import { Button } from "@/components/ui/button";
import ProductCard from "../product/ProductCard";

export const ProductGrid = ({ products, onResetFilters }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-lg text-muted-foreground mb-4">
          No products found matching your filters
        </p>
        <Button variant="outline" onClick={onResetFilters}>
          Clear All Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};