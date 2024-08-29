import { ClearFormSchema, ContainerSchema, FieldSchema } from "./clear-forms-service.validation"

// RESPONSES
export type ClearFormsResponse = ClearFormEntity[]
export type ClearFormResponse = ClearFormEntity

// PARAMS
export type CreateClearFormParams = ClearFormSchema
export type EditClearFormParams = {
  id: number
  form: ClearFormSchema
}
export type OrderData = {
  id: number
  order_id: number
}[]

// TYPES
export interface ClearFormEntity extends ClearFormSchema {
  id: number
  created_at: string
  containers: ContainerEntity[]
}

interface ContainerEntity extends ContainerSchema {
  id: number
  form_id: number
  order_id: number
  fields: FieldEntity[]
}

interface FieldEntity extends FieldSchema {
  id: number
  container_id: number
  order_id: number
}
