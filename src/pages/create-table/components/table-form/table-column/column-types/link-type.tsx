import { FC } from "react"
import { useFormContext } from "react-hook-form"

import { TableSchema } from "@services/tables-service"

import { Input } from "@shared/ui/fields"

const LinkType: FC<{ columnIndex: number }> = ({ columnIndex }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TableSchema>()

  return (
    <div className="flex items-end gap-5">
      <div className="flex-1">
        <Input
          label="Страница, на которую ведет ссылка"
          {...register(`columns.${columnIndex}.page`)}
          error={!!errors?.columns?.[columnIndex]?.page}
        />
      </div>
      <div className="flex-1">
        <Input
          label="Ключ к API для заполнения"
          {...register(`columns.${columnIndex}.api_object_key`)}
          error={!!errors?.columns?.[columnIndex]?.api_object_key}
        />
      </div>
      <div className="flex-1">
        <Input
          label="Параметр из объекта api"
          {...register(`columns.${columnIndex}.api_key_param`)}
          error={!!errors?.columns?.[columnIndex]?.api_key_param}
        />
      </div>
    </div>
  )
}
export default LinkType
