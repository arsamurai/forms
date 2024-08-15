import { useMutation, useQueryClient } from "@tanstack/react-query"

import { showToast } from "@shared/ui/toastify"

import { FillableFormsService } from "../fillable-forms-service"
import { fillableFormQueryCacheKey } from "./keys.constants"

export const useChangeFieldsOrderMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: FillableFormsService.changeFieldsOrder,
    onSuccess: response => {
      showToast("Порядок полів успішно змінено!", { type: "success" })
      queryClient.setQueryData([fillableFormQueryCacheKey, response.data.id], response)
    },
  })
}
