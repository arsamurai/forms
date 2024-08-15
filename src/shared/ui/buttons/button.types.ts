import { VariantProps } from "class-variance-authority"
import { ReactNode } from "react"

import { buttonVariants } from "./button.variants"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
}
