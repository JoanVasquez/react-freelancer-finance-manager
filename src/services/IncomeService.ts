import { Income } from "@/models";
import GenericService from "./GenericService";

export default class IncomeService extends GenericService<Income> {
    constructor() {
        super([]);
    }

    getTotalIncome(): number {
        return this.getAll().reduce((sum: number, income: Income) => 
            sum + income.amount, 0);
    }

    getIncomeByCategory(category: Income['category']): Income[] {
        return this.getAll().filter((income: Income) => income.category == category);
    }
}
