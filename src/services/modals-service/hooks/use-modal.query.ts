import { useQuery } from "@tanstack/react-query"

import { ModalsService } from "../modals-service"
import { ModalEntity } from "../modals-service.types"
import { modalQueryCacheKey } from "./keys.constants"

export const useModalQuery = (id: number, stagedModal?: ModalEntity) => {
  return useQuery({
    queryKey: [modalQueryCacheKey, id],
    queryFn: () => ModalsService.getModal(id),
    initialData: () => {
      if (!stagedModal) {
        return undefined
      }

      return { data: stagedModal }
    },
    select: response => {
      return response.data
    },
    enabled: !stagedModal && !!id,
  })
}
