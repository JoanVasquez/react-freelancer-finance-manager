'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { loginThunk } from '@/features/thunks/userThunks'
import { RootState, AppDispatch } from '@/store'
import AuthLayout from '@/components/layout/AuthLayout'
import GenericButton from '@/components/ui/GenericButton'
import FormInput from '@/components/ui/FormInput'
import Alert from '@/components/ui/Alert'

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { loading, error } = useSelector((state: RootState) => state.user)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const formFields = [
    {
      id: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'Enter your email',
    },
    {
      id: 'password',
      label: 'Password',
      type: 'password',
      placeholder: 'Enter your password',
    },
  ]

  const handleLogin = async () => {
    const result = await dispatch(
      loginThunk({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
      }),
    )
    if (loginThunk.fulfilled.match(result)) {
      router.push('/dashboard')
    }
  }

  return (
    <AuthLayout>
      <h1 className="text-2xl mb-6 font-bold text-center">Login</h1>

      {error && <Alert variant="error" message={error} />}

      <div className="space-y-4">
        {formFields.map((field) => (
          <FormInput
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.id as keyof typeof formData] as string}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, [field.id]: val }))
            }
          />
        ))}

        <div className="flex items-center text-sm">
          <input
            id="rememberMe"
            type="checkbox"
            className="mr-2"
            checked={formData.rememberMe}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, rememberMe: e.target.checked }))
            }
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>

        <GenericButton
          label={loading ? 'Logging in...' : 'Login'}
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50"
        />
      </div>
    </AuthLayout>
  )
}
