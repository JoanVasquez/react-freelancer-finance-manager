import { createSlice } from '@reduxjs/toolkit'
import {
  loginThunk,
  signUpThunk,
  logoutThunk,
  setThemeThunk,
} from '../thunks/userThunks'
import { AppError } from '@/lib/errorHandler'
import { UserWithoutPassword } from '@/types/user'

interface UserState {
  currentUser: UserWithoutPassword | null
  loading: boolean
  error?: string
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload as UserWithoutPassword
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as AppError)?.message || 'Unknown error'
      })

      //SignUp
      .addCase(signUpThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(signUpThunk.fulfilled, (state, action) => {
        state.loading = false
        state.currentUser = action.payload as UserWithoutPassword
      })
      .addCase(signUpThunk.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as AppError)?.message || 'Unknown error'
      })

      // Logout
      .addCase(logoutThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.loading = false
        state.currentUser = null
      })

      // Theme
      .addCase(setThemeThunk.fulfilled, (state, action) => {
        if (action.payload) state.currentUser = action.payload
      })
  },
})

export default userSlice.reducer
