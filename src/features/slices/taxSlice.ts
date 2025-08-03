import { createSlice } from '@reduxjs/toolkit'
import { calculateTaxThunk } from '../thunks/taxThunks'
import { TaxSummary } from '@/models'
import { AppError } from '@/lib/errorHandler'

interface TaxState {
  summaries: TaxSummary[]
  loading: boolean
  error?: string
}

const initialState: TaxState = {
  summaries: [],
  loading: false,
}

const taxSlice = createSlice({
  name: 'tax',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(calculateTaxThunk.pending, (state) => {
        state.loading = false
        state.error = undefined
      })
      .addCase(calculateTaxThunk.fulfilled, (state, action) => {
        state.loading = false
        state.summaries = action.payload
      })
      .addCase(calculateTaxThunk.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as AppError)?.message || 'Unknown error'
      })
  },
})

export default taxSlice.reducer
