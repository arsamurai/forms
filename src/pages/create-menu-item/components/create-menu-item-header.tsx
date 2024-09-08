import { FC } from "react"
import { Link } from "react-router-dom"

import { ROUTES } from "@shared/constants"
import { Button } from "@shared/ui/buttons"
import { Typography } from "@shared/ui/typography"

import CloseIcon from "@assets/icons/close.svg"

const CreateMenuItemHeader: FC<{ title?: string }> = ({ title }) => {
  return (
    <div className="flex items-center justify-between gap-10">
      <Typography variant="pageTitle">
        {title ? `Пункт меню "${title}"` : "Новый пункт меню"}
      </Typography>
      <Button variant="text" className="w-fit p-1.5" asChild>
        <Link to={ROUTES.MENU.path}>
          <CloseIcon />
        </Link>
      </Button>
    </div>
  )
}
export default CreateMenuItemHeader
