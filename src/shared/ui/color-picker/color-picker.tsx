import { FC, useEffect, useRef, useState } from "react"
import { HexColorPicker } from "react-colorful"

import { ColorPickerProps } from "./color-picker.types"

const ColorPicker: FC<ColorPickerProps> = ({ color, changeColor }) => {
  const [isPickerOpen, setIsPickerOpen] = useState(false)
  const pickerRef = useRef<HTMLDivElement>(null)

  const togglePicker = () => setIsPickerOpen(!isPickerOpen)

  const handleClickOutside = (event: MouseEvent) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
      setIsPickerOpen(false)
    }
  }

  useEffect(() => {
    if (isPickerOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    } else {
      document.removeEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isPickerOpen])

  return (
    <div className="relative">
      <div
        onClick={togglePicker}
        className="h-[38px] w-full cursor-pointer rounded-[20px] border border-solid border-stroke"
        style={{ backgroundColor: color }}
      />
      {isPickerOpen && (
        <div ref={pickerRef} className="absolute z-[1] mt-2">
          <HexColorPicker color={color} onChange={changeColor} className="[&>div]:rounded-b-none" />
          <input
            value={color}
            onChange={e => changeColor(e.target.value)}
            className="w-full rounded-b-lg border border-solid border-stroke px-1 outline-none"
          />
        </div>
      )}
    </div>
  )
}

export default ColorPicker
