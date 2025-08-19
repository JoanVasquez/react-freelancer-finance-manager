'use client'

import { RootState } from '@/features'
import { UserProfileChange, UserWithoutPassword } from '@/types/user'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import FormInput from '../ui/FormInput'
import { SmartList } from '../ui/SmartList'
import { User } from '@/models'
import SmartItem from '../ui/SmartItem'
import FormSelect, { FormSelectOption } from '../ui/FormSelect'
import { useDebounceValue } from '@/hooks/useDebouncedValue'
import { validateInputs, ValidationSchema } from '@/utils/validation'

type formData = {
  id: string
  name: string
  email: string
  theme: 'light' | 'dark'
  currency: string
}

export default function ProfileLayout() {
  const [formData, setFormData] = useState<formData>({
    id: '',
    name: '',
    email: '',
    theme: 'light',
    currency: '',
  })

  const [nameInput, setNameInput] = useState<string>('')

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({})

  const { currentUser, loading, error } = useSelector(
    (state: RootState) => state.user,
  )

  const debouncedName = useDebounceValue(nameInput, 400)

  useEffect(() => {
    if (currentUser) {
      setFormData({
        id: currentUser.id!,
        name: currentUser.name,
        email: currentUser.email,
        theme: currentUser.preferences.theme,
        currency: currentUser.preferences.currency,
      })
      setNameInput(currentUser.name)
    }
  }, [currentUser])

  const schemaUser: ValidationSchema<typeof formData> = {
    id: { required: true },
    name: { required: true },
    email: { required: true },
    currency: { required: true },
    theme: { required: true },
  }

  useEffect(() => {
    setFormData((prev) => ({ ...prev, name: debouncedName }))
  }, [debouncedName])

  const updateField = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = () => {
    const { valid, errors } = validateInputs(formData, schemaUser)
    setFormErrors(errors)
    if (!valid) return

    const editedUser: UserWithoutPassword = {
      id: formData.id,
      email: formData.email,
      name: formData.name,
      token: currentUser!.token,
      preferences: {
        theme: formData.theme,
        currency: formData.currency,
      },
    }
  }

  return (
    <div>
      <FormInput
        id="name"
        label="Name"
        value={nameInput}
        onChange={(val) => setNameInput(val)}
        placeholder="Enter your name"
        error={formErrors.name}
      />
      <SmartItem
        item={currentUser}
        itemHeight={56}
        renderItem={({ item }) => (
          <>
            <div className="smart-list__item-text">
              <small>{item?.email}</small>
            </div>

            <div className="smart-list__item-actions">
              <FormSelect
                id="theme"
                label="Theme"
                value={item?.preferences.theme as 'light' | 'dark'}
                options={
                  [
                    { label: 'Light', value: 'light' },
                    { label: 'Dark', value: 'dark' },
                  ] as FormSelectOption<'light' | 'dark'>[]
                }
                onChange={(val: 'light' | 'dark') => updateField('theme', val)}
              />
              <FormSelect
                id="currency"
                label="Currency"
                value={item?.preferences.currency}
                options={
                  [
                    { label: 'USD', value: 'USD' },
                    { label: 'EUR', value: 'EUR' },
                  ] as FormSelectOption[]
                }
                onChange={(val) => updateField('currency', val || 'USD')}
              />
            </div>
          </>
        )}
      />
    </div>
  )
}
