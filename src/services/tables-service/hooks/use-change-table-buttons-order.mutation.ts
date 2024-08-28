import { useMutation, useQueryClient } from "@tanstack/react-query"

import { showToast } from "@shared/ui/toastify"

import { TablesService } from "../tables-service"
import { tableQueryCacheKey } from "./keys.constants"

export const useChangeTableButtonsOrderMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: TablesService.changeTableButtonsOrder,
    onSuccess: response => {
      showToast("Порядок кнопок успешно изменен!", { type: "success" })
      queryClient.setQueryData([tableQueryCacheKey, response.data.id], {
        ...response,
        data: [{ ...response.data }],
      })
    },
  })
}
