import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { showToast } from "@shared/ui/toastify"

import { OffcanvasService } from "../offcanvas-service"
import { OffcanvasEntity } from "../offcanvas-service.types"
import { offcanvasListQueryCacheKey } from "./keys.constants"

export const useDeleteOffcanvasMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: OffcanvasService.deleteOffcanvas,
    onSuccess: (response, id) => {
      showToast("Оффканвас успешно удалено!", { type: "success" })
      queryClient.setQueryData(
        [offcanvasListQueryCacheKey],
        (oldData: AxiosResponse<OffcanvasEntity[]> | undefined) => {
          const newData = oldData?.data.filter(item => item.id !== id)
          return { ...oldData, data: newData }
        },
      )
    },
  })
}
