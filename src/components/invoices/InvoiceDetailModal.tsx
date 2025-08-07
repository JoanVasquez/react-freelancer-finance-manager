import Modal from '@/components/ui/Modal'
import { Invoice } from '@/models/Invoice'
import GenericButton from '@/components/ui/GenericButton'

type InvoiceDetailModalProps = {
  isOpen: boolean
  onClose: () => void
  invoice: Invoice | null
}

export default function InvoiceDetailModal({
  isOpen,
  onClose,
  invoice,
}: InvoiceDetailModalProps) {
  if (!isOpen || !invoice) return null

  return (
    <Modal title={`Invoice Details - ${invoice.id}`} onClose={onClose}>
      <div className="invoice-detail">
        <section className="invoice-detail__section">
          <h3>Client Info</h3>
          <p>
            <strong>Name:</strong> {invoice.clientName}
          </p>
          <p>
            <strong>Email:</strong> {invoice.clientEmail}
          </p>
        </section>

        <section className="invoice-detail__section">
          <h3>Invoice Info</h3>
          <p>
            <strong>Date Issued:</strong> {invoice.dateIssued}
          </p>
          <p>
            <strong>Due Date:</strong> {invoice.dueDate || '—'}
          </p>
          <p>
            <strong>Status:</strong>{' '}
            <span className={`badge badge--${invoice.status.toLowerCase()}`}>
              {invoice.status}
            </span>
          </p>
          <p>
            <strong>Tax Rate:</strong>{' '}
            {invoice.taxRate ? `${(invoice.taxRate * 100).toFixed(0)}%` : '—'}
          </p>
        </section>

        <section className="invoice-detail__section">
          <h3>Items</h3>
          {invoice.items.length === 0 ? (
            <p>No items</p>
          ) : (
            <table className="invoice-detail__table">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>${item.unitPrice.toFixed(2)}</td>
                    <td>${(item.quantity * item.unitPrice).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="invoice-detail__section invoice-detail__total">
          <h3>Total:</h3>
          <p>${invoice.total.toFixed(2)}</p>
        </section>

        <div className="invoice-detail__actions">
          <GenericButton label="Close" onClick={onClose} />
        </div>
      </div>
    </Modal>
  )
}
