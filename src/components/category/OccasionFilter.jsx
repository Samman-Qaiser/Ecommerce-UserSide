import { occasionOptions } from "../category/filterOptions";
import { FilterSection } from "./FilterSection";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const OccasionFilter = ({ selectedOccasions, setFilters, filters }) => {
  const handleOccasionToggle = (occasionValue, checked) => {
    if (checked) {
      setFilters({
        ...filters,
        occasions: [...selectedOccasions, occasionValue],
      });
    } else {
      setFilters({
        ...filters,
        occasions: selectedOccasions.filter((o) => o !== occasionValue),
      });
    }
  };

  return (
    <FilterSection title="Occasion">
      <div className="space-y-2">
        {occasionOptions.map((occasion) => (
          <div key={occasion.value} className="flex items-center space-x-2">
            <Checkbox
              id={occasion.value}
              checked={selectedOccasions.includes(occasion.value)}
              onCheckedChange={(checked) =>
                handleOccasionToggle(occasion.value, checked)
              }
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
  );
};