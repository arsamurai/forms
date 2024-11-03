import { FC } from "react"
import { Controller, useFormContext } from "react-hook-form"

import { TableSchema } from "@services/tables-service"

import { Button } from "@shared/ui/buttons"
import { Checkbox, Input, Select } from "@shared/ui/fields"
import { MaskInput } from "@shared/ui/fields/input"

import PlusIcon from "@assets/icons/plus.svg"

import { queryFieldsArray } from "./constants/query-fields-array"

const MainForm: FC<{ addButton: () => void }> = ({ addButton }) => {
  const {
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<TableSchema>()

  const enableSearch = watch("enable_search")
  const enablePagination = watch("enable_pagination")

  const handleChangeEnableSearch = () => {
    setValue("enable_search", enableSearch === 1 ? 0 : 1, {
      shouldDirty: true,
    })
  }

  const handleChangeEnablePagination = () => {
    setValue("enable_pagination", enablePagination === 1 ? 0 : 1, {
      shouldDirty: true,
    })
  }

  return (
    <div className="space-y-10">
      <div className="flex items-end gap-5">
        <div className="flex-1">
          <Input label="Название" {...register("title")} error={!!errors?.title} />
        </div>
        <div className="flex-1">
          <Input label="Уникальный Name" {...register("unique_id")} error={!!errors?.unique_id} />
        </div>
      </div>
      <div className="flex items-end gap-5">
        <div className="flex-1">
          <Input
            label="Роут для получения данных с api"
            {...register("api_route")}
            error={!!errors?.api_route}
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
        <div className="flex-1">
          <Controller
            name="per_page"
            control={control}
            render={({ field: { name, value, onChange } }) => {
              return (
                <MaskInput
                  mask={Number}
                  min={1}
                  label="Количество данных на страницу"
                  name={name}
                  value={value?.toString() ?? ""}
                  onAccept={maskedValue => onChange(Number(maskedValue))}
                  error={!!errors?.per_page}
                />
              )
            }}
          />
        </div>
      </div>
      <div className="flex items-end gap-5">
        <div className="flex-1">
          <Controller
            name="query_fields"
            control={control}
            render={({ field: { name, value, onChange } }) => (
              <Select
                name={name}
                label="Список полей для поиска"
                placeholder="Оберіть"
                options={queryFieldsArray}
                value={queryFieldsArray.filter(c => value?.includes(c.value)) ?? []}
                onChange={options => onChange(options?.map(option => option.value))}
                error={!!errors?.query_fields}
                isMulti
              />
            )}
          />
        </div>
        <div className="flex flex-1 items-center gap-5">
          <Button
            type="button"
            variant="secondary"
            size="small"
            className="w-fit whitespace-nowrap"
            onClick={addButton}
            endIcon={
              <div className="*:size-[11px]">
                <PlusIcon />
              </div>
            }
          >
            Добавить кнопку
          </Button>
          <Checkbox
            id="enable_search"
            label="Отображать поиск"
            checked={enableSearch === 1}
            onCheckedChange={handleChangeEnableSearch}
          />
          <Checkbox
            id="enable_pagination"
            label="Добавить пагинацию"
            checked={enablePagination === 1}
            onCheckedChange={handleChangeEnablePagination}
          />
        </div>
      </div>
    </div>
  )
}
export default MainForm
