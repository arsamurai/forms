import { FC } from "react"
//import { useDrag, useDrop } from "react-dnd"
import { Link } from "react-router-dom"

import { Button } from "@shared/ui/buttons"
import { getSvgById } from "@shared/ui/icons-picker"
import { Typography } from "@shared/ui/typography"

import CloseIcon from "@assets/icons/close.svg"
import EditIcon from "@assets/icons/edit.svg"

import { MenuItemProps } from "./menu-item.types"

export const MenuItem: FC<MenuItemProps> = ({ menuItem, deleteMenuItem }) => {
  const { id, title, icon } = menuItem.comment

  return (
    <div className="flex items-center justify-between rounded-r-lg border border-solid border-stroke bg-white px-5 py-[25px]">
      <div className="flex items-center gap-1">
        {getSvgById(icon)}
        <Typography variant="itemTitle">{title}</Typography>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" asChild className="h-8 w-8 rounded-full p-2">
          <Link to={`/menu/edit/${id}`} state={{ menuItem: menuItem.comment }}>
            <EditIcon />
          </Link>
        </Button>
        <Button
          variant="secondary"
          onClick={() => deleteMenuItem(id)}
          className="h-8 w-8 rounded-full p-2"
        >
          <div className="*:h-2.5 *:w-2.5">
            <CloseIcon />
          </div>
        </Button>
      </div>
    </div>
  )
}
