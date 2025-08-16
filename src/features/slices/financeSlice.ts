import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import {
  addInvoiceThunk,
  updateInvoiceThunk,
  removeInvoiceThunk,
  addExpenseThunk,
  removeExpenseThunk,
  addIncomeThunk,
  removeIncomeThunk,
  getInvoicesThunk,
  getOverdueInvoicesThunk,
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
    // ========== INVOICES ==========
    builder
      .addCase(getInvoicesThunk.fulfilled, (state, action) => {
        state.loading = false
        state.invoices = action.payload as Invoice[]
      })
      .addCase(addInvoiceThunk.fulfilled, (state, action) => {
        state.loading = false
        state.invoices.push(action.payload as Invoice)
      })
      .addCase(updateInvoiceThunk.fulfilled, (state, action) => {
        state.loading = false
        const updated = action.payload as Invoice
        const idx = state.invoices.findIndex((i) => i.id === updated.id)
        if (idx !== -1) state.invoices[idx] = updated
      })
      .addCase(removeInvoiceThunk.fulfilled, (state, action) => {
        state.loading = false
        const id = action.payload as string
        state.invoices = state.invoices.filter((i) => i.id !== id)
      })
      .addCase(getOverdueInvoicesThunk.fulfilled, (state, action) => {
        state.loading = false
        state.invoices = action.payload as Invoice[]
      })

    // // ========== EXPENSES ==========
    // builder
    //   .addCase(
    //     addExpenseThunk.fulfilled,
    //     (state, action) => {
    //       state.loading = false
    //       if (Array.isArray(action.payload)) state.expenses = action.payload as Ex
    //     },
    //   )
    //   .addCase(
    //     removeExpenseThunk.fulfilled,
    //     (state, action: PayloadAction<Expense[]>) => {
    //       state.loading = false
    //       if (Array.isArray(action.payload)) state.expenses = action.payload
    //     },
    //   )

    // // ========== INCOME ==========
    // builder
    //   .addCase(
    //     addIncomeThunk.fulfilled,
    //     (state, action: PayloadAction<Income[]>) => {
    //       state.loading = false
    //       if (Array.isArray(action.payload)) state.income = action.payload
    //     },
    //   )
    //   .addCase(
    //     removeIncomeThunk.fulfilled,
    //     (state, action: PayloadAction<Income[]>) => {
    //       state.loading = false
    //       if (Array.isArray(action.payload)) state.income = action.payload
    //     },
    //   )

    // ========== PENDING / REJECTED MATCHERS ==========
    builder
      .addMatcher(
        isAnyOf(
          getInvoicesThunk.pending,
          addInvoiceThunk.pending,
          updateInvoiceThunk.pending,
          removeInvoiceThunk.pending,
          addExpenseThunk.pending,
          removeExpenseThunk.pending,
          addIncomeThunk.pending,
          removeIncomeThunk.pending,
        ),
        (state) => {
          state.loading = true
          state.error = undefined
        },
      )
      .addMatcher(
        isAnyOf(
          getInvoicesThunk.rejected,
          addInvoiceThunk.rejected,
          updateInvoiceThunk.rejected,
          removeInvoiceThunk.rejected,
          addExpenseThunk.rejected,
          removeExpenseThunk.rejected,
          addIncomeThunk.rejected,
          removeIncomeThunk.rejected,
        ),
        (state, action) => {
          state.loading = false
          const payloadMsg = (action.payload as AppError | undefined)?.message
          state.error = payloadMsg || action.error?.message || 'Unknown error'
        },
      )
  },
})

export default financeSlice.reducer
