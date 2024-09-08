import { useMutation, useQueryClient } from "@tanstack/react-query"

import { showToast } from "@shared/ui/toastify"

import { MenuService } from "../menu-service"
import { menuTreeQueryCacheKey } from "./keys.constants"

export const useChangeMenuItemsParentOrderMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: MenuService.changeMenuItemsParent,
    onSuccess: response => {
      showToast("Порядок родителей пункта успешно изменен!", { type: "success" })
      queryClient.setQueryData([menuTreeQueryCacheKey], response)
    },
  })
}
