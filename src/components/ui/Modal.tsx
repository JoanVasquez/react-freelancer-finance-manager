import { ReactNode, useEffect } from 'react'
import GenericButton from '@/components/ui/GenericButton'
import '@/styles/components/_modal.scss'

type ModalProps = {
  title?: string
  children: ReactNode
  onClose: () => void
  footer?: ReactNode
}

export default function Modal({
  title,
  children,
  onClose,
  footer,
}: ModalProps) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  return (
    <div className="modal">
      <div className="modal__content">
        {/* Header */}
        <div className="modal__header">
          {title && <h2 className="modal__title">{title}</h2>}
          <GenericButton
            label="✖"
            onClick={onClose}
            className="modal__close"
          />
        </div>

        {/* Body */}
        <div className="modal__body">{children}</div>

        {/* Footer */}
        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  )
}
