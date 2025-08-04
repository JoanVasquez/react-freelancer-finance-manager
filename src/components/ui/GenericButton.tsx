'use client'

interface GenericButtonProps {
  label: string
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'theme'
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export default function GenericButton({
  label,
  variant = 'primary',
  className,
  onClick,
  disabled = false,
}: GenericButtonProps) {
  return (
    <button
      onClick={onClick}
      className={className || `button button--${variant}`}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
