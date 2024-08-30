import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { showToast } from "@shared/ui/toastify"

import { WebpagesService } from "../webpages-service"
import { WebpageEntity } from "../webpages-service.types"
import { webpagesQueryCacheKey } from "./keys.constants"

export const useDeleteWebpageMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: WebpagesService.deleteWebpage,
    onSuccess: (response, id) => {
      showToast("Страницу успешно удалено!", { type: "success" })
      queryClient.setQueryData(
        [webpagesQueryCacheKey],
        (oldData: AxiosResponse<WebpageEntity[]> | undefined) => {
          const newData = oldData?.data.filter(item => item.id !== id)
          return { ...oldData, data: newData }
        },
      )
    },
  })
}
