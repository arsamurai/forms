import { api } from "@services/api"

import {
  ClearFormResponse,
  ClearFormsResponse,
  CreateClearFormParams,
  EditClearFormParams,
  OrderData,
} from "./clear-forms-service.types"

export class ClearFormsService {
  static addClearForm = (data: CreateClearFormParams) => {
    return api.post("store?entityType=ClearForm&action=add", data)
  }

  static editClearForm = (data: EditClearFormParams) => {
    return api.post(`store?entityType=ClearForm&action=edit&entityId=${data.id}`, data.form)
  }

  static deleteClearForm = (id: number) => {
    return api.post(`store?entityType=ClearForm&action=delete&entityId=${id}`)
  }

  static deleteClearContainer = (id: number) => {
    return api.post(`store?entityType=ClearContainer&action=delete&entityId=${id}`)
  }

  static deleteClearField = (id: number) => {
    return api.post(`store?entityType=ClearField&action=delete&entityId=${id}`)
  }

  static changeContainersOrder = (data: OrderData) => {
    return api.post("store?entityType=ClearContainer&action=updateOrder", data)
  }

  static changeFieldsOrder = (data: OrderData) => {
    return api.post("store?entityType=ClearField&action=updateOrder", data)
  }

  static getClearForms = () => {
    return api.get<ClearFormsResponse>("store?entityType=ClearForm&action=getAll")
  }

  static getClearForm = (id: number) => {
    return api.get<ClearFormResponse>(`store?entityType=ClearForm&action=getOne&entityId=${id}`)
  }
}
