import { createAsyncThunk } from '@reduxjs/toolkit'
import UserService from '@/services/UserService'
import { UserWithoutPassword } from '@/types/user'
import { User } from '@/models'
import { handleError } from '@/lib/errorHandler'
import { generateFakeJWT } from '@/lib/fakeJwt'

const userService = new UserService()

export const loginThunk = createAsyncThunk(
  'user/login',
  async (
    {
      email,
      password,
      rememberMe,
    }: { email: string; password: string; rememberMe?: boolean },
    { rejectWithValue },
  ) => {
    try {
      const user = userService.login(email, password)
      if (!user) throw new Error('Invalid credentials')

      if (typeof document !== 'undefined') {
        document.cookie = `token=${user.token}; path=/; max-age=3600`

        if (rememberMe) {
          const refreshToken = generateFakeJWT(
            { userId: user.id!, email: user.email },
            60 * 60 * 24 * 7,
          )

          document.cookie = `refreshToken=${refreshToken}; path=/; max-age=${60 * 60 * 24 * 7};`
        }
      }

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
    const updatedUser = userService.getById(userId)
    return updatedUser as UserWithoutPassword
  },
)
