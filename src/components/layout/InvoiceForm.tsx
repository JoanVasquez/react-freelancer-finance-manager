import { useState } from 'react'
import FormInput from '@/components/ui/FormInput'
import GenericButton from '@/components/ui/GenericButton'
import Modal from '@/components/ui/Modal'
import { Invoice } from '@/models/Invoice'

type InvoiceFormProps = {
  onClose: () => void
  onSave: (invoice: Invoice) => void
}

export default function InvoiceForm({ onClose, onSave }: InvoiceFormProps) {
  const [id, setId] = useState('')
  const [clientName, setClientName] = useState('')
  const [total, setTotal] = useState('')
  const [status, setStatus] = useState('draft')
  const [dateIssued, setDateIssued] = useState('')

  const handleSubmit = () => {
    if (!id || !clientName || !total || !dateIssued) {
      alert('Please fill all required fields.')
      return
    }

    onSave({
      id,
      clientName,
      total: parseFloat(total),
      status,
      dateIssued,
    })
  }

  return (
    <Modal
      title="New Invoice"
      onClose={onClose}
      footer={
        <>
          <GenericButton label="Cancel" onClick={onClose} />
          <GenericButton label="Save" onClick={handleSubmit} />
        </>
      }
    >
      <FormInput id="id" label="Invoice ID" value={id} onChange={setId} />
      <FormInput
        id="clientName"
        label="Client Name"
        value={clientName}
        onChange={setClientName}
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
    </Modal>
  )
}
