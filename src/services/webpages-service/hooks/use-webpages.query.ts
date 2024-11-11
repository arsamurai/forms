import { useQuery } from "@tanstack/react-query"

import { WebpagesService } from "../webpages-service"
import { webpagesQueryCacheKey } from "./keys.constants"

export const useWebpagesQuery = (enabled?: boolean) => {
  return useQuery({
    queryKey: [webpagesQueryCacheKey],
    queryFn: WebpagesService.getWebpages,
    select: response => {
      return response.data
    },
    enabled: enabled ?? true,
  })
}
