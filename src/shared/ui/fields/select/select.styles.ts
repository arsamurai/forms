const controlStyles = {
  base: "bg-white hover:cursor-pointer flex transition duration-200 ease-in-out min-h-9 w-full font-open-sans-regular rounded-[20px] border border-solid border-stroke px-3 py-1 text-base text-t-black outline-none placeholder:text-t-gray",
  focused: "border-primary shadow-shadow-primary",
}
const valueContainerStyles = "gap-2"
const placeholderStyles = "text-t-gray text-base font-open-sans-regular"
const indicatorContainerStyles = "ml-3.5"
const menuStyles =
  "my-2 border-[0.5px] font-open-sans-regular border-stroke border-solid rounded-[20px] shadow-shadow-gray overflow-hidden text-sm bg-white text-t-black"
const optionStyles = {
  base: "hover:cursor-pointer px-2.5 py-2",
  focused: "bg-stroke-20",
  selected: "bg-accent-red text-white",
  disabled: "opacity-50 pointer-events-none",
}
const multiOptionStyles = {
  base: "before:content-[url('@assets/icons/select/select-box.svg')] before:align-sub before:mr-3 hover:cursor-pointer px-4 py-2.5",
  focused: "bg-stroke-20",
  selected: "before:content-[url('@assets/icons/select/select-check.svg')]",
}
const noOptionsMessageStyles = "text-t-gray p-2.5 rounded-[20px]"
const multiValueStyles =
  "hover:bg-stroke bg-stroke-20 rounded-2xl items-center text-t-black text-sm py-1 px-2"
const multiValueLabelStyles = "mr-1"
const multiValueRemoveStyles = {
  base: "hover:text-error",
  focused: "text-error",
}
const clearIndicatorStyles = "opacity-0 pointer-events-none invisible w-0"

export {
  controlStyles,
  placeholderStyles,
  indicatorContainerStyles,
  menuStyles,
  optionStyles,
  noOptionsMessageStyles,
  multiOptionStyles,
  multiValueStyles,
  multiValueLabelStyles,
  valueContainerStyles,
  clearIndicatorStyles,
  multiValueRemoveStyles,
}
