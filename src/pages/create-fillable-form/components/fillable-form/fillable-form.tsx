import { zodResolver } from "@hookform/resolvers/zod"
import { FC, useEffect } from "react"
import { FormProvider, SubmitHandler, useFieldArray, useForm } from "react-hook-form"

import {
  ContainerSchema,
  FillableFormEntity,
  FillableFormSchema,
  fillableFormSchema,
  useAddFillableFormMutation,
  useEditFillableFormMutation,
} from "@services/fillable-forms-service"

import { Button } from "@shared/ui/buttons"
import { showToast } from "@shared/ui/toastify"
import { Typography } from "@shared/ui/typography"
import { isAxiosError } from "@shared/utils/error-handler"

import { FormContainer } from "./form-container"
import MainForm from "./main-form"

const FillableForm: FC<{ form?: FillableFormEntity }> = ({ form }) => {
  const addFillableForm = useAddFillableFormMutation()
  const editFillableForm = useEditFillableFormMutation()

  const methods = useForm<FillableFormSchema>({
    defaultValues: form ?? {
      containers: [{ fields: [{}] }],
    },
    resolver: zodResolver(fillableFormSchema),
    shouldFocusError: false,
  })

  const isSubmitButtonDisabled =
    !methods.formState.isDirty || addFillableForm.isPending || editFillableForm.isPending

  const {
    fields: containers,
    append,
    remove: removeContainer,
    move: moveContainer,
  } = useFieldArray({
    control: methods.control,
    name: "containers",
  })

  const handleAddContainer = () => {
    append({
      title: "",
      size: "",
      fields: [
        {
          field_title: "",
          field_name: "",
          field_text: "",
          api_key: "",
          size: "",
        },
      ],
    } as ContainerSchema)
  }

  const onSubmit: SubmitHandler<FillableFormSchema> = async data => {
    try {
      form
        ? await editFillableForm.mutateAsync({
            id: form.id,
            form: data,
          })
        : await addFillableForm.mutateAsync(data)
      methods.reset()
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 400) {
        showToast("Не удалось создать форму!", { type: "error" })
      }
    }
  }

  useEffect(() => {
    methods.reset(form ?? { containers: [{ fields: [{}] }] })
  }, [form, methods])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-[76px]">
        <MainForm />
        <div className="space-y-6">
          <Typography variant="pageSubtitle">Блоки формы</Typography>
          {containers.map((item, index) => (
            <FormContainer
              key={item.id}
              containerIndex={index}
              removeContainer={removeContainer}
              moveContainer={moveContainer}
            />
          ))}
        </div>
        <div className="flex justify-center">
          <Button type="button" className="mx-auto max-w-[600px]" onClick={handleAddContainer}>
            Додати блок
          </Button>
        </div>
        <div className="flex justify-center">
          <Button type="submit" className="mx-auto max-w-[600px]" disabled={isSubmitButtonDisabled}>
            {form ? "Редагувати" : "Зберегти"}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
export default FillableForm
