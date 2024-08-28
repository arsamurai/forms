import { useMutation } from "@tanstack/react-query"

import { showToast } from "@shared/ui/toastify"

import { TablesService } from "../tables-service"

export const useDeleteColumnMutation = () => {
  return useMutation({
    mutationFn: TablesService.deleteColumn,
    onSuccess: () => {
      showToast("Колонку успешно удалено!", { type: "success" })
    },
  })
}
