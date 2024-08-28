import { FC } from "react"
import { useFormContext } from "react-hook-form"

import { TableSchema } from "@services/tables-service"

import { Input } from "@shared/ui/fields"

const SwitchType: FC<{ columnIndex: number }> = ({ columnIndex }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TableSchema>()

  return (
    <div className="space-y-10">
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
            label="Роут для API"
            {...register(`columns.${columnIndex}.api_route`)}
            error={!!errors?.columns?.[columnIndex]?.api_route}
          />
        </div>
      </div>
      <div className="flex items-end gap-5">
        <div className="flex-1">
          <Input
            label="Параметр из api объекта для запроса"
            {...register(`columns.${columnIndex}.api_key_param`)}
            error={!!errors?.columns?.[columnIndex]?.api_key_param}
          />
        </div>
        <div className="flex-1">
          <Input
            label="Название команды к API"
            {...register(`columns.${columnIndex}.api_command_name`)}
            error={!!errors?.columns?.[columnIndex]?.api_command_name}
          />
        </div>
      </div>
    </div>
  )
}
export default SwitchType
