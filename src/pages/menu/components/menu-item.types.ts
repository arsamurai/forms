import { MenuItemEntity } from "@services/menu-service"

export interface MenuItemProps {
  menuItem: MenuItemEntity
  deleteMenuItem: (id: number) => void
}
