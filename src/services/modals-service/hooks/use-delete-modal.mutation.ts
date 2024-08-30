import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { showToast } from "@shared/ui/toastify"

import { ModalsService } from "../modals-service"
import { ModalEntity } from "../modals-service.types"
import { modalsQueryCacheKey } from "./keys.constants"

export const useDeleteModalMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ModalsService.deleteModal,
    onSuccess: (response, id) => {
      showToast("Модальное окно успешно удалено!", { type: "success" })
      queryClient.setQueryData(
        [modalsQueryCacheKey],
        (oldData: AxiosResponse<ModalEntity[]> | undefined) => {
          const newData = oldData?.data.filter(item => item.id !== id)
          return { ...oldData, data: newData }
        },
      )
    },
  })
}
