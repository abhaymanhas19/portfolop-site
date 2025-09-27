import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { skills } from '../data/skills'
import MagicBento, { type MagicBentoItem } from './MagicBento'
import { ServerCog, BrainCircuit, Cloud, MessageSquare, Gauge, FlaskConical } from 'lucide-react'

const icons = { ServerCog, BrainCircuit, Cloud, MessageSquare, Gauge, FlaskConical } as const

export default function Skills() {
  const previewGroups = skills.slice(0, 2)

  const items: MagicBentoItem[] = previewGroups.map((group, index) => {
    const Icon = (icons as any)[group.icon] || ServerCog
    const accentVariants = [
      'from-[#FF6B35]/25 via-[#311b10]/60 to-transparent',
      'from-[#FF6B35]/20 via-[#18212b]/60 to-transparent',
      'from-[#FF6B35]/20 via-[#1a2422]/60 to-transparent',
      'from-[#FF6B35]/20 via-[#261a2b]/60 to-transparent',
    ]
    const chips = group.skills.slice(0, 6)
    const remaining = group.skills.length - chips.length

    const modalContent = (
      <div className="space-y-5">
        {group.description && (
          <p className="text-sm leading-relaxed text-white/75 md:text-base">{group.description}</p>
        )}
        <div className="flex flex-wrap gap-2">
          {group.skills.map(skill => (
            <span
              key={skill}
              className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-white/80"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    )

    const overflowLabel = remaining > 0 ? `+${remaining} more skills` : undefined

    return {
      id: group.domain,
      icon: <Icon className="h-5 w-5 text-[#FF6B35]" />,
      badge: 'Skills Snapshot',
      title: group.domain,
      description: group.description,
      chips,
      meta: `${String(group.skills.length).padStart(2, '0')} skills`,
      accent: accentVariants[index % accentVariants.length],
      overflowLabel,
      modalContent,
    }
  })

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
          <Link
            to="/skills"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.25em] text-white/70 transition hover:border-white/30 hover:bg-white/12"
          >
            <span className="h-1 w-3 rounded-full bg-[#FF6B35]" aria-hidden /> Skills Snapshot
          </Link>
          <h2 className="text-2xl font-semibold text-white md:text-3xl">
            A quick tour of my core stacks
          </h2>
          <p className="max-w-2xl text-sm text-white/70 md:text-base">
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
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/20 whitespace-nowrap"
          >
            Explore the full skillset
          </Link>
        </motion.div>
      </div>

      <div className="mt-10">
        <MagicBento items={items} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-12 flex flex-col gap-5 rounded-[32px] border border-white/10 bg-gradient-to-r from-[#15121e]/85 via-[#14101e]/78 to-[#110c1a]/85 p-6 shadow-[0_28px_80px_rgba(7,5,12,0.45)] backdrop-blur-lg md:flex-row md:items-center md:justify-between md:px-10 md:py-8"
      >
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-lg font-semibold text-white md:text-xl">Need the deeper dive?</h3>
          <p className="max-w-xl text-sm text-white/70 md:text-base">
            Explore architecture diagrams, ops notes, and measurable outcomes across every capability in the stack.
          </p>
        </div>
        <Link
          to="/skills"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#FF6B35] via-[#FF7A35] to-[#FF4D35] px-7 py-3 text-sm font-semibold text-[#1a0b05] shadow-[0_18px_45px_rgba(255,107,53,0.45)] transition hover:shadow-[0_22px_55px_rgba(255,107,53,0.55)] whitespace-nowrap"
        >
          View the complete list
        </Link>
      </motion.div>
    </section>
  )
}
