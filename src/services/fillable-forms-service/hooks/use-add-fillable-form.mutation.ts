import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"

import { ROUTES } from "@shared/constants"
import { showToast } from "@shared/ui/toastify"

import { FillableFormsService } from "../fillable-forms-service"
import { FillableFormEntity } from "../fillable-forms-service.types"
import { fillableFormQueryCacheKey, fillableFormsQueryCacheKey } from "./keys.constants"

export const useAddFillableFormMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: FillableFormsService.addFillableForm,
    onSuccess: async response => {
      navigate(ROUTES.FILLABLE_FORMS.path, { replace: true })
      showToast("Форму успішно створено!", { type: "success" })

      const oldData = queryClient.getQueryData<AxiosResponse<FillableFormEntity[]>>([
        fillableFormsQueryCacheKey,
      ])

      if (oldData) {
        queryClient.setQueryData(
          [fillableFormsQueryCacheKey],
          (oldData: AxiosResponse<FillableFormEntity[]> | undefined) => {
            const newData = oldData?.data ? [...oldData.data, response.data] : [response.data]
            return { ...oldData, data: newData }
          },
        )
      } else {
        await queryClient.invalidateQueries({
          queryKey: [fillableFormQueryCacheKey],
        })
      }

      queryClient.setQueryData([fillableFormQueryCacheKey, response.data.id], response)
    },
  })
}
