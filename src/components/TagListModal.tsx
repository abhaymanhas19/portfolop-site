import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

type TagListModalProps = {
  isOpen: boolean
  title: string
  items: string[]
  onClose: () => void
}

export default function TagListModal({ isOpen, title, items, onClose }: TagListModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="tag-list-modal-title"
            className="mx-auto w-full max-w-lg rounded-2xl border border-white/15 bg-[#101010] p-6 shadow-[0_24px_48px_rgba(0,0,0,0.45)]"
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 25 }}
            onClick={event => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p id="tag-list-modal-title" className="text-sm uppercase tracking-[0.2em] text-white/60">
                  Full stack view
                </p>
                <h3 className="mt-1 text-lg font-semibold text-white">{title}</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-white/70 hover:text-white hover:border-white/40 transition"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {items.map((item, index) => (
                <span
                  key={`${item}-${index}`}
                  className="px-3 py-1.5 rounded-full bg-[#1a1a1a] text-sm text-white/80 border border-white/10"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
