'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { RootState, AppDispatch } from '@/features'
import AuthLayout from '@/components/layout/AuthLayout'
import GenericButton from '@/components/ui/GenericButton'
import FormInput from '@/components/ui/FormInput'
import Alert from '@/components/ui/Alert'
import { validateInputs } from '@/utils/validation'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { loading, error } = useSelector((state: RootState) => state.user)

  const [formData, setFormData] = useState({ email: '' })
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({})

  const schema = {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
  }

  const handleReset = async () => {
    const { valid, errors } = validateInputs(formData, schema)
    setFormErrors(errors)

    if (!valid) return

    // Aquí podrías llamar a un thunk como forgotPasswordThunk
    console.log('Password reset email sent to:', formData.email)
    router.push('/login')
  }

  return (
    <AuthLayout>
      <h1 className="login__title">Forgot Password</h1>

      {error && <Alert variant="error" message={error} />}

      <div className="login__form">
        <FormInput
          id="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(val) => setFormData({ email: val })}
          error={formErrors.email}
        />

        <GenericButton
          label={loading ? 'Sending...' : 'Send Reset Link'}
          onClick={handleReset}
          variant="primary"
          className="login__button"
          disabled={loading}
        />
      </div>

      <div className="login__links">
        <Link href="/login">Back to Login</Link>
      </div>
    </AuthLayout>
  )
}
