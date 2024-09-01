import { useQuery } from "@tanstack/react-query"

import { ViewService } from "../view-service"
import { ViewEntity } from "../view-service.types"
import { viewQueryCacheKey } from "./keys.constants"

export const useViewQuery = (id: number, stagedView?: ViewEntity) => {
  return useQuery({
    queryKey: [viewQueryCacheKey, id],
    queryFn: () => ViewService.getView(id),
    initialData: () => {
      if (!stagedView) {
        return undefined
      }

      return { data: stagedView }
    },
    select: response => {
      return response.data
    },
    enabled: !stagedView && !!id,
  })
}
