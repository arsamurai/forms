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
} satisfies Record<string, RouterParams>
