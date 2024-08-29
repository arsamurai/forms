import z from "zod"

export enum ValidatorsEnum {
  REQUIRED = "required",
  MAX_LENGTH_50 = "maxLength:50",
}

export enum ImageEnum {
  JPG = "jpg",
  PNG = "png",
  GIF = "gif",
}

export enum FolderHierarchyEnum {
  SIMPLE = "simple",
  HARD = "hard",
}

export enum FieldTypeEnum {
  TextInput = "text_input",
  Textarea = "textarea",
  TextEditor = "text_editor",
  Select = "select",
  Image = "image",
  MultiImage = "multi_image",
}

const ValidatorsTypeSchema = z.nativeEnum(ValidatorsEnum)
const ImageTypeSchema = z.nativeEnum(ImageEnum)
const FolderHierarchySchema = z.nativeEnum(FolderHierarchyEnum)
const FieldTypeSchema = z.nativeEnum(FieldTypeEnum)

const fieldSchema = z
  .object({
    // basic
    id: z.number().optional(),
    container_id: z.number().optional(),
    order_id: z.number().optional(),
    field_title: z.string().min(1),
    field_name: z.string().min(1),
    field_text: z.string().min(1),
    size: z.string().min(1),
    type: FieldTypeSchema,
    // different
    placeholder: z.string().nullable().optional(),
    validators: z.array(ValidatorsTypeSchema).nonempty().nullable().optional(),
    show_max_length: z.boolean().nullable().optional(),
    image_upload_route: z.string().nullable().optional(),
    image_delete_route: z.string().nullable().optional(),
    upload_param: z.string().nullable().optional(),
    options_route: z.string().nullable().optional(),
    route_param: z.string().nullable().optional(),
    is_multiselect: z.boolean().nullable().optional(),
    upload_route: z.string().nullable().optional(),
    max_files: z.number().nullable().optional(),
    max_file_size: z.number().nullable().optional(),
    max_resolution: z.string().nullable().optional(),
    folder_hierarchy_complexity: z.string(FolderHierarchySchema).nullable().optional(),
    file_types: z.array(ImageTypeSchema).nonempty().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "text_input") {
      if (!data.placeholder) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["placeholder"],
        })
      }
      if (!data.validators) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["validators"],
        })
      }
    } else if (data.type === "text_editor") {
      if (!data.image_upload_route) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Image upload route is required for text_editor",
          path: ["image_upload_route"],
        })
      }
      if (!data.image_delete_route) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["image_delete_route"],
        })
      }
      if (!data.upload_param) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["upload_param"],
        })
      }
    } else if (data.type === "select") {
      if (!data.options_route) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["options_route"],
        })
      }
      if (!data.route_param) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["route_param"],
        })
      }
    } else if (data.type === "image") {
      if (!data.upload_route) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["upload_route"],
        })
      }
      if (!data.upload_param) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["upload_param"],
        })
      }
      if (!data.max_files) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["max_files"],
        })
      }
      if (!data.max_file_size) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["max_file_size"],
        })
      }
      if (!data.max_resolution) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["max_resolution"],
        })
      }
      if (!data.folder_hierarchy_complexity) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["folder_hierarchy_complexity"],
        })
      }
    } else if (data.type === "multi_image") {
      if (!data.upload_route) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["upload_route"],
        })
      }
      if (!data.upload_param) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["upload_param"],
        })
      }
      if (!data.max_files) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["max_files"],
        })
      }
      if (!data.max_file_size) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["max_file_size"],
        })
      }
      if (!data.max_resolution) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["max_resolution"],
        })
      }
      if (!data.file_types) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["file_types"],
        })
      }
      if (!data.folder_hierarchy_complexity) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["folder_hierarchy_complexity"],
        })
      }
    }
  })

const containerSchema = z.object({
  id: z.number().optional(),
  form_id: z.number().optional(),
  order_id: z.number().optional(),
  title: z.string().min(1),
  size: z.string().min(1),
  fields: z.array(fieldSchema),
})

export const clearFormSchema = z.object({
  id: z.number().optional(),
  created_at: z.string().optional(),
  title: z.string().min(1),
  unique_id: z.string().min(1),
  api_command_name: z.string().min(1),
  api_parameters: z.string().min(1),
  api_route: z.string().min(1),
  containers: z.array(containerSchema),
})

export type ClearFormSchema = z.infer<typeof clearFormSchema>
export type ContainerSchema = z.infer<typeof containerSchema>
export type FieldSchema = z.infer<typeof fieldSchema>
