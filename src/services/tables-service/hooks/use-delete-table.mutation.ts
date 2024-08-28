import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"

import { showToast } from "@shared/ui/toastify"

import { TablesService } from "../tables-service"
import { TableEntity } from "../tables-service.types"
import { tablesQueryCacheKey } from "./keys.constants"

export const useDeleteTableMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: TablesService.deleteTable,
    onSuccess: (response, id) => {
      showToast("Таблицу успешно удалено!", { type: "success" })
      queryClient.setQueryData(
        [tablesQueryCacheKey],
        (oldData: AxiosResponse<TableEntity[]> | undefined) => {
          const newData = oldData?.data.filter(item => item.id !== id)
          return { ...oldData, data: newData }
        },
      )
    },
  })
}
