import { AppError } from '@/lib/errorHandler'
import { Income e } from '@/models'
import GenericService from './GenericService'

export default class IncomeService extends GenericService<Income> {
  constructor() {
    super([])
  }

  getTotalIncome(): number {
    try {
      return this.getAll().reduce(
        (sum: number, income: Income) => sum + income.amount,
        0,
      )
    } catch (err) {
      throw new AppError('Failed to get total income', 500, err)
    }
  }

  getIncomeByCategory(category: Income['category']): Income[] {
    try {
      return this.getAll().filter(
        (income: Income) => income.category == category,
      )
    } catch (err) {
      throw new AppError('Failed to get income by category', 500, err)
    }
  }
}
