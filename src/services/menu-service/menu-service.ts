import { api } from "@services/api"

import {
  CreateMenuItemParams,
  EditMenuItemParams,
  MenuItemResponse,
  MenuListResponse,
  OrderData,
  ParentData,
} from "./menu-service.types"

export class MenuService {
  static addMenuItem = (data: CreateMenuItemParams) => {
    return api.post("store?entityType=menu&action=add", data)
  }

  static editMenuItem = (data: EditMenuItemParams) => {
    return api.post(`store?entityType=menu&action=edit&entityId=${data.id}`, data.menuItem)
  }

  static deleteMenuItem = (id: number) => {
    return api.post(`store?entityType=menu&action=delete&entityId=${id}`)
  }

  static changeMenuItemsOrder = (data: OrderData) => {
    return api.post("store?entityType=menu&action=updateOrder", data)
  }

  static changeMenuItemsParent = (data: ParentData) => {
    return api.post("store?entityType=menu&action=updateParent", data)
  }

  static getMenuList = () => {
    return api.get<MenuListResponse>("store?entityType=menu&action=getAll")
  }

  static getMenuTree = () => {
    return api.get<MenuListResponse>("store?entityType=menu&action=getThree")
  }

  static getMenuItem = (id: number) => {
    return api.get<MenuItemResponse>(`store?entityType=menu&action=getOne&entityId=${id}`)
  }
}
