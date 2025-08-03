export interface Expense {
  id?: string
  description: string
  amount: number
  category: 'office' | 'travel' | 'software' | 'marketing' | 'other'
  date: string
  receiptUrl?: string
}
