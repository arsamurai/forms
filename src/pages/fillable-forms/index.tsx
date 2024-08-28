import { useCallback } from "react"

import { useSearchQuery } from "@app/search"

import { ListHeader, ListItem } from "@features/list"

import {
  useDeleteFillableFormMutation,
  useFillableFormsQuery,
} from "@services/fillable-forms-service"

import { ROUTES } from "@shared/constants"
import { Loading } from "@shared/ui/loading"
import { Typography } from "@shared/ui/typography"

const FillableFormsPage = () => {
  const { data, isLoading } = useFillableFormsQuery()
  const deleteFillableForm = useDeleteFillableFormMutation()
  const { searchQuery } = useSearchQuery()
  const searchedForms = data?.length
    ? data.filter(form => form.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  const handleDeleteForm = useCallback(
    (id: number) => {
      deleteFillableForm.mutate(id)
    },
    [deleteFillableForm],
  )

  const fillableFormsView = () => {
    if (isLoading) {
      return <Loading />
    } else if (!searchedForms?.length) {
      return (
        <Typography variant="pageSubtitle" className="text-center">
          Пусто...
        </Typography>
      )
    } else {
      return searchedForms.map(form => (
        <ListItem
          key={form.id}
          entity={form}
          link={ROUTES.FILLABLE_FORMS.path}
          deleteEntity={handleDeleteForm}
        />
      ))
    }
  }

  return (
    <div className="w-full pt-7">
      <ListHeader title="Формы заполняемые" link={ROUTES.FILLABLE_FORMS.path} />
      <div className="space-y-5">{fillableFormsView()}</div>
    </div>
  )
}
export default FillableFormsPage
