'use client'

import { mockInvoices } from '@/mocks/invoices'
import { Invoice } from '@/models/Invoice'
import DataTable, { Column } from '@/components/ui/DataTable'

export default function InvoicesPage() {
  const columns: Column<Invoice>[] = [
    { key: 'id', label: 'ID' },
    { key: 'clientName', label: 'Client' },
    {
      key: 'total',
      label: 'Amount',
      render: (value) => `$${(value as number).toFixed(2)}`,
    },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`status status--${value?.toString().toLowerCase()}`}>
          {value?.toString()}
        </span>
      ),
    },
    { key: 'dateIssued', label: 'Date Issued' },
  ]

  return (
    <div className="invoices">
      <h1 className="invoices__title">🧾 Invoices</h1>
      <p className="invoices__subtitle">Manage and track your invoices</p>

      <DataTable columns={columns} data={mockInvoices as Invoice[]} />
    </div>
  )
}
