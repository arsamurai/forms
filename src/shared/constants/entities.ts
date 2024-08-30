import z from "zod"

export enum EntityTypeEnum {
  TABLE = "table",
  FILLABLE_FORM = "fillableForm",
  CLEAR_FORM = "clearForm",
}

export const EntityTypeSchema = z.nativeEnum(EntityTypeEnum)

export const entityTypeArray = [
  { value: EntityTypeEnum.TABLE, label: "Таблица" },
  { value: EntityTypeEnum.FILLABLE_FORM, label: "Заполняемая форма" },
  { value: EntityTypeEnum.CLEAR_FORM, label: "Чистая форма" },
]
