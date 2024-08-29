import {
  ClearFormsPage,
  CreateClearFormPage,
  CreateFillableFormPage,
  CreateTablePage,
  FillableFormsPage,
  MainPage,
  NotFoundPage,
  TablesPage,
} from "@pages"
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
      {
        path: ROUTES.CLEAR_FORMS.path,
        element: <ClearFormsPage />,
      },
      {
        path: ROUTES.CLEAR_FORMS.path + "/create",
        element: <CreateClearFormPage />,
      },
      {
        path: ROUTES.CLEAR_FORMS.path + "/edit/:id",
        element: <CreateClearFormPage />,
      },
      {
        path: ROUTES.TABLES.path,
        element: <TablesPage />,
      },
      {
        path: ROUTES.TABLES.path + "/create",
        element: <CreateTablePage />,
      },
      {
        path: ROUTES.TABLES.path + "/edit/:id",
        element: <CreateTablePage />,
      },
    ],
  },
  {
    path: ROUTES.ROOT.path,
    element: <MainPage />,
  },
])
