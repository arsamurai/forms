import {
  ContainerSchema,
  FieldSchema,
  FillableFormSchema,
} from "./fillable-forms-service.validation"

// RESPONSES
export type FillableFormsResponse = FillableFormEntity[]
export type FillableFormResponse = FillableFormEntity

// PARAMS
export type CreateFillableFormParams = FillableFormSchema
export type EditFillableFormParams = {
  id: number
  form: FillableFormSchema
}
export type OrderData = {
  id: number
  order_id: number
}[]

// TYPES
export interface FillableFormEntity extends FillableFormSchema {
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
