import z from "zod"

export enum QueryFieldsEnum {
  ID = "id",
  Title = "title",
  Date = "date",
}

export enum ButtonActionTypeEnum {
  SendRequest = "sendRequest",
  GoToPage = "goToPage",
  OpenModal = "openModal",
  Offcanvas = "offcanvas",
}

export enum ColumnTypeEnum {
  Text = "text",
  Link = "link",
  Badge = "badge",
  Switch = "switch",
  ButtonsGroup = "buttonsGroup",
}

const QueryFieldsSchema = z.nativeEnum(QueryFieldsEnum)
const ButtonActionTypeSchema = z.nativeEnum(ButtonActionTypeEnum)
const ColumnTypeSchema = z.nativeEnum(ColumnTypeEnum)

const buttonSchema = z
  .object({
    id: z.number().optional(),
    column_id: z.number().optional(),
    order_id: z.number().optional(),
    title: z.string().min(1),
    api_key_param: z.string().min(1),
    api_command_name: z.string().min(1),
    color: z.string().min(1),
    action_type: z.string(ButtonActionTypeSchema).min(1),
    api_route: z.string().optional(),
    action: z.union([z.number(), z.string()]).nullable().optional(),
    show_alert: z.union([z.literal(0), z.literal(1), z.null()]).optional(),
    alert_message: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.action_type === "sendRequest") {
      if (!data.api_route) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["api_route"],
        })
      }
    }
    if (data.action_type === "goToPage") {
      if (!data.action) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["action"],
        })
      }
    }
    if (data.show_alert === 1) {
      if (!data.alert_message) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["alert_message"],
        })
      }
    }
    if (data.action_type === "GoToPage") {
      if (!data.action) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["action"],
        })
      }
    }
  })

const columnSchema = z
  .object({
    // basic
    id: z.number().optional(),
    table_id: z.number().optional(),
    order_id: z.number().optional(),
    title: z.string().min(1),
    enable_sort: z.union([z.literal(0), z.literal(1), z.null()]).optional(),
    enable_filter: z.union([z.literal(0), z.literal(1), z.null()]).optional(),
    column_type: ColumnTypeSchema,
    // different
    api_object_key: z.string().nullable().optional(),
    page: z.string().nullable().optional(),
    api_key_param: z.string().nullable().optional(),
    get_list_route: z.string().nullable().optional(),
    api_route: z.string().nullable().optional(),
    api_command_name: z.string().nullable().optional(),
    buttons: z.array(buttonSchema).nullable().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.column_type !== "buttonsGroup") {
      if (!data.api_object_key) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["api_object_key"],
        })
      }
    }

    if (data.column_type === "link") {
      if (!data.page) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["page"],
        })
      }
      if (!data.api_key_param) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["api_key_param"],
        })
      }
    } else if (data.column_type === "badge") {
      if (!data.get_list_route) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["get_list_route"],
        })
      }
    } else if (data.column_type === "switch") {
      if (!data.api_route) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["api_route"],
        })
      }
      if (!data.api_key_param) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["api_key_param"],
        })
      }
      if (!data.api_command_name) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["api_command_name"],
        })
      }
    } else if (data.column_type === "buttonsGroup") {
      if (!data.buttons) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["buttons"],
        })
      }
    }
  })

export const tableSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  unique_id: z.string().min(1),
  api_route: z.string().min(1),
  passed_parameters: z.string().optional(),
  per_page: z.number().min(1),
  query_fields: z.array(QueryFieldsSchema).nonempty(),
  enable_search: z.union([z.literal(0), z.literal(1), z.null()]).optional(),
  enable_pagination: z.union([z.literal(0), z.literal(1), z.null()]).optional(),
  columns: z.array(columnSchema),
  buttons: z.array(buttonSchema).optional(),
})

export type ButtonSchema = z.infer<typeof buttonSchema>
export type ColumnSchema = z.infer<typeof columnSchema>
export type TableSchema = z.infer<typeof tableSchema>
