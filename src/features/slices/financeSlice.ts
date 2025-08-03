import { createSlice } from '@reduxjs/toolkit'
import {
  addInvoiceThunk,
  removeInvoiceThunk,
  addExpenseThunk,
  removeExpenseThunk,
  addIncomeThunk,
  removeIncomeThunk,
} from '../thunks/financeThunks'
import { Invoice, Expense, Income } from '@/models'
import { AppError } from '@/lib/errorHandler'

interface FinanceState {
  invoices: Invoice[]
  expenses: Expense[]
  income: Income[]
  loading: boolean
  error?: string
}

const initialState: FinanceState = {
  invoices: [],
  expenses: [],
  income: [],
  loading: false,
}

const financeSlice = createSlice({
  name: 'finance',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Add Invoice
      .addCase(addInvoiceThunk.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(addInvoiceThunk.fulfilled, (state, action) => {
        state.loading = false
        state.invoices = action.payload as Invoice[]
      })
      .addCase(addInvoiceThunk.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as AppError)?.message || 'Unknown error'
      })

      // Remove Invoice
      .addCase(removeInvoiceThunk.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(removeInvoiceThunk.fulfilled, (state, action) => {
        state.loading = false
        state.invoices = action.payload as Invoice[]
      })
      .addCase(removeInvoiceThunk.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as AppError)?.message || 'Unknown error'
      })

      // Add Expenses
      .addCase(addExpenseThunk.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(addExpenseThunk.fulfilled, (state, action) => {
        state.loading = false
        state.expenses = action.payload as Expense[]
      })
      .addCase(addExpenseThunk.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as AppError)?.message || 'Unknown error'
      })
      // Remove Expenses

      .addCase(removeExpenseThunk.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(removeExpenseThunk.fulfilled, (state, action) => {
        state.loading = false
        state.expenses = action.payload as Expense[]
      })
      .addCase(removeExpenseThunk.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as AppError)?.message || 'Unknown error'
      })

      // Income
      .addCase(addIncomeThunk.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(addIncomeThunk.fulfilled, (state, action) => {
        state.loading = false
        state.income = action.payload as Income[]
      })
      .addCase(addIncomeThunk.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as AppError)?.message || 'Unknown error'
      })

      // Remove Income
      .addCase(removeIncomeThunk.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(removeIncomeThunk.fulfilled, (state, action) => {
        state.loading = false
        state.income = action.payload as Income[]
      })
      .addCase(removeIncomeThunk.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as AppError)?.message || 'Unknown error'
      })
  },
})

export default financeSlice.reducer
