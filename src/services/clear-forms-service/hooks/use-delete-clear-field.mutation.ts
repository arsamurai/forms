import { useMutation } from "@tanstack/react-query"

import { showToast } from "@shared/ui/toastify"

import { ClearFormsService } from "../clear-forms-service"

export const useDeleteClearFieldMutation = () => {
  return useMutation({
    mutationFn: ClearFormsService.deleteClearField,
    onSuccess: () => {
      showToast("Поле успешно удалено!", { type: "success" })
    },
  })
}
