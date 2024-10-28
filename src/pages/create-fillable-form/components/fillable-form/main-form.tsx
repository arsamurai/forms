import { useFormContext } from "react-hook-form"

import { FillableFormSchema } from "@services/fillable-forms-service"

import { Input } from "@shared/ui/fields"

const MainForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<FillableFormSchema>()

  return (
    <div className="space-y-10">
      <div className="flex items-end gap-5">
        <div className="flex-1">
          <Input
            label="Название"
            placeholder="Название формы"
            {...register("title")}
            error={!!errors?.title}
          />
        </div>
        <div className="flex-1">
          <Input
            label="Уникальный Name"
            placeholder="form_001"
            {...register("unique_id")}
            error={!!errors?.unique_id}
          />
        </div>
      </div>
      <div className="flex items-end gap-5">
        <div className="flex-1">
          <Input
            label="Название команды к API"
            placeholder="saveProductById"
            {...register("api_command_name")}
            error={!!errors?.api_command_name}
          />
        </div>
        <div className="flex-1">
          <Input
            label="Параметры к команде"
            placeholder='{"method": "POST", "headers": {"Content-Type": "application/json"}}'
            {...register("api_parameters")}
            error={!!errors?.api_parameters}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <Input
          label="Роут api для отправки данных с формы"
          placeholder="/api/v1"
          {...register("api_route")}
          error={!!errors?.api_route}
        />
      </div>
      <div className="flex items-end gap-5">
        <div className="flex-1">
          <Input
            label="Роут для заполнения формы"
            placeholder="/api/v1"
            {...register("route_to_fill_form")}
            error={!!errors?.route_to_fill_form}
          />
        </div>
        <div className="flex-1">
          <Input
            label="Параметры к команде"
            placeholder="id, email, date"
            {...register("passed_parameters")}
            error={!!errors?.passed_parameters}
          />
        </div>
      </div>
    </div>
  )
}
export default MainForm
