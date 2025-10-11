import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ServerCog,
  BrainCircuit,
  Cloud,
  Workflow,
  Cpu,
  Layers,
  type LucideIcon,
} from 'lucide-react'
import { skillClusters, homeContent } from '../data/content'

const iconMap: Record<string, LucideIcon> = {
  ServerCog,
  BrainCircuit,
  Cloud,
  Workflow,
  Cpu,
  Layers,
}

const categories = skillClusters

export default function Skills() {
  const [active, setActive] = useState(categories[0]?.id ?? 'backend')
  const activeCategory = useMemo(
    () => categories.find(category => category.id === active) ?? categories[0],
    [active],
  )

  if (!activeCategory) return null

  const displayedSkills = activeCategory.skills.slice(0, 4)
  const Icon = iconMap[activeCategory.icon] ?? ServerCog

  return (
    <section id="skills" className="relative overflow-hidden py-20">
      <motion.img
        src={homeContent.skillBackground}
        alt=""
        aria-hidden
        initial={{ opacity: 0, scale: 1.05 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6 text-slate-900">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="space-y-3">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#8ED9FF]/60 bg-white/90 px-4 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#23354A]">
              Skill Stack
            </span>
            <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              Focus areas across the engineering toolkit
            </h2>
            <p className="max-w-2xl text-sm text-slate-600 md:text-base">
              Tap a category tile to preview core skills. Progress bars show confidence delivering those
              capabilities in production.
            </p>
          </div>
          <Link
            to="/skills"
            className="inline-flex h-fit items-center justify-center gap-2 rounded-full border border-slate-200 bg-white/85 px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-[#8ED9FF]/60 hover:bg-soft-accent hover:text-[#23354A]"
          >
            Explore the full skillset <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.05 }}
          className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {categories.map(category => {
            const CategoryIcon = iconMap[category.icon] ?? ServerCog
            const selected = active === category.id
            return (
              <button
                key={category.id}
                onClick={() => setActive(category.id)}
                className={`group relative flex h-28 flex-col items-center justify-center rounded-[24px] border transition hover:-translate-y-1 ${
                  selected
                    ? 'border-[#8ED9FF]/70 bg-soft-accent/80 shadow-[0_18px_36px_rgba(15,41,67,0.18)]'
                    : 'border-slate-200 bg-white/85 shadow-sm hover:border-[#8ED9FF]/60'
                }`}
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl border border-slate-200 bg-white text-[#8ED9FF] shadow-sm">
                  <CategoryIcon className="h-6 w-6" />
                </span>
                <span className={`mt-3 text-sm font-semibold ${selected ? 'text-[#23354A]' : 'text-slate-600'}`}>
                  {category.label}
                </span>
              </button>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
          className="grid gap-8 rounded-[32px] border border-[#8ED9FF]/45 bg-white/90 p-6 shadow-[0_30px_80px_rgba(15,41,67,0.16)] backdrop-blur lg:grid-cols-[1fr_1.1fr] lg:p-8"
        >
          <div className="flex flex-col gap-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#8ED9FF]/45 bg-soft-accent px-4 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-[#23354A]">
              <Icon className="h-4 w-4" /> {activeCategory.label}
            </div>
            <p className="text-sm leading-relaxed text-slate-600 md:text-base">{activeCategory.summary}</p>
            <motion.div
              className="relative h-48 overflow-hidden rounded-[24px] border border-[#8ED9FF]/45"
              initial={{ opacity: 0.85 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <img
                src={activeCategory.image}
                alt={`${activeCategory.label} illustration`}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </motion.div>
          </div>

          <div className="flex flex-col gap-5">
            {displayedSkills.map(skill => (
              <div key={skill.name} className="space-y-2">
                <div className="flex items-center justify-between text-sm font-medium text-slate-700">
                  <span>{skill.name}</span>
                  <span className="text-xs text-slate-400">{skill.level}%</span>
                </div>
                <div className="relative h-3 rounded-full bg-slate-100">
                  <motion.div
                    className="absolute inset-y-0 rounded-full bg-gradient-accent"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  />
                </div>
                {skill.highlight && <p className="text-xs text-slate-500">{skill.highlight}</p>}
              </div>
            ))}
            <Link
              to="/skills"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#23354A] hover:text-[#1F2A37]"
            >
              See all {activeCategory.skills.length} tools & practices <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
