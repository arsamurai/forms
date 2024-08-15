import { FC, PropsWithChildren } from "react"

import { cn } from "@shared/utils/cn"

import CheckIcon from "@assets/icons/check.svg"
import CloseIcon from "@assets/icons/close.svg"

import { Typography } from "../typography"
import { ToastBodyProps } from "./toast.types"

export const ToastBody: FC<ToastBodyProps> = ({ content, closeToast, closeButton, type, icon }) => {
  const renderToastIcon = () => {
    if (!icon || typeof icon === "function") {
      switch (type) {
        case "error":
          return (
            <ToastIconWrapper className="bg-red-300 text-error">
              <CloseIcon />
            </ToastIconWrapper>
          )
        case "success":
          return (
            <ToastIconWrapper className="bg-green-light text-green-600">
              <CheckIcon />
            </ToastIconWrapper>
          )
        default:
          return null
      }
    }

    return <ToastIconWrapper>{icon}</ToastIconWrapper>
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        {renderToastIcon()}
        <Typography
          variant="copy"
          className="ml-3 text-pretty font-open-sans-semibold text-t-black"
        >
          {content}
        </Typography>
      </div>
      {closeButton && (
        <div
          className="px-[13px] py-[13px] text-t-black opacity-50 transition-opacity *:h-3 *:w-3 hover:opacity-100"
          onClick={closeToast}
        >
          <CloseIcon />
        </div>
      )}
    </div>
  )
}

const ToastIconWrapper: FC<PropsWithChildren<{ className?: string }>> = ({
  children,
  className,
}) => (
  <div
    className={cn(
      "flex size-9 min-w-9 items-center justify-center rounded-xl bg-white text-primary",
      className,
    )}
  >
    {children}
  </div>
)
