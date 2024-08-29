export interface FormContainerProps {
  containerIndex: number
  removeContainer: (index: number) => void
  moveContainer: (from: number, to: number) => void
}
