import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"

import { ROUTES } from "@shared/constants"
import { showToast } from "@shared/ui/toastify"

import { ViewService } from "../view-service"
import { ViewEntity } from "../view-service.types"
import { viewListQueryCacheKey, viewQueryCacheKey } from "./keys.constants"

export const useAddViewMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: ViewService.addView,
    onSuccess: async response => {
      navigate(ROUTES.VIEW.path, { replace: true })
      showToast("Информацию на страницу успешно добавлено!", { type: "success" })

      const oldData = queryClient.getQueryData<AxiosResponse<ViewEntity[]>>([viewListQueryCacheKey])

      if (oldData) {
        queryClient.setQueryData(
          [viewListQueryCacheKey],
          (oldData: AxiosResponse<ViewEntity[]> | undefined) => {
            const newData = oldData?.data ? [...oldData.data, response.data] : [response.data]
            return { ...oldData, data: newData }
          },
        )
      } else {
        await queryClient.invalidateQueries({
          queryKey: [viewListQueryCacheKey],
        })
      }

      queryClient.setQueryData([viewQueryCacheKey, response.data.id], response)
    },
  })
}
