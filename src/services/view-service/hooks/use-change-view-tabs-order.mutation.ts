import { useMutation, useQueryClient } from "@tanstack/react-query"

import { showToast } from "@shared/ui/toastify"

import { ViewService } from "../view-service"
import { viewQueryCacheKey } from "./keys.constants"

export const useChangeViewTabsOrderMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ViewService.changeViewTabsOrder,
    onSuccess: response => {
      showToast("Порядок табов успешно изменен!", { type: "success" })
      queryClient.setQueryData([viewQueryCacheKey, response.data.id], response)
    },
  })
}
