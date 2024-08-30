import { ModalSchema } from "./modals-service.validation"

// RESPONSES
export type ModalsResponse = ModalEntity[]
export type ModalResponse = ModalEntity

// PARAMS
export type CreateModalParams = ModalSchema
export type EditModalParams = {
  id: number
  modal: ModalSchema
}

// TYPES
export interface ModalEntity extends ModalSchema {
  id: number
}
