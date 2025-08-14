import React from 'react'
import { Column } from './types'
import { isActions } from './utils'
import GenericButton from '../GenericButton'

type Props<T> = {
  columns: Column<T>[]
  rows: T[]
  keyExtractor?: (row: T, index: number) => React.Key
  onRowClick?: (row: T) => void
  emptyState?: React.ReactNode
}

export function DataTableBody<T>({
  columns,
  rows,
  keyExtractor,
  onRowClick,
  emptyState = 'No results found',
}: Props<T>) {
  if (rows.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length} style={{ textAlign: 'center', padding: '1rem' }}>
            {emptyState}
          </td>
        </tr>
      </tbody>
    )
  }

  return (
    <tbody>
      {rows.map((row, idx) => {
        const rowKey = keyExtractor ? keyExtractor(row, idx) : idx
        return (
          <tr
            key={rowKey}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            style={{ cursor: onRowClick ? 'pointer' : 'default' }}
          >
            {columns.map((col) => {
              const tdKey = col.id ?? (isActions(col) ? 'actions' : String((col as any).key))

              if (isActions<T>(col)) {
                if (col.render) {
                  return (
                    <td key={tdKey} className={col.cellClassName}>
                      {col.render(row)}
                    </td>
                  )
                }
                return (
                  <td key={tdKey} className={col.cellClassName}>
                    <div className="datatable-actions" style={{ display: 'flex', gap: 8 }}>
                      {(col.actions ?? []).map((action, i) => {
                        if (action.type === 'button') {
                          const { label, onClick, buttonProps } = action
                          return (
                            <GenericButton
                              key={i}
                              {...buttonProps}
                              onClick={(e) => {
                                e.stopPropagation()
                                onClick(row)
                              }}
                              label={label}
                              variant='primary'
                              />
                          )
                        }
                        if (action.type === 'input') {
                          const { inputProps, onChange } = action
                          return (
                            <input
                              key={i}
                              {...inputProps}
                              onClick={(e) => e.stopPropagation()}
                              onChange={(e) => {
                                inputProps?.onChange?.(e)
                                onChange?.(e.target.value, row)
                              }}
                            />
                          )
                        }
                        // custom
                        return (
                          <span key={i} onClick={(e) => e.stopPropagation()}>
                            {action.render(row)}
                          </span>
                        )
                      })}
                    </div>
                  </td>
                )
              }

              // field cell
              const field = col as any
              const raw = field.accessor ? field.accessor(row) : (row as any)[field.key]
              const content = field.render != null ? field.render(raw, row) : String(raw ?? '')

              return (
                <td key={tdKey} className={col.cellClassName}>
                  {content}
                </td>
              )
            })}
          </tr>
        )
      })}
    </tbody>
  )
}
