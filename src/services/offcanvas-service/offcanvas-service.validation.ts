import z from "zod"

export const offcanvasSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  unique_id: z.string().min(1),
  route: z.string().min(1),
  entity_id: z.number().min(1),
})

export type OffcanvasSchema = z.infer<typeof offcanvasSchema>
