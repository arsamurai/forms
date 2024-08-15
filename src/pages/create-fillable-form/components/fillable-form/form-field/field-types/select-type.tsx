import { FC } from "react"
import { useFormContext } from "react-hook-form"

import { FillableFormSchema } from "@services/fillable-forms-service"

import { Input } from "@shared/ui/fields"

const TextEditorType: FC<{ containerIndex: number; fieldIndex: number }> = ({
  containerIndex,
  fieldIndex,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FillableFormSchema>()

  return (
    <div className="space-y-5">
      <div className="flex max-w-[calc(100%-108px)] items-end gap-5">
        <div className="flex-1">
          <Input
            label="Роут для получения списка"
            placeholder="/api/v1/options"
            {...register(`containers.${containerIndex}.fields.${fieldIndex}.options_route`)}
            error={!!errors?.containers?.[containerIndex]?.fields?.[fieldIndex]?.options_route}
          />
        </div>
        <div className="flex-1">
          <Input
            label="Параметр для загрузки"
            placeholder="region"
            {...register(`containers.${containerIndex}.fields.${fieldIndex}.route_param`)}
            error={!!errors?.containers?.[containerIndex]?.fields?.[fieldIndex]?.route_param}
          />
        </div>
      </div>
    </div>
  )
}
export default TextEditorType
