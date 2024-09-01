import { useMutation } from "@tanstack/react-query"

import { showToast } from "@shared/ui/toastify"

import { ViewService } from "../view-service"

export const useDeleteViewTabMutation = () => {
  return useMutation({
    mutationFn: ViewService.deleteViewTab,
    onSuccess: () => {
      showToast("Таб информации успешно удалено!", { type: "success" })
    },
  })
}
