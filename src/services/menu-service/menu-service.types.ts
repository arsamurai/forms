import { MenuItemSchema } from "./menu-service.validation"

// RESPONSES
export type MenuTreeResponse = MenuItemEntity[]
export type MenuListResponse = MenuItemEntity[]
export type MenuItemResponse = MenuItemComment

// PARAMS
export type CreateMenuItemParams = MenuItemSchema
export type EditMenuItemParams = {
  id: number
  menuItem: MenuItemSchema
}
export type OrderData = {
  id: number
  order_id: number
}[]
export type ParentData = {
  id: number
  parent_id: number | null
}[]

// TYPES
export interface MenuItemEntity {
  comment: MenuItemComment
  children: MenuItemEntity[]
}
interface MenuItemComment {
  id: number
  title: string
  icon: string
  order_id: number
  parent_id?: number | null
}
