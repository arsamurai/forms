import { ChangeEvent, useEffect } from "react"
import { Link, useSearchParams } from "react-router-dom"

import { useSearchQuery } from "@app/search"

import { ROUTES } from "@shared/constants"
import { Button } from "@shared/ui/buttons"
import { Input } from "@shared/ui/fields"
import { Typography } from "@shared/ui/typography"

import CloseIcon from "@assets/icons/close.svg"
import PlusIcon from "@assets/icons/plus.svg"
import SearchIcon from "@assets/icons/search.svg"

const FillableFormsHeader = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { searchQuery, setSearchQuery } = useSearchQuery()

  const handleSearchQuery = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    if (query) {
      searchParams.set("query", query)
    } else {
      searchParams.delete("query")
    }
    setSearchParams(searchParams)
    setSearchQuery(query)
  }

  useEffect(() => {
    const query = searchParams.get("query")
    if (query) setSearchQuery(query)
  }, [searchParams, setSearchQuery])

  return (
    <div className="mb-14 flex items-center gap-10">
      <Typography variant="pageTitle">Формы заполняемые</Typography>
      <div className="flex-1">
        <Input
          name="search"
          placeholder="Пошук"
          startIcon={<SearchIcon />}
          className="h-12"
          value={searchQuery}
          onChange={handleSearchQuery}
        />
      </div>
      <Button variant="text" endIcon={<PlusIcon />} className="h-[33px] w-fit p-1" asChild>
        <Link to={ROUTES.FILLABLE_FORMS.path + "/create"}>Добавить</Link>
      </Button>
      <Button variant="text" className="w-fit p-1.5" asChild>
        <Link to={ROUTES.ROOT.path}>
          <CloseIcon />
        </Link>
      </Button>
    </div>
  )
}
export default FillableFormsHeader
