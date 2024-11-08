export interface IconsPickerProps {
  icon: string | null
  changeIcon: (newId: string) => void
  error?: boolean
  className?: string
}
