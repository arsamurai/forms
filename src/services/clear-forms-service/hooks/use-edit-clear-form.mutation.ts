import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"

import { ROUTES } from "@shared/constants"
import { showToast } from "@shared/ui/toastify"

import { ClearFormsService } from "../clear-forms-service"
import { ClearFormEntity } from "../clear-forms-service.types"
import { clearFormQueryCacheKey, clearFormsQueryCacheKey } from "./keys.constants"

export const useEditClearFormMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: ClearFormsService.editClearForm,
    onSuccess: async response => {
      navigate(ROUTES.CLEAR_FORMS.path, { replace: true })
      showToast("Форму успешно отредактировано!", { type: "success" })

      const oldData = queryClient.getQueryData<AxiosResponse<ClearFormEntity[]>>([
        clearFormsQueryCacheKey,
      ])

      if (oldData) {
        queryClient.setQueryData(
          [clearFormsQueryCacheKey],
          (oldData: AxiosResponse<ClearFormEntity[]> | undefined) => {
            const newData = oldData?.data.map(item =>
              item.id === response.data.id ? response.data : item,
            )

            return { ...oldData, data: newData }
          },
        )
      } else {
        await queryClient.invalidateQueries({
          queryKey: [clearFormsQueryCacheKey],
        })
      }

      queryClient.setQueryData([clearFormQueryCacheKey, response.data.id], response)
    },
  })
}
