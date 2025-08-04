'use client'

interface AlertProps {
  variant?: 'error' | 'success' | 'warning' | 'info'
  message: string
  title?: string
}

export default function Alert({
  variant = 'info',
  message,
  title,
}: AlertProps) {
  return (
    <div className={`alert alert--${variant}`}>
      {title && <strong className="alert__title">{title}</strong>}
      {message}
    </div>
  )
}
