'use client'

interface FormCheckboxProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export default function FormCheckbox({
  id,
  label,
  checked,
  onChange,
}: FormCheckboxProps) {
  return (
    <div className="form-checkbox">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="form-checkbox__input"
      />
      <label htmlFor={id} className="form-checkbox__label">
        {label}
      </label>
    </div>
  )
}
