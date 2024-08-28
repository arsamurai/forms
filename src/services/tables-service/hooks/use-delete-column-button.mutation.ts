import { useMutation } from "@tanstack/react-query"

import { showToast } from "@shared/ui/toastify"

import { TablesService } from "../tables-service"

export const useDeleteColumnButtonMutation = () => {
  return useMutation({
    mutationFn: TablesService.deleteColumnButton,
    onSuccess: () => {
      showToast("Кнопку колонки успешно удалено!", { type: "success" })
    },
  })
}
