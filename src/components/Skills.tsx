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
import { skillClusters } from '../data/content'

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
    <section id="skills" className="relative overflow-hidden bg-surface py-ds-16">
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="space-y-4">
            <span className="tag-pill">Skill Stack</span>
            <h2 className="font-display text-display-md font-semibold text-[#2a3439] md:text-4xl">
              Focus areas across the engineering toolkit
            </h2>
            <p className="max-w-2xl text-body-lg text-[#565e74]">
              Tap a category tile to preview core skills. Progress bars show confidence delivering those
              capabilities in production.
            </p>
          </div>
          <Link to="/skills" className="btn-secondary">
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
                className={`group relative flex h-28 flex-col items-center justify-center rounded-card transition hover:-translate-y-1 ${
                  selected
                    ? 'bg-surface-container-lowest shadow-ambient'
                    : 'bg-surface-container-low hover:bg-surface-container-lowest hover:shadow-ambient-sm'
                }`}
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-surface-container-low text-[#005bc4]">
                  <CategoryIcon className="h-6 w-6" />
                </span>
                <span className={`mt-3 text-sm font-semibold ${selected ? 'text-[#005bc4]' : 'text-[#565e74]'}`}>
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
          className="flex flex-col gap-6 rounded-card bg-surface-container-lowest p-6 shadow-ambient lg:p-ds-8"
        >
          <div className="space-y-4">
            <div className="tag-pill">
              <Icon className="h-4 w-8" /> {activeCategory.label}
            </div>
            <p className="text-sm leading-relaxed text-[#565e74] md:text-base">{activeCategory.summary}</p>

            {displayedSkills.map(skill => (
              <div key={skill.name} className="group space-y-2">
                <div className="space-y-2 rounded-2xl bg-surface-container-low px-4 py-4">
                  <div className="flex items-center justify-between text-[15px] font-medium text-[#2a3439]">
                    <span>{skill.name}</span>
                  </div>
                  {skill.highlight && <p className="text-xs text-[#565e74]">{skill.highlight}</p>}
                </div>
              </div>
            ))}
            <Link
              to="/skills"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#005bc4] hover:text-[#004fad]"
            >
              See all {activeCategory.skills.length} tools & practices <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
