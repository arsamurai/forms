import { useQuery } from "@tanstack/react-query"

import { ModalsService } from "../modals-service"
import { modalsQueryCacheKey } from "./keys.constants"

export const useModalsQuery = (enabled?: boolean) => {
  return useQuery({
    queryKey: [modalsQueryCacheKey],
    queryFn: ModalsService.getModals,
    select: response => {
      return response.data
    },
    enabled: enabled ?? true,
  })
}
