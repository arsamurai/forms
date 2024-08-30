import { useCallback } from "react"

import { useSearchQuery } from "@app/search"

import { ListHeader, ListItem } from "@features/list"

import { useDeleteModalMutation, useModalsQuery } from "@services/modals-service"

import { ROUTES } from "@shared/constants"
import { Loading } from "@shared/ui/loading"
import { Typography } from "@shared/ui/typography"

const ModalsPage = () => {
  const { data, isLoading } = useModalsQuery()
  const deleteModal = useDeleteModalMutation()
  const { searchQuery } = useSearchQuery()
  const searchedModals = data?.length
    ? data.filter(modal => modal.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  const handleDeleteModal = useCallback(
    (id: number) => {
      deleteModal.mutate(id)
    },
    [deleteModal],
  )

  const modalsView = () => {
    if (isLoading) {
      return <Loading />
    } else if (!searchedModals?.length) {
      return (
        <Typography variant="pageSubtitle" className="text-center">
          Пусто...
        </Typography>
      )
    } else {
      return searchedModals.map(modal => (
        <ListItem
          key={modal.id}
          entity={modal}
          link={ROUTES.MODALS.path}
          deleteEntity={handleDeleteModal}
        />
      ))
    }
  }

  return (
    <div className="w-full pt-7">
      <ListHeader title="Модальные окна" link={ROUTES.MODALS.path} />
      <div className="space-y-5">{modalsView()}</div>
    </div>
  )
}
export default ModalsPage
