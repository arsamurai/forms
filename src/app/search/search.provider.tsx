import { FC, PropsWithChildren, useState } from "react"

import { SearchContext } from "./search.context"

const SearchProvider: FC<PropsWithChildren> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  )
}

export default SearchProvider
