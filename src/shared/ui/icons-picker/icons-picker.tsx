import { FC } from "react"

import { Popover, PopoverContent, PopoverTrigger } from "@shared/ui/popover"
import { cn } from "@shared/utils/cn"

import { icons } from "./icons-array"
import { IconsPickerProps } from "./icons-picker.types"

const IconsPicker: FC<IconsPickerProps> = ({ icon, changeIcon, error, className }) => {
  const selectedIcon = icons.find(item => item.id === icon)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div
          className={cn("cursor-pointer space-y-1.5 text-t-black", {
            "text-error": error,
          })}
        >
          <div className="select-none font-montserrat-medium text-sm text-current">
            Выбор иконок
          </div>
          <div
            className={cn(
              "flex h-9 w-full rounded-[53px] border border-solid border-stroke bg-white px-3 py-2 font-open-sans-regular text-base text-t-black transition duration-200 ease-in-out",
              {
                "border-error focus:border-error": error,
              },
            )}
          >
            {selectedIcon ? selectedIcon.id : "Выберите"}
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent className={cn("flex flex-wrap gap-5 bg-white", className)}>
        {icons.map(item => (
          <span
            key={item.id}
            onClick={() => changeIcon(item.id)}
            className={cn("cursor-pointer rounded", { "bg-stroke-20": item.id === icon })}
          >
            {item.svg}
          </span>
        ))}
      </PopoverContent>
    </Popover>
  )
}

export default IconsPicker
