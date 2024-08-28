import { useMutation } from "@tanstack/react-query"

import { showToast } from "@shared/ui/toastify"

import { TablesService } from "../tables-service"

export const useDeleteTableButtonMutation = () => {
  return useMutation({
    mutationFn: TablesService.deleteTableButton,
    onSuccess: () => {
      showToast("Кнопку успешно удалено!", { type: "success" })
    },
  })
}
