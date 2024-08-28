import { api } from "@services/api"

import {
  CreateTableParams,
  EditTableParams,
  OrderData,
  TableResponse,
  TablesResponse,
} from "./tables-service.types"

export class TablesService {
  static addTable = (data: CreateTableParams) => {
    return api.post("store?entityType=table&action=add", data)
  }

  static editTable = (data: EditTableParams) => {
    return api.post(`store?entityType=table&action=edit&entityId=${data.id}`, data.table)
  }

  static deleteTable = (id: number) => {
    return api.post(`store?entityType=table&action=delete&entityId=${id}`)
  }

  static deleteColumn = (id: number) => {
    return api.post(`store?entityType=column&action=delete&entityId=${id}`)
  }

  static deleteTableButton = (id: number) => {
    return api.post(`store?entityType=tableButton&action=delete&entityId=${id}`)
  }

  static deleteColumnButton = (id: number) => {
    return api.post(`store?entityType=columnButton&action=delete&entityId=${id}`)
  }

  static changeTableButtonsOrder = (data: OrderData) => {
    return api.post("store?entityType=tableButton&action=updateOrder", data)
  }

  static changeColumnButtonsOrder = (data: OrderData) => {
    return api.post("store?entityType=columnButton&action=updateOrder", data)
  }

  static changeColumnsOrder = (data: OrderData) => {
    return api.post("store?entityType=column&action=updateOrder", data)
  }

  static getTables = () => {
    return api.get<TablesResponse>("store?entityType=table&action=getAll")
  }

  static getTable = (id: number) => {
    return api.get<TableResponse>(`store?entityType=table&action=getOne&entityId=${id}`)
  }
}
