import { useQuery } from "@tanstack/react-query"

import { TablesService } from "../tables-service"
import { TableEntity } from "../tables-service.types"
import { tableQueryCacheKey } from "./keys.constants"

export const useTableQuery = (id: number, stagedTable?: TableEntity) => {
  return useQuery({
    queryKey: [tableQueryCacheKey, id],
    queryFn: () => TablesService.getTable(id),
    initialData: () => {
      if (!stagedTable) {
        return undefined
      }

      return { data: [stagedTable] }
    },
    select: response => {
      return response.data[0]
    },
    enabled: !stagedTable && !!id,
  })
}
