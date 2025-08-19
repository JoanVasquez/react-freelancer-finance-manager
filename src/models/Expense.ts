export interface Expense {
  id?: string
  date: string | Date
  amount: number
  category?: string
  taxable?: boolean
  taxRate?: number
  taxType?: 'VAT' | 'GST' | 'Sales' | 'Income' | 'Other'
  jurisdiction?: string
  taxStatus?: 'pending' | 'paid' | 'filed' | 'exempt'
}
