'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { loginThunk } from '@/features/thunks/userThunks'
import { RootState, AppDispatch } from '@/features'
import AuthLayout from '@/components/layout/AuthLayout'
import GenericButton from '@/components/ui/GenericButton'
import FormInput from '@/components/ui/FormInput'
import Alert from '@/components/ui/Alert'
import FormCheckbox from '@/components/ui/FormChechbox'
import { validateInputs } from '@/utils/validation'
import Link from 'next/link'

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { loading, error } = useSelector((state: RootState) => state.user)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({})

  const schema = {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      required: true,
      minLength: 6,
    },
    rememberMe: {},
  }

  const handleLogin = async () => {
    const { valid, errors } = validateInputs(formData, schema)
    setFormErrors(errors)

    if (!valid) return

    const result = await dispatch(loginThunk(formData))
    if (loginThunk.fulfilled.match(result)) {
      router.push('/dashboard')
    }
  }

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

  return (
    <AuthLayout>
      <h1 className="login__title">Login</h1>

      {error && <Alert variant="error" message={error} />}

      <div className="login__form">
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
            error={formErrors[field.id as keyof typeof formErrors]}
          />
        ))}

        <div className="login__remember">
          <FormCheckbox
            id="rememberMe"
            label="Remember Me"
            checked={formData.rememberMe}
            onChange={(checked) =>
              setFormData((prev) => ({ ...prev, rememberMe: checked }))
            }
          />
        </div>

        <GenericButton
          label={loading ? 'Logging in...' : 'Login'}
          onClick={handleLogin}
          variant="primary"
          className="login__button"
          disabled={loading}
        />
      </div>

      <div className="login__links">
        <Link href="/signup">Create an account</Link>
        <Link href="/forgot-password">Forgot Password?</Link>
      </div>
    </AuthLayout>
  )
}
