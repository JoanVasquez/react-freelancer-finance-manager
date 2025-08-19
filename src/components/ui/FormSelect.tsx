'use client'

export interface FormSelectOption<T = string> {
  value: T
  label: string
}

interface FormSelectProps<T = string> {
  id: string
  label: string
  value: T
  options: FormSelectOption<T>[]
  onChange: (value: T) => void
  error?: string
}

export default function FormSelect<T = string>({
  id,
  label,
  value,
  options,
  onChange,
  error,
}: FormSelectProps<T>) {
  return (
    <div className={`form-select ${error ? 'form-select--error' : ''}`}>
      <label htmlFor={id} className="form-select__label">
        {label}
      </label>
      <select
        id={id}
        value={String(value)}
        onChange={(e) => onChange(e.target.value as T)}
        className="form-select__field"
      >
        {options.map((opt) => (
          <option key={String(opt.value)} value={String(opt.value)}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <span className="form-select__error">{error}</span>}
    </div>
  )
}
