import { FC } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"

import { ButtonSchema, TableSchema } from "@services/tables-service"

import { Button } from "@shared/ui/buttons"
import { cn } from "@shared/utils/cn"

import PlusIcon from "@assets/icons/plus.svg"

import ButtonsGroupEntity from "./buttons-group-entity"

const ButtonsGroupType: FC<{ columnIndex: number }> = ({ columnIndex }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<TableSchema>()

  const {
    fields: columnButtons,
    append: addColumnButton,
    remove: removeColumnButton,
    move: moveColumnButton,
  } = useFieldArray({
    control: control,
    name: `columns.${columnIndex}.buttons`,
  })

  const handleAddColumnButton = () => {
    addColumnButton({
      title: "",
      api_key_param: "",
      api_command_name: "",
      color: "",
      action_type: "",
      api_route: "",
      show_alert: 0,
      alert_message: "",
    } as ButtonSchema)
  }

  return (
    <>
      <Button
        type="button"
        variant="secondary"
        size="small"
        className={cn("w-fit px-2 font-inter-regular", {
          "border-error text-error":
            !columnButtons.length && !!errors?.columns?.[columnIndex]?.buttons,
        })}
        onClick={handleAddColumnButton}
        endIcon={
          <div className="*:size-[11px]">
            <PlusIcon />
          </div>
        }
      >
        Добавить
      </Button>
      {columnButtons.map((item, index) => (
        <ButtonsGroupEntity
          key={item.id}
          columnIndex={columnIndex}
          buttonIndex={index}
          removeButton={removeColumnButton}
          moveButton={moveColumnButton}
        />
      ))}
    </>
  )
}
export default ButtonsGroupType
