import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import React from "react"

import { cn } from "@shared/utils/cn"

import CheckIcon from "@assets/icons/check.svg"

import { CheckboxProps } from "./checkbox.types"

type CombinedProps = CheckboxProps & React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>

const Checkbox = React.forwardRef<React.ElementRef<typeof CheckboxPrimitive.Root>, CombinedProps>(
  ({ id, label, className, ...props }, ref) => (
    <div className="flex items-center">
      <CheckboxPrimitive.Root
        ref={ref}
        id={id}
        className={cn(
          "peer h-4 w-4 shrink-0 rounded border border-stroke bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&[data-state=checked]]:border-accent-red [&[data-state=checked]]:bg-accent-red",
          className,
        )}
        {...props}
      >
        <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-white")}>
          <CheckIcon />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <label
        htmlFor={id}
        className="cursor-pointer select-none pl-2 font-montserrat-semibold text-sm text-t-black peer-disabled:cursor-not-allowed peer-disabled:opacity-50"
      >
        {label}
      </label>
    </div>
  ),
)
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export default Checkbox
