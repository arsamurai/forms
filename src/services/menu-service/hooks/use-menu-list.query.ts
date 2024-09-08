import { useQuery } from "@tanstack/react-query"

import { MenuService } from "../menu-service"
import { menuListQueryCacheKey } from "./keys.constants"

export const useMenuListQuery = () => {
  return useQuery({
    queryKey: [menuListQueryCacheKey],
    queryFn: MenuService.getMenuList,
    select: response => {
      return response.data
    },
  })
}
