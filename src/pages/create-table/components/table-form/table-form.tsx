import { zodResolver } from "@hookform/resolvers/zod"
import { FC, useEffect } from "react"
import { FormProvider, SubmitHandler, useFieldArray, useForm } from "react-hook-form"

import {
  ButtonSchema,
  ColumnSchema,
  TableEntity,
  TableSchema,
  tableSchema,
  useAddTableMutation,
  useEditTableMutation,
} from "@services/tables-service"

import { Button } from "@shared/ui/buttons"
import { showToast } from "@shared/ui/toastify"
import { Typography } from "@shared/ui/typography"
import { isAxiosError } from "@shared/utils/error-handler"

import MainForm from "./main-form"
import { TableButton } from "./table-button"
import { TableColumn } from "./table-column"

const TableForm: FC<{ table?: TableEntity }> = ({ table }) => {
  const addTable = useAddTableMutation()
  const editTable = useEditTableMutation()

  const methods = useForm<TableSchema>({
    defaultValues: table ?? {
      buttons: [],
      columns: [{}],
    },
    resolver: zodResolver(tableSchema),
    shouldFocusError: false,
  })

  const isSubmitButtonDisabled =
    !methods.formState.isDirty || addTable.isPending || editTable.isPending

  const {
    fields: buttons,
    append: appendButton,
    remove: removeButton,
    move: moveButton,
  } = useFieldArray({
    control: methods.control,
    name: "buttons",
  })

  const {
    fields: columns,
    append: appendColumn,
    remove: removeColumn,
    move: moveColumn,
  } = useFieldArray({
    control: methods.control,
    name: "columns",
  })

  const handleAddButton = () => {
    appendButton({
      title: "",
      api_key_param: "",
      api_command_name: "",
      color: "",
      action_type: "",
      action: "",
      api_route: "",
      show_alert: 0,
      alert_message: "",
    } as ButtonSchema)
  }

  const handleAddColumn = () => {
    appendColumn({
      title: "",
      enable_sort: 0,
      enable_filter: 0,
    } as ColumnSchema)
  }

  const onSubmit: SubmitHandler<TableSchema> = async data => {
    try {
      table
        ? await editTable.mutateAsync({
            id: table.id,
            table: data,
          })
        : await addTable.mutateAsync(data)
      methods.reset()
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 400) {
        showToast("Не удалось создать таблицу!", { type: "error" })
      }
    }
  }

  useEffect(() => {
    methods.reset(table ?? { buttons: [], columns: [{}] })
  }, [table, methods])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-[76px]">
        <MainForm addButton={handleAddButton} />
        {!!buttons.length && (
          <div className="space-y-6">
            <Typography variant="pageSubtitle">Кнопки</Typography>
            {buttons.map((item, index) => (
              <TableButton
                key={item.id}
                buttonIndex={index}
                removeButton={removeButton}
                moveButton={moveButton}
              />
            ))}
          </div>
        )}
        <div className="space-y-6">
          <Typography variant="pageSubtitle">Колонки</Typography>
          {columns.map((item, index) => (
            <TableColumn
              key={item.id}
              columnIndex={index}
              removeColumn={removeColumn}
              moveColumn={moveColumn}
            />
          ))}
          <div className="flex justify-center">
            <Button type="button" className="mx-auto max-w-[600px]" onClick={handleAddColumn}>
              Додати колонку
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="mx-auto max-w-[600px]" disabled={isSubmitButtonDisabled}>
            {table ? "Редагувати" : "Зберегти"}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
export default TableForm
