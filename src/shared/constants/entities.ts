import z from "zod"

export enum EntityTypeEnum {
  Table = "Table",
  FillableForm = "FillableForm",
  ClearForm = "ClearForm",
}

export const EntityTypeSchema = z.nativeEnum(EntityTypeEnum)

export const entityTypeArray = [
  { value: EntityTypeEnum.Table, label: "Таблица" },
  { value: EntityTypeEnum.FillableForm, label: "Заполняемая форма" },
  { value: EntityTypeEnum.ClearForm, label: "Чистая форма" },
]
