import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select"

const SortBar = () => (
  <div className="flex justify-end mb-4">
    <Select>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="latest">Latest</SelectItem>
        <SelectItem value="price-low">Price: Low to High</SelectItem>
        <SelectItem value="price-high">Price: High to Low</SelectItem>
        <SelectItem value="discount">Best Discount</SelectItem>
      </SelectContent>
    </Select>
  </div>
)
