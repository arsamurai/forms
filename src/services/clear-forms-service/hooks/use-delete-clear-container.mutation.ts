import { useMutation } from "@tanstack/react-query"

import { showToast } from "@shared/ui/toastify"

import { ClearFormsService } from "../clear-forms-service"

export const useDeleteClearContainerMutation = () => {
  return useMutation({
    mutationFn: ClearFormsService.deleteClearContainer,
    onSuccess: () => {
      showToast("Блок успешно удалено!", { type: "success" })
    },
  })
}
