import {Invoice, InvoiceItem from "@/models";
import GenericService from "./GenericService";

export default class InvoiceService extends GenericService<Invoice> {
    constructor() {
        super([]);
    }

    getOverdueInvoices(): Invoice[] {
        const now = new Date();
        return this.getAll().filter((invoice: Invoice) =>
            invoice.status !== 'paid' && new Date(invoice.dueDate as string) < now);
    }

    calculateTotal(invoice: Invoice): number {
        const subtotal = invoice.items.reduce((sum: number, item: InvoiceItem) =>
            sum + (item.quantity * item.unitPrice), 0);
        const tax = invoice.taxRate ? subtotal * (invoice.taxRate / 100) : 0;
        return subtotal + tax;
    }
}


