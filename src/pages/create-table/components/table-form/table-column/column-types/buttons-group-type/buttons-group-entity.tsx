import { FC } from "react"
import { Controller, useFormContext } from "react-hook-form"

import { useModalsQuery } from "@services/modals-service"
import { useOffcanvasListQuery } from "@services/offcanvas-service"
import {
  ButtonActionTypeEnum,
  TableSchema,
  useChangeColumnButtonsOrderMutation,
  useDeleteColumnButtonMutation,
} from "@services/tables-service"
import { useWebpagesQuery } from "@services/webpages-service"

import { buttonVariantsArray } from "@shared/constants"
import { Button } from "@shared/ui/buttons"
import { Checkbox, Input, Select } from "@shared/ui/fields"
import { Typography } from "@shared/ui/typography"
import { formatSelectOptions } from "@shared/utils/format-select-options"

import ArrowIcon from "@assets/icons/arrow.svg"
import CloseIcon from "@assets/icons/close.svg"

import { TableButtonProps, buttonActionTypesArray } from "../../../table-button"

const ButtonsGroupEntity: FC<TableButtonProps & { columnIndex: number }> = ({
  columnIndex,
  buttonIndex,
  removeButton,
  moveButton,
}) => {
  const deleteButton = useDeleteColumnButtonMutation()
  const changeButtonsOrder = useChangeColumnButtonsOrderMutation()

  const {
    register,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<TableSchema>()

  const buttons = getValues(`columns.${columnIndex}.buttons`) ?? []
  const buttonId = getValues(`columns.${columnIndex}.buttons.${buttonIndex}.id`)
  const prevButtonId = getValues(`columns.${columnIndex}.buttons.${buttonIndex - 1}.id`)
  const nextButtonId = getValues(`columns.${columnIndex}.buttons.${buttonIndex + 1}.id`)
  const buttonTitle = watch(`columns.${columnIndex}.buttons.${buttonIndex}.title`)
  const buttonShowAlert = watch(`columns.${columnIndex}.buttons.${buttonIndex}.show_alert`)
  const actionType = watch(`columns.${columnIndex}.buttons.${buttonIndex}.action_type`)
  const isDisabledMoveUpButton =
    (!buttonId && !!prevButtonId) || buttonIndex === 0 || changeButtonsOrder.isPending
  const isDisabledMoveDownButton =
    (!!buttonId && !nextButtonId) ||
    buttonIndex + 1 === buttons.length ||
    changeButtonsOrder.isPending

  const { data: webPages, isLoading: isLoadingOnWebPages } = useWebpagesQuery(
    actionType === ButtonActionTypeEnum.GoToPage,
  )
  const { data: modals, isLoading: isLoadingOnModals } = useModalsQuery(
    actionType === ButtonActionTypeEnum.OpenModal,
  )
  const { data: offcanvasList, isLoading: isLoadingOnOffcanvasList } = useOffcanvasListQuery(
    actionType === ButtonActionTypeEnum.Offcanvas,
  )
  const isActionLoading = isLoadingOnWebPages || isLoadingOnModals || isLoadingOnOffcanvasList

  const getActionOptions = () => {
    switch (actionType) {
      case ButtonActionTypeEnum.GoToPage:
        return formatSelectOptions(webPages)
      case ButtonActionTypeEnum.OpenModal:
        return formatSelectOptions(modals)
      case ButtonActionTypeEnum.Offcanvas:
        return formatSelectOptions(offcanvasList)
      default:
        return []
    }
  }

  const getSpecialField = () => {
    switch (actionType) {
      case ButtonActionTypeEnum.SendRequest:
        return (
          <div className="flex-1">
            <Input
              label="Роут для API"
              {...register(`columns.${columnIndex}.buttons.${buttonIndex}.api_route`)}
              error={!!errors?.columns?.[columnIndex]?.buttons?.[buttonIndex]?.api_route}
            />
          </div>
        )
      case ButtonActionTypeEnum.GoToPage:
      case ButtonActionTypeEnum.OpenModal:
      case ButtonActionTypeEnum.Offcanvas:
        return (
          <div className="flex-1">
            <Controller
              name={`columns.${columnIndex}.buttons.${buttonIndex}.action`}
              control={control}
              render={({ field: { name, value, onChange } }) => (
                <Select
                  name={name}
                  label="Выбор из списка действия"
                  placeholder="Оберіть"
                  isLoading={isActionLoading}
                  options={getActionOptions()}
                  value={getActionOptions()?.find(c => c.value === Number(value)) ?? null}
                  onChange={option => option && onChange(option.value)}
                  error={!!errors?.columns?.[columnIndex]?.buttons?.[buttonIndex]?.action}
                />
              )}
            />
          </div>
        )
    }
  }

  const handleChangeShowAlert = () => {
    setValue(
      `columns.${columnIndex}.buttons.${buttonIndex}.show_alert`,
      buttonShowAlert === 1 ? 0 : 1,
      {
        shouldDirty: true,
      },
    )
  }

  const move = (direction: "up" | "down") => {
    if (!buttonId) {
      const moveIndex = direction === "up" ? buttonIndex - 1 : buttonIndex + 1
      moveButton(buttonIndex, moveIndex)
      return
    }

    const currentItem = buttons.find(cItem => cItem.id === buttonId)
    if (!currentItem) return

    const targetOrderId =
      direction === "up" ? Number(currentItem.order_id) - 1 : Number(currentItem.order_id) + 1

    const targetItem = buttons.find(item => item.order_id === targetOrderId)
    if (!targetItem) return

    const orderedItems = buttons.map(item => {
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
                {...register(`columns.${columnIndex}.buttons.${buttonIndex}.title`)}
                error={!!errors?.columns?.[columnIndex]?.buttons?.[buttonIndex]?.title}
              />
            </div>
            <div className="flex-1">
              <Input
                label="Параметр"
                {...register(`columns.${columnIndex}.buttons.${buttonIndex}.api_key_param`)}
                error={!!errors?.columns?.[columnIndex]?.buttons?.[buttonIndex]?.api_key_param}
              />
            </div>
            <div className="flex-1">
              <Input
                label="Навзание команды"
                {...register(`columns.${columnIndex}.buttons.${buttonIndex}.api_command_name`)}
                error={!!errors?.columns?.[columnIndex]?.buttons?.[buttonIndex]?.api_command_name}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 items-end gap-5">
            <div className="flex-1">
              <Controller
                name={`columns.${columnIndex}.buttons.${buttonIndex}.color`}
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <Select
                    name={name}
                    label="Вариант кнопки"
                    placeholder="Оберіть"
                    options={buttonVariantsArray}
                    value={buttonVariantsArray.find(c => c.value === value)}
                    onChange={option => option && onChange(option.value)}
                    error={!!errors?.columns?.[columnIndex]?.buttons?.[buttonIndex]?.color}
                  />
                )}
              />
            </div>
            <div className="flex-1">
              <Controller
                name={`columns.${columnIndex}.buttons.${buttonIndex}.action_type`}
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
                        setValue(`columns.${columnIndex}.buttons.${buttonIndex}.action`, null)
                        onChange(option.value)
                      }
                    }}
                    error={!!errors?.columns?.[columnIndex]?.buttons?.[buttonIndex]?.action_type}
                  />
                )}
              />
            </div>
            {getSpecialField()}
          </div>
          <div className="flex gap-5">
            <div className="w-full max-w-[786px]">
              <Input
                label="Текст предупреждения"
                {...register(`columns.${columnIndex}.buttons.${buttonIndex}.alert_message`)}
                error={!!errors?.columns?.[columnIndex]?.buttons?.[buttonIndex]?.alert_message}
              />
            </div>
            <div className="mt-9">
              <Checkbox
                id={`show-alert-${columnIndex}-${buttonIndex}`}
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
            disabled={buttons.length === 1}
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
export default ButtonsGroupEntity
