'use client'

import { RootState } from '@/features'
import { UserProfileChange } from '@/types/user'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import FormInput from '../ui/FormInput'
import { SmartList } from '../ui/SmartList'
import { User } from '@/models'

export default function ProfileLayout() {
  const [name, setName] = useState<string>('')
  const [userTheme, setUserTheme] = useState<string>('')
  const [userCurrency, setUserCurrency] = useState<string>('')

  const { currentUser, loading, error } = useSelector(
    (state: RootState) => state.user,
  )

  return (
    <div>
      <FormInput
        id="name"
        label="Name"
        value={name}
        onChange={(val) => setName(val)}
        placeholder="Enter your name"
      />
    </div>
  )
}
