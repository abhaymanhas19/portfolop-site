import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MessageSquare, LineChart, Sparkles, Globe, type LucideIcon } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { capabilitiesContent, homeContent } from '../data/content'

const iconMap: Record<string, LucideIcon> = {
  MessageSquare,
  LineChart,
  Sparkles,
  Globe,
}

export default function WhatICanBuild() {
  const location = useLocation()
  const [openId, setOpenId] = useState<string | null>(capabilitiesContent[0]?.id ?? null)

  useEffect(() => {
    const state = location.state as { capabilityId?: string } | undefined
    if (state?.capabilityId) {
      setOpenId(state.capabilityId)
    }
  }, [location.state])

  const toggleItem = (id: string) => {
    setOpenId(prev => (prev === id ? null : id))
  }

  return (
    <main className="bg-white text-slate-700">
      <section className="border-b border-slate-200/70 bg-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative w-full overflow-hidden"
        >
          <motion.img
            src={homeContent.projectBackground}
            alt="Capabilities hero"
            className="block h-[min(60vh,520px)] w-full object-cover md:h-[520px]"
            initial={{ scale: 1.05, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          />
          

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="absolute inset-0 flex items-end"
          >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-5 px-6 pb-12 pt-24 text-white md:px-8">
              <span className="inline-flex w-fit items-center rounded-full border border-white/60 bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-[#8ED9FF]">
                What I Can Build
              </span>
              <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
                Platform-ready solutions that ship value fast
              </h1>
              <p className="max-w-3xl text-sm text-white/85 md:text-base">
                Product capabilities tuned for realtime collaboration, AI copilots, and resilient delivery pipelines—ready to slot into your roadmap.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-20 pt-8 md:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-3xl text-sm text-slate-600 md:text-base"
        >
          Explore the pillars I partner on most. Tap into any track to see how each capability translates into shipped software and measurable outcomes.
        </motion.p>

        <div className="mt-10 space-y-5">
          {capabilitiesContent.map(({ id, title, description, icon, bullets }) => {
            const isOpen = openId === id
            const Icon = iconMap[icon] ?? Globe
            return (
              <motion.article
                key={id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative overflow-hidden rounded-[32px] border border-[#8ED9FF]/45 bg-white/90 p-[1px] shadow-[0_30px_80px_rgba(15,41,67,0.16)] backdrop-blur"
              >
                <div className="relative h-full rounded-[31px] bg-gradient-to-br from-white via-cyan-50/65 to-white">
                  <button
                    type="button"
                    onClick={() => toggleItem(id)}
                    aria-expanded={isOpen}
                    aria-controls={`${id}-content`}
                    className="flex w-full items-center justify-between gap-3 rounded-[31px] px-6 py-6 text-left text-lg font-semibold text-slate-900 transition hover:bg-white/80"
                  >
                    <span className="inline-flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[#8ED9FF]/45 bg-white text-[#8ED9FF] shadow-sm">
                        <Icon className="h-5 w-5" />
                      </span>
                      {title}
                    </span>
                    <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#23354A]' : 'text-slate-400'}`} />
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
                        <div className="px-6 pb-6 text-sm text-slate-600 md:text-base space-y-4">
                          <motion.p
                            className="leading-relaxed text-slate-600"
                            initial="hidden"
                            animate="visible"
                            variants={{
                              hidden: {},
                              visible: {
                                transition: { staggerChildren: 0.035 },
                              },
                            }}
                          >
                            {description.split(' ').map((word, wordIndex) => (
                              <motion.span
                                key={`${id}-word-${wordIndex}`}
                                variants={{
                                  hidden: { opacity: 0, y: 6 },
                                  visible: { opacity: 1, y: 0, transition: { duration: 0.28, ease: 'easeOut' } },
                                }}
                                className="inline-block pr-1"
                              >
                                {word}
                              </motion.span>
                            ))}
                          </motion.p>
                          {bullets && bullets.length > 0 && (
                            <motion.ul
                              className="space-y-2 text-slate-600"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.25, ease: 'easeOut', delay: 0.1 }}
                            >
                              {bullets.map(point => (
                                <li key={point} className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-sm">
                                  <span className="mt-1 inline-flex h-2 w-2 flex-none items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-teal-400 to-emerald-400 shadow-[0_0_10px_rgba(79,209,197,0.45)]" aria-hidden />
                                  <span className="leading-relaxed">{point}</span>
                                </li>
                              ))}
                            </motion.ul>
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
