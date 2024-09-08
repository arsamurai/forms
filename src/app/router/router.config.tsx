import {
  ClearFormsPage,
  CreateClearFormPage,
  CreateFillableFormPage,
  CreateMenuItemPage,
  CreateModalPage,
  CreateOffcanvasPage,
  CreateTablePage,
  CreateViewPage,
  CreateWebpagePage,
  FillableFormsPage,
  MainPage,
  MenuPage,
  ModalsPage,
  NotFoundPage,
  OffcanvasPage,
  TablesPage,
  ViewListPage,
  WebpagesPage,
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
      {
        path: ROUTES.MODALS.path,
        element: <ModalsPage />,
      },
      {
        path: ROUTES.MODALS.path + "/create",
        element: <CreateModalPage />,
      },
      {
        path: ROUTES.MODALS.path + "/edit/:id",
        element: <CreateModalPage />,
      },
      {
        path: ROUTES.WEBPAGES.path,
        element: <WebpagesPage />,
      },
      {
        path: ROUTES.WEBPAGES.path + "/create",
        element: <CreateWebpagePage />,
      },
      {
        path: ROUTES.WEBPAGES.path + "/edit/:id",
        element: <CreateWebpagePage />,
      },
      {
        path: ROUTES.OFFCANVAS.path,
        element: <OffcanvasPage />,
      },
      {
        path: ROUTES.OFFCANVAS.path + "/create",
        element: <CreateOffcanvasPage />,
      },
      {
        path: ROUTES.OFFCANVAS.path + "/edit/:id",
        element: <CreateOffcanvasPage />,
      },
      {
        path: ROUTES.VIEW.path,
        element: <ViewListPage />,
      },
      {
        path: ROUTES.VIEW.path + "/create",
        element: <CreateViewPage />,
      },
      {
        path: ROUTES.VIEW.path + "/edit/:id",
        element: <CreateViewPage />,
      },
      {
        path: ROUTES.MENU.path,
        element: <MenuPage />,
      },
      {
        path: ROUTES.MENU.path + "/create",
        element: <CreateMenuItemPage />,
      },
      {
        path: ROUTES.MENU.path + "/edit/:id",
        element: <CreateMenuItemPage />,
      },
    ],
  },
  {
    path: ROUTES.ROOT.path,
    element: <MainPage />,
  },
])
