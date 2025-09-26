import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MessageSquare, LineChart, Sparkles, Globe } from 'lucide-react'
import { buildCapabilities } from '../data/buildCapabilities'

export default function WhatICanBuild() {
  const [openId, setOpenId] = useState<string | null>(null)

  const icons = {
    MessageSquare,
    LineChart,
    Sparkles,
    Globe,
  } as const

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id))
  }

  return (
    <main className="relative overflow-hidden bg-background text-white">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -left-20 top-24 h-64 w-64 rounded-full bg-[#FF6B35]/25 blur-[140px]" />
        <div className="absolute right-0 top-40 h-72 w-72 translate-x-1/3 rounded-full bg-purple-500/20 blur-[150px]" />
      </div>

      <section className="relative mx-auto max-w-6xl px-6 py-24 md:px-8 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="space-y-5 text-center md:text-left"
        >
          <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
            What I Can Build
          </span>
          <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
            Platform-ready solutions that ship value fast
          </h1>
          <p className="text-sm text-white/70 md:text-base">
            Explore the pillars I partner on most. Tap into any track to see how each capability translates into shipped software and measurable outcomes.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-y-6 gap-x-10 md:grid-cols-2 xl:grid-cols-2 xl:gap-x-14">
          {buildCapabilities.map(({ id, title, description, icon, bullets }) => {
            const isOpen = openId === id
            const Icon = icons[icon]
            return (
              <motion.article
                key={id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-[1px] backdrop-blur-sm"
              >
                <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-gradient-to-br from-white/[0.05] via-white/[0.02] to-transparent">
                  <div className="pointer-events-none absolute -left-10 top-[-20%] h-32 w-32 rounded-full bg-[#FF6B35]/15 blur-3xl" />
                  <div className="pointer-events-none absolute -right-6 bottom-[-25%] h-36 w-36 rounded-full bg-sky-500/10 blur-3xl" />
                <button
                  type="button"
                  onClick={() => toggleItem(id)}
                  aria-expanded={isOpen}
                  aria-controls={`${id}-content`}
                  className="flex w-full items-center justify-between gap-3 rounded-[calc(1.5rem-1px)] px-5 py-5 text-left text-lg font-semibold text-white transition hover:bg-white/12"
                >
                  <span className="inline-flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FF6B35]/15 text-[#FF6B35]">
                      <Icon className="h-5 w-5" />
                    </span>
                    {title}
                  </span>
                  <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#FF6B35]' : ''}`} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      id={`${id}-content`}
                    >
                      <div className="px-5 pt-2 pb-5 text-sm text-white/75 md:text-base space-y-4">
                        <p className="leading-relaxed text-white/80">
                          {description}
                        </p>
                        {bullets && bullets.length > 0 && (
                          <ul className="space-y-2 text-white/75">
                            {bullets.map(point => (
                              <li key={point} className="flex gap-3">
                                <span className="mt-1 h-1.5 w-1.5 flex-none rounded-full bg-[#FF6B35]" aria-hidden />
                                <span className="leading-relaxed">{point}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                </div>
              </motion.article>
            )
          })}
        </div>
      </section>
    </main>
  )
}
