import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { showToast } from "@shared/ui/toastify"

import { ViewService } from "../view-service"
import { ViewEntity } from "../view-service.types"
import { viewListQueryCacheKey } from "./keys.constants"

export const useDeleteViewMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ViewService.deleteView,
    onSuccess: (response, id) => {
      showToast("Информацию на странице успешно удалено!", { type: "success" })
      queryClient.setQueryData(
        [viewListQueryCacheKey],
        (oldData: AxiosResponse<ViewEntity[]> | undefined) => {
          const newData = oldData?.data.filter(item => item.id !== id)
          return { ...oldData, data: newData }
        },
      )
    },
  })
}
