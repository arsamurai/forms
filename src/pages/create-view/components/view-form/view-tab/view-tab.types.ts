export interface ViewTabProps {
  tabIndex: number
  removeTab: (index: number) => void
  moveTab: (from: number, to: number) => void
}
