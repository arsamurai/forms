import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"

import { ROUTES } from "@shared/constants"
import { showToast } from "@shared/ui/toastify"

import { WebpagesService } from "../webpages-service"
import { WebpageEntity } from "../webpages-service.types"
import { webpageQueryCacheKey, webpagesQueryCacheKey } from "./keys.constants"

export const useEditWebpageMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: WebpagesService.editWebpage,
    onSuccess: async response => {
      navigate(ROUTES.WEBPAGES.path, { replace: true })
      showToast("Страницу успешно отредактировано!", { type: "success" })

      const oldData = queryClient.getQueryData<AxiosResponse<WebpageEntity[]>>([
        webpagesQueryCacheKey,
      ])

      if (oldData) {
        queryClient.setQueryData(
          [webpagesQueryCacheKey],
          (oldData: AxiosResponse<WebpageEntity[]> | undefined) => {
            const newData = oldData?.data.map(item =>
              item.id === response.data.id ? response.data : item,
            )

            return { ...oldData, data: newData }
          },
        )
      } else {
        await queryClient.invalidateQueries({
          queryKey: [webpagesQueryCacheKey],
        })
      }

      queryClient.setQueryData([webpageQueryCacheKey, response.data.id], response)
    },
  })
}
