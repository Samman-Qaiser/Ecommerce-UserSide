import { Slider } from "@/components/ui/slider";
import { FilterSection } from "../category/FilterSection";

export const PriceFilter = ({ priceRange, setPriceRange }) => {
  return (
    <FilterSection title="Price Range">
      <div className="space-y-4">
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={50000}
          step={100}
          className="w-full"
        />
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>₹{priceRange[0]}</span>
          <span>₹{priceRange[1]}</span>
        </div>
      </div>
    </FilterSection>
  );
};