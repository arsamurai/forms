import { zodResolver } from "@hookform/resolvers/zod"
import { FC, useEffect } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import { Link } from "react-router-dom"

import {
  MenuItemEntity,
  MenuItemSchema,
  menuItemSchema,
  useAddMenuItemMutation,
  useEditMenuItemMutation,
} from "@services/menu-service"
import { useWebpagesQuery } from "@services/webpages-service"

import { ROUTES } from "@shared/constants"
import { Button } from "@shared/ui/buttons"
import { Input, Select } from "@shared/ui/fields"
import { IconsPicker } from "@shared/ui/icons-picker"
import { showToast } from "@shared/ui/toastify"
import { isAxiosError } from "@shared/utils/error-handler"
import { formatSelectOptions } from "@shared/utils/format-select-options"

const MenuItemForm: FC<{ menuItem?: MenuItemEntity["comment"] }> = ({ menuItem }) => {
  const addMenuItem = useAddMenuItemMutation()
  const editMenuItem = useEditMenuItemMutation()
  const { data: webpages, isLoading: isLoadingOnWebpages } = useWebpagesQuery()

  const {
    register,
    control,
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isDirty, errors },
  } = useForm<MenuItemSchema>({
    defaultValues: menuItem ?? {},
    resolver: zodResolver(menuItemSchema),
    shouldFocusError: false,
  })

  const icon = watch("icon")
  const webpagesOptions = formatSelectOptions(webpages)
  const isSubmitButtonDisabled = !isDirty || addMenuItem.isPending || editMenuItem.isPending

  const handleChangeIcon = (newId: string) => {
    setValue("icon", newId, {
      shouldDirty: true,
    })
  }

  const onSubmit: SubmitHandler<MenuItemSchema> = async data => {
    try {
      menuItem
        ? await editMenuItem.mutateAsync({
            id: menuItem.id,
            menuItem: data,
          })
        : await addMenuItem.mutateAsync(data)
      reset()
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 400) {
        showToast("Не удалось создать пункт меню!", { type: "error" })
      }
    }
  }

  useEffect(() => {
    reset(menuItem ?? {})
  }, [menuItem, reset])

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
            <Controller
              name="page_id"
              control={control}
              render={({ field: { name, value, onChange } }) => (
                <Select
                  name={name}
                  label="Страницы"
                  placeholder="Оберіть"
                  isLoading={isLoadingOnWebpages}
                  options={webpagesOptions}
                  value={webpagesOptions?.find(c => c.value === value) ?? null}
                  onChange={option => option && onChange(option.value)}
                  error={!!errors?.page_id}
                />
              )}
            />
          </div>
        </div>
        <div className="w-full">
          <IconsPicker icon={icon} changeIcon={handleChangeIcon} error={!!errors?.icon} />
        </div>
      </div>
      <div className="flex gap-4">
        <Button type="submit" className="w-fit" disabled={isSubmitButtonDisabled}>
          Сохранить
        </Button>
        <Button type="button" variant="secondary" className="w-fit" asChild>
          <Link to={ROUTES.MENU.path}>Отменить</Link>
        </Button>
      </div>
    </form>
  )
}
export default MenuItemForm
