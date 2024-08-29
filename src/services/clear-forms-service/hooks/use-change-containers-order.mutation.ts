import { useMutation, useQueryClient } from "@tanstack/react-query"

import { showToast } from "@shared/ui/toastify"

import { ClearFormsService } from "../clear-forms-service"
import { clearFormQueryCacheKey } from "./keys.constants"

export const useChangeContainersOrderMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ClearFormsService.changeContainersOrder,
    onSuccess: response => {
      showToast("Порядок блоков успешно изменено!", { type: "success" })
      queryClient.setQueryData([clearFormQueryCacheKey, response.data.id], response)
    },
  })
}
