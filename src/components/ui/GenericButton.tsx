'use client'

interface GenericButtonProps {
  label: string
  className?: string
  onClick?: () => void
}

export default function GenericButton({
  label,
  className,
  onClick,
}: GenericButtonProps) {
  return (
    <button
      onClick={onClick}
      className={className || 'bg-blue-500 text-white p-2 rounded'}
    >
      {label}
    </button>
  )
}
