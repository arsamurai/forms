export interface ListHeaderProps {
  title: string
  link: string
}

export interface ListItemProps<T extends BaseListItemProps> {
  entity: T
  link: string
  deleteEntity: (id: number) => void
}

export interface BaseListItemProps {
  id: number
  title: string
  unique_id: string
}
