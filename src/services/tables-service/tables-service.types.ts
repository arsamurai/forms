import { ButtonSchema, ColumnSchema, TableSchema } from "./tables-service.validation"

// RESPONSES
export type TablesResponse = TableEntity[]
export type TableResponse = TableEntity[]

// PARAMS
export type CreateTableParams = TableSchema
export type EditTableParams = {
  id: number
  table: TableSchema
}
export type OrderData = {
  id: number
  order_id: number
}[]

// TYPES
export interface TableEntity extends TableSchema {
  id: number
  tables: ColumnEntity[]
  buttons?: ButtonEntity[]
}

interface ColumnEntity extends ColumnSchema {
  id: number
  table_id: number
  order_id: number
}

interface ButtonEntity extends ButtonSchema {
  id: number
  column_id?: number
  order_id: number
}
