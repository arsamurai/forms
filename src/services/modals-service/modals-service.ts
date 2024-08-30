import { api } from "@services/api"

import {
  CreateModalParams,
  EditModalParams,
  ModalResponse,
  ModalsResponse,
} from "./modals-service.types"

export class ModalsService {
  static addModal = (data: CreateModalParams) => {
    return api.post("store?entityType=modal&action=add", data)
  }

  static editModal = (data: EditModalParams) => {
    return api.post(`store?entityType=modal&action=edit&entityId=${data.id}`, data.modal)
  }

  static deleteModal = (id: number) => {
    return api.post(`store?entityType=modal&action=delete&entityId=${id}`)
  }

  static getModals = () => {
    return api.get<ModalsResponse>("store?entityType=modal&action=getAll")
  }

  static getModal = (id: number) => {
    return api.get<ModalResponse>(`store?entityType=modal&action=getOne&entityId=${id}`)
  }
}
