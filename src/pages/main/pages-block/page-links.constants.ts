import { ROUTES } from "@shared/constants"

export const pageLinks = [
  {
    label: "Заполняемые формы",
    href: ROUTES.FILLABLE_FORMS.path,
    color: "bg-green-light",
  },
  {
    label: "Таблицы",
    href: ROUTES.TABLES.path,
    color: "bg-yellow",
  },
  {
    label: "Чистые формы",
    href: ROUTES.CLEAR_FORMS.path,
    color: "bg-pink",
  },
]
