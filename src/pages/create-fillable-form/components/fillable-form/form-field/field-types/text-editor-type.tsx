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
          <Input
            label="Роут для загрузки изображений"
            placeholder="/api/v1/upload/image"
            {...register(`containers.${containerIndex}.fields.${fieldIndex}.image_upload_route`)}
            error={!!errors?.containers?.[containerIndex]?.fields?.[fieldIndex]?.image_upload_route}
          />
        </div>
        <div className="flex-1">
          <Input
            label="Роут для удаления изображений"
            placeholder="/api/v1/upload/image"
            {...register(`containers.${containerIndex}.fields.${fieldIndex}.image_delete_route`)}
            error={!!errors?.containers?.[containerIndex]?.fields?.[fieldIndex]?.image_delete_route}
          />
        </div>
      </div>
    </div>
  )
}
export default TextEditorType
