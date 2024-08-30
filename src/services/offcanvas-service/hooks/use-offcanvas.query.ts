import { useQuery } from "@tanstack/react-query"

import { OffcanvasService } from "../offcanvas-service"
import { OffcanvasEntity } from "../offcanvas-service.types"
import { offcanvasQueryCacheKey } from "./keys.constants"

export const useOffcanvasQuery = (id: number, stagedOffcanvas?: OffcanvasEntity) => {
  return useQuery({
    queryKey: [offcanvasQueryCacheKey, id],
    queryFn: () => OffcanvasService.getOffcanvas(id),
    initialData: () => {
      if (!stagedOffcanvas) {
        return undefined
      }

      return { data: stagedOffcanvas }
    },
    select: response => {
      return response.data
    },
    enabled: !stagedOffcanvas && !!id,
  })
}
