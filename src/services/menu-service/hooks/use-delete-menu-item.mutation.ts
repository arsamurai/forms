import { useMutation, useQueryClient } from "@tanstack/react-query"

import { showToast } from "@shared/ui/toastify"

import { MenuService } from "../menu-service"
import { menuTreeQueryCacheKey } from "./keys.constants"

export const useDeleteMenuItemMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: MenuService.deleteMenuItem,
    onSuccess: async () => {
      showToast("Пункт меню успешно удалено!", { type: "success" })
      await queryClient.invalidateQueries({
        queryKey: [menuTreeQueryCacheKey],
      })
    },
  })
}
