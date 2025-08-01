import { TaxSummary } from "@/models";
import GenericService from "./GenericService";

export default class TaxService extends GenericService<TaxSummary> {
    constructor() {
        super([]);
    }

    calculateTax(year: number, income: number, expenses: number): TaxSummary {
        const taxableIncome = income - expenses;
        const taxDue = taxableIncome * 0.15;
        const summary: TaxSummary = {
            year,
            totalIncome: income,
            totalExpenses: expenses,
            taxableIncome,
            taxDue
        };
        this.create(summary);
        return summary;
    }
}
