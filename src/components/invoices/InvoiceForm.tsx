import { useState, useMemo } from 'react'
import { Invoice } from '@/models/Invoice'
import FormInput from '@/components/ui/FormInput'
import FormSelect from '@/components/ui/FormSelect'
import { invoiceStatusOptions } from '@/utils/invoiceStatus'
import GenericButton from '@/components/ui/GenericButton'
import InvoiceItemsEditor from '@/components/invoices/InvoiceItemsEditor'
import { validateInputs, ValidationSchema } from '@/utils/validation'

type InvoiceFormProps = {
  onClose: () => void
  onSave: (invoice: Invoice) => void
}

export default function InvoiceForm({ onClose, onSave }: InvoiceFormProps) {
  const [step, setStep] = useState<1 | 2>(1)

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    dateIssued: '',
    dueDate: '',
    taxRate: '',
    status: 'draft' as Invoice['status'],
    items: [] as Invoice['items'],
  })

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({})

  const schemaStep1: ValidationSchema<typeof formData> = {
    clientName: { required: true },
    clientEmail: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    dateIssued: { required: true },
    dueDate: { required: false },
    taxRate: { required: false },
    status: { required: true },
    items: { required: false },
  }

  const schemaStep2: ValidationSchema<Pick<typeof formData, 'items'>> = {
    items: {
      required: true,
      custom: (val) =>
        (val as Invoice['items']).length === 0
          ? 'At least one item is required'
          : null,
    },
  }

  const subtotal = useMemo(() => {
    return formData.items.reduce(
      (sum, item) => sum + item.quantity * item.unitPrice,
      0,
    )
  }, [formData.items])

  const taxAmount = useMemo(() => {
    const rate = formData.taxRate ? parseFloat(formData.taxRate) / 100 : 0.18
    return subtotal * rate
  }, [subtotal, formData.taxRate])

  const total = useMemo(() => subtotal + taxAmount, [subtotal, taxAmount])

  const handleNext = () => {
    const { valid, errors } = validateInputs(formData, schemaStep1)
    setFormErrors(errors)
    if (!valid) return
    setStep(2)
  }

  const handleSubmit = () => {
    const { valid, errors } = validateInputs(formData, schemaStep2)
    setFormErrors(errors)
    if (!valid) return

    let dueDateFinal = formData.dueDate
    if (!dueDateFinal && formData.dateIssued) {
      const issuedDate = new Date(formData.dateIssued)
      issuedDate.setDate(issuedDate.getDate() + 15)
      dueDateFinal = issuedDate.toISOString().split('T')[0]
    }

    const newInvoice: Invoice = {
      clientName: formData.clientName,
      clientEmail: formData.clientEmail,
      dateIssued: formData.dateIssued,
      dueDate: dueDateFinal,
      taxRate: formData.taxRate ? parseFloat(formData.taxRate) / 100 : 0.18,
      status: formData.status,
      items: formData.items,
      total,
    }

    onSave(newInvoice)
  }

  const updateField = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  return (
    <div className="invoice-form">
      {step === 1 && (
        <>
          <FormInput
            id="clientName"
            label="Client Name"
            value={formData.clientName}
            onChange={(val) => updateField('clientName', val)}
            error={formErrors.clientName}
          />
          <FormInput
            id="clientEmail"
            label="Client Email"
            value={formData.clientEmail}
            onChange={(val) => updateField('clientEmail', val)}
            error={formErrors.clientEmail}
          />
          <FormInput
            id="dateIssued"
            label="Date Issued"
            type="date"
            value={formData.dateIssued}
            onChange={(val) => updateField('dateIssued', val)}
            error={formErrors.dateIssued}
          />
          <FormInput
            id="dueDate"
            label="Due Date"
            type="date"
            value={formData.dueDate}
            onChange={(val) => updateField('dueDate', val)}
          />
          <FormInput
            id="taxRate"
            label="Tax Rate (%)"
            type="number"
            value={formData.taxRate}
            onChange={(val) => updateField('taxRate', val)}
          />
          <FormSelect
            id="status"
            label="Status"
            value={formData.status}
            options={invoiceStatusOptions}
            onChange={(val) => updateField('status', val)}
          />

          <div className="invoice-form__actions">
            <GenericButton label="Cancel" onClick={onClose} />
            <GenericButton label="Next" onClick={handleNext} />
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <InvoiceItemsEditor
            items={formData.items}
            onChange={(items) => updateField('items', items)}
          />
          {formErrors.items && (
            <span className="form-input__error">{formErrors.items}</span>
          )}

          <div className="invoice-form__total">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>

          <div className="invoice-form__actions">
            <GenericButton label="Back" onClick={() => setStep(1)} />
            <GenericButton
              label="Save"
              onClick={handleSubmit}
              disabled={formData.items.length === 0}
            />
          </div>
        </>
      )}
    </div>
  )
}
