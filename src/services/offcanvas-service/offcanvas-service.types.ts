import { OffcanvasSchema } from "./offcanvas-service.validation"

// RESPONSES
export type OffcanvasListResponse = OffcanvasEntity[]
export type OffcanvasResponse = OffcanvasEntity

// PARAMS
export type CreateOffcanvasParams = OffcanvasSchema
export type EditOffcanvasParams = {
  id: number
  offcanvas: OffcanvasSchema
}

// TYPES
export interface OffcanvasEntity extends OffcanvasSchema {
  id: number
}
