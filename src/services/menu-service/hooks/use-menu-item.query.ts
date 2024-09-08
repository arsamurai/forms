import { useQuery } from "@tanstack/react-query"

import { MenuService } from "../menu-service"
import { MenuItemEntity } from "../menu-service.types"
import { menuItemQueryCacheKey } from "./keys.constants"

export const useMenuItemQuery = (id: number, stagedMenuItem?: MenuItemEntity["comment"]) => {
  return useQuery({
    queryKey: [menuItemQueryCacheKey, id],
    queryFn: () => MenuService.getMenuItem(id),
    initialData: () => {
      if (!stagedMenuItem) {
        return undefined
      }

      return { data: stagedMenuItem }
    },
    select: response => {
      return response.data
    },
    enabled: !stagedMenuItem && !!id,
  })
}
