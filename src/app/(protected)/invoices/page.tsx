'use client'

import { useState } from 'react'
import { mockInvoices } from '@/mocks/invoices'
import { Invoice } from '@/models/Invoice'
import DataTable, { Column } from '@/components/ui/DataTable'
import CreateInvoiceModal from '@/components/invoices/CreateInvoiceModal'
import GenericButton from '@/components/ui/GenericButton'
import { useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '@/features'
import { addInvoiceThunk } from '@/features/thunks/financeThunks'
import { useSelector } from 'react-redux'
import InvoiceDetailModal from '@/components/invoices/InvoiceDetailModal'
import FormSelect from '@/components/ui/FormSelect'
import { invoiceStatusOptions } from '@/utils/invoiceStatus'


export default function InvoicesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAllColumns, setShowAllColumns] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [rowStatus, setRowStatus] = useState<Record<string, Invoice['status']>>({})

  const { invoices, loading, error } = useSelector(
    (state: RootState) => state.finance,
  )

  const dispatch = useDispatch<AppDispatch>()

  const allColumns: Column<Invoice & { actions: string }>[] = [
    //{ key: 'id', label: 'ID' },
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
      key: 'total',
      label: 'Amount',
      render: (value) => `$${(value as number).toFixed(2)}`,
    },
    {
      id: 'statusBadge',
      key: 'status',
      label: 'Status',
      render: (_, row) => {
        const id = row.id ?? ''
        const current = rowStatus[id] ?? row.status

        return <span className={`status status--${current.toLowerCase()}`}>
          {current as string}
        </span>
      },
    },
    {
      id: 'actions',
      key: 'actions',
      label: 'Actions',
      render: (_, row) => {
        const id = row.id ?? ''
        const current = rowStatus[id] ?? row.status

        return <div className='actions-datatable'>
          <GenericButton
            label="Detail"
            variant="secondary"
            onClick={() => {
              setSelectedInvoice(row)
              setShowDetailModal(true)
            }}
          />
          <FormSelect
            id={`status-${id}`} 
            value={current}
            options={invoiceStatusOptions}
            onChange={(value) =>
              setRowStatus((prev) => ({ ...prev, [id]: value }))
            }
          />
        </div>
      },
    },
  ]

  const defaultColumns = allColumns.slice(0, 5)

  const handlerSubmit = async (invoice: Invoice) => {
    dispatch(addInvoiceThunk(invoice))
  }

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
          data={[...invoices, ...mockInvoices]}
        />
      </div>

      <CreateInvoiceModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={(newInvoice: Invoice) => handlerSubmit(newInvoice)}
      />

      <InvoiceDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        invoice={selectedInvoice}
      />
    </div>
  )
}
