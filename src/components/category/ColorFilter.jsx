import { colorOptions } from "../category/filterOptions";
import { FilterSection } from "../category/FilterSection";
import { cn } from "@/lib/utils";

export const ColorFilter = ({ selectedColors, setFilters, filters }) => {
  const handleColorToggle = (colorValue) => {
    if (selectedColors.includes(colorValue)) {
      setFilters({
        ...filters,
        colors: selectedColors.filter((c) => c !== colorValue),
      });
    } else {
      setFilters({
        ...filters,
        colors: [...selectedColors, colorValue],
      });
    }
  };

  return (
    <FilterSection title="Colour">
      <div className="grid grid-cols-5 gap-2">
        {colorOptions.map((color) => (
          <button
            key={color.value}
            onClick={() => handleColorToggle(color.value)}
            className={cn(
              "aspect-square rounded-md border-2 transition-all hover:scale-110",
              selectedColors.includes(color.value)
                ? "border-primary ring-2 ring-primary ring-offset-2"
                : "border-gray-300",
              color.value === "white" && "border-gray-400"
            )}
            style={{ backgroundColor: color.color }}
            title={color.name}
          />
        ))}
      </div>
    </FilterSection>
  );
};