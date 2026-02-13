import { SlidersHorizontal, Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sortOptions } from "../category/filterOptions";

export const CategoryHeader = ({
  productsCount,
  activeFiltersCount,
  handleResetFilters,
  sortBy,
  setSortBy,
  mobileFiltersOpen,
  setMobileFiltersOpen,
  FilterComponent,
}) => {
  return (
    <div className="flex items-center justify-between gap-4 mb-6">
      <div className="flex items-center gap-4">
        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">{productsCount}</span>{" "}
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
            <Button variant="outline" size="sm" className="lg:hidden relative">
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
            className="w-75 sm:w-87.5 overflow-y-auto"
          >
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>Refine your search results</SheetDescription>
            </SheetHeader>
            <div className="mt-6">{FilterComponent}</div>
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
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};