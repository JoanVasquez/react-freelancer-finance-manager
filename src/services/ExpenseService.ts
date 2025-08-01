import {xpense}from "@/models";
import GenericService from "./GenericService";

export default class ExpenseService extends GenericService<Expense> {
    constructor() {
        super([]);
    }

    getExpensesByCategory(category: Expense['category']): Expense[] {
        return this.getAll().filter((expense: Expense)
            => expense.category === category);
    }

    getTotalExpenses(): number {
        return this.getAll().reduce((sum: number, expense: Expense)
            => sum + expense.amount, 0);
    }
}
