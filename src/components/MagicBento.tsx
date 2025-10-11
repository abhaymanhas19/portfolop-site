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
          const accent = item.accent ?? 'from-cyan-100/70 via-transparent to-transparent'
          return (
            <motion.article
              key={item.id}
              initial={motionFrom}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              className={cn(
                'group relative overflow-hidden rounded-[28px] border border-[#8ED9FF]/45 bg-white/90 p-6 shadow-[0_24px_60px_rgba(15,41,67,0.12)] backdrop-blur md:p-8',
                'hover:-translate-y-1 transition',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
                item.className,
              )}
              role="button"
              tabIndex={0}
              onClick={(event) => handleCardActivate(event, index)}
              onKeyDown={(event) => handleKeyActivate(event, index)}
            >
              <div
                className={cn(
                  'pointer-events-none absolute inset-0 opacity-60 blur-3xl transition duration-700 group-hover:opacity-100',
                  `bg-gradient-to-br ${accent}`,
                )}
                aria-hidden
              />
              <div className={cn('relative flex h-full flex-col gap-4 text-left text-slate-700', item.contentClassName)}>
                {(item.badge || item.meta) && (
                  <div className="flex items-center justify-between gap-3 text-xs uppercase tracking-[0.3em] text-slate-400">
                    <span>{item.badge}</span>
                    <span className="text-slate-300">{item.meta}</span>
                  </div>
                )}

                {(item.icon || item.eyebrow) && (
                  <div className="flex items-center gap-3 text-sm text-slate-500">
                    {item.icon && (
                      <span className="grid h-11 w-11 place-items-center rounded-2xl border border-[#8ED9FF]/45 bg-soft-accent text-[#23354A]">
                        {item.icon}
                      </span>
                    )}
                    {item.eyebrow && (
                      <div className="text-xs uppercase tracking-[0.28em] text-slate-400">{item.eyebrow}</div>
                    )}
                  </div>
                )}

                <div className="space-y-3">
                  <h3 className="text-xl font-semibold leading-tight text-slate-900 md:text-2xl">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm leading-relaxed text-slate-600 md:text-base">{item.description}</p>
                  )}
                </div>

                {item.media && (
                  <div className="relative overflow-hidden rounded-2xl border border-[#8ED9FF]/45 bg-white">
                    {item.media}
                  </div>
                )}

                {item.chips && item.chips.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {item.chips.map(chip => (
                      <span
                        key={chip}
                        className="rounded-full border border-[#8ED9FF]/45 bg-soft-accent px-3 py-1 text-xs font-medium uppercase tracking-wide text-[#23354A]"
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
                    className="inline-flex w-fit items-center justify-center rounded-full border border-[#8ED9FF]/60 bg-soft-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#23354A] transition hover:bg-soft-accent"
                  >
                    {item.overflowLabel}
                  </button>
                )}

                {item.actions && <div className="mt-2 flex flex-wrap gap-3 text-sm">{item.actions}</div>}

                {item.footer && <div className="mt-auto pt-4 text-sm text-slate-500">{item.footer}</div>}
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
                <div className="overflow-hidden rounded-2xl border border-[#8ED9FF]/45">
                  {activeItem.media}
                </div>
              )}
              {activeItem.description && (
                <p className="text-sm leading-relaxed text-slate-600 md:text-base">
                  {activeItem.description}
                </p>
              )}
              {activeItem.chips && activeItem.chips.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {activeItem.chips.map(chip => (
                    <span
                      key={chip}
                      className="rounded-full border border-[#8ED9FF]/45 bg-soft-accent px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-[#23354A]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              )}
              {activeItem.actions && <div className="flex flex-wrap gap-3 text-sm">{activeItem.actions}</div>}
              {activeItem.footer && <div className="text-sm text-slate-500">{activeItem.footer}</div>}
            </div>
          )
        ) : null}
      </Modal>
    </>
  )
}
