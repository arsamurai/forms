import { useMutation, useQueryClient } from "@tanstack/react-query"

import { showToast } from "@shared/ui/toastify"

import { FillableFormsService } from "../fillable-forms-service"
import { fillableFormQueryCacheKey } from "./keys.constants"

export const useChangeContainersOrderMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: FillableFormsService.changeContainersOrder,
    onSuccess: response => {
      showToast("Порядок блоків успішно змінено!", { type: "success" })
      queryClient.setQueryData([fillableFormQueryCacheKey, response.data.id], response)
    },
  })
}
