import { fabricOptions } from "../category/filterOptions";
import { FilterSection } from "../category/FilterSection";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export const FabricFilter = ({ selectedFabrics, setFilters, filters }) => {
  const handleFabricToggle = (fabricValue, checked) => {
    if (checked) {
      setFilters({
        ...filters,
        fabrics: [...selectedFabrics, fabricValue],
      });
    } else {
      setFilters({
        ...filters,
        fabrics: selectedFabrics.filter((f) => f !== fabricValue),
      });
    }
  };

  return (
    <FilterSection title="Fabric">
      <div className="space-y-2 max-h-60 overflow-y-auto">
        {fabricOptions.map((fabric) => (
          <div key={fabric.value} className="flex items-center space-x-2">
            <Checkbox
              id={fabric.value}
              checked={selectedFabrics.includes(fabric.value)}
              onCheckedChange={(checked) =>
                handleFabricToggle(fabric.value, checked)
              }
            />
            <Label
              htmlFor={fabric.value}
              className="text-sm font-normal cursor-pointer flex-1"
            >
              {fabric.name} ({fabric.count})
            </Label>
          </div>
        ))}
      </div>
    </FilterSection>
  );
};