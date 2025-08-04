'use client'

import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'
import { logoutThunk } from '@/features/thunks/userThunks'
import { AppDispatch } from '@/features'
import GenericButton from '../ui/GenericButton'

export default function LogoutButton() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  return (
    <GenericButton
      onClick={() => {
        dispatch(logoutThunk()).then(() => {
          router.push('/login')
        })
      }}
      className="w-full bg-red-500 p-2 rounded"
      label="Logout"
    />
  )
}
