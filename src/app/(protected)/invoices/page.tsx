'use client'

import { useState } from 'react'
import { mockInvoices } from '@/mocks/invoices'
import { Invoice } from '@/models/Invoice'
import DataTable, { Column } from '@/components/ui/DataTable'
import CreateInvoiceModal from '@/components/invoices/CreateInvoiceModal'
import GenericButton from '@/components/ui/GenericButton'

export default function InvoicesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAllColumns, setShowAllColumns] = useState(false)

  const allColumns: Column<Invoice>[] = [
    { key: 'id', label: 'ID' },
    { key: 'clientName', label: 'Client' },
    { key: 'clientEmail', label: 'Email' },
    {
      key: 'dateIssued',
      label: 'Issued',
      render: (value) => value as string,
    },
    {
      key: 'dueDate',
      label: 'Due Date',
      render: (value) => (value as string) || '—',
    },
    {
      key: 'taxRate',
      label: 'Tax',
      render: (value) =>
        value !== undefined ? `${((value as number) * 100).toFixed(0)}%` : '—',
    },
    {
      key: 'items',
      label: 'Items',
      render: (value) => {
        const items = value as Invoice['items']
        return Array.isArray(items)
          ? `${items.length} item${items.length > 1 ? 's' : ''}`
          : '—'
      },
    },
    {
      key: 'total',
      label: 'Amount',
      render: (value) => `$${(value as number).toFixed(2)}`,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`status status--${(value as string).toLowerCase()}`}>
          {value as string}
        </span>
      ),
    },
  ]

  const defaultColumns = allColumns.slice(0, 5)

  return (
    <div className="invoices">
      <div className="invoices__header">
        <h1 className="invoices__title">🧾 Invoices</h1>
        <GenericButton
          variant="secondary"
          label="New Invoice"
          onClick={() => setShowCreateModal(true)}
        />
      </div>

      <p className="invoices__subtitle">Manage and track your invoices</p>

      <div style={{ marginBottom: '10px' }}>
        <GenericButton
          label={showAllColumns ? 'Show Less Columns' : 'Show All Columns'}
          onClick={() => setShowAllColumns((prev) => !prev)}
        />
      </div>

      <div className="datatable-container">
        <DataTable
          columns={showAllColumns ? allColumns : defaultColumns}
          data={mockInvoices}
        />
      </div>

      <CreateInvoiceModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={(newInvoice: Invoice) => {
          // TODO: lógica para añadir factura
        }}
      />
    </div>
  )
}
