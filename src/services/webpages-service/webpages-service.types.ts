import { WebpageSchema } from "./webpages-service.validation"

// RESPONSES
export type WebpagesResponse = WebpageEntity[]
export type WebpageResponse = WebpageEntity

// PARAMS
export type CreateWebpageParams = WebpageSchema
export type EditWebpageParams = {
  id: number
  webpage: WebpageSchema
}

// TYPES
export interface WebpageEntity extends WebpageSchema {
  id: number
}
