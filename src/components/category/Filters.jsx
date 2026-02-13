import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PriceFilter } from "./PriceFilter";
import { ColorFilter } from "./ColorFilter";
import { FabricFilter } from "./FabricFilter";
import { OccasionFilter } from "./OccasionFilter";
import { DiscountFilter } from "./DiscountFilter";
import { AvailabilityFilter } from "./AvailabilityFilter";

export const Filters = ({
  priceRange,
  setPriceRange,
  filters,
  setFilters,
  onReset,
}) => {
  return (
    <div className="space-y-6">
      <PriceFilter priceRange={priceRange} setPriceRange={setPriceRange} />

      <ColorFilter
        selectedColors={filters.colors}
        setFilters={setFilters}
        filters={filters}
      />

      <FabricFilter
        selectedFabrics={filters.fabrics}
        setFilters={setFilters}
        filters={filters}
      />

      <OccasionFilter
        selectedOccasions={filters.occasions}
        setFilters={setFilters}
        filters={filters}
      />

      <DiscountFilter
        selectedDiscounts={filters.discount}
        setFilters={setFilters}
        filters={filters}
      />

      <AvailabilityFilter
        availability={filters.availability}
        setFilters={setFilters}
        filters={filters}
      />

      <Button variant="outline" className="w-full" onClick={onReset}>
        <X className="size-4 mr-2" />
        Reset All Filters
      </Button>
    </div>
  );
};