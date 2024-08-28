import { useMutation } from "@tanstack/react-query"

import { showToast } from "@shared/ui/toastify"

import { FillableFormsService } from "../fillable-forms-service"

export const useDeleteFillableContainerMutation = () => {
  return useMutation({
    mutationFn: FillableFormsService.deleteFillableContainer,
    onSuccess: () => {
      showToast("Блок успешно удалено!", { type: "success" })
    },
  })
}
