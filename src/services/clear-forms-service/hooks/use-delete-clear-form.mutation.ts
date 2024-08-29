import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { showToast } from "@shared/ui/toastify"

import { ClearFormsService } from "../clear-forms-service"
import { ClearFormEntity } from "../clear-forms-service.types"
import { clearFormsQueryCacheKey } from "./keys.constants"

export const useDeleteClearFormMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ClearFormsService.deleteClearForm,
    onSuccess: (response, id) => {
      showToast("Форму успешно удалено!", { type: "success" })
      queryClient.setQueryData(
        [clearFormsQueryCacheKey],
        (oldData: AxiosResponse<ClearFormEntity[]> | undefined) => {
          const newData = oldData?.data.filter(item => item.id !== id)
          return { ...oldData, data: newData }
        },
      )
    },
  })
}
