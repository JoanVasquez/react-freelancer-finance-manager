'use client'

import { useDispatch, useSelector } from 'react-redux'
import { RootState, AppDispatch } from '@/features'
import { setThemeThunk } from '@/features/thunks/userThunks'
import GenericButton from '../ui/GenericButton'

export default function ThemeToggle() {
  const user = useSelector((state: RootState) => state.user.currentUser)
  const dispatch = useDispatch<AppDispatch>()

  if (!user) return null // Don’t render toggle if user not loaded

  const currentTheme = user.preferences?.theme || 'light'

  return (
    <GenericButton
      onClick={() =>
        dispatch(
          setThemeThunk({
            userId: user.id!,
            theme: currentTheme === 'light' ? 'dark' : 'light',
          }),
        )
      }
      variant="theme"
      className="w-full"
      label={`Toggle ${currentTheme === 'light' ? 'Dark' : 'Light'}`}
    />
  )
}
