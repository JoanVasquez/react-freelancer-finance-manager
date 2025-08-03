import { Invoice, InvoiceItem } from '@/models'
import GenericService from './GenericService'
import { AppError } from '@/lib/errorHandler'

export default class InvoiceService extends GenericService<Invoice> {
  constructor() {
    super([])
  }

  getOverdueInvoices(): Invoice[] {
    const now = new Date()
    try {
      return this.getAll().filter(
        (invoice: Invoice) =>
          invoice.status !== 'paid' &&
          new Date(invoice.dueDate as string) < now,
      )
    } catch (err) {
      throw new AppError('Failed to get overdue invoices', 500, err)
    }
  }

  calculateTotal(invoice: Invoice): number {
    try {
      const subtotal = invoice.items.reduce(
        (sum: number, item: InvoiceItem) =>
          sum + item.quantity * item.unitPrice,
        0,
      )
      const tax = invoice.taxRate ? subtotal * (invoice.taxRate / 100) : 0
      return subtotal + tax
    } catch (err) {
      throw new AppError('Failed to calculate total invoice', 500, err)
    }
  }
}
