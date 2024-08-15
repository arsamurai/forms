import { useMutation } from "@tanstack/react-query"

import { showToast } from "@shared/ui/toastify"

import { FillableFormsService } from "../fillable-forms-service"

export const useDeleteFillableFieldMutation = () => {
  return useMutation({
    mutationFn: FillableFormsService.deleteFillableField,
    onSuccess: () => {
      showToast("Поле успішно видалено!", { type: "success" })
    },
  })
}
