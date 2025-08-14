import { AppError } from '@/lib/errorHandler'
import { Expense } from '@/models'
import GenericService from './GenericService'
import { expense_data } from '@/utils/tmp_data'

export default class ExpenseService extends GenericService<Expense> {
  constructor() {
    super(expense_data)
  }

  getExpensesByCategory(category: Expense['category']): Expense[] {
    try {
      return this.getAll().filter(
        (expense: Expense) => expense.category === category,
      )
    } catch (err) {
      throw new AppError('Failed to get expense by category', 500, err)
    }
  }

  getTotalExpenses(): number {
    try {
      return this.getAll().reduce(
        (sum: number, expense: Expense) => sum + expense.amount,
        0,
      )
    } catch (err) {
      throw new AppError('Failed to get total expenses', 500, err)
    }
  }
}
