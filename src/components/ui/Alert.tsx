'use client'

interface AlertProps {
  variant?: 'error' | 'success' | 'warning' | 'info'
  message: string
  title?: string
}

const variantStyles = {
  error: 'bg-red-100 text-red-700 border border-red-300',
  success: 'bg-green-100 text-green-700 border border-green-300',
  warning: 'bg-yellow-100 text-yellow-700 border border-yellow-300',
  info: 'bg-blue-100 text-blue-700 border border-blue-300',
}

export default function Alert({
  variant = 'info',
  message,
  title,
}: AlertProps) {
  return (
    <div className={`px-4 py-2 rounded mb-4 text-sm ${variantStyles[variant]}`}>
      {title && <strong className="block font-semibold mb-1">{title}</strong>}
      {message}
    </div>
  )
}
