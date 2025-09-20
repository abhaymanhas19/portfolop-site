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
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/75 px-4 py-8 backdrop-blur" onMouseDown={onClose}>
      <div
        className="relative w-full max-w-3xl rounded-3xl border border-white/10 bg-[#08090c]/95 p-6 shadow-[0_20px_80px_rgba(0,0,0,0.65)]"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-sm font-semibold text-white/70 transition hover:text-white"
          aria-label="Close dialog"
        >
          ×
        </button>
        {(title || subtitle) && (
          <div className="pr-10">
            {title && <h2 className="text-2xl font-semibold text-white">{title}</h2>}
            {subtitle && <p className="mt-1 text-sm text-white/60">{subtitle}</p>}
          </div>
        )}
        <div className="mt-4 space-y-4 text-white/70">{children}</div>
        {footer && <div className="mt-6 border-t border-white/10 pt-4 text-sm text-white/80">{footer}</div>}
      </div>
    </div>,
    root,
  )
}
