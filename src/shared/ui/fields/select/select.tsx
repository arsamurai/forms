import React from "react"
import { default as CustomSelect, GroupBase, Props } from "react-select"

import { cn } from "@shared/utils/cn"

import DropdownIndicator from "./components/dropdown-indicator"
import {
  clearIndicatorStyles,
  controlStyles,
  indicatorContainerStyles,
  menuStyles,
  multiOptionStyles,
  multiValueLabelStyles,
  multiValueRemoveStyles,
  multiValueStyles,
  noOptionsMessageStyles,
  optionStyles,
  placeholderStyles,
  valueContainerStyles,
} from "./select.styles"
import { CustomSelectProps } from "./select.types"

function Select<
  OptionType,
  IsMulti extends boolean = false,
  GroupType extends GroupBase<OptionType> = GroupBase<OptionType>,
>({
  label,
  error,
  helpText,
  className,
  components,
  ...props
}: Props<OptionType, IsMulti, GroupType> & CustomSelectProps) {
  return (
    <div className={cn("space-y-1.5 text-t-black", { "text-error": error }, className)}>
      {label && <label className="font-montserrat-medium text-sm text-current">{label}</label>}
      <CustomSelect
        unstyled
        classNamePrefix="select"
        components={{ DropdownIndicator, ...components }}
        classNames={{
          control: ({ isFocused, isDisabled }) =>
            cn(
              controlStyles.base,
              isFocused && controlStyles.focused,
              isDisabled && controlStyles.disabled,
              {
                "border-error": error,
              },
              {
                "shadow-shadow-error": isFocused && error,
              },
            ),
          placeholder: () => placeholderStyles,
          valueContainer: () => valueContainerStyles,
          indicatorsContainer: () => indicatorContainerStyles,
          menu: () => menuStyles,
          option: ({ isSelected, isFocused, isMulti, isDisabled }) =>
            isMulti
              ? cn(
                  multiOptionStyles.base,
                  isFocused && multiOptionStyles.focused,
                  isSelected && multiOptionStyles.selected,
                  isDisabled && optionStyles.disabled,
                )
              : cn(
                  isFocused && optionStyles.focused,
                  isSelected && optionStyles.selected,
                  isDisabled && optionStyles.disabled,
                  optionStyles.base,
                ),
          noOptionsMessage: () => noOptionsMessageStyles,
          multiValue: () => multiValueStyles,
          multiValueLabel: () => multiValueLabelStyles,
          multiValueRemove: ({ isFocused }) =>
            cn(multiValueRemoveStyles.base, isFocused && multiValueRemoveStyles.focused),
          clearIndicator: () => clearIndicatorStyles,
          loadingMessage: () => noOptionsMessageStyles,
        }}
        styles={{ menuPortal: base => ({ ...base, zIndex: 9999 }) }}
        menuPortalTarget={document.body}
        {...props}
      />
      {helpText && <p className="font-open-sans-regular text-sm text-current">{helpText}</p>}
    </div>
  )
}

export default Select
