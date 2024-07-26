import { FillableFormsPage, MainPage, NotFoundPage } from "@pages"
import { createBrowserRouter } from "react-router-dom"

import { ROUTES } from "@shared/constants"

export const router = createBrowserRouter([
  {
    errorElement: <NotFoundPage />,
    children: [
      {
        path: ROUTES.ROOT.path,
        element: <MainPage />,
      },
      {
        path: ROUTES.FILLABLE_FORMS.path,
        element: <FillableFormsPage />,
      },
    ],
  },
])
