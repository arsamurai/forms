import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { showToast } from "@shared/ui/toastify"

import { FillableFormsService } from "../fillable-forms-service"
import { FillableFormEntity } from "../fillable-forms-service.types"
import { fillableFormsQueryCacheKey } from "./keys.constants"

export const useDeleteFillableFormMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: FillableFormsService.deleteFillableForm,
    onSuccess: (response, id) => {
      showToast("Форму успішно видалено!", { type: "success" })
      queryClient.setQueryData(
        [fillableFormsQueryCacheKey],
        (oldData: AxiosResponse<FillableFormEntity[]> | undefined) => {
          const newData = oldData?.data.filter(item => item.id !== id)
          return { ...oldData, data: newData }
        },
      )
    },
  })
}
