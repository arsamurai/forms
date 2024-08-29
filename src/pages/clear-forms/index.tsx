import { useCallback } from "react"

import { useSearchQuery } from "@app/search"

import { ListHeader, ListItem } from "@features/list"

import { useClearFormsQuery, useDeleteClearFormMutation } from "@services/clear-forms-service"

import { ROUTES } from "@shared/constants"
import { Loading } from "@shared/ui/loading"
import { Typography } from "@shared/ui/typography"

const ClearFormsPage = () => {
  const { data, isLoading } = useClearFormsQuery()
  const deleteClearForm = useDeleteClearFormMutation()
  const { searchQuery } = useSearchQuery()
  const searchedForms = data?.length
    ? data.filter(form => form.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  const handleDeleteForm = useCallback(
    (id: number) => {
      deleteClearForm.mutate(id)
    },
    [deleteClearForm],
  )

  const clearFormsView = () => {
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
          link={ROUTES.CLEAR_FORMS.path}
          deleteEntity={handleDeleteForm}
        />
      ))
    }
  }

  return (
    <div className="w-full pt-7">
      <ListHeader title="Формы чистые" link={ROUTES.CLEAR_FORMS.path} />
      <div className="space-y-5">{clearFormsView()}</div>
    </div>
  )
}
export default ClearFormsPage
