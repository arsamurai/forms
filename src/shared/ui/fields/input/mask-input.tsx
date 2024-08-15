import { IMaskInputProps, IMaskMixin } from "react-imask"

import Input from "./input"
import { InputProps } from "./input.types"

const MaskInput = IMaskMixin<HTMLInputElement, IMaskInputProps<HTMLInputElement> & InputProps>(
  ({ inputRef, ...props }) => <Input ref={inputRef} {...props} />,
)

export default MaskInput
