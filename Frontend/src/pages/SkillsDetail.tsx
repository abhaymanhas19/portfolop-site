import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Sparkles,
  ServerCog,
  BrainCircuit,
  Cloud,
  Workflow,
  Cpu,
  Layers,
  type LucideIcon,
} from 'lucide-react'
import VantaRingsBackground from '../components/VantaRingsBackground'
import { usePortfolio } from '../hooks/usePortfolio'
import LogoLoop from '../components/LogoLoop'

const iconMap: Record<string, LucideIcon> = {
  ServerCog,
  BrainCircuit,
  Cloud,
  Workflow,
  Cpu,
  Layers,
}

export default function SkillsDetail() {
  const { skills: skillsData } = usePortfolio()
  const skillClusters = skillsData.categories
  const [active, setActive] = useState(skillClusters[0]?.id ?? 'backend')
  const activeCategory = useMemo(
    () => skillClusters.find(category => category.id === active) ?? skillClusters[0],
    [active, skillClusters],
  )

  if (!activeCategory) return null

  const Icon = iconMap[activeCategory.icon] ?? ServerCog

  return (
    <div className="bg-surface font-body">
      <section className="bg-surface-container-low">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative w-full overflow-hidden"
        >
          <motion.div
            className="relative h-[min(60vh,520px)] w-full md:h-[520px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, ease: 'easeOut' }}
          >
            <VantaRingsBackground />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="absolute inset-0 flex items-end"
          >
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pb-12 pt-24 text-white md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
              <div className="max-w-3xl space-y-4">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-blue-200">
                  <Sparkles className="h-3.5 w-3.5" /> Core Expertise
                </span>
                <h1 className="font-display text-3xl font-semibold leading-tight md:text-5xl">
                  Technical skills that ship reliable, intelligent products
                </h1>
                <p className="text-sm text-white/85 md:text-base">
                  A snapshot of the engineering muscles powering realtime systems, AI products, and dependable delivery across teams.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link to="/" className="btn-ghost px-5 py-2.5 text-sm">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to home
                </Link>
                <Link to="/#contact" className="btn-primary px-5 py-2.5 text-sm">
                  Let's build together <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="relative mx-auto max-w-6xl px-4 pb-16 pt-12 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col gap-6"
        >
          <p className="max-w-3xl text-body-lg text-[#565e74]">
            From Python backends to production RAG pipelines, these are the capabilities I rely on to deliver resilient, data-driven platforms. Filter by discipline to explore the tooling and depth across the stack.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[260px,1fr]">
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="rounded-card bg-surface-container-lowest p-4 shadow-ambient"
          >
            <div className="text-sm font-semibold uppercase tracking-[0.28em] text-[#565e74]/60 px-3">Categories</div>
            <div className="mt-4 flex flex-col gap-2">
              {skillClusters.map(category => {
                const CategoryIcon = iconMap[category.icon] ?? ServerCog
                const activeCategoryId = active === category.id
                return (
                  <button
                    key={category.id}
                    onClick={() => setActive(category.id)}
                    className={`flex items-center gap-3 rounded-2xl px-3 py-2 text-left transition ${
                      activeCategoryId
                        ? 'bg-surface-container-low text-[#005bc4]'
                        : 'text-[#565e74] hover:bg-surface-container-low hover:text-[#005bc4]'
                    }`}
                  >
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-surface-container-low text-[#005bc4]">
                      <CategoryIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-semibold">{category.label}</p>
                      <p className="text-xs text-[#565e74]/60">{category.skills.length} skills</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </motion.aside>

          <motion.article
            key={activeCategory.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="flex flex-col gap-8 rounded-card bg-surface-container-lowest p-6 shadow-ambient md:p-ds-8"
          >
            <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-2">
                <div className="tag-pill">
                  <Icon className="h-4 w-4" /> {activeCategory.label}
                </div>
                <p className="max-w-2xl text-sm text-[#565e74] md:text-base">{activeCategory.summary}</p>
              </div>
            </header>

            <div className="space-y-4">
              {activeCategory.skills.map(skill => (
                <div key={skill.name} className="space-y-2 rounded-2xl bg-surface-container-low px-4 py-4">
                  <div className="flex items-center justify-between text-[15px] font-medium text-[#2a3439]">
                    <span>{skill.name}</span>
                  </div>
                  {skill.highlight && <p className="text-xs text-[#565e74]">{skill.highlight}</p>}
                </div>
              ))}
            </div>
          </motion.article>
        </div>

        <div className="mt-16">
          <LogoLoop />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          className="mt-16 rounded-card bg-surface-container-lowest px-6 py-7 shadow-ambient md:flex md:items-center md:justify-between md:px-10"
        >
          <div className="max-w-3xl space-y-3">
            <h2 className="font-display text-headline-lg font-semibold text-[#2a3439]">Need a hand with your next project?</h2>
            <p className="text-body-lg text-[#565e74]">
              I love partnering with teams to architect reliable AI-powered products. Share the challenge on your
              mind and we can map the solution together.
            </p>
          </div>
          <Link to="/#contact" className="btn-primary mt-4 px-6 py-3 text-base md:mt-0">
            Start the conversation
          </Link>
        </motion.div>
      </section>
    </div>
  )
}
