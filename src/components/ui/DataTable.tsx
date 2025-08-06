'use client'

import { useState, useMemo } from 'react'
import Pagination from '@/components/ui/Pagination'
import FormInput from '@/components/ui/FormInput' // 👈 Importar componente reutilizable

export type Column<T> = {
  key: keyof T
  label: string
  render?: (value: T[keyof T], row: T) => React.ReactNode
}

export default function DataTable<T>({
  columns,
  data,
  itemsPerPage = 5,
}: {
  columns: Column<T>[]
  data: T[]
  itemsPerPage?: number
}) {
  const [sortKey, setSortKey] = useState<keyof T | null>(null)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState<number>(1)

  // 🔍 Búsqueda en tiempo real
  const filteredData = useMemo(() => {
    if (!search.trim()) return data
    return data.filter((row) =>
      columns.some((col) => {
        const value = String(row[col.key] ?? '').toLowerCase()
        return value.includes(search.toLowerCase())
      }),
    )
  }, [search, data, columns])

  // 🔽 Ordenamiento
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

  // 📄 Paginación
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortKey(key)
      setSortOrder('asc')
    }
  }

  return (
    <div>
      {/* 🔍 Search Input usando FormInput */}
      <FormInput
        id="datatable-search"
        label="Search"
        value={search}
        placeholder="Search..."
        onChange={(value) => {
          setSearch(value)
          setCurrentPage(1) // Reinicia a la primera página al buscar
        }}
      />

      {/* 📊 Tabla */}
      <table className="datatable">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
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
                <td key={String(col.key)}>
                  {col.render
                    ? col.render(row[col.key], row)
                    : String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* 📌 Paginación */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
