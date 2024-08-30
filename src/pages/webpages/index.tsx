import { useCallback } from "react"

import { useSearchQuery } from "@app/search"

import { ListHeader, ListItem } from "@features/list"

import { useDeleteWebpageMutation, useWebpagesQuery } from "@services/webpages-service"

import { ROUTES } from "@shared/constants"
import { Loading } from "@shared/ui/loading"
import { Typography } from "@shared/ui/typography"

const WebpagesPage = () => {
  const { data, isLoading } = useWebpagesQuery()
  const deleteWebpage = useDeleteWebpageMutation()
  const { searchQuery } = useSearchQuery()
  const searchedWebpages = data?.length
    ? data.filter(webpage => webpage.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  const handleDeleteWebpage = useCallback(
    (id: number) => {
      deleteWebpage.mutate(id)
    },
    [deleteWebpage],
  )

  const webpagesView = () => {
    if (isLoading) {
      return <Loading />
    } else if (!searchedWebpages?.length) {
      return (
        <Typography variant="pageSubtitle" className="text-center">
          Пусто...
        </Typography>
      )
    } else {
      return searchedWebpages.map(webpage => (
        <ListItem
          key={webpage.id}
          entity={webpage}
          link={ROUTES.WEBPAGES.path}
          deleteEntity={handleDeleteWebpage}
        />
      ))
    }
  }

  return (
    <div className="w-full pt-7">
      <ListHeader title="Страницы" link={ROUTES.WEBPAGES.path} />
      <div className="space-y-5">{webpagesView()}</div>
    </div>
  )
}
export default WebpagesPage
