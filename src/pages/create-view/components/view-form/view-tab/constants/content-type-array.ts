import { ContentTypeEnum } from "@services/view-service"

export const contentTypeArray = [
  { value: ContentTypeEnum.StatisticsCards, label: "Карточки статистики" },
  { value: ContentTypeEnum.CalendarCards, label: "Карточки как у календаря" },
  { value: ContentTypeEnum.GroupedDataOutput, label: "Группированный вывод данных" },
  { value: ContentTypeEnum.ActivityFeed, label: "Лента активности" },
  { value: ContentTypeEnum.CheckboxTable, label: "Чекбокс таблица" },
  { value: ContentTypeEnum.Table, label: "Таблица" },
  { value: ContentTypeEnum.FillableForm, label: "Форма заполняемая" },
  { value: ContentTypeEnum.ClearForm, label: "Форма чистая" },
]
