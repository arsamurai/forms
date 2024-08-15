import { useQuery } from "@tanstack/react-query"

import { FillableFormsService } from "../fillable-forms-service"
import { fillableFormsQueryCacheKey } from "./keys.constants"

export const useFillableFormsQuery = () => {
  return useQuery({
    queryKey: [fillableFormsQueryCacheKey],
    queryFn: FillableFormsService.getFillableForms,
    select: response => {
      return response.data
    },
  })
}
