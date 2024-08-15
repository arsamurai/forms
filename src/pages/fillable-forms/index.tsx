import { useSearchQuery } from "@app/search"

import { useFillableFormsQuery } from "@services/fillable-forms-service"

import { Loading } from "@shared/ui/loading"
import { Typography } from "@shared/ui/typography"

import FillableFormsHeader from "./components/fillable-forms-header"
import FillableFormsItem from "./components/fillable-forms-item"

const FillableFormsPage = () => {
  const { data, isLoading } = useFillableFormsQuery()
  const { searchQuery } = useSearchQuery()
  const searchedForms = data?.length
    ? data.filter(form => form.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  const fillableFormsView = () => {
    if (isLoading) {
      return <Loading />
    } else if (!searchedForms?.length) {
      return (
        <Typography variant="containerTitle" className="text-center">
          Пусто...
        </Typography>
      )
    } else {
      return searchedForms.map(form => <FillableFormsItem key={form.id} {...form} />)
    }
  }

  return (
    <div className="w-full pt-7">
      <FillableFormsHeader />
      <div className="space-y-5">{fillableFormsView()}</div>
    </div>
  )
}
export default FillableFormsPage
