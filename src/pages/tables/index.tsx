import { useCallback } from "react"

import { useSearchQuery } from "@app/search"

import { ListHeader, ListItem } from "@features/list"

import { useDeleteTableMutation, useTablesQuery } from "@services/tables-service"

import { ROUTES } from "@shared/constants"
import { Loading } from "@shared/ui/loading"
import { Typography } from "@shared/ui/typography"

const TablesPage = () => {
  const { data, isLoading } = useTablesQuery()
  const deleteTable = useDeleteTableMutation()
  const { searchQuery } = useSearchQuery()
  const searchedTables = data?.length
    ? data.filter(table => table.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : []

  const handleDeleteTable = useCallback(
    (id: number) => {
      deleteTable.mutate(id)
    },
    [deleteTable],
  )

  const tablesView = () => {
    if (isLoading) {
      return <Loading />
    } else if (!searchedTables?.length) {
      return (
        <Typography variant="pageSubtitle" className="text-center">
          Пусто...
        </Typography>
      )
    } else {
      return searchedTables.map(table => (
        <ListItem
          key={table.id}
          entity={table}
          link={ROUTES.TABLES.path}
          deleteEntity={handleDeleteTable}
        />
      ))
    }
  }

  return (
    <div className="w-full pt-7">
      <ListHeader title="Таблицы" link={ROUTES.TABLES.path} />
      <div className="space-y-5">{tablesView()}</div>
    </div>
  )
}
export default TablesPage
