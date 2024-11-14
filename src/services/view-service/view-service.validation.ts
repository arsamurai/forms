import z from "zod"

export enum ViewTypeEnum {
  BLOCKS = "blocks",
  TABS = "tabs",
}

export enum ContentTypeEnum {
  StatisticsCards = "StatisticsCards",
  CalendarCards = "CalendarCards",
  GroupedDataOutput = "GroupedDataOutput",
  ActivityFeed = "ActivityFeed",
  CheckboxTable = "CheckboxTable",
  Table = "Table",
  FillableForm = "FillableForm",
  ClearForm = "ClearForm",
}

const ViewTypeSchema = z.nativeEnum(ViewTypeEnum)
const ContentTypeSchema = z.nativeEnum(ContentTypeEnum)

export const tabSchema = z.object({
  id: z.number().optional(),
  order_id: z.number().optional(),
  view_id: z.number().optional(),
  title: z.string().min(1),
  icon: z.string().min(1),
  entity_id: z.number().min(1),
  params: z.string().min(1),
  tab_url: z.string().min(2),
})

export const blockSchema = z
  .object({
    id: z.number().optional(),
    order_id: z.number().optional(),
    view_id: z.number().optional(),
    title: z.string().min(1),
    size: z.string().min(1),
    content_type: ContentTypeSchema,
    content_title: z.string().min(1),
    content_url: z.string().min(1),
    content_params: z.string().min(1),
    entity_id: z.number().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.content_type === "FillableForm" ||
      data.content_type === "ClearForm" ||
      data.content_type === "Table"
    ) {
      if (!data.entity_id) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["entity_id"],
        })
      }
    }
  })

export const viewSchema = z
  .object({
    id: z.number().optional(),
    title: z.string().min(1),
    unique_id: z.string().min(1),
    type: ViewTypeSchema,
    blocks: z.array(blockSchema).optional(),
    tabs: z.array(tabSchema).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "blocks") {
      if (!data.blocks) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["blocks"],
        })
      }
    } else {
      if (!data.tabs) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["tabs"],
        })
      }
    }
  })

export type ViewSchema = z.infer<typeof viewSchema>
export type BlockSchema = z.infer<typeof blockSchema>
export type TabSchema = z.infer<typeof tabSchema>
