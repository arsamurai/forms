import { useMutation, useQueryClient } from "@tanstack/react-query"

import { showToast } from "@shared/ui/toastify"

import { ViewService } from "../view-service"
import { viewQueryCacheKey } from "./keys.constants"

export const useChangeViewBlocksOrderMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ViewService.changeViewBlocksOrder,
    onSuccess: response => {
      showToast("Порядок блоков успешно изменен!", { type: "success" })
      queryClient.setQueryData([viewQueryCacheKey, response.data.id], response)
    },
  })
}
