// src/hooks/useSearch.js
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export function useSearch() {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  const submitSearch = () => {
    if (!query.trim()) return
    navigate(`/search?q=${query}`)
    setQuery("")
  }

  return {
    query,
    setQuery,
    submitSearch
  }
}
