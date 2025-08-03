export interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
}

export interface Invoice {
  id?: string
  clientName: string
  clientEmail: string
  dateIssued: string
  dueDate?: string
  items: InvoiceItem[]
  taxRate?: number
  total: number
  status: 'draft' | 'sent' | 'paid' | 'overdue'
}
