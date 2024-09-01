import { FC } from "react"
import { Controller, useFormContext } from "react-hook-form"

import {
  ViewSchema,
  ViewTypeEnum,
  useChangeViewTabsOrderMutation,
  useDeleteViewTabMutation,
  useViewListQuery,
} from "@services/view-service"

import { Button } from "@shared/ui/buttons"
import { Input, Select } from "@shared/ui/fields"
import { Typography } from "@shared/ui/typography"
import { formatSelectOptions } from "@shared/utils/format-select-options"

import ArrowIcon from "@assets/icons/arrow.svg"
import CloseIcon from "@assets/icons/close.svg"

import { ViewTabProps } from "./view-tab.types"

const ViewTab: FC<ViewTabProps> = ({ tabIndex, removeTab, moveTab }) => {
  const deleteTab = useDeleteViewTabMutation()
  const changeTabsOrder = useChangeViewTabsOrderMutation()

  const {
    register,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<ViewSchema>()

  const tabs = getValues("tabs")
  const tabId = getValues(`tabs.${tabIndex}.id`)
  const prevTabId = getValues(`tabs.${tabIndex - 1}.id`)
  const nextTabId = getValues(`tabs.${tabIndex + 1}.id`)
  const tabTitle = watch(`tabs.${tabIndex}.title`)

  const isDisabledMoveUpButton =
    (!tabId && !!prevTabId) || tabIndex === 0 || changeTabsOrder.isPending
  const isDisabledMoveDownButton =
    (!!tabId && !nextTabId) || tabIndex + 1 === tabs?.length || changeTabsOrder.isPending

  const { data: viewList, isLoading: isLoadingOnViewList } = useViewListQuery()
  const viewListOptions = formatSelectOptions(
    viewList?.filter(item => item.type === ViewTypeEnum.BLOCKS),
  )

  const move = (direction: "up" | "down") => {
    if (!tabId) {
      const moveIndex = direction === "up" ? tabIndex - 1 : tabIndex + 1
      moveTab(tabIndex, moveIndex)
      return
    }

    const currentItem = tabs?.find(cItem => cItem.id === tabId)
    if (!currentItem) return

    const targetOrderId =
      direction === "up" ? Number(currentItem.order_id) - 1 : Number(currentItem.order_id) + 1

    const targetItem = tabs?.find(item => item.order_id === targetOrderId)
    if (!targetItem) return

    const orderedItems = tabs?.map(item => {
      if (item.id === currentItem.id) {
        return { id: Number(item.id), order_id: Number(targetItem.order_id) }
      } else if (item.id === targetItem.id) {
        return { id: Number(item.id), order_id: Number(currentItem.order_id) }
      } else {
        return { id: Number(item.id), order_id: Number(item.order_id) }
      }
    })

    orderedItems && changeTabsOrder.mutate(orderedItems)
  }

  const remove = () => {
    if (tabId) deleteTab.mutate(tabId)
    removeTab(tabIndex)
  }

  return (
    <div className="rounded-[20px] border border-solid border-stroke p-8">
      <div className="flex gap-5">
        <div className="flex-1 space-y-10">
          <Typography variant="pageSubtitle">
            Таб {tabIndex + 1}: {tabTitle}
          </Typography>
          <div className="flex items-end gap-5">
            <div className="flex-1">
              <Input
                label="Название блока"
                {...register(`tabs.${tabIndex}.title`)}
                error={!!errors?.tabs?.[tabIndex]?.title}
              />
            </div>
            <div className="flex-1">
              <Input
                label="Url таба"
                {...register(`tabs.${tabIndex}.tab_url`)}
                error={!!errors?.tabs?.[tabIndex]?.tab_url}
              />
            </div>
          </div>
          <div className="flex items-end gap-5">
            <div className="flex-1">
              <Controller
                name={`tabs.${tabIndex}.entity_id`}
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <Select
                    name={name}
                    label="Тип блока"
                    placeholder="Оберіть"
                    options={viewListOptions}
                    isLoading={isLoadingOnViewList}
                    value={viewListOptions?.find(c => c.value === value) ?? null}
                    onChange={option => option && onChange(option.value)}
                    error={!!errors?.tabs?.[tabIndex]?.entity_id}
                  />
                )}
              />
            </div>
          </div>
          <div className="w-full max-w-[484px]">
            <Input
              label="Параметры к отображению"
              {...register(`tabs.${tabIndex}.params`)}
              error={!!errors?.tabs?.[tabIndex]?.params}
            />
          </div>
          <div className="sm:w-48">
            <Input
              label="Иконка"
              {...register(`tabs.${tabIndex}.icon`)}
              error={!!errors?.tabs?.[tabIndex]?.icon}
            />
          </div>
        </div>
        <div className="w-[88px]">
          <Button
            type="button"
            variant="text"
            className="h-7 w-fit p-1"
            onClick={remove}
            disabled={tabs?.length === 1}
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
export default ViewTab
