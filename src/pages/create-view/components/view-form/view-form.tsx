import { zodResolver } from "@hookform/resolvers/zod"
import { FC, useEffect } from "react"
import { FormProvider, SubmitHandler, useFieldArray, useForm } from "react-hook-form"

import {
  BlockSchema,
  TabSchema,
  ViewEntity,
  ViewSchema,
  ViewTypeEnum,
  useAddViewMutation,
  useEditViewMutation,
  viewSchema,
} from "@services/view-service"

import { Button } from "@shared/ui/buttons"
import { showToast } from "@shared/ui/toastify"
import { Typography } from "@shared/ui/typography"
import { isAxiosError } from "@shared/utils/error-handler"

import MainForm from "./main-form"
import { ViewBlock } from "./view-block"
import { ViewTab } from "./view-tab"

const ViewForm: FC<{ view?: ViewEntity }> = ({ view }) => {
  const addView = useAddViewMutation()
  const editView = useEditViewMutation()

  const methods = useForm<ViewSchema>({
    defaultValues: view ?? {
      blocks: [{}],
      tabs: [{}],
    },
    resolver: zodResolver(viewSchema),
    shouldFocusError: false,
  })

  const viewType = methods.watch("type")
  const isSubmitButtonDisabled =
    !methods.formState.isDirty || addView.isPending || editView.isPending

  const {
    fields: blocks,
    append: appendBlock,
    remove: removeBlock,
    move: moveBlock,
  } = useFieldArray({
    control: methods.control,
    name: "blocks",
  })

  const {
    fields: tabs,
    append: appendTab,
    remove: removeTab,
    move: moveTab,
  } = useFieldArray({
    control: methods.control,
    name: "tabs",
  })

  const handleAddBlock = () => {
    appendBlock({} as BlockSchema)
  }

  const handleAddTab = () => {
    appendTab({} as TabSchema)
  }

  const onSubmit: SubmitHandler<ViewSchema> = async data => {
    try {
      view
        ? await editView.mutateAsync({
            id: view.id,
            view: data,
          })
        : await addView.mutateAsync(data)
      methods.reset()
    } catch (e) {
      if (isAxiosError(e) && e.response?.status === 400) {
        showToast("Не удалось добавить информацию!", { type: "error" })
      }
    }
  }

  useEffect(() => {
    methods.reset(view ?? { blocks: [{}], tabs: [{}] })
  }, [view, methods])

  useEffect(() => {
    if (viewType === ViewTypeEnum.BLOCKS) {
      methods.unregister("tabs")
    } else {
      methods.unregister("blocks")
    }
  }, [methods, viewType])

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-[76px]">
        <MainForm />
        {viewType === ViewTypeEnum.BLOCKS && (
          <div className="space-y-6">
            <Typography variant="pageSubtitle">Блоки формы</Typography>
            {blocks.map((item, index) => (
              <ViewBlock
                key={item.id}
                blockIndex={index}
                removeBlock={removeBlock}
                moveBlock={moveBlock}
              />
            ))}
            <div className="flex justify-center">
              <Button type="button" className="mx-auto max-w-[600px]" onClick={handleAddBlock}>
                Додати блок
              </Button>
            </div>
          </div>
        )}
        {viewType === ViewTypeEnum.TABS && (
          <div className="space-y-6">
            <Typography variant="pageSubtitle">Табы страницы</Typography>
            {tabs.map((item, index) => (
              <ViewTab key={item.id} tabIndex={index} removeTab={removeTab} moveTab={moveTab} />
            ))}
            <div className="flex justify-center">
              <Button type="button" className="mx-auto max-w-[600px]" onClick={handleAddTab}>
                Додати таб
              </Button>
            </div>
          </div>
        )}
        <div className="flex justify-center">
          <Button type="submit" className="mx-auto max-w-[600px]" disabled={isSubmitButtonDisabled}>
            {view ? "Редагувати" : "Зберегти"}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
export default ViewForm
