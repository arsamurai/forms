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
} satisfies Record<string, RouterParams>
