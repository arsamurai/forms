import { useQuery } from "@tanstack/react-query"

import { FillableFormsService } from "../fillable-forms-service"
import { fillableFormsQueryCacheKey } from "./keys.constants"

export const useFillableFormsQuery = (enabled?: boolean) => {
  return useQuery({
    queryKey: [fillableFormsQueryCacheKey],
    queryFn: FillableFormsService.getFillableForms,
    select: response => {
      return response.data
    },
    enabled: enabled ?? true,
  })
}
