import { FC } from "react"
import { Controller, useFormContext } from "react-hook-form"

import { ClearFormSchema } from "@services/clear-forms-service"

import { Input, Select } from "@shared/ui/fields"
import { MaskInput } from "@shared/ui/fields/input"

import { fileTypesArray } from "./constants/file-types-array"
import { folderHierarchyArray } from "./constants/folder-hierarchy-array"

const MultipleImageType: FC<{ containerIndex: number; fieldIndex: number }> = ({
  containerIndex,
  fieldIndex,
}) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ClearFormSchema>()

  return (
    <div className="space-y-5">
      <div className="grid max-w-[calc(100%-108px)] grid-cols-2 gap-5">
        <Input
          label="Параметр для загрузки"
          placeholder='{"entity": "Post", "id": 12}'
          {...register(`containers.${containerIndex}.fields.${fieldIndex}.upload_param`)}
          error={!!errors?.containers?.[containerIndex]?.fields?.[fieldIndex]?.upload_param}
        />
      </div>
      <div className="flex max-w-[calc(100%-108px)] items-end gap-5">
        <div className="flex-1">
          <Controller
            name={`containers.${containerIndex}.fields.${fieldIndex}.max_files`}
            control={control}
            render={({ field: { name, value, onChange } }) => {
              return (
                <MaskInput
                  mask={Number}
                  min={1}
                  label="Максимальное количество изображений"
                  placeholder="1"
                  name={name}
                  value={value?.toString() ?? ""}
                  onAccept={maskedValue => onChange(Number(maskedValue))}
                  error={!!errors?.containers?.[containerIndex]?.fields?.[fieldIndex]?.max_files}
                />
              )
            }}
          />
        </div>
        <div className="flex-1">
          <Controller
            name={`containers.${containerIndex}.fields.${fieldIndex}.max_file_size`}
            control={control}
            render={({ field: { name, value, onChange } }) => {
              return (
                <MaskInput
                  mask={Number}
                  min={1}
                  label="Максимальный размер изображений"
                  placeholder="2MB"
                  name={name}
                  value={value?.toString() ?? ""}
                  onAccept={maskedValue => onChange(Number(maskedValue))}
                  error={
                    !!errors?.containers?.[containerIndex]?.fields?.[fieldIndex]?.max_file_size
                  }
                />
              )
            }}
          />
        </div>
        <div className="flex-1">
          <Input
            label="Максимальное разрешение файла"
            placeholder="1920x1080"
            {...register(`containers.${containerIndex}.fields.${fieldIndex}.max_resolution`)}
            error={!!errors?.containers?.[containerIndex]?.fields?.[fieldIndex]?.max_resolution}
          />
        </div>
      </div>
      <div className="flex max-w-[calc(100%-108px)] items-end gap-5">
        <div className="flex-1">
          <Input
            label="Роут для загрузки изображений на сервер"
            placeholder="/api/v1/upload/gallery"
            {...register(`containers.${containerIndex}.fields.${fieldIndex}.image_upload_route`)}
            error={!!errors?.containers?.[containerIndex]?.fields?.[fieldIndex]?.image_upload_route}
          />
        </div>
        <div className="flex-1">
          <Input
            label="Роут для удаления изображений на сервер"
            placeholder="/api/v1/delete/gallery"
            {...register(`containers.${containerIndex}.fields.${fieldIndex}.image_delete_route`)}
            error={!!errors?.containers?.[containerIndex]?.fields?.[fieldIndex]?.image_delete_route}
          />
        </div>
      </div>
      <div className="flex max-w-[calc(100%-108px)] items-end gap-5">
        <div className="flex-1">
          <Controller
            name={`containers.${containerIndex}.fields.${fieldIndex}.file_types`}
            control={control}
            render={({ field: { name, value, onChange } }) => (
              <Select
                name={name}
                label="Типы файлов"
                placeholder="Оберіть"
                isMulti
                options={fileTypesArray}
                value={fileTypesArray.filter(c => value?.includes(c.value)) ?? []}
                onChange={options => onChange(options?.map(option => option.value))}
                hideSelectedOptions={false}
                closeMenuOnSelect={false}
                error={!!errors?.containers?.[containerIndex]?.fields?.[fieldIndex]?.file_types}
              />
            )}
          />
        </div>
        <div className="flex-1">
          <Controller
            name={`containers.${containerIndex}.fields.${fieldIndex}.folder_hierarchy_complexity`}
            control={control}
            render={({ field: { name, value, onChange } }) => (
              <Select
                name={name}
                label="Сложность иерархии папок"
                placeholder="Оберіть"
                options={folderHierarchyArray}
                value={folderHierarchyArray.find(c => c.value === value)}
                onChange={option => option && onChange(option.value)}
                error={
                  !!errors?.containers?.[containerIndex]?.fields?.[fieldIndex]
                    ?.folder_hierarchy_complexity
                }
              />
            )}
          />
        </div>
      </div>
    </div>
  )
}
export default MultipleImageType
