import { api } from "@services/api"

import {
  CreateFillableFormParams,
  EditFillableFormParams,
  FillableFormResponse,
  FillableFormsResponse,
  OrderData,
} from "./fillable-forms-service.types"

export class FillableFormsService {
  static addFillableForm = (data: CreateFillableFormParams) => {
    return api.post("store?entityType=form&action=add", data)
  }

  static editFillableForm = (data: EditFillableFormParams) => {
    return api.post(`store?entityType=form&action=edit&entityId=${data.id}`, data.form)
  }

  static deleteFillableForm = (id: number) => {
    return api.post(`store?entityType=form&action=delete&entityId=${id}`)
  }

  static deleteFillableContainer = (id: number) => {
    return api.post(`store?entityType=container&action=delete&entityId=${id}`)
  }

  static deleteFillableField = (id: number) => {
    return api.post(`store?entityType=field&action=delete&entityId=${id}`)
  }

  static changeContainersOrder = (data: OrderData) => {
    return api.post("store?entityType=container&action=updateOrder", data)
  }

  static changeFieldsOrder = (data: OrderData) => {
    return api.post("store?entityType=field&action=updateOrder", data)
  }

  static getFillableForms = () => {
    return api.get<FillableFormsResponse>("store?entityType=form&action=getAll")
  }

  static getFillableForm = (id: number) => {
    return api.get<FillableFormResponse>(`store?entityType=form&action=getOne&entityId=${id}`)
  }
}
