import * as AccordionPrimitive from "@radix-ui/react-accordion"
import * as React from "react"

import { cn } from "@shared/utils/cn"

import ArrowIcon from "@assets/icons/select/select-arrow.svg"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ ...props }, ref) => <AccordionPrimitive.Item ref={ref} {...props} />)
AccordionItem.displayName = "AccordionItem"

const AccordionHeader = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Header>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className={cn("overflow-hidden", className)} ref={ref} {...props}>
    {children}
  </AccordionPrimitive.Header>
))
AccordionHeader.displayName = AccordionPrimitive.Header.displayName

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Trigger
    ref={ref}
    className={cn(
      "group relative flex w-full items-center justify-between text-left transition-all [&[data-disabled]]:opacity-45",
      className,
    )}
    {...props}
  >
    {children}
    <div className="arrow text-primary transition-transform duration-300 *:size-4 group-data-[state=open]:rotate-180">
      <ArrowIcon />
    </div>
  </AccordionPrimitive.Trigger>
))
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className,
    )}
    {...props}
  >
    <div className="px-5 pb-5">{children}</div>
  </AccordionPrimitive.Content>
))

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionHeader, AccordionTrigger, AccordionContent }
