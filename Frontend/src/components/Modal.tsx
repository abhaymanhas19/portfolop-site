import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import type { ReactNode } from 'react'

export type ModalProps = {
  open: boolean
  onClose: () => void
  title?: ReactNode
  subtitle?: ReactNode
  children: ReactNode
  footer?: ReactNode
}

const modalRootId = 'modal-root'

const ensureModalRoot = () => {
  let root = document.getElementById(modalRootId)
  if (!root) {
    root = document.createElement('div')
    root.setAttribute('id', modalRootId)
    document.body.appendChild(root)
  }
  return root
}

export default function Modal({ open, onClose, title, subtitle, children, footer }: ModalProps) {
  useEffect(() => {
    if (!open) return

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKey)
    const { style } = document.body
    const previousOverflow = style.overflow
    style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  const root = ensureModalRoot()

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center px-4 py-8"
      style={{ background: 'rgba(42, 52, 57, 0.15)', backdropFilter: 'blur(8px)' }}
      onMouseDown={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-card bg-surface-container-lowest/95 p-6 shadow-ambient-lg"
        style={{ backdropFilter: 'blur(20px)' }}
        onMouseDown={event => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-low text-sm font-semibold text-[#565e74] transition hover:bg-surface-container-high hover:text-[#2a3439]"
          aria-label="Close dialog"
        >
          ×
        </button>
        {(title || subtitle) && (
          <div className="pr-10">
            {title && <h2 className="font-display text-2xl font-semibold text-[#2a3439]">{title}</h2>}
            {subtitle && <p className="mt-1 text-sm text-[#565e74]">{subtitle}</p>}
          </div>
        )}
        <div className="mt-4 space-y-4 text-[#565e74]">{children}</div>
        {footer && <div className="mt-6 pt-4 text-sm text-[#565e74]">{footer}</div>}
      </div>
    </div>,
    root,
  )
}
