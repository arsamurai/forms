import { FieldTypeEnum } from "@services/clear-forms-service"

export const fieldsTypesArray = [
  { value: FieldTypeEnum.TextInput, label: "Текстовое" },
  { value: FieldTypeEnum.Textarea, label: "TextArea" },
  { value: FieldTypeEnum.TextEditor, label: "Текстовый редактор" },
  { value: FieldTypeEnum.Select, label: "Селект" },
  { value: FieldTypeEnum.Image, label: "Изображение" },
  { value: FieldTypeEnum.MultiImage, label: "Множественное добавление изображений" },
  { value: FieldTypeEnum.MultiInput, label: "Множественный текстовый инпут" },
]
