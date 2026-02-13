import { FilterSection } from "./FilterSection";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const AvailabilityFilter = ({ availability, setFilters, filters }) => {
  return (
    <FilterSection title="Availability" defaultOpen={false}>
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="in-stock"
            checked={availability.inStock}
            onCheckedChange={(checked) => {
              setFilters({
                ...filters,
                availability: { ...availability, inStock: checked },
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
            checked={availability.outOfStock}
            onCheckedChange={(checked) => {
              setFilters({
                ...filters,
                availability: { ...availability, outOfStock: checked },
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
  );
};