import { FC } from "react"
import { useFormContext } from "react-hook-form"

import { ClearFormSchema } from "@services/clear-forms-service"

import { Checkbox } from "@shared/ui/fields"

const TextAreaType: FC<{ containerIndex: number; fieldIndex: number }> = ({
  containerIndex,
  fieldIndex,
}) => {
  const { watch, setValue } = useFormContext<ClearFormSchema>()
  const showMaxLength = watch(`containers.${containerIndex}.fields.${fieldIndex}.show_max_length`)

  const handleChangeShowMaxLength = () => {
    setValue(`containers.${containerIndex}.fields.${fieldIndex}.show_max_length`, !showMaxLength, {
      shouldDirty: true,
    })
  }

  return (
    <Checkbox
      id={`max-symbols-count-${containerIndex}-${fieldIndex}`}
      label="Максимальное количество символов"
      checked={showMaxLength ?? false}
      onCheckedChange={handleChangeShowMaxLength}
    />
  )
}
export default TextAreaType
