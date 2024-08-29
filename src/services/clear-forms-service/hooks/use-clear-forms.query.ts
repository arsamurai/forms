import { useQuery } from "@tanstack/react-query"

import { ClearFormsService } from "../clear-forms-service"
import { clearFormsQueryCacheKey } from "./keys.constants"

export const useClearFormsQuery = () => {
  return useQuery({
    queryKey: [clearFormsQueryCacheKey],
    queryFn: ClearFormsService.getClearForms,
    select: response => {
      return response.data
    },
  })
}
