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
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/20 px-4 py-8 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-[28px] border border-slate-200 bg-white/95 p-6 shadow-[0_24px_80px_rgba(15,41,67,0.2)]"
        onMouseDown={event => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-sm font-semibold text-slate-500 transition hover:border-[#8ED9FF]/60 hover:bg-soft-accent hover:text-[#23354A]"
          aria-label="Close dialog"
        >
          ×
        </button>
        {(title || subtitle) && (
          <div className="pr-10">
            {title && <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>}
            {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
          </div>
        )}
        <div className="mt-4 space-y-4 text-slate-600">{children}</div>
        {footer && <div className="mt-6 border-t border-slate-200 pt-4 text-sm text-slate-600">{footer}</div>}
      </div>
    </div>,
    root,
  )
}
