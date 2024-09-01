import { useCallback } from "react"

import { useSearchQuery } from "@app/search"

import { ListHeader, ListItem } from "@features/list"

import { useDeleteViewMutation, useViewListQuery } from "@services/view-service"

import { ROUTES } from "@shared/constants"
import { Loading } from "@shared/ui/loading"
import { Typography } from "@shared/ui/typography"

const ViewListPage = () => {
  const { data, isLoading } = useViewListQuery()
  const deleteView = useDeleteViewMutation()
  const { searchQuery } = useSearchQuery()
  const searchedViewList = data?.length
    ? data.filter(view => view.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  const handleDeleteView = useCallback(
    (id: number) => {
      deleteView.mutate(id)
    },
    [deleteView],
  )

  const viewListView = () => {
    if (isLoading) {
      return <Loading />
    } else if (!searchedViewList?.length) {
      return (
        <Typography variant="pageSubtitle" className="text-center">
          Пусто...
        </Typography>
      )
    } else {
      return searchedViewList.map(view => (
        <ListItem
          key={view.id}
          entity={view}
          link={ROUTES.VIEW.path}
          deleteEntity={handleDeleteView}
        />
      ))
    }
  }

  return (
    <div className="w-full pt-7">
      <ListHeader title="Информация на странице" link={ROUTES.VIEW.path} />
      <div className="space-y-5">{viewListView()}</div>
    </div>
  )
}
export default ViewListPage
