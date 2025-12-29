import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Globe, LineChart, MessageSquare, Sparkles, type LucideIcon } from 'lucide-react'
import { capabilitiesContent } from '../data/content'

const iconMap: Record<string, LucideIcon> = {
  MessageSquare,
  LineChart,
  Sparkles,
  Globe,
}

export default function AbilityBadges() {
  const [openIds, setOpenIds] = useState<string[]>(() =>
    capabilitiesContent.map(({ id }) => id),
  )

  const toggleItem = (id: string) => {
    setOpenIds(prev => (prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]))
  }

  return (
    <section className="relative z-10 mx-auto w-full max-w-6xl px-6 py-12">
      <div className="flex items-center gap-3 text-slate-600">
        <span className="tag-pill">
          <Sparkles className="h-4 w-4" />
        </span>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">Capability Focus</p>
      </div>

      <div className="mt-6 space-y-5">
        {capabilitiesContent.map(({ id, title, description, icon, bullets }) => {
          const isOpen = openIds.includes(id)
          const Icon = iconMap[icon] ?? Globe
          return (
            <motion.article
              key={id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
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
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#23354A]' : 'text-slate-400'}`}
                  />
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
                      <div className="space-y-4 px-6 pb-6 text-sm text-slate-600 md:text-base">
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
                              <li
                                key={point}
                                className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-sm"
                              >
                                <span
                                  className="mt-1 inline-flex h-2 w-2 flex-none items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 via-teal-400 to-emerald-400 shadow-[0_0_10px_rgba(79,209,197,0.45)]"
                                  aria-hidden
                                />
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
  )
}
