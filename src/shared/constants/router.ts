export interface RouterParams {
  path: string
}

export const ROUTES = {
  ROOT: {
    path: "/",
  },
  FILLABLE_FORMS: {
    path: "/fillable-forms",
  },
  CLEAR_FORMS: {
    path: "/clear-forms",
  },
  TABLES: {
    path: "/tables",
  },
  MODALS: {
    path: "/modals",
  },
  WEBPAGES: {
    path: "/webpages",
  },
  OFFCANVAS: {
    path: "/offcanvas",
  },
  VIEW: {
    path: "/view",
  },
} satisfies Record<string, RouterParams>
