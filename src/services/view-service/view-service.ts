import { api } from "@services/api"

import {
  CreateViewParams,
  EditViewParams,
  OrderData,
  ViewListResponse,
  ViewResponse,
} from "./view-service.types"

export class ViewService {
  static addView = (data: CreateViewParams) => {
    return api.post("store?entityType=view&action=add", data)
  }

  static editView = (data: EditViewParams) => {
    return api.post(`store?entityType=view&action=edit&entityId=${data.id}`, data.view)
  }

  static deleteView = (id: number) => {
    return api.post(`store?entityType=view&action=delete&entityId=${id}`)
  }

  static deleteViewBlock = (id: number) => {
    return api.post(`store?entityType=viewBlock&action=delete&entityId=${id}`)
  }

  static deleteViewTab = (id: number) => {
    return api.post(`store?entityType=viewTab&action=delete&entityId=${id}`)
  }

  static changeViewBlocksOrder = (data: OrderData) => {
    return api.post("store?entityType=viewBlock&action=updateOrder", data)
  }

  static changeViewTabsOrder = (data: OrderData) => {
    return api.post("store?entityType=viewTab&action=updateOrder", data)
  }

  static getViewList = () => {
    return api.get<ViewListResponse>("store?entityType=view&action=getAll")
  }

  static getView = (id: number) => {
    return api.get<ViewResponse>(`store?entityType=view&action=getOne&entityId=${id}`)
  }
}
