import { useQuery } from "@tanstack/react-query"

import { WebpagesService } from "../webpages-service"
import { WebpageEntity } from "../webpages-service.types"
import { webpageQueryCacheKey } from "./keys.constants"

export const useWebpageQuery = (id: number, stagedWebpage?: WebpageEntity) => {
  return useQuery({
    queryKey: [webpageQueryCacheKey, id],
    queryFn: () => WebpagesService.getWebpage(id),
    initialData: () => {
      if (!stagedWebpage) {
        return undefined
      }

      return { data: stagedWebpage }
    },
    select: response => {
      return response.data
    },
    enabled: !stagedWebpage && !!id,
  })
}
