import { BlockSchema, TabSchema, ViewSchema } from "./view-service.validation"

// RESPONSES
export type ViewListResponse = ViewEntity[]
export type ViewResponse = ViewEntity

// PARAMS
export type CreateViewParams = ViewSchema
export type EditViewParams = {
  id: number
  view: ViewSchema
}
export type OrderData = {
  id: number
  order_id: number
}[]

// TYPES
export interface ViewEntity extends ViewSchema {
  id: number
  containers?: BlockEntity[]
  tabs?: TabEntity[]
}

interface BlockEntity extends BlockSchema {
  id: number
  order_id: number
  view_id: number
}

interface TabEntity extends TabSchema {
  id: number
  order_id: number
  view_id: number
}
