import { useCallback } from "react"

import { useSearchQuery } from "@app/search"

import { ListHeader, ListItem } from "@features/list"

import { useDeleteOffcanvasMutation, useOffcanvasListQuery } from "@services/offcanvas-service"

import { ROUTES } from "@shared/constants"
import { Loading } from "@shared/ui/loading"
import { Typography } from "@shared/ui/typography"

const OffcanvasPage = () => {
  const { data, isLoading } = useOffcanvasListQuery()
  const deleteOffcanvas = useDeleteOffcanvasMutation()
  const { searchQuery } = useSearchQuery()
  const searchedOffcanvass = data?.length
    ? data.filter(offcanvas => offcanvas.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  const handleDeleteOffcanvas = useCallback(
    (id: number) => {
      deleteOffcanvas.mutate(id)
    },
    [deleteOffcanvas],
  )

  const offcanvassView = () => {
    if (isLoading) {
      return <Loading />
    } else if (!searchedOffcanvass?.length) {
      return (
        <Typography variant="pageSubtitle" className="text-center">
          Пусто...
        </Typography>
      )
    } else {
      return searchedOffcanvass.map(offcanvas => (
        <ListItem
          key={offcanvas.id}
          entity={offcanvas}
          link={ROUTES.OFFCANVAS.path}
          deleteEntity={handleDeleteOffcanvas}
        />
      ))
    }
  }

  return (
    <div className="w-full pt-7">
      <ListHeader title="Оффканвас" link={ROUTES.OFFCANVAS.path} />
      <div className="space-y-5">{offcanvassView()}</div>
    </div>
  )
}
export default OffcanvasPage
