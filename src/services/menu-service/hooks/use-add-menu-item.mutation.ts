import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"

import { ROUTES } from "@shared/constants"
import { showToast } from "@shared/ui/toastify"

import { MenuService } from "../menu-service"
import { menuTreeQueryCacheKey } from "./keys.constants"

export const useAddMenuItemMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: MenuService.addMenuItem,
    onSuccess: async response => {
      navigate(ROUTES.MENU.path, { replace: true })
      showToast("Пункт меню успешно добавлено!", { type: "success" })
      queryClient.setQueryData([menuTreeQueryCacheKey], response)
    },
  })
}
