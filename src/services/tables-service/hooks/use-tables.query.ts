import { useQuery } from "@tanstack/react-query"

import { TablesService } from "../tables-service"
import { tablesQueryCacheKey } from "./keys.constants"

export const useTablesQuery = (available?: boolean) => {
  return useQuery({
    queryKey: [tablesQueryCacheKey],
    queryFn: TablesService.getTables,
    select: response => {
      return response.data
    },
    enabled: available ?? true,
  })
}
