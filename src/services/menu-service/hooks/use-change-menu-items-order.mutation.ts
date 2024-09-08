import { useMutation, useQueryClient } from "@tanstack/react-query"

import { showToast } from "@shared/ui/toastify"

import { MenuService } from "../menu-service"
import { menuTreeQueryCacheKey } from "./keys.constants"

export const useChangeMenuItemsOrderMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: MenuService.changeMenuItemsOrder,
    onSuccess: response => {
      showToast("Порядок пунктов меню успешно изменен!", { type: "success" })
      queryClient.setQueryData([menuTreeQueryCacheKey], response)
    },
  })
}
