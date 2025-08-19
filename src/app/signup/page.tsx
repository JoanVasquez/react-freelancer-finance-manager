'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { signUpThunk } from '@/features/thunks/userThunks'
import { RootState, AppDispatch } from '@/features'
import AuthLayout from '@/components/layout/AuthLayout'
import GenericButton from '@/components/ui/GenericButton'
import FormInput from '@/components/ui/FormInput'
import Alert from '@/components/ui/Alert'
import FormCheckbox from '@/components/ui/FormChechbox'
import { validateInputs, ValidationSchema } from '@/utils/validation'
import Link from 'next/link'
import { UserRegistration } from '@/types/signup'

export default function SignupPage() {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()
  const { loading, error } = useSelector((state: RootState) => state.user)

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  })

  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({})

  const schema: ValidationSchema<typeof formData> = {
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    password: {
      required: true,
      minLength: 6,
    },
    confirmPassword: {
      required: true,
      custom: (val: string) =>
        val !== formData.password ? 'Passwords do not match' : null,
    },
    agreeTerms: {
      required: true,
      custom: (val: boolean) => (!val ? 'You must agree to the terms' : null),
    },
  }

  const handleSignup = async () => {
    const { valid, errors } = validateInputs(formData, schema)
    setFormErrors(errors)

    if (!valid) return

    const newUser: UserRegistration = {
      name: '', // Puedes añadir campo de nombre en el formulario si lo necesitas
      email: formData.email,
      password: formData.password,
    }

    const result = await dispatch(signUpThunk(newUser))
    if (signUpThunk.fulfilled.match(result)) {
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
    {
      id: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: 'Confirm your password',
    },
  ] as const

  return (
    <AuthLayout>
      <h1 className="login__title">Sign Up</h1>

      {error && <Alert variant="error" message={error} />}

      <div className="login__form">
        {formFields.map((field) => (
          <FormInput
            key={field.id}
            id={field.id}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.id]}
            onChange={(val) =>
              setFormData((prev) => ({ ...prev, [field.id]: val }))
            }
            error={formErrors[field.id]}
          />
        ))}

        <FormCheckbox
          id="agreeTerms"
          label="I agree to the Terms and Conditions"
          checked={formData.agreeTerms}
          onChange={(checked) =>
            setFormData((prev) => ({ ...prev, agreeTerms: checked }))
          }
        />
        {formErrors.agreeTerms && (
          <Alert variant="error" message={formErrors.agreeTerms} />
        )}

        <GenericButton
          label={loading ? 'Signing up...' : 'Sign Up'}
          onClick={handleSignup}
          variant="primary"
          className="login__button"
          disabled={loading}
        />
      </div>

      <div className="login__links">
        <Link href="/login">Already have an account? Login</Link>
      </div>
    </AuthLayout>
  )
}
