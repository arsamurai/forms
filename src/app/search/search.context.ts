import { createContext, useContext } from "react"

import { SearchContextState } from "./search.types"

export const SearchContext = createContext<SearchContextState>({
  searchQuery: "",
  setSearchQuery: () => null,
})

export const useSearchQuery = () => {
  const context = useContext(SearchContext)

  if (context === undefined) throw new Error("useSearch must be used within a SearchProvider")

  return context
}
