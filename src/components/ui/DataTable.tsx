'use client'

import React from 'react'
import Pagination from '@/components/ui/Pagination'
import FormInput from '@/components/ui/FormInput'
import { DataTableHeader } from './datatable/DataTableHeader'
import { DataTableBody } from './datatable/DataTableBody'
import { DataTableProps } from './datatable/types'
import { useDataTable } from '../../hooks/useDataTable'

export default function DataTable<T>({
  columns,
  data,
  itemsPerPage = 5,
  showSearch = true,
  showPagination = true,
  compact = false,
  className = '',
  keyExtractor,
  emptyState = 'No results found',
  onRowClick,
}: DataTableProps<T>) {
  const {
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    sort,
    handleSort,
    paginatedData,
    totalPages,
  } = useDataTable<T>({ columns, data, itemsPerPage })

  return (
    <div className={`datatable-wrapper ${compact ? 'datatable--compact' : ''} ${className}`}>
      {showSearch && (
        <FormInput
          id="datatable-search"
          label="Search"
          value={search}
          placeholder="Search..."
          onChange={(value) => {
            setSearch(value)
            setCurrentPage(1)
          }}
        />
      )}

      <table className="datatable">
        <DataTableHeader<T> columns={columns} sort={sort} onSort={handleSort} />
        <DataTableBody<T>
          columns={columns}
          rows={paginatedData}
          keyExtractor={keyExtractor}
          onRowClick={onRowClick}
          emptyState={emptyState}
        />
      </table>

      {showPagination && totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
      )}
    </div>
  )
}
