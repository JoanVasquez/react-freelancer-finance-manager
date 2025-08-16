import { Expense, Income, Invoice } from '@/models'
import ExpenseService from '@/services/ExpenseService'
import IncomeService from '@/services/IncomeService'
import InvoiceService from '@/services/InvoiceService'

import { createAsyncThunk } from '@reduxjs/toolkit'
import { handleError } from '@/lib/errorHandler'

const invoiceService = new InvoiceService()
const expenseService = new ExpenseService()
const incomeService = new IncomeService()

export const getInvoicesThunk = createAsyncThunk(
  'finance/getInvoices',
  async (_, { rejectWithValue }) => {
    try {
      return invoiceService.getAll()
    } catch (err) {
      rejectWithValue(handleError(err))
    }
  },
)

export const getOverdueInvoicesThunk = createAsyncThunk(
  'finance/getOverdueInvoices',
  async (_, { rejectWithValue }) => {
    try {
      return invoiceService.getOverdueInvoices()
    } catch (err) {
      rejectWithValue(handleError(err))
    }
  },
)

export const addInvoiceThunk = createAsyncThunk(
  'finance/addInvoice',
  async (invoice: Invoice, { rejectWithValue }) => {
    try {
      return invoiceService.create(invoice)
    } catch (err) {
      rejectWithValue(handleError(err))
    }
  },
)

export const updateInvoiceThunk = createAsyncThunk(
  'finance/updateInvoice',
  async (invoice: Invoice, { rejectWithValue }) => {
    try {
      return invoiceService.update(invoice.id!, invoice)
    } catch (err) {
      rejectWithValue(handleError(err))
    }
  },
)

export const removeInvoiceThunk = createAsyncThunk(
  'finance/removeInvoice',
  async (id: string, { rejectWithValue }) => {
    try {
      return invoiceService.remove(id)
    } catch (err) {
      rejectWithValue(handleError(err))
    }
  },
)

export const addExpenseThunk = createAsyncThunk(
  'finance/addExpense',
  async (expense: Expense, { rejectWithValue }) => {
    try {
      expenseService.create(expense)
      return expenseService.getAll()
    } catch (err) {
      rejectWithValue(handleError(err))
    }
  },
)

export const removeExpenseThunk = createAsyncThunk(
  'finance/removeExpense',
  async (id: string, { rejectWithValue }) => {
    try {
      expenseService.remove(id)
      return expenseService.getAll()
    } catch (err) {
      rejectWithValue(handleError(err))
    }
  },
)

export const addIncomeThunk = createAsyncThunk(
  'finance/addIncome',
  async (income: Income, { rejectWithValue }) => {
    try {
      incomeService.create(income)
      return incomeService.getAll()
    } catch (err) {
      rejectWithValue(handleError(err))
    }
  },
)

export const removeIncomeThunk = createAsyncThunk(
  'finance/removeIncome',
  async (id: string, { rejectWithValue }) => {
    try {
      incomeService.remove(id)
      return incomeService.getAll()
    } catch (err) {
      rejectWithValue(handleError(err))
    }
  },
)
