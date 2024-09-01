import React, { useId } from "react"

import { cn } from "@shared/utils/cn"

import { InputProps } from "./input.types"

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helpText, error, startIcon, endIcon, ...props }, ref) => {
    const id = useId()

    return (
      <div className={cn("space-y-1.5 text-t-black", { "text-error": error })}>
        {label && (
          <label htmlFor={id} className="select-none font-montserrat-medium text-sm text-current">
            {label}
          </label>
        )}
        <div className="relative">
          {startIcon && (
            <span className="absolute left-[23px] top-2/4 -translate-y-2/4">{startIcon}</span>
          )}
          <input
            id={id}
            className={cn(
              "flex h-9 w-full rounded-[53px] border border-solid border-stroke bg-white px-3 py-2 font-open-sans-regular text-base text-t-black outline-none transition duration-200 ease-in-out placeholder:text-t-gray focus:border-primary focus:shadow-shadow-primary disabled:pointer-events-none disabled:opacity-50",
              { "pl-14": startIcon },
              { "pr-14": endIcon },
              {
                "border-error focus:border-error focus:shadow-shadow-error": error,
              },
              className,
            )}
            ref={ref}
            {...props}
          />
          {endIcon && (
            <span className="absolute right-[23px] top-2/4 -translate-y-2/4">{endIcon}</span>
          )}
        </div>
        {helpText && <p className="font-open-sans-regular text-sm text-current">{helpText}</p>}
      </div>
    )
  },
)
Input.displayName = "Input"

export default Input
