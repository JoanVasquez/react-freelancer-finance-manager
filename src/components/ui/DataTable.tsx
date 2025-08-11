'use client'

import { useState, useMemo } from 'react'
import Pagination from '@/components/ui/Pagination'
import FormInput from '@/components/ui/FormInput' // 👈 Importar componente reutilizable

export type Column<T> = {
  id?: string
  key: keyof T
  label: string
  render?: (value: T[keyof T], row: T) => React.ReactNode
  sortable?: boolean
}

export default function DataTable<T>({
  columns,
  data,
  itemsPerPage = 5,
  showSearch = true,
  showPagination = true,
  compact = false,
  className = ''
}: {
  columns: Column<T>[]
  data: T[]
  itemsPerPage?: number,
  showSearch?: boolean
  showPagination?: boolean
  compact?: boolean
  className?: string
}) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState<number>(1)

  const filteredData = useMemo(() => {
    if (!search.trim()) return data
    return data.filter((row) =>
      columns.some((col) => {
        const value = String(row[col.key] ?? '').toLowerCase()
        return value.includes(search.toLowerCase())
      }),
    )
  }, [search, data, columns])

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortKey]
      const bValue = b[sortKey]
      if (aValue! < bValue!) return sortOrder === 'asc' ? -1 : 1
      if (aValue! > bValue!) return sortOrder === 'asc' ? 1 : -1
      return 0
    })
  }, [filteredData, sortKey, sortOrder])

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleSort = (key: keyof T) => {
    const col = columns.find(c => c.key === key);
    if (col && col.sortable === false) return;

    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  return (
    <div className={`datatable-wrapper ${compact ? 'datatable--compact' : ''} ${className}`}>
      
    {showSearch && (
        <FormInput
          id="datatable-search"
          label="Search"
          value={search}
          placeholder="Search..."
          onChange={(value) => { setSearch(value); setCurrentPage(1); }}
        />
      )}

      <table className="datatable">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.id ?? String(col.key)}
                onClick={() => handleSort(col.key)}
                className={
                  sortKey === col.key
                    ? sortOrder === 'asc'
                      ? 'sorted-asc'
                      : 'sorted-desc'
                    : ''
                }
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => (
                <td key={col.id ?? String(col.key)}>
                  {col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  )
}
