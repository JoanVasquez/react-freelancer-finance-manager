import type { Column } from '@/components/ui/datatable/types'
import { Invoice } from '@/models'
import FormSelect from '@/components/ui/FormSelect'
import { invoiceStatusOptions } from '@/utils/invoiceStatus'

type Handlers = {
  onView: (row: Invoice) => void
  onStatusChange: (row: Invoice, status: Invoice['status']) => void
  rowStatus?: Record<string, Invoice['status']>
}

// Type guard to narrow a string to Invoice['status']
const isInvoiceStatus = (v: string): v is Invoice['status'] =>
  v === 'draft' || v === 'sent' || v === 'paid' || v === 'overdue'

const isFiniteNumber = (v: unknown): v is number =>
  typeof v === 'number' && Number.isFinite(v)

export const makeInvoiceColumns = ({
  onView,
  onStatusChange,
  rowStatus = {},
}: Handlers): Column<Invoice>[] => [
  // { key: 'id', label: 'ID', sortable: true },

  { key: 'clientName', label: 'Client', sortable: true },
  { key: 'clientEmail', label: 'Email', searchable: true },

  {
    key: 'dateIssued',
    label: 'Issued',
    sortable: true,
    accessor: (row: Invoice) => new Date(row.dateIssued),
    render: (_value: Invoice[keyof Invoice], row: Invoice) =>
      new Date(row.dateIssued).toLocaleDateString(),
  },
  {
    key: 'dueDate',
    label: 'Due Date',
    sortable: true,
    accessor: (row: Invoice) => (row.dueDate ? new Date(row.dueDate) : null),
    render: (_value: Invoice[keyof Invoice], row: Invoice) =>
      row.dueDate ? new Date(row.dueDate).toLocaleDateString() : '—',
  },
  {
    key: 'taxRate',
    label: 'Tax',
    sortable: true,
    render: (_value: Invoice[keyof Invoice], row: Invoice) =>
      row.taxRate !== undefined && row.taxRate !== null
        ? `${(row.taxRate * 100).toFixed(0)}%`
        : '—',
  },
  {
    key: 'total',
    label: 'Amount',
    sortable: true,
    render: (_value, row) => isFiniteNumber(row.total) ? `$${row.total.toFixed(2)}` : '—',
    headerClassName: 'text-right',
    cellClassName: 'text-right',
  },
  {
    id: 'statusBadge',
    key: 'status',
    label: 'Status',
    sortable: true,
    render: (_value: Invoice[keyof Invoice], row: Invoice) => (
      <span className={`status status--${row.status}`}>{row.status}</span>
    ),
  },

  {
    kind: 'actions',
    id: 'actions',
    label: 'Actions',
    actions: [
      {
        type: 'button',
        label: 'Detail',
        onClick: (row: Invoice) => onView(row),
      },
      {
        type: 'custom',
        render: (row: Invoice) => {
          const id = row.id ?? ''
          const current = rowStatus[id] ?? row.status // domain value

          return (
            <div className="actions-datatable" style={{ display: 'flex', gap: 8 }}>
              <FormSelect
                id={`status-${id}`}
                label=""
                value={current}                         // must match options.value
                options={invoiceStatusOptions}          // values: draft/sent/paid/overdue
                onChange={(value) => {
                  if (isInvoiceStatus(value)) onStatusChange(row, value)
                }}
              />
            </div>
          )
        },
      },
    ],
  },
]
