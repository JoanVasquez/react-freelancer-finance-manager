import { Invoice } from '@/models/Invoice'
import Modal from '../ui/Modal'
import DataTable, { Column } from '../ui/DataTable'

interface Props {
  invoice: Invoice | null
  isOpen: boolean
  onClose: () => void
}

export default function InvoiceDetailModal({ invoice, isOpen, onClose }: Props) {
  if (!isOpen || !invoice) return null

  const items = invoice.items ?? []
  const subtotal = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0)
  const rate = invoice.taxRate ?? 0
  const taxAmount = subtotal * rate
  const total = subtotal + taxAmount

  const itemColumns: Column<Invoice['items'][number]>[] = [
  { id: 'desc',  key: 'description', label: 'Description', sortable: false },
  { id: 'qty',   key: 'quantity',    label: 'Qty' },
  {
    id: 'price',
    key: 'unitPrice',
    label: 'Price',
    render: (value) => `$${(value as number).toFixed(2)}`,
  },
  {
    id: 'total',
    key: 'unitPrice',
    label: 'Total',
    sortable: false,
    render: (_, row) => `$${(row.quantity * row.unitPrice).toFixed(2)}`,
  },
]

  return (
    <Modal title={`Invoice Details`} style={{
      width: "100px"
    }} onClose={onClose}>
      <div className="invoice-detail">
        <p className="invoice-detail__id">#{invoice.id}</p>

        <div className="invoice-detail__section-grid">
          <div className="invoice-detail__card">
            <h4>Client Info</h4>
            <p><strong>Name:</strong> {invoice.clientName}</p>
            <p><strong>Email:</strong> {invoice.clientEmail}</p>
          </div>

          <div className="invoice-detail__card">
            <h4>Invoice Info</h4>
            <p><strong>Date Issued:</strong> {invoice.dateIssued}</p>
            <p><strong>Due Date:</strong> {invoice.dueDate || '—'}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span className={`badge badge--${invoice.status.toLowerCase()}`}>
                {invoice.status}
              </span>
            </p>
            <p><strong>Tax Rate:</strong> {(rate * 100).toFixed(0)}%</p>
          </div>
        </div>

        <div className="invoice-detail__section">
          <h4>Items</h4>
          <DataTable
            columns={itemColumns}
            data={items}
            showSearch={false}
            showPagination={false}
            compact
            className="invoice-detail__datatable"
          />
        </div>

        <div className="invoice-detail__total">
          <h4>Total:</h4>
          <p>${total.toFixed(2)}</p>
        </div>

        <div className="invoice-detail__actions">
          <button className="btn btn-primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </Modal>
  )
}

