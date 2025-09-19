import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { skills } from '../data/skills'
import TiltCard from './TiltCard'
import { ServerCog, BrainCircuit, Cloud, MessageSquare, Gauge, FlaskConical } from 'lucide-react'
import TagListModal from './TagListModal'

const icons = { ServerCog, BrainCircuit, Cloud, MessageSquare, Gauge, FlaskConical } as const

export default function Skills() {
  const previewGroups = skills.slice(0, 4)
  const [modalData, setModalData] = useState<{ title: string; items: string[] } | null>(null)

  const handleOpenModal = (title: string, items: string[]) => {
    setModalData({ title, items })
  }

  const handleCloseModal = () => setModalData(null)

  return (
    <section id="skills" className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60">
            <span className="h-1 w-3 rounded-full bg-[#ff5a1c]" aria-hidden /> Skills Snapshot
          </span>
          <h2 className="text-2xl md:text-3xl font-semibold text-white">
            A quick tour of my core stacks
          </h2>
          <p className="text-sm md:text-base text-white/70 max-w-2xl">
            These are the disciplines I lean on most often. Dive into the full skills page for detailed coverage and tooling notes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Link
            to="/skills"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-2.5 text-sm font-semibold text-white hover:border-white/50 hover:bg-white/10 transition"
          >
            Explore the full skillset
          </Link>
        </motion.div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {previewGroups.map((group, i) => {
          const Icon = (icons as any)[group.icon] || ServerCog
          const visibleSkills = group.skills.slice(0, 4)
          const remaining = group.skills.length - visibleSkills.length
          return (
            <motion.div
              key={group.domain}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              <TiltCard className="rounded-2xl bg-card border border-border p-6 gradient-border">
                <div className="flex items-center gap-3">
                  {/* Icon tinted to your SVG favicon color */}
                  <div className="h-10 w-10 rounded-xl grid place-items-center bg-black/30 backdrop-blur-sm border border-white/10 ring-1 ring-inset ring-white/5">
                    <Icon className="h-5 w-5 text-[#ff5a1c]" />
                  </div>
                  <h3 className="font-medium text-fg">{group.domain}</h3>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {visibleSkills.map(s => (
                    <span
                      key={s}
                      className="px-3 py-1.5 rounded-full bg-[#222] text-[#FFFFFF] opacity-85 text-sm border border-border hover:border-[#ff5a1c]/40 hover:shadow-[0_0_0_1px_rgba(255,90,28,0.35)_inset] transition"
                    >
                      {s}
                    </span>
                  ))}
                  {remaining > 0 && (
                    <button
                      type="button"
                      onClick={() => handleOpenModal(group.domain, group.skills)}
                      className="px-3 py-1.5 rounded-full bg-transparent text-[#ff5a1c] text-sm border border-[#ff5a1c]/40 hover:border-[#ff5a1c]/70 hover:bg-[#ff5a1c]/10 transition"
                    >
                      +{remaining} more
                    </button>
                  )}
                </div>
              </TiltCard>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-10 flex flex-col items-start gap-3 rounded-2xl border border-white/10 bg-[#111]/70 p-6 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h3 className="text-lg font-semibold text-white">Want the deeper dive?</h3>
          <p className="text-sm text-white/65">
            The dedicated skills page breaks down architecture patterns, AI workflows, and supporting tools in more detail.
          </p>
        </div>
        <Link
          to="/skills"
          className="inline-flex items-center justify-center rounded-full bg-[#FF6B35] px-6 py-3 text-sm font-semibold text-black shadow-[0_8px_24px_rgba(255,90,28,0.4)] hover:shadow-[0_12px_32px_rgba(255,90,28,0.5)] transition"
        >
          View the complete list
        </Link>
      </motion.div>

      <TagListModal
        isOpen={!!modalData}
        title={modalData?.title ?? ''}
        items={modalData?.items ?? []}
        onClose={handleCloseModal}
      />
    </section>
  )
}
