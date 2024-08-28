import { FC, useEffect, useRef } from "react"
import { Controller, useFormContext } from "react-hook-form"

import {
  ColumnTypeEnum,
  TableSchema,
  useChangeColumnsOrderMutation,
  useDeleteColumnMutation,
} from "@services/tables-service"

import { Button } from "@shared/ui/buttons"
import { Checkbox, Input, Select } from "@shared/ui/fields"
import { Typography } from "@shared/ui/typography"

import ArrowIcon from "@assets/icons/arrow.svg"
import CloseIcon from "@assets/icons/close.svg"

import { BadgeType, ButtonsGroupType, LinkType, SwitchType, TextType } from "./column-types"
import { columnTypes } from "./constants/column-types.constants"
import { TableColumnProps } from "./table-column.types"

const TableColumn: FC<TableColumnProps> = ({ columnIndex, removeColumn, moveColumn }) => {
  const deleteColumn = useDeleteColumnMutation()
  const changeColumnsOrder = useChangeColumnsOrderMutation()

  const {
    register,
    control,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TableSchema>()

  const columns = getValues("columns")
  const columnId = getValues(`columns.${columnIndex}.id`)
  const prevColumnId = getValues(`columns.${columnIndex - 1}.id`)
  const nextColumnId = getValues(`columns.${columnIndex + 1}.id`)
  const columnTitle = watch(`columns.${columnIndex}.title`)
  const enableSort = watch(`columns.${columnIndex}.enable_sort`)
  const enableFilter = watch(`columns.${columnIndex}.enable_filter`)
  const columnType = watch(`columns.${columnIndex}.column_type`)
  const prevColumnTypeRef = useRef(columnType)
  const isDisabledMoveUpButton =
    (!columnId && !!prevColumnId) || columnIndex === 0 || changeColumnsOrder.isPending
  const isDisabledMoveDownButton =
    (!!columnId && !nextColumnId) ||
    columnIndex + 1 === columns.length ||
    changeColumnsOrder.isPending

  const handleChangeEnableSort = () => {
    setValue(`columns.${columnIndex}.enable_sort`, enableSort === 1 ? 0 : 1, {
      shouldDirty: true,
    })
  }

  const handleChangeEnableFilter = () => {
    setValue(`columns.${columnIndex}.enable_filter`, enableFilter === 1 ? 0 : 1, {
      shouldDirty: true,
    })
  }

  const move = (direction: "up" | "down") => {
    if (!columnId) {
      const moveIndex = direction === "up" ? columnIndex - 1 : columnIndex + 1
      moveColumn(columnIndex, moveIndex)
      return
    }

    const currentItem = columns.find(cItem => cItem.id === columnId)
    if (!currentItem) return

    const targetOrderId =
      direction === "up" ? Number(currentItem.order_id) - 1 : Number(currentItem.order_id) + 1

    const targetItem = columns.find(item => item.order_id === targetOrderId)
    if (!targetItem) return

    const orderedItems = columns.map(item => {
      if (item.id === currentItem.id) {
        return { id: Number(item.id), order_id: Number(targetItem.order_id) }
      } else if (item.id === targetItem.id) {
        return { id: Number(item.id), order_id: Number(currentItem.order_id) }
      } else {
        return { id: Number(item.id), order_id: Number(item.order_id) }
      }
    })

    orderedItems && changeColumnsOrder.mutate(orderedItems)
  }

  const remove = () => {
    if (columnId) deleteColumn.mutate(columnId)
    removeColumn(columnIndex)
  }

  useEffect(() => {
    const clearColumnTypeData = () => {
      setValue(`columns.${columnIndex}.api_object_key`, null)
      setValue(`columns.${columnIndex}.page`, null)
      setValue(`columns.${columnIndex}.api_key_param`, null)
      setValue(`columns.${columnIndex}.get_list_route`, null)
      setValue(`columns.${columnIndex}.api_route`, null)
      setValue(`columns.${columnIndex}.api_command_name`, null)
      setValue(`columns.${columnIndex}.buttons`, null)
    }

    if (prevColumnTypeRef.current !== columnType) {
      clearColumnTypeData()
      prevColumnTypeRef.current = columnType
    }
  }, [columnIndex, columnType, setValue])

  const ColumnVariant = {
    [ColumnTypeEnum.Text]: TextType,
    [ColumnTypeEnum.Link]: LinkType,
    [ColumnTypeEnum.Badge]: BadgeType,
    [ColumnTypeEnum.Switch]: SwitchType,
    [ColumnTypeEnum.ButtonsGroup]: ButtonsGroupType,
  }

  const Column = columnType ? ColumnVariant[columnType] : null

  return (
    <div className="space-y-10 rounded-[20px] border border-solid border-stroke p-5">
      <div className="flex gap-5">
        <div className="flex-1 space-y-10">
          <Typography variant="pageSubtitle">
            Колонка {columnIndex + 1}: {columnTitle}
          </Typography>
          <div className="flex gap-5">
            <div className="flex-1">
              <Input
                label="Название колонки"
                {...register(`columns.${columnIndex}.title`)}
                error={!!errors?.columns?.[columnIndex]?.title}
              />
            </div>
            <div className="mt-9">
              <Checkbox
                id={`enable-sort-${columnIndex}`}
                label="Сортировать"
                checked={enableSort === 1}
                onCheckedChange={handleChangeEnableSort}
              />
            </div>
            <div className="mt-9">
              <Checkbox
                id={`enable-filter-${columnIndex}`}
                label="Фильтровать"
                checked={enableFilter === 1}
                onCheckedChange={handleChangeEnableFilter}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <Controller
              name={`columns.${columnIndex}.column_type`}
              control={control}
              render={({ field: { name, value, onChange } }) => (
                <Select
                  name={name}
                  label="Тип отображения данных"
                  placeholder="Оберіть"
                  options={columnTypes}
                  value={columnTypes.find(c => c.value === value)}
                  onChange={option => option && onChange(option.value)}
                  error={!!errors?.columns?.[columnIndex]?.column_type}
                />
              )}
            />
          </div>
        </div>
        <div className="w-[88px]">
          <Button
            type="button"
            variant="text"
            className="h-7 w-fit p-1"
            onClick={remove}
            disabled={columns.length === 1}
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
      {Column && <Column columnIndex={columnIndex} />}
    </div>
  )
}
export default TableColumn
