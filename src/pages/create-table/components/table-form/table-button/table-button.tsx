import { FC, useEffect } from "react"
import { Controller, useFormContext } from "react-hook-form"

import {
  ButtonActionTypeEnum,
  TableSchema,
  useChangeTableButtonsOrderMutation,
  useDeleteTableButtonMutation,
} from "@services/tables-service"
import { useWebpagesQuery } from "@services/webpages-service"

import { Button } from "@shared/ui/buttons"
import { ColorPicker } from "@shared/ui/color-picker"
import { Checkbox, Input, Select } from "@shared/ui/fields"
import { Typography } from "@shared/ui/typography"
import { formatSelectOptions } from "@shared/utils/format-select-options"

import ArrowIcon from "@assets/icons/arrow.svg"
import CloseIcon from "@assets/icons/close.svg"

import { buttonActionTypesArray } from "./constants/button-action-types-array"
import { TableButtonProps } from "./table-button.types"

const TableButton: FC<TableButtonProps> = ({ buttonIndex, removeButton, moveButton }) => {
  const deleteButton = useDeleteTableButtonMutation()
  const changeButtonsOrder = useChangeTableButtonsOrderMutation()

  const {
    register,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<TableSchema>()

  const buttons = getValues("buttons")
  const buttonId = getValues(`buttons.${buttonIndex}.id`)
  const buttonColor = watch(`buttons.${buttonIndex}.color`)
  const prevButtonId = getValues(`buttons.${buttonIndex - 1}.id`)
  const nextButtonId = getValues(`buttons.${buttonIndex + 1}.id`)
  const buttonTitle = watch(`buttons.${buttonIndex}.title`)
  const buttonShowAlert = watch(`buttons.${buttonIndex}.show_alert`)
  const actionType = watch(`buttons.${buttonIndex}.action_type`)
  const isDisabledMoveUpButton =
    (!buttonId && !!prevButtonId) || buttonIndex === 0 || changeButtonsOrder.isPending
  const isDisabledMoveDownButton =
    (!!buttonId && !nextButtonId) ||
    buttonIndex + 1 === buttons?.length ||
    changeButtonsOrder.isPending

  const { data: webPages, isLoading: isLoadingOnWebPages } = useWebpagesQuery(
    actionType === ButtonActionTypeEnum.GoToPage,
  )
  const webPagesOptions = formatSelectOptions(webPages)

  const changeButtonColor = (newColor: string) => {
    setValue(`buttons.${buttonIndex}.color`, newColor, {
      shouldDirty: true,
    })
  }

  const handleChangeShowAlert = () => {
    setValue(`buttons.${buttonIndex}.show_alert`, buttonShowAlert === 1 ? 0 : 1, {
      shouldDirty: true,
    })
  }

  const move = (direction: "up" | "down") => {
    if (!buttonId) {
      const moveIndex = direction === "up" ? buttonIndex - 1 : buttonIndex + 1
      moveButton(buttonIndex, moveIndex)
      return
    }

    const currentItem = buttons?.find(cItem => cItem.id === buttonId)
    if (!currentItem) return

    const targetOrderId =
      direction === "up" ? Number(currentItem.order_id) - 1 : Number(currentItem.order_id) + 1

    const targetItem = buttons?.find(item => item.order_id === targetOrderId)
    if (!targetItem) return

    const orderedItems = buttons?.map(item => {
      if (item.id === currentItem.id) {
        return { id: Number(item.id), order_id: Number(targetItem.order_id) }
      } else if (item.id === targetItem.id) {
        return { id: Number(item.id), order_id: Number(currentItem.order_id) }
      } else {
        return { id: Number(item.id), order_id: Number(item.order_id) }
      }
    })

    orderedItems && changeButtonsOrder.mutate(orderedItems)
  }

  const remove = () => {
    if (buttonId) deleteButton.mutate(buttonId)
    removeButton(buttonIndex)
  }

  useEffect(() => {
    if (!buttonColor) changeButtonColor("#aabbcc")
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="rounded-[20px] border border-solid border-stroke p-8">
      <div className="flex gap-5">
        <div className="flex-1 space-y-10">
          <Typography variant="pageSubtitle">
            Кнопка {buttonIndex + 1}: {buttonTitle}
          </Typography>
          <div className="grid grid-cols-3 items-end gap-5">
            <div className="flex-1">
              <Input
                label="Название кнопки"
                {...register(`buttons.${buttonIndex}.title`)}
                error={!!errors?.buttons?.[buttonIndex]?.title}
              />
            </div>
            <div className="flex-1">
              <Input
                label="Параметр"
                {...register(`buttons.${buttonIndex}.api_key_param`)}
                error={!!errors?.buttons?.[buttonIndex]?.api_key_param}
              />
            </div>
            <div className="flex-1">
              <Input
                label="Навзание команды"
                {...register(`buttons.${buttonIndex}.api_command_name`)}
                error={!!errors?.buttons?.[buttonIndex]?.api_command_name}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 items-end gap-5">
            <div className="flex-1">
              <span className="select-none font-montserrat-medium text-sm text-t-black">
                Цвет кнопки
              </span>
              <ColorPicker color={buttonColor} changeColor={changeButtonColor} />
            </div>
            <div className="flex-1">
              <Controller
                name={`buttons.${buttonIndex}.action_type`}
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <Select
                    name={name}
                    label="Тип кнопки"
                    placeholder="Оберіть"
                    options={buttonActionTypesArray}
                    value={buttonActionTypesArray.find(c => c.value === value)}
                    onChange={option => {
                      if (option) {
                        setValue(`buttons.${buttonIndex}.action`, null)
                        onChange(option.value)
                      }
                    }}
                    error={!!errors?.buttons?.[buttonIndex]?.action_type}
                  />
                )}
              />
            </div>
            {actionType === ButtonActionTypeEnum.SendRequest && (
              <Input
                label="Роут для API"
                {...register(`buttons.${buttonIndex}.api_route`)}
                error={!!errors?.buttons?.[buttonIndex]?.api_route}
              />
            )}
            {actionType === ButtonActionTypeEnum.GoToPage && (
              <div className="flex-1">
                <Controller
                  name={`buttons.${buttonIndex}.action`}
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <Select
                      name={name}
                      label="Выбор из списка действия"
                      placeholder="Оберіть"
                      isLoading={isLoadingOnWebPages}
                      options={webPagesOptions}
                      value={webPagesOptions?.find(c => c.value === Number(value))}
                      onChange={option => option && onChange(option.value)}
                      error={!!errors?.buttons?.[buttonIndex]?.action}
                    />
                  )}
                />
              </div>
            )}
          </div>
          <div className="flex gap-5">
            <div className="w-full max-w-[786px]">
              <Input
                label="Текст предупреждения"
                {...register(`buttons.${buttonIndex}.alert_message`)}
                error={!!errors?.buttons?.[buttonIndex]?.alert_message}
              />
            </div>
            <div className="mt-9">
              <Checkbox
                id={`show-alert-${buttonIndex}`}
                label="Предупреждение"
                checked={buttonShowAlert === 1}
                onCheckedChange={handleChangeShowAlert}
              />
            </div>
          </div>
        </div>
        <div className="w-[88px]">
          <Button
            type="button"
            variant="text"
            className="h-7 w-fit p-1"
            onClick={remove}
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
    </div>
  )
}
export default TableButton
