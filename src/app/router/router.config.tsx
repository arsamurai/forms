import { CreateFillableFormPage, FillableFormsPage, MainPage, NotFoundPage } from "@pages"
import { createBrowserRouter } from "react-router-dom"

import { RootLayout } from "@features/layouts"

import { ROUTES } from "@shared/constants"

export const router = createBrowserRouter([
  {
    errorElement: <NotFoundPage />,
    element: <RootLayout />,
    children: [
      {
        path: ROUTES.FILLABLE_FORMS.path,
        element: <FillableFormsPage />,
      },
      {
        path: ROUTES.FILLABLE_FORMS.path + "/create",
        element: <CreateFillableFormPage />,
      },
      {
        path: ROUTES.FILLABLE_FORMS.path + "/edit/:id",
        element: <CreateFillableFormPage />,
      },
    ],
  },
  {
    path: ROUTES.ROOT.path,
    element: <MainPage />,
  },
])
