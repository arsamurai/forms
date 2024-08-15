import { ReactNode } from "react"
import { ToastOptions, toast } from "react-toastify"

import { ToastBody } from "./toast-body"

export const showToast = (content: ReactNode, toastOptions?: ToastOptions) => {
  const { closeButton = true, type = "default", icon = false, ...options } = toastOptions || {}

  toast(
    ({ closeToast }) => (
      <ToastBody
        content={content}
        closeToast={closeToast}
        closeButton={Boolean(closeButton)}
        icon={icon}
        type={type}
      />
    ),
    {
      autoClose: 3000,
      hideProgressBar: true,
      pauseOnHover: true,
      closeButton: false,
      icon: false,
      position: "top-right",
      ...options,
    },
  )
}
