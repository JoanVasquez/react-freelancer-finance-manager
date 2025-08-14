import React from 'react'

export type BaseColumn<T> = {
  id?: string
  label: string
  headerClassName?: string
  cellClassName?: string
}

export type FieldColumn<T> = BaseColumn<T> & {
  kind?: 'field'
  key: keyof T
  render?: (value: T[keyof T], row: T) => React.ReactNode
  sortable?: boolean | ((a: T, b: T) => number)
  searchable?: boolean
  accessor?: (row: T) => unknown
}

export type RowAction<T> =
  | {
      type: 'button'
      label: string
      onClick: (row: T) => void
      buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>
    }
  | {
      type: 'input'
      inputProps?: React.InputHTMLAttributes<HTMLInputElement>
      onChange?: (value: string, row: T) => void
    }
  | {
      type: 'custom'
      render: (row: T) => React.ReactNode
    }

export type ActionsColumn<T> = BaseColumn<T> & {
  kind: 'actions'
  render?: (row: T) => React.ReactNode
  actions?: RowAction<T>[]
}

export type Column<T> = FieldColumn<T> | ActionsColumn<T>

export type SortState<T> = {
  key?: keyof T
  comparator?: (a: T, b: T) => number
  order: 'asc' | 'desc'
}

export type DataTableProps<T> = {
  columns: Column<T>[]
  data: T[]
  itemsPerPage?: number
  showSearch?: boolean
  showPagination?: boolean
  compact?: boolean
  className?: string
  keyExtractor?: (row: T, index: number) => React.Key
  emptyState?: React.ReactNode
  onRowClick?: (row: T) => void
}
