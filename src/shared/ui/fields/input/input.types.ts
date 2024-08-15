export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helpText?: string
  error?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}
