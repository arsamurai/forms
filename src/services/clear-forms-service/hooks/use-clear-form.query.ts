import { useQuery } from "@tanstack/react-query"

import { ClearFormsService } from "../clear-forms-service"
import { ClearFormEntity } from "../clear-forms-service.types"
import { clearFormQueryCacheKey } from "./keys.constants"

export const useClearFormQuery = (id: number, stagedForm?: ClearFormEntity) => {
  return useQuery({
    queryKey: [clearFormQueryCacheKey, id],
    queryFn: () => ClearFormsService.getClearForm(id),
    initialData: () => {
      if (!stagedForm) {
        return undefined
      }

      return { data: stagedForm }
    },
    select: response => {
      return response.data
    },
    enabled: !stagedForm && !!id,
  })
}
