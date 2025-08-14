import React from 'react'
import { Column, SortState } from './types'
import { isActions, isField } from './utils'

type Props<T> = {
  columns: Column<T>[]
  sort: SortState<T>
  onSort: (col: Column<T>) => void
}

export function DataTableHeader<T>({ columns, sort, onSort }: Props<T>) {
  return (
    <thead>
      <tr>
        {columns.map((col) => {
          const isSorted = isField(col) && sort.key === col.key
          const thKey = col.id ?? (isActions(col) ? 'actions' : String((col as any).key))
          const sortable =
            isField(col) &&
            (col.sortable === true ||
              typeof col.sortable === 'function' ||
              col.sortable === undefined)

          return (
            <th
              key={thKey}
              onClick={sortable ? () => onSort(col) : undefined}
              className={[
                col.headerClassName ?? '',
                isSorted ? (sort.order === 'asc' ? 'sorted-asc' : 'sorted-desc') : '',
                sortable ? 'is-sortable' : '',
              ].join(' ')}
              style={{ cursor: sortable ? 'pointer' : 'default' }}
            >
              {col.label}
            </th>
          )
        })}
      </tr>
    </thead>
  )
}
