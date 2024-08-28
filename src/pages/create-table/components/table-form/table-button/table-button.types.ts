export interface TableButtonProps {
  buttonIndex: number
  removeButton: (index: number) => void
  moveButton: (from: number, to: number) => void
}
