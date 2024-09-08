import SortableTree from "@nosferatu500/react-sortable-tree"
import "@nosferatu500/react-sortable-tree/style.css"
import { useCallback, useEffect, useState } from "react"

import { useSearchQuery } from "@app/search"

import { ListHeader } from "@features/list"

import {
  MenuItemEntity,
  OrderData,
  ParentData,
  useChangeMenuItemsOrderMutation,
  useChangeMenuItemsParentOrderMutation,
  useDeleteMenuItemMutation,
  useMenuTreeQuery,
} from "@services/menu-service"

import { ROUTES } from "@shared/constants"
import { Loading } from "@shared/ui/loading"
import { Typography } from "@shared/ui/typography"

import { MenuItem } from "./components/menu-item"

const MenuPage = () => {
  const { data, isLoading } = useMenuTreeQuery()
  const deleteMenuItem = useDeleteMenuItemMutation()
  const changeOrder = useChangeMenuItemsOrderMutation()
  const changeParent = useChangeMenuItemsParentOrderMutation()
  const { searchQuery } = useSearchQuery()

  const [menuItems, setMenuItems] = useState<MenuItemEntity[]>([])

  const handleTreeChange = (newTreeData: MenuItemEntity[]) => {
    const orderUpdates: OrderData = []
    const parentUpdates: ParentData = []

    newTreeData.forEach((item: MenuItemEntity, index: number) => {
      if (item.comment.order_id !== index) {
        orderUpdates.push({
          id: item.comment.id,
          order_id: index,
        })
      }
    })

    const traverseTree = (items: MenuItemEntity[], parentId: number | null) => {
      items.forEach((item, index) => {
        if (item.comment.order_id !== index) {
          orderUpdates.push({
            id: item.comment.id,
            order_id: index,
          })
        }

        if (item.comment.parent_id !== parentId) {
          parentUpdates.push({
            id: item.comment.id,
            parent_id: parentId ?? null,
          })
        }

        if (item.children && item.children.length > 0) {
          traverseTree(item.children, item.comment.id)
        }
      })
    }
    traverseTree(newTreeData, null)

    if (orderUpdates.length > 0) {
      changeOrder.mutate(orderUpdates)
    }

    if (parentUpdates.length > 0) {
      changeParent.mutate(parentUpdates)
    }

    setMenuItems(newTreeData)
  }

  const handleDeleteMenuItem = useCallback(
    (id: number) => {
      deleteMenuItem.mutate(id)
    },
    [deleteMenuItem],
  )

  useEffect(() => {
    setMenuItems(data ?? [])
  }, [data])

  const menuView = () => {
    if (isLoading) {
      return <Loading />
    } else if (!menuItems?.length) {
      return (
        <Typography variant="pageSubtitle" className="text-center">
          Пусто...
        </Typography>
      )
    } else {
      return (
        <SortableTree
          rowHeight={104}
          treeData={menuItems}
          onChange={handleTreeChange}
          searchQuery={searchQuery.trim()}
          onlyExpandSearchedNodes
          searchMethod={({ node, searchQuery }) => {
            const nodeTitle = node.comment.title.toLowerCase()
            const searchLower = searchQuery.toLowerCase()
            return !!searchQuery && nodeTitle.includes(searchLower)
          }}
          generateNodeProps={({ node }) => ({
            title: <MenuItem menuItem={node} deleteMenuItem={handleDeleteMenuItem} />,
          })}
        />
      )
    }
  }

  return (
    <div className="w-full pt-7">
      <ListHeader title="Меню" link={ROUTES.MENU.path} />
      {menuView()}
    </div>
  )
}

export default MenuPage
