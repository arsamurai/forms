import { FC, useEffect, useRef } from "react"
import { Controller, useFormContext } from "react-hook-form"

import {
  FieldTypeEnum,
  FillableFormSchema,
  useChangeFieldsOrderMutation,
  useDeleteFillableFieldMutation,
} from "@services/fillable-forms-service"

import {
  AccordionContent,
  AccordionHeader,
  AccordionItem,
  AccordionTrigger,
} from "@shared/ui/accordion"
import { Button } from "@shared/ui/buttons"
import { Checkbox, Input, Select } from "@shared/ui/fields"
import { Typography } from "@shared/ui/typography"
import { cn } from "@shared/utils/cn"

import ArrowIcon from "@assets/icons/arrow.svg"
import CloseIcon from "@assets/icons/close.svg"

import { fieldsTypesArray } from "./constants/fields-types-array"
import {
  ImageType,
  MultipleImageType,
  SelectType,
  TextEditorType,
  TextType,
  TextareaType,
} from "./field-types"
import { FormFieldProps } from "./form-field.types"

const FormField: FC<FormFieldProps> = ({ containerIndex, fieldIndex, removeField, moveField }) => {
  const deleteFillableField = useDeleteFillableFieldMutation()
  const changeFiedlsOrder = useChangeFieldsOrderMutation()

  const {
    register,
    control,
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FillableFormSchema>()

  const fields = getValues(`containers.${containerIndex}.fields`)
  const fieldId = getValues(`containers.${containerIndex}.fields.${fieldIndex}.id`)
  const prevFieldId = getValues(`containers.${containerIndex}.fields.${fieldIndex - 1}.id`)
  const nextFieldId = getValues(`containers.${containerIndex}.fields.${fieldIndex + 1}.id`)
  const fieldTitle = watch(`containers.${containerIndex}.fields.${fieldIndex}.field_title`)
  const fieldType = watch(`containers.${containerIndex}.fields.${fieldIndex}.type`)
  const isMultiSelect = watch(`containers.${containerIndex}.fields.${fieldIndex}.is_multiselect`)
  const prevFieldTypeRef = useRef(fieldType)
  const isDisabledMoveUpButton =
    (!fieldId && !!prevFieldId) || fieldIndex === 0 || changeFiedlsOrder.isPending
  const isDisabledMoveDownButton =
    (!!fieldId && !nextFieldId) || fieldIndex + 1 === fields.length || changeFiedlsOrder.isPending

  const handleChangeMultiSelect = () => {
    setValue(`containers.${containerIndex}.fields.${fieldIndex}.is_multiselect`, !isMultiSelect, {
      shouldDirty: true,
    })
  }

  const move = (direction: "up" | "down") => {
    if (!fieldId) {
      const moveIndex = direction === "up" ? fieldIndex - 1 : fieldIndex + 1
      moveField(fieldIndex, moveIndex)
      return
    }

    const currentItem = fields.find(cItem => cItem.id === fieldId)
    if (!currentItem) return

    const targetOrderId =
      direction === "up" ? Number(currentItem.order_id) - 1 : Number(currentItem.order_id) + 1

    const targetItem = fields.find(item => item.order_id === targetOrderId)
    if (!targetItem) return

    const orderedItems = fields.map(item => {
      if (item.id === currentItem.id) {
        return { id: Number(item.id), order_id: Number(targetItem.order_id) }
      } else if (item.id === targetItem.id) {
        return { id: Number(item.id), order_id: Number(currentItem.order_id) }
      } else {
        return { id: Number(item.id), order_id: Number(item.order_id) }
      }
    })

    orderedItems && changeFiedlsOrder.mutate(orderedItems)
  }

  const remove = () => {
    if (fieldId) deleteFillableField.mutate(fieldId)
    removeField(fieldIndex)
  }

  useEffect(() => {
    const clearFieldTypeData = () => {
      setValue(`containers.${containerIndex}.fields.${fieldIndex}.placeholder`, null)
      setValue(`containers.${containerIndex}.fields.${fieldIndex}.validators`, null)
      setValue(`containers.${containerIndex}.fields.${fieldIndex}.show_max_length`, null)
      setValue(`containers.${containerIndex}.fields.${fieldIndex}.image_upload_route`, null)
      setValue(`containers.${containerIndex}.fields.${fieldIndex}.image_delete_route`, null)
      setValue(`containers.${containerIndex}.fields.${fieldIndex}.upload_param`, null)
      setValue(`containers.${containerIndex}.fields.${fieldIndex}.options_route`, null)
      setValue(`containers.${containerIndex}.fields.${fieldIndex}.route_param`, null)
      setValue(`containers.${containerIndex}.fields.${fieldIndex}.is_multiselect`, null)
      setValue(`containers.${containerIndex}.fields.${fieldIndex}.max_files`, null)
      setValue(`containers.${containerIndex}.fields.${fieldIndex}.max_file_size`, null)
      setValue(`containers.${containerIndex}.fields.${fieldIndex}.max_resolution`, null)
      setValue(`containers.${containerIndex}.fields.${fieldIndex}.file_types`, null)
      setValue(
        `containers.${containerIndex}.fields.${fieldIndex}.folder_hierarchy_complexity`,
        null,
      )
    }

    if (prevFieldTypeRef.current !== fieldType) {
      clearFieldTypeData()
      prevFieldTypeRef.current = fieldType
    }
  }, [containerIndex, fieldIndex, fieldType, setValue])

  const FieldVariant = {
    [FieldTypeEnum.TextInput]: TextType,
    [FieldTypeEnum.Textarea]: TextareaType,
    [FieldTypeEnum.TextEditor]: TextEditorType,
    [FieldTypeEnum.Select]: SelectType,
    [FieldTypeEnum.Image]: ImageType,
    [FieldTypeEnum.MultiImage]: MultipleImageType,
  }

  const Field = fieldType ? FieldVariant[fieldType] : null

  return (
    <AccordionItem
      value={`field-${containerIndex}-${fieldIndex}`}
      className={cn("rounded-[20px] border border-solid border-stroke", {
        "border-error": errors?.containers?.[containerIndex]?.fields?.[fieldIndex],
      })}
    >
      <AccordionHeader>
        <AccordionTrigger className="p-5">
          <Typography variant="fieldTitle">
            Поле {fieldIndex + 1}: {fieldTitle}
          </Typography>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent>
        <div className="space-y-5">
          <div className="flex items-center gap-5">
            <div className="flex-1">
              <Input
                label="Название поля"
                placeholder="Название поля"
                {...register(`containers.${containerIndex}.fields.${fieldIndex}.field_title`)}
                error={!!errors?.containers?.[containerIndex]?.fields?.[fieldIndex]?.field_title}
              />
            </div>
            <div className="flex-1">
              <Input
                label="Name поля"
                placeholder="title"
                {...register(`containers.${containerIndex}.fields.${fieldIndex}.field_name`)}
                error={!!errors?.containers?.[containerIndex]?.fields?.[fieldIndex]?.field_name}
              />
            </div>
            <div className="w-48">
              <Input
                label="Размер"
                placeholder="col-lg-3 col-md-6"
                {...register(`containers.${containerIndex}.fields.${fieldIndex}.size`)}
                error={!!errors?.containers?.[containerIndex]?.fields?.[fieldIndex]?.size}
              />
            </div>
            <div className="w-[88px]">
              <Button
                type="button"
                variant="text"
                className="h-7 w-fit p-1"
                onClick={remove}
                disabled={fields.length === 1}
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
          <div className="flex max-w-[calc(100%-108px)] items-end gap-5">
            <div className="flex-1">
              <Input
                label="Текст под label"
                placeholder="label"
                {...register(`containers.${containerIndex}.fields.${fieldIndex}.field_text`)}
                error={!!errors?.containers?.[containerIndex]?.fields?.[fieldIndex]?.field_text}
              />
            </div>
            <div className="flex-1">
              <Input
                label="Ключ к данным, для заполнения"
                placeholder="title"
                {...register(`containers.${containerIndex}.fields.${fieldIndex}.api_key`)}
                error={!!errors?.containers?.[containerIndex]?.fields?.[fieldIndex]?.api_key}
              />
            </div>
          </div>
          <div className="grid max-w-[calc(100%-108px)] grid-cols-2 gap-5">
            <Controller
              name={`containers.${containerIndex}.fields.${fieldIndex}.type`}
              control={control}
              render={({ field: { name, value, onChange } }) => (
                <Select
                  name={name}
                  label="Тип поля"
                  placeholder="Оберіть"
                  options={fieldsTypesArray}
                  value={fieldsTypesArray.find(c => c.value === value)}
                  onChange={option => option && onChange(option.value)}
                  error={!!errors?.containers?.[containerIndex]?.fields?.[fieldIndex]?.type}
                />
              )}
            />
            {fieldType === FieldTypeEnum.Select && (
              <div className="mt-9">
                <Checkbox
                  id={`is-multi-select-${containerIndex}-${fieldIndex}`}
                  label="Мультиселект"
                  checked={isMultiSelect ?? false}
                  onCheckedChange={handleChangeMultiSelect}
                />
              </div>
            )}
          </div>
          {Field && <Field containerIndex={containerIndex} fieldIndex={fieldIndex} />}
        </div>
      </AccordionContent>
    </AccordionItem>
  )
}
export default FormField
