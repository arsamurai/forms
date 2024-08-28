import { ColumnTypeEnum } from "@services/tables-service"

export const columnTypes = [
  { value: ColumnTypeEnum.Text, label: "Текстовое" },
  { value: ColumnTypeEnum.Link, label: "Ссылка" },
  { value: ColumnTypeEnum.Badge, label: "Бейдж" },
  { value: ColumnTypeEnum.Switch, label: "Свитч" },
  { value: ColumnTypeEnum.ButtonsGroup, label: "Группа кнопок" },
]
