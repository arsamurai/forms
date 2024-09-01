import { FC } from "react"
import { Controller, useFormContext } from "react-hook-form"

import { useClearFormsQuery } from "@services/clear-forms-service"
import { useFillableFormsQuery } from "@services/fillable-forms-service"
import { useTablesQuery } from "@services/tables-service"
import {
  ContentTypeEnum,
  ViewSchema,
  useChangeViewBlocksOrderMutation,
  useDeleteViewBlockMutation,
} from "@services/view-service"

import { Button } from "@shared/ui/buttons"
import { Input, Select } from "@shared/ui/fields"
import { Typography } from "@shared/ui/typography"
import { formatSelectOptions } from "@shared/utils/format-select-options"

import ArrowIcon from "@assets/icons/arrow.svg"
import CloseIcon from "@assets/icons/close.svg"

import { contentTypeArray } from "./constants/content-type-array"
import { ViewBlockProps } from "./view-block.types"

const ViewBlock: FC<ViewBlockProps> = ({ blockIndex, removeBlock, moveBlock }) => {
  const deleteBlock = useDeleteViewBlockMutation()
  const changeBlocksOrder = useChangeViewBlocksOrderMutation()

  const {
    register,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext<ViewSchema>()

  const blocks = getValues("blocks")
  const blockId = getValues(`blocks.${blockIndex}.id`)
  const prevBlockId = getValues(`blocks.${blockIndex - 1}.id`)
  const nextBlockId = getValues(`blocks.${blockIndex + 1}.id`)
  const blockTitle = watch(`blocks.${blockIndex}.title`)
  const contentType = watch(`blocks.${blockIndex}.content_type`)

  const isDisabledMoveUpButton =
    (!blockId && !!prevBlockId) || blockIndex === 0 || changeBlocksOrder.isPending
  const isDisabledMoveDownButton =
    (!!blockId && !nextBlockId) || blockIndex + 1 === blocks?.length || changeBlocksOrder.isPending
  const isEntitySelect =
    contentType === ContentTypeEnum.Table ||
    contentType === ContentTypeEnum.FillableForm ||
    contentType === ContentTypeEnum.ClearForm

  const { data: tables, isLoading: isLoadingOnTables } = useTablesQuery(
    contentType === ContentTypeEnum.Table,
  )
  const { data: clearForms, isLoading: isLoadingOnClearForms } = useClearFormsQuery(
    contentType === ContentTypeEnum.ClearForm,
  )
  const { data: fillableForms, isLoading: isLoadingOnFillableForms } = useFillableFormsQuery(
    contentType === ContentTypeEnum.FillableForm,
  )
  const isEntityIdLoading = isLoadingOnTables || isLoadingOnClearForms || isLoadingOnFillableForms

  const getEntityIdOptions = () => {
    switch (contentType) {
      case ContentTypeEnum.Table:
        return formatSelectOptions(tables)
      case ContentTypeEnum.ClearForm:
        return formatSelectOptions(clearForms)
      case ContentTypeEnum.FillableForm:
        return formatSelectOptions(fillableForms)
      default:
        return []
    }
  }

  const move = (direction: "up" | "down") => {
    if (!blockId) {
      const moveIndex = direction === "up" ? blockIndex - 1 : blockIndex + 1
      moveBlock(blockIndex, moveIndex)
      return
    }

    const currentItem = blocks?.find(cItem => cItem.id === blockId)
    if (!currentItem) return

    const targetOrderId =
      direction === "up" ? Number(currentItem.order_id) - 1 : Number(currentItem.order_id) + 1

    const targetItem = blocks?.find(item => item.order_id === targetOrderId)
    if (!targetItem) return

    const orderedItems = blocks?.map(item => {
      if (item.id === currentItem.id) {
        return { id: Number(item.id), order_id: Number(targetItem.order_id) }
      } else if (item.id === targetItem.id) {
        return { id: Number(item.id), order_id: Number(currentItem.order_id) }
      } else {
        return { id: Number(item.id), order_id: Number(item.order_id) }
      }
    })

    orderedItems && changeBlocksOrder.mutate(orderedItems)
  }

  const remove = () => {
    if (blockId) deleteBlock.mutate(blockId)
    removeBlock(blockIndex)
  }

  return (
    <div className="rounded-[20px] border border-solid border-stroke p-8">
      <div className="flex gap-5">
        <div className="flex-1 space-y-10">
          <Typography variant="pageSubtitle">
            Блок {blockIndex + 1}: {blockTitle}
          </Typography>
          <div className="flex items-end gap-5">
            <div className="flex-1">
              <Input
                label="Название блока"
                {...register(`blocks.${blockIndex}.title`)}
                error={!!errors?.blocks?.[blockIndex]?.title}
              />
            </div>
            <div className="w-48">
              <Input
                label="Размер"
                placeholder="col-lg-3 col-md-6"
                {...register(`blocks.${blockIndex}.size`)}
                error={!!errors?.blocks?.[blockIndex]?.size}
              />
            </div>
          </div>
          <div className="flex items-end gap-5">
            <div className="flex-1">
              <Controller
                name={`blocks.${blockIndex}.content_type`}
                control={control}
                render={({ field: { name, value, onChange } }) => (
                  <Select
                    name={name}
                    label="Тип блока"
                    placeholder="Оберіть"
                    options={contentTypeArray}
                    value={contentTypeArray?.find(c => c.value === value) ?? null}
                    onChange={option => {
                      if (option) {
                        setValue(`blocks.${blockIndex}.entity_id`, null)
                        onChange(option.value)
                      }
                    }}
                    error={!!errors?.blocks?.[blockIndex]?.content_type}
                  />
                )}
              />
            </div>
            {isEntitySelect && (
              <div className="flex-1">
                <Controller
                  name={`blocks.${blockIndex}.entity_id`}
                  control={control}
                  render={({ field: { name, value, onChange } }) => (
                    <Select
                      name={name}
                      label="Что отображаем"
                      placeholder="Оберіть"
                      isLoading={isEntityIdLoading}
                      options={getEntityIdOptions()}
                      value={getEntityIdOptions()?.find(c => c.value === value) ?? null}
                      onChange={option => option && onChange(option.value)}
                      error={!!errors?.blocks?.[blockIndex]?.entity_id}
                    />
                  )}
                />
              </div>
            )}
          </div>
          <div className="flex items-end gap-5">
            <div className="flex-1">
              <Input
                label="Название (title) блока"
                {...register(`blocks.${blockIndex}.content_title`)}
                error={!!errors?.blocks?.[blockIndex]?.content_title}
              />
            </div>
            <div className="flex-1">
              <Input
                label="Url запроса"
                {...register(`blocks.${blockIndex}.content_url`)}
                error={!!errors?.blocks?.[blockIndex]?.content_url}
              />
            </div>
            <div className="flex-1">
              <Input
                label="Параметры к запросу"
                {...register(`blocks.${blockIndex}.content_params`)}
                error={!!errors?.blocks?.[blockIndex]?.content_params}
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
            disabled={blocks?.length === 1}
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
export default ViewBlock
