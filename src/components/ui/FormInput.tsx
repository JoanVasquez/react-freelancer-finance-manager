'use client'

interface FormInputProps {
  id: string
  label: string
  type?: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
  error?: string
}

export default function FormInput({
  id,
  label,
  type = 'text',
  value,
  placeholder,
  onChange,
  error,
}: FormInputProps) {
  return (
    <div className={`form-input ${error ? 'form-input--error' : ''}`}>
      <label htmlFor={id} className="form-input__label">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="form-input__field"
      />
      {error && <span className="form-input__error">{error}</span>}
    </div>
  )
}
