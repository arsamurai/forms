import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"

import { ROUTES } from "@shared/constants"
import { showToast } from "@shared/ui/toastify"

import { OffcanvasService } from "../offcanvas-service"
import { OffcanvasEntity } from "../offcanvas-service.types"
import { offcanvasListQueryCacheKey, offcanvasQueryCacheKey } from "./keys.constants"

export const useEditOffcanvasMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: OffcanvasService.editOffcanvas,
    onSuccess: async response => {
      navigate(ROUTES.OFFCANVAS.path, { replace: true })
      showToast("Оффканвас успешно отредактировано!", { type: "success" })

      const oldData = queryClient.getQueryData<AxiosResponse<OffcanvasEntity[]>>([
        offcanvasListQueryCacheKey,
      ])

      if (oldData) {
        queryClient.setQueryData(
          [offcanvasListQueryCacheKey],
          (oldData: AxiosResponse<OffcanvasEntity[]> | undefined) => {
            const newData = oldData?.data.map(item =>
              item.id === response.data.id ? response.data : item,
            )

            return { ...oldData, data: newData }
          },
        )
      } else {
        await queryClient.invalidateQueries({
          queryKey: [offcanvasListQueryCacheKey],
        })
      }

      queryClient.setQueryData([offcanvasQueryCacheKey, response.data.id], response)
    },
  })
}
