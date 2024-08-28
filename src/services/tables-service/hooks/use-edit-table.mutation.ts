import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AxiosResponse } from "axios"
import { useNavigate } from "react-router-dom"

import { ROUTES } from "@shared/constants"
import { showToast } from "@shared/ui/toastify"

import { TablesService } from "../tables-service"
import { TableEntity } from "../tables-service.types"
import { tableQueryCacheKey, tablesQueryCacheKey } from "./keys.constants"

export const useEditTableMutation = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: TablesService.editTable,
    onSuccess: async response => {
      navigate(ROUTES.TABLES.path, { replace: true })
      showToast("Таблицу успешно отредактировано!", { type: "success" })

      const oldData = queryClient.getQueryData<AxiosResponse<TableEntity[]>>([tablesQueryCacheKey])

      if (oldData) {
        queryClient.setQueryData(
          [tablesQueryCacheKey],
          (oldData: AxiosResponse<TableEntity[]> | undefined) => {
            const newData = oldData?.data.map(item =>
              item.id === response.data.id ? response.data : item,
            )

            return { ...oldData, data: newData }
          },
        )
      } else {
        await queryClient.invalidateQueries({
          queryKey: [tablesQueryCacheKey],
        })
      }

      queryClient.setQueryData([tableQueryCacheKey, response.data.id], {
        ...response,
        data: [{ ...response.data }],
      })
    },
  })
}
