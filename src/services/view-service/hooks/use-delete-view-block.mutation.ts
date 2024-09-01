import { useMutation } from "@tanstack/react-query"

import { showToast } from "@shared/ui/toastify"

import { ViewService } from "../view-service"

export const useDeleteViewBlockMutation = () => {
  return useMutation({
    mutationFn: ViewService.deleteViewBlock,
    onSuccess: () => {
      showToast("Блок информации успешно удалено!", { type: "success" })
    },
  })
}
