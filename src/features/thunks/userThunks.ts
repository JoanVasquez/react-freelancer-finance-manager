import { createAsyncThunk } from '@reduxjs/toolkit'
import UserService from '@/services/UserService'
import { UserWithoutPassword } from '@/types/user'
import { User } from '@/models'
import { handleError } from '@/lib/errorHandler'

const userService = new UserService()

export const loginThunk = createAsyncThunk(
  'user/login',
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const user = userService.login(email, password)
      if (!user) throw new Error('Invalid credentials')
      return user
    } catch (err) {
      rejectWithValue(handleError(err))
    }
  },
)

export const signUpThunk = createAsyncThunk(
  'user/signup',
  async (user: User, { rejectWithValue }) => {
    try {
      const newUser: UserWithoutPassword = userService.signUp(user)
      return newUser
    } catch (err) {
      rejectWithValue(handleError(err))
    }
  },
)

export const logoutThunk = createAsyncThunk('user/logout', async () => {
  return null
})

export const setThemeThunk = createAsyncThunk(
  'user/setTheme',
  async ({
    userId,
    theme,
  }: {
    userId: string
    theme: UserWithoutPassword['preferences']['theme']
  }) => {
    userService.setTheme(userId, theme)
    return userService.getById(userId)
  },
)
