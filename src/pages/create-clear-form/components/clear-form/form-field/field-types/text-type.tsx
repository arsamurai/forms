import { FC } from "react"
import { Controller, useFormContext } from "react-hook-form"

import { ClearFormSchema } from "@services/clear-forms-service"

import { Input, Select } from "@shared/ui/fields"

import { validatorsArray } from "./constants/validators-array"

const TextType: FC<{ containerIndex: number; fieldIndex: number }> = ({
  containerIndex,
  fieldIndex,
}) => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<ClearFormSchema>()

  return (
    <div className="flex max-w-[calc(100%-108px)] items-end gap-5">
      <div className="flex-1">
        <Input
          label="Placeholder"
          placeholder="Placeholder текст"
          {...register(`containers.${containerIndex}.fields.${fieldIndex}.placeholder`)}
          error={!!errors?.containers?.[containerIndex]?.fields?.[fieldIndex]?.placeholder}
        />
      </div>
      <div className="flex-1">
        <Controller
          name={`containers.${containerIndex}.fields.${fieldIndex}.validators`}
          control={control}
          render={({ field: { name, value, onChange } }) => (
            <Select
              name={name}
              label="Валидаторы"
              placeholder="Оберіть"
              isMulti
              options={validatorsArray}
              value={validatorsArray.filter(c => value?.includes(c.value)) ?? []}
              onChange={options => onChange(options?.map(option => option.value))}
              hideSelectedOptions={false}
              closeMenuOnSelect={false}
              error={!!errors?.containers?.[containerIndex]?.fields?.[fieldIndex]?.validators}
            />
          )}
        />
      </div>
    </div>
  )
}
export default TextType
