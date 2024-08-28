import { FC } from "react"
import { useFormContext } from "react-hook-form"

import { TableSchema } from "@services/tables-service"

import { Input } from "@shared/ui/fields"

const TextType: FC<{ columnIndex: number }> = ({ columnIndex }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TableSchema>()

  return (
    <Input
      label="Ключ к API для заполнения"
      {...register(`columns.${columnIndex}.api_object_key`)}
      error={!!errors?.columns?.[columnIndex]?.api_object_key}
    />
  )
}
export default TextType
