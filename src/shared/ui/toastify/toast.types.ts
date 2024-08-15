import { ReactNode } from "react"
import { ToastIcon, TypeOptions } from "react-toastify/dist/types"

export interface ToastBodyProps {
  content?: ReactNode
  closeToast: () => void
  closeButton?: boolean
  icon?: ToastIcon
  type: TypeOptions
}
