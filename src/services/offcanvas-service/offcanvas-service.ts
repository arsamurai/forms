import { api } from "@services/api"

import {
  CreateOffcanvasParams,
  EditOffcanvasParams,
  OffcanvasListResponse,
  OffcanvasResponse,
} from "./offcanvas-service.types"

export class OffcanvasService {
  static addOffcanvas = (data: CreateOffcanvasParams) => {
    return api.post("store?entityType=offcanvas&action=add", data)
  }

  static editOffcanvas = (data: EditOffcanvasParams) => {
    return api.post(`store?entityType=offcanvas&action=edit&entityId=${data.id}`, data.offcanvas)
  }

  static deleteOffcanvas = (id: number) => {
    return api.post(`store?entityType=offcanvas&action=delete&entityId=${id}`)
  }

  static getOffcanvasList = () => {
    return api.get<OffcanvasListResponse>("store?entityType=offcanvas&action=getAll")
  }

  static getOffcanvas = (id: number) => {
    return api.get<OffcanvasResponse>(`store?entityType=offcanvas&action=getOne&entityId=${id}`)
  }
}
