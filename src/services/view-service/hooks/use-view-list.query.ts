import { useQuery } from "@tanstack/react-query"

import { ViewService } from "../view-service"
import { viewListQueryCacheKey } from "./keys.constants"

export const useViewListQuery = () => {
  return useQuery({
    queryKey: [viewListQueryCacheKey],
    queryFn: ViewService.getViewList,
    select: response => {
      return response.data
    },
  })
}
