import { ButtonActionTypeEnum } from "@services/tables-service"

export const buttonActionTypesArray = [
  { value: ButtonActionTypeEnum.SendRequest, label: "Отправка запроса" },
  { value: ButtonActionTypeEnum.GoToPage, label: "Переход на страницу" },
  { value: ButtonActionTypeEnum.OpenModal, label: "Открыть модальное окно" },
  { value: ButtonActionTypeEnum.Offcanvas, label: "Оффканвас" },
]
