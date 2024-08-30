export const formatSelectOptions = (entity?: { id: number; title: string }[]) =>
  entity?.map(item => ({ value: item.id, label: item.title }))
