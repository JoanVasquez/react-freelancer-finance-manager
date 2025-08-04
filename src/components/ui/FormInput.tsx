'use client'

interface FormInputProps {
  id: string
  label: string
  type?: string
  value: string
  placeholder?: string
  onChange: (value: string) => void
}

export default function FormInput({
  id,
  label,
  type = 'text',
  value,
  placeholder,
  onChange,
}: FormInputProps) {
  return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
      />
    </div>
  )
}
