import { Invoice } from '@/models'
import GenericService from './GenericService'
import { AppError } from '@/lib/errorHandler'
import { invoice_data } from '@/utils/tmp_data'

export default class InvoiceService extends GenericService<Invoice> {
  constructor() {
    super(invoice_data)
  }

  getOverdueInvoices(): Invoice[] {
    const now = new Date()
    try {
      return this.getAll().filter(
        (invoice: Invoice) =>
          invoice.status === 'overdue' &&
          new Date(invoice.dueDate as string) < now,
      )
    } catch (err) {
      throw new AppError('Failed to get overdue invoices', 500, err)
    }
  }
}
