import { api } from "@services/api"

import {
  CreateWebpageParams,
  EditWebpageParams,
  WebpageResponse,
  WebpagesResponse,
} from "./webpages-service.types"

export class WebpagesService {
  static addWebpage = (data: CreateWebpageParams) => {
    return api.post("store?entityType=page&action=add", data)
  }

  static editWebpage = (data: EditWebpageParams) => {
    return api.post(`store?entityType=page&action=edit&entityId=${data.id}`, data.webpage)
  }

  static deleteWebpage = (id: number) => {
    return api.post(`store?entityType=page&action=delete&entityId=${id}`)
  }

  static getWebpages = () => {
    return api.get<WebpagesResponse>("store?entityType=page&action=getAll")
  }

  static getWebpage = (id: number) => {
    return api.get<WebpageResponse>(`store?entityType=page&action=getOne&entityId=${id}`)
  }
}
