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
          const accent = item.accent ?? 'from-[#FF6B35]/25 via-transparent to-transparent'
          return (
            <motion.article
              key={item.id}
              initial={motionFrom}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className={cn(
                'group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8',
                'shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-white/25 transition-colors',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6B35]/60',
                item.className,
              )}
              role="button"
              tabIndex={0}
              onClick={(event) => handleCardActivate(event, index)}
              onKeyDown={(event) => handleKeyActivate(event, index)}
            >
              <div
                className={cn(
                  'pointer-events-none absolute inset-0 opacity-70 blur-3xl transition duration-700 group-hover:opacity-100',
                  `bg-gradient-to-br ${accent}`,
                )}
                aria-hidden
              />
              <div className={cn('relative flex h-full flex-col gap-4 text-left text-white', item.contentClassName)}>
                {(item.badge || item.meta) && (
                  <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
                    <span>{item.badge}</span>
                    <span className="text-white/40">{item.meta}</span>
                  </div>
                )}

                {(item.icon || item.eyebrow) && (
                  <div className="flex items-center gap-3 text-sm text-white/70">
                    {item.icon && (
                      <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-surface/40 text-white/90">
                        {item.icon}
                      </span>
                    )}
                    {item.eyebrow && <div className="text-xs uppercase tracking-[0.28em] text-white/55">{item.eyebrow}</div>}
                  </div>
                )}

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold leading-tight text-white md:text-2xl">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm leading-relaxed text-white/70 md:text-base">{item.description}</p>
                  )}
                </div>

                {item.media && (
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-surface/30">
                    {item.media}
                  </div>
                )}

                {item.chips && item.chips.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.chips.map(chip => (
                      <span
                        key={chip}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white/75"
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
                    className="inline-flex w-fit items-center justify-center rounded-full border border-[#FF6B35]/40 bg-[#FF6B35]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF6B35] transition hover:bg-[#FF6B35]/20 hover:text-[#FF6B35]"
                  >
                    {item.overflowLabel}
                  </button>
                )}

                {item.actions && <div className="mt-2 flex flex-wrap gap-3 text-sm">{item.actions}</div>}

                {item.footer && <div className="mt-auto pt-4 text-sm text-white/65">{item.footer}</div>}
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
                <div className="overflow-hidden rounded-2xl border border-white/10">
                  {activeItem.media}
                </div>
              )}
              {activeItem.description && (
                <p className="text-sm leading-relaxed text-white/75 md:text-base">
                  {activeItem.description}
                </p>
              )}
              {activeItem.chips && activeItem.chips.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {activeItem.chips.map(chip => (
                    <span
                      key={chip}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-white/80"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}
              {activeItem.actions && <div className="flex flex-wrap gap-3 text-sm">{activeItem.actions}</div>}
              {activeItem.footer && <div className="text-sm text-white/65">{activeItem.footer}</div>}
            </div>
          )
        ) : null}
      </Modal>
    </>
  )
}
