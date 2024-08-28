import { FC } from "react"
import { useFieldArray, useFormContext } from "react-hook-form"

import {
  FieldSchema,
  FillableFormSchema,
  useChangeContainersOrderMutation,
  useDeleteFillableContainerMutation,
} from "@services/fillable-forms-service"

import { Button } from "@shared/ui/buttons"
import { Input } from "@shared/ui/fields"
import { Typography } from "@shared/ui/typography"

import ArrowIcon from "@assets/icons/arrow.svg"
import CloseIcon from "@assets/icons/close.svg"

import { FormField } from "../form-field"
import { FormContainerProps } from "./form-container.types"

const FormContainer: FC<FormContainerProps> = ({
  containerIndex,
  removeContainer,
  moveContainer,
}) => {
  const deleteFillableContainer = useDeleteFillableContainerMutation()
  const changeContainersOrder = useChangeContainersOrderMutation()

  const {
    register,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<FillableFormSchema>()

  const containers = getValues(`containers`)
  const containerId = getValues(`containers.${containerIndex}.id`)
  const prevContainerId = getValues(`containers.${containerIndex - 1}.id`)
  const nextContainerId = getValues(`containers.${containerIndex + 1}.id`)
  const containerTitle = watch(`containers.${containerIndex}.title`)
  const isDisabledMoveUpButton =
    (!containerId && !!prevContainerId) || containerIndex === 0 || changeContainersOrder.isPending
  const isDisabledMoveDownButton =
    (!!containerId && !nextContainerId) ||
    containerIndex + 1 === containers.length ||
    changeContainersOrder.isPending

  const {
    fields,
    append,
    remove: removeField,
    move: moveFeild,
  } = useFieldArray({
    control: control,
    name: `containers.${containerIndex}.fields`,
  })

  const handleAddField = () => {
    append({
      field_title: "",
      field_name: "",
      field_text: "",
      api_key: "",
      size: "",
    } as FieldSchema)
  }

  const move = (direction: "up" | "down") => {
    if (!containerId) {
      const moveIndex = direction === "up" ? containerIndex - 1 : containerIndex + 1
      moveContainer(containerIndex, moveIndex)
      return
    }

    const currentItem = containers.find(cItem => cItem.id === containerId)
    if (!currentItem) return

    const targetOrderId =
      direction === "up" ? Number(currentItem.order_id) - 1 : Number(currentItem.order_id) + 1

    const targetItem = containers.find(item => item.order_id === targetOrderId)
    if (!targetItem) return

    const orderedItems = containers.map(item => {
      if (item.id === currentItem.id) {
        return { id: Number(item.id), order_id: Number(targetItem.order_id) }
      } else if (item.id === targetItem.id) {
        return { id: Number(item.id), order_id: Number(currentItem.order_id) }
      } else {
        return { id: Number(item.id), order_id: Number(item.order_id) }
      }
    })

    orderedItems && changeContainersOrder.mutate(orderedItems)
  }

  const remove = () => {
    if (containerId) deleteFillableContainer.mutate(containerId)
    removeContainer(containerIndex)
  }

  return (
    <div className="space-y-10 rounded-[20px] border border-solid border-stroke p-8">
      <Typography variant="pageSubtitle">
        Блок {containerIndex + 1}: {containerTitle}
      </Typography>
      <div className="mb-10 flex gap-5">
        <div className="flex-1">
          <Input
            label="Название блока"
            placeholder="Название блока"
            {...register(`containers.${containerIndex}.title`)}
            error={!!errors?.containers?.[containerIndex]?.title}
          />
        </div>
        <div className="w-48">
          <Input
            label="Размер"
            placeholder="col-lg-6 col-md-6"
            {...register(`containers.${containerIndex}.size`)}
            error={!!errors?.containers?.[containerIndex]?.size}
          />
        </div>
        <div className="w-[88px]">
          <Button
            type="button"
            variant="text"
            className="h-7 w-fit p-1"
            onClick={remove}
            disabled={containers.length === 1}
            startIcon={
              <div className="text-t-black *:h-2.5 *:w-2.5">
                <CloseIcon />
              </div>
            }
          >
            <Typography variant="itemTitle">Удалить</Typography>
          </Button>
          <Button
            type="button"
            variant="text"
            className="h-7 w-fit p-1"
            disabled={isDisabledMoveUpButton}
            onClick={() => move("up")}
            startIcon={
              <div className="text-t-black">
                <ArrowIcon />
              </div>
            }
          >
            <Typography variant="itemTitle">Вверх</Typography>
          </Button>
          <Button
            type="button"
            variant="text"
            className="h-7 w-fit p-1"
            disabled={isDisabledMoveDownButton}
            onClick={() => move("down")}
            startIcon={
              <div className="rotate-180 text-t-black">
                <ArrowIcon />
              </div>
            }
          >
            <Typography variant="itemTitle">Вниз</Typography>
          </Button>
        </div>
      </div>
      {fields.map((item, index) => (
        <FormField
          key={item.id}
          containerIndex={containerIndex}
          fieldIndex={index}
          removeField={removeField}
          moveField={moveFeild}
        />
      ))}
      <div className="flex justify-center">
        <Button
          type="button"
          variant="secondary"
          className="max-w-[600px]"
          onClick={handleAddField}
        >
          Додати поле
        </Button>
      </div>
    </div>
  )
}
export default FormContainer
