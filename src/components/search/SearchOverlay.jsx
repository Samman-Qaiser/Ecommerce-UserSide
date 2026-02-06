// src/components/search/SearchOverlay.jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import SearchInput from "./SearchInput"
import { useSearch } from "./useSearch"

export default function SearchOverlay({ open, onClose }) {
  const { query, setQuery, submitSearch } = useSearch()

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl pt-10">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-semibold">
            What are you looking for?
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          <SearchInput
            query={query}
            setQuery={setQuery}
            onSubmit={submitSearch}
          />
        </div>

        {/* Future */}
        {/* <RecentSearches /> */}
      </DialogContent>
    </Dialog>
  )
}
