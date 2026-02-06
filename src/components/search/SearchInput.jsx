// src/components/search/SearchInput.jsx
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function SearchInput({ query, setQuery, onSubmit }) {
  return (
    <div className="flex items-center gap-2 border rounded-full px-4 py-2">
      <Search className="text-gray-400 size-4" />
      
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search sarees, kurtas, collections..."
        className="border-0 focus-visible:ring-0"
      />

      <Button
        size="sm"
        onClick={onSubmit}
        className="rounded-full"
      >
        Search
      </Button>
    </div>
  )
}
