import { useState } from 'react'
import { Invoice } from '@/models/Invoice'
import FormInput from '@/components/ui/FormInput'
import FormSelect from '@/components/ui/FormSelect'
import { invoiceStatusOptions } from '@/utils/invoiceStatus'
import GenericButton from '@/components/ui/GenericButton'

type InvoiceFormProps = {
  onClose: () => void
  onSave: (invoice: Invoice) => void
}

export default function InvoiceForm({ onClose, onSave }: InvoiceFormProps) {
  const [clientName, setClientName] = useState('')
  const [clientEmail, setClientEmail] = useState('')
  const [total, setTotal] = useState('')
  const [status, setStatus] = useState<Invoice['status']>('draft')
  const [dateIssued, setDateIssued] = useState('')

  const handleSubmit = () => {
    if (!clientName || !clientEmail || !total || !dateIssued) {
      alert('Please fill all required fields.')
      return
    }

    const newInvoice: Invoice = {
      clientName,
      clientEmail,
      total: parseFloat(total),
      dateIssued,
      status,
      items: [],
    }

    onSave(newInvoice)
  }

  return (
    <div className="invoice-form">
      <FormInput
        id="clientName"
        label="Client Name"
        value={clientName}
        onChange={setClientName}
      />
      <FormInput
        id="clientEmail"
        label="Client Email"
        value={clientEmail}
        onChange={setClientEmail}
      />
      <FormInput
        id="total"
        label="Amount"
        type="number"
        value={total}
        onChange={setTotal}
      />
      <FormInput
        id="dateIssued"
        label="Date Issued"
        type="date"
        value={dateIssued}
        onChange={setDateIssued}
      />
      <FormSelect
        id="status"
        label="Status"
        value={status}
        options={invoiceStatusOptions}
        onChange={setStatus}
      />

      <div className="invoice-form__actions">
        <GenericButton label="Cancel" onClick={onClose} />
        <GenericButton label="Save" onClick={handleSubmit} />
      </div>
    </div>
  )
}
