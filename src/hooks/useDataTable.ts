import { useMemo, useState } from 'react'
import { Column, FieldColumn, SortState } from '../components/ui/datatable/types'
import { defaultComparatorForKey, isField } from '../components/ui/datatable/utils'
import { useSelector } from 'react-redux'
import { AppDispatch } from '@/features'
import { useDispatch } from 'react-redux'
import { setInvoicesCurrentPage } from '@/features/slices/paginationSlice'

type UseDataTableProps<T> = {
  columns: Column<T>[]
  data: T[]
  itemsPerPage: number
}

export function useDataTable<T>({ columns, data, itemsPerPage }: UseDataTableProps<T>) {
  const [search, setSearch] = useState('')
  const currentPage = useSelector((state: any) => state.pagination.invoicesCurrentPage)
  const dispatch = useDispatch<AppDispatch>()
  const [sort, setSort] = useState<SortState<T>>({ order: 'asc' })

  const setCurrentPage = (page: number) => {
    dispatch(setInvoicesCurrentPage(page))
  }

  const searchableColumns = useMemo(
    () => columns.filter((c) => isField(c) && (c.searchable ?? true)) as FieldColumn<T>[],
    [columns],
  )

  const filteredData = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return data

    return data.filter((row) =>
      searchableColumns.some((col) => {
        const raw = col.accessor ? col.accessor(row) : (row as any)[col.key]
        const value = raw == null ? '' : String(raw).toLowerCase()
        return value.includes(term)
      }),
    )
  }, [data, search, searchableColumns])

  const sortedData = useMemo(() => {
    if (!sort.comparator) return filteredData
    const factor = sort.order === 'asc' ? 1 : -1
    return [...filteredData].sort((a, b) => factor * sort.comparator!(a, b))
  }, [filteredData, sort])

  const totalPages = Math.max(1, Math.ceil(sortedData.length / itemsPerPage))
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    return sortedData.slice(start, start + itemsPerPage)
  }, [sortedData, currentPage, itemsPerPage])

  const handleSort = (col: Column<T>) => {
    if (!isField(col)) return
    if (col.sortable === false) return

    let comparator: ((a: T, b: T) => number) | undefined
    if (typeof col.sortable === 'function') {
      comparator = col.sortable
    } else if (col.sortable === true || col.sortable === undefined) {
      comparator = defaultComparatorForKey<T>(col.key, col.accessor)
    }
    if (!comparator) return

    setSort((prev) => {
      const isSame = prev.key === col.key
      return {
        key: col.key,
        comparator,
        order: isSame ? (prev.order === 'asc' ? 'desc' : 'asc') : 'asc',
      }
    })
  }

  return {
    // state
    search,
    currentPage,
    sort,
    // setters
    setSearch,
    setCurrentPage,
    setSort,
    // computed
    filteredData,
    sortedData,
    paginatedData,
    totalPages,
    // actions
    handleSort,
  }
}
