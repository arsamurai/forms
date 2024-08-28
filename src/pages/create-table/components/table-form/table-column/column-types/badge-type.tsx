import { FC } from "react"
import { useFormContext } from "react-hook-form"

import { TableSchema } from "@services/tables-service"

import { Input } from "@shared/ui/fields"

const BadgeType: FC<{ columnIndex: number }> = ({ columnIndex }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TableSchema>()

  return (
    <div className="flex items-end gap-5">
      <div className="flex-1">
        <Input
          label="Ключ к API для заполнения"
          {...register(`columns.${columnIndex}.api_object_key`)}
          error={!!errors?.columns?.[columnIndex]?.api_object_key}
        />
      </div>
      <div className="flex-1">
        <Input
          label="Роут для получения списка"
          {...register(`columns.${columnIndex}.get_list_route`)}
          error={!!errors?.columns?.[columnIndex]?.get_list_route}
        />
      </div>
    </div>
  )
}
export default BadgeType
