import { FC } from "react"
import { Link } from "react-router-dom"

import { FillableFormEntity, useDeleteFillableFormMutation } from "@services/fillable-forms-service"

import { ROUTES } from "@shared/constants"
import { Button } from "@shared/ui/buttons"
import { Typography } from "@shared/ui/typography"

import CloseIcon from "@assets/icons/close.svg"
import EditIcon from "@assets/icons/edit.svg"

const FillableFormsItem: FC<FillableFormEntity> = form => {
  const { id, title, unique_id } = form

  const deleteFillableForm = useDeleteFillableFormMutation()

  const handleDeleteForm = () => {
    deleteFillableForm.mutate(form.id)
  }

  return (
    <div className="grid grid-cols-3 items-center rounded-lg border border-solid border-stroke px-5 py-[25px]">
      <Typography variant="itemTitle">{title}</Typography>
      <Typography className="justify-self-center">{unique_id}</Typography>
      <div className="flex gap-2 justify-self-end">
        <Button variant="secondary" asChild className="h-8 w-8 rounded-full p-2">
          <Link to={`${ROUTES.FILLABLE_FORMS.path}/edit/${id}`} state={{ form }}>
            <EditIcon />
          </Link>
        </Button>
        <Button variant="secondary" onClick={handleDeleteForm} className="h-8 w-8 rounded-full p-2">
          <div className="*:h-2.5 *:w-2.5">
            <CloseIcon />
          </div>
        </Button>
      </div>
    </div>
  )
}
export default FillableFormsItem
