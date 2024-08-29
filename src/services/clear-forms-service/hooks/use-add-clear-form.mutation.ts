import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"

import { ROUTES } from "@shared/constants"
import { showToast } from "@shared/ui/toastify"

import { ClearFormsService } from "../clear-forms-service"
import { ClearFormEntity } from "../clear-forms-service.types"
import { clearFormQueryCacheKey, clearFormsQueryCacheKey } from "./keys.constants"

export const useAddClearFormMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: ClearFormsService.addClearForm,
    onSuccess: async response => {
      navigate(ROUTES.CLEAR_FORMS.path, { replace: true })
      showToast("Форму успешно создано!", { type: "success" })

      const oldData = queryClient.getQueryData<AxiosResponse<ClearFormEntity[]>>([
        clearFormsQueryCacheKey,
      ])

      if (oldData) {
        queryClient.setQueryData(
          [clearFormsQueryCacheKey],
          (oldData: AxiosResponse<ClearFormEntity[]> | undefined) => {
            const newData = oldData?.data ? [...oldData.data, response.data] : [response.data]
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
