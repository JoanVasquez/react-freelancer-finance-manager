import { Invoice } from '@/models/Invoice'
import InvoiceForm from '@/components/invoices/InvoiceForm'
import Modal from '@/components/ui/Modal'

type CreateInvoiceModalProps = {
  isOpen: boolean
  onClose: () => void
  onCreate: (invoice: Invoice) => void
}

export default function CreateInvoiceModal({
  isOpen,
  onClose,
  onCreate,
}: CreateInvoiceModalProps) {
  if (!isOpen) return null

  return (
    <Modal title="Create Invoice" onClose={onClose}>
      <InvoiceForm
        onClose={onClose}
        onSave={(invoice) => {
          onCreate(invoice)
          onClose()
        }}
      />
    </Modal>
  )
}
