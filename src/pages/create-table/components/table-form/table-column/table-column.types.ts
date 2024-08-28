export interface TableColumnProps {
  columnIndex: number
  removeColumn: (index: number) => void
  moveColumn: (from: number, to: number) => void
}
