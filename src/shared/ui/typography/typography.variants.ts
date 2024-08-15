import { cva } from "class-variance-authority"

export const typographyVariants = cva("text-black", {
  variants: {
    variant: {
      pageTitle: "text-4xl font-inter-semibold",
      containerTitle: "text-2xl font-inter-semibold",
      fieldTitle: "text-lg font-inter-semibold",
      copy: "text-base font-inter-regular",
      itemTitle: "text-sm font-open-sans-semibold text-t-black",
    },
  },
  defaultVariants: {
    variant: "copy",
  },
})
