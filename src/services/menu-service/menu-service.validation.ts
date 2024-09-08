import z from "zod"

export const menuItemSchema = z.object({
  id: z.number().optional(),
  order_id: z.number().nullable().optional(),
  parent_id: z.number().nullable().optional(),
  title: z.string().min(1),
  icon: z.string().min(1),
  page_id: z.number().min(1),
})

export type MenuItemSchema = z.infer<typeof menuItemSchema>
