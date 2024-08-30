import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"

import { ROUTES } from "@shared/constants"
import { showToast } from "@shared/ui/toastify"

import { ModalsService } from "../modals-service"
import { ModalEntity } from "../modals-service.types"
import { modalQueryCacheKey, modalsQueryCacheKey } from "./keys.constants"

export const useEditModalMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: ModalsService.editModal,
    onSuccess: async response => {
      navigate(ROUTES.MODALS.path, { replace: true })
      showToast("Модальное окно успешно отредактировано!", { type: "success" })

      const oldData = queryClient.getQueryData<AxiosResponse<ModalEntity[]>>([modalsQueryCacheKey])

      if (oldData) {
        queryClient.setQueryData(
          [modalsQueryCacheKey],
          (oldData: AxiosResponse<ModalEntity[]> | undefined) => {
            const newData = oldData?.data.map(item =>
              item.id === response.data.id ? response.data : item,
            )

            return { ...oldData, data: newData }
          },
        )
      } else {
        await queryClient.invalidateQueries({
          queryKey: [modalsQueryCacheKey],
        })
      }

      queryClient.setQueryData([modalQueryCacheKey, response.data.id], response)
    },
  })
}
