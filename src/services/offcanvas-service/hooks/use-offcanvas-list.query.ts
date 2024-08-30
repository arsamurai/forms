import { useQuery } from "@tanstack/react-query"

import { OffcanvasService } from "../offcanvas-service"
import { offcanvasListQueryCacheKey } from "./keys.constants"

export const useOffcanvasListQuery = () => {
  return useQuery({
    queryKey: [offcanvasListQueryCacheKey],
    queryFn: OffcanvasService.getOffcanvasList,
    select: response => {
      return response.data
    },
  })
}
