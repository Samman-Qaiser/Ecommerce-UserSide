import { discountOptions } from "../category/filterOptions";
import { FilterSection } from "./FilterSection";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const DiscountFilter = ({ selectedDiscounts, setFilters, filters }) => {
  const handleDiscountToggle = (discount, checked) => {
    if (checked) {
      setFilters({
        ...filters,
        discount: [...selectedDiscounts, discount],
      });
    } else {
      setFilters({
        ...filters,
        discount: selectedDiscounts.filter((d) => d !== discount),
      });
    }
  };

  return (
    <FilterSection title="Discount">
      <div className="space-y-2">
        {discountOptions.map((discount) => (
          <div key={discount} className="flex items-center space-x-2">
            <Checkbox
              id={discount}
              checked={selectedDiscounts.includes(discount)}
              onCheckedChange={(checked) =>
                handleDiscountToggle(discount, checked)
              }
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
  );
};