import { useQuery } from "@tanstack/react-query"

import { FillableFormsService } from "../fillable-forms-service"
import { FillableFormEntity } from "../fillable-forms-service.types"
import { fillableFormQueryCacheKey } from "./keys.constants"

export const useFillableFormQuery = (id: number, stagedForm?: FillableFormEntity) => {
  return useQuery({
    queryKey: [fillableFormQueryCacheKey, id],
    queryFn: () => FillableFormsService.getFillableForm(id),
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
