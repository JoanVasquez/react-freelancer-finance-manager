import { ActionsColumn, Column, FieldColumn } from './types'

export function compareUnknown(a: unknown, b: unknown): number {
  if (a == null && b == null) return 0
  if (a == null) return -1
  if (b == null) return 1

  if (a instanceof Date || b instanceof Date) {
    const av = a instanceof Date ? a.getTime() : new Date(String(a)).getTime()
    const bv = b instanceof Date ? b.getTime() : new Date(String(b)).getTime()
    return av - bv
  }

  if (typeof a === 'number' && typeof b === 'number') return a - b
  if (typeof a === 'boolean' && typeof b === 'boolean') return Number(a) - Number(b)

  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' })
}

export function defaultComparatorForKey<T>(
  key: keyof T,
  accessor?: (row: T) => unknown,
) {
  return (a: T, b: T) => {
    const av = accessor ? accessor(a) : (a as any)[key]
    const bv = accessor ? accessor(b) : (b as any)[key]
    return compareUnknown(av, bv)
  }
}

export function isActions<T>(col: Column<T>): col is ActionsColumn<T> {
  return (col as ActionsColumn<T>).kind === 'actions'
}

export function isField<T>(col: Column<T>): col is FieldColumn<T> {
  return !isActions(col)
}
