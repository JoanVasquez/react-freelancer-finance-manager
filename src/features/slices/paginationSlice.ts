import { createSlice} from '@reduxjs/toolkit'


interface PaginationState {
  invoicesCurrentPage: number
}

const initialState: PaginationState = {
  invoicesCurrentPage: 1,
}

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setInvoicesCurrentPage: (state, action) => {
      state.invoicesCurrentPage = action.payload
    },
  },
})

export const { setInvoicesCurrentPage } = paginationSlice.actions
export default paginationSlice.reducer