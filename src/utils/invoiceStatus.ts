import { Invoice } from '@/models/Invoice'

export const invoiceStatusOptions: {
  value: Invoice['status']
  label: string
}[] = [
  { value: 'draft', label: 'Draft' },
  { value: 'sent', label: 'Sent' },
  { value: 'paid', label: 'Paid' },
  { value: 'overdue', label: 'Overdue' },
]
