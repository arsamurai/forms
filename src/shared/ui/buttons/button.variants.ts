import { cva } from "class-variance-authority"

export const buttonVariants = cva(
  "w-full font-open-sans-semibold inline-flex transition duration-200 ease-in-out items-center justify-center disabled:pointer-events-none disabled:opacity-30 rounded-[44px] outline-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary-focused focus:bg-primary-focused focus:shadow-shadow-primary",
        secondary:
          "bg-white text-t-black border border-solid border-stroke hover:bg-accent-red hover:text-white hover:border-accent-red focus:text-white focus:bg-accent-red focus:border-accent-red focus:shadow-shadow-gray",
        text: "bg-transparent text-black hover:text-primary focus:text-primary",
      },
      size: {
        medium: "px-5 h-[42px] text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "medium",
    },
  },
)
