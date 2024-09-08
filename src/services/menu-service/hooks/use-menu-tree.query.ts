import { useQuery } from "@tanstack/react-query"

import { MenuService } from "../menu-service"
import { menuTreeQueryCacheKey } from "./keys.constants"

export const useMenuTreeQuery = () => {
  return useQuery({
    queryKey: [menuTreeQueryCacheKey],
    queryFn: MenuService.getMenuTree,
    select: response => {
      return response.data
    },
  })
}
