import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import Modal from './Modal'

const cn = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(' ')

export type MagicBentoItem = {
  id: string
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  icon?: ReactNode
  chips?: string[]
  badge?: ReactNode
  meta?: ReactNode
  media?: ReactNode
  footer?: ReactNode
  actions?: ReactNode
  accent?: string
  className?: string
  contentClassName?: string
  modalTitle?: ReactNode
  modalSubtitle?: ReactNode
  modalContent?: ReactNode
  modalFooter?: ReactNode
  overflowLabel?: string
}

export type MagicBentoProps = {
  items: MagicBentoItem[]
  columnsClassName?: string
  className?: string
  motionFrom?: { opacity?: number; y?: number }
}

const defaultFrom = { opacity: 0, y: 18 }

export default function MagicBento({
  items,
  columnsClassName = 'md:grid-cols-2',
  className,
  motionFrom = defaultFrom,
}: MagicBentoProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const activeItem = useMemo(() => (activeIndex == null ? null : items[activeIndex]), [activeIndex, items])

  const handleCardActivate = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
    const target = event.target as HTMLElement
    if (target.closest('a,button')) return
    setActiveIndex(index)
  }

  const handleKeyActivate = (event: React.KeyboardEvent<HTMLDivElement>, index: number) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setActiveIndex(index)
    }
  }

  const closeModal = () => setActiveIndex(null)

  return (
    <>
      <div className={cn('grid gap-6', columnsClassName, className)}>
        {items.map((item, index) => {
          const accent = item.accent ?? 'from-blue-50/70 via-transparent to-transparent'
          return (
            <motion.article
              key={item.id}
              initial={motionFrom}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className={cn(
                'group relative overflow-hidden rounded-card bg-surface-container-lowest p-6 shadow-ambient md:p-ds-8',
                'hover:-translate-y-1 transition',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
                item.className,
              )}
              role="button"
              tabIndex={0}
              onClick={(event) => handleCardActivate(event, index)}
              onKeyDown={(event) => handleKeyActivate(event, index)}
            >
              <div
                className={cn(
                  'pointer-events-none absolute inset-0 opacity-40 blur-3xl transition duration-700 group-hover:opacity-80',
                  `bg-gradient-to-br ${accent}`,
                )}
                aria-hidden
              />
              <div className={cn('relative flex h-full flex-col gap-4 text-left', item.contentClassName)}>
                {(item.badge || item.meta) && (
                  <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.3em] text-[#565e74]/60">
                    <span>{item.badge}</span>
                    <span>{item.meta}</span>
                  </div>
                )}

                {(item.icon || item.eyebrow) && (
                  <div className="flex items-center gap-3 text-sm text-[#565e74]">
                    {item.icon && (
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-surface-container-low text-[#005bc4]">
                        {item.icon}
                      </span>
                    )}
                    {item.eyebrow && (
                      <div className="text-xs uppercase tracking-[0.28em] text-[#565e74]/60">{item.eyebrow}</div>
                    )}
                  </div>
                )}

                <div className="space-y-3">
                  <h3 className="font-display text-xl font-semibold leading-tight text-[#2a3439] md:text-2xl">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm leading-relaxed text-[#565e74] md:text-base">{item.description}</p>
                  )}
                </div>

                {item.media && (
                  <div className="relative overflow-hidden rounded-2xl bg-surface-container-low">
                    {item.media}
                  </div>
                )}

                {item.chips && item.chips.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.chips.map(chip => (
                      <span
                        key={chip}
                        className="rounded-full bg-surface-container-low px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#565e74]"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                )}

                {item.overflowLabel && (
                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation()
                      setActiveIndex(index)
                    }}
                    className="btn-secondary w-fit px-3 py-1 text-xs"
                  >
                    {item.overflowLabel}
                  </button>
                )}

                {item.actions && <div className="mt-2 flex flex-wrap gap-3 text-sm">{item.actions}</div>}

                {item.footer && <div className="mt-auto pt-4 text-sm text-[#565e74]">{item.footer}</div>}
              </div>
            </motion.article>
          )
        })}
      </div>

      <Modal
        open={Boolean(activeItem)}
        onClose={closeModal}
        title={activeItem?.modalTitle ?? activeItem?.title}
        subtitle={activeItem?.modalSubtitle ?? activeItem?.meta}
        footer={activeItem?.modalFooter}
      >
        {activeItem ? (
          activeItem.modalContent ?? (
            <div className="space-y-5">
              {activeItem.media && (
                <div className="overflow-hidden rounded-2xl bg-surface-container-low">
                  {activeItem.media}
                </div>
              )}
              {activeItem.description && (
                <p className="text-sm leading-relaxed text-[#565e74] md:text-base">
                  {activeItem.description}
                </p>
              )}
              {activeItem.chips && activeItem.chips.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {activeItem.chips.map(chip => (
                    <span
                      key={chip}
                      className="rounded-full bg-surface-container-low px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-[#565e74]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}
              {activeItem.actions && <div className="flex flex-wrap gap-3 text-sm">{activeItem.actions}</div>}
              {activeItem.footer && <div className="text-sm text-[#565e74]">{activeItem.footer}</div>}
            </div>
          )
        ) : null}
      </Modal>
    </>
  )
}
