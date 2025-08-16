'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataTable from '@/components/ui/DataTable'
import GenericButton from '@/components/ui/GenericButton'
import CreateInvoiceModal from '@/components/invoices/CreateInvoiceModal'
import InvoiceDetailModal from '@/components/invoices/InvoiceDetailModal'
import { AppDispatch, RootState } from '@/features'
import {
  addInvoiceThunk,
  getInvoicesThunk,
  getOverdueInvoicesThunk,
  updateInvoiceThunk,
} from '@/features/thunks/financeThunks'
import { Invoice } from '@/models/Invoice'
import { makeInvoiceColumns } from '@/utils/invoice_columns' // <- fábrica de columnas con acciones
import { setInvoicesCurrentPage } from '@/features/slices/paginationSlice'

const isInvoice = (x: unknown): x is Invoice => {
  if (!x || typeof x !== 'object') return false
  const o = x as Record<string, unknown>
  return (
    typeof o.clientName === 'string' &&
    typeof o.clientEmail === 'string' &&
    typeof o.dateIssued === 'string' &&
    Array.isArray(o.items) &&
    typeof o.status === 'string'
  )
}

export default function InvoicesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showAllColumns, setShowAllColumns] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [rowStatus, setRowStatus] = useState<Record<string, Invoice['status']>>(
    {},
  )
  const [showOverdue, setShowOverdue] = useState<boolean>(false)

  const dispatch = useDispatch<AppDispatch>()
  const { invoices, loading, error } = useSelector(
    (state: RootState) => state.finance,
  )

  useEffect(() => {
    if (showOverdue) {
      dispatch(getOverdueInvoicesThunk())
    } else {
      dispatch(getInvoicesThunk())
    }
    dispatch(setInvoicesCurrentPage(1))
  }, [dispatch, showOverdue])

  const updateInvoice = useCallback(
    (invoice: Invoice) => {
      dispatch(updateInvoiceThunk(invoice))
    },
    [dispatch],
  )

  const onView = useCallback((row: Invoice) => {
    setSelectedInvoice(row)
    setShowDetailModal(true)
  }, [])

  const onStatusChange = useCallback(
    (row: Invoice, status: Invoice['status']) => {
      const next = { ...row, status }
      setRowStatus((prev) => ({ ...prev, [row.id ?? '']: status }))
      updateInvoice(next)

      if (status !== 'overdue') {
        setShowOverdue(false)
      }
    },
    [updateInvoice],
  )

  const columns = useMemo(
    () =>
      makeInvoiceColumns({
        onView,
        onStatusChange,
        rowStatus,
      }),
    [onView, onStatusChange, rowStatus],
  )

  const defaultColumns = useMemo(() => columns.slice(0, 5), [columns])

  const handlerSubmit = async (invoice: Invoice) => {
    dispatch(addInvoiceThunk(invoice))
  }

  const normalizedInvoices = useMemo(() => {
    const out: Invoice[] = []
    for (const item of invoices as unknown[]) {
      if (Array.isArray(item)) {
        for (const inner of item) if (isInvoice(inner)) out.push(inner)
      } else if (isInvoice(item)) {
        out.push(item)
      }
    }
    return out
  }, [invoices])

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

      <div style={{ marginBottom: '10px', display: 'flex', gap: 8 }}>
        <GenericButton
          label={showAllColumns ? 'Show Less Columns' : 'Show All Columns'}
          onClick={() => setShowAllColumns((prev) => !prev)}
        />
        <GenericButton
          label={showOverdue ? 'Show all invoices' : 'Show overdue'}
          variant="outline"
          onClick={() => setShowOverdue((prev) => !prev)}
        />
      </div>

      {error && (
        <div
          className="alert alert-error"
          role="alert"
          style={{ marginBottom: 12 }}
        >
          {String(error)}
        </div>
      )}

      <div className="datatable-container">
        {loading ? (
          <div style={{ padding: '1rem' }}>Loading invoices…</div>
        ) : (
          <DataTable
            columns={showAllColumns ? columns : defaultColumns}
            data={normalizedInvoices}
            keyExtractor={(row, i) => row.id ?? `inv-${i}`}
            itemsPerPage={10}
          />
        )}
      </div>

      <CreateInvoiceModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handlerSubmit}
      />

      <InvoiceDetailModal
        isOpen={showDetailModal}
        onClose={() => setShowDetailModal(false)}
        invoice={selectedInvoice}
      />
    </div>
  )
}
