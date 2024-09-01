import { Controller, useFormContext } from "react-hook-form"

import { ViewSchema } from "@services/view-service"

import { Input, Select } from "@shared/ui/fields"

import { viewTypeArray } from "./constants/view-type-array"

const MainForm = () => {
  const {
    register,
    control,
    getValues,
    formState: { errors },
  } = useFormContext<ViewSchema>()

  const viewId = getValues("id")

  return (
    <div className="space-y-10">
      <div className="flex items-end gap-5">
        <div className="w-1/2">
          <Input label="Название" {...register("title")} error={!!errors?.title} />
        </div>
        <div className="w-1/2">
          <Input label="Уникальный ID" {...register("unique_id")} error={!!errors?.unique_id} />
        </div>
      </div>
      <div className="flex items-end gap-5">
        <div className="w-1/2">
          <Controller
            name="type"
            control={control}
            render={({ field: { name, value, onChange } }) => (
              <Select
                name={name}
                label="Тип отображения"
                placeholder="Оберіть"
                options={viewTypeArray}
                isDisabled={!!viewId}
                value={viewTypeArray?.find(c => c.value === value) ?? null}
                onChange={option => option && onChange(option.value)}
                error={!!errors?.type}
              />
            )}
          />
        </div>
      </div>
    </div>
  )
}
export default MainForm
