import { zodResolver } from "@hookform/resolvers/zod"
import { FC } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router-dom"

import { useClearFormsQuery } from "@services/clear-forms-service"
import { useFillableFormsQuery } from "@services/fillable-forms-service"
import {
  ModalEntity,
  ModalSchema,
  modalSchema,
  useAddModalMutation,
  useEditModalMutation,
} from "@services/modals-service"
import { useTablesQuery } from "@services/tables-service"

import { ROUTES } from "@shared/constants"
import { EntityTypeEnum, entityTypeArray } from "@shared/constants/entities"
import { Button } from "@shared/ui/buttons"
import { Input, Select } from "@shared/ui/fields"
import { showToast } from "@shared/ui/toastify"
import { isAxiosError } from "@shared/utils/error-handler"
import { formatSelectOptions } from "@shared/utils/format-select-options"

const ModalForm: FC<{ modal?: ModalEntity }> = ({ modal }) => {
  const addModal = useAddModalMutation()
  const editModal = useEditModalMutation()

  const {
    register,
    control,
    reset,
    setValue,
    watch,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<ModalSchema>({
    defaultValues: modal ?? {},
    resolver: zodResolver(modalSchema),
    shouldFocusError: false,
  })

  const entityType = watch("entity_type")
  const isSubmitButtonDisabled = !isDirty || addModal.isPending || editModal.isPending

  const { data: tables, isLoading: isLoadingOnTables } = useTablesQuery(
    entityType === EntityTypeEnum.TABLE,
  )
  const { data: clearForms, isLoading: isLoadingOnClearForms } = useClearFormsQuery(
    entityType === EntityTypeEnum.CLEAR_FORM,
  )
  const { data: fillableForms, isLoading: isLoadingOnFillableForms } = useFillableFormsQuery(
    entityType === EntityTypeEnum.FILLABLE_FORM,
  )
  const isEntityIdLoading = isLoadingOnTables || isLoadingOnClearForms || isLoadingOnFillableForms

  const getEntityIdOptions = () => {
    switch (entityType) {
      case EntityTypeEnum.TABLE:
        return formatSelectOptions(tables)
      case EntityTypeEnum.CLEAR_FORM:
        return formatSelectOptions(clearForms)
      case EntityTypeEnum.FILLABLE_FORM:
        return formatSelectOptions(fillableForms)
      default:
        return []
    }
  }

  const onSubmit: SubmitHandler<ModalSchema> = async data => {
    try {
      modal
        ? await editModal.mutateAsync({
            id: modal.id,
            modal: data,
          })
        : await addModal.mutateAsync(data)
      reset()
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 400) {
        showToast("Не удалось создать модальное окно!", { type: "error" })
      }
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex h-[calc(100%-76px)] flex-col justify-between gap-5"
    >
      <div className="space-y-5">
        <div className="flex justify-between gap-5">
          <div className="flex-1">
            <Input label="Название" {...register("title")} error={!!errors?.title} />
          </div>
          <div className="flex-1">
            <Input label="Уникальный ID" {...register("unique_id")} error={!!errors?.unique_id} />
          </div>
        </div>
        <div className="w-full">
          <Input label="Роут" {...register("route")} error={!!errors?.route} />
        </div>
        <div className="flex justify-between gap-5">
          <div className="flex-1">
            <Controller
              name="entity_type"
              control={control}
              render={({ field: { name, value, onChange } }) => (
                <Select
                  name={name}
                  label="Тип"
                  placeholder="Оберіть"
                  options={entityTypeArray}
                  value={entityTypeArray.find(c => c.value === value)}
                  onChange={option => {
                    if (option) {
                      onChange(option.value)
                      setValue("entity_id", 0)
                    }
                  }}
                  error={!!errors?.entity_type}
                />
              )}
            />
          </div>
          <div className="flex-1">
            <Controller
              name="entity_id"
              control={control}
              render={({ field: { name, value, onChange } }) => (
                <Select
                  name={name}
                  label="Что отображаем"
                  placeholder="Оберіть"
                  isLoading={isEntityIdLoading}
                  options={getEntityIdOptions()}
                  value={getEntityIdOptions()?.find(c => c.value === value) ?? null}
                  onChange={option => option && onChange(option.value)}
                  error={!!errors?.entity_id}
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <Button type="submit" className="w-fit" disabled={isSubmitButtonDisabled}>
          Сохранить
        </Button>
        <Button type="button" variant="secondary" className="w-fit" asChild>
          <Link to={ROUTES.MODALS.path}>Отменить</Link>
        </Button>
      </div>
    </form>
  )
}
export default ModalForm