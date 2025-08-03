import { TaxSummary } from '@/models'
import GenericService from './GenericService'
import { AppError } from '@/lib/errorHandler'

export default class TaxService extends GenericService<TaxSummary> {
  constructor() {
    super([])
  }

  calculateTax(year: number, income: number, expenses: number): TaxSummary {
    try {
      const taxableIncome = income - expenses
      const taxDue = taxableIncome * 0.15
      const summary: TaxSummary = {
        year,
        totalIncome: income,
        totalExpenses: expenses,
        taxableIncome,
        taxDue,
      }
      this.create(summary)
      return summary
    } catch (err) {
      throw new AppError('Failed to calculate tax', 500, err)
    }
  }
}
