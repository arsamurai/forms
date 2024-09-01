export interface ViewBlockProps {
  blockIndex: number
  removeBlock: (index: number) => void
  moveBlock: (from: number, to: number) => void
}
